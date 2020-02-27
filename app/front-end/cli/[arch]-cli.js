const process = require("process");
const parseArgs = require("./parse-args").parseArgs;
const createBox = require("../../back-end3/box/create-box").createBox;
const createDiagram = require("../../back-end3/diagram/create-diagram").createDiagram;

const {
    boxConfig,
    diagramConfig,
    linkConfig,
    graphConfig,
    contents
} = parseArgs(
    process.argv.slice(2),
    (x) => x.startsWith("-"),
    (x) => x === "--"
).validateAndConvertArgs()
    .provideDefaultValues()
    .getConfig();

/**
 * @callback createBoxCallback
 * @param {string} content
 * @returns {import("../../utils/types").<intellisense not working>}
 */

/**
 * @type {createBoxCallback}
 */
const createBoxCallback = (content) => {
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max#Getting_the_maximum_element_of_an_array
    const maxContentLength
        = contents.length === 0
            ? undefined
            : contents.map(
                /**
                 * @param {any} x
                 */
                (x) => x.length
            ).reduce(
                /**
                 * @param {any} x
                 * @param {any} y
                 */
                (x, y) => Math.max(x, y)
            );

    const actualBoxConfig = (() => {
        const {
            innerWidth,
            innerHeights,
            ...boxConfigRest
        } = boxConfig;

        const actualInnerWidth
            = (innerWidth === undefined) ? maxContentLength : innerWidth;

        const actualMinInnerHeight
            = (innerHeights.min === undefined
                && actualInnerWidth >= maxContentLength)
                ? 1
                : (innerHeights.min === undefined)
                    ? 0
                    : innerHeights.min;

        const actualMaxInnerHeight
            = (innerHeights.max === undefined
                && actualInnerWidth >= maxContentLength)
                ? 1
                : (innerHeights.max === undefined)
                    ? 0
                    : innerHeights.max;

        return {
            innerWidth: actualInnerWidth,
            innerHeights: {
                min: actualMinInnerHeight,
                max: actualMaxInnerHeight
            },
            ...boxConfigRest
        };
    })();

    return createBox(actualBoxConfig, content);
};

const diagram = createDiagram(diagramConfig, contents, createBoxCallback);

console.log(diagram);