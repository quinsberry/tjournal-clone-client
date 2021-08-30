import React, { FunctionComponent } from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';
import { data } from '../../data';
import styles from './SideComments.module.scss';
import { CommentItem } from './CommentItem';
import clsx from 'clsx';

interface SideCommentsProps {}

export const SideComments: FunctionComponent<SideCommentsProps> = () => {
    const [visible, setVisible] = React.useState(true);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <div className={clsx(styles.root, !visible && styles.rotated)}>
            <h3 onClick={toggleVisible}>
                Comments <ArrowRightIcon />
            </h3>
            {visible && data.comments.popular.map((obj) => (
                <CommentItem key={obj.id} {...obj} />
            ))}
        </div>
    );
};
