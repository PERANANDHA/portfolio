'use client';
import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CoreSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const geomRef  = useRef<THREE.IcosahedronGeometry | null>(null);
  const basePositions = useRef<Float32Array | null>(null);
  const { camera } = useThree();
  const mouse = useRef(new THREE.Vector2());
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.dataset.theme !== 'light');
    check();
    globalThis.addEventListener('themeChanged', check);
    return () => globalThis.removeEventListener('themeChanged', check);
  }, []);

  const geom = useMemo(() => new THREE.IcosahedronGeometry(70, 1), []);

  useEffect(() => {
    if (geom) {
      geomRef.current = geom;
      basePositions.current = new Float32Array(geom.attributes.position.array);
    }
  }, [geom]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / globalThis.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / globalThis.innerHeight) * 2 + 1;
    };
    globalThis.addEventListener('mousemove', onMove);
    return () => globalThis.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    const group = groupRef.current;
    if (!group || !geomRef.current || !basePositions.current) return;

    group.rotation.x += 0.0015;
    group.rotation.y += 0.002;

    // Vertex morphing on mouse
    const vec = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5).unproject(camera);
    const dir = vec.sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    const mw = camera.position.clone().add(dir.multiplyScalar(dist));
    const local = group.worldToLocal(mw.clone());

    const pos = geomRef.current.attributes.position.array as Float32Array;
    const bp  = basePositions.current;
    const R = 100, pull = 50;

    for (let i = 0; i < pos.length; i += 3) {
      const bx = bp[i], by = bp[i + 1], bz = bp[i + 2];
      const dx = local.x - bx, dy = local.y - by, dz = local.z - bz;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      let tx = bx, ty = by, tz = bz;
      if (d < R && d > 0.1) {
        const f = Math.pow(1 - d / R, 1.5) * pull;
        tx += (dx / d) * f; ty += (dy / d) * f; tz += (dz / d) * f;
      }
      pos[i]     += (tx - pos[i])     * 0.12;
      pos[i + 1] += (ty - pos[i + 1]) * 0.12;
      pos[i + 2] += (tz - pos[i + 2]) * 0.12;
    }
    geomRef.current.attributes.position.needsUpdate = true;
  });

  const color   = isDark ? '#8b5cf6' : '#4f46e5';
  const blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;

  return (
    <group ref={groupRef}>
      <mesh geometry={geom}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.14} blending={blending} depthWrite={false} />
      </mesh>
      {/* Outer shell */}
      <mesh geometry={geom} scale={[1.04, 1.04, 1.04]}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.07} blending={blending} depthWrite={false} />
      </mesh>
      {/* Orbital ring */}
      <mesh rotation-y={Math.PI / 3.5}>
        <torusGeometry args={[110, 0.4, 3, 80]} />
        <meshBasicMaterial color={isDark ? '#22d3ee' : '#0284c7'} transparent opacity={0.09} blending={blending} depthWrite={false} />
      </mesh>
    </group>
  );
}
