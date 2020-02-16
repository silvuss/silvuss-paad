const paramsConfigs = require("./params-config").paramsConfigs;
const provideDefaultValues
    = require("./provide-default-values").provideDefaultValues;

exports.validateAndConvertArgs = function (args, contents) {
    // Check whether all provided arguments are valid parameters' names/values
    args.forEach(a => {
        const paramConfig = paramsConfigs[a.name];

        if (paramConfig === undefined) {
            throw Error(`The argument's name does not represent any valid `
                + `parameter: ${a.name}`);
        } else if (a.values.length !== paramConfig.validationFuncs.length) {
            throw Error(`The number of arguments representing the values of `
                + `the parameter ${a.name} is invalid: ${a.values.length} `
                + `instead of ${paramConfig.validationFuncs.length}`);
        }

        paramConfig.validationFuncs.forEach((f, i) => {
            if (f(a.values[i]) === false) {
                throw Error(`The argument does not represents a valid `
                    + `parameter value: ${a.name}`);
            }
        });
    });

    // Check whether all required parameters are provided
    // Thanks to https://stackoverflow.com/a/14379304
    for (let [paramName, paramConfig] of Object.entries(paramsConfigs)) {
        if (paramConfig.isRequired === true
            && args.find(x => (x.name === paramName)) === undefined) {
            throw Error(`A required parameter is not represented by any `
                + `argument: ${c}`);
        }
    }

    // Convert the arguments
    const result = args.map((a) => {
        return {
            name: a.name,
            values:
                a.values.map((v, i) =>
                    paramsConfigs[a.name].convertionFuncs[i](v)
                )
        };
    });

    return {
        provideDefaultValues: () => provideDefaultValues(result, contents)
    };
};