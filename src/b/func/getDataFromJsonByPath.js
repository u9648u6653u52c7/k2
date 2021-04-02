import each from "./each";
import hasOwn from "../var/hasOwn";
import { isNumber, isString, isArray, isObject, isEmptyObject } from "../type"

/**
 * validatePath
 * @param {any} value
 * @returns {Boolean}
 */
function validatePath(value) {
    if (isString(value) && value.length > 0) {
        return true;
    }

    if ((isArray(value) || isObject(value)) && !isEmptyObject(value)) {
        let flag = true;
        each(value, function (val, key, obj) {
            if (hasOwn.call(obj, key) && (!isString(val) || !val)) {
                return flag = false;
            }
        }); return flag;
    }

    return false;
}

/**
 * validateJson
 * @param {any} value
 * @returns {Boolean}
 */
function validateJson(value) {
    return (isArray(value) || isObject(value))
        && !isEmptyObject(value) ? true : false;
}

/**
 * bdc 构建数据结构
 * @param {Object} obj
 * @returns {Object}
 */
function bdc(result, separator) {
    const rs = {};

    each(result, function (val, key, obj) {
        if (!hasOwn.call(obj, key)) { return; }
        const list = key.split(separator);
        const len = list.length;
        let currRef = rs;
        each(list, function (field, i, arr) {
            if (i == len - 1) {
                currRef[field] = val;
            } else {
                if (field in currRef) { return currRef = currRef[field]; }
                const nextField = arr[i + 1];
                currRef = currRef[field] = isNumber(+nextField) ? [] : {};
            }
        });
    });

    return rs;
}

/**
 * calcExpr 兜底数据类型转换
 * @param {String} value
 * @returns {any}
 */
function calcExpr(value) {
    const type = value[0];
    const data = value.substr(1);
    if (type == "s") {
        return data;
    } else if (type == "n") {
        return +data;
    } else if (type == "b") {
        return !!+data;
    } else {
        return void (0);
    }
}

/**
 * 消费兜底数据
 * retValue
 * @param {String} key
 * @param {any} value
 * @param {Object} bmap
 * @returns {any}
 */
function retValue(key, value, bmap) {
    if (key in bmap) {
        return value == null
            || (isString(value) && value.length == 0)
            ? bmap[key] : value;
    } else {
        return value;
    }
}

/**
 * getDataFromJsonByPath
 * @param {String | String[] | {[key: String]: String}} path
 * @param {JSON} json
 * @param {String} separator
 * @param {String} descriptor
 * @returns {any}
 */
export default function getDataFromJsonByPath(path, json, separator, descriptor) {
    // 入参校验
    if (!validatePath(path)) { throw "Invalid Param: path"; }
    // 入参校验
    if (!validateJson(json)) { throw "Invalid Param: json"; }
    // path字符串类型标记
    let flag;
    // 字符串类型转换成数组类型，方便后续遍历
    path = isString(path) ? (flag = 1, [path]) : path;
    // 分隔符
    separator = isString(separator) ? separator : "/";
    // 兜底描述符
    descriptor = isString(descriptor) ? descriptor : ":";
    // 计算遍历深度、节点存储、兜底数据存储
    let depth = 0, map = {}, bmap = {}, rflag = false;
    each(path, function (val, key, obj) {
        if (!hasOwn.call(obj, key)) { return; }
        const arr = val.split(separator);
        const len = arr.length;
        depth = Math.max(depth, len);
        const lastIndex = len - 1;
        const lastElem = arr[lastIndex];
        const index = lastElem.indexOf(descriptor);
        if (index != -1) {
            arr[lastIndex] = lastElem.substr(0, index);
            const expr = lastElem.substr(index + 1);
            if (expr) { bmap[key] = calcExpr(expr); }
        }
        map[key] = arr;
        if (isObject(obj) && !rflag && key.indexOf(separator) != -1) { rflag = true; }
    });
    // 结果集
    const result = isArray(path) ? [] : {};
    // 节点遍历
    for (let i = 0; i < depth; i++) {
        each(map, function (arr, key, obj) {
            if (!hasOwn.call(obj, key)) { return; }
            const field = arr[i];
            const root = hasOwn.call(result, key) ? result[key] : json;
            if (field && root) {
                result[key] = retValue(key, root[field], bmap);
            }
        });
    }
    // 内存清理
    path = map = bmap = null;

    if (rflag) {
        return bdc(result, separator);
    } else {
        return flag ? result[0] : result;
    }
}
