const constructSchema = require("../../back-end/construct-schema").constructSchema;
const process = require("process");
const parseArgs = require("./parse-args").parseArgs;
const validation = require("../../back-end/validation");

try {
    const argsConfig = {
        "-w": {
            parsingFunctions: [
                Number.parseInt
            ],
            validationFunctions: [
                validation.domain.isSize
            ],
            required: false,
            defaultValue: undefined
        },
        "-h": {
            parsingFunctions: [
                Number.parseInt,
                Number.parseInt
            ],
            validationFunctions: [
                validation.domain.isSize,
                validation.domain.isSize
            ],
            required: true,
            defaultValue: undefined
        },
        "-b": {
            parsingFunctions: [
                Number.parseInt,
                undefined
            ],
            validationFunctions: [
                validation.domain.isSize,
                (value) => (
                    value === "" || validation.domain.isProperChar(value)
                )
            ],
            required: false,
            defaultValue: [
                0,
                ""
            ]
        },
        "-p": {
            parsingFunctions: [
                Number.parseInt
            ],
            validationFunctions: [
                validation.domain.isSize
            ],
            required: false,
            defaultValue: [
                0
            ]
        },
        "-s": {
            parsingFunctions: [
                Number.parseInt,
                undefined
            ],
            validationFunctions: [
                validation.domain.isSize,
                (value) => (
                    value === "" || validation.domain.isProperChar(value)
                )
            ],
            required: true,
            defaultValue: undefined
        },
        "-c": {
            parsingFunctions: [
                Number.parseInt
            ],
            validationFunctions: [
                validation.domain.isSize
            ],
            required: false,
            defaultValue: undefined
        },
        "-f": {
            parsingFunctions: [
                undefined
            ],
            validationFunctions: [
                (value) => (
                    value === "" || validation.domain.isProperChar(value)
                )
            ],
            required: true,
            defaultValue: undefined
        },
        "content": {
            parsingFunctions: undefined,
            validationFunctions: undefined,
            require: false,
            defaultValue: []
        }
    };

    const properArgs = parseArgs(process.argv.slice(2), "--", argsConfig);

    const schemaConfig = {
        sizesConfig: {
            colsNumber: properArgs["-c"] !== undefined
                ? properArgs["-c"][0]
                : properArgs["content"].length
        },
        linksConfig: {
            widths: { pointerWidth: 1, lineBodyWidth: 1 },
            chars: { pointerChar: "+", lineBodyChar: "+" }
        },
        insideChar: properArgs["-f"][0]
    };

    const contentBlocksConfig = {
        sizesConfig: {
            outerWidth: properArgs["-w"] !== undefined
                ? properArgs["-w"][0]
                : Math.max(...properArgs["content"].map(v => v.length)),
            minOuterHeight: properArgs["-h"][0],
            maxOuterHeight: properArgs["-h"][1]
        },
        bordersConfig: {
            widths: {
                top: properArgs["-b"][0],
                right: properArgs["-b"][0],
                bottom: properArgs["-b"][0],
                left: properArgs["-b"][0]
            },
            chars: {
                top: properArgs["-b"][1],
                right: properArgs["-b"][1],
                bottom: properArgs["-b"][1],
                left: properArgs["-b"][1]
            },
            horizontalBordersCharShift: "none"
        },
        paddingsConfig: {
            widths: {
                top: properArgs["-p"][0],
                right: properArgs["-p"][0],
                bottom: properArgs["-p"][0],
                left: properArgs["-p"][0]
            }
        },
        insideChar: properArgs["-f"][0],
        widerThanHigher: true
    };

    const horizontalSeparatorBlocksConfig = {
        sizesConfig: {
            outerWidth: properArgs["-s"][0],
            minOuterHeight: undefined, // this must be exactly the result height of content
            maxOuterHeight: undefined // this must be exactly the result height of content
        },
        bordersConfig: {
            widths: { top: 0, right: 0, bottom: 0, left: 0 },
            chars: { top: "", right: "", bottom: "", left: "" },
            horizontalBordersCharShift: "none"
        },
        paddingsConfig: { widths: { top: 0, right: 0, bottom: 0, left: 0 } },
        insideChar: properArgs["-s"][1],
        widerThanHigher: true
    };

    const verticalSeparatorBlocksConfig = {
        sizesConfig: {
            outerWidth: properArgs["-w"] !== undefined
                ? properArgs["-w"][0]
                : Math.max(...properArgs["content"].map(v => v.length)),
            minOuterHeight: properArgs["-s"][0],
            maxOuterHeight: properArgs["-s"][0]
        },
        bordersConfig: {
            widths: { top: 0, right: 0, bottom: 0, left: 0 },
            chars: { top: "", right: "", bottom: "", left: "" },
            horizontalBordersCharShift: "none"
        },
        paddingsConfig: { widths: { top: 0, right: 0, bottom: 0, left: 0 } },
        insideChar: properArgs["-s"][1],
        widerThanHigher: true
    };

    const contentConfigs = properArgs["content"].map(
        (c) => {
            return {
                content: c
            };
        }
    );

    const schema = constructSchema(
        schemaConfig,
        contentBlocksConfig,
        horizontalSeparatorBlocksConfig,
        verticalSeparatorBlocksConfig,
        contentConfigs
    );

    console.log();
    console.log(schema.join("\n"));
    console.log();
} catch (e) {
    // console.error("Error: " + e.message);
    console.debug(e);
}