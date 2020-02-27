const errors = require("../../utils/errors");
const types = require("../../utils/types");

/**
 * Creates a position.
 * @param {import("../../utils/types").coordinate} x
 * @param {import("../../utils/types").coordinate} y
 * @returns {import("../../utils/types").position} The created position
 */
exports.createPosition = function (x, y) {
    if (!types.isNaturalOrZero(arguments.length)) {
        throw errors.createUnexpectedArgumentsVariableTypeError();
    } else if (arguments.length < 2) {
        throw errors.createTooLittleArgumentsError(arguments.length);
    } else if (arguments.length > 2) {
        throw errors.createTooManyArgumentsError(arguments.length);
    }

    if (!types.isCoordinate(x)) {
        throw errors.createInvalidArgumentTypeError(x);
    }

    if (!types.isCoordinate(y)) {
        throw errors.createInvalidArgumentTypeError(y);
    }

    return {
        x: x,
        y: y
    };
}