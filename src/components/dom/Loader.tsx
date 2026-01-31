'use client';

import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
    const { active, progress } = useProgress();
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (!active && progress === 100) {
            // Delay hide to allow "System Ready" animation
            const timer = setTimeout(() => setShow(false), 800);
            return () => clearTimeout(timer);
        }
    }, [active, progress]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white font-mono pointer-events-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    <div className="relative z-10 flex flex-col items-center gap-8">
                        {/* Text Glitch Effect */}
                        <div className="flex flex-col items-center">
                            <span className="text-xs tracking-[0.5em] text-brand-orange mb-2 animate-pulse">INITIALIZING CORE</span>
                            <h1 className="text-4xl font-bold tracking-tighter">TNI // SYSTEM</h1>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-brand-orange"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "spring", stiffness: 50 }}
                            />
                        </div>

                        <span className="text-xs opacity-50">
                            LOADING ASSETS :: {progress.toFixed(0)}%
                        </span>
                    </div>

                    {/* Corner Brackets */}
                    <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-white/20" />
                    <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/20" />
                    <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/20" />
                    <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-white/20" />

                </motion.div>
            )}
        </AnimatePresence>
    );
}
