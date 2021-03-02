import getCookie from "./getCookie";

/**
 * removeCookie
 * @param {String} name
 * @param {String} path
 * @param {String} domain
 * @returns {Boolean}
 */
export default function (name, path, domain) {
    if (getCookie(name) != null) {
        document.cookie = encodeURIComponent(name) +
            "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
            (domain ? "; domain=" + domain : "") +
            (path ? "; path=" + path : "");
    }

    return true;
}
