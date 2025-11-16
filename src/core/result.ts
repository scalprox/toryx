export type Result<R, E extends ToryxError = ToryxError> = Ok<R> | Err<E>

export interface Ok<T> {
    readonly ok: true;
    value: T;
}

export interface Err<E> {
    readonly ok: false;
    error: E;
}

/**
 *  @internal
 */
export function Ok<T>(value: T) {
    return {
        ok: true as const,
        value,
    };
}

/**
 * @internal
 */
export function Err<E>(error: E) {
    return {
        ok: false as const,
        error,
    };
}