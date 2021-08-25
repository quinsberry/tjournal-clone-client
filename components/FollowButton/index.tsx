import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckOutlined';
import AddIcon from '@material-ui/icons/AddOutlined';

interface FollowButtonProps {}
export const FollowButton: FunctionComponent<FollowButtonProps> = () => {
    const [followed, setFollowed] = React.useState(false);

    return (
        <Button
            onClick={() => setFollowed(!followed)}
            variant="contained"
            style={{ minWidth: 30, width: 35, height: 30 }}>
            {!followed ? <AddIcon /> : <CheckIcon style={{ fontSize: 20, color: '#2ea83a' }} />}
        </Button>
    );
};
