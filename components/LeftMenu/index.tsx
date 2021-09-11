import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import {
    FormatListBulletedOutlined as ListIcon,
    SmsOutlined as MessageIcon,
    TrendingUpOutlined as TrendingIcon,
    WhatshotOutlined as FireIcon,
} from '@material-ui/icons';
import styles from './LeftMenu.module.scss';
import { useRouter } from 'next/router';

const menu = [
    { text: 'Feed', icon: <FireIcon />, path: '/' },
    { text: 'Messages', icon: <MessageIcon />, path: '/messages' },
    { text: 'Rating RJ', icon: <TrendingIcon />, path: '/rating' },
    { text: 'Subscriptions', icon: <ListIcon />, path: '/subscriptions' },
];

interface LeftMenuProps {}

export const LeftMenu: FunctionComponent<LeftMenuProps> = () => {
    const router = useRouter();
    return (
        <div className={styles.menu}>
            <ul>
                {menu.map((obj) => (
                    <li key={obj.path}>
                        <Link href={obj.path}>
                            <a>
                                <Button variant={router.asPath === obj.path ? 'contained' : undefined}>
                                    {obj.icon}
                                    {obj.text}
                                </Button>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
