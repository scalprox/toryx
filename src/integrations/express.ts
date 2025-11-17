import toryx from "../core/toryx";
import type {Response, Request, NextFunction} from "express";
import {HttpError} from "../errors/httpError";

/**
 * Creates an error-handling middleware function.
 *
 * This middleware is designed to handle errors in a Node.js application using Express. It logs errors if detailed logs are enabled,
 * and sends appropriate HTTP responses based on the type of error. If the error is an instance of `HttpError`, it responds with the
 * status code and body provided by the error. For other types of errors, it responds with a generic 500 Internal Server Error.
 *
 * @return {function} An Express middleware function that takes four parameters: err (the error object), req (the request object),
 *                   res (the response object), and next (the next middleware function).
 * @example
 * import express from "express"
 *
 * const app = express()
 *
 * //⚠️ you need to add the errorMiddleware after all your routes and middlewares !
 * app.use(createErrorMiddleware)
 */
export function createErrorMiddleware() {
    return (err: unknown, req: Request, res: Response, next: NextFunction) => {

        if (toryx.isDetailedLogsEnabled()) {
            console.error(err)
        }

        if (err instanceof HttpError) {
            res.status(err.statusCode).json(err.body)
            return
        }

        res.status(500).json({code: 500, message: "Internal server error"})
    }
}