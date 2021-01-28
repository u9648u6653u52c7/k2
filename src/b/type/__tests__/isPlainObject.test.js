import isPlainObject from "../isPlainObject";

function Ctor() { }

it("should return true if param is a pure object", () => {
    const arr = [true, 0, "", null, undefined, function () { }, new Map(), new Set(), new Ctor()];
    arr.forEach(elem => {
        expect(isPlainObject(elem)).toBe(false);
    });
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(new Object())).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
});
