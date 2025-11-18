# What is Toryx?

Toryx is a secure and robust JavaScript/TypeScript library for advanced error handling and request management. It provides a type-safe approach to error handling inspired by Rust's Result pattern, eliminating the need for try-catch blocks while maintaining full error visibility.

## Features

- **Type-safe error handling** with Result pattern
- **Safe async operations** without try-catch blocks
- **HTTP error management** with comprehensive status codes
- **Express middleware** for centralized error handling
- **Extensible error classes** for custom error types
- **Detailed logging** capabilities

## Installation

Install the package from npm:

```bash
npm install toryx
```

## Configuration

Once the package is installed, you need to import `toryxInit` to configure Toryx according to your needs:

```typescript
import { toryxInit } from "toryx"

toryxInit({
    detailedLogs: true
})
```

> [!WARNING]
> For your configuration to be used correctly, you must call `toryxInit` before your application execution.

## Core Features

### SafeAsync

`safeAsync` allows you to execute asynchronous functions without using try-catch blocks. It wraps the result in a `Result` type, similar to Rust's Result pattern.

**Usage:**

```typescript
import { safeAsync } from "toryx"

async function getUsers() {
    // Your async operation
    return await database.users.findMany()
}

const result = await safeAsync(() => getUsers())

if (result.ok) {
    // Handle successful result
    console.log(result.value)
} else {
    // Handle error
    console.error(result.error)
}
```

**Benefits:**
- No need for try-catch blocks
- Type-safe error handling
- Automatic error wrapping in `ToryxError`
- Detailed logging when enabled

---

### SafeFetch

`safeFetch` provides a robust wrapper around the Fetch API, handling both network errors and HTTP error responses in a unified way.

**Usage:**

```typescript
import { safeFetch, HttpError, ToryxError } from "toryx"

const result = await safeFetch(() => 
    fetch("https://api.example.com/users")
)

if (result.ok) {
    // Successful response (2xx status codes)
    console.log(result.value)
} else {
    // Error occurred
    if (result.error instanceof HttpError) {
        // Server responded with an error status code (4xx, 5xx)
        console.error(`HTTP Error: ${result.error.statusCode}`)
        console.error(`Body:`, result.error.body)
    } else if (result.error instanceof ToryxError) {
        // Network error or request failed to send
        console.error(`Network Error:`, result.error.message)
    }
}
```

**Features:**
- Automatic content-type detection (JSON, text, blob)
- Distinguishes between network errors and HTTP errors
- Provides typed error objects
- Returns parsed response body

**Error Types:**
- `HttpError`: Server responded with an error status code
- `ToryxError`: Network error or request failed

---

### ToryxError

`ToryxError` is the base error class for all Toryx errors. It extends the native JavaScript `Error` class with additional properties for better error tracking and debugging.

**Properties:**

```typescript
interface ErrorOptions {
    cause?: Error | unknown        // Original error that caused this error
    context?: Record<string, unknown>  // Additional context data
    isCritical?: boolean           // Whether this error is critical
    code?: string                  // Custom error code
    timestamp?: Date               // When the error occurred
}
```

**Usage:**

```typescript
import { ToryxError } from "toryx"

// Basic usage
throw new ToryxError("Something went wrong")

// With options
throw new ToryxError("Database connection failed", {
    cause: originalError,
    context: { userId: 123, operation: "findUser" },
    isCritical: true,
    code: "DB_CONNECTION_ERROR"
})

// Convert to JSON
const errorJson = error.toJson()

// Pretty print for logging
console.log(error.pretify())
```

**Methods:**
- `toJson()`: Converts the error to a JSON object
- `pretify()`: Returns a formatted string representation of the error

---

### HttpError

`HttpError` extends `ToryxError` and is specifically designed for HTTP-related errors. It includes HTTP status codes and response bodies.

**Properties:**

```typescript
class HttpError extends ToryxError {
    statusCode: number           // HTTP status code (404, 500, etc.)
    statusCodeName: string       // Status code name (NOT_FOUND, INTERNAL_SERVER_ERROR, etc.)
    body: unknown                // Response body from the server
}
```

