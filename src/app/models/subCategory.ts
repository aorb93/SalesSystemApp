export interface SubCategory{
    subCategoryId: number;
    subCategoryName: string;
    categoryId: number;
    enable: boolean;
    creationDate: string;
    modifyDate: string;
    genderId: number;
    categoryName: string;
    genderName: string;
}

export interface Select2SubCategory{ 
    value: string; 
    label: string;
    disabled: boolean;
}