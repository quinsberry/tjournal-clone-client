export enum HydrationName {
    Property = '__HYDRATION__',
    Action = '_hydrate',
}

export function serializeHydrationProps<O extends Record<string, any>>(hydrationObject: O, otherProperties?: Record<string, any>) {
    return {
        [HydrationName.Property]: hydrationObject,
        ...otherProperties,
    };
}

export interface DeserializeHydrationPropsObject {
    [HydrationName.Property]: Record<string, any>;
    [keys: string]: any;
}

export function deserializeHydrationProps<O extends DeserializeHydrationPropsObject, HydrationData extends Record<any, any> | null = Record<any, any> | null>(object: O): [HydrationData, Record<any, any> | undefined] {
    let hydrationData = null as HydrationData;
    let otherData = object;
    if (object?.hasOwnProperty(HydrationName.Property)) {
        hydrationData = object[HydrationName.Property] as HydrationData;
        otherData = Object.keys(object).reduce((acc, key) => {
            if (key !== HydrationName.Property) {
                acc[key] = object[key];
            }
            return acc;
        }, {} as any);
    }
    return [hydrationData, otherData];
}

export interface AppStoreHydrationSchema<S = Record<string, any>> {
    store: S;
}

export interface HydrationData extends AppStoreHydrationSchema {
    [keys: string]: any;
}

export function hydrate<S extends Record<string, any>, D extends HydrationData>(store: S, hydrationData: D) {
    if (store) {
        Object.keys(store).forEach(key => {
            const property = store[key];
            checkIfHydrate(property, hydrationData[key]);
            if (typeof property === 'object') {
                hydrate(property, hydrationData);
            }
        });
    }
}

function checkIfHydrate(object: Record<string, any>, hydrationData: any) {
    if (object && HydrationName.Action in Object.getPrototypeOf(object)) {
        object._hydrate(hydrationData);
    }
}
