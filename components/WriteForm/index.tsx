import React, { FunctionComponent } from 'react';
import { Button, Input } from '@material-ui/core';
import styles from './WriteForm.module.scss';
import dynamic from 'next/dynamic';
import { EditorProps } from '../Editor';

const Editor = dynamic<EditorProps>(() => import('../Editor').then(m => m.Editor), { ssr: false });

interface WriteFormProps {
    title?: string;
}

export const WriteForm: FunctionComponent<WriteFormProps> = ({ title }) => {
    return (
        <div>
            <Input classes={{ root: styles.titleField }} placeholder='Header' defaultValue={title} />
            <div className={styles.editor}>
                <Editor />
            </div>
            <Button variant='contained' color='primary'>
                Publish
            </Button>
        </div>
    );
};
