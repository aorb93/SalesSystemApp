export interface Client{
    clientId: number; 
    clientName: string;
    surname: string;
    credit: boolean;
    companyId: number;
    enable: boolean;
    creationDate: Date;
    modifyDate: Date;
    phone: string;
    address: string;
    interestRate: number;
    specialClient: boolean;
}

export interface Select2Client{ 
    value: string; 
    label: string;
}

export interface insClient {
    clientId: number;
    clientName: string;
    surname: string;
    credit: boolean;
    companyId: number;
    enable: boolean;
    phone: string;
    address: string;
    interestRate: number;
    specialClient: boolean;
}