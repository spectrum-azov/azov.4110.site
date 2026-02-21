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
                    <div className="flex flex-col leading-none">
                        <span className="font-bold text-corps-orange tracking-wider text-sm">12-та бригада спеціального призначення </span>
                        <span className="font-bold text-white tracking-widest text-lg">Національної Гвардії України</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <button className="border border-corps-orange text-corps-orange px-6 py-2 uppercase font-bold tracking-wider hover:bg-corps-orange hover:text-black transition-colors duration-300 min-h-[44px]">
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
                <button className="md:hidden text-white min-w-[44px] min-h-[44px] flex items-center justify-center p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-20 z-40 bg-corps-dark flex flex-col items-center justify-center space-y-8 p-6 md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-8 text-2xl font-black uppercase tracking-widest">
                            <a href="#" className="hover:text-corps-orange transition-colors" onClick={() => setIsMenuOpen(false)}>Головна</a>
                            <a href="#" className="hover:text-corps-orange transition-colors" onClick={() => setIsMenuOpen(false)}>Про корпус</a>
                            <a href="#" className="hover:text-corps-orange transition-colors" onClick={() => setIsMenuOpen(false)}>Вакансії</a>
                            <a href="#" className="hover:text-corps-orange transition-colors" onClick={() => setIsMenuOpen(false)}>Контакти</a>
                        </nav>

                        <div className="pt-8 w-full max-w-xs">
                            <button
                                className="w-full border-2 border-corps-orange text-corps-orange py-4 uppercase font-black tracking-widest hover:bg-corps-orange hover:text-black transition-all min-h-[44px]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Подати заявку
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    );
}
