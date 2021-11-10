import { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { resolveDependencies, storeGlobals } from '../../store/GlobalsReference';
import { Communicator } from '../_common/Communicator/Communicator';


const ObserverCommunicator = observer(Communicator);
export const GlobalCommunicator: FunctionComponent<{}> = observer(() => {
    const communicatorService = resolveDependencies(storeGlobals).communicatorService;
    return (
        <ObserverCommunicator
            messageQueue={communicatorService.queue}
            onClose={communicatorService.close}
        />
    );
});
