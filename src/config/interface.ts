export interface ApiResponse {
    statusCode: number,
    message: string,
    data?: any
}

export interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    password?: string;
    isDeleted: boolean;
}