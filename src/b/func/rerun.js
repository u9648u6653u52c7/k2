const noop = () => { };
const slice = [].slice;

/** PRD 生成个具有重试机制的方法
 * 重试策略最终由使用者决定；
 * 包装生成的方法必须能正常转发业务方法所需的参数，并给业务方法提供重新调用自己的能力；
 * 为重试提供次数限制，经过重试后，若最终结果是消极的，由用户进行相应的兜底处理；
 * 注意内存管理问题；
 *
 * const args = [].slice.call(arguments);
 * 需考虑多次调用的副作用，决策应对的方式；
 * const getUserData = rerun(()=>{}, ()=>{});
 * getUserData(1);
 * getUserData(2);
 * getUserData(3);
 * 只响应第一次调用、或者最后一次调用？还是怎么着呢？
 * 加入延迟执行的功能，防止触发防频风控。
 */


/**
 * rerun
 * @param {Function} func
 * @param {Function} polyfill
 * @param {Object} options
 * @returns {Function}
 */
function rerun(func, polyfill, options) {
    if (typeof func !== "function") {
        return noop;
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
                if (typeof polyfill === "function") {
                    const _args = slice.call(arguments);
                    polyfill.apply(ctx, _args);
                }
                func = polyfill = ctx = args = null;
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
