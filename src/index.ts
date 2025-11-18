import Toryx from "./core/toryx";
import {HttpError} from "./errors/httpError";

export function toryxInit(config?: Partial<ToryxConfig>){
    Toryx.configure(config)
}

export {safeAsync} from "./utils/safeAsync"
export {safeFetch} from "./utils/safeFetch"
export {HttpError} from "./errors/httpError"
export {ToryxError} from "./errors/toryxError"