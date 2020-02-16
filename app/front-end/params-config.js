const validationUtils = require("../back-end/utils/validation-utils");

exports.paramsConfigs = {
    "-w": {
        desc: "The width for the inner of a block (i.e., excluding borders and paddings)",
        validationFuncs: [
            (x) => validationUtils.isSize(Number.parseInt(x))
        ],
        convertionFuncs: [
            (x) => Number.parseInt(x)
        ],
        defaultValues: [
            undefined
        ],
        isRequired: false
    },
    "-h": {
        desc: "The values of the minimum and maximum height for the inner of a block (i.e., excluding borders and paddings)",
        validationFuncs: [
            (x) => validationUtils.isSize(Number.parseInt(x)),
            (x) => validationUtils.isSize(Number.parseInt(x))
        ],
        convertionFuncs: [
            (x) => Number.parseInt(x),
            (x) => Number.parseInt(x)
        ],
        defaultValues: [
            undefined,
            undefined
        ],
        isRequired: false
    },
    "-b": {
        desc: "The configuration of borders of a block: the size for borders, the character for borders",
        validationFuncs: [
            (x) => validationUtils.isSize(Number.parseInt(x)),
            (x) => validationUtils.isProperChar(x)
        ],
        convertionFuncs: [
            (x) => Number.parseInt(x),
            (x) => x
        ],
        defaultValues: [
            0,
            ""
        ],
        isRequired: false
    },
    "-p": {
        desc: "The configuration of paddings of a block: the size for paddings",
        validationFuncs: [
            (x) => validationUtils.isSize(Number.parseInt(x))
        ],
        convertionFuncs: [
            (x) => Number.parseInt(x)
        ],
        defaultValues: [
            0
        ],
        isRequired: false
    },
    "-f": {
        desc: "The character for the block's fill",
        validationFuncs: [
            (x) => validationUtils.isProperChar(x)
        ],
        convertionFuncs: [
            (x) => x
        ],
        defaultValues: [
            ""
        ],
        isRequired: false
    },
    "-s": {
        desc: "The configuration of separators between blocks: the size for separators, the character for the separators' fill",
        validationFuncs: [
            (x) => validationUtils.isSize(Number.parseInt(x)),
            (x) => validationUtils.isProperChar(x)
        ],
        convertionFuncs: [
            (x) => Number.parseInt(x),
            (x) => x
        ],
        defaultValues: [
            0,
            ""
        ],
        isRequired: false
    },
    "-c": {
        desc: "The number for columns in the schema",
        validationFuncs: [
            (x) => validationUtils.isSize(Number.parseInt(x))
        ],
        convertionFuncs: [
            (x) => Number.parseInt(x)
        ],
        defaultValues: [
            undefined
        ],
        isRequired: false
    },
    "contents": {
        desc: "The content for the blocks in the schema",
        validationFuncs: [],
        convertionFuncs: [],
        defaultValues: [
            []
        ],
        isRequired: false
    }
};