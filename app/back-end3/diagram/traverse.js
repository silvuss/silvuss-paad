const errors = require("../../utils/errors");
const types = require("../../utils/types");

/**
 * @callback isPositionForbiddenCallback
 * @param {import("../../utils/types").position} position
 * 
 * @callback isTargetPositionCallback
 * @param {import("../../utils/types").position} position
 */

/**
 * Traverses an abstract list of positions until it finds the one specified
 * @param {import("../../utils/types").position} startPosition
 * @param {import("../../utils/types").move[]} moves
 * @param {isTargetPositionCallback} isTargetPositionCallback
 * @param {isPositionForbiddenCallback} isPositionForbiddenCallback
 * @returns {import("../../utils/types").position[]} In case there has
 *  been found a path from the start position to the target position,
 *  an array of positions constituting this path; otherwise, an empty array
 */
exports.traverse = function (
    startPosition,
    moves,
    isTargetPositionCallback,
    isPositionForbiddenCallback = (position) => false
) {
    if (!types.isNaturalOrZero(arguments.length)) {
        throw errors.createUnexpectedArgumentsVariableTypeError();
    } else if (arguments.length < 3) {
        throw errors.createTooLittleArgumentsError(arguments.length);
    } else if (arguments.length > 4) {
        throw errors.createTooManyArgumentsError(arguments.length);
    }

    if (!types.isPosition(startPosition)) {
        throw errors.createInvalidArgumentTypeError(startPosition);
    }

    if (!types.isFunction(isPositionForbiddenCallback)) {
        throw errors
            .createInvalidArgumentTypeError(isPositionForbiddenCallback);
    }

    if (!types.isFunction(isTargetPositionCallback)) {
        throw errors.createInvalidArgumentTypeError(isTargetPositionCallback);
    }

    if (!Array.isArray(moves) || !moves.every((m) => types.isMove(m))) {
        throw errors.createInvalidArgumentTypeError(moves);
    }

    /**
     * @type {import("../../utils/types").path}
     */
    const path = [
        {
            comeFrom: undefined,
            moveThatLed: undefined,
            position: startPosition
        }
    ];
    /**
     * @type {import("../../utils/types").forbiddenMove[]}
     */
    const forbiddenMoves = [];

    const getCurrPosition = () => path[path.length - 1].position;
    const getPrevPosition = () => path[path.length - 2].position;
    const getMoveThatLedToCurrPosition = () =>
        path[path.length - 1].moveThatLed;

    /**
     * @param {import("../../utils/types").position} position1 
     * @param {import("../../utils/types").position} position2 
     */
    const arePositionsEqual = (position1, position2) =>
        position1 !== undefined
        && position2 !== undefined
        && position1.x === position2.x
        && position1.y === position2.y;

    /**
     * @param {import("../../utils/types").position} position1 
     * @param {import("../../utils/types").position} position2
     */
    const isMoveForbidden = (position1, position2) =>
        forbiddenMoves.find(f =>
            arePositionsEqual(f.from, position1)
            && arePositionsEqual(f.to, position2)
        ) !== undefined;

    /**
     * @param {import("../../utils/types").position} position1 
     * @param {import("../../utils/types").position} position2 
     */
    const forbidMove = (position1, position2) => {
        // console.debug("\tForbidding move from", position1, "to", position2, "...");
        forbiddenMoves.push({ from: position1, to: position2 });
    };

    const stepBack = () => {
        // console.debug("\tStepping back...");
        path.pop();
    }

    /**
     * @param {import("../../utils/types").move} move 
     */
    const isSteppingBackMove = (move) =>
        getMoveThatLedToCurrPosition() !== undefined
        && move.base.id
        === getMoveThatLedToCurrPosition().steppingBackMoveID;

    /**
     * @param {import("../../utils/types").move} move 
     */
    const move = (move) => {
        // console.debug("\tMoving to", move.base.perform(getCurrPosition()), "...");
        path.push(
            {
                comeFrom: getCurrPosition(),
                moveThatLed: move,
                position: move.base.perform(getCurrPosition())
            }
        );
    }

    /**
     * @param {import("../../utils/types").position} position1 
     * @param {import("../../utils/types").position} position2 
     */
    const isMoveDoneBefore = (position1, position2) =>
        path.find(p =>
            arePositionsEqual(p.comeFrom, position1)
            && arePositionsEqual(p.position, position2)
        ) !== undefined;

    while (true) {
        // console.debug("Now on", getCurrPosition());

        if (isTargetPositionCallback(getCurrPosition())) {
            // console.debug("Target reached at", path[path.length - 1].position);
            return path.map(step => step.position);
        }

        let moveAvailable = undefined;
        for (let m of moves) {
            const nextPosition = m.base.perform(getCurrPosition());

            if (isMoveForbidden(getCurrPosition(), nextPosition)) {
                // console.debug("Cannot go to", nextPosition, "because move forbidden");
                continue;
            }

            if (isSteppingBackMove(m)) {
                // console.debug("Cannot go to", nextPosition, "because cannot yet step back");
                continue;
            }

            if (isMoveDoneBefore(getCurrPosition(), nextPosition)) {
                // console.debug("Cannot go to", nextPosition, "because move done before");
                continue;
            }

            if (isPositionForbiddenCallback(nextPosition)) {
                // console.debug("Cannot go to", nextPosition, "because position forbidden");
                forbidMove(getCurrPosition(), nextPosition);
                continue;
            }

            moveAvailable = m;
            break;
        }

        if (moveAvailable === undefined) {
            const moveThatLedToCurrPosition = getMoveThatLedToCurrPosition();

            if (moveThatLedToCurrPosition === undefined) {
                // console.debug("Cannot found target");
                return path.map(step => step.position);
            }

            forbidMove(getPrevPosition(), getCurrPosition());

            stepBack();
        } else {
            move(moveAvailable);
        }
    }
};