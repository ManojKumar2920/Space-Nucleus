import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  TextureLoader,
  IcosahedronGeometry,
  MeshPhongMaterial,
  Vector3,
} from "three";
import { createNoise3D } from "simplex-noise";


const noise = createNoise3D();
const blobScale = 4;

const Nucleus = () => {
  const ref = useRef();
  const texture = useLoader(TextureLoader, "/assets/nucleus-texture.jpg");

  // Generate geometry and store original vertices
  const geometry = useMemo(() => {
    const geom = new IcosahedronGeometry(30, 10);
    geom.userData.originalVertices = [];
    const positions = geom.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      geom.userData.originalVertices.push(
        new Vector3(positions[i], positions[i + 1], positions[i + 2])
      );
    }

    return geom;
  }, []);

  const material = useMemo(
    () => new MeshPhongMaterial({ map: texture }),
    [texture]
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 1000;

    // Update vertex positions
    geometry.userData.originalVertices.forEach((v, i) => {
      const pos = geometry.attributes.position.array;

      v.normalize();
      const distance =
        30 +
        noise(v.x + time * 0.0005, v.y + time * 0.0003, v.z + time * 0.0008) *
          blobScale;

      pos[i * 3] = v.x * distance;
      pos[i * 3 + 1] = v.y * distance;
      pos[i * 3 + 2] = v.z * distance;
    });

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return <mesh ref={ref} geometry={geometry} material={material} />;
};

export default Nucleus;
