import { Sphere, useTexture } from "@react-three/drei";

import earthMap from "../../assets/textures/earth.jpg";
import normalMap from "../../assets/textures/earth_normal.jpg";

export default function Earth() {

    const textures = useTexture({
        map: earthMap,
        normalMap: normalMap
    });

    return (
        <Sphere args={[1, 128, 128]}>
            <meshStandardMaterial
                map={textures.map}
                normalMap={textures.normalMap}
                roughness={1}
                metalness={0}
            />
        </Sphere>
    );
}