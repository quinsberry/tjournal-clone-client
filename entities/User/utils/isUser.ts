import { User } from '../types/User';


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