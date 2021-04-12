import isArrayLike from "../isArrayLike";

it("should return true if param is an Array or an array like Object", () => {
    const arr = ["window", true, NaN, 1, null, undefined, {}, { length: 1 }, { length: 1, 3: 1 }, function () { }, new Map(), new Set()];
    arr.forEach(elem => {
        expect(isArrayLike(elem)).toBe(false);
    });
    expect(isArrayLike([])).toBe(true);
    expect(isArrayLike({ length: 0 })).toBe(true);
    expect(isArrayLike({ length: 1, 0: 1 })).toBe(true);
});
