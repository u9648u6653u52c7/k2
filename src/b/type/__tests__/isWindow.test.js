import isWindow from "../isWindow";

it("should return true if param is Window", () => {
    const arr = ["window", true, NaN, 1, null, undefined, [], {}, function () { }, new Map(), new Set()];
    arr.forEach(elem => {
        expect(isWindow(elem)).toBe(false);
    });
    expect(isWindow(window)).toBe(true);
});
