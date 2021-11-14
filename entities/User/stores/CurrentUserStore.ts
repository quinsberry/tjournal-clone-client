import { action, computed, IComputedValue, makeObservable, observable } from 'mobx';
import { ApiService } from '../../../services/ApiService/ApiService';
import { CommunicatorService } from '../../../services/CommunicatorService/CommunicatorService';
import { AppStoreHydrationData } from '../../../store/AppStore';
import { User } from '../types/User';

interface CurrentUserStoreConfig {
}

interface CurrentUserStoreDependencies {
    apiService: IComputedValue<ApiService>;
}


export interface CurrentUserStoreHydrationData {
    userInfo: User;
}

export class CurrentUserStore {
    private readonly apiService: IComputedValue<ApiService>;

    private readonly maxFullNameLength = 40;
    private readonly longTextIndicator = '...';

    @observable userInfo: User | null = null;
    // @observable changePasswordStore: ChangePasswordStore;
    // @observable aboutStore: AboutStore;

    constructor({}: CurrentUserStoreConfig, { apiService }: CurrentUserStoreDependencies) {
        makeObservable(this);

        this.apiService = apiService;
        // this.changePasswordStore = new ChangePasswordStore({});
        // this.aboutStore = new AboutStore({}, {currentUserStore: this});
    }


    @computed
    get croppedFullName(): string {
        return this.userInfo !== null
            ? this.userInfo.fullName.length > this.maxFullNameLength
                ? `${this.userInfo.fullName.slice(0, this.maxFullNameLength - this.longTextIndicator.length)}${this.longTextIndicator}`
                : this.userInfo.fullName
            : '';
    }

    @computed
    get welcomeMessage(): string {
        return `Welcome ${this.userInfo?.fullName ?? '%username%'}`;
    }


    @action.bound
    logOut() {
        // this.apiService.requests.auth.logout({
        //     prediction: () => false,
        //     data: {},
        // })
        //     .then(this.onLogoutSuccess)
        //     .catch(this.apiService.handleCaughtErrors);
    }

    @action.bound
    onLogoutSuccess() {
        // this.getRootStore().userHomeApp?.cardLayoutStore.resetLayout();
        // this.getRootStore().dashboardQcApp?.cardLayoutStore.resetLayout();
        // this.getRootStore().studyHomeApp?.cardLayoutStore.resetLayout();
        // this.getRootStore().siteMap.routes.userhome.navigate({});
    }

    @action.bound
    setUserInfo(userInfo: User) {
        this.userInfo = userInfo;
    }

    _hydrate({ userInfo }: CurrentUserStoreHydrationData) {
        this.setUserInfo(userInfo);
    }
}
