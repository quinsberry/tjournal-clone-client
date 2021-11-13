export interface User {
    id: number;
    email: string;
    username: string;
    fullName: string;
    createdAt: string;
    updatedAt: string;
    activated: boolean;
}
export interface AuthUser extends User {
    token: string;
}