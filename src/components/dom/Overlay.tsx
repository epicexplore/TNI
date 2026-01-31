'use client';

import { motion } from 'framer-motion';

// --- Shared Components ---

// Glass-Holo Panel: The core UI container for the AAA look
const GlassPanel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`relative backdrop-blur-xl bg-black/40 border border-white/10 p-8 rounded-lg shadow-2xl overflow-hidden group ${className}`}>
        {/* Holographic Gradient sheen */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        {/* Glow border effect */}
        <div className="absolute inset-0 border border-brand-orange/20 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        {children}
    </div>
);

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <section className={`min-h-screen w-full flex flex-col justify-center relative z-10 p-8 md:p-24 pointer-events-none ${className}`}>
        <div className="pointer-events-auto">
            {children}
        </div>
    </section>
);

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} // Apple/AAA ease
    >
        {children}
    </motion.div>
);

const DataLabel = ({ children }: { children: React.ReactNode }) => (
    <span className="font-mono text-[10px] text-brand-orange tracking-[0.3em] uppercase mb-3 block flex items-center gap-2">
        <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
        {children}
    </span>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
        {children}
    </h2>
);

const HoloButton = ({ children, primary = false }: { children: React.ReactNode, primary?: boolean }) => (
    <button className={`
        relative px-8 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-300
        overflow-hidden group
        ${primary ? 'text-black' : 'text-white hover:text-brand-orange'}
    `}>
        {/* Background Layer */}
        <div className={`absolute inset-0 ${primary ? 'bg-brand-orange' : 'bg-white/10'} backdrop-blur-md transition-all duration-300 group-hover:scale-[1.02]`} />

        {/* Scanline Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
            {children} {primary && '→'}
        </span>
    </button>
);

// --- Sections ---

// 1. Hero
const Hero = () => (
    <section className="h-screen w-full flex flex-col justify-end pb-32 pl-12 relative">
        <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5 }}
            className="pointer-events-auto"
        >
            <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                    <span>SYS.VER.2.4</span>
                    <div className="h-[1px] w-12 bg-white/20" />
                    <span>ONLINE</span>
                </div>
                <h1 className="text-7xl font-bold tracking-tighter text-white/10 uppercase">Narrative<br />Identity</h1>
            </div>
            <HoloButton primary>Enter Interface</HoloButton>
        </motion.div>
    </section>
);

// 2. The Belief
const Belief = () => (
    <Section className="items-start">
        <GlassPanel className="max-w-xl">
            <FadeIn>
                <DataLabel>Core Directive</DataLabel>
                <SectionTitle>
                    Branding is<br />Clarity.
                </SectionTitle>
                <p className="text-lg text-white/70 font-light leading-relaxed border-l-2 border-brand-orange pl-6">
                    Marketing is not noise. It is resonance. We believe in stripping away the excess to reveal the <strong className="text-white">core truth</strong>.
                </p>
            </FadeIn>
        </GlassPanel>
    </Section>
);

// 3. The Problem
const Problem = () => (
    <Section className="items-end text-right">
        <GlassPanel className="max-w-xl text-right items-end flex flex-col">
            <FadeIn>
                <DataLabel>Signal Interference</DataLabel>
                <SectionTitle>The Industry<br />of Noise.</SectionTitle>
                <div className="grid gap-4 mt-8 w-full">
                    {["Trends over Truth", "Visibility without Connection", "Content without Meaning"].map((item, i) => (
                        <div key={i} className="flex items-center justify-end gap-4 p-4 bg-white/5 rounded hover:bg-white/10 transition-colors cursor-crosshair">
                            <span className="text-sm font-mono opacity-80">{item}</span>
                            <span className="text-brand-orange text-xs">[ERR]</span>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </GlassPanel>
    </Section>
);

// 4. The Method
const Method = () => (
    <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto">
            <div /> {/* 3D Spacer */}
            <GlassPanel>
                <FadeIn>
                    <DataLabel>Execution Protocol</DataLabel>
                    <div className="space-y-2 font-mono text-sm mt-8">
                        {['Roots', 'Truth', 'Voice', 'Expression', 'Legacy'].map((step, i) => (
                            <div key={i} className="group flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer">
                                <span className="text-brand-orange group-hover:scale-110 transition-transform">0{i + 1}</span>
                                <span className="opacity-60 group-hover:opacity-100 uppercase tracking-widest">{step}</span>
                                <span className="opacity-0 group-hover:opacity-100 text-[10px] text-brand-orange">ACCESSING...</span>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </GlassPanel>
        </div>
    </Section>
);

// 5. The Work
const Work = () => (
    <Section className="items-start">
        <GlassPanel className="max-w-2xl">
            <div className="flex justify-between items-start mb-8">
                <DataLabel>Project Archive</DataLabel>
                <span className="font-mono text-xs text-green-400 animate-pulse">● OPTIMIZED</span>
            </div>

            <h3 className="text-5xl font-bold mb-2">Project Alpha</h3>
            <span className="text-sm font-mono text-white/50 block mb-8">SECTOR: FINTECH // REBRAND</span>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded text-center border border-white/5">
                    <span className="block text-2xl font-bold text-white mb-1">+300%</span>
                    <span className="text-[10px] font-mono text-white/40 uppercase">Valuation</span>
                </div>
                <div className="bg-black/40 p-4 rounded text-center border border-white/5">
                    <span className="block text-2xl font-bold text-white mb-1">Global</span>
                    <span className="text-[10px] font-mono text-white/40 uppercase">Reach</span>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <HoloButton>View Full Case Study</HoloButton>
            </div>
        </GlassPanel>
    </Section>
);

// 6. The Voices
const Voices = () => (
    <Section className="items-end">
        <GlassPanel className="text-right">
            <DataLabel>Audio Transmissions</DataLabel>
            <ul className="font-mono text-sm space-y-2 mt-4">
                <li className="p-4 bg-white/5 border border-transparent hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all cursor-pointer flex justify-between gap-8 items-center group">
                    <span className="opacity-0 group-hover:opacity-100 text-[10px] animate-pulse">PLAYING</span>
                    <span>Ep.01 :: Architecture of Silence</span>
                </li>
                <li className="p-4 bg-white/5 border border-transparent hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all cursor-pointer flex justify-end">
                    Ep.02 :: Legacy Code
                </li>
                <li className="p-4 bg-white/5 border border-transparent hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all cursor-pointer flex justify-end">
                    Ep.03 :: Human Algorithm
                </li>
            </ul>
        </GlassPanel>
    </Section>
);

// 7. Founder
const Founder = () => (
    <Section className="items-center text-center">
        <div className="max-w-3xl backdrop-blur-sm p-12 rounded-2xl border-y border-white/10 bg-gradient-to-r from-transparent via-black/50 to-transparent">
            <DataLabel>Origin Signal</DataLabel>
            <p className="text-3xl md:text-4xl italic font-serif my-8 opacity-90 leading-tight">
                "The world doesn't need more content.<br />It needs <span className="text-brand-orange">meaning</span>."
            </p>
            <p className="font-mono text-xs opacity-50 tracking-[0.2em]">-- FOUNDERS, TNI [2026]</p>
        </div>
    </Section>
);

// 9. Invitation (Final CTA)
const Invitation = () => (
    <Section className="items-center text-center">
        <GlassPanel className="p-12 max-w-4xl w-full">
            <FadeIn>
                <div className="flex flex-col items-center">
                    <DataLabel>Transmission Endpoint</DataLabel>
                    <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">
                        READY?
                    </h2>
                    <p className="text-xl opacity-60 font-mono mb-12 max-w-2xl">
                        The narrative is waiting. Signal us to begin the transformation.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
                        <div className="p-6 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors text-left group cursor-pointer">
                            <span className="block text-xs font-mono text-brand-orange mb-2">[OPTION A]</span>
                            <span className="text-2xl font-bold block mb-1">Start a Project</span>
                            <span className="text-xs opacity-50 group-hover:opacity-100 transition-opacity">Initiate robust onboarding sequence.</span>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors text-left group cursor-pointer">
                            <span className="block text-xs font-mono text-brand-orange mb-2">[OPTION B]</span>
                            <span className="text-2xl font-bold block mb-1">Schedule Call</span>
                            <span className="text-xs opacity-50 group-hover:opacity-100 transition-opacity">Direct line to leadership. 15 Min.</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <HoloButton primary>Initialize</HoloButton>
                    </div>
                </div>
            </FadeIn>
        </GlassPanel>
    </Section>
);

// 10. Footer
const Footer = () => (
    <footer className="w-full p-8 border-t border-white/10 flex justify-between font-mono text-[10px] uppercase opacity-50 bg-black/80 backdrop-blur-md">
        <span>TNI // SYSTEM V3.0 // AAA</span>
        <div className="flex gap-4">
            <span className="cursor-pointer hover:text-white">Instagram</span>
            <span className="cursor-pointer hover:text-white">LinkedIn</span>
            <span className="cursor-pointer hover:text-white">Twitter</span>
        </div>
    </footer>
);


export default function Overlay() {
    return (
        <div className="w-full text-white font-sans selection:bg-brand-orange selection:text-black relative z-50 pointer-events-none">

            {/* Top HUD Bar */}
            <header className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-overlay pointer-events-none">
                <span className="font-mono text-xs tracking-[0.5em] font-bold opacity-80">TNI // NARRATIVE IDENTITY</span>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                    <span className="font-mono text-[10px] opacity-60">LIVE FEED</span>
                </div>
            </header>

            {/* Cinematic Vignette Overlay */}
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-0" />

            {/* Main Scroll Content */}
            <main className="w-full">
                <Hero />
                <Belief />
                <Problem />
                <Method />
                <Work />
                <Voices />
                <Founder />
                <Invitation />
                <Footer />
            </main>
        </div>
    );
}
