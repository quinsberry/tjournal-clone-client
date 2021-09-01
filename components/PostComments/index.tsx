import React, { FunctionComponent } from 'react';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { Comment } from '../Comment';
import { AddCommentForm } from '../AddCommentForm';
import { data } from '../../data';

enum ActiveTabs {
    POPULAR = 'popular',
    NEW = 'new',
}

interface PostCommentsProps {
}

export const PostComments: FunctionComponent<PostCommentsProps> = () => {
    const [activeTab, setActiveTab] = React.useState<ActiveTabs>(ActiveTabs.POPULAR);
    const comments = data.comments[activeTab];

    const onTabChange = (_: React.ChangeEvent<{}>, value: ActiveTabs) => setActiveTab(value);
    return (
        <Paper elevation={0} className='mt-40 p-30'>
            <div className='container'>
                <Typography variant='h6' className='mb-20'>
                    42 comments
                </Typography>
                <Tabs
                    onChange={onTabChange}
                    className='mt-20'
                    value={activeTab}
                    indicatorColor='primary'
                    textColor='primary'
                >
                    <Tab label={ActiveTabs.POPULAR} value={ActiveTabs.POPULAR} />
                    <Tab label={ActiveTabs.NEW} value={ActiveTabs.NEW} />
                </Tabs>
                <Divider />
                <AddCommentForm />
                <div className='mb-20' />
                {comments.map(obj => (
                    <Comment key={obj.id} user={obj.user} text={obj.text} createdAt={obj.createdAt} />
                ))}
            </div>
        </Paper>
    );
};
