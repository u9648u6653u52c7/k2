import disorder from "../disorder";

it("should return an disorderly list if param is an array, otherwise return it as it is", () => {
    const arr = [true, 0, "", null, undefined, {}, function () { }, new Map(), new Set(), Symbol()];
    arr.forEach(elem => {
        expect(disorder(elem)).toBe(elem);
    });

    const arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const str = arr1.join("");
    expect(disorder(arr1).join("")).not.toBe(str);
});
