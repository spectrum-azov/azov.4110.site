import { ChangeEvent, FormEvent } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { ApplicationSubmission } from '../types';

interface ApplicationFormProps {
    formData: ApplicationSubmission;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent) => void;
    isSubmitting: boolean;
    submitStatus: 'idle' | 'success' | 'error';
    consent: boolean;
    setConsent: (val: boolean) => void;
    errors: import('../types').FormValidationState;
}



export default function ApplicationForm({
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    submitStatus,
    consent,
    setConsent,
    errors
}: ApplicationFormProps) {


    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-corps-orange mb-12">
                        Потрібна консультація?
                    </h2>

                    <div className="relative aspect-square w-full max-w-md mx-auto lg:mx-0 bg-[#0A0A0A] border border-white/5 flex items-center justify-center overflow-hidden p-4">
                        {/* Logo Graphic */}
                        <img
                            src="https://azov.army/wp-content/uploads/2025/04/korpus-azov-696kh696.png"
                            alt="Logo"
                            className="w-full h-full object-contain opacity-95"
                        />
                    </div>
                </div>

                <div className="bg-transparent">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-1.5 md:space-y-2">
                                <label htmlFor="lastName" className="text-sm md:text-base text-gray-400 font-medium">Прізвище*</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Прізвище"
                                    required
                                    className={`w-full bg-[#1A1A1A] border p-3.5 md:p-4 text-white focus:border-corps-orange focus:outline-none transition-colors min-h-[44px] ${errors.lastName ? 'border-red-500' : 'border-white/10'}`}
                                />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <label htmlFor="phone" className="text-sm md:text-base text-gray-400 font-medium">Номер телефону*</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+380XXXXXXXXX"
                                    required
                                    className={`w-full bg-[#1A1A1A] border p-3.5 md:p-4 text-white focus:border-corps-orange focus:outline-none transition-colors min-h-[44px] ${errors.phone ? 'border-red-500' : 'border-white/10'}`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-1.5 md:space-y-2">
                                <label htmlFor="firstName" className="text-sm md:text-base text-gray-400 font-medium">Ім'я*</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Ім'я"
                                    required
                                    className={`w-full bg-[#1A1A1A] border p-3.5 md:p-4 text-white focus:border-corps-orange focus:outline-none transition-colors min-h-[44px] ${errors.firstName ? 'border-red-500' : 'border-white/10'}`}
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <label htmlFor="telegram" className="text-sm md:text-base text-gray-400 font-medium">Нік в Телеграм</label>
                                <input
                                    id="telegram"
                                    type="text"
                                    name="telegram"
                                    value={formData.telegram}
                                    onChange={handleInputChange}
                                    placeholder="Нік в Телеграм"
                                    className={`w-full bg-[#1A1A1A] border p-3.5 md:p-4 text-white focus:border-corps-orange focus:outline-none transition-colors min-h-[44px] ${errors.telegram ? 'border-red-500' : 'border-white/10'}`}
                                />
                                {errors.telegram && <p className="text-red-500 text-xs mt-1">{errors.telegram}</p>}
                            </div>
                        </div>

                        <div className="space-y-1.5 md:space-y-2">
                            <label htmlFor="middleName" className="text-sm md:text-base text-gray-400 font-medium">По батькові</label>
                            <input
                                id="middleName"
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleInputChange}
                                placeholder="По батькові"
                                className="w-full bg-[#1A1A1A] border border-white/10 p-3.5 md:p-4 text-white focus:border-corps-orange focus:outline-none transition-colors min-h-[44px]"
                            />
                        </div>

                        <div className="space-y-4 pt-4">
                            <label className="text-sm md:text-base text-gray-400 font-medium block">Чи є військовослужбовцем на даний момент?</label>
                            <div className="flex gap-8">
                                <label className="flex items-center gap-3 cursor-pointer group min-h-[44px]">
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
                                <label className="flex items-center gap-3 cursor-pointer group min-h-[44px]">
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

                        <div className="pt-4 space-y-2">
                            <div className="flex items-start gap-3 min-h-[44px]">
                                <button
                                    type="button"
                                    onClick={() => setConsent(!consent)}
                                    className={`mt-1 w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors ${consent ? 'bg-corps-orange' : 'bg-[#1a1a1a] border border-white/20'} ${errors.consent ? 'border-red-500' : ''}`}
                                >
                                    {consent && <Check size={14} className="text-black" />}
                                </button>
                                <p className="text-sm text-gray-400">
                                    Я погоджуюсь з <a href="#" className="text-corps-orange underline">Політикою конфіденційності</a> та підтверджую, що мені від 18 до 58 років*
                                </p>
                            </div>
                            {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}
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
    );
}
