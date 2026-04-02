import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleConnections = ({ isLightMode }) => {
  const { camera } = useThree();
  const particleCount = 200;
  const maxDistanceSq = 40 * 40; // Avoid Math.sqrt later

  const particleSystem = useRef();
  const linesMesh = useRef();

  // Initialize Particles
  const [{ positions, velocities }] = useState(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = [];
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 400;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 400;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 400;
      vel.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        )
      );
    }
    return { positions: pos, velocities: vel };
  });

  // Tracking mouse
  const [mouseVec] = useState(() => new THREE.Vector2());
  const [targetRot] = useState(() => new THREE.Vector2());
  
  // Repulsion state
  const isRepelling = useRef(false);
  const repelIntensity = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse (-1 to +1) for projection
      mouseVec.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseVec.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Mouse off-center for gentle rotation
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetRot.x = (event.clientX - windowHalfX) * 0.001;
      targetRot.y = (event.clientY - windowHalfY) * 0.001;
    };

    const handleClick = () => {
      isRepelling.current = true;
      repelIntensity.current = 1.0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [mouseVec, targetRot]);

  // Dynamic geometry for lines
  const [linesGeom] = useState(() => new THREE.BufferGeometry());

  useFrame(() => {
    if (!particleSystem.current || !linesMesh.current) return;

    // Gentle global rotation based on mouse
    particleSystem.current.rotation.y += 0.05 * (targetRot.x - particleSystem.current.rotation.y);
    particleSystem.current.rotation.x += 0.05 * (targetRot.y - particleSystem.current.rotation.x);
    particleSystem.current.rotation.y += 0.001; // Constant rotation

    linesMesh.current.rotation.copy(particleSystem.current.rotation);

    // Project mouse to 3D space
    const vector = new THREE.Vector3(mouseVec.x, mouseVec.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const mouseWorldPos = camera.position.clone().add(dir.multiplyScalar(distance));

    // Handle repulsion decay
    if (repelIntensity.current > 0) {
      repelIntensity.current -= 0.02;
      if (repelIntensity.current <= 0) {
        isRepelling.current = false;
        repelIntensity.current = 0;
      }
    }

    const posAttr = particleSystem.current.geometry.attributes.position;
    const pos = posAttr.array;
    const linePositions = [];

    // Helper to add a line segment
    const addLine = (i3, dx, dy, dz) => {
      linePositions.push(pos[i3], pos[i3 + 1], pos[i3 + 2], dx, dy, dz);
    };

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      let velX = velocities[i].x;
      let velY = velocities[i].y;
      let velZ = velocities[i].z;

      // Update positions via velocity
      pos[i3] += velX;
      pos[i3 + 1] += velY;
      pos[i3 + 2] += velZ;

      // Repulsion active
      if (isRepelling.current) {
        const dx = pos[i3] - mouseWorldPos.x;
        const dy = pos[i3 + 1] - mouseWorldPos.y;
        const dz = pos[i3 + 2] - mouseWorldPos.z;
        const rDist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (rDist < 100 && rDist > 1) {
          const force = (100 - rDist) * repelIntensity.current * 0.08;
          pos[i3] += (dx / rDist) * force;
          pos[i3 + 1] += (dy / rDist) * force;
          pos[i3 + 2] += (dz / rDist) * force;
        }
      }

      // Invisible bounds wrap
      if (Math.abs(pos[i3]) > 200) velX *= -1;
      if (Math.abs(pos[i3 + 1]) > 200) velY *= -1;
      if (Math.abs(pos[i3 + 2]) > 200) velZ *= -1;

      velocities[i].set(velX, velY, velZ);

      // Mouse Connections
      const mx = pos[i3] - mouseWorldPos.x;
      const my = pos[i3 + 1] - mouseWorldPos.y;
      const mz = pos[i3 + 2] - mouseWorldPos.z;
      const mouseDistSq = mx * mx + my * my + mz * mz;

      if (mouseDistSq < maxDistanceSq * 4) {
        addLine(i3, mouseWorldPos.x, mouseWorldPos.y, mouseWorldPos.z);
      }

      // Node Connections
      for (let j = i + 1; j < particleCount; j++) {
        const j3 = j * 3;
        const dx = pos[i3] - pos[j3];
        const dy = pos[i3 + 1] - pos[j3 + 1];
        const dz = pos[i3 + 2] - pos[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistanceSq) {
          addLine(i3, pos[j3], pos[j3 + 1], pos[j3 + 2]);
        }
      }
    }

    posAttr.needsUpdate = true;
    linesGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  });

  // Colors Logic
  const dotColor = isLightMode ? '#2563eb' : '#00f0ff';
  const lineColor = isLightMode ? '#0ea5e9' : '#8b5cf6';
  const blendMode = isLightMode ? THREE.NormalBlending : THREE.AdditiveBlending;

  return (
    <>
      <points ref={particleSystem}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color={dotColor} size={2} transparent={true} opacity={0.8} blending={blendMode} />
      </points>

      <lineSegments ref={linesMesh} geometry={linesGeom}>
        <lineBasicMaterial color={lineColor} transparent={true} opacity={0.15} blending={blendMode} />
      </lineSegments>
    </>
  );
};

ParticleConnections.propTypes = {
  isLightMode: PropTypes.bool.isRequired,
};

export default ParticleConnections;
