import { Sphere, useTexture } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import earthMap from "../../assets/textures/earth_normal.jpg";
import normalMap from "../../assets/textures/earth_night.jpg";

export default function Earth() {
const earthRef = useRef();
    const textures = useTexture({
        
        normalMap: earthMap,
        emissiveMap: normalMap
    });
useFrame((_, delta) => {
    earthRef.current.rotation.y += delta * 0.05;
});
    return (
        <group ref={earthRef}>
             <Sphere args={[1, 128, 128]}>
            <meshStandardMaterial
                map={textures.map}
                normalMap={textures.normalMap}

                emissive="#0b3645"
                emissiveMap={textures.emissiveMap}
                emissiveIntensity={0.8}
            />
        </Sphere>
        </group>
       
    );
}