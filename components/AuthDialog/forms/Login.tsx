import React, { FunctionComponent } from 'react';
import { isUser } from '../../../models/User';
import { TokenService } from '../../../services/TokenService/TokenService';
import { resolveDependencies, storeGlobals } from '../../../store/GlobalsReference';
import { LoginAuthForm } from '../../_common/LoginAuthForm/LoginAuthForm';

interface LoginFormProps {
    onOpenRegister: () => void;
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({ onOpenRegister }) => {
    const apiService = resolveDependencies(storeGlobals).apiService;

    const onSubmit = async (data: { email: string; password: string }) => {
        apiService.requests.auth.login({
            prediction: user => isUser(user),
            data,
        })
            .then(response => {
                console.log(response);
                TokenService.setToken(response.token);
            })
            .catch(apiService.handleCaughtErrors);
    };

    return <LoginAuthForm onOpenRegister={onOpenRegister} onSubmit={onSubmit}/>;
};
