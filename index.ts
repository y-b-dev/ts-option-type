/**
 * Represents an optional value that can either be `Some` with a value or `None`.
 * @typeparam T The type of the wrapped value.
 */
export type Option<T> = {
    /**
     * Applies the provided callbacks to the value of this `Option`
     * depending on its contents and returns the result of the called
     * function.
     *
     * @typeparam U The type of the value returned by the callbacks.
     * @param none - The callback to apply if this `Option` is `None`.
     * @param some - The callback to apply if this `Option` is `Some`, and will be passed the value.
     * @returns The result of either `some(value)` or `none()`.
     */
    readonly match: <U>(some: (value: T) => U, none: () => U) => U

    /**
     * Returns the value of this `Option` if it is `Some`, otherwise
     * returns the provided `defaultValue`.
     *
     * @param defaultValue - The default value to return if this `Option` is `None`.
     * @returns The value of this `Option` if it is `Some`, otherwise `defaultValue`.
     */
    readonly getValueOrDefault: (defaultValue: T) => T

    /**
     * Returns the value of this `Option` if it is `Some`, or computes a value using the
     * provided function if it is `None`.
     *
     * @param computeFn - The function to compute a value if this `Option` is `None`.
     * @returns The value of this `Option` if it is `Some`, otherwise the result of `computeFn()`.
     */
    readonly getValueOrCompute: (computeFn: () => T) => T

    /**
     * Applies a mapping function to the value of this `Option` if it is `Some`, otherwise returns the provided `defaultValue`.
     *
     * @typeparam U The type of the mapped value.
     * @param map - The function to apply to the value of this `Option` if it is `Some`.
     * @param defaultValue - The value to return if this `Option` is `None`.
     * @returns The result of applying `map` to the value if it is `Some`, otherwise `defaultValue`.
     */
    readonly mapOrDefault: <U>(map: (some: T) => U, defaultValue: U) => U

    /**
     * Applies a mapping function to the value of this `Option` if it is `Some`, or computes a value using the provided function if it is `None`.
     *
     * @typeparam U The type of the mapped value.
     * @param map - The function to apply to the value of this `Option` if it is `Some`.
     * @param computeFn - The function to compute a value if this `Option` is `None`.
     * @returns The result of applying `map` to the value if it is `Some`, otherwise the result of `defaultComputeFn()`.
     */
    readonly mapOrCompute: <U>(map: (some: T) => U, computeFn: () => U) => U

    /**
     * Applies a function to the value of this `Option` if it is `Some`, and returns the result wrapped in a new `Option`.
     * If the option is `None`, returns `None`.
     *
     * @typeparam U The type of the mapped value.
     * @param fn - The function to apply to the value of this `Option` if it is `Some`.
     * @returns a new `Option` with the result of applying `computeFn` if it is `Some`, otherwise `None`.
     */
    readonly map: <U>(fn: (value: T) => U) => Option<U>

    /**
     * Returns the provided `Option` if this `Option` is `Some`, otherwise returns `None`.
     *
     * @typeparam U The type of the value of the other `Option`.
     * @param option - The `Option` to return if this `Option` is `Some`.
     * @returns the provided `Option` if this `Option` is `Some`, otherwise returns `None`.
     */
    readonly and: <U>(option: Option<U>) => Option<U>

    /**
     * Returns the result of calling the provided function if this `Option` is `Some`, otherwise returns `None`.
     *
     * @typeparam U The type of the value of the returned `Option`.
     * @param fn - The function to call if this `Option` is `Some`.
     * @returns the result of calling the provided function if this `Option` is `Some`, otherwise returns `None`.
     */
    readonly andThen: <U>(fn: (value: T) => Option<U>) => Option<U>

    /**
     * Returns `this` if it is `Some`, otherwise returns the provided `Option`.
     *
     * @typeparam U The type of the value of the other `Option`.
     * @param option - The `Option` to return if this `Option` is `None`.
     * @returns `this` if it is `Some`, otherwise the provided `Option`.
     */
    readonly or: (option: Option<T>) => Option<T>

    /**
     * Returns `this` if it is `Some`, otherwise returns the result of calling the provided function.
     *
     * @typeparam U The type of the value of the other `Option`.
     * @param fn - The function to call if this `Option` is `None`.
     * @returns `this` if it is `Some`, otherwise the result of calling the provided function.
     */
    readonly orElse: (fn: () => Option<T>) => Option<T>

    /**
     * Returns `this` if the value satisfies the provided predicate, otherwise returns `None`.
     *
     * @param fn - The predicate function to apply to the value of this `Option`.
     * @returns `this` if the value satisfies the predicate, otherwise `None`.
     */
    readonly filter: (fn: (value: T) => boolean) => Option<T>

    /**
     * Returns `true` if this `Option` is `None`, otherwise `false`.
     * @returns `true` if this `Option` is `None`, otherwise `false`.
     */
    readonly isNone: boolean

    /**
     * Returns `true` if this `Option` is `Some`, otherwise `false`.
     * @returns `true` if this `Option` is `Some`, otherwise `false`.
     */
    readonly isSome: boolean
}

