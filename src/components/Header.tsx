import { Menu, ChevronDown } from 'lucide-react';

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
                    <button className="border border-corps-orange text-corps-orange px-6 py-2 uppercase font-bold tracking-wider hover:bg-corps-orange hover:text-black transition-colors duration-300">
                        Подати заявку
                    </button>

                    <div className="flex items-center gap-2 cursor-pointer hover:text-corps-orange transition-colors">
                        <img src="https://flagcdn.com/w20/ua.png" alt="Ukraine" className="w-5 h-auto rounded-sm" />
                        <span className="font-bold">УКР</span>
                        <ChevronDown size={16} />
                    </div>

                    <button
                        className="flex items-center gap-2 font-bold uppercase tracking-wider hover:text-corps-orange transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={24} />
                        <span>Меню</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu size={28} />
                </button>
            </div>
        </header>
    );
}
