import {ToryxError} from "./toryxError";
import {httpStatusCode} from "../dictionaries/httpStatusCode";

type HttpStatusName = keyof typeof httpStatusCode;
type HttpStatusCode = typeof httpStatusCode[HttpStatusName]

interface ErrorOptions {
    statusCodeName: HttpStatusName
}

export class HttpError extends ToryxError {
    statusCode: HttpStatusCode;
    statusCodeName: HttpStatusName;

    constructor(message: string, options : ErrorOptions, cause?: Error) {
        super(message, {cause});

        this.statusCodeName = options.statusCodeName;
        this.statusCode = httpStatusCode[this.statusCodeName];
    }
}

new HttpError("", {statusCodeName:"FORBIDDEN"})