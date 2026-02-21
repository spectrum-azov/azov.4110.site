import { motion } from 'motion/react';
import { Zap, Shield, ArrowUpRight } from 'lucide-react';
import { Vacancy, VacancyCategory } from '../types';

interface VacanciesSectionProps {
    activeTab: VacancyCategory;
    setActiveTab: (tab: VacancyCategory) => void;
    filteredVacancies: Vacancy[];
}

export default function VacanciesSection({
    activeTab,
    setActiveTab,
    filteredVacancies
}: VacanciesSectionProps) {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="flex w-full mb-12 border border-corps-orange/30">
                <button
                    onClick={() => setActiveTab('combat')}
                    className={`flex-1 py-6 flex items-center justify-center gap-3 text-xl font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'combat'
                        ? 'bg-[#D4AF7A] text-black'
                        : 'bg-transparent text-white hover:bg-white/5'
                        }`}
                >
                    <Zap size={24} fill={activeTab === 'combat' ? 'black' : 'none'} />
                    Бойові
                </button>
                <button
                    onClick={() => setActiveTab('rear')}
                    className={`flex-1 py-6 flex items-center justify-center gap-3 text-xl font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'rear'
                        ? 'bg-[#D4AF7A] text-black'
                        : 'bg-transparent text-white hover:bg-white/5'
                        }`}
                >
                    <Shield size={24} fill={activeTab === 'rear' ? 'black' : 'none'} />
                    Тилові
                </button>
            </div>

            {/* Empty State */}
            {filteredVacancies.length === 0 && (
                <div className="col-span-1 md:col-span-2 lg:col-span-4 py-20 text-center border border-dashed border-white/20">
                    <p className="text-gray-400 font-bold uppercase tracking-widest">Вакансій у цьому підрозділі поки немає</p>
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredVacancies.map((vacancy) => (
                    <motion.div
                        key={vacancy.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        className="bg-[#111] border border-white/10 p-5 md:p-6 flex flex-col justify-between h-56 md:h-64 group hover:border-corps-orange/50 transition-colors"
                    >
                        <div>
                            <div className="flex items-center gap-2 text-gray-400 mb-3 md:mb-4 text-xs md:text-sm font-bold uppercase tracking-wider">
                                <Zap size={14} className="text-corps-orange" fill="currentColor" />
                                {vacancy.category === 'combat' ? 'Бойові' : 'Тилові'}
                            </div>
                            <h3 className="text-lg md:text-xl font-black uppercase leading-tight mb-4 group-hover:text-corps-orange transition-colors">
                                {vacancy.title}
                            </h3>
                        </div>

                        <button
                            onClick={() => {
                                const element = document.getElementById('application-form-element');
                                if (element) {
                                    const yOffset = -100;
                                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                            }}
                            className="w-full border border-corps-orange text-corps-orange py-2.5 md:py-3 px-4 flex items-center justify-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-corps-orange hover:text-black transition-all group-hover:bg-corps-orange group-hover:text-black min-h-[44px]"
                        >
                            Подати заявку
                            <ArrowUpRight size={18} />
                        </button>
                    </motion.div>
                ))}
            </div>


            <div className="mt-12 flex justify-center">
                <button className="border border-white/30 text-white px-8 py-4 uppercase font-bold tracking-wider hover:border-corps-orange hover:text-corps-orange transition-colors">
                    Більше вакансій
                </button>
            </div>
        </section>
    );
}
