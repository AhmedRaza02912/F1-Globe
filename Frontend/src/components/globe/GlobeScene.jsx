import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useCircuits } from "../../hooks/useCircuits";
import Marker from "./Marker";
import Globe from "./Globe";
import Earth from "./Earth";

export default function GlobeScene() {
  const {circuits} = useCircuits();
  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
      }}
      camera={{
        position: [0, 0, 4],
        fov: 45,
      }}
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
      <Globe circuits ={circuits}/>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={6}
      />
    </Canvas>
    
  );
  // console.log(circuits);
}
