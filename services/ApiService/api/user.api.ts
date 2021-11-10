import { ApiService } from '../ApiService';
import { User } from '../../../models/User';

export const UserApi = {
    fetchAllUsers({}) {
        return ApiService.instance.get<User[]>('/v1/users');
    },
} as const;