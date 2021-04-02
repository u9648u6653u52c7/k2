import optimizeCb from "./optimizeCb";
import isArrayLike from "../type/isArrayLike";

export default function each(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    let length, i = 0;
    if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
            if (iteratee(obj[i], i, obj) === false) {
                break;
            }
        }
    } else {
        for (i in obj) {
            if (iteratee(obj[i], i, obj) === false) {
                break;
            }
        }
    }

    return obj;
}
