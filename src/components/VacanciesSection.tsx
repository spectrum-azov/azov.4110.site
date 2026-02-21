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

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredVacancies.map((vacancy) => (
                    <motion.div
                        key={vacancy.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        className="bg-[#111] border border-white/10 p-6 flex flex-col justify-between h-64 group hover:border-corps-orange/50 transition-colors"
                    >
                        <div>
                            <div className="flex items-center gap-2 text-gray-400 mb-4 text-sm font-bold uppercase tracking-wider">
                                <Zap size={14} className="text-corps-orange" fill="currentColor" />
                                {vacancy.category === 'combat' ? 'Бойові' : 'Тилові'}
                            </div>
                            <h3 className="text-xl font-black uppercase leading-tight mb-4 group-hover:text-corps-orange transition-colors">
                                {vacancy.title}
                            </h3>
                        </div>

                        <button className="w-full border border-corps-orange text-corps-orange py-3 px-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider hover:bg-corps-orange hover:text-black transition-all group-hover:bg-corps-orange group-hover:text-black">
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
