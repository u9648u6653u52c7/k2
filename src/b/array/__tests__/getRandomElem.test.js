import getRandomElem from "../getRandomElem";

// TODO 测试用例待完善
it("should return a random element from the array, if the param is not an array will return null", () => {
    const arr = [true, 0, "", null, undefined, {}, function () { }, new Map(), new Set(), Symbol()];
    arr.forEach(elem => {
        expect(getRandomElem(elem)).toBeNull();
    });

    const arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(arr1).toEqual(expect.arrayContaining([getRandomElem(arr1)]));
});
