export interface PaymentType {
    paymentTypeId: number;
    paymentTypeName: string;
}

export interface Select2PaymentType{ 
    value: string; 
    label: string;
    disabled: boolean;
}