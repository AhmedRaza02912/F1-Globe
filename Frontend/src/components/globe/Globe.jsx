import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import Earth from "./Earth";
import Marker from "./Marker";

export default function Globe({ circuits }) {

    const globeRef = useRef();

    useFrame((_, delta) => {
        globeRef.current.rotation.y += delta * 0.05;
    });

    return (
        <group ref={globeRef}>

            <Earth />

            {circuits.map(circuit => (
                <Marker
                    key={circuit.circuitId}
                    latitude={circuit.latitude}
                    longitude={circuit.longitude}
                />
            ))}

        </group>
    );
}