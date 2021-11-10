import { CommunicatorService, Severity } from '../services/CommunicatorService/CommunicatorService';
import { computed, makeObservable, observable } from 'mobx';
import { ApiService } from '../services/ApiService/ApiService';

export type AppStoreHydrationData = any;

export class AppStore {

    @observable communicatorService = new CommunicatorService(new Map<Severity, number>([
        [Severity.Success, 5000],
    ]));
    @observable apiService = new ApiService({}, { communicatorService: computed(() => this.communicatorService) });

    constructor() {
        makeObservable(this);
    }

    hydrate(data: AppStoreHydrationData) {
        console.log('hydration data: ', data);
        // example of next + mobx hydration system (https://github.com/ivandotv/mobx-nextjs-root-store)
    }
}