/**
 * Base Queue
 * @class Queue
 */
class Queue {
    constructor() {
        this.store = [];
    }

    enqueue(elem) {
        this.store.push(elem);
    }

    dequeue() {
        return this.store.shift();
    }

    front() {
        return this.store[0];
    }

    back() {
        return this.store[this.store.length - 1];
    }

    toString() {
        return this.store;
    }

    isEmpty() {
        return this.store.length === 0;
    }
}

export default Queue;
