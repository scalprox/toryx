import {Err, Ok, type Result} from "../core/result";
import Toryx from "../core/toryx";
import {ToryxError} from "../errors/toryxError";

/**
 * Executes an asynchronous function and handles any errors that occur, wrapping the result
 * in a Result type (Ok or Err). This method provides error management and logs detailed
 * information if detailed logging is enabled in the configuration.
 *
 * @param fn The asynchronous function to execute safely. It is expected to return a Promise.
 * @return A Promise resolving to a Result object. If the function executes successfully, an Ok object wrapping the result is returned.
 * If the function throws an error, an Err object is returned containing the generated ToryxError.
 * @throws {ToryxError}
 *
 * @example
 * const users = await safeAsync(()=>getUsers);
 *
 * if(users.ok){
 *     // handle the result here
 *     users.value
 * }else{
 *     // Handle the error here
 *     users.error
 * }
 * */
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

