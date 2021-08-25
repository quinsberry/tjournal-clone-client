import React, { FunctionComponent } from 'react';
import EditorJS from '@editorjs/editorjs';

export interface EditorProps {}

export const Editor: FunctionComponent<EditorProps> = () => {
    React.useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            placeholder: 'Введите текст вашей статьи',
        });

        return () => {
            editor.isReady.then(() => {
                editor.destroy();
            })
                .catch(e => console.error('ERROR editor cleanup', e));
        };
    }, []);

    return (
        <div id='editor' />
    );
};
