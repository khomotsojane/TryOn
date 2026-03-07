import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

function Model() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </Float>
  );
}

export default function HeroModel() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[3, 3, 3]} />
      <Model />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}