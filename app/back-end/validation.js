function getType(x) {
    return Object.prototype.toString.call(x);
};

exports.types = {
    isObject: x => getType(x).includes("Object"),
    isArray: x => getType(x).includes("Array"),
    isNumber: x => getType(x).includes("Number"),
    isBoolean: x => getType(x).includes("Boolean"),
    isString: x => getType(x).includes("String")
};

exports.domain = {
    isSize: x =>
        (module.exports.types.isNumber(x)
            && Number.isFinite(x)
            && Number.isInteger(x)
            && Number.isNaN(x) === false
            && x >= 0),
    isProperChar: x => (module.exports.types.isString(x) && x.length === 1),
    isHorizontalBordersCharShift: x =>
        (x === "none" || x === "top" || x === "bottom")
}