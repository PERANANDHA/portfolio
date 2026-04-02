import React, { useRef, useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const CoreHologram = ({ isLightMode }) => {
  const groupRef = useRef();
  const { camera } = useThree();
  
  const baseGeometry = useMemo(() => new THREE.IcosahedronGeometry(80, 1), []);
  const basePositions = useMemo(() => new Float32Array(baseGeometry.attributes.position.array), [baseGeometry]);
  const [currentPositions] = useState(() => new Float32Array(baseGeometry.attributes.position.array));

  const [mouseVec] = useState(() => new THREE.Vector2());

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseVec.x = (event.clientX / globalThis.innerWidth) * 2 - 1;
      mouseVec.y = -(event.clientY / globalThis.innerHeight) * 2 + 1;
    };
    globalThis.addEventListener('mousemove', handleMouseMove);
    return () => globalThis.removeEventListener('mousemove', handleMouseMove);
  }, [mouseVec]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Rotate core
    groupRef.current.rotation.x += 0.0015;
    groupRef.current.rotation.y += 0.002;

    // Interaction (vertex bending towards mouse)
    const vector = new THREE.Vector3(mouseVec.x, mouseVec.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const mouseWorldPos = camera.position.clone().add(dir.multiplyScalar(distance));

    const localMousePos = mouseWorldPos.clone();
    groupRef.current.worldToLocal(localMousePos);

    const interactRadius = 120;
    const maxPull = 60;

    const nextPos = new Float32Array(currentPositions);

    for (let i = 0; i < nextPos.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];

      const dx = localMousePos.x - bx;
      const dy = localMousePos.y - by;
      const dz = localMousePos.z - bz;
      const dist = Math.hypot(dx, dy, dz);

      let tx = bx, ty = by, tz = bz;

      if (dist < interactRadius && dist > 0.1) {
        const force = Math.pow(1 - (dist / interactRadius), 1.5);
        const pull = force * maxPull;
        tx += (dx / dist) * pull;
        ty += (dy / dist) * pull;
        tz += (dz / dist) * pull;
      }

      nextPos[i] += (tx - nextPos[i]) * 0.15;
      nextPos[i + 1] += (ty - nextPos[i + 1]) * 0.15;
      nextPos[i + 2] += (tz - nextPos[i + 2]) * 0.15;
    }

    baseGeometry.setAttribute('position', new THREE.BufferAttribute(nextPos, 3));
  });

  const coreColor = isLightMode ? '#0ea5e9' : '#8b5cf6';
  const blendMode = isLightMode ? THREE.NormalBlending : THREE.AdditiveBlending;
  
  // Simulating thickness
  return (
    <group ref={groupRef}>
      <mesh geometry={baseGeometry}>
        <meshBasicMaterial color={coreColor} wireframe={true} transparent={true} opacity={0.15} blending={blendMode} />
      </mesh>
      <mesh geometry={baseGeometry} scale={[1.005, 1.005, 1.005]} rotation={[0.002, 0.002, 0]}>
        <meshBasicMaterial color={coreColor} wireframe={true} transparent={true} opacity={0.15} blending={blendMode} />
      </mesh>
      <mesh geometry={baseGeometry} scale={[0.995, 0.995, 0.995]} rotation={[-0.002, -0.002, 0]}>
        <meshBasicMaterial color={coreColor} wireframe={true} transparent={true} opacity={0.15} blending={blendMode} />
      </mesh>
    </group>
  );
};

CoreHologram.propTypes = {
  isLightMode: PropTypes.bool.isRequired,
};

export default CoreHologram;
