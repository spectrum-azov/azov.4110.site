export type VacancyCategory = 'combat' | 'rear';

export interface Vacancy {
    id: string;
    title: string;
    category: VacancyCategory;
}

export interface ApplicationSubmission {
    lastName: string;
    firstName: string;
    middleName?: string;
    phone: string;
    telegram?: string;
    isMilitary: 'yes' | 'no';
}

export interface FormValidationState {
    lastName?: string;
    firstName?: string;
    phone?: string;
    telegram?: string;
    consent?: string;
    overall?: string;
}
