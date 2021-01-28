import toString from "../var/toString";

export default function (v, t) {
    return toString.call(v)
        === toString.call(t);
}
