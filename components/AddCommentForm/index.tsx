import React, { FunctionComponent } from 'react';
import Input from '@material-ui/core/Input';
import styles from './AddCommentForm.module.scss';
import { Button } from '@material-ui/core';

interface AddCommentFormProps {
}

export const AddCommentForm: FunctionComponent<AddCommentFormProps> = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [text, setText] = React.useState('');

    const onAddComment = () => {
        setIsExpanded(false);
        setText('');
    };
    const onFocus = () => {
        setIsExpanded(true);
    };
    const onBlur = () => {
        if (!text) {
            setIsExpanded(false);
        }
    };

    return (
        <div className={styles.form}>
            <Input
                onChange={e => setText(e.target.value)}
                value={text}
                onFocus={onFocus}
                onBlur={onBlur}
                minRows={isExpanded ? 5 : 1}
                classes={{ root: styles.fieldRoot }}
                placeholder='Write a comment...'
                fullWidth
                multiline
            />
            {isExpanded && (
                <Button onClick={onAddComment} className={styles.addButton} variant='contained' color='primary'>
                    Publish
                </Button>
            )}
        </div>
    );
};
