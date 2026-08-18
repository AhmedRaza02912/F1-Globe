import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import Globe from "./Globe";

// ---------- Camera tracker ----------
// Lives inside the Canvas so it can call useFrame.
// When Track Path is active it smoothly lerps the OrbitControls target toward
// the travelling orb; when inactive it eases back to the globe center.
const ORIGIN = new THREE.Vector3(0, 0, 0);

function CameraTracker({ orbPosRef, trackPathActive, controlsRef }) {
    const smoothTarget = useRef(new THREE.Vector3());

    useFrame(() => {
        if (!controlsRef.current) return;
        const goal   = trackPathActive ? orbPosRef.current : ORIGIN;
        const speed  = trackPathActive ? 0.04 : 0.06;
        smoothTarget.current.lerp(goal, speed);
        controlsRef.current.target.copy(smoothTarget.current);
        controlsRef.current.update();
    });

    return null;
}

// ---------- GlobeScene ----------
export default function GlobeScene({ circuits, onSelect, selectedCircuit, trackPathActive }) {
    const controlsRef = useRef();
    // Shared mutable ref — TrackPath writes the orb's world position here every
    // frame; CameraTracker reads it without triggering any React re-render.
    const orbPosRef = useRef(new THREE.Vector3());

    return (
        <div className="relative w-full h-full">
            <Canvas
                style={{ width: "100%", height: "100%" }}
                camera={{ position: [0, 0, 4], fov: 45 }}
            >
                <ambientLight intensity={0.15} />

                <directionalLight position={[5, 3, 5]} intensity={2.8} />

                <directionalLight position={[-5, -3, -5]} intensity={0.2} />

                {/* Background stars */}
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                />

                <Globe
                    circuits={circuits}
                    onSelect={onSelect}
                    selectedCircuit={selectedCircuit}
                    trackPathActive={trackPathActive}
                    orbPosRef={orbPosRef}
                />

                <OrbitControls
                    ref={controlsRef}
                    enablePan={false}
                    enableZoom={true}
                    minDistance={2}
                    maxDistance={6}
                />

                <CameraTracker
                    orbPosRef={orbPosRef}
                    trackPathActive={trackPathActive}
                    controlsRef={controlsRef}
                />
            </Canvas>
        </div>
    );
}
