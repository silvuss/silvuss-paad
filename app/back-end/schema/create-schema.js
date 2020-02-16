const constructBlockPartLine
    = require("../block/construct-block-part-line").constructBlockPartLine;
const constructBlockPart
    = require("../block/construct-block-part").constructBlockPart;
const constructBlock
    = require("../block/construct-block").constructBlock;
const createSchemaRow = require("./create-schema-row").createSchemaRow;
const constructSchema = require("./construct-schema").constructSchema;
const arrayUtils = require("../utils/array-utils");

exports.createSchema = function (
    contentRowContentBlocks, separatorBlockConfig, schemaConfig
) {
    const actualColsNumber
        = (schemaConfig.colsNumber === undefined)
            ? contentRowContentBlocks.length
            : schemaConfig.colsNumber;

    const rowsNumber
        = (actualColsNumber === 0)
            ? 0
            : Math.ceil(contentRowContentBlocks.length / actualColsNumber);

    const contentRowSeparatorBlocks = (
        (separatorBlockConfig) => {
            const result = [];
            for (let i = 0; i < contentRowContentBlocks.length - 1; ++i) {
                const blockTopPartLinesElements = [];

                const blockMiddleTopPartLinesElements = [];

                const blockMiddlePartLinesElements = (() => {
                    const linesElements = [];
                    for (let k = 0;
                        k < contentRowContentBlocks[0].length;
                        ++k) {
                        linesElements.push({
                            left: "",
                            centerLeft: "",
                            center:
                                separatorBlockConfig.fillChar.repeat(separatorBlockConfig.width),
                            centerRight: "",
                            right: ""
                        });
                    }
                    return linesElements;
                })();

                const blockMiddleBottomPartLinesElements = [];

                const blockBottomPartLinesElements = [];

                const joinBlockPartLineParts = function (partsList) {
                    return partsList.join("");
                };

                const blockTopPartLines = blockTopPartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts),
                );
                const blockMiddleTopPartLines = blockMiddleTopPartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts)
                );
                const blockMiddlePartLines = blockMiddlePartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts)
                );
                const blockMiddleBottomPartLines = blockMiddleBottomPartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts)
                );
                const blockBottomPartLines = blockBottomPartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts)
                );

                const joinBlockPartLines = function (linesList) {
                    return linesList.reduce((part, line) => part.concat(line), []);
                };

                const blockParts = {
                    top: constructBlockPart(blockTopPartLines, joinBlockPartLines),
                    middleTop: constructBlockPart(blockMiddleTopPartLines, joinBlockPartLines),
                    middle: constructBlockPart(blockMiddlePartLines, joinBlockPartLines),
                    middleBottom:
                        constructBlockPart(blockMiddleBottomPartLines, joinBlockPartLines),
                    bottom: constructBlockPart(blockBottomPartLines, joinBlockPartLines)
                };

                const joinBlockParts = function (partsList) {
                    return partsList.reduce((block, part) => block.concat(part), []);
                };

                const block = constructBlock(blockParts, joinBlockParts);
                result.push(block);
            }
            return result;
        }
    )(separatorBlockConfig);

    const separatorRowContentBlocks = (
        (separatorBlockConfig) => {
            return contentRowContentBlocks.map(b => {
                const blockTopPartLinesElements = [];

                const blockMiddleTopPartLinesElements = [];

                const blockMiddlePartLinesElements = (() => {
                    const linesElements = [];
                    for (let i = 0; i < separatorBlockConfig.width; ++i) {
                        linesElements.push({
                            left: "",
                            centerLeft: "",
                            center:
                                separatorBlockConfig
                                    .fillChar
                                    .repeat(contentRowContentBlocks[0][0].length),
                            centerRight: "",
                            right: ""
                        });
                    }
                    return linesElements;
                })();

                const blockMiddleBottomPartLinesElements = [];

                const blockBottomPartLinesElements = [];

                const joinBlockPartLineParts = function (partsList) {
                    return partsList.join("");
                };

                const blockTopPartLines = blockTopPartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts),
                );
                const blockMiddleTopPartLines = blockMiddleTopPartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts)
                );
                const blockMiddlePartLines = blockMiddlePartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts)
                );
                const blockMiddleBottomPartLines = blockMiddleBottomPartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts)
                );
                const blockBottomPartLines = blockBottomPartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts)
                );

                const joinBlockPartLines = function (linesList) {
                    return linesList.reduce((part, line) => part.concat(line), []);
                };

                const blockParts = {
                    top: constructBlockPart(blockTopPartLines, joinBlockPartLines),
                    middleTop: constructBlockPart(blockMiddleTopPartLines, joinBlockPartLines),
                    middle: constructBlockPart(blockMiddlePartLines, joinBlockPartLines),
                    middleBottom:
                        constructBlockPart(blockMiddleBottomPartLines, joinBlockPartLines),
                    bottom: constructBlockPart(blockBottomPartLines, joinBlockPartLines)
                };

                const joinBlockParts = function (partsList) {
                    return partsList.reduce((block, part) => block.concat(part), []);
                };

                return constructBlock(blockParts, joinBlockParts);
            });
        }
    )(separatorBlockConfig);

    const separatorRowSeparatorBlocks = (
        (separatorBlockConfig) => {
            const result = [];
            for (let i = 0; i < contentRowContentBlocks.length - 1; ++i) {
                const blockTopPartLinesElements = [];

                const blockMiddleTopPartLinesElements = [];

                const blockMiddlePartLinesElements = (() => {
                    const linesElements = [];
                    for (let k = 0; k < separatorBlockConfig.width; ++k) {
                        linesElements.push({
                            left: "",
                            centerLeft: "",
                            center:
                                separatorBlockConfig.fillChar.repeat(separatorBlockConfig.width),
                            centerRight: "",
                            right: ""
                        });
                    }
                    return linesElements;
                })();

                const blockMiddleBottomPartLinesElements = [];

                const blockBottomPartLinesElements = [];

                const joinBlockPartLineParts = function (partsList) {
                    return partsList.join("");
                };

                const blockTopPartLines = blockTopPartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts),
                );
                const blockMiddleTopPartLines = blockMiddleTopPartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts)
                );
                const blockMiddlePartLines = blockMiddlePartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts)
                );
                const blockMiddleBottomPartLines = blockMiddleBottomPartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts)
                );
                const blockBottomPartLines = blockBottomPartLinesElements.map(
                    p => constructBlockPartLine(p, joinBlockPartLineParts)
                );

                const joinBlockPartLines = function (linesList) {
                    return linesList.reduce((part, line) => part.concat(line), []);
                };

                const blockParts = {
                    top: constructBlockPart(blockTopPartLines, joinBlockPartLines),
                    middleTop: constructBlockPart(blockMiddleTopPartLines, joinBlockPartLines),
                    middle: constructBlockPart(blockMiddlePartLines, joinBlockPartLines),
                    middleBottom:
                        constructBlockPart(blockMiddleBottomPartLines, joinBlockPartLines),
                    bottom: constructBlockPart(blockBottomPartLines, joinBlockPartLines)
                };

                const joinBlockParts = function (partsList) {
                    return partsList.reduce((block, part) => block.concat(part), []);
                };
                const block = constructBlock(blockParts, joinBlockParts);
                result.push(block);
            }
            return result;
        }
    )(separatorBlockConfig);

    const schemaContentRows = (() => {
        const result = [];

        for (let rowN = 0; rowN < rowsNumber; ++rowN) {
            const schemaRow = createSchemaRow(
                contentRowContentBlocks.slice(
                    rowN * actualColsNumber,
                    rowN * actualColsNumber + actualColsNumber
                ),
                contentRowSeparatorBlocks.slice(
                    rowN * actualColsNumber,
                    rowN * actualColsNumber + actualColsNumber
                )
            );
            result.push(schemaRow);
        }

        return result;
    })();

    const schemaSeparatorRows = (() => {
        const result = [];

        for (let rowN = 0; rowN < rowsNumber - 1; ++rowN) {
            const schemaRow = createSchemaRow(
                separatorRowContentBlocks.slice(rowN * actualColsNumber, rowN * actualColsNumber + actualColsNumber),
                separatorRowSeparatorBlocks.slice(rowN * actualColsNumber, rowN * actualColsNumber + actualColsNumber)
            );
            result.push(schemaRow);
        }

        return result;
    })();

    return constructSchema(
        {
            encompassing: schemaContentRows,
            encompassed: schemaSeparatorRows
        },
        (encompassing, encompassed) =>
            arrayUtils.joinStringsWithStrings(encompassing, encompassed, "\n")
    );
}