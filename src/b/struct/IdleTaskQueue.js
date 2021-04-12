import Queue from "./Queue";
import cancelIdleCallback from "../var/cancelIdleCallback";
import requestIdleCallback from "../var/requestIdleCallback";

/**
 * 空闲任务队列
 * @class IdleTaskQueue
 * @extends {Queue}
 */
class IdleTaskQueue extends Queue {
    constructor(options) {
        super();
        this.taskHandle = 0;
        this.options = Object.assign({ timeout: 1e3 }, options);
    }

    push(handler, data) {
        if (typeof handler === "function") {
            this.enqueue({ handler, data });
        }

        if (!this.taskHandle) {
            this.taskHandle = this.consume();
        }

        return this;
    }

    cancel() {
        const id = this.taskHandle;
        if (id) { cancelIdleCallback(id); }
    }

    consume() {
        const _this = this;

        if (_this.isEmpty()) { return 0; }

        return requestIdleCallback(function (deadline) {
            while (
                (deadline.timeRemaining() > 0 || deadline.didTimeout)
                && !_this.isEmpty()
            ) {
                const task = _this.dequeue();
                task.handler(task.data);
            }

            if (!_this.isEmpty()) {
                _this.taskHandle = _this.consume();
            } else {
                _this.taskHandle = 0;
            }
        }, _this.options);
    }
}

export default IdleTaskQueue;
