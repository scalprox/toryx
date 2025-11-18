import {describe, expect, it} from "vitest";
import {safeAsync} from "../../src";

describe("safeAsync", () => {

    it('should return "2"', async() => {
        const return2 = new Promise<number>((resolve) => {
            setTimeout(() => {resolve(2)},100)
        })

        const result = await safeAsync(()=>return2)

        expect(result.ok).toBe(true)
        if(result.ok){
            expect(result.value).toBe(2)
        }

    });
})