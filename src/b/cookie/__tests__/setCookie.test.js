import setCookie from "../setCookie";
import getCookie from "../getCookie";
import removeCookie from "../removeCookie";

const arr = [
    ["cookie1"],
    ["cookie2", "hello world"],
    ["cookie3", "hello hell", "1"],
    ["cookie4", "hello heaven", "2", "/"],
];

it("will set the given name cookie's value with options", () => {
    arr.forEach(elem => {
        const name = elem[0];
        expect(getCookie(name)).toBeNull();
    });

    arr.forEach(elem => {
        setCookie.apply(null, elem)
    });

    arr.forEach(elem => {
        const name = elem[0];
        const value = elem[1] + "";
        expect(getCookie(name)).toBe(value);
    });

    arr.forEach(elem => {
        removeCookie(elem[0]);
    });

    arr.forEach(elem => {
        const name = elem[0];
        expect(getCookie(name)).toBeNull();
    });
});
