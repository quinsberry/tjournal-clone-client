import { ApiService } from '../ApiService';
import { AuthUser } from '../../../entities/User/types/User';
import { AxiosInstance } from 'axios';

export const AuthApi = (instance: AxiosInstance) => {
    return {
        signup(data: { email: string, password: string; username: string; }) {
            return instance.post<AuthUser>('/v1/auth/signup', data);
        },
        login(data: { email: string, password: string }) {
            return instance.post<AuthUser>('/v1/auth/signin', data);
        },
    } as const;
};
