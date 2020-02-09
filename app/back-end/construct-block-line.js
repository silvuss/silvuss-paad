/**
 * @typedef {blockLineConfig} blockLineConfig
 * @property {object} left the left part of the line
 * @property {string} left.char length < 2
 * @property {number} left.width integer, >= 0
 * @property {object} middleLeft the middle-left part of the line
 * @property {string} middleLeft.char length < 2
 * @property {number} middleLeft.width integer, >= 0
 * @property {object} middle the middle part of the line
 * @property {string} middle.string
 * @property {object} middleRight the middle-right part of the line
 * @property {string} middleRight.char length < 2
 * @property {number} middleRight.width integer, >= 0
 * @property {object} right the right part of the line
 * @property {string} right.char length < 2
 * @property {number} right.width integer, >= 0
 */

/**
* Constructs a block line.
* @param {blockLineConfig} blockLineConfig the configuration of a block line
* @returns {string} the constructed block line
*/
exports.constructBlockLine = function (blockLineConfig) {
    const leftString =
        blockLineConfig.left.char.repeat(blockLineConfig.left.width);
    const middleLeftString =
        blockLineConfig.middleLeft.char.repeat(
            blockLineConfig.middleLeft.width
        );
    const middleString = blockLineConfig.middle.string;
    const middleRightString =
        blockLineConfig.middleRight.char.repeat(
            blockLineConfig.middleRight.width
        );
    const rightString =
        blockLineConfig.right.char.repeat(blockLineConfig.right.width);

    return leftString
        + middleLeftString
        + middleString
        + middleRightString
        + rightString;
};