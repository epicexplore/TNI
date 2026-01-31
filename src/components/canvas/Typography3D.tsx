'use client';

import { Text, Float } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

interface Text3DProps {
    text: string;
    position: [number, number, number];
    size?: number;
    color?: string;
    rotation?: [number, number, number];
}

const FloatingText = ({ text, position, size = 1, color = "#000000", rotation = [0, 0, 0] }: Text3DProps) => {
    const { viewport } = useThree();
    const isMobile = viewport.width < 5;
    const responsiveSize = isMobile ? size * 0.6 : size;

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Text
                position={position}
                fontSize={responsiveSize}
                color={color}
                rotation={rotation}
                anchorX="center"
                anchorY="middle"
                maxWidth={isMobile ? 3 : 10}
                textAlign="center"
            >
                {text}
            </Text>
        </Float>
    );
};

export function Typography3D() {
    const ORANGE = "#f15a24";

    return (
        <group>
            {/* The Belief Section (z ~ -10) */}
            <FloatingText
                text="CLARITY"
                position={[3, 1, -12]}
                size={0.6}
                color="#000000"
                rotation={[0, -0.2, 0]}
            />

            {/* The Problem (z ~ -20) */}
            <FloatingText
                text="NOISE"
                position={[-2, 3, -22]}
                size={0.8}
                color="#888"
            />
            <FloatingText
                text="SIGNAL"
                position={[2, -1, -25]}
                size={0.8}
                color={ORANGE}
            />
        </group>
    );
}
