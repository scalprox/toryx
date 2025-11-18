import Toryx from "../core/toryx";

interface ErrorOptions {
    cause?: Error | unknown
    context?: Record<string, unknown>
    isCritical?: boolean
    code?: string
    timestamp?: Date
}

export class ToryxError extends Error {
    readonly cause?: ErrorOptions['cause']
    readonly context?: ErrorOptions['context']
    readonly isCritical?: ErrorOptions['isCritical']
    readonly code?: ErrorOptions['code']
    readonly timestamp?: Date

    constructor(message: string, options: ErrorOptions = {}) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = this.constructor.name;
        this.cause = options.cause;
        this.context = options.context;
        this.isCritical = options.isCritical ?? true;
        this.code = options.code;
        this.timestamp = options.timestamp ?? new Date();

        if(Error.captureStackTrace){
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJson(): Record<string, unknown> {
        const result: Record<string, unknown> = {
            name: this.name,
            message: this.message,
            context: this.context,
            isCritical: this.isCritical,
            code: this.code,
            timestamp: this.timestamp,
            ...(Toryx.getConfig().detailedLogs && { stack: this.stack })
        };

        if (this.cause) {
            result.cause = this.cause instanceof Error
                ? { message: this.cause.message, name: this.cause.name }
                : this.cause;
        }

        return result;
    }

    pretify(): string {
        return JSON.stringify(this.toJson(), null, 2);
    }
}