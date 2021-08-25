import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Avatar, Button, IconButton, Paper } from '@material-ui/core';
import {
    ExpandMoreOutlined as ArrowBottom,
    Menu as MenuIcon,
    NotificationsNoneOutlined as NotificationIcon,
    SearchOutlined as SearchIcon,
    SmsOutlined as MessageIcon,
} from '@material-ui/icons';
import styles from './Header.module.scss';

export const Header: FunctionComponent = () => {
    return (
        <Paper classes={{ root: styles.root }} elevation={0}>
            <div className='d-flex align-center'>
                <IconButton>
                    <MenuIcon />
                </IconButton>
                <Link href='/'>
                    <a>
                        <img height={42} className='mr-15 d-flex align-center' src='/static/img/logo.svg' alt='Logo' />
                    </a>
                </Link>

                <div className={styles.searchBlock}>
                    <SearchIcon />
                    <input placeholder='Поиск' />
                </div>

                <Link href='/write'>
                    <a>
                        <Button variant='contained' className={styles.penButton}>
                            Новая запись
                        </Button>
                    </a>
                </Link>
            </div>
            <div className='d-flex align-center'>
                <IconButton>
                    <MessageIcon />
                </IconButton>
                <IconButton>
                    <NotificationIcon />
                </IconButton>
                <Link href='/profile/1'>
                    <a className='d-flex align-center'>
                        <Avatar
                            className={styles.avatar}
                            alt='Remy Sharp'
                            src='https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/'
                        />
                        <ArrowBottom />
                    </a>
                </Link>
            </div>
        </Paper>
    );
};
