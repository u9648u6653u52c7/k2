import group from "../group";

it("should return a new array with separator", () => {
    const arr = [true, 0, "", null, undefined, {}, function () { }, new Map(), new Set(), Symbol()];
    arr.forEach(elem => {
        expect(group(elem)).toEqual([]);
    });

    const arr1 = [0, 1, 2, 3];
    const rs1 = [[0], [1], [2], [3]];
    const rs2 = [[0, 1], [2, 3]];
    const rs3 = [[0, 1, 2], [3]];
    const rs4 = [[0, 1, 2, 3]];

    expect(group(arr1, 1)).toEqual(rs1);
    expect(group(arr1, 2)).toEqual(rs2);
    expect(group(arr1)).toEqual(rs3);
    expect(group(arr1, 0)).toEqual(rs3);
    expect(group(arr1, 3)).toEqual(rs3);
    expect(group(arr1, 4)).toEqual(rs4);
});
