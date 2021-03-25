import toString from "../var/toString";
import hasOwn from "../var/hasOwn";

/**
 * format
 * @param {Date} date
 * @param {String} fmt
 * @param {String} fill
 * @returns {String}
 */
export default function format(date, fmt = "MM/dd hh:mm:ss", fill = "0") {
    date = toString.call(date) === "[object Date]" ? date : new Date();
    // 对象的key是正则定义
    const rmap = {
        "y+": date.getFullYear(),
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    };

    for (const key in rmap) {
        if (!hasOwn.call(rmap, key)) { continue; }
        const re = (new RegExp("(" + key + ")")).exec(fmt);
        if (re) {
            const rlength = re[1].length;
            const value = rmap[key] + "";
            const replaceValue = value.length >= rlength
                ? value
                : ((new Array(rlength + 1)).join(fill) + value).substr(-rlength);
            fmt = fmt.replace(re[1], replaceValue);
        }
    }

    return fmt;
}
