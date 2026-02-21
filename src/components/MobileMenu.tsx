import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center p-6 md:hidden"
                >
                    <button
                        className="absolute top-8 right-6 text-white hover:text-corps-orange transition-colors p-2"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={36} />
                    </button>

                    <nav className="flex flex-col items-center gap-10 text-3xl font-black uppercase tracking-[0.2em]">
                        <a href="#" className="hover:text-corps-orange transition-colors" onClick={() => setIsOpen(false)}>Головна</a>
                        <a href="#" className="hover:text-corps-orange transition-colors" onClick={() => setIsOpen(false)}>Про корпус</a>
                        <a href="#" className="hover:text-corps-orange transition-colors" onClick={() => setIsOpen(false)}>Вакансії</a>
                        <a href="#" className="hover:text-corps-orange transition-colors" onClick={() => setIsOpen(false)}>Контакти</a>
                    </nav>

                    <div className="mt-16 w-full max-w-xs">
                        <button
                            className="w-full border-2 border-corps-orange text-corps-orange py-5 uppercase font-black tracking-widest hover:bg-corps-orange hover:text-black transition-all"
                            onClick={() => {
                                setIsOpen(false);
                                setTimeout(() => {
                                    const element = document.getElementById('application-form-element');
                                    if (element) {
                                        const yOffset = -100;
                                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                }, 300);
                            }}
                        >
                            Подати заявку
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
