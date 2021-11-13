import { User } from '../../../entities/User/types/User';
import { AxiosInstance } from 'axios';

export const UserApi = (instance: AxiosInstance) => {
    return {
        fetchAllUsers({}) {
            return instance.get<User[]>('/v1/users');
        },
        fetchCurrentUser({}) {
            return instance.get<User>('/v1/users/me');
        },
    } as const;
};
