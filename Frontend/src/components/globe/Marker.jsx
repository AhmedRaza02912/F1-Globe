import { Sphere } from "@react-three/drei";
import { latLngToVector3 } from "../../utils/globeUtils";

export default function Marker({ circuit, onSelect, selected, dimmed }) {
    // Radius 1.005 places the sphere centre just above the Earth surface (r=1.0),
    // so the bottom of each sphere clips slightly into the globe — giving an
    // "embedded pin" look rather than a floating balloon.
    const position = latLngToVector3(
        parseFloat(circuit.lat),
        parseFloat(circuit.long),
        1.005
    );

    const color   = selected ? "#ffff00" : dimmed ? "#992222" : "#e10600";
    const opacity = dimmed ? 0.4 : 1;
    const scale   = dimmed ? 0.55 : 1;

    return (
        <Sphere
            args={[0.014, 16, 16]}
            position={position}
            scale={scale}
            onClick={() => !dimmed && onSelect(circuit)}
        >
            <meshStandardMaterial
                color={color}
                emissive={selected ? "#ffcc00" : "#e10600"}
                emissiveIntensity={selected ? 1.5 : 0.6}
                transparent
                opacity={opacity}
            />
        </Sphere>
    );
}