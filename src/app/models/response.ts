export interface Response {
    categoryId: number;
    categoryName: string;
    creationDate: string;
    enable: boolean;
    modifyDate: string;
    isSuccess: boolean;
    companyId: number;
    
    userId: number;
    token: string;
    refreshToken: string;
    result: boolean;
    message: string;

    infoUser: InfoUser;
}

export interface InfoUser{
    categoryId: number;
    categoryName: string;
    companyId: number;
    companyName: string;
    userId: number;
    userLogin: string;
    userTypeId: number;
}