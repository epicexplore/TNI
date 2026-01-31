'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, useTexture, useScroll } from '@react-three/drei';
import * as THREE from 'three';

// A single micro-element (cube, pyramid, sphere)
const MicroElement = ({ position, rotation, scale, geometry }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialPos = useRef(new THREE.Vector3(...position));
    const randomOffset = Math.random() * 100;

    useFrame((state) => {
        if (!meshRef.current) return;

        // Base floating motion
        const time = state.clock.elapsedTime;
        meshRef.current.rotation.x = rotation[0] + Math.sin(time * 0.1 + randomOffset) * 0.2;
        meshRef.current.rotation.y = rotation[1] + Math.cos(time * 0.1 + randomOffset) * 0.2;

        // Mouse Repulsion Logic
        const mouse = state.pointer;
        const mouseVec = new THREE.Vector3(mouse.x * 10, mouse.y * 6, 0);

        const dir = new THREE.Vector3().subVectors(meshRef.current.position, mouseVec);
        const dist = dir.length();

        if (dist < 3) {
            const force = dir.normalize().multiplyScalar((3 - dist) * 0.05);
            meshRef.current.position.add(force);
        } else {
            meshRef.current.position.lerp(initialPos.current, 0.02);
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}
            scale={scale}
            geometry={geometry}
        >
            <meshPhysicalMaterial
                color="white"
                transmission={0.6}
                thickness={0.5}
                roughness={0.2}
                metalness={0.1}
                clearcoat={1}
            />
        </mesh>
    );
};

// 3D Stacked Logo Component
const StackedLogo = () => {
    const texture = useTexture('/assets/custom-logo.png');
    const meshRef = useRef<THREE.Group>(null);
    const scroll = useScroll(); // Access scroll data
    const [hovered, setHovered] = useState(false);

    // Create 8 layers for depth
    const layers = useMemo(() => Array.from({ length: 8 }), []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;

        // SCROLL ANIMATION:
        // 1. Rotation: Spin slowly as we scroll down
        meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.3 + (scroll.offset * Math.PI * 4);
        meshRef.current.rotation.x = Math.cos(time * 0.3) * 0.1 + (scroll.offset * Math.PI);

        // 2. Pulse Scale on Scroll
        const targetScale = 1 + scroll.offset * 0.5;
        meshRef.current.scale.setScalar(targetScale);
    });

    return (
        <Float speed={4} rotationIntensity={0.2} floatIntensity={0.5}>
            <group
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {layers.map((_, i) => (
                    <LogoLayer key={i} index={i} total={layers.length} texture={texture} />
                ))}
            </group>
        </Float>
    );
};

// Sub-component to handle per-layer logic
const LogoLayer = ({ index, total, texture }: any) => {
    const scroll = useScroll();
    const ref = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (!ref.current) return;
        // EXPAND on scroll: Layers separate on Z-axis
        const baseZ = index * 0.05 - (total * 0.05) / 2;
        const expansion = scroll.offset * (index - total / 2) * 1.5; // Dramatic expansion
        ref.current.position.z = baseZ + expansion;
    });

    return (
        <mesh ref={ref} position={[0, 0, 0]}>
            <planeGeometry args={[3, 3]} />
            <meshBasicMaterial
                map={texture}
                transparent
                alphaTest={0.5}
                color={index === total - 1 ? "white" : "#e0e0e0"}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

export function MicroScene() {
    // Generate random micro elements
    const elements = useMemo(() => {
        const items = [];
        const geometries = [
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.SphereGeometry(0.3, 32, 32),
            new THREE.ConeGeometry(0.3, 0.6, 32),
            new THREE.TorusGeometry(0.3, 0.1, 16, 32)
        ];

        for (let i = 0; i < 20; i++) {
            items.push({
                position: [
                    (Math.random() - 0.5) * 15, // Spread across X
                    (Math.random() - 0.5) * 8,  // Spread across Y
                    (Math.random() - 0.5) * 5   // Depth Z
                ],
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
                scale: 0.5 + Math.random() * 0.5,
                geometry: geometries[Math.floor(Math.random() * geometries.length)]
            });
        }
        return items;
    }, []);

    return (
        <group>
            <Environment preset="city" />
            <ambientLight intensity={1} />
            <directionalLight position={[5, 10, 5]} intensity={2} />

            {/* Background Plane for Glass Refraction */}
            <mesh position={[0, 0, -15]} scale={[100, 50, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#f15a24" toneMapped={false} />
            </mesh>

            {/* Render Elements */}
            {elements.map((el, i) => (
                <MicroElement key={i} {...el} />
            ))}

            {/* Central Hero: Stacked 3D Logo */}
            <StackedLogo />

            <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4} color="black" />
        </group>
    );
}
