import Image from 'next/image';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full p-6 z-50 flex items-center justify-between pointer-events-none">
            <div className="pointer-events-auto">
                {/* Logo */}
                <div className="relative h-8 w-48 md:h-10 md:w-64">
                    {/* Using the full text logo. Inverted for White Theme. */}
                    <Image
                        src="/assets/logo-full.png"
                        alt="The Narrative Identity"
                        fill
                        className="object-contain object-left invert"
                        priority
                    />
                </div>
            </div>

            {/* Navigation / Actions */}
            <nav className="pointer-events-auto flex items-center gap-6">
                <button className="text-sm font-medium text-gray-600 hover:text-black transition-colors uppercase tracking-widest">
                    Menu
                </button>
                <button className="px-5 py-2 bg-black text-white rounded-full font-bold text-sm hover:bg-[#f15a24] hover:text-white transition-colors cursor-pointer">
                    Start Project
                </button>
            </nav>
        </header>
    );
}
