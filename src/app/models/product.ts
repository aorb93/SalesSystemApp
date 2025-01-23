export interface Product{
    productId: number;
    productName: string;
    quantity: number;
    cost: number;
    price: number;
    brandId: number;
    genderId: number;
    seasonId: number;
    categoryId: number;
    subCategoryId: number;
    colorId: number;
    sizeId: number;
    enable: boolean;
    creationDate: Date;
    modifyDate: Date;
    companyId: number;
    quantitySale: number;
    iconRemove: string;
    iconColor: string;
}

export interface Select2Product{ 
    value: string; 
    label: string;
    disabled: boolean;
}