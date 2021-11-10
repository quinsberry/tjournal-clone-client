export function assertType<T>(value: any, predicate: (value: any) => boolean, message?: string): asserts value is T {
    if (!predicate(value)) {
        throw new Error(message ?? `Invalid value: ${value}`);
    }
}

export function assertNonNull<T>(value: T, message?: string): asserts value is NonNullable<T> {
    return assertType<T>(value, value => value != null, message);
}

export function isOfType<T>(value: any, predicate: (value: any) => boolean): value is T {
    return predicate(value);
}

export const assertUnreachable = (x: never): Error => {
    throw new Error(`This code should not be reachable! Did not expect ${JSON.stringify(x, null, 4)}`);
};

export function validateFirstElementInList(list: any[], check: (element: any) => boolean): boolean {
    if (Array.isArray(list)) {
        if (list.length > 0) {
            return check(list[0]);
        } else {
            return true;
        }
    } else {
        return false;
    }
}