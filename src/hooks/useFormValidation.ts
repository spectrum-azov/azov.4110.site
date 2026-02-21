import { useState } from 'react';
import { ApplicationSubmission, FormValidationState } from '../types';

export const useFormValidation = () => {
    const [errors, setErrors] = useState<FormValidationState>({});

    const validate = (data: ApplicationSubmission, consent: boolean): boolean => {
        const newErrors: FormValidationState = {};

        if (!data.lastName.trim()) {
            newErrors.lastName = 'Прізвище є обов’язковим';
        }

        if (!data.firstName.trim()) {
            newErrors.firstName = 'Ім’я є обов’язковим';
        }

        // Ukrainian phone format: +380XXXXXXXXX
        // Clean phone number from non-digits for easier validation if needed, 
        // but here we validate the raw input against a regex.
        const phoneRegex = /^\+?380\d{9}$/;
        if (!data.phone.trim()) {
            newErrors.phone = 'Номер телефону є обов’язковим';
        } else if (!phoneRegex.test(data.phone.replace(/\s+/g, ''))) {
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
