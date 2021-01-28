import isArray from "../type/isArray";

export default function (arr) {
    return isArray(arr)
        ? arr.sort(() => Math.random() - 0.5)
        : arr;
}
