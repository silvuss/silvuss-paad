const validation = require("./validation");
const constructBlock = require("./construct-block").constructBlock;
const constructSchemaLine
    = require("./construct-schema-line").constructSchemaLine;

/**
 * @typedef {object} schemaConfig
 * @property {object} schemaConfig.sizesConfig
 * @property {number} schemaConfig.sizesConfig.colsNumber integer, >= 0
 * @property {object} schemaConfig.linksConfig
 * @property {object} schemaConfig.linksConfig.widths
 * @property {number} schemaConfig.linksConfig.widths.pointerWidth integer, >= 0
 * @property {number} schemaConfig.linksConfig.widths.lineBodyWidth integer, >= 0
 * @property {object} schemaConfig.linksConfig.chars
 * @property {string} schemaConfig.linksConfig.chars.pointerChar length < 2
 * @property {string} schemaConfig.linksConfig.chars.lineBodyChar length < 2
 * @property {string} schemaConfig.insideChar length < 2
 * @property {object[]} contentConfigs
 */

/**
 * Validates a schemaConfig object.
 * @param {schemaConfig} schemaConfig
 */
function validateSchemaConfig(schemaConfig) {
    if (validation.types.isObject(schemaConfig) === false) {
        throw Error("schemaConfig === " + schemaConfig);
    }

    if (validation.types.isObject(schemaConfig.sizesConfig) === false) {
        throw Error("schemaConfig.sizesConfig === " + schemaConfig.sizesConfig);
    }

    if (validation.domain.isSize(schemaConfig.sizesConfig.colsNumber)
        === false) {
        throw Error(
            "schemaConfig.sizesConfig.colsNumber === "
            + schemaConfig.sizesConfig.colsNumber
        );
    }

    if (validation.types.isObject(schemaConfig.linksConfig) === false) {
        throw Error("schemaConfig.linksConfig === " + schemaConfig.linksConfig);
    }

    if (validation.types.isObject(schemaConfig.linksConfig.widths) === false) {
        throw Error(
            "schemaConfig.linksConfig.widths === "
            + schemaConfig.linksConfig.widths
        );
    }

    if (validation.domain.isSize(schemaConfig.linksConfig.widths.pointerWidth)
        === false) {
        throw Error(
            "schemaConfig.linksConfig.widths.pointerWidth === "
            + schemaConfig.linksConfig.widths.pointerWidth
        );
    }

    if (validation.domain.isSize(schemaConfig.linksConfig.widths.lineBodyWidth)
        === false) {
        throw Error(
            "schemaConfig.linksConfig.widths.lineBodyWidth === "
            + schemaConfig.linksConfig.widths.lineBodyWidth
        );
    }

    if (validation.types.isObject(schemaConfig.linksConfig.chars) === false) {
        throw Error(
            "schemaConfig.linksConfig.chars === "
            + schemaConfig.linksConfig.chars
        );
    }

    if (validation.domain.isProperChar(
        schemaConfig.linksConfig.chars.pointerChar
    ) === false
        && schemaConfig.linksConfig.chars.pointerChar !== "") {
        throw Error(
            "schemaConfig.linksConfig.chars.pointerChar === "
            + schemaConfig.linksConfig.chars.pointerChar
        );
    }

    if (validation.domain.isProperChar(
        schemaConfig.linksConfig.chars.lineBodyChar
    ) === false
        && schemaConfig.linksConfig.chars.lineBodyChar !== "") {
        throw Error(
            "schemaConfig.linksConfig.chars.lineBodyChar === "
            + schemaConfig.linksConfig.chars.lineBodyChar
        );
    }

    if (validation.domain.isProperChar(schemaConfig.insideChar) === false) {
        throw Error("schemaConfig.insideChar === " + schemaConfig.insideChar);
    }
}

/**
 * Constructs a schema.
 * @param {schemaConfig} schemaConfig
 * @param {blocksConfig} contentBlocksConfig
 * @param {blocksConfig} separatorBlocksConfig
 * @param {contentConfigs} contentConfigs
 * @returns {string} a string representing the constructed schema
 */
