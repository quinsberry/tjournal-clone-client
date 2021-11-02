import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password should be at least 6 characters long').required('Password is required'),
});

export const RegisterFormSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
}).concat(LoginFormSchema);
