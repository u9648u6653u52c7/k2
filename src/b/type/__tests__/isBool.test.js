import isBool from "../isBool";

it("should return true if param is Boolean", () => {
    const arr = [0, "", null, undefined, {}, function () { }, new Map(), new Set()];
    arr.forEach(elem => {
        expect(isBool(elem)).toBe(false);
    });
    expect(isBool(true)).toBe(true);
    expect(isBool(false)).toBe(true);
});
