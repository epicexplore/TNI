import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense } from 'react';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';

interface SceneProps {
    children?: React.ReactNode;
    className?: string;
    eventSource?: React.RefObject<HTMLElement>;
    eventPrefix?: 'client' | 'offset' | 'page';
}

export default function Scene({ children, className, eventSource, eventPrefix = 'client' }: SceneProps) {
    return (
        <Canvas
            className={className}
            eventSource={eventSource as React.RefObject<HTMLElement>}
            eventPrefix={eventPrefix}
            shadows
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: false, stencil: false, alpha: false }} // Disable default AA for PostProcessing
        >
            <Suspense fallback={null}>
                {children}

                {/* Cinematic Post-Processing */}
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={1}
                        mipmapBlur
                        intensity={1.5}
                        radius={0.6}
                    />
                    <Noise opacity={0.05} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    <ChromaticAberration
                        offset={[0.002, 0.002]} // RGB Shift
                        radialModulation={false}
                        modulationOffset={0}
                    />
                </EffectComposer>

                <Preload all />
            </Suspense>
        </Canvas>
    );
}
