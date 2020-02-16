const paramsConfigs = require("./params-config").paramsConfigs;
const getConfig = require("./get-config").getConfig;

exports.provideDefaultValues = function (args, contents) {
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