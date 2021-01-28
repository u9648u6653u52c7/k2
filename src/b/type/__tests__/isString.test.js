import isString from "../isString";

it("should return true if param is String", () => {
    const arr = [true, NaN, 1, null, undefined, [], {}, function () { }, new Map(), new Set()];
    arr.forEach(elem => {
        expect(isString(elem)).toBe(false);
    });
    expect(isString("hello")).toBe(true);
    expect(isString(`hello`)).toBe(true);
});
