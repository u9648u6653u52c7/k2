import isNumber from "../isNumber";

it("should return true if param is Number but not NaN", () => {
    const arr = [true, NaN, "", null, undefined, {}, function () { }, new Map(), new Set()];
    arr.forEach(elem => {
        expect(isNumber(elem)).toBe(false);
    });
    expect(isNumber(10)).toBe(true);
    expect(isNumber(0b10)).toBe(true);
    expect(isNumber(0o10)).toBe(true);
    expect(isNumber(0x10)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
});
