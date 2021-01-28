export default function (val) {
    var name;
    for (name in val) { return false; }
    return true;
}
