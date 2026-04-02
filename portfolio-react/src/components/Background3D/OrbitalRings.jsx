import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const OrbitalRings = ({ isLightMode }) => {
  const ringRef = useRef();

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.x += 0.001;
      ringRef.current.rotation.z -= 0.002;
    }
  });

  const ringColor = isLightMode ? '#94a3b8' : '#00f0ff';
  const blendMode = isLightMode ? THREE.NormalBlending : THREE.AdditiveBlending;

  return (
    <mesh ref={ringRef} rotation={[0, Math.PI / 3, 0]}>
      <torusGeometry args={[125, 0.5, 3, 64]} />
      <meshBasicMaterial color={ringColor} wireframe={true} transparent={true} opacity={0.08} blending={blendMode} />
    </mesh>
  );
};

OrbitalRings.propTypes = {
  isLightMode: PropTypes.bool.isRequired,
};

export default OrbitalRings;