exports.constructSchema = function (
    schemaConfig,
    contentBlocksConfig,
    horizontalSeparatorBlocksConfig,
    verticalSeparatorBlocksConfig,
    contentConfigs
) {
    validateSchemaConfig(schemaConfig); // throws in case of an error

    if (validation.types.isArray(contentConfigs) === false) {
        throw Error(
            "contentConfigs === " + contentConfigs
        );
    }

    const schema = (
        schemaConfig => {
            const _schema = [];

            const contentBlocks = contentConfigs.map(
                (c) => constructBlock(contentBlocksConfig, c)
            );

            const rowsNumber = (
                schemaConfig.sizesConfig.colsNumber === 0
                    ? 0
                    : Math.ceil(
                        contentBlocks.length
                        / schemaConfig.sizesConfig.colsNumber
                    )
            );

            horizontalSeparatorBlocksConfig.sizesConfig.minOuterHeight
                = contentBlocks[0].length;
            horizontalSeparatorBlocksConfig.sizesConfig.maxOuterHeight
                = contentBlocks[0].length;

            const horizontalSeparatorBlocks = (
                (contentConfigs, horizontalSeparatorBlocksConfig) => {
                    const _horizontalSeparatorBlocks = [];

                    for (let i = 0; i < contentConfigs.length - 1; ++i) {
                        const horizontalSeparatorBlockContentConfig = (
                            contentConfigs => {
                                const content = "";

                                // TODO: vertical separator block's content creating

                                const _horizontalSeparatorBlockContentConfig = {
                                    content: content,
                                    resizeBlockIfContentOverflow: true
                                };

                                return _horizontalSeparatorBlockContentConfig;
                            }
                        )(contentConfigs);

                        const horizontalSeparatorBlock =
                            constructBlock(
                                horizontalSeparatorBlocksConfig,
                                horizontalSeparatorBlockContentConfig);

                        _horizontalSeparatorBlocks.push(horizontalSeparatorBlock);
                    }

                    return _horizontalSeparatorBlocks;
                }
            )(contentConfigs, horizontalSeparatorBlocksConfig);

            const verticalSeparatorBlocks = (
                (contentConfigs, verticalSeparatorBlocksConfig, rowsNumber) => {
                    const _verticalSeparatorBlocks = [];

                    if (rowsNumber > 1) {
                        contentConfigs.forEach((c) => {
                            const verticalSeparatorBlockContentConfig = (
                                contentConfigs => {
                                    const content = "";

                                    // TODO: vertical separator block's content creating

                                    const _verticalSeparatorBlockContentConfig = {
                                        content: content,
                                        resizeBlockIfContentOverflow: true
                                    };

                                    return _verticalSeparatorBlockContentConfig;
                                }
                            )(contentConfigs);

                            const verticalSeparatorBlock =
                                constructBlock(
                                    verticalSeparatorBlocksConfig,
                                    verticalSeparatorBlockContentConfig
                                );

                            _verticalSeparatorBlocks.push(verticalSeparatorBlock);
                        });
                    }

                    return _verticalSeparatorBlocks;
                }
            )(contentConfigs, verticalSeparatorBlocksConfig, rowsNumber);

            for (let rowN = 0; rowN < rowsNumber; ++rowN) {
                // Content row
                for (let rowLineN = 0;
                    rowLineN < contentBlocks[0].length;
                    ++rowLineN) {
                    const contentSchemaLine = constructSchemaLine(
                        contentBlocks,
                        horizontalSeparatorBlocks,
                        schemaConfig.sizesConfig.colsNumber,
                        rowN,
                        rowLineN
                    );
                    _schema.push(contentSchemaLine);
                }

                if (rowN !== rowsNumber - 1) {
                    // Separator row
                    for (let rowLineN = 0;
                        rowLineN < verticalSeparatorBlocks[0].length;
                        ++rowLineN) {
                        const separatorSchemaLine = constructSchemaLine(
                            verticalSeparatorBlocks,
                            horizontalSeparatorBlocks,
                            schemaConfig.sizesConfig.colsNumber,
                            rowN,
                            rowLineN
                        );
                        _schema.push(separatorSchemaLine);
                    }
                }
            }

            return _schema;
        }
    )(schemaConfig);

    return schema;

}