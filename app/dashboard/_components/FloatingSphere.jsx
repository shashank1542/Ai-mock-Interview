"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const Sphere = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = Math.sin(Date.now() * 0.001) * 0.3;
    }
  });

  return (
    <mesh ref={ref} scale={1.3} position={[-1.5, -0.5, 0]}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color="#f0f" emissive="#f0f" emissiveIntensity={0.6} />
    </mesh>
  );
};

const FloatingSphere = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} />
      <Sphere />
    </Canvas>
  );
};

export default FloatingSphere;
