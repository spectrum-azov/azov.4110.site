import { Menu, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


interface HeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-corps-dark/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-corps-orange">
                        <img
                            src="https://azov.army/wp-content/uploads/2025/04/korpus-azov-696kh696.png"
                            alt="12-та бригада спеціального призначення НГУ"
                            className="h-12 w-auto"
                        />
                    </div>
                    <div className="flex flex-col leading-tight md:leading-none">
                        <span className="font-bold text-corps-orange tracking-wider text-[10px] xs:text-[11px] sm:text-xs md:text-sm uppercase">12-та бригада спеціального призначення </span>
                        <span className="font-bold text-white tracking-widest text-[14px] xs:text-[16px] sm:text-lg md:text-xl uppercase">Національної Гвардії України</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => {
                            const element = document.getElementById('application-form-element');
                            if (element) {
                                const yOffset = -100;
                                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                        }}
                        className="border border-corps-orange text-corps-orange px-6 py-2 uppercase font-bold tracking-wider hover:bg-corps-orange hover:text-black transition-colors duration-300 min-h-[44px]"
                    >
                        Подати заявку
                    </button>

                    <div className="flex items-center gap-2 cursor-pointer hover:text-corps-orange transition-colors min-h-[44px]">
                        <img src="https://flagcdn.com/w20/ua.png" alt="Ukraine" className="w-5 h-auto rounded-sm" />
                        <span className="font-bold">УКР</span>
                        <ChevronDown size={16} />
                    </div>

                    <button
                        className="flex items-center gap-2 font-bold uppercase tracking-wider hover:text-corps-orange transition-colors min-h-[44px]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={24} />
                        <span>Меню</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white min-w-[44px] min-h-[44px] flex items-center justify-center p-2 z-[60]"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

            </div>

        </header>
    );
}
