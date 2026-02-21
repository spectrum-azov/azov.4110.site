import { motion } from 'motion/react';

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8"
                    >
                        <span className="text-corps-orange block">Твій</span>
                        <span className="text-corps-orange block">Досвід</span>
                        <span className="text-corps-orange block">Важливий!</span>
                    </motion.h1>
                </div>

                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 text-gray-300 text-lg md:text-xl leading-relaxed"
                    >
                        <p>
                            Тут ти знайдеш відкриті вакансії у різних підрозділах корпусу — від бойових посад до технічної підтримки й тилового забезпечення.
                        </p>
                        <p>
                            У Азові є місце для кожного. Наша ціль — створити умови, де аси своєї справи роблять те, що вміють найкраще. Ми формуємо спільноту професіоналів, які працюють на результат, а їхні знаття та досвід ламають плани ворога.
                        </p>
                        <p>
                            Обирай посаду за фахом і заповнюй заявку — ми зв'яжемось з тобою і відповімо на всі запитання. Вагаєшся? Заповнюй форму нижче, і ми проконсультуємо.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-0 w-full h-full -z-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-10 w-64 h-96 bg-gradient-to-b from-corps-orange/20 to-transparent transform -skew-x-12 blur-3xl"></div>
            </div>
        </section>
    );
}
