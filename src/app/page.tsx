'use client';

import dynamic from 'next/dynamic';
import { PerspectiveCamera, ScrollControls, Scroll } from '@react-three/drei';

// Dynamically import Scene to avoid SSR issues with Canvas
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false });
const MicroScene = dynamic(() => import('@/components/canvas/MicroScene').then((mod) => mod.MicroScene), { ssr: false });
import { CinematicWorld } from '@/components/canvas/CinematicWorld';

import Overlay from '@/components/dom/Overlay';
import Loader from '@/components/dom/Loader';

export default function Home() {
  return (
    <main className="relative w-full h-screen">
      <Loader />
      <Scene className="h-full w-full">
        <ScrollControls pages={8} damping={0.3}>
          {/* 3D Content (Fixed Background) */}
          <PerspectiveCamera position={[0, 0, 10]} fov={45} makeDefault />
          {/* Cinematic 3D World */}
          <CinematicWorld />

          {/* HTML Overlay (Optional: Can be reduced or removed if 3D text is enough) */}
          <Scroll html style={{ width: '100%', height: '100%' }}>
            <Overlay />
          </Scroll>
        </ScrollControls>
      </Scene>
    </main>
  );
}
