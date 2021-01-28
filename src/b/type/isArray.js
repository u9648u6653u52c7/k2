import arr from "../var/arr";
import compare from "./compare";
import isFunction from "./isFunction";

const isArray = isFunction(arr.isArray)
    ? arr.isArray
    : val => compare(val, arr);

export default isArray;
