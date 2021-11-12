enum HydrationProperty {
    Name = '__HYDRATION__',
}

export function serializeHydrationProps(hydrationObject: Record<any, any>, otherProperties?: Record<any, any>) {
    return {
        [HydrationProperty.Name]: hydrationObject,
        otherProperties,
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