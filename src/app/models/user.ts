export interface User{
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