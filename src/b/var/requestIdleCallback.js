import now from "./now";

export default window.requestIdleCallback || function (handler) {
    const startTime = now();
    return setTimeout(function () {
        handler({
            didTimeout: false,
            timeRemaining: function () {
                return Math.max(0, 50.0 - (now() - startTime));
            }
        });
    }, 1);
}
