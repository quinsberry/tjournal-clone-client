import { createContext, useContext, FunctionComponent, useEffect } from 'react';
import { AppStore } from './AppStore';
import { observable } from 'mobx';
import { container } from 'tsyringe';

const rootStore = observable(new AppStore());
container.register<AppStore>('AppStore', {useValue: rootStore});

const StoreContext = createContext<AppStore>(new AppStore());

export const StoreProvider: FunctionComponent<{}> = ({ children }) => {
    useEffect(() => {
        if (window) {
            (window as any).rootStore = rootStore;
        }
    }, []);

    return (
        <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
    );
};

type Output<T extends Record<string, (...args: any) => any>> = {
    [P in keyof T]: ReturnType<T[P]>;
};
export const useStore = <T extends Record<string, (appStore: AppStore) => any>>(extractions: T): Output<T> => {
    const appStore = useContext(StoreContext);
    return Object.keys(extractions).reduce((result, currentKey: keyof T) => {
        Object.defineProperty(result, currentKey, {get: () => extractions[currentKey](appStore)});
        return result;
    }, {} as Output<T>);
};

