export interface Color {
    colorId: number;
    colorName: string;
    companyId?: number;
}

export interface Select2Color{ 
    value: string; 
    label: string;
    disabled: boolean;
}