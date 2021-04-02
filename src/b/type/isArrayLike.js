import isWindow from "./isWindow";
import isNumber from "./isNumber";
import isArray from "./isArray";
import isFunction from "./isFunction";

export default function (obj) {
    var length = !!obj && obj.length;

    if (isFunction(obj) || isWindow(obj)) {
        return false;
    }

    return isArray(obj) || length === 0 ||
        isNumber(length) && length > 0 && (length - 1) in obj;
}
