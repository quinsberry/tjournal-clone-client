import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormSchema } from '../../../utils/validations';
import { FormField } from '../../FormField';

interface LoginFormProps {
    onOpenRegister: () => void;
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({ onOpenRegister }) => {
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(LoginFormSchema),
    });

    const onSubmit = (data: SubmitHandler<{ name: string; password: string }>) => console.log(data);

    console.log(form.formState.errors);

    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name='email' label='Email' />
                    <FormField name='password' label='Password' />
                    <div className='d-flex align-center justify-between'>
                        <Button disabled={!form.formState.isValid} type='submit' color='primary' variant='contained'>
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
