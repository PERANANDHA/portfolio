'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticleField from './three/ParticleField';
import CoreSphere from './three/CoreSphere';

export default function Scene3D() {
  return (
    <div className="fixed inset-0 pointer-events-none scene-3d-container">
      <Canvas
        camera={{ position: [0, 0, 180], fov: 70 }}
        gl={{ alpha: true, antialias: true }}
        className="scene-3d-canvas"
      >
        <Suspense fallback={null}>
          <ParticleField />
          <CoreSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
