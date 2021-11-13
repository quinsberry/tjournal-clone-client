/**
 * Utility for easily accessing the top-level of the AppStore
 *
 * @packageDocumentation
 */
import { container, inject, singleton } from 'tsyringe';
import { assertNonNull } from 'utils/type-guards';
import { AppStore } from './AppStore';

type Output<T extends Record<string, (...args: any) => any>> = {
    [P in keyof T]: ReturnType<T[P]>;
};

/**
 * A class whose purpose is to resolve and hold reference to the app store.
 *
 * @remarks
 * This allows us to create a custom interface for accessing dependency injection. If we want to switch DI libraries later
 * this reduces the number of places we have to touch.
 */
@singleton()
class GlobalsReference {
    private readonly appStore: AppStore;

    constructor(@inject('AppStore') appStore?: AppStore) {
        assertNonNull(appStore);
        this.appStore = appStore;
    }

    /**
     * Extract parts of the app store by providing an object of custom selector functions
     *
     * @example
     * If I want to access invoice service from the app store AND I have an instance of GlobalsReference:
     * ```
     *  const invoiceService = globalsReference.select({something: appStore => appStore.invoiceService}).invoiceService
     * ```
     *
     * @example
     * Less _common example, but shows some more flexibility that is possible:
     * ```
     *  const references = globalsReference.select({something: appStore => appStore.invoiceService})
     *  references.something; // This is invoiceService (renamed)
     * ```
     *
     * @param extractions An object where each key is a selector function
     * @returns an object with keys matching your extractions and the selectors resolved.
     */
    select<T extends Record<string, (appStore: AppStore) => any>>(extractions: T): Output<T> {
        return Object.keys(extractions).reduce((result, currentKey: keyof T) => {
            Object.defineProperty(result, currentKey, { get: () => extractions[currentKey](this.appStore) });
            return result;
        }, {} as Output<T>);
    }
}

/**
 * Helper extraction object that does that gets the _common stuff for you
 *
 * @example
 * This first example does not resolve the getters
 * This would be the _common usage:
 * ```
 *  const references = resolveDependencies(storeGlobals);
 * ```
 *
 * @example
 * This second example immediately resolves the getters - this will not work if you're resolving inside the constructor
 * of the class you are trying to reference.
 *
 * Within a class this produces better ctrl-clicking though:
 *  ```
 *  const invoiceService = resolveDependencies(storeGlobals).invoiceService;
 * ```
 *
 */
export const storeGlobals = {
    // clientConfig: (appStore: AppStore) => appStore.clientConfig,
    // routerStore: (appStore: AppStore) => appStore.routerStore,
    // serviceClient: (appStore: AppStore) => appStore.serviceClient,
    // localeManager: (appStore: AppStore) => appStore.localeManager,
    communicatorService: (appStore: AppStore) => appStore.communicatorService,
    // siteMap: (appStore: AppStore) => appStore.siteMap,
    currentUserStore: (appStore: AppStore) => appStore.currentUserStore,
    apiService: (appStore: AppStore) => appStore.apiService,
};

/**
 * A wrapper for the GlobalsReference singleton's "select" method
 *
 * This handles resolving the global reference singleton so you don't have to worry about it.
 *
 * @see storeGlobals examples for most _common usage
 *
 * @example
 * This example shows the full flexibility, but mostly you'll use storeGlobals.
 * WARNING: pulling random stuff should be done purposefully because it creates unexpected couplings
 * ```
 *  const anythingYouWant = resolveDependencies({
 *    anythingYouWant: appStore => appStore.botStore.bot
 *  });
 * ```
 */
export const resolveDependencies = <T extends Record<string, (appStore: AppStore) => any>>(extractions: T) => {
    return container.resolve(GlobalsReference).select(extractions);
};
