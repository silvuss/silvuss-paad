const errors = require("../../utils/errors");
const types = require("../../utils/types");
const traverse = require("./traverse").traverse;
const createPosition = require("../position/create-position").createPosition;
const createDiagramBox
    = require("../diagram/create-diagram-box").createDiagramBox;

/**
 * @callback createBoxCallback
 * @param {string} content
 */

/**
 * Creates a diagram.
 * @param {import("../../utils/types").diagramConfig} diagramConfig
 * @param {string[]} contents
 * @param {createBoxCallback} createBoxCallback
 * @returns {import("../../utils/types").diagram} The created diagram
 */
exports.createDiagram = function (diagramConfig, contents, createBoxCallback) {
    if (!types.isNaturalOrZero(arguments.length)) {
        throw errors.createUnexpectedArgumentsVariableTypeError();
    } else if (arguments.length < 3) {
        throw errors.createTooLittleArgumentsError(arguments.length);
    } else if (arguments.length > 3) {
        throw errors.createTooManyArgumentsError(arguments.length);
    }

    if (!types.isDiagramConfig(diagramConfig)) {
        throw errors.createInvalidArgumentTypeError(diagramConfig);
    }

    if (!Array.isArray(contents) || !contents.every((c) => types.isString(c))) {
        throw errors.createInvalidArgumentTypeError(contents);
    }

    if (!types.isFunction(createBoxCallback)) {
        throw errors.createInvalidArgumentTypeError(createBoxCallback);
    }

    const boxes = contents.map((c) => createBoxCallback(c));

    /**
     * @type {import("../../utils/types").diagramBox[]}
     */
    const diagramBoxes = [];

    for (let b of boxes) {
        const lastDiagramBox = diagramBoxes[diagramBoxes.length - 1];

        const startPosition = {
            x: 0,
            y: lastDiagramBox === undefined
                ? 0
                : lastDiagramBox.position.y
        };

        /**
         * @param {import("../../utils/types").position} position
         */
        const isPositionForbidden = (position) =>
            position.x < 0
            || diagramConfig.boxesSeparator.vertical.size + position.y < 0
            || diagramConfig.boxesSeparator.horizontal.size + position.x
            >= diagramConfig.width;

        /**
         * @param {import("../../utils/types").position} position
         */
        const isTargetPosition = (position) =>
            (lastDiagramBox === undefined)
                ? position.x + b.width <= diagramConfig.width
                : position.x + b.width <= diagramConfig.width
                && ((position.x >= lastDiagramBox.position.x
                    + lastDiagramBox.box.width
                    + diagramConfig.boxesSeparator.horizontal.size
                    && position.y === lastDiagramBox.position.y)
                    || (position.x === 0
                        && position.y >= lastDiagramBox.position.y
                        + lastDiagramBox.box.height
                        + diagramConfig.boxesSeparator.vertical.size));

        const moves = [
            {
                base: {
                    id: 0,
                    /**
                     * @param {import("../../utils/types").position} position
                     */
                    perform: (position) =>
                        createPosition(position.x + 1, position.y)
                },
                steppingBackMoveID: 2
            },
            {
                base: {
                    id: 2,
                    /**
                     * @param {import("../../utils/types").position} position
                     */
                    perform: (position) =>
                        createPosition(position.x - 1, position.y)

                },
                steppingBackMoveID: 0
            },
            {
                base: {
                    id: 3,
                    /**
                     * @param {import("../../utils/types").position} position
                     */
                    perform: (position) =>
                        createPosition(position.x, position.y - 1)

                },
                steppingBackMoveID: 1
            },
            {
                base: {
                    id: 1,
                    /**
                     * @param {import("../../utils/types").position} position
                     */
                    perform: (position) =>
                        createPosition(position.x, position.y + 1)
                },
                steppingBackMoveID: 3
            }
        ];

        const positions
            = traverse(
                startPosition, moves, isTargetPosition, isPositionForbidden
            );

        /**
         * @todo Decide if you have something to do here (or elsewhere)
         *  in case the array "positions" is empty
         */
        diagramBoxes.push(createDiagramBox(b, positions[positions.length - 1]));
    }

    const diagramVerticalStart = 0;
    const diagramVerticalEnd = ((diagramBoxes) => {
        const boxWithLowestBottomEdge
            = diagramBoxes.reduce((a, b) =>
                (a.box.height + a.position.y
                    > b.box.height + b.position.y)
                    ? a
                    : b
            );
        return boxWithLowestBottomEdge.box.height
            + boxWithLowestBottomEdge.position.y;
    })(diagramBoxes);
    const diagramHorizontalStart = 0;
    const diagramHorizontalEnd = diagramConfig.width

    return {
        toString: () => {
            let result = "";

            for (let i = diagramVerticalStart; i < diagramVerticalEnd; ++i) {
                for (let k = diagramHorizontalStart;
                    k < diagramHorizontalEnd;
                    ++k) {
                    const diagramBoxCell = (() => {
                        for (let b of diagramBoxes) {
                            for (let rowIndex = 0;
                                rowIndex < b.box.height;
                                ++rowIndex) {
                                for (let colIndex = 0;
                                    colIndex < b.box.width;
                                    ++colIndex) {
                                    if (rowIndex + b.position.y === i
                                        && colIndex + b.position.x === k) {
                                        return b.box.data[rowIndex][colIndex];
                                    }
                                }
                            }
                        }
                        return undefined;
                    })();

                    if (diagramBoxCell !== undefined) {
                        result = result.concat(diagramBoxCell.content);
                    } else {
                        result = result.concat(diagramConfig.fillChar);
                    }
                }
                result = result.concat("\n");
            }

            return result;
        }
    };
};