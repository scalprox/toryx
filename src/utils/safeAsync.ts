import {Err, Ok, type Result} from "../core/result";
import Toryx from "../core/toryx";

export async function safeAsync<R>(fn: () => Promise<R>): Promise<Result<R>> {
    const config = Toryx.getConfig();

    try {
        const data = await fn();
        return Ok(data);
    } catch (error) {
        const toryxError = new ToryxError(`Error while calling the function (${fn.name})`, {cause: error});
        if (config.detailedLogs) {
            console.error(toryxError.pretify())
        }

        return Err(toryxError);
    }
}