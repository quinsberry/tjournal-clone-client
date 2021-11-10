import React, { FunctionComponent, useEffect } from 'react';
import { Dialog, DialogContent, DialogContentText, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { LoginForm } from './forms/Login';
import { RegisterForm } from './forms/Register';
import Image from 'next/image';
import styles from './AuthDialog.module.scss';
import { MainAuthForm } from '../_common/MainAuthForm/MainAuthForm';

interface AuthDialogProps {
    onClose: () => void;
    visible: boolean;
}

enum FormType {
    MAIN,
    LOGIN,
    REGISTER,
}

export const AuthDialog: FunctionComponent<AuthDialogProps> = ({ onClose, visible }) => {
    const [formType, setFormType] = React.useState<FormType>(FormType.MAIN);

    useEffect(() => {
        if (!visible) {
            setTimeout(() => {
                setFormType(FormType.MAIN);
            }, 200);
        }
    }, [visible]);

    return (
        <Dialog open={visible} onClose={onClose} maxWidth='sm' fullWidth>
            <div className={styles.dialog}>
                <div className={styles.modalImage}>
                    <Image width={35} height={35} src='/static/img/logo.svg'/>
                </div>
                <DialogContent className={styles.dialogContent}>
                    <DialogContentText className={styles.dialogContentText}>
                        <div className={styles.content}>
                            <Typography className={styles.title}>
                                {formType === FormType.MAIN ? (
                                    'Sign in TJ'
                                ) : (
                                    <p onClick={() => setFormType(FormType.MAIN)} className={styles.backTitle}>
                                        <ArrowBackIcon /> To authorization
                                    </p>
                                )}
                            </Typography>
                            {formType === FormType.MAIN && (
                                <MainAuthForm onOpenLogin={() => setFormType(FormType.LOGIN)} />
                            )}
                            {formType === FormType.LOGIN && (
                                <LoginForm onOpenRegister={() => setFormType(FormType.REGISTER)} />
                            )}
                            {formType === FormType.REGISTER && (
                                <RegisterForm
                                    onOpenRegister={() => setFormType(FormType.REGISTER)}
                                    onOpenLogin={() => setFormType(FormType.LOGIN)}
                                />
                            )}
                        </div>
                    </DialogContentText>
                </DialogContent>
            </div>
        </Dialog>
    );
};
