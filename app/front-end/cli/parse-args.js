/**
 * @param {string[]} argsList
 * @param {string} stopSignalingString
 * @param {object} argsConfig
 */
exports.parseArgs = function (argsList, stopSignalingString, argsConfig) {
    const properArgs = {};

    for (let i = 0; i < argsList.length;) {
        if (argsList[i] === stopSignalingString) {
            properArgs["content"] = argsList.slice(i + 1, argsList.length);
            break;
        }

        // Validate the argument's name

        const currArgName = argsList[i];
        const currArgConfig = argsConfig[currArgName];

        if (currArgConfig === undefined) {
            throw Error(`Invalid argument name: ${currArgName}`);
        }

        // Validate the argument's values

        const currArgValues =
            argsList.slice(
                i + 1,
                i + 1 + currArgConfig.validationFunctions.length
            );

        // The below condition is meaningful only if the argument is given last
        if (currArgValues.length < currArgConfig.validationFunctions.length) {
            throw Error(
                `Too little values for argument ${currArgName}: `
                + `${currArgValues.length} instead of `
                + `${currArgConfig.validationFunctions.length}`
            );
        }

        currArgValues.forEach((v, i) => {
            if (currArgConfig.parsingFunctions !== undefined
                && currArgConfig.parsingFunctions[i] !== undefined
                ? currArgConfig.validationFunctions[i](
                    currArgConfig.parsingFunctions[i](v)
                ) === false
                : currArgConfig.validationFunctions[i](v) === false) {
                throw Error(`Invalid value for argument ${currArgName}: ${v}`);
            }
        });

        // TODO: refactor, so that parsingFunctions[i] be used only once
        properArgs[currArgName] = currArgValues.map((v, i) =>
            currArgConfig.parsingFunctions !== undefined
                && currArgConfig.parsingFunctions[i] !== undefined
                ? currArgConfig.parsingFunctions[i](v)
                : v
        );

        i += currArgValues.length + 1;
    }

    for (let c of Object.keys(argsConfig)) {
        if (properArgs[c] === undefined) {
            if (argsConfig[c].required === true) {
                throw Error(`Required argument not given: ${c}`);
            } else {
                properArgs[c] = argsConfig[c].defaultValue;
            }
        }
    }

    return properArgs;
}