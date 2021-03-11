import debounce from "../debounce";

describe("debounce", () => {
    beforeEach(() => {
        jest.useRealTimers();
    });

    test("debounce", function (done) {
        expect.assertions(1);
        var counter = 0;
        var incr = function () { counter++; };
        var debouncedIncr = debounce(incr, 32);
        debouncedIncr(); debouncedIncr();
        setTimeout(debouncedIncr, 16);
        setTimeout(function () {
            expect(counter).toBe(1);
            done();
        }, 96);
    });

    test("debounce cancel", function (done) {
        expect.assertions(1);
        var counter = 0;
        var incr = function () { counter++; };
        var debouncedIncr = debounce(incr, 32);
        debouncedIncr();
        debouncedIncr.cancel();
        setTimeout(function () {
            expect(counter).toBe(0);
            done();
        }, 96);
    });

    test("debounce asap", function (done) {
        expect.assertions(6);
        var a, b, c;
        var counter = 0;
        var incr = function () { return ++counter; };
        var debouncedIncr = debounce(incr, 64, true);
        a = debouncedIncr();
        b = debouncedIncr();
        expect(a).toBe(1);
        expect(b).toBe(1);
        expect(counter).toBe(1);

        setTimeout(debouncedIncr, 16);
        setTimeout(debouncedIncr, 32);
        setTimeout(function () {
            debouncedIncr();
            setTimeout(finish, 80);
        }, 48);

        var finish = function () {
            expect(counter).toBe(1);
            c = debouncedIncr();
            expect(c).toBe(2);
            expect(counter).toBe(2);
            done();
        };
    });

    test("debounce asap cancel", function (done) {
        expect.assertions(4);
        var a, b;
        var counter = 0;
        var incr = function () { return ++counter; };
        var debouncedIncr = debounce(incr, 64, true);
        a = debouncedIncr();
        debouncedIncr.cancel();
        b = debouncedIncr();
        expect(a).toBe(1);
        expect(b).toBe(2);
        expect(counter).toBe(2);
        setTimeout(debouncedIncr, 16);
        setTimeout(debouncedIncr, 32);
        setTimeout(debouncedIncr, 48);
        setTimeout(function () {
            expect(counter).toBe(2);
            done();
        }, 128);
    });

    test("debounce asap recursively", function (done) {
        expect.assertions(2);
        var counter = 0;
        var debouncedIncr = debounce(function () {
            counter++;
            if (counter < 10) debouncedIncr();
        }, 32, true);
        debouncedIncr();
        expect(counter).toBe(1);
        setTimeout(function () {
            expect(counter).toBe(1);
            done();
        }, 96);
    });

    test("debounce re-entrant", function (done) {
        expect.assertions(2);
        var sequence = [
            ["b1", "b2"]
        ];
        var value = "";
        var debouncedAppend;
        var append = function (arg) {
            value += this + arg;
            var args = sequence.pop();
            if (args) {
                debouncedAppend.call(args[0], args[1]);
            }
        };
        debouncedAppend = debounce(append, 32);
        debouncedAppend.call("a1", "a2");
        expect(value).toBe("");

        setTimeout(function () {
            expect(value).toBe("a1a2b1b2");
            done();
        }, 100);
    });
});
