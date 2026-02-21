import { useState } from 'react';
import { ApplicationSubmission, FormValidationState } from '../types';

export const useFormValidation = () => {
    const [errors, setErrors] = useState<FormValidationState>({});

    const validate = (data: ApplicationSubmission, consent: boolean): boolean => {
        const newErrors: FormValidationState = {};

        if (!data.lastName.trim()) {
            newErrors.lastName = 'Прізвище є обов’язковим';
        } else if (data.lastName.trim().length < 2) {
            newErrors.lastName = 'Прізвище має містити як мінімум 2 символи';
        }

        if (!data.firstName.trim()) {
            newErrors.firstName = 'Ім’я є обов’язковим';
        } else if (data.firstName.trim().length < 2) {
            newErrors.firstName = 'Ім’я має містити як мінімум 2 символи';
        }

        if (data.telegram && data.telegram.trim() && data.telegram.trim().length < 2) {
            // In ApplicationForm.tsx, telegram doesn't have an error display yet, 
            // but we should validate it if we want to follow the requirement.
            // We might need to update FormValidationState type too.
            (newErrors as any).telegram = 'Нікнейм має містити як мінімум 2 символи';
        }

        // Ukrainian phone format: +380XXXXXXXXX
        const cleanPhone = data.phone.replace(/[\s\(\)\-\+]/g, '');
        const phoneRegex = /^380\d{9}$/;

        if (!data.phone.trim()) {
            newErrors.phone = 'Номер телефону є обов’язковим';
        } else if (!phoneRegex.test(cleanPhone)) {
            newErrors.phone = 'Невірний формат номера (+380XXXXXXXXX)';
        }

        if (!consent) {
            newErrors.consent = 'Ви повинні погодитися з політикою конфіденційності';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearError = (field: keyof FormValidationState) => {
        setErrors(prev => {
            const { [field]: _, ...rest } = prev;
            return rest;
        });
    };

    return { errors, validate, clearError, setErrors };
};
