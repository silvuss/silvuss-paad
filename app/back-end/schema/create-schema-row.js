const constructSchemaRow
    = require("./construct-schema-row").constructSchemaRow;
const createSchemaRowLine = require("./create-schema-row-line").createSchemaRowLine;

exports.createSchemaRow = function (encompassingBlocks, encompassedBlocks) {
    // console.debug("createSchemaRow: encompassingBlocks ===", encompassingBlocks);
    // console.debug("createSchemaRow: encompassedBlocks ===", encompassedBlocks);

    const schemaRowLines = (() => {
        const result = [];
        for (let i = 0; i < encompassingBlocks[0].length; ++i) {
            const schemaRowLine = createSchemaRowLine(
                encompassingBlocks.map(b => b[i]),
                encompassedBlocks.map(b => b[i])
            );
            result.push(schemaRowLine);
        }
        return result;
    })();

    return constructSchemaRow(schemaRowLines, (lines) => lines.join("\n"));
}