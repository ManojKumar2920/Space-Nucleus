import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Points, Point } from '@react-three/drei';
import {AdditiveBlending, BufferGeometry, Float32BufferAttribute, MathUtils, PointsMaterial, TextureLoader} from 'three';

const generateStars = (count, radius) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    positions.push(x, y, z);
  }
  return positions;
};

const MovingStars = () => {
  const starsRef = useRef();
  const texture = useLoader(TextureLoader, '/assets/star-texture.png');

  const positions = useMemo(() => generateStars(50, 150), []);

  // Create BufferGeometry and set the positions attribute
  const geometry = useMemo(() => {
    const bufferGeometry = new BufferGeometry();
    const positionAttribute = new Float32BufferAttribute(positions, 3);
    bufferGeometry.setAttribute('position', positionAttribute);
    return bufferGeometry;
  }, [positions]);

  useFrame(() => {
    const positionsArray = starsRef.current.geometry.attributes.position.array;
    const count = positionsArray.length / 3;

    for (let i = 0; i < count; i++) {
      const index = i * 3;
      const x = positionsArray[index];
      const y = positionsArray[index + 1];
      const z = positionsArray[index + 2];

      const velocity = MathUtils.randInt(50, 200);
      const distance = 30 + Math.sin(Date.now() * 0.0005) * 3; // Example noise value

      positionsArray[index] = x * distance / velocity;
      positionsArray[index + 1] = y * distance / velocity;
      positionsArray[index + 2] = z * distance / velocity;
    }

    starsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={starsRef} args={[geometry, new PointsMaterial({
      size: 5,
      map: texture,
      blending: AdditiveBlending,
      transparent: true,
      opacity: 0.8,
    })]} />
  );
};

export default MovingStars;
