"use client";
import React, { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {TextureLoader,BackSide} from "three"

const SphreBg = () => {
  const ref = useRef();
  const texture = useLoader(TextureLoader, "/assets/spherebg.jpg");

  useEffect(() => {
    if (texture) {
      texture.anisotropy = 16;
    }
  }, [texture]);

  useFrame(() => {
    ref.current.rotation.x += 0.002;
    ref.current.rotation.y += 0.002;
    ref.current.rotation.z += 0.002;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[150, 40, 40]} />
      <meshBasicMaterial side={BackSide} map={texture} />
    </mesh>
  );
};

export default SphreBg;
