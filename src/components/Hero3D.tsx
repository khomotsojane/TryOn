import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Stars, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface Hero3DProps {
  modelPath: string;
}

const FloatingModel: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const ref = useRef<any>(null);

  const { scene } = useGLTF(modelPath);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return <primitive ref={ref} object={scene} scale={1.6} />;
};

const Hero3D: React.FC<Hero3DProps> = ({ modelPath }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 5]} />

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <FloatingModel modelPath={modelPath} />
      </Float>

      <Stars />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default Hero3D;