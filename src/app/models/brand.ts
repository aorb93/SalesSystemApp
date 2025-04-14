export interface Brand {
    brandId: number;
    brandName: string;
    // brandTypeId?: number;
    companyId?: number;
}

export interface Select2Brand{ 
    value: string; 
    label: string;
    disabled: boolean;
}