import { useRef } from "react";
import Earth from "./Earth";
import Marker from "./Marker";
import TrackPath from "./TrackPath";

// Auto-rotation has been removed — the globe is stationary on launch.
// Users can freely drag with OrbitControls.
export default function Globe({ circuits, onSelect, selectedCircuit, trackPathActive, orbPosRef }) {
    const globeRef = useRef();

    return (
        <group ref={globeRef}>
            <Earth />

            {circuits.map((circuit) => (
                <Marker
                    key={circuit.circuitId}
                    circuit={circuit}
                    onSelect={onSelect}
                    selected={selectedCircuit?.circuitId === circuit.circuitId}
                    dimmed={trackPathActive}
                />
            ))}

            {/* Track Path arcs — inside the group so they share the globe's transform */}
            {trackPathActive && circuits.length > 1 && (
                <TrackPath circuits={circuits} orbPosRef={orbPosRef} />
            )}
        </group>
    );
}
