import {Sphere} from "@react-three/drei";
import { latLngToVector3 } from "../../utils/globeUtils";

export default function Marker({latitude, longitude}){
    const position = latLngToVector3(latitude, longitude);

    return (
        <Sphere
        args={[0.02, 16, 16]}
        position={position}>
            <meshStandardMaterial color="red" />
        </Sphere>
    );
}