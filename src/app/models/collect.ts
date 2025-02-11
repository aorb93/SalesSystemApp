export interface CollectWeek{
    credits: number;
	clientId: number
	clientName: string;
	sumPartialPaid: number;
}

export interface CollectNextThreeDays{
	saleId: number;
	clientId: number;
	clientName: string;
	nextPayDay: Date;
	partialPaid: number;
	colorDay: string;
}