**Factory Methods:**

Toryx provides convenient factory methods for common HTTP errors:

```typescript
import { HttpError } from "toryx"

// 404 Not Found
throw HttpError.notFound({ message: "User not found" })

// 400 Bad Request
throw HttpError.badRequest(
    { errors: ["Invalid email"] }, 
    "Validation failed"
)

// 401 Unauthorized
throw HttpError.unauthorized(
    { message: "Invalid token" }, 
    "Authentication required"
)

// 403 Forbidden
throw HttpError.forbidden(
    { message: "Access denied" }, 
    "Insufficient permissions"
)

// 409 Conflict
throw HttpError.conflict(
    { message: "User already exists" }, 
    "Duplicate resource"
)

// 405 Method Not Allowed
throw HttpError.methodNotAllowed(
    { allowed: ["GET", "POST"] }, 
    "Method not supported"
)

// 500 Internal Server Error
throw HttpError.internalServerError(
    { message: "Database error" }, 
    "Server error occurred"
)

// 429 Too Many Requests
throw HttpError.tooManyRequests(
    { retryAfter: 60 }, 
    "Rate limit exceeded"
)
```

**Direct Usage:**

```typescript
throw new HttpError("Custom error message", {
    statusCodeName: "NOT_FOUND",
    body: { customField: "customValue" }
})
```

---

### Express Middleware

Toryx provides an Express middleware for centralized error handling in your application.

**Setup:**

```typescript
import express from "express"
import { createErrorMiddleware } from "toryx/express"

const app = express()

// Your routes and middleware
app.get("/users", async (req, res, next) => {
    const result = await safeAsync(() => getUsers())
    
    if (result.ok) {
        res.json(result.value)
    } else {
        // Pass error to the middleware
        next(result.error)
    }
})

// ⚠️ Add the error middleware AFTER all your routes and middlewares
app.use(createErrorMiddleware())

app.listen(3000)
```

**How it works:**

The middleware automatically handles errors passed via `next(error)`:

1. If `detailedLogs` is enabled, it logs the error to the console
2. If the error is an `HttpError`, it responds with the appropriate status code and body
3. For other errors, it responds with a generic 500 Internal Server Error

**Response Examples:**

```typescript
// HttpError response
{
    // Your custom body from HttpError.body
}

// Generic error response
{
    code: 500,
    message: "Internal server error"
}
```

---

## Complete Example

Here's a complete example combining all features:

```typescript
import express from "express"
import { toryxInit, safeAsync, safeFetch, HttpError, createErrorMiddleware } from "toryx"

// Initialize Toryx
toryxInit({
    detailedLogs: true
})

const app = express()

// Route with safeAsync
app.get("/users/:id", async (req, res, next) => {
    const userId = parseInt(req.params.id)
    
    const result = await safeAsync(async () => {
        // Simulate database query
        const user = await database.users.findById(userId)
        
        if (!user) {
            throw HttpError.notFound(
                { userId }, 
                "User not found"
            )
        }
        
        return user
    })
    
    if (result.ok) {
        res.json(result.value)
    } else {
        next(result.error)
    }
})

// Route with safeFetch
app.get("/external-data", async (req, res, next) => {
    const result = await safeFetch(() => 
        fetch("https://api.example.com/data")
    )
    
    if (result.ok) {
        res.json(result.value)
    } else {
        next(result.error)
    }
})

// Error middleware (must be last)
app.use(createErrorMiddleware())

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
```

## Best Practices

1. **Initialize early**: Call `toryxInit` before any other application code
2. **Use Result pattern**: Always check the `ok` property of Result objects
3. **Custom errors**: Extend `ToryxError` for domain-specific errors
4. **Error middleware**: Place the error middleware after all routes
5. **Factory methods**: Use HttpError factory methods for common cases

## TypeScript Support

Toryx is written in TypeScript and provides full type safety:

```typescript
// Result type is inferred
const result = await safeAsync(() => getUsers())
// result.value is typed as User[] if getUsers returns User[]

// Generic type parameter
const result = await safeFetch<User[]>(() => 
    fetch("/api/users")
)
// result.value is typed as User[]
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.