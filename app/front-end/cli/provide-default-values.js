const errors = require("../../utils/errors");
const types = require("../../utils/types");
const paramsConfigs = require("./params-config").paramsConfigs;
const getConfig = require("./get-config").getConfig;

/**
 * Provides default values to parameters that do not have the corresponding
 *  arguments provided.
 * @param {import("../../utils/types").arg[]} args
 * @param {string[]} contents
 * @returns An object with a method to process the list of arguments further
 */
exports.provideDefaultValues = function (args, contents) {
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

    const result = args.slice();

    for (let [paramName, paramConfig] of Object.entries(paramsConfigs)) {
        if (paramConfig.isRequired === false
            && args.find(x => (x.name === paramName)) === undefined) {
            result.push({
                name: paramName,
                values: paramConfig.defaultValues.slice()
            })
        }
    }

    return {
        getConfig: () => getConfig(result, contents)
    };
};