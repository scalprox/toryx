import {ToryxError} from "./toryxError";
import {httpStatusCode} from "../dictionaries/httpStatusCode";

type HttpStatusName = keyof typeof httpStatusCode;
type HttpStatusCode = typeof httpStatusCode[HttpStatusName]
type Body = unknown

interface ErrorOptions {
    statusCodeName: HttpStatusName
    body: Body
}

export class HttpError extends ToryxError {
    statusCode: HttpStatusCode;
    statusCodeName: HttpStatusName;
    body: Body;

    constructor(message: string, options: ErrorOptions, cause?: Error) {
        super(message, {cause});

        this.statusCodeName = options.statusCodeName;
        this.statusCode = httpStatusCode[this.statusCodeName];
        this.body = options.body;
    }

    // factory method

    static notFound(body: Body, message?: string): HttpError {
        return new HttpError(message || "Not found", {statusCodeName: "NOT_FOUND", body})
    }

    static badRequest(body: Body, message: string): HttpError {
        return new HttpError(message || "Bad request", {statusCodeName: "BAD_REQUEST", body})
    }

    static unauthorized(body: Body, message: string): HttpError {
        return new HttpError(message || "Unauthorized", {statusCodeName: "UNAUTHORIZED", body})
    }

    static forbidden(body: Body, message: string): HttpError {
        return new HttpError(message || "Forbidden", {statusCodeName: "FORBIDDEN", body})
    }

    static conflict(body: Body, message: string): HttpError {
        return new HttpError(message || "Conflict", {statusCodeName: "CONFLICT", body})
    }

    static methodNotAllowed(body: Body, message: string): HttpError {
        return new HttpError(message || "Method not allowed", {statusCodeName: "METHOD_NOT_ALLOWED", body})
    }

    static internalServerError(body: Body, message: string): HttpError {
        return new HttpError(message || "Internal server error", {statusCodeName: "INTERNAL_SERVER_ERROR", body})
    }

    static tooManyRequests(body: Body, message: string): HttpError {
        return new HttpError(message || "Too many requests", {statusCodeName: "TOO_MANY_REQUESTS", body})
    }
}