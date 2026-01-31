// AAA Cinematic World Component
'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float, MeshReflectorMaterial, Stars, useScroll, Instance, Instances, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { GlobalArtifact } from './GlobalArtifact';

// Structural Pillar: A massive physical object holding the narrative
const Pillar = ({ text, position, rotation, index }: { text: string, position: [number, number, number], rotation: [number, number, number], index: number }) => {
    const groupRef = useRef<THREE.Group>(null);
    const textRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        // Subtle floating independent of camera
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.5;
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            {/* The physical monolith block */}
            <mesh position={[0, 0, -2]} castShadow receiveShadow>
                <boxGeometry args={[10, 20, 2]} />
                <meshStandardMaterial
                    color="#111"
                    metalness={0.8}
                    roughness={0.2}
                    envMapIntensity={2}
                />
            </mesh>

            {/* Glowing Edge Lines */}
            <mesh position={[0, 0, -0.9]}>
                <boxGeometry args={[10.1, 20.1, 0.1]} />
                <meshBasicMaterial color="#f15a24" wireframe opacity={0.1} transparent />
            </mesh>

            {/* Holographic Text */}
            <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
                <Text
                    fontSize={3}
                    letterSpacing={-0.05}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    position={[0, 0, 0]}
                >
                    {text}
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#f15a24"
                        emissiveIntensity={2}
                        toneMapped={false}
                    />
                </Text>
            </Float>
        </group>
    );
};

export function CinematicWorld() {
    const { scene } = useThree();
    const scroll = useScroll();
    const starsRef = useRef<any>(null);

    // AAA Atmosphere
    useMemo(() => {
        scene.fog = new THREE.FogExp2('#020202', 0.03); // Deep void fog
        scene.background = new THREE.Color('#020202');
    }, [scene]);

    useFrame((state, delta) => {
        const scrollOffset = scroll.offset;

        // 1. Camera Fly-Through (Smoothed)
        const targetZ = 10 - (scrollOffset * 125); // Adjusted for 8 pages
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1);
        state.camera.position.y = 3 + Math.sin(state.clock.elapsedTime * 0.2) * 1;

        // Look ahead
        state.camera.lookAt(0, 2, state.camera.position.z - 20);

        // 2. Warp Speed Effect
        // We calculate 'velocity' based on how fast scrollOffset changes is hard here w/o ref,
        // so we use the raw delta of the camera z movement for a "speed" proxy.
        // Actually, let's just cheat and use a constant drift + scroll data if available.
        // For Warp, we'll stretch stars.
        if (starsRef.current) {
            // Stretch stars layout when moving fast? 
            // Better: Move stars towards camera to simulate speed
            starsRef.current.position.z = state.camera.position.z; // Stars follow camera
            starsRef.current.rotation.z += delta * 0.1; // Slow spin
        }
    });

    return (
        <group>
            {/* Infinite Reflective Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
                <planeGeometry args={[200, 500]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={80} // High reflection
                    roughness={0.8} // Matte/Wet
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#050505"
                    metalness={0.6}
                    mirror={0.5}
                />
            </mesh>

            {/* Volumetric Lights */}
            <pointLight position={[10, 20, -20]} intensity={5} color="#f15a24" distance={50} decay={2} />
            <pointLight position={[-10, 10, -60]} intensity={5} color="#00ffff" distance={50} decay={2} />
            <ambientLight intensity={0.2} />

            {/* Narrative Pillars (The Level Design) */}
            {/* Narrative Pillars (The Level Design) */}

            {/* HERO ARTIFACT: The Brand Core (Interactive) */}
            <group position={[0, 4, -4]}>
                <PresentationControls
                    global={false} // Only control this element
                    cursor={true}
                    snap={true} // Snap back to center
                    speed={1.5}
                    zoom={1.2}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]} // Limit vertical
                    azimuth={[-Math.PI / 4, Math.PI / 4]} // Limit horizontal
                >
                    <GlobalArtifact />
                </PresentationControls>
            </group>

            <Pillar text="SILENCE" position={[0, 5, -20]} rotation={[0, 0, 0]} index={0} />
            <Pillar text="BELIEF" position={[8, 5, -40]} rotation={[0, -0.5, 0]} index={1} />
            <Pillar text="NOISE" position={[-8, 5, -60]} rotation={[0, 0.5, 0]} index={2} />
            <Pillar text="CLARITY" position={[0, 5, -80]} rotation={[0, 0, 0]} index={3} />
            <Pillar text="IMPACT" position={[10, 5, -100]} rotation={[0, -0.3, 0]} index={4} />
            <Pillar text="BEGIN" position={[0, 5, -120]} rotation={[0, 0, 0]} index={5} />

            {/* Starfield (Warp Capable) */}
            <group ref={starsRef}>
                <Stars radius={50} depth={100} count={10000} factor={4} saturation={0} fade speed={1} />
            </group>
        </group>
    );
}
