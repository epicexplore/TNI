'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ProcessTunnel() {
    const groupRef = useRef<THREE.Group>(null);

    // Creating a series of rings to form a "Tunnel"
    // Start deep (z=-35) so it doesn't crowd the hero
    const rings = Array.from({ length: 15 }).map((_, i) => ({
        z: -35 - (i * 3), // Spaced out from -35 to -80
        scale: 1 + (i * 0.1),
        rotation: i * 0.1
    }));

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Slowly rotate the entire tunnel
            groupRef.current.rotation.z += delta * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {rings.map((ring, i) => (
                <mesh key={i} position={[0, 0, ring.z]} rotation={[0, 0, ring.rotation]}>
                    <torusGeometry args={[3 * ring.scale, 0.02, 16, 100]} />
                    <meshStandardMaterial
                        color="#000000"
                        emissive="#f15a24"
                        emissiveIntensity={0.2}
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            ))}
        </group>
    );
}
