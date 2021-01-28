import getProto from "../var/getProto";
import hasOwn from "../var/hasOwn";
import fnToString from "../var/fnToString";
import ObjectFunctionString from "../var/ObjectFunctionString";
import isObject from "./isObject";

export default function (obj) {
    var proto, Ctor;

    if (!obj || !isObject(obj)) {
        return false;
    }

    proto = getProto(obj);

    if (!proto) {
        return true;
    }

    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
}
