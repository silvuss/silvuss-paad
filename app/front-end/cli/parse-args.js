const errors = require("../../utils/errors");
const types = require("../../utils/types");
const validateAndConvertArgs
    = require("./validate-and-convert-args").validateAndConvertArgs;

/**
 * @callback isParamNameCallback
 * @param {string} s
 */

/**
 * @callback isContentSeparatorCallback
 * @param {string} s
 */

/**
 * Parses a list of application's arguments.
 * @param {string[]} argsList
 * @param {isParamNameCallback} isParamNameCallback
 * @param {isContentSeparatorCallback} isContentSeparatorCallback
 * @return {object} An object with a method to process the parsed list
 *  of arguments further
 */
exports.parseArgs = function (
    argsList, isParamNameCallback, isContentSeparatorCallback
) {
    if (!types.isNaturalOrZero(arguments.length)) {
        throw errors.createUnexpectedArgumentsVariableTypeError();
    } else if (arguments.length < 3) {
        throw errors.createTooLittleArgumentsError(arguments.length);
    } else if (arguments.length > 3) {
        throw errors.createTooManyArgumentsError(arguments.length);
    }

    if (!Array.isArray(argsList) || !argsList.every((a) => types.isString(a))) {
        throw errors.createInvalidArgumentTypeError(argsList);
    }

    if (!types.isFunction(isParamNameCallback)) {
        throw errors.createInvalidArgumentTypeError(isParamNameCallback);
    }

    if (!types.isFunction(isContentSeparatorCallback)) {
        throw errors.createInvalidArgumentTypeError(isContentSeparatorCallback);
    }

    /**
     * @type {import("../../utils/types").arg[]}
     */
    const args = [];

    // Split for contents arguments and "proper args" arguments
    const { contents, properArgs } = (() => {
        const contentSeparatorIndex
            = argsList.findIndex(x => isContentSeparatorCallback(x));
        if (contentSeparatorIndex === -1) {
            return {
                contents: [],
                properArgs: argsList.slice()
            };
        } else {
            return {
                contents: argsList.slice(contentSeparatorIndex + 1),
                properArgs: argsList.slice(0, contentSeparatorIndex)
            };
        }
    })();

    // Get the "proper args"
    properArgs.forEach(a => {
        if (isParamNameCallback(a)) {
            args.push(
                {
                    name: a,
                    values: []
                }
            );
        } else {
            if (args.length === 0) {
                throw new Error(`No argument representing a parameter name `
                    + `to relate the provided value to`);
            }
            args[args.length - 1].values.push(a);
        }
    });

    return {
        validateAndConvertArgs: () => validateAndConvertArgs(args, contents)
    };
}