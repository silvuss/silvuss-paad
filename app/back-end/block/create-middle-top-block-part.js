const constructBlockPartLine
    = require("./construct-block-part-line").constructBlockPartLine;
const constructBlockPart = require("./construct-block-part").constructBlockPart;

exports.createMiddleTopBlockPart = function (blockConfig) {
    const partLines = [];

    for (let i = 0; i < blockConfig.paddings.top.width; ++i) {
        const partLine = constructBlockPartLine(
            {
                left:
                    blockConfig.borders.left.char.repeat(
                        blockConfig.borders.left.width
                    ),
                centerLeft:
                    blockConfig.fillChar.repeat(
                        blockConfig.paddings.left.width
                    ),
                center:
                    blockConfig.fillChar.repeat(blockConfig.innerWidth),
                centerRight:
                    blockConfig.fillChar.repeat(
                        blockConfig.paddings.right.width
                    ),
                right:
                    blockConfig.borders.right.char.repeat(
                        blockConfig.borders.right.width
                    )
            },
            (partsList) => partsList.join("")
        );

        partLines.push(partLine);
    }

    return constructBlockPart(
        partLines,
        (lines) => lines.reduce((part, line) => part.concat(line), [])
    );
}