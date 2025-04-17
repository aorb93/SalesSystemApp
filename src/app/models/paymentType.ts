export interface PaymentType {
    paymentTypeId: number;
    paymentTypeName: string;
    companyId: number;
}

export interface PaymentTypeUser {
    paymentTypeId: number;
    paymentTypeName: string;
}

export interface Select2PaymentType{ 
    value: string; 
    label: string;
    disabled: boolean;
}