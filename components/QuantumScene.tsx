
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Stars, Environment, Box } from '@react-three/drei';
import * as THREE from 'three';

const QuantumParticle = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.2;
      ref.current.rotation.x = t * 0.5;
      ref.current.rotation.z = t * 0.3;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.5}
        distort={0.4}
        speed={2}
      />
    </Sphere>
  );
};

const MacroscopicWave = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.sin(t * 0.2) * 0.2;
       ref.current.rotation.y = t * 0.1;
    }
  });

  return (
    <Torus ref={ref} args={[3, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={0.5} transparent opacity={0.6} wireframe />
    </Torus>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <QuantumParticle position={[0, 0, 0]} color="#4F46E5" scale={1.2} />
          <MacroscopicWave />
        </Float>
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <QuantumParticle position={[-3, 1, -2]} color="#9333EA" scale={0.5} />
           <QuantumParticle position={[3, -1, -3]} color="#C5A059" scale={0.6} />
        </Float>

        <Environment preset="city" />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        {/* Warm Coffee Lighting */}
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2.5} color="#FFD700" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#8B4513" />
        <Environment preset="lobby" />
        
        <Float rotationIntensity={0.4} floatIntensity={0.2} speed={1}>
          <group rotation={[0, 0, 0]} position={[0, 0.5, 0]}>
            {/* Abstract Extraction Tower */}
            
            {/* Top Reservoir */}
            <Cylinder args={[1.2, 1.2, 0.2, 64]} position={[0, 1, 0]}>
              <meshStandardMaterial color="#3E2723" metalness={0.8} roughness={0.2} />
            </Cylinder>
            
            {/* Filter Stage */}
            <Cylinder args={[1, 0.6, 0.8, 64]} position={[0, 0.4, 0]}>
              <meshPhysicalMaterial 
                color="#D7CCC8" 
                transmission={0.4}
                opacity={0.9}
                metalness={0.1} 
                roughness={0.1} 
                transparent
              />
            </Cylinder>
            
            {/* Bottom Vessel (Mixing Chamber) */}
            <Cylinder args={[0.8, 0.8, 0.6, 64]} position={[0, -0.6, 0]}>
              <meshPhysicalMaterial 
                color="#3E2723" 
                transmission={0.8}
                opacity={0.9}
                metalness={0.2} 
                roughness={0} 
                transparent
              />
            </Cylinder>

            {/* Connecting Rods / Frame */}
            <Cylinder args={[0.04, 0.04, 2, 16]} position={[1, 0.2, 0]}>
               <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[0.04, 0.04, 2, 16]} position={[-1, 0.2, 0]}>
               <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
            </Cylinder>

            {/* Copper Details */}
            <Torus args={[0.7, 0.02, 16, 64]} position={[0, -0.2, 0]} rotation={[Math.PI/2, 0, 0]}>
               <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.3} />
            </Torus>
             <Torus args={[0.4, 0.02, 16, 64]} position={[0, -0.95, 0]} rotation={[Math.PI/2, 0, 0]}>
               <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.3} />
            </Torus>
            
            {/* Base */}
             <Box args={[2.2, 0.1, 1]} position={[0, -1, 0]}>
                <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.8} />
            </Box>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
