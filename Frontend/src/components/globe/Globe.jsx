import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import Earth from "./Earth";
import Marker from "./Marker";
import { select } from "three/src/nodes/math/ConditionalNode.js";

export default function Globe({ circuits, onSelect, selectedCircuit }) {
    const globeRef = useRef();
    useFrame((state, delta) =>{
        globeRef.current.rotation.y += 0.2 * delta;
    })
  return (
    <group ref={globeRef}>
      <Earth />

      {circuits.map((circuit) => (
        <Marker
          key={circuit.circuitId}
          circuit={circuit}
          onSelect={onSelect}
          selected={selectedCircuit?.circuitId === circuit.circuitId}
        />
      ))}
    </group>
  );
}
