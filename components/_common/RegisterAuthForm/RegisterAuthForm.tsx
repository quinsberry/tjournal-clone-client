import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormSchema } from '../../../utils/validations';
import { FormField } from '../../FormField';

interface RegisterAuthFormProps {
    onOpenRegister: () => void;
    onOpenLogin: () => void;
    onSubmit: (data: { email: string; password: string; username: string; }) => void;
}

export const RegisterAuthForm: FunctionComponent<RegisterAuthFormProps> = ({ onOpenRegister, onOpenLogin, onSubmit }) => {
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(RegisterFormSchema),
    });

    const handleSubmit = async (data: { email: string; password: string; username: string; }) => {
        onSubmit(data);
    };

    return (
        <div>
            <FormProvider {...form}>
                <FormField name='username' label='Username' />
                <FormField name='email' label='Email' />
                <FormField name='password' label='Password' />
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className='d-flex align-center justify-between'>
                        <Button
                            disabled={!form.formState.isValid || form.formState.isSubmitting}
                            onClick={onOpenRegister}
                            type='submit'
                            color='primary'
                            variant='contained'
                        >
                            Sign up
                        </Button>
                        <Button onClick={onOpenLogin} color='primary' variant='text'>
                            Sign in
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};
