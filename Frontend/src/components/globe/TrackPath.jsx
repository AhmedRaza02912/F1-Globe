import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToVector3, getGreatCirclePoints } from "../../utils/globeUtils";

const SEGMENTS = 80;       // points per arc leg
const LEG_DURATION = 0.85; // seconds to reveal one leg

export default function TrackPath({ circuits, orbPosRef }) {
    const groupRef = useRef();
    const progressRef = useRef(0); // 0..numLegs (fractional)
    const orbRef = useRef();

    // Sort circuits into race-round order
    const sorted = useMemo(
        () => [...circuits].sort((a, b) => a.round - b.round),
        [circuits]
    );

    // Pre-compute great-circle point arrays for every leg
    const legsData = useMemo(() => {
        return sorted.slice(0, -1).map((c1, i) => {
            const c2 = sorted[i + 1];
            const v1 = latLngToVector3(parseFloat(c1.lat), parseFloat(c1.long), 1.05);
            const v2 = latLngToVector3(parseFloat(c2.lat), parseFloat(c2.long), 1.05);
            return getGreatCirclePoints(v1, v2, SEGMENTS);
        });
    }, [sorted]);

    // Build Three.js Line objects imperatively — avoids per-frame React re-renders
    const { lines, glows } = useMemo(() => {
        const lines = legsData.map((pts) => {
            const positions = new Float32Array(pts.length * 3);
            pts.forEach((p, i) => {
                positions[i * 3]     = p.x;
                positions[i * 3 + 1] = p.y;
                positions[i * 3 + 2] = p.z;
            });
            const geo = new THREE.BufferGeometry();
            geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            geo.setDrawRange(0, 0);
            const mat = new THREE.LineBasicMaterial({
                color: new THREE.Color("#e10600"),
                transparent: true,
                opacity: 0.95,
            });
            return new THREE.Line(geo, mat);
        });

        // A second, slightly lifted semi-transparent line for a soft glow halo
        const glows = legsData.map((pts) => {
            const positions = new Float32Array(pts.length * 3);
            pts.forEach((p, i) => {
                const gp = p.clone().multiplyScalar(1.004);
                positions[i * 3]     = gp.x;
                positions[i * 3 + 1] = gp.y;
                positions[i * 3 + 2] = gp.z;
            });
            const geo = new THREE.BufferGeometry();
            geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            geo.setDrawRange(0, 0);
            const mat = new THREE.LineBasicMaterial({
                color: new THREE.Color("#ff5533"),
                transparent: true,
                opacity: 0.25,
            });
            return new THREE.Line(geo, mat);
        });

        return { lines, glows };
    }, [legsData]);

    // Mount lines into the group, reset on re-mount
    useEffect(() => {
        progressRef.current = 0;
        const group = groupRef.current;
        if (!group) return;

        lines.forEach((l) => group.add(l));
        glows.forEach((l) => group.add(l));

        // Ensure draw ranges start at zero each time TrackPath mounts
        lines.forEach((l) => l.geometry.setDrawRange(0, 0));
        glows.forEach((l) => l.geometry.setDrawRange(0, 0));

        return () => {
            lines.forEach((l) => { group.remove(l); l.geometry.dispose(); l.material.dispose(); });
            glows.forEach((l) => { group.remove(l); l.geometry.dispose(); l.material.dispose(); });
        };
    }, [lines, glows]);

    // Animation loop — runs every frame without triggering any React state update
    useFrame((state, delta) => {
        const totalLegs = legsData.length;
        progressRef.current = Math.min(progressRef.current + delta / LEG_DURATION, totalLegs);
        const progress = progressRef.current;

        // Reveal each leg progressively
        lines.forEach((line, i) => {
            const legProg = Math.min(Math.max(progress - i, 0), 1);
            const count   = Math.ceil(legProg * (SEGMENTS + 1));
            line.geometry.setDrawRange(0, count);
            glows[i].geometry.setDrawRange(0, count);
        });

        // Update orb — sits at the tip of the currently drawing leg
        if (orbRef.current) {
            const activeLeg = Math.min(Math.floor(progress), totalLegs - 1);
            const legFrac   = Math.min(Math.max(progress - activeLeg, 0), 1);
            const pts       = legsData[activeLeg];
            const idx       = Math.min(Math.floor(legFrac * SEGMENTS), SEGMENTS);
            orbRef.current.position.copy(pts[idx]);

            // Share the orb's world position with the camera tracker
            if (orbPosRef) orbPosRef.current.copy(pts[idx]);

            // Pulsing scale
            const pulse = 1 + 0.4 * Math.sin(state.clock.elapsedTime * 9);
            orbRef.current.scale.setScalar(pulse);
            // Fade orb out once all legs are drawn
            const fade = progress >= totalLegs ? Math.max(1 - (progress - totalLegs) * 4, 0) : 1;
            orbRef.current.material.opacity = fade;
        }
    });

    // Compute initial orb position (first circuit)
    const orbStartPos = useMemo(() => {
        if (!sorted.length) return [0, 0, 0];
        const c = sorted[0];
        return latLngToVector3(parseFloat(c.lat), parseFloat(c.long), 1.05);
    }, [sorted]);

    return (
        <group ref={groupRef}>
            {/* Travelling orb */}
            <mesh ref={orbRef} position={orbStartPos}>
                <sphereGeometry args={[0.018, 16, 16]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ff8800"
                    emissiveIntensity={4}
                    transparent
                    opacity={1}
                />
            </mesh>

            {/* Glowing dot at each circuit stop */}
            {sorted.map((circuit) => {
                const pos = latLngToVector3(
                    parseFloat(circuit.lat),
                    parseFloat(circuit.long),
                    1.06
                );
                return (
                    <mesh key={circuit.circuitId} position={pos}>
                        <sphereGeometry args={[0.012, 12, 12]} />
                        <meshStandardMaterial
                            color="#e10600"
                            emissive="#e10600"
                            emissiveIntensity={2}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}
