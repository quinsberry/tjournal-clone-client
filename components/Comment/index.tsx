import React, { FunctionComponent, MouseEvent } from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';
import styles from './Comment.module.scss';

interface CommentProps {
    user: {
        fullname: string;
        avatarUrl: string;
    };
    text: string;
    createdAt: string;
}

export const Comment: FunctionComponent<CommentProps> = ({ user, text, createdAt }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.comment}>
            <div className={styles.userInfo}>
                <img
                    src={user.avatarUrl}
                    alt='Avatar'
                />
                <b>{user.fullname}</b>
                <span>{createdAt}</span>
            </div>
            <Typography className={styles.text}>
                {text}
            </Typography>
            <span className={styles.replyBtn}>Ответить</span>
            <IconButton onClick={handleClick}>
                <MoreIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                elevation={2}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted>
                <MenuItem onClick={handleClose}>Удалить</MenuItem>
                <MenuItem onClick={handleClose}>Редактировать</MenuItem>
            </Menu>
        </div>
    );
};
