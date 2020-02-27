const errors = require("../../utils/errors");
const types = require("../../utils/types");

/**
 * Creates a diagram box.
 * @param {import("../../utils/types").box} box
 * @param {import("../../utils/types").position} position
 * @returns {import("../../utils/types").diagramBox} The created diagram box
 */
exports.createDiagramBox = function (box, position) {
    if (!types.isNaturalOrZero(arguments.length)) {
        throw errors.createUnexpectedArgumentsVariableTypeError();
    } else if (arguments.length < 2) {
        throw errors.createTooLittleArgumentsError(arguments.length);
    } else if (arguments.length > 2) {
        throw errors.createTooManyArgumentsError(arguments.length);
    }

    if (!types.isBox(box)) {
        throw errors.createInvalidArgumentTypeError(box);
    }

    if (!types.isPosition(position)) {
        throw errors.createInvalidArgumentTypeError(position);
    }

    return {
        box: box,
        position: position
    };
}