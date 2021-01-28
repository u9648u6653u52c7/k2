import isObject from "../isObject";

function Ctor(){}

it("should return true if param is Object", () => {
    const arr = [true, 0, "", null, undefined, function () { }, new Map(), new Set()];
    arr.forEach(elem => {
        expect(isObject(elem)).toBe(false);
    });
    expect(isObject({})).toBe(true);
    expect(isObject(new Ctor())).toBe(true);
});
