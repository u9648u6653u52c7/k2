import each from "./each";
import hasOwn from "../var/hasOwn";
import { isNumber, isString, isArray, isObject, isEmptyObject } from "../type";

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
 * getSepaReg 生成分隔符正则表达式来消除字符串前后的分隔符
 * @param {String} separator
 * @returns {RegExp}
 */
function getSepaReg(separator) {
    separator = isString(separator) ? separator : "/";
    return new RegExp([
        "^",
        separator,
        "*|",
        separator,
        "*$"
    ].join(""), "g");
}

const rslash = getSepaReg();

const rcouple = /\[(.+)=(.*)\]/;

// 不可读字符串用作赋值操作
const unreadableString = "_U2FsdGVkX1+4v9t9TNZfxigZNIFfJW408NwfbVGD8sQ=";

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
    // 分隔符和生成分隔符正则表达式来消除字符串前后的分隔符
    let rsepa;
    separator = isString(separator)
        ? (rsepa = separator == "/" ? rslash : getSepaReg(separator), separator)
        : (rsepa = rslash, "/");
    // 兜底描述符
    descriptor = isString(descriptor) ? descriptor : ":";
    // 遍历深度、遍历节点存储、兜底数据存储、是否重建数据结构标识
    let depth = 0, map = {}, bmap = {}, rflag = false;
    each(path, function (val, key, obj) {
        // key值优化
        key = isObject(obj) ? key.replace(rsepa, "") : key;
        // 兜底数据描述符位置
        const index = val.indexOf(descriptor);
        // 兜底数据及数据查询路径处理
        if (index != -1) {
            const expr = val.substring(index + 1);
            if (expr) { bmap[key] = calcExpr(expr); }
            val = val.substring(0, index).replace(rsepa, "");
            val = val ? val : unreadableString;
        } else {
            val = val.replace(rsepa, "");
            if (!val) { return; }
        }
        const arr = val.split(separator);
        // 遍历深度计算
        depth = Math.max(depth, arr.length);
        // 遍历节点存储
        map[key] = arr;
        // 是否重建数据结构标识计算
        if (isObject(obj)
            && !rflag
            && key.indexOf(separator) != -1
        ) { rflag = true; }
    });
    // 模糊路径集、结果集
    let pmap = {};
    const result = isArray(path) ? [] : {};
    // 节点遍历
    for (let i = 0; i < depth; i++) {
        each(map, function (arr, key, obj) {
            if (hasOwn.call(pmap, key)) { return; }
            const field = arr[i];
            const root = hasOwn.call(result, key) ? result[key] : json;
            if (field && root) {
                if (rcouple.test(field)) {
                    pmap[key] = { json: root, couple: field };
                    delete result[key];
                } else {
                    result[key] = retValue(key, root[field], bmap);
                }
            }
        });
    }

    if (!isEmptyObject(pmap)) {
        each(pmap, function (v, k) {
            const json = v.json;
            if (!validateJson(json)) { return; }
            const field = v.couple;
            const couple = field.match(rcouple);
            const key = couple[1];
            const rval = new RegExp(couple[2]);
            const paths = [];
            each(json, function (el, i) {
                if (el && rval.test(el[key])) {
                    const str = path[k];
                    paths.push(i + str.substring(
                        str.indexOf(field) + field.length
                    ));
                }
            });

            if (paths.length > 0) {
                const arr = getDataFromJsonByPath(paths, json, separator, descriptor);
                result[k] = arr.length > 1 ? arr : arr[0];
            }
        });
    }
    // 内存清理
    path = map = bmap = pmap = null;

    if (rflag) {
        return bdc(result, separator);
    } else {
        return flag ? result[0] : result;
    }
}
