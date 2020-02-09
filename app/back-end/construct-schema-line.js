/**
 * Constructs a schema line.
 * @param {object[]} encompassingBlocks the list of block that are encompassing
 * @param {object[]} encompassedBlocks the list of blocks that are encompassed
 * @param {number} colsNumber the number of columns in the schema
 * @returns {string} the constructed schema line
 */
exports.constructSchemaLine = function (
    encompassingBlocks, encompassedBlocks, colsNumber, rowN, lineN
) {
    let schemaLine = "";

    for (let colN = 0; colN < colsNumber; ++colN) {
        const blocksNumber = encompassingBlocks.length;
        const blockIndex = colN + rowN * colsNumber;

        if (blockIndex >= blocksNumber) {
            break;
        }

        const encompassingBlockLine = encompassingBlocks[blockIndex][lineN];
        schemaLine += encompassingBlockLine;

        if (
            // Prevent adding the separator block
            //  after the last col in a row
            blockIndex < blocksNumber - 1
            // Prevent adding the separator block
            //  after the last block (if it is not
            //  in the last col in a row)
            && colN !== colsNumber - 1
        ) {
            const encompassedBlockLine = encompassedBlocks[blockIndex][lineN];
            schemaLine += encompassedBlockLine;
        }
    }

    return schemaLine;
};