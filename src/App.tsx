import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import VacanciesSection from './components/VacanciesSection';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';
import { Vacancy, VacancyCategory, ApplicationSubmission } from './types';
import { useFormValidation } from './hooks/useFormValidation';

export default function App() {

  const [activeTab, setActiveTab] = useState<VacancyCategory>('combat');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [formData, setFormData] = useState<ApplicationSubmission>({
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    telegram: '',
    isMilitary: 'no'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [consent, setConsent] = useState(false);

  const { errors, validate, clearError, setErrors } = useFormValidation();



  useEffect(() => {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${import.meta.env.VITE_GOOGLE_SHEET_ID}/export?format=csv`;

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

        const parsed: Vacancy[] = data.map((row, i) => ({
          id: row['id'] || row['№'] || String(i),
          title: row['title'] || row['назва'] || row['vacancy'] || 'Untitled',
          category: ((row['category'] || row['категорія'] || 'combat').toLowerCase().includes('rear') ? 'rear' : 'combat') as VacancyCategory,
        }));

        setVacancies(parsed);
      })
      .catch(err => console.error('Failed to fetch vacancies:', err));
  }, []);

  const filteredVacancies = vacancies.filter(v => v.category === activeTab);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      let base = digits;

      if (digits.length > 0 && !digits.startsWith('380')) {
        base = digits.startsWith('0') ? '38' + digits : '380' + digits;
      }

      const limited = base.substring(0, 12);
      let mask = '';
      if (limited.length > 0) mask += '+';
      if (limited.length >= 3) mask += limited.substring(0, 3);
      else mask += limited;

      if (limited.length > 3) mask += ' (' + limited.substring(3, 5);
      if (limited.length > 5) mask += ') ' + limited.substring(5, 8);
      if (limited.length > 8) mask += '-' + limited.substring(8, 10);
      if (limited.length > 10) mask += '-' + limited.substring(10, 12);

      setFormData(prev => ({ ...prev, [name]: mask }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof typeof errors]) {
      clearError(name as any);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate(formData, consent)) {
      return;
    }

    setIsSubmitting(true);

    setSubmitStatus('idle');

    try {
      const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;

      if (!scriptUrl || scriptUrl === 'PLACEHOLDER_URL_FROM_DEPLOYMENT') {
        throw new Error('Google Apps Script URL is not configured');
      }

      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Apps Script requires no-cors for simple POST or handle CORS in script
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData),
      });

      // With 'no-cors', we assume success if no network error occurs.
      setSubmitStatus('success');
      setConsent(false);
      setErrors({});
      setFormData({

        lastName: '',
        firstName: '',
        middleName: '',
        phone: '',
        telegram: '',
        isMilitary: 'no'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-corps-dark text-white font-sans selection:bg-corps-orange selection:text-black overflow-x-hidden">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      <main>
        <HeroSection />

        <VacanciesSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filteredVacancies={filteredVacancies}
        />

        <ApplicationForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
          consent={consent}
          setConsent={setConsent}
          errors={errors}
        />

      </main>

      <Footer />
    </div>
  );
}
