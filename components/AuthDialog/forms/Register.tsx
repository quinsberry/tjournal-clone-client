import React, { FunctionComponent } from 'react';
import { isUser } from '../../../models/User';
import { TokenService } from '../../../services/TokenService/TokenService';
import { resolveDependencies, storeGlobals } from '../../../store/GlobalsReference';
import { RegisterAuthForm } from '../../_common/RegisterAuthForm/RegisterAuthForm';

interface LoginFormProps {
    onOpenRegister: () => void;
    onOpenLogin: () => void;
}

export const RegisterForm: FunctionComponent<LoginFormProps> = ({ onOpenRegister, onOpenLogin }) => {
    const apiService = resolveDependencies(storeGlobals).apiService;

    const onSubmit = async (data: { email: string; password: string; username: string; }) => {
        apiService.requests.auth.signup({
            prediction: user => isUser(user),
            data,
        })
            .then(response => {
                console.log(response);
                TokenService.setToken(response.token);
            })
            .catch(apiService.handleCaughtErrors);
    };

    return <RegisterAuthForm onOpenRegister={onOpenRegister} onOpenLogin={onOpenLogin} onSubmit={onSubmit} />;
};
