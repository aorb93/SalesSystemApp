export interface Category{
    SubCategoryId: number;
    SubCategoryName: string;
    CategoryId: number;
    Enable: boolean;
    CreationDate: string;
    ModifyDate: string;
    GenderId: number;
    CategoryName: string;
    GenderName: string;
}

export interface Select2SubCategory{ 
    value: string; 
    label: string;
    disabled: boolean;
}