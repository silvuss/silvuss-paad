const constructBlock = require("./construct-block").constructBlock;
const constructBlockPart = require("./construct-block-part").constructBlockPart;
const constructBlockPartLine
    = require("./construct-block-part-line").constructBlockPartLine;
const createTopBlockPart
    = require("./create-top-block-part").createTopBlockPart;
const createMiddleTopBlockPart
    = require("./create-middle-top-block-part").createMiddleTopBlockPart;
const createMiddleBlockPart
    = require("./create-middle-block-part").createMiddleBlockPart;
const createMiddleBottomBlockPart
    = require("./create-middle-bottom-block-part").createMiddleBottomBlockPart;
const createBottomBlockPart
    = require("./create-bottom-block-part").createBottomBlockPart;

exports.createBlock = function (blockConfig, content, maxContentLength) {
    const actualBlockConfig = (() => {
        const {
            innerWidth,
            innerHeights,
            ...blockConfigRest
        } = blockConfig;

        const actualInnerWidth
            = (innerWidth === undefined) ? maxContentLength : innerWidth;

        const actualMinInnerHeight
            = (innerHeights.min === undefined && innerWidth === undefined)
                ? 1
                : (innerHeights.min === undefined)
                    ? 0
                    : innerHeights.min;

        const actualMaxInnerHeight
            = (innerHeights.max === undefined && innerWidth === undefined)
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
            ...blockConfigRest
        };
    })();

    const parts = {
        top: createTopBlockPart(actualBlockConfig),
        middleTop: createMiddleTopBlockPart(actualBlockConfig),
        middle: createMiddleBlockPart(actualBlockConfig, content),
        middleBottom: createMiddleBottomBlockPart(actualBlockConfig),
        bottom: createBottomBlockPart(actualBlockConfig)
    };

    return constructBlock(
        parts, (parts) => parts.reduce((block, part) => block.concat(part), [])
    );
}