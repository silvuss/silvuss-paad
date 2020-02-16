function getType(x) {
    return Object.prototype.toString.call(x);
};

exports.isObject = (x) => getType(x).includes("Object");

exports.isArray = (x) => getType(x).includes("Array");

exports.isNumber = (x) => getType(x).includes("Number");

exports.isBoolean = (x) => getType(x).includes("Boolean");

exports.isString = (x) => getType(x).includes("String");

exports.isFunction = (x) => getType(x).includes("Function");

exports.isSize = (x) =>
    (module.exports.isNumber(x)
        && Number.isFinite(x)
        && Number.isInteger(x)
        && Number.isNaN(x) === false
        && x >= 0);

exports.isProperChar = (x) => (module.exports.isString(x) && x.length === 1);

exports.isHorizontalBordersCharShift = (x) =>
    (x === "none" || x === "top" || x === "bottom");