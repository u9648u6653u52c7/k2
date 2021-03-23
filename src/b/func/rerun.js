import slice from "../var/slice";
import isFunction from "../type/isFunction";

/**
 * rerun
 * @param {Function} func
 * @param {Function} polyfill
 * @param {Object} options
 * @returns {Function}
 */
function rerun(func, polyfill, options) {
    if (!isFunction(func)) {
        return () => { };
    }

    if (!isFunction(polyfill)) {
        options = polyfill;
    }

    const cfg = Object.assign({
        n: 2, // 重试次数
        delay: 500, // 延迟时间
        async: true, // 是否启用异步机制重新调用
    }, options);

    return function () {
        let ctx = this;
        let args = slice.call(arguments);
        let acc = 0; // 调用次数累加器
        let overflow; // 是否超过最大重试次数
        args.push(run); // 为业务方法提供自执行能力

        function run() {
            if (overflow) {
                if (isFunction(polyfill)) {
                    const _args = slice.call(arguments);
                    polyfill.apply(ctx, _args);
                }
                ctx = args = run = null;
            } else {
                overflow = ++acc > cfg.n ? true : false;
                if (acc > 1 && cfg.async) {
                    setTimeout(() => {
                        func.apply(ctx, args);
                    }, cfg.delay);
                } else {
                    func.apply(ctx, args);
                }
            }
        } run();
    };
}

export default rerun;