export const None: Option<any> = {
    match(_, none) {
        return none()
    },
    getValueOrDefault(defaultValue) {
        return defaultValue
    },
    getValueOrCompute(computeFn) {
        return computeFn()
    },
    mapOrDefault(_, defaultValue) {
        return defaultValue
    },
    mapOrCompute(_, defaultComputeFn) {
        return defaultComputeFn()
    },
    map(_) {
        return None
    },
    and(_) {
        return None
    },
    andThen(_) {
        return None
    },
    or(option) {
        return option
    },
    orElse(fn) {
        return fn()
    },
    filter(_) {
        return None
    },
    isNone: true,
    isSome: false
}

export function Some<T>(value: T): Option<T> {
    return {
        match(some, _) {
            return some(value)
        },
        getValueOrDefault(_) {
            return value
        },
        getValueOrCompute(_) {
            return value
        },
        mapOrDefault(map, _) {
            return map(value)
        },
        mapOrCompute(map, _) {
            return map(value)
        },
        map(fn) {
            return Some(fn(value))
        },
        and(option) {
            return option
        },
        andThen<U>(fn: (value: T) => Option<U>) {
            return fn(value)
        },
        or(_) {
            return this
        },
        orElse(_) {
            return this
        },
        filter(fn) {
            return fn(value)
                ? this
                : None
        },
        isNone: false,
        isSome: true
    }
}

/**
 * Creates an `Option` from a given value. Returns `None` if the value is `null` or `undefined`; 
 * otherwise returns `Some` wrapping the value.
 * 
 * @param value - The value to be wrapped in an `Option`.
 * @returns An `Option` wrapping the value or `None`.
 */
export function fromValue<T>(value: T): Option<T> {
    return value === null || value === undefined ? None : Some(value) as Option<T>;
}

/**
 * Creates an `Option` from a given value based on a condition provided by the `isNone` predicate.
 * Returns `None` if the value satisfies the `isNone` condition; otherwise returns `Some` wrapping the value.
 * 
 * @param value - The value to be wrapped in an `Option`.
 * @param isNone - Predicate function to decide if the value should be treated as `None`.
 * @returns An `Option` wrapping the value or `None` based on the `isNone` predicate.
 */
export function fromValueConditional<T>(value: T, isNone: (value: T) => boolean): Option<T> {
    return isNone(value) ? None : Some(value) as Option<T>;
}

/**
 * Creates an `Option` from a given value. Returns `None` if the value is `null`; 
 * otherwise returns `Some` wrapping the value.
 * Use when you are sure that value won't be `undefined` or in the rare case where `undefined` should be treated as `Some`.
 * 
 * @param value - The nullable value to be wrapped in an `Option`.
 * @returns An `Option` wrapping the value or `None` if the value is `null`.
 */
export function fromNullable<T>(value: T): Option<T> {
    return value === null ? None : Some(value) as Option<T>;
}

/**
 * Creates an `Option` from a given value. Returns `None` if the value is `undefined`; 
 * otherwise returns `Some` wrapping the value.
 * Use when you are sure that value won't be `null` or in the rare case where `null` should be treated as `Some`.
 * 
 * @param value - The undefinable value to be wrapped in an `Option`.
 * @returns An `Option` wrapping the value or `None` if the value is `undefined`.
 */
export function fromUndefinable<T>(value: T): Option<T> {
    return value === undefined ? None : Some(value) as Option<T>;
}

/**
 * Creates a factory function for generating `Option` instances based on the provided `isNonePredicate`.
 * 
 * @param isNonePredicate - Predicate function to decide if a value should be treated as `None`.
 * @returns A function that accepts a value and returns an `Option` based on the `isNonePredicate`.
 */
export function createOptionFactory<T>(isNonePredicate: (value: T) => boolean): (value: T) => Option<T> {
    return value => isNonePredicate(value) ? None : Some(value);
}