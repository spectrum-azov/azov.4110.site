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
            newErrors.telegram = 'Нікнейм має містити як мінімум 2 символи';
        }

        // Clean phone number from non-digits
        const cleanPhone = data.phone.replace(/\D/g, '');

        if (!data.phone.trim()) {
            newErrors.phone = 'Номер телефону є обов’язковим';
        } else if (cleanPhone.length !== 12) {
            newErrors.phone = 'Невірний формат номера (+380 XX XXX-XX-XX)';
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
