import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormSchema } from '../../../utils/validations';
import { FormField } from '../../FormField';

interface LoginAuthFormProps {
    onOpenRegister: () => void;
    onSubmit: (data: { email: string; password: string }) => void;
}

export const LoginAuthForm: FunctionComponent<LoginAuthFormProps> = ({ onOpenRegister, onSubmit }) => {
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(LoginFormSchema),
    });

    const handleSubmit = async (data: { email: string; password: string }) => {
        onSubmit(data);
    };

    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField name='email' label='Email' />
                    <FormField name='password' label='Password' />
                    <div className='d-flex align-center justify-between'>
                        <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type='submit' color='primary' variant='contained'>
                            Sign in
                        </Button>
                        <Button onClick={onOpenRegister} color='primary' variant='text'>
                            Sign up
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};
