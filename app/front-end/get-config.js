/**
 * @typedef {object} contentBlockConfig
 * @property {number} innerWidth
 * @property {object} innerHeights
 * @property {number} innerHeights.min
 * @property {number} innerHeights.max >= innerHeights.min
 * @property {object} borders
 * @property {object} borders.top
 * @property {string} borders.top.char
 * @property {number} borders.top.width
 * @property {object} borders.right
 * @property {string} borders.right.char
 * @property {number} borders.right.width
 * @property {object} borders.bottom
 * @property {string} borders.bottom.char
 * @property {number} borders.bottom.width
 * @property {object} borders.left
 * @property {string} borders.left.char
 * @property {number} borders.left.width
 * @property {object} paddings
 * @property {object} paddings.top
 * @property {number} paddings.top.width
 * @property {object} paddings.right
 * @property {number} paddings.right.width
 * @property {object} paddings.bottom
 * @property {number} paddings.bottom.width
 * @property {object} paddings.left
 * @property {number} paddings.left.width
 * @property {boolean} widerThanHigher
 * @property {string} content
 * @property {string} overflowIndicator
 * @property {string} fillChar
 */

/**
 * @typedef {object} separatorBlockConfig
 * @property {number} width
 */

/**
 * @typedef {object} schemaConfig
 * @property {number} colsNumber
 * @property {object} link
 * @property {object} link.pointer
 * @property {number} link.pointer.width
 * @property {string} link.pointer.char
 * @property {object} link.line
 * @property {number} link.line.width
 * @property {string} link.line.char
 * @property {string} fillChar
 */

exports.getConfig = function (args, contents) {
    /**
     * @type {contentBlockConfig}
     */
    const contentBlockConfig = {
        innerWidth: args.find(x => x.name === "-w").values[0],
        innerHeights: {
            min: args.find(x => x.name === "-h").values[0],
            max: args.find(x => x.name === "-h").values[1],
        },
        borders: {
            top: {
                width: args.find(x => x.name === "-b").values[0],
                char: args.find(x => x.name === "-b").values[1]
            },
            right: {
                width: args.find(x => x.name === "-b").values[0],
                char: args.find(x => x.name === "-b").values[1]
            },
            bottom: {
                width: args.find(x => x.name === "-b").values[0],
                char: args.find(x => x.name === "-b").values[1]
            },
            left: {
                width: args.find(x => x.name === "-b").values[0],
                char: args.find(x => x.name === "-b").values[1]
            }
        },
        paddings: {
            top: {
                width: args.find(x => x.name === "-p").values[0]
            },
            right: {
                width: args.find(x => x.name === "-p").values[0]
            },
            bottom: {
                width: args.find(x => x.name === "-p").values[0]
            },
            left: {
                width: args.find(x => x.name === "-p").values[0]
            }
        },
        widerThanHigher: false, // (currently no)
        overflowIndicator: "...", // (currently no)
        fillChar: args.find(x => x.name === "-f").values[0]
    };

    /**
     * @type {separatorBlockConfig}
     */
    const separatorBlockConfig = {
        width: args.find(x => x.name === "-s").values[0],
        fillChar: args.find(x => x.name === "-s").values[1],
    };

    /**
     * @type {schemaConfig}
     */
    const schemaConfig = {
        colsNumber: args.find(x => x.name === "-c").values[0],
        link: {
            pointer: {
                width: 0, // (currently no)
                char: "" // (currently no)
            },
            line: {
                width: 0, // (currently no)
                char: "" // (currently no)
            }
        },
    };

    return {
        contentBlockConfig,
        separatorBlockConfig,
        schemaConfig,
        contents
    };
};