import addSeparator from "../addSeparator";

it("should return a new array with separator", () => {
    const arr = [true, 0, "", null, undefined, {}, function () { }, new Map(), new Set(), Symbol()];
    arr.forEach(elem => {
        expect(addSeparator(elem)).toEqual([]);
    });

    const arr1 = [0, 1, 2, 3];
    const rs1 = [0, "", 1, "", 2, "", 3];
    const rs2 = [0, "#", 1, "#", 2, "#", 3];
    expect(addSeparator(arr1)).toEqual(rs1);
    expect(addSeparator(arr1, "#")).toEqual(rs2);
    expect(addSeparator(arr1, "#", 5)).toEqual(arr1);
    expect(addSeparator(arr1, "#", null)).toEqual(arr1);
});
