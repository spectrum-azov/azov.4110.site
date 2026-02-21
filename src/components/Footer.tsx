import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="text-corps-orange">
                                <img
                                    src="https://azov.army/wp-content/uploads/2025/04/korpus-azov-696kh696.png"
                                    alt="12-та бригада спеціального призначення НГУ"
                                    className="h-10 w-auto"
                                />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-bold text-corps-orange tracking-wider text-xs">12-та бригада спеціального призначення</span>
                                <span className="font-bold text-white tracking-widest text-base">НГУ</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="w-11 h-11 border border-white/20 flex items-center justify-center hover:bg-corps-orange hover:text-black hover:border-corps-orange transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-11 h-11 border border-white/20 flex items-center justify-center hover:bg-corps-orange hover:text-black hover:border-corps-orange transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-11 h-11 border border-white/20 flex items-center justify-center hover:bg-corps-orange hover:text-black hover:border-corps-orange transition-all">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-11 h-11 border border-white/20 flex items-center justify-center hover:bg-corps-orange hover:text-black hover:border-corps-orange transition-all">
                                <Youtube size={20} />
                            </a>
                        </div>

                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider mb-6">Головна</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-corps-orange transition-colors">Про корпус</a></li>
                            <li><a href="#" className="hover:text-corps-orange transition-colors">Вакансії</a></li>
                            <li><a href="#" className="hover:text-corps-orange transition-colors">Контакти</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider mb-6">Для іноземців</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-corps-orange transition-colors">Join the Legion</a></li>
                            <li><a href="#" className="hover:text-corps-orange transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider mb-6">Тестовий тиждень</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-corps-orange transition-colors">Реєстрація</a></li>
                            <li><a href="#" className="hover:text-corps-orange transition-colors">Програма</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2024 12-та бригада спеціального призначення НГУ. Всі права захищено.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
