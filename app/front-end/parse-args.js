const validateAndConvertArgs = require("./validate-and-convert-args").validateAndConvertArgs;

// Invoke like parseArgsList(argsList).validateArgs().getConfig()
exports.parseArgsList = function (argsList, isParamName, isContentSeparator) {
    const args = [];

    // Split for contents arguments and "proper args" arguments
    const { contents, properArgs } = (() => {
        const contentSeparatorIndex
            = argsList.findIndex(x => isContentSeparator(x));
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
        if (isParamName(a)) {
            args.push({
                name: a,
                values: []
            });
        } else {
            if (args.length === 0) {
                throw Error(`No argument representing a parameter name `
                    + `to relate the provided value to`);
            }
            args[args.length - 1].values.push(a);
        }
    });

    return {
        validateAndConvertArgs: () => validateAndConvertArgs(args, contents)
    };
}