const errors = require("../../utils/errors");
const types = require("../../utils/types");

/**
 * Creates a cell.
 * @param {string} content
 * @returns {import("../../utils/types").cell} The created cell
 */
exports.createCell = function (content) {
    if (!types.isNaturalOrZero(arguments.length)) {
        throw errors.createUnexpectedArgumentsVariableTypeError();
    } else if (arguments.length < 1) {
        throw errors.createTooLittleArgumentsError(arguments.length);
    } else if (arguments.length > 1) {
        throw errors.createTooManyArgumentsError(arguments.length);
    }

    if (!types.isString(content)) {
        throw errors.createInvalidArgumentTypeError(content);
    }

    return {
        content: content
    };
};