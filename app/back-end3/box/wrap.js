const errors = require("../../utils/errors");
const types = require("../../utils/types");

/**
 * Wraps a box with a frame of cells.
 * @param {import("../../utils/types").box} box
 * @param {import("../../utils/types").cell} cell
 * @param {import("../../utils/types").size} frameSize
 * @returns {import("../../utils/types").box} A new box which contains the old
 *  box wrapped in the frame
 */
exports.wrap = function (box, cell, frameSize) {
    if (!types.isNaturalOrZero(arguments.length)) {
        throw errors.createUnexpectedArgumentsVariableTypeError();
    } else if (arguments.length < 3) {
        throw errors.createTooLittleArgumentsError(arguments.length);
    } else if (arguments.length > 3) {
        throw errors.createTooManyArgumentsError(arguments.length);
    }

    if (!types.isBox(box)) {
        throw errors.createInvalidArgumentTypeError(box);
    }

    if (!types.isCell(cell)) {
        throw errors.createInvalidArgumentTypeError(cell);
    }

    if (!types.isNumber(frameSize)) {
        throw errors.createInvalidArgumentTypeError(frameSize);
    }

    const wrappedData = [];

    // Top wrap
    for (let i = 0; i < frameSize; ++i) {
        const row = [];
        for (let k = 0; k < box.width + 2 * frameSize; ++k) {
            row.push(cell);
        }
        wrappedData.push(row);
    }

    // Left and right wraps
    for (let i = 0; i < box.height; ++i) {
        let row = [];
        for (let k = 0; k < frameSize; ++k) {
            row.push(cell);
        }
        row = row.concat(box.data[i]);
        for (let k = 0; k < frameSize; ++k) {
            row.push(cell);
        }
        wrappedData.push(row);
    }

    // Bottom wrap
    for (let i = 0; i < frameSize; ++i) {
        const row = [];
        for (let k = 0; k < box.width + 2 * frameSize; ++k) {
            row.push(cell);
        }
        wrappedData.push(row);
    }

    return {
        data: wrappedData,
        width: wrappedData[0].length,
        height: wrappedData.length,
        wrap: function (cell, frameSize) {
            // Cannot be an arrow function since it is using the keyword "this"
            return module.exports.wrap(this, cell, frameSize);
        }
    };
};