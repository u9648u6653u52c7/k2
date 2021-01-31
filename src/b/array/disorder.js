import { isArray } from "../type";

export default function (arr) {
    return isArray(arr)
        ? arr.sort(() => Math.random() - 0.5)
        : arr;
}
