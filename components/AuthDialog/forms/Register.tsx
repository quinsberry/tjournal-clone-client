import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormSchema } from '../../../utils/validations';
import { FormField } from '../../FormField';

interface LoginFormProps {
    onOpenRegister: () => void;
    onOpenLogin: () => void;
}

export const RegisterForm: FunctionComponent<LoginFormProps> = ({ onOpenRegister, onOpenLogin }) => {
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(RegisterFormSchema),
    });

    const onSubmit = (data: SubmitHandler<{ name: string; password: string }>) => {
        console.log(data);
    };

    return (
        <div>
            <FormProvider {...form}>
                <FormField name='username' label='Username' />
                <FormField name='email' label='Email' />
                <FormField name='password' label='Password' />
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='d-flex align-center justify-between'>
                        <Button
                            disabled={!form.formState.isValid}
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
