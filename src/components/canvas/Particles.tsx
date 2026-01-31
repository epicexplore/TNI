'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Particles({ count = 200 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const light = useRef<THREE.PointLight>(null);

    // Generate random positions
    const dummy = new THREE.Object3D();
    const particles = new Array(count).fill(0).map(() => ({
        position: [
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        ],
        rotation: [0, 0, 0],
        scale: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.5
    }));

    useFrame((state) => {
        particles.forEach((particle, i) => {
            // float particles
            const t = state.clock.getElapsedTime() * particle.speed;

            dummy.position.set(
                particle.position[0] as number,
                particle.position[1] as number + Math.sin(t) * 0.5,
                particle.position[2] as number
            );
            dummy.scale.setScalar(particle.scale);
            dummy.updateMatrix();

            if (mesh.current) {
                mesh.current.setMatrixAt(i, dummy.matrix);
            }
        })
        if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            <instancedMesh ref={mesh} args={[undefined, undefined, count]} >
                <dodecahedronGeometry args={[0.05, 0]} />
                <meshStandardMaterial color="#1a1a1a" transparent opacity={0.6} />
            </instancedMesh>
        </>
    );
}
