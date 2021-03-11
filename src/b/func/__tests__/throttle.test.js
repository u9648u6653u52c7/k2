import throttle from "../throttle";

describe("throttle", function () {
    beforeEach(() => {
        jest.useRealTimers();
    });

    test("throttle", function (done) {
        expect.assertions(2);
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = throttle(incr, 32);
        throttledIncr(); throttledIncr();

        expect(counter).toBe(1); // incr was called immediately
        setTimeout(function () {
            expect(counter).toBe(2); // incr was throttled
            done();
        }, 64);
    });

    test("throttle arguments", function (done) {
        expect.assertions(2);
        var value = 0;
        var update = function (val) { value = val; };
        var throttledUpdate = throttle(update, 32);
        throttledUpdate(1); throttledUpdate(2);
        setTimeout(function () { throttledUpdate(3); }, 64);
        expect(value).toBe(1); // updated to latest value
        setTimeout(function () {
            expect(value).toBe(3); // updated to latest value
            done();
        }, 104);
    });

    test("throttle once", function (done) {
        expect.assertions(2);
        var counter = 0;
        var incr = function () { return ++counter; };
        var throttledIncr = throttle(incr, 32);
        var result = throttledIncr();
        setTimeout(function () {
            expect(result).toBe(1); // throttled functions return their value
            expect(counter).toBe(1); // incr was called once
            done();
        }, 64);
    });

    test("throttle twice", function (done) {
        expect.assertions(1);
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = throttle(incr, 32);
        throttledIncr(); throttledIncr();
        setTimeout(function () {
            expect(counter).toBe(2);
            done();
        }, 64);
    });

    test("more throttling", function (done) {
        expect.assertions(3);
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = throttle(incr, 30);
        throttledIncr(); throttledIncr();
        expect(counter).toBe(1);
        setTimeout(function () {
            expect(counter).toBe(2);
            throttledIncr();
            expect(counter).toBe(3);
            done();
        }, 85);
    });

    test("throttle repeatedly with results", function (done) {
        expect.assertions(6);
        var counter = 0;
        var incr = function () { return ++counter; };
        var throttledIncr = throttle(incr, 100);
        var results = [];
        var saveResult = function () { results.push(throttledIncr()); };
        saveResult(); saveResult();
        setTimeout(saveResult, 50);
        setTimeout(saveResult, 150);
        setTimeout(saveResult, 160);
        setTimeout(saveResult, 230);
        setTimeout(function () {
            expect(results[0]).toBe(1); // incr was called once
            expect(results[1]).toBe(1); // incr was throttled
            expect(results[2]).toBe(1); // incr was throttled
            expect(results[3]).toBe(2); // incr was called twice
            expect(results[4]).toBe(2); // incr was throttled
            expect(results[5]).toBe(3); // incr was called trailing
            done();
        }, 304);
    });

    test("throttle triggers trailing call when invoked repeatedly", function (done) {
        expect.assertions(2);
        var counter = 0;
        var limit = 48;
        var incr = function () { counter++; };
        var throttledIncr = throttle(incr, 32);

        var stamp = new Date;
        while (new Date - stamp < limit) {
            throttledIncr();
        }
        var lastCount = counter;
        expect(counter > 1).toBeTruthy();

        setTimeout(function () {
            expect(counter > lastCount).toBeTruthy();
            done();
        }, 96);
    });

    test("throttle does not trigger leading call when leading is set to false", function (done) {
        expect.assertions(2);
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = throttle(incr, 60, { leading: false });

        throttledIncr(); throttledIncr();
        expect(counter).toBe(0);

        setTimeout(function () {
            expect(counter).toBe(1);
            done();
        }, 96);
    });

    test("more throttle does not trigger leading call when leading is set to false", function (done) {
        expect.assertions(3);
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = throttle(incr, 100, { leading: false });

        throttledIncr();
        setTimeout(throttledIncr, 50);
        setTimeout(throttledIncr, 60);
        setTimeout(throttledIncr, 200);
        expect(counter).toBe(0);

        setTimeout(function () {
            expect(counter).toBe(1);
        }, 250);

        setTimeout(function () {
            expect(counter).toBe(2);
            done();
        }, 350);
    });

    test("one more throttle with leading: false test", function (done) {
        expect.assertions(2);
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = throttle(incr, 100, { leading: false });

        var time = new Date;
        while (new Date - time < 350) throttledIncr();
        expect(counter <= 3).toBeTruthy();

        setTimeout(function () {
            expect(counter <= 4).toBeTruthy();
            done();
        }, 200);
    });

    test("throttle does not trigger trailing call when trailing is set to false", function (done) {
        expect.assertions(4);
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = throttle(incr, 60, { trailing: false });

        throttledIncr(); throttledIncr(); throttledIncr();
        expect(counter).toBe(1);


        setTimeout(function () {
            expect(counter).toBe(1);

            throttledIncr(); throttledIncr();
            expect(counter).toBe(2);

            setTimeout(function () {
                expect(counter).toBe(2);
                done();
            }, 96);
        }, 96);
    });

    test("throttle re-entrant", function (done) {
        expect.assertions(2);
        var sequence = [
            ["b1", "b2"],
            ["c1", "c2"]
        ];
        var value = "";
        var throttledAppend;
        var append = function (arg) {
            value += this + arg;
            var args = sequence.pop();
            if (args) {
                throttledAppend.call(args[0], args[1]);
            }
        };
        throttledAppend = throttle(append, 32);
        throttledAppend.call("a1", "a2");
        expect(value).toBe("a1a2");
        setTimeout(function () {
            expect(value).toBe("a1a2c1c2b1b2");
            done();
        }, 104);
    });

    test("throttle cancel", function (done) {
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = throttle(incr, 32);
        throttledIncr();
        throttledIncr.cancel();
        throttledIncr();
        throttledIncr();

        expect(counter).toBe(2);

        setTimeout(function () {
            expect(counter).toBe(3);
            done();
        }, 64);
    });

    test("throttle cancel with leading: false", function (done) {
        var counter = 0;
        var incr = function () { counter++; };
        var throttledIncr = throttle(incr, 32, { leading: false });
        throttledIncr();
        throttledIncr.cancel();

        expect(counter).toBe(0);
        setTimeout(function () {
            expect(counter).toBe(0);
            done();
        }, 64);
    });

});
