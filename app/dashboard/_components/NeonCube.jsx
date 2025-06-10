"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

const Cube = () => {
  const meshRef = useRef();
  useFrame(() => {
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]} position={[1.5, 1, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.6} />
    </mesh>
  );
};

const NeonCube = () => {
  return (
    <Canvas camera={{ position: [0, 5, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[1, 3, 3]} />
      <Cube />
    </Canvas>
  );
};

export default NeonCube;
