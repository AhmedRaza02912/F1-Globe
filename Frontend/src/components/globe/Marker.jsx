import {Sphere} from "@react-three/drei";
import { latLngToVector3 } from "../../utils/globeUtils";

export default function Marker({ circuit, onSelect, selected }) {

    const position = latLngToVector3(
        parseFloat(circuit.latitude),
        parseFloat(circuit.longitude),
        1.04
    );

    return (
        <Sphere
            args={[0.02, 16, 16]}
            position={position}
            onClick={() => onSelect(circuit)}
        >
            <meshStandardMaterial color={selected? "#ffff00" : "#ff0000"} />
        </Sphere>
    );
}