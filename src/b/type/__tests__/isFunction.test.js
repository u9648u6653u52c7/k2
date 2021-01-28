import isFunction from "../isFunction";

it("should return true if param is Function", () => {
    const arr = [0, "", true, null, undefined, [], {}, new Map(), new Set()];
    arr.forEach(elem => {
        expect(isFunction(elem)).toBe(false);
    });
    expect(isFunction(() => { })).toBe(true);
    expect(isFunction(new Function())).toBe(true);
    expect(isFunction(function () { })).toBe(true);
});
