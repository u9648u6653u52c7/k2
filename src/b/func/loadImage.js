import now from "../var/now";

/**
 * loadImage
 * @param {String} url
 * @param {Function} callback 
 * @param {Number} timeout
 */
export default function loadImage(url, callback, timeout) {
    let img = new Image();
    let eventType;
    let timeoutID;

    img.onload = img.onerror = function (event) {
        eventType = event.type == "load" ? "load" : "error";
        if (timeoutID) { clearTimeout(timeoutID); }
        if (typeof callback == "function") { callback(eventType); }
        img = img.onload = img.onerror = null;
    };

    img.src = url;
    // 超时开关逻辑
    if (typeof timeout != "number") { return; }
    // 兜底处理
    const previous = now();
    (function tick() {
        if (eventType == null && (now() - previous >= timeout)) {
            if (typeof callback == "function") { callback("timeout"); }
            return img = img.onload = img.onerror = null;
        }
        timeoutID = setTimeout(tick, timeout / 3);
    })();
}
