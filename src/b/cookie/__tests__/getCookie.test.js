import setCookie from "../setCookie";
import getCookie from "../getCookie";
import removeCookie from "../removeCookie";

const arr = [
    ["cookie1"],
    ["cookie2", "hello world"],
    ["cookie3", "hello hell", "1"],
    ["cookie4", "hello heaven", "2", "/"],
];

beforeAll(() => {
    arr.forEach(elem => {
        setCookie.apply(null, elem)
    });
});

afterAll(() => {
    arr.forEach(elem => {
        removeCookie(elem[0]);
    });
});

it("should return the given name cookie's value, if the value is empty will return null", () => {
    arr.forEach(elem => {
        const name = elem[0];
        const value = elem[1] + "";
        expect(getCookie(name)).toBe(value);
    });
    expect(getCookie("cookie1")).toBe("undefined");
    expect(getCookie()).toBeNull();
    expect(getCookie([])).toBeNull();
    expect(getCookie({})).toBeNull();
    expect(getCookie("cookie5")).toBeNull();
});
