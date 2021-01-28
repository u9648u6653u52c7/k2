export default function (val) {
    return !isNaN(val)
        && typeof val === "number";
}
