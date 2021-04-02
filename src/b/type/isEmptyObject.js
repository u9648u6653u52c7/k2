import isString from "./isString";
import isArray from "./isArray";
import isObject from "./isObject";
import hasOwn from "../var/hasOwn";

export default function (value) {
    if (value == null) { return true; }

    if (isString(value) || isArray(value)) {
        return value.length == 0;
    }

    if (isObject(value)) {
        for (const key in value) {
            if (hasOwn.call(value, key)) {
                return false;
            }
        }
    }

    return true;
}
