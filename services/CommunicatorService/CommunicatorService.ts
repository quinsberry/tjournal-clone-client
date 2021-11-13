import { action, computed, makeObservable, observable } from 'mobx';

export enum Severity {
    Error = 'error',
    Info = 'info',
    Success = 'success',
    Warning = 'warning',
}

type PickPartial<T, Req extends keyof T, Opt extends keyof T> = Pick<T, Req> & Partial<Pick<T, Opt>>;

const nextMessageKey = (() => {
    function* generator() {
        let i = 0;
        while (true) {
            yield i++;
        }
    }
    const gen = generator();
    return () => String(gen.next().value);
})();

type CommunicatorMessageCreationData =
    PickPartial<CommunicatorMessage, 'message' | 'severity', 'autoHideDuration'>;

export class CommunicatorMessage {
    autoHideDuration: number | undefined;
    key: string;
    message: string;
    severity: Severity;

    constructor({
        autoHideDuration = undefined,
        ...messageData
    }: CommunicatorMessageCreationData) {
        this.autoHideDuration = autoHideDuration;
        this.key = nextMessageKey();
        this.message = messageData.message;
        this.severity = messageData.severity;
    }
}

export class CommunicatorService {
    @observable queue: CommunicatorMessage[] = [];
    @observable autoHideDurationMap: Map<Severity, number>;

    /**
     * @param autoHideDurationMap Map of severity to a duration (ms) in which items added with that severity will be removed.
     */
    constructor(autoHideDurationMap: Map<Severity, number> = new Map<Severity, number>()) {
        makeObservable(this);

        this.autoHideDurationMap = autoHideDurationMap;
    }

    @computed
    get messageStack() {
        return this.queue.reverse();
    }

    @action.bound
    open(message: string, severity: Severity, autoHideDuration?: number): void {
        autoHideDuration = autoHideDuration ?? this.autoHideDurationMap.get(severity);
        const newMessage = new CommunicatorMessage({message, severity, autoHideDuration});

        this.queue.push(newMessage);
        if (!!autoHideDuration) {
            setTimeout(() => this.close(newMessage.key), autoHideDuration);
        }
    };

    @action.bound
    openError(error: string | Error): void {
        const errorMessage = typeof error === 'string' ? error : error.message;
        console.error(error);
        this.open(errorMessage, Severity.Error);
    }

    @action.bound
    openInfo(message: string): void {
        this.open(message, Severity.Info);
    }

    @action.bound
    openSuccess(message: string): void {
        this.open(message, Severity.Success);
    }

    @action.bound
    openWarning(message: string): void {
        this.open(message, Severity.Warning);
    }

    @action.bound
    close(key: string): void {
        this.queue = this.queue.filter(m => m.key !== key);
    }

    @action.bound
    setAutoHideDurationMap(autoHideDurationMap: Map<Severity, number>): void {
        this.autoHideDurationMap = autoHideDurationMap;
    }

    _hydrate(data: any) {
        console.log('CommunicatorService hydrated with data: ', data);
    }
}
