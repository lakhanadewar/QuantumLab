
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Stars, Environment, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Nucleus = () => (
  <group>
    <Sphere args={[0.3, 32, 32]}>
      <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
    </Sphere>
    <Sphere args={[0.28, 32, 32]} position={[0.1, 0.1, 0.1]}>
      <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
    </Sphere>
  </group>
);

const Electron = ({ radius, speed, offset = 0 }: { radius: number, speed: number, offset?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed + offset;
      ref.current.position.set(
        Math.cos(t) * radius,
        0,
        Math.sin(t) * radius
      );
    }
  });

  return (
    <group>
      {/* Orbital Path */}
      <Torus args={[radius, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </Torus>
      {/* Electron Particle */}
      <Sphere ref={ref} args={[0.08, 16, 16]}>
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={2} />
        <pointLight intensity={0.5} color="#a78bfa" />
      </Sphere>
    </group>
  );
};

export const AtomScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
      <color attach="background" args={['#0c0a09']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <Nucleus />
      <Electron radius={2} speed={1.5} />
      <Electron radius={3.5} speed={0.8} offset={Math.PI} />
      <Electron radius={5} speed={0.5} offset={0.5} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="city" />
    </Canvas>
  );
};

const WaveParticle = ({ position, color }: { position: [number, number, number], color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.5;
      ref.current.scale.setScalar(0.8 + Math.sin(t * 3) * 0.2);
    }
  });

  return (
    <Sphere ref={ref} args={[0.3, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        speed={4}
        distort={0.4}
        radius={1}
      />
    </Sphere>
  );
};

export const ParticleWaveScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <color attach="background" args={['#0c0a09']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group>
          <WaveParticle position={[-2, 0, 0]} color="#8b5cf6" />
          <WaveParticle position={[0, 0, 0]} color="#ec4899" />
          <WaveParticle position={[2, 0, 0]} color="#3b82f6" />
        </group>
      </Float>
      
      <Stars radius={50} count={2000} />
    </Canvas>
  );
};

const InteractivePoints = ({ positions }: { positions: Float32Array }) => {
  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export const HeroScene: React.FC = () => {
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <InteractivePoints positions={positions} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};
