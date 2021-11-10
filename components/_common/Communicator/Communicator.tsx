import { FunctionComponent } from 'react';
import { Alert } from '@material-ui/lab';
import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import MuiSlide from '@material-ui/core/Slide';
import { CommunicatorMessage } from '../../../services/CommunicatorService/CommunicatorService';
import styles from './Communicator.module.scss';

interface PureCommunicatorProps {
    /** The CommunicatorMessage objects to display, they hold a key, message, and severity */
    messageQueue: CommunicatorMessage[];
    /** Called when the close button is clicked, passes in the key from the CommunicatorMessage */
    onClose: (key: string) => void;
    /** Controls where to anchor the communicator messages, defaults to top center */
    anchorOrigin?: SnackbarOrigin;
}

export const Communicator: FunctionComponent<PureCommunicatorProps> = ({
    messageQueue,
    onClose,
    anchorOrigin = { vertical: 'top', horizontal: 'center' },
}) => {
    return (
        <Snackbar
            className={styles.communicator}
            open={messageQueue.length > 0}
            anchorOrigin={anchorOrigin}
            style={{ width: '80%' }}
        >
            <div className={styles.message}>
                {messageQueue.map(message => {
                    return (
                        <MuiSlide key={message.key} direction='right' in={true} mountOnEnter={true} unmountOnExit={true} >
                            <div style={{ paddingBottom: '8px' }}>
                                <Alert
                                    key={message.key}
                                    onClose={() => onClose(message.key)}
                                    severity={message.severity}
                                >
                                    {message.message}
                                </Alert>
                            </div>
                        </MuiSlide>
                    );
                })}
            </div>
        </Snackbar>
    );
};
