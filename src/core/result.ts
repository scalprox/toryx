export type Result<R, E extends ToryxError = ToryxError> = Ok<R> | Err<E>

export interface Ok<T> {
    readonly ok: true;
    value: T;
}

export interface Err<E> {
    readonly ok: false;
    error: E;
}


export function Ok<T>(value: T) {
    return {
        ok: true as const,
        value,
        isOk(): this is Ok<T> {
            return true
        },
        isErr(): this is never {
            return false
        },
        unwrap(): T {
            return value
        }
    };
}

export function Err<E>(error: E) {
    return {
        ok: false as const,
        error,
        isOk(): this is never {
            return false
        },
        isErr(): this is Err<E> {
            return true
        },
        unwrap(): never {
            throw new ToryxError("Called unwrap on an Err value", {cause: error})
        }
    };
}