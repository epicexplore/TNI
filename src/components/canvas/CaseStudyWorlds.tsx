'use client';

import { Float } from '@react-three/drei';

export function CaseStudyWorlds() {
    return (
        <group>
            {/* Placeholder: A wireframe cube representing a case study space */}
            {/* Aligned near "The Work" orb at -45 */}
            <group position={[3, 0, -47]} rotation={[0, -0.5, 0]}>
                <Float speed={1}>
                    <mesh>
                        <boxGeometry args={[3, 2, 0.1]} />
                        <meshStandardMaterial color="#f15a24" transparent opacity={0.3} wireframe />
                    </mesh>
                </Float>
            </group>
        </group>
    );
}
