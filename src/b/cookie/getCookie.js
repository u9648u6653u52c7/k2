/**
 * getCookie
 * @param {String} name
 * @returns {String|null}
 */
export default function (name) {
    return decodeURIComponent(
        document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
            encodeURIComponent(name).replace(/[-.+*]/g, "\\$&") +
            "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")
    ) || null;
}
