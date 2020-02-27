const types = require("../../utils/types");

/**
 * @type {object}
 */
exports.paramsConfigs = {
    "-w": {
        desc: "The width for the inner of a box (i.e., excluding borders "
            + "and paddings)",
        validationFuncs: [
            /**
             * @param {any} x
             */
            (x) => types.isSize(Number.parseInt(x))
        ],
        convertionFuncs: [
            /**
             * @param {any} x
             */
            (x) => Number.parseInt(x)
        ],
        defaultValues: [
            undefined
        ],
        isRequired: false
    },
    "-h": {
        desc: "The values of the minimum and maximum height for the inner "
            + "of a box (i.e., excluding borders and paddings)",
        validationFuncs: [
            /**
             * @param {any} x
             */
            (x) => types.isSize(Number.parseInt(x)),
            /**
             * @param {any} x
             */
            (x) => types.isSize(Number.parseInt(x))
        ],
        convertionFuncs: [
            /**
             * @param {any} x
             */
            (x) => Number.parseInt(x),
            /**
             * @param {any} x
             */
            (x) => Number.parseInt(x)
        ],
        defaultValues: [
            undefined,
            undefined
        ],
        isRequired: false
    },
    "-b": {
        desc: "The configuration of borders of a box: the size for borders, "
            + "the character for borders",
        validationFuncs: [
            /**
             * @param {any} x
             */
            (x) => types.isSize(Number.parseInt(x)),
            /**
             * @param {any} x
             */
            (x) => types.isChar(x)
        ],
        convertionFuncs: [
            /**
             * @param {any} x
             */
            (x) => Number.parseInt(x),
            /**
             * @param {any} x
             */
            (x) => x
        ],
        defaultValues: [
            0,
            ""
        ],
        isRequired: false
    },
    "-p": {
        desc: "The configuration of paddings of a box: the size for paddings",
        validationFuncs: [
            /**
             * @param {any} x
             */
            (x) => types.isSize(Number.parseInt(x)),
            /**
             * @param {any} x
             */
            (x) => x === "" || types.isChar(x)
        ],
        convertionFuncs: [
            /**
             * @param {any} x
             */
            (x) => Number.parseInt(x),
            /**
             * @param {any} x
             */
            (x) => x
        ],
        defaultValues: [
            0,
            ""
        ],
        isRequired: false
    },
    "-f": {
        desc: "The character for the box's fill",
        validationFuncs: [
            /**
             * @param {any} x
             */
            (x) => types.isChar(x)
        ],
        convertionFuncs: [
            /**
             * @param {any} x
             */
            (x) => x
        ],
        defaultValues: [
            ""
        ],
        isRequired: false
    },
    "-l": {
        desc: "The configuration of links between boxes: the character "
            + "for a link's fill",
        validationFuncs: [
            /**
             * @param {any} x
             */
            (x) => types.isChar(x)
        ],
        convertionFuncs: [
            /**
             * @param {any} x
             */
            (x) => x
        ],
        defaultValues: [
            ""
        ],
        isRequired: false
    },
    "-c": {
        desc: "The number for columns in the diagram",
        validationFuncs: [
            /**
             * @param {any} x
             */
            (x) => types.isSize(Number.parseInt(x))
        ],
        convertionFuncs: [
            /**
             * @param {any} x
             */
            (x) => Number.parseInt(x)
        ],
        defaultValues: [
            0
        ],
        isRequired: false
    },
    "-G": {
        desc: "Switches on a processing mode indicating that the content " +
            "should be treated as a representation of a graph; expects one "
            + "argument - a character representing the separator "
            + "between the 'proper contents' and their IDs within the given "
            + "strings with contents",
        validationFuncs: [
            /**
             * @param {any} x
             */
            (x) => types.isChar(x)
        ],
        convertionFuncs: [
            /**
             * @param {any} x
             */
            (x) => x
        ],
        defaultValues: [
            undefined
        ],
        isRequired: false
    },
    "contents": {
        desc: "The content for the boxes in the diagram",
        validationFuncs: [],
        convertionFuncs: [],
        defaultValues: [
            []
        ],
        isRequired: false
    }
};