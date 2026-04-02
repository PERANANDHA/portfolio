import React, { useState, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AtmosphericDust = ({ isLightMode }) => {
  const dustCount = 500;
  const pointsRef = useRef();
  const materialRef = useRef();

  const [{ positions, velocities }] = useState(() => {
    const pos = new Float32Array(dustCount * 3);
    const vel = [];
    for (let i = 0; i < dustCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 600;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 600;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 600;
      vel.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          -Math.random() * 0.1 - 0.02, // drifting down
          (Math.random() - 0.5) * 0.05
        )
      );
    }
    return { positions: pos, velocities: vel };
  });

  const dustColor = isLightMode ? '#64748b' : '#0ea5e9';
  const blendMode = isLightMode ? THREE.NormalBlending : THREE.AdditiveBlending;
  const dustOpacity = isLightMode ? 0.4 : 0.3;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  // Assign geometry and material properties imperatively to avoid JSX warnings
  useEffect(() => {
    if (pointsRef.current) {
      pointsRef.current.geometry = geometry;
    }
  }, [geometry]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color = new THREE.Color(dustColor);
      materialRef.current.size = 1.5;
      materialRef.current.transparent = true;
      materialRef.current.opacity = dustOpacity;
      materialRef.current.blending = blendMode;
    }
  }, [dustColor, dustOpacity, blendMode]);

  useFrame(() => {
    if (!pointsRef.current?.geometry) return;
    
    const pos = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      pos[i3] += velocities[i].x;
      pos[i3 + 1] += velocities[i].y;
      pos[i3 + 2] += velocities[i].z;

      // Wrap around
      if (pos[i3 + 1] < -300) pos[i3 + 1] = 300;
      if (Math.abs(pos[i3]) > 300) pos[i3] *= -0.9;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });


  return (
    <points ref={pointsRef} name="dustSystem">
      <pointsMaterial ref={materialRef} />
    </points>
  );
};

AtmosphericDust.propTypes = {
  isLightMode: PropTypes.bool.isRequired,
};

export default AtmosphericDust;
