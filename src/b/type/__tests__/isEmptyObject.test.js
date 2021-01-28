import isEmptyObject from "../isEmptyObject";

it("should return true if param is an empty Object or empty Array", () => {
    expect(isEmptyObject([])).toBe(true);
    expect(isEmptyObject([1])).toBe(false);
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ a: 1 })).toBe(false);
});
