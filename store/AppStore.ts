import { CommunicatorService, Severity } from '../services/CommunicatorService/CommunicatorService';
import { computed, makeObservable, observable } from 'mobx';
import { ApiService } from '../services/ApiService/ApiService';

export class AppStore {

    @observable communicatorService = new CommunicatorService(new Map<Severity, number>([
        [Severity.Success, 5000],
    ]));
    @observable apiService = new ApiService({}, { communicatorService: computed(() => this.communicatorService) });

    constructor() {
        makeObservable(this);
    }

}