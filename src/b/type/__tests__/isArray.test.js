import isArray from "../isArray";

it("should return true if param is Array", () => {
    const arr = [true, 0, "", null, undefined, {}, function () { }, new Map(), new Set()];
    arr.forEach(elem=>{
        expect(isArray(elem)).toBe(false);
    });
    expect(isArray([])).toBe(true);
});
