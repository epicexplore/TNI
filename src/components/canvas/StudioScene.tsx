'use client';

import { Environment, SoftShadows } from '@react-three/drei';

export function StudioScene() {
    return (
        <>
            <SoftShadows size={10} samples={10} focus={0.5} />
            {/* High-end Studio Lighting */}
            <Environment preset="studio" blur={0.8} background={false} />

            {/* Key Light */}
            <directionalLight
                position={[5, 5, 5]}
                intensity={2}
                castShadow
                shadow-bias={-0.001}
            />

            {/* Fill Light (Cooler to contrast warm accents) */}
            <spotLight
                position={[-5, 5, -5]}
                intensity={1}
                color="#e0e0e0"
            />

            {/* Rim Light for glass edges */}
            <spotLight
                position={[0, 10, -10]}
                intensity={5}
                color="white"
                angle={0.5}
                penumbra={1}
            />

            {/* Ambient Floor Reflection (Optional) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial
                    color="#f0f0f0"
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>
        </>
    );
}
