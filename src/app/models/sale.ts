export interface Sale{
    saleId: number;
    clientId: number;
    total: number;
    companyId: number;
    productSale: ProductSale[];
}

export interface ProductSale{
    productSaleId: number;
    saleId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    companyId: number;
}