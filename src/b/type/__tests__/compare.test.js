import compare from "../compare";

it("should return true if both param called by 'toString' method has same output, otherwise return false", () => {
    const arr = [true, 0, "", null, undefined, [], {}, function () { },new Map(), new Set()];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (i === j) {
                expect(compare(arr[i], arr[j])).toBe(true);
            } else {
                expect(compare(arr[i], arr[j])).toBe(false);
            }
        }
    }
});
