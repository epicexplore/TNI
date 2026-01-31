'use client';

import { useRef, useState } from 'react';
import { Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

interface OrbProps {
    position: [number, number, number];
    color: string;
    label: string;
    description: string;
}

const Orb = ({ position, color, label, description }: OrbProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    const { viewport } = useThree();
    const isMobile = viewport.width < 5;

    // Adjust X position for mobile to keep them centered
    const responsivePos: [number, number, number] = [
        position[0] * (isMobile ? 0.5 : 1),
        position[1],
        position[2]
    ];

    return (
        <group position={responsivePos}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    onClick={() => setActive(!active)}
                    scale={active ? 1.5 : (hovered ? 1.2 : 1)}
                >
                    <sphereGeometry args={[0.5, 64, 64]} />
                    {/* Apple-Style Glass Material */}
                    <meshPhysicalMaterial
                        color={active ? color : (hovered ? color : "white")}
                        transmission={0.95} // Glass-like transparency
                        thickness={1} // Refraction depth
                        roughness={0.1} // Smooth polish
                        metalness={0.1} // Slight metallic sheen
                        clearcoat={1} // High gloss
                        clearcoatRoughness={0}
                        ior={1.5} // Index of Refraction (Glass)
                    />
                </mesh>

                <Text
                    position={[0, -0.8, 0]}
                    fontSize={0.2}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>

                {active && (
                    <Html distanceFactor={10}>
                        <div className="bg-black/80 border border-white/20 p-4 rounded-lg w-64 backdrop-blur-md text-white fade-in transform -translate-x-1/2 -translate-y-1/2">
                            <h3 className="font-bold text-lg mb-2" style={{ color: color }}>{label}</h3>
                            <p className="text-sm text-gray-300">{description}</p>
                        </div>
                    </Html>
                )}
            </Float>
        </group>
    );
};

const BRAND_ORANGE = "#f15a24";
const GLASS_CLEAR = "#ffffff";

export function NarrativeOrbs() {
    return (
        <>
            {/* 1. Belief (Section 2, z ~ -10) */}
            <Orb position={[0, 0, -10]} color={BRAND_ORANGE} label="The Belief" description="Branding is not decoration. It is clarity." />

            {/* 2. Problem (Section 3, z ~ -20) */}
            {/* Maybe a dark orb representing 'Noise'? */}
            <Orb position={[-3, 2, -20]} color="#333333" label="The Noise" description="Trends without truth." />

            {/* 3. Method (Section 4, Tunnel/Process) */}
            {/* We will let CameraRig handle the flythrough, or place orbs for steps */}

            {/* 4. Work (Section 5, z ~ -40) */}
            <Orb position={[3, -1, -40]} color={BRAND_ORANGE} label="Transformation" description="From chaos to clarity." />

            {/* 5. Voices (Section 6, z ~ -50) */}
            <Orb position={[-2, 1, -50]} color={GLASS_CLEAR} label="Sonic Landscapes" description="Podcasts & Audio." />

            {/* 6. Legacy (Section 7, z ~ -60) */}
            <Orb position={[0, 0, -60]} color={BRAND_ORANGE} label="Legacy" description="Stories that outlast." />
        </>
    );
}
