import { isArray } from "../type";
import getRandomInt from "../var/getRandomInt";

export default function (arr) {
    return isArray(arr)
        ? arr[getRandomInt(arr.length)]
        : null;
}
