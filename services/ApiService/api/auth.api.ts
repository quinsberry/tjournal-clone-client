import { ApiService } from '../ApiService';
import { AuthUser } from '../../../models/User';

export const AuthApi = {
    signup(data: { email: string, password: string; username: string; }) {
        return ApiService.instance.post<AuthUser>('/v1/auth/signup', data);
    },
    login(data: { email: string, password: string }) {
        return ApiService.instance.post<AuthUser>('/v1/auth/signin', data);
    },
} as const;