"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const RotatingText = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  const radius = 8;
  const message = "⚡ AI MOCK INTERVIEW• ";
  const letters = message.repeat(6).split("");

  return (
    <group ref={ref} position={[0, 2, 0]}>
      {letters.map((char, i) => {
        const angle = (i / letters.length) * Math.PI * 2;
        return (
          <Text
            key={i}
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
            rotation={[0, -angle, 0]}
            fontSize={0.4}
            color="#00ffff"
          >
            {char}
          </Text>
        );
      })}
    </group>
  );
};

const TextRing = () => {
  return (
    <Canvas camera={{ position: [0, 1.5, 7] }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 2]} />
      <RotatingText />
    </Canvas>
  );
};

export default TextRing;
