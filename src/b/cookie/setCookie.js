/**
 * setCookie
 * @param {String} name
 * @param {String} value
 * @param {String|Number|Date} expiredays
 * 字符串型表示天数 数字型表示秒数 日期型表示日期对象
 * @param {String} path
 * @param {String} domain
 * @param {Boolean} secure
 * @return {Boolean}
 */

const rkeywords = /^(?:expires|max-age|path|domain|secure)$/i;

export default function (name, value, expiredays, path, domain, secure) {
    if (!name || rkeywords.test(name)) { return false; }

    let today = new Date(), expires = "";
    if (expiredays) {
        switch (expiredays.constructor) {
            case Number:
                expires = expiredays === Infinity
                    ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
                    : "; max-age=" + expiredays;
                break;
            case String:
                today.setDate(today.getDate() + expiredays * 1);
                expires = "; expires=" + today.toUTCString();
                break;
            case Date:
                expires = "; expires=" + expiredays.toUTCString();
                break;
        }
    }

    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) +
        expires +
        (domain ? "; domain=" + domain : "") +
        (path ? "; path=" + path : "") +
        (secure ? "; secure" : "");

    return true;
}
