import {HttpError, safeFetch} from "../../src";
import {describe, expect, it} from "vitest";

interface User {
    "id": number,
    "name": string,
    "username": string,
    "email": string,
    "address": {
        "street": string,
        "suite": string,
        "city": string,
        "zipcode": string,
        "geo": {
            "lat": string,
            "lng": string
        }
    },
    "phone": string,
    "website": string,
    "company": {
        "name": string,
        "catchPhrase": string,
        "bs": string
    }
}

describe("safeFetch", () => {
    it('should return Users array', async () => {
        const result = await safeFetch<User[]>(() => fetch("https://jsonplaceholder.typicode.com/users"))

        expect(result.ok).toBe(true)

        if (result.ok) {
            expect(result.value.length).toBeGreaterThan(0)

            const firstUser = result.value[0]

            expect(firstUser).toBeDefined()
            if (firstUser) {
                expect(typeof firstUser.id).toBe("number")
            }
        }
    });

    it('should return an error 404', async () => {
        const result = await safeFetch(() => fetch("https://jsonplaceholder.typicode.com/users/1000"))

        expect(result.ok).toBe(false)

        if (!result.ok) {
            expect(result.error).toBeInstanceOf(HttpError)

            if (result.error instanceof HttpError) {
                expect(result.error.statusCode).toBe(404)
                expect(result.error.statusCodeName).toBe("NOT_FOUND")
            }
        }
    });
})
