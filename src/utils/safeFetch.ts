import {Err, Ok, type Result} from "../core/result";
import {HttpError} from "../errors/httpError";
import {httpStatusCode} from "../dictionaries/httpStatusCode";
import {ToryxError} from "../errors/toryxError";

/**
 * Safely performs a fetch operation and processes the response.
 * This function ensures that HTTP response handling is robust,
 * returning appropriate results or errors for different scenarios.
 *
 * @param {() => Promise<Response>} fn - A function that returns a promise for a fetch response.
 * @return {Promise<Result<R, HttpError | ToryxError>>} A promise resolving to a `Result` object that contains the fetched data
 *                               or an error object for failure cases.
 * @example
 * const result = await safeFetch(() => fetch("https://myserver.com/api/users"));
 *
 * if(result.ok){
 *     // the result of the request is available
 *     result.value
 * }else{
 *     // here an error is received if the response is not 2xx.
 *     // if the server response is 401, 403, 500... You will have `HttpError` in result.error
 *     // if the error is a network error or the server doesn't respond, you will have `ToryxError` in result.error
 *
 *     if(result.error instanceof ToryxError){
 *         // handle the error happened while sending the request
 *     }
 *     if(result.error instanceof HttpError){
 *         // handle the response of the server
 *     }
 * }
 */
export async function safeFetch<R>(fn:()=> Promise<Response>): Promise<Result<R, HttpError | ToryxError>> {
    try {
        const response = await fn();
        if (response.ok) {
            // status code is ok (2xx), return the data
            const data = await response.json() as R
            return Ok(data)

        } else {
            // if status code may be an error, return it to the client
            const statusCodeName = Object.entries(httpStatusCode).find(([_, value]) => value === response.status) as [keyof typeof httpStatusCode, number];
            if (statusCodeName) {
                // status code name is found in the dictionaries.
                const Error = new HttpError(`Error while fetching : (${response.url})`, {statusCodeName: statusCodeName[0]})
                return Err<HttpError>(Error)
            }

            // an unknown status code received should not happen in a normal case
            const Error = new ToryxError(`Unknown status code received from the server : ${response.status}`)
            return Err(Error)
        }
    } catch (error) {
        const Error = new ToryxError(`Unable to fetch data from : (${fn.name})`, {cause: error})
        return Err(Error)
    }
}

