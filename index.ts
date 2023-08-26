/**
 * Represents an optional value that can either be `Some` with a value or `None`.
 * @typeparam T The type of the wrapped value.
 */
export interface Option<T> {
    /**
     * Applies the provided callbacks to the value of this `Option`
     * depending on its contents and returns the result of the called
     * function.
     *
     * @typeparam U The type of the value returned by the callbacks.
     * @param none - The callback to apply if this `Option` is `None`.
     * @param some - The callback to apply if this `Option` is `Some`, and will be passed the value.
     * @returns The result of either `none()` or `some(value)`.
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
     * @param computeFn - The function to apply to the value of this `Option` if it is `Some`.
     * @returns a new `Option` with the result of applying `computeFn` if it is `Some`, otherwise `None`.
     */
    readonly map: <U>(computeFn: (value: T) => U) => this | Option<U>

    /**
     * Returns the provided `Option` if this `Option` is `Some`, otherwise returns `None`.
     *
     * @typeparam U The type of the value of the other `Option`.
     * @param option - The `Option` to return if this `Option` is `Some`.
     * @returns the provided `Option` if this `Option` is `Some`, otherwise returns `None`.
     */
    readonly and: <U>(option: Option<U>) => this | Option<U>

    /**
     * Returns the result of calling the provided function if this `Option` is `Some`, otherwise returns `None`.
     *
     * @typeparam U The type of the value of the other `Option`.
     * @param computeFn - The function to call if this `Option` is `Some`.
     * @returns the result of calling the provided function if this `Option` is `Some`, otherwise returns `None`.
     */
    readonly andThen: <U>(computeFn: () => U) => this | Option<U>

    /**
     * Returns `this` if it is `Some`, otherwise returns the provided `Option`.
     *
     * @typeparam U The type of the value of the other `Option`.
     * @param option - The `Option` to return if this `Option` is `None`.
     * @returns `this` if it is `Some`, otherwise the provided `Option`.
     */
    readonly or: <U>(option: Option<U>) => this | Option<U>

    /**
     * Returns `this` if it is `Some`, otherwise returns the result of calling the provided function.
     *
     * @typeparam U The type of the value of the other `Option`.
     * @param computeFn - The function to call if this `Option` is `None`.
     * @returns `this` if it is `Some`, otherwise the result of calling the provided function.
     */
    readonly orElse: <U>(computeFn: () => U) => this | Option<U>

    /**
     * Returns `this` if the value satisfies the provided predicate, otherwise returns `None`.
     *
     * @param filterFn - The predicate function to apply to the value of this `Option`.
     * @returns `this` if the value satisfies the predicate, otherwise `None`.
     */
    readonly filter: (filterFn: (value: T) => boolean) => Option<T>

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

export const None = _none<any>()

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
        andThen(computeFn) {
            return Some(computeFn())
        },
        or(_) {
            return this
        },
        orElse(_) {
            return this
        },
        filter(filterFn) {
            return filterFn(value)
                ? this
                : None
        },
        isNone: false,
        isSome: true
    }
}

function _none<T>(): Option<T> {
    return {
        match(_, none) {
            return none()
        },
        getValueOrDefault(defaultValue) {
            return defaultValue
        },
        getValueOrCompute(fn) {
            return fn()
        },
        mapOrDefault(_, defaultValue) {
            return defaultValue
        },
        mapOrCompute(_, defaultCompute) {
            return defaultCompute()
        },
        map(_) {
            return this
        },
        and(_) {
            return this
        },
        andThen(_) {
            return this
        },
        or(option) {
            return option
        },
        orElse(fn) {
            return Some(fn())
        },
        filter(_) {
            return this
        },
        isNone: true,
        isSome: false
    }
}