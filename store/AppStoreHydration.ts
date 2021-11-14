import {
    AppStoreHydrationSchema,
    deserializeHydrationProps,
    DeserializeHydrationPropsObject,
    hydrate,
    serializeHydrationProps,
} from './hydration';
import { AppStore, AppStoreHydrationData } from './AppStore';
import { CommunicatorServiceHydrationData } from '../services/CommunicatorService/CommunicatorService';
import { CurrentUserStoreHydrationData } from '../entities/User/stores/CurrentUserStore';
import { ApiServiceHydrationData } from '../services/ApiService/ApiService';


export interface AppHydrationSchema extends AppStoreHydrationSchema<AppStoreHydrationData> {
    currentUserStore?: CurrentUserStoreHydrationData;
    apiService?: ApiServiceHydrationData;
    communicatorService?: CommunicatorServiceHydrationData;
}

export class AppHydration {
    static serializeHydrationProps(obj: AppHydrationSchema, props?: Record<string, any>) {
        return serializeHydrationProps(obj, props);
    }
    static deserializeHydrationProps(obj: DeserializeHydrationPropsObject) {
        return deserializeHydrationProps<DeserializeHydrationPropsObject, AppHydrationSchema>(obj);
    }
    static hydrate(store: AppStore, hydrationData: AppHydrationSchema) {
        return hydrate({ store }, hydrationData);
    }
}