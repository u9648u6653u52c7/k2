import { isNumber, isArray } from "../type";

export default function (arr, size) {
    if (!isArray(arr)) { return []; }

    size = isNumber(size) && size >= 1 ? size : 3;

    const len = arr.length;

    if (len <= size) { return [arr]; }

    const rs = [];

    for (let i = 0; i < len; i += size) {
        rs.push(arr.slice(i, i + size));
    }

    return rs;
}
