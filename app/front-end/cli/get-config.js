const errors = require("../../utils/errors");
const types = require("../../utils/types");

/**
 * Maps command-line configuration onto application configuration.
 * @param {import("../../utils/types").arg[]} args
 * @param {string[]} contents
 * @returns {object} An object with the mapped configuration
 */
exports.getConfig = function (args, contents) {
    if (!types.isNaturalOrZero(arguments.length)) {
        throw errors.createUnexpectedArgumentsVariableTypeError();
    } else if (arguments.length < 2) {
        throw errors.createTooLittleArgumentsError(arguments.length);
    } else if (arguments.length > 2) {
        throw errors.createTooManyArgumentsError(arguments.length);
    }

    if (!Array.isArray(args) || !args.every((a) => types.isArg(a))) {
        throw errors.createInvalidArgumentTypeError(args);
    }

    if (!Array.isArray(contents) || !contents.every((c) => types.isString(c))) {
        throw errors.createInvalidArgumentTypeError(contents);
    }

    /**
     * @type {import("../../utils/types").boxConfig}
     */
    const boxConfig = {
        innerWidth: args.find((x) => x.name === "-w").values[0],
        innerHeights: {
            min: args.find((x) => x.name === "-h").values[0],
            max: args.find((x) => x.name === "-h").values[1],
        },
        border: {
            width: args.find((x) => x.name === "-b").values[0],
            char: args.find((x) => x.name === "-b").values[1]
        },
        padding: {
            width: args.find((x) => x.name === "-p").values[0],
            char: args.find((x) => x.name === "-p").values[1]
        },
        overflowIndicator: "...", // (currently no)
        fillChar: args.find((x) => x.name === "-f").values[0]
    };

    /**
     * @type {import("../../utils/types").linkConfig}
     */
    const linkConfig = {
        fillChar: args.find((x) => x.name === "-l").values[0],
    };

    // /**
    //  * @type {import("../../utils/types").diagramConfig}
    //  */
    /**
     * @todo How to say to VS Code's TypeScript's "validation engine"
     *  that although we have indeed declared "arg.values" of a type just
     *  "any[]", it has now a well-defined type?
     */
    const diagramConfig = {
        width: args.find((x) => x.name === "-c").values[0],
        fillChar: " ", // (currently no)
        boxesSeparator: { // (currently no)
            horizontal: {
                size: 1
            },
            vertical: {
                size: 1
            }
        }
    };

    // /**
    //  * @type {import("../../utils/types").graphConfig}
    //  */
    /**
     * @todo How to say to VS Code's TypeScript's "validation engine"
     *  that although we have indeed declared "separator" of a type just "any",
     *  it has now a well-defined type?
     */
    const graphConfig =
        args.find((x) => x.name === "-G").values[0] === undefined
            ? undefined
            : {
                separator: args.find((x) => x.name === "-G").values[0]
            };

    return {
        boxConfig: boxConfig,
        diagramConfig: diagramConfig,
        linkConfig: linkConfig,
        graphConfig: graphConfig,
        contents: contents
    };
};