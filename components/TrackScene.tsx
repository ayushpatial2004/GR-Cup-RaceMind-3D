// Fix: Removed the triple-slash directive. Modern TypeScript setups infer types from imports, and the directive was causing a "Cannot find type definition file" error.
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import TrackModel from './TrackModel';

const TrackScene: React.FC = () => {
  return (
    <Canvas 
      camera={{ position: [0, 50, 100], fov: 45 }} 
      shadows
      className="bg-race-bg"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[20, 40, 20]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <TrackModel />
        <Environment preset="sunset" />
      </Suspense>
      <OrbitControls 
        minDistance={20} 
        maxDistance={200} 
        enablePan={true}
        enableZoom={true}
      />
    </Canvas>
  );
};

export default TrackScene;
