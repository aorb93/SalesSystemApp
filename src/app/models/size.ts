export interface Size {
    sizeId: number;
    sizeName: string;
    companyId?: number;
}

export interface Select2Size{ 
    value: string; 
    label: string;
    disabled: boolean;
}