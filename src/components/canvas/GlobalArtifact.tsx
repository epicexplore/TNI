'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Decal, Float } from '@react-three/drei';

export function GlobalArtifact() {
    // Load the brand asset
    const logoTexture = useTexture('/assets/tni-logo.png');

    const meshRef = useRef<THREE.Group>(null);

    // Subtle breathing animation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005; // Slow idle spin
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1; // Gentle tilt
        }
    });

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* 1. The Glass Disc (The Lens) */}
                <mesh castShadow receiveShadow>
                    {/* Cylinder shaped like a thick coin/lens */}
                    <cylinderGeometry args={[2.5, 2.5, 0.2, 64]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        roughness={0.1}
                        metalness={0.1}
                        transmission={0.95} // Glass
                        thickness={2}
                        envMapIntensity={2}
                        clearcoat={1}
                        ior={1.5}
                    />
                </mesh>

                {/* 2. The Glowing Logo (Decal or Plane inside) */}
                {/* We use a plane slightly in front/inside the glass to show the texture */}
                <mesh position={[0, 0, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[3, 3]} />
                    <meshBasicMaterial
                        map={logoTexture}
                        transparent
                        opacity={1}
                        color="#ffffff"
                        side={THREE.DoubleSide}
                        toneMapped={false}
                    />
                </mesh>

                {/* Backside Logo for depth */}
                <mesh position={[0, 0, -0.11]} rotation={[-Math.PI / 2, 0, Math.PI]}>
                    <planeGeometry args={[3, 3]} />
                    <meshBasicMaterial
                        map={logoTexture}
                        transparent
                        opacity={0.5}
                        color="#ffffff"
                        side={THREE.DoubleSide}
                        toneMapped={false}
                    />
                </mesh>

                {/* 3. Holographic Edge Ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2.6, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#f15a24" toneMapped={false} />
                </mesh>
            </Float>
        </group>
    );
}

// Preload to avoid pop-in
useTexture.preload('/assets/tni-logo.png');
