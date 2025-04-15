export interface Season {
    seasonId: number;
    seasonName: string;
    companyId?: number;
}

export interface Select2Season{ 
    value: string; 
    label: string;
    disabled: boolean;
}