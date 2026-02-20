import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  Menu,
  ArrowUpRight,
  Shield,
  ChevronDown,
  Check,
  Zap,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';

interface Vacancy {
  id: string;
  title: string;
  category: 'combat' | 'rear';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'combat' | 'rear'>('combat');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    telegram: '',
    isMilitary: 'no'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  useEffect(() => {
    const SHEET_ID = import.meta.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEET_ID;
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

    fetch(csvUrl)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.statusText}`);
        return res.text();
      })
      .then(csvText => {
        // Minimal CSV parser (handles quoted fields)
        const lines = csvText.split('\n').filter(l => l.trim());
        const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
        const data = lines.slice(1).map(line => {
          const values = line.match(/(".*?"|[^,]+|(?<=,)(?=,)|^(?=,))/g) || [];
          const row: Record<string, string> = {};
          headers.forEach((h, i) => {
            row[h] = (values[i] || '').replace(/^"|"$/g, '').trim();
          });
          return row;
        });

        const parsed = data.map((row, i) => ({
          id: row['id'] || row['№'] || String(i),
          title: row['title'] || row['назва'] || row['vacancy'] || 'Untitled',
          category: ((row['category'] || row['категорія'] || 'combat').toLowerCase().includes('rear') ? 'rear' : 'combat') as 'combat' | 'rear',
        }));

        setVacancies(parsed);
      })
      .catch(err => console.error('Failed to fetch vacancies:', err));
  }, []);

  const filteredVacancies = vacancies.filter(v => v.category === activeTab);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          lastName: '',
          firstName: '',
          middleName: '',
          phone: '',
          telegram: '',
          isMilitary: 'no'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-corps-dark text-white font-sans selection:bg-corps-orange selection:text-black overflow-x-hidden">
      {/* Header */}
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

      {/* Hero Section */}
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

      {/* Vacancies Section */}
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

      {/* Consultation Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-corps-orange mb-12">
              Потрібна консультація?
            </h2>

            <div className="relative aspect-square w-full max-w-md mx-auto lg:mx-0 bg-[#0A0A0A] border border-white/5 flex items-center justify-center overflow-hidden">
              {/* Logo Graphic */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                <img
                  src="https://azov.army/wp-content/uploads/2025/04/korpus-azov-696kh696.png"
                  alt="Logo"
                  className="w-full h-full object-contain opacity-80"
                />
              </div>
            </div>
          </div>

          <div className="bg-transparent">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Прізвище*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Прізвище"
                    required
                    className="w-full bg-[#1A1A1A] border border-white/10 p-4 text-white focus:border-corps-orange focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Номер телефону*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+38 (___) ___-__-__"
                    required
                    className="w-full bg-[#1A1A1A] border border-white/10 p-4 text-white focus:border-corps-orange focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Ім'я*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Ім'я"
                    required
                    className="w-full bg-[#1A1A1A] border border-white/10 p-4 text-white focus:border-corps-orange focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Нік в Телеграм</label>
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    placeholder="Нік в Телеграм"
                    className="w-full bg-[#1A1A1A] border border-white/10 p-4 text-white focus:border-corps-orange focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">По батькові</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  placeholder="По батькові"
                  className="w-full bg-[#1A1A1A] border border-white/10 p-4 text-white focus:border-corps-orange focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-4 pt-4">
                <label className="text-sm text-gray-400 block">Чи є військовослужбовцем на даний момент?</label>
                <div className="flex gap-8">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="isMilitary"
                      value="yes"
                      checked={formData.isMilitary === 'yes'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.isMilitary === 'yes' ? 'border-corps-orange' : 'border-gray-600 group-hover:border-corps-orange'}`}>
                      {formData.isMilitary === 'yes' && <div className="w-3 h-3 bg-corps-orange rounded-full"></div>}
                    </div>
                    <span className="text-white group-hover:text-corps-orange transition-colors">Так</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="isMilitary"
                      value="no"
                      checked={formData.isMilitary === 'no'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.isMilitary === 'no' ? 'border-corps-orange' : 'border-gray-600 group-hover:border-corps-orange'}`}>
                      {formData.isMilitary === 'no' && <div className="w-3 h-3 bg-corps-orange rounded-full"></div>}
                    </div>
                    <span className="text-white group-hover:text-corps-orange transition-colors">Ні</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-start gap-3">
                <div className="mt-1 w-5 h-5 bg-corps-orange rounded-sm flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-black" />
                </div>
                <p className="text-sm text-gray-400">
                  Я погоджуюсь з <a href="#" className="text-corps-orange underline">Політикою конфіденційності</a> та підтверджую, що мені від 18 до 58 років*
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-corps-orange text-black font-black uppercase py-4 px-6 text-lg tracking-wider hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Відправка...' : 'Подати заявку'}
                {!isSubmitting && <ArrowUpRight size={24} />}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-900/50 border border-green-500/50 text-green-200 text-center rounded">
                  Заявку успішно відправлено!
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-900/50 border border-red-500/50 text-red-200 text-center rounded">
                  Помилка відправки. Спробуйте пізніше.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-corps-orange hover:text-black hover:border-corps-orange transition-all">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-corps-orange hover:text-black hover:border-corps-orange transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-corps-orange hover:text-black hover:border-corps-orange transition-all">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-corps-orange hover:text-black hover:border-corps-orange transition-all">
                  <Youtube size={18} />
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
    </div>
  );
}
