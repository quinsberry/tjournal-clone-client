import React, { FunctionComponent } from 'react';
import EditorJS, { ToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';

// @ts-ignore There is no types for this package.
import List from '@editorjs/list';
// @ts-ignore There is no types for this package.
import Embed from '@editorjs/embed';
// @ts-ignore There is no types for this package.
import Code from '@editorjs/code';
// @ts-ignore There is no types for this package.
import Link from '@editorjs/link';
// @ts-ignore There is no types for this package.
import Table from '@editorjs/table';

export interface EditorProps {
}

export const Editor: FunctionComponent<EditorProps> = () => {
    React.useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            placeholder: 'Start writing your article',
            autofocus: false,
            tools: {
                header: {
                    class: Header as unknown as ToolConstructable,
                    inlineToolbar: ['link'],
                },
                list: {
                    class: List,
                    inlineToolbar: ['link', 'bold'],
                },
                embed: {
                    class: Embed,
                    inlineToolbar: false,
                    config: {
                        services: {
                            youtube: true,
                            coub: true,
                        }
                    }
                },
                code: Code,
                table: {
                    class: Table,
                    inlineToolbar: true,
                    config: {
                        rows: 2,
                        cols: 3,
                    },
                },
                linkTool: {
                    class: Link,
                    config: {
                        endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
                    }
                }
            },
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
