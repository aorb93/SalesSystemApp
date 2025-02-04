export interface Sales {
    saleId: number;
    clientId: number;
    clientName: string;
    paymentTypeName: string;
    total: number;
    creationDate: Date;
}

export interface SalesDetailProducts {
    productSaleId: number;
    saleId: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    companyId: number;
}

export interface SalesDetailCredit {
    creditId: number;
    saleId: number;
    periodId: number;
    periodName: string;
    saleCreditId: number;
    nextPayDay: Date;
    partialPaid: number;
    paid: boolean;
}