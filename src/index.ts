import Toryx from "./core/toryx";

export function toryxInit(config?: Partial<ToryxConfig>){
    Toryx.configure(config)
}