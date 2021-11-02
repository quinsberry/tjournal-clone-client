import { ApiService } from '../ApiService';
import { User } from '../../../models/User';
import { AxiosResponse } from 'axios';

export const AuthApi = {
    signup(data: { email: string, password: string; username: string; }) {
        return ApiService.instance.post<User>('/v1/auth/signup', data);
    },
    login(data: { email: string, password: string }): Promise<AxiosResponse<User>> {
        return ApiService.instance.post<User>('/v1/auth/signin', data);
    },
} as const;