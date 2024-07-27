"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  MeshWobbleMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Nucleus from "../Nucleus/Nucleus";
import SphreBg from "../Sphere/SphreBg";
import MovingStars from "../MovingStars/MovingStars";

const MainScene = () => {
  return (
    <Canvas>
      <mesh>
        <OrbitControls
          autoRotate
          autoRotateSpeed={4}
          maxDistance={350}
          minDistance={150}
          enablePan={false}
        />
        <ambientLight intensity={2} />
        <directionalLight position={[0, 50, -20]} intensity={2} />
        <Nucleus />
        <SphreBg />
        <MovingStars />
      </mesh>
    </Canvas>
  );
};

export default MainScene;
