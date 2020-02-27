exports.createUnexpectedArgumentsVariableTypeError = () =>
    new Error(`The variable "arguments" is of different type than expected`);

/**
 * @param {import("./types").size} argumentsCount
 */
exports.createTooLittleArgumentsError = (argumentsCount) =>
    new Error(`Too little arguments: ${argumentsCount}`);

/**
 * @param {import("./types").size} argumentsCount
 */
exports.createTooManyArgumentsError = (argumentsCount) =>
    new Error(`Too many arguments: ${argumentsCount}`);

/**
 * @param {any} argument
 */
exports.createInvalidArgumentTypeError = (argument) =>
    new TypeError(`Invalid argument's type: ${argument}`);

/**
 * @param {any} x
 */
exports.createNotANumberError = (x) =>
    new Error(`Not an number: ${x}`);

/**
 * @param {string} argument
 */
exports.createInvalidParamNameError = (argument) =>
    new Error(`The argument is not a name of any valid parameter: ${argument}`);

/**
 * @param {string} paramName
 * @param {number} expectedCount
 * @param {number} receivedCount
 */
exports.createInvalidNumberOfParamValuesError = (
    paramName, expectedCount, receivedCount
) =>
    new Error(`The number of arguments representing the values of `
        + `the parameter ${paramName} is invalid: ${receivedCount} `
        + `instead of ${expectedCount}`);

/**
 * @param {string} paramName
 * @param {any} value
 */
exports.createInvalidParamValueError = (paramName, value) =>
    new Error(`The argument does not represent a valid `
        + `value of the parameter ${paramName}: ${value}`);

/**
 * @param {string} paramName
 */
exports.createRequiredParamNotProvidedError = (paramName) =>
    new Error(`A required parameter is not represented by any argument:`
        + ` ${paramName}`);