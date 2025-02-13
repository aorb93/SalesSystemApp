export interface Category{
    categoryId: number;
    categoryName: string;
    companyId: number;
}

export interface Select2Category{ 
    value: string; 
    label: string;
    disabled: boolean;
}