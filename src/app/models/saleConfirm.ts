export interface SaleConfirm{
    saleId: number;
    clientId: number;
    clientName: string;
    total: number;
    companyId: number;
    productSale: ProductSaleConfirm[];
}

export interface ProductSaleConfirm{
    productSaleId: number;
    productName: string;
    saleId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    companyId: number;
}