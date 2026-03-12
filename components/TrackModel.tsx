// Fix: Removed the triple-slash directive. Modern TypeScript setups infer types from imports, and the directive was causing a "Cannot find type definition file" error.
import React, { useMemo } from 'react';
import * as THREE from 'three';
// To use a real GLB model, uncomment these imports
// import { useLoader } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * To load a real .glb track model:
 * 1. Place your track.glb file in the /public/models/ directory.
 * 2. Uncomment the imports above.
 * 3. Replace the ProceduralTrack component with the GLBTrackModel component in the export.
 */

// const GLBTrackModel: React.FC = () => {
//   // The path is relative to the `public` folder
//   const gltf = useLoader(GLTFLoader, '/models/track.glb');
//   return <primitive object={gltf.scene} scale={1} position={[0, 0, 0]} />;
// };

const ProceduralTrack: React.FC = () => {
  const curve = useMemo(() => {
    // A simple curve to represent a race track
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-60, 0, 60),
      new THREE.Vector3(-60, 0, -60),
      new THREE.Vector3(0, 0, -80),
      new THREE.Vector3(60, 0, -60),
      new THREE.Vector3(60, 0, 0),
      new THREE.Vector3(40, 0, 40),
      new THREE.Vector3(0, 0, 60),
    ], true);
  }, []);

  const tubeRadius = 1;
  const tubularSegments = 200;
  const radialSegments = 8;

  return (
    <group>
      <mesh receiveShadow castShadow>
        <tubeGeometry args={[curve, tubularSegments, tubeRadius * 2, radialSegments, false]} />
        <meshStandardMaterial color="#404040" side={THREE.DoubleSide} />
      </mesh>
      {/* Track markings */}
      <mesh>
         <tubeGeometry args={[curve, tubularSegments, tubeRadius * 2.1, radialSegments, false]} />
         <meshStandardMaterial color="#ffffff" side={THREE.BackSide} />
      </mesh>
       <mesh>
         <tubeGeometry args={[curve, tubularSegments, tubeRadius * 1.9, radialSegments, false]} />
         <meshStandardMaterial color="#ffffff" side={THREE.FrontSide} />
      </mesh>
      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -tubeRadius*2, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#1a2e1a" />
      </mesh>
    </group>
  );
};


// By default, we export the placeholder. Change this to GLBTrackModel when you have a model.
const TrackModel: React.FC = () => {
  return <ProceduralTrack />;
};

export default TrackModel;
