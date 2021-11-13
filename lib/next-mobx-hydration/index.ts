enum HydrationProperty {
    Name = '__HYDRATION__',
}

export function serializeHydrationProps(hydrationObject: Record<any, any>, otherProperties?: Record<any, any>) {
    return {
        [HydrationProperty.Name]: hydrationObject,
        ...otherProperties,
    };
}

export function deserializeHydrationProps<O extends Record<string, any>>(object: O): [Record<any, any> | null, Record<any, any> | undefined] {
    let hydrationData: Record<any, any> | null = null;
    let otherData = object;
    if (HydrationProperty.Name in object) {
        hydrationData = object[HydrationProperty.Name];
        otherData = Object.keys(object).reduce((acc, key) => {
            if (key !== HydrationProperty.Name) {
                acc[key] = object[key];
            }
            return acc;
        }, {} as any);
    }
    return [hydrationData, otherData];
}

interface RequiredStore {
    store: Record<string, any>;
}

interface HydrationData extends RequiredStore {
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
    if (object && '_hydrate' in Object.getPrototypeOf(object)) {
        object._hydrate(hydrationData);
    }
}
