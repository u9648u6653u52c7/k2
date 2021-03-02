import { isNumber, isArray, isFunction } from "../type";

export default function (list, separator = "", divisor = 1) {
    const arr = isArray(list) && list.length > 0 ? [].concat(list) : [];

    divisor = isNumber(divisor) ? Math.floor(divisor) : 0;

    if (arr.length < divisor || divisor <= 0) { return arr; }

    const rs = [];

    for (let i = 0, len = arr.length; i < len; i++) {
        const elem = arr[i];
        rs.push(elem);
        if (i + 1 != len && (i + 1) % divisor == 0) {
            rs.push(isFunction(separator) ? separator(elem, i) : separator);
        }
    }

    return rs;
}
