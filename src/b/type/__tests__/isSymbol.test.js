import isSymbol from "../isSymbol";

function Ctor() { }

it("should return true if param is a pure object", () => {
    const arr = [true, 0, "", null, undefined, [], {}, function () { }, new Map(), new Set(), new Ctor()];
    arr.forEach(elem => {
        expect(isSymbol(elem)).toBe(false);
    });
    expect(isSymbol(Symbol())).toBe(true);
});
