const errors = require("../../utils/errors");
const types = require("../../utils/types");
const createCell = require("../cell/create-cell").createCell;
const wrap = require("./wrap").wrap;

/**
 * Creates a box.
 * @param {import("../../utils/types").boxConfig} boxConfig
 * @param {string} content
 * @returns {import("../../utils/types").box} The created box
 */
exports.createBox = function (boxConfig, content = "") {
    if (!types.isNaturalOrZero(arguments.length)) {
        throw errors.createUnexpectedArgumentsVariableTypeError();
    } else if (arguments.length < 2) {
        throw errors.createTooLittleArgumentsError(arguments.length);
    } else if (arguments.length > 2) {
        throw errors.createTooManyArgumentsError(arguments.length);
    }

    if (!types.isBoxConfig(boxConfig)) {
        throw errors.createInvalidArgumentTypeError(boxConfig);
    } else {
        if (!types.isString(content)) {
            throw errors.createInvalidArgumentTypeError(content);
        }
    }

    const nominalInnerWidth
        = (boxConfig.innerWidth === undefined)
            ? content.length
            : boxConfig.innerWidth;

    const actualInnerWidth = nominalInnerWidth;

    const nominalMinInnerHeight
        = (boxConfig.innerHeights.min === undefined)
            ? Math.ceil(content.length / actualInnerWidth)
            : boxConfig.innerHeights.min;

    const nominalMaxInnerHeight
        = (boxConfig.innerHeights.max === undefined)
            ? Math.ceil(content.length / actualInnerWidth)
            : boxConfig.innerHeights.max;

    const nominalMinCapacity
        = nominalMinInnerHeight * actualInnerWidth;
    const nominalMaxCapacity
        = nominalMaxInnerHeight * actualInnerWidth;

    const overflow = (nominalMaxCapacity < content.length);
    const underflow = (nominalMinCapacity > content.length);

    if (overflow === true
        && (content.length < boxConfig.overflowIndicator.length
            || nominalMaxCapacity < boxConfig.overflowIndicator.length)) {
        throw new Error(`The given overflow signal string is too big to fit: `
            + `${boxConfig.overflowIndicator}`);
    }

    const actualContent
        = (overflow === true)
            ? content.slice(
                0,
                nominalMaxCapacity - boxConfig.overflowIndicator.length
            )
            + boxConfig.overflowIndicator
            : content;

    const actualInnerHeight
        = (overflow === true)
            ? nominalMaxInnerHeight
            : (underflow === true)
                ? nominalMinInnerHeight
                : Math.ceil(actualContent.length / actualInnerWidth);

    const contentHeight
        = (overflow === true)
            ? actualInnerHeight
            : Math.ceil(actualContent.length / actualInnerWidth);

    const remainderHeight =
        (underflow === true)
            ? actualInnerHeight
            - Math.ceil(actualContent.length / actualInnerWidth)
            : 0;

    const lastRowContentLength
        = actualContent.length - ((contentHeight - 1) * actualInnerWidth);
    const lastRowRemainderLength = actualInnerWidth - lastRowContentLength;

    /**
     * @type {import("../../utils/types").cell[][]}
     */
    const data = [];

    // Content without its last line
    for (let rowIndex = 0; rowIndex < contentHeight - 1; ++rowIndex) {
        const row = [];
        for (let colIndex = 0; colIndex < actualInnerWidth; ++colIndex) {
            row.push(
                createCell(
                    actualContent[rowIndex * actualInnerWidth + colIndex]
                )
            );
        }
        data.push(row);
    }

    // Content's last line
    const lastRow = [];
    for (let colIndex = 0; colIndex < lastRowContentLength; ++colIndex) {
        lastRow.push(
            createCell(
                actualContent === ""
                    ? ""
                    : actualContent
                    [actualContent.length - lastRowContentLength + colIndex]
            )
        );
    }
    for (let colIndex = 0; colIndex < lastRowRemainderLength; ++colIndex) {
        lastRow.push(createCell(boxConfig.fillChar));
    }
    data.push(lastRow);

    // Remainder
    for (let rowIndex = 0; rowIndex < remainderHeight; ++rowIndex) {
        const row = [];
        for (let colIndex = 0; colIndex < actualInnerWidth; ++colIndex) {
            row.push(createCell(boxConfig.fillChar));
        }
        data.push(row);
    }

    return {
        data: data,
        width: data[0].length,
        height: data.length,
        wrap: function (cell, frameSize) {
            // Cannot be an arrow function since it is using the keyword "this"
            return wrap(this, cell, frameSize);
        }
    };
};