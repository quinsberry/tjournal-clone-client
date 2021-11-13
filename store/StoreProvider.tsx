import { createContext, FunctionComponent, useContext, useEffect } from 'react';
import { AppStore, AppStoreHydrationData } from './AppStore';
import { observable } from 'mobx';
import { container } from 'tsyringe';
import { enableStaticRendering } from 'mobx-react';
import { hydrate } from '../lib/next-mobx-hydration';

let rootStore = observable(new AppStore());
container.register<AppStore>('AppStore', { useValue: rootStore });


enableStaticRendering(typeof window === 'undefined');

function initializeStore(initialData?: AppStoreHydrationData): AppStore {
    const store = rootStore;

    // if there is data call the root store hydration method
    if (initialData) {
        hydrate({ store }, initialData);
    }

    // For server side rendering always create a new store
    if (typeof window === 'undefined') return store;

    // Create the store once in the client
    if (!rootStore) rootStore = store;

    return store;
}


const StoreContext = createContext<AppStore>(new AppStore());

export const StoreProvider: FunctionComponent<{ hydrationData?: AppStoreHydrationData }> =
({
    hydrationData,
    children,
}) => {
    const store = initializeStore(hydrationData);

    useEffect(() => {
        if (window) {
            (window as any).rootStore = store;
        }
    }, []);

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

type Output<T extends Record<string, (...args: any) => any>> = {
    [P in keyof T]: ReturnType<T[P]>;
};
export const useStore = <T extends Record<string, (appStore: AppStore) => any>>(extractions: T): Output<T> => {
    const appStore = useContext(StoreContext);
    return Object.keys(extractions).reduce((result, currentKey: keyof T) => {
        Object.defineProperty(result, currentKey, { get: () => extractions[currentKey](appStore) });
        return result;
    }, {} as Output<T>);
};

