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

export function isUser(entry: any): entry is User {
    return entry != null
        && typeof entry === 'object'
        && typeof entry.id === 'number'
        && typeof entry.email === 'string'
        && typeof entry.username === 'string'
        && typeof entry.activated === 'boolean'
        && typeof entry.createdAt === 'string'
        && typeof entry.updatedAt === 'string';
}