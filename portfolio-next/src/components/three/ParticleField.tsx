'use client';
import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 180;

// Pre-compute random particle data at module load time (outside render) to satisfy
// React's purity rules — Math.random() must not be called during render.
const INITIAL_POSITIONS = new Float32Array(COUNT * 3);
const INITIAL_VELOCITIES: THREE.Vector3[] = [];
for (let i = 0; i < COUNT; i++) {
  INITIAL_POSITIONS[i * 3]     = (Math.random() - 0.5) * 380;
  INITIAL_POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 380;
  INITIAL_POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 380;
  INITIAL_VELOCITIES.push(new THREE.Vector3(
    (Math.random() - 0.5) * 0.18,
    (Math.random() - 0.5) * 0.18,
    (Math.random() - 0.5) * 0.18,
  ));
}

export default function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const { camera } = useThree();
  const mouse = useRef(new THREE.Vector2());
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.dataset.theme !== 'light');
    check();
    globalThis.addEventListener('themeChanged', check);
    return () => globalThis.removeEventListener('themeChanged', check);
  }, []);

  // velocities in a ref so they can be mutated freely (bounce direction flips)
  const velocities = useRef<THREE.Vector3[]>(INITIAL_VELOCITIES);

  const pointGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    // Copy so the module-level array isn't shared across HMR reloads
    g.setAttribute('position', new THREE.BufferAttribute(INITIAL_POSITIONS.slice(), 3));
    return g;
  }, []);

  const lineGeom = useMemo(() => new THREE.BufferGeometry(), []);
  const rotTarget = useRef(new THREE.Vector2());

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / globalThis.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / globalThis.innerHeight) * 2 + 1;
      rotTarget.current.x = (e.clientX / globalThis.innerWidth - 0.5) * 0.8;
      rotTarget.current.y = (e.clientY / globalThis.innerHeight - 0.5) * 0.8;
    };
    globalThis.addEventListener('mousemove', onMove);
    return () => globalThis.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    const lines = lineRef.current;
    if (!mesh || !lines) return;

    // Gentle rotation following mouse
    mesh.rotation.y += 0.04 * (rotTarget.current.x - mesh.rotation.y);
    mesh.rotation.x += 0.04 * (rotTarget.current.y - mesh.rotation.x);
    mesh.rotation.y += 0.0008;

    lines.rotation.copy(mesh.rotation);

    // Project mouse to world
    const vec = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5).unproject(camera);
    const dir = vec.sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    const mouseWorld = camera.position.clone().add(dir.multiplyScalar(dist));

    const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const linePos: number[] = [];
    const maxDsq = 52 * 52;

    const vel = velocities.current;
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      pos[i3]     += vel[i].x;
      pos[i3 + 1] += vel[i].y;
      pos[i3 + 2] += vel[i].z;
      if (Math.abs(pos[i3])     > 190) vel[i].x *= -1;
      if (Math.abs(pos[i3 + 1]) > 190) vel[i].y *= -1;
      if (Math.abs(pos[i3 + 2]) > 190) vel[i].z *= -1;

      // Mouse connection
      const mdx = pos[i3] - mouseWorld.x;
      const mdy = pos[i3 + 1] - mouseWorld.y;
      const mdz = pos[i3 + 2] - mouseWorld.z;
      if (mdx * mdx + mdy * mdy + mdz * mdz < maxDsq * 4) {
        linePos.push(pos[i3], pos[i3 + 1], pos[i3 + 2], mouseWorld.x, mouseWorld.y, mouseWorld.z);
      }

      // Node-to-node connections
      for (let j = i + 1; j < COUNT; j++) {
        const j3 = j * 3;
        const dx = pos[i3] - pos[j3];
        const dy = pos[i3 + 1] - pos[j3 + 1];
        const dz = pos[i3 + 2] - pos[j3 + 2];
        if (dx * dx + dy * dy + dz * dz < maxDsq) {
          linePos.push(pos[i3], pos[i3 + 1], pos[i3 + 2], pos[j3], pos[j3 + 1], pos[j3 + 2]);
        }
      }
    }

    posAttr.needsUpdate = true;
    lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
  });

  const dotColor  = isDark ? '#22d3ee' : '#6366f1';
  const lineColor = isDark ? '#a78bfa' : '#0284c7';
  const blending  = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;

  return (
    <>
      <points ref={meshRef} geometry={pointGeom}>
        <pointsMaterial color={dotColor} size={2} transparent opacity={0.75} blending={blending} depthWrite={false} />
      </points>
      <lineSegments ref={lineRef} geometry={lineGeom}>
        <lineBasicMaterial color={lineColor} transparent opacity={0.12} blending={blending} depthWrite={false} />
      </lineSegments>
    </>
  );
}
