const constructBlockPartLine
    = require("./construct-block-part-line").constructBlockPartLine;
const constructBlockPart = require("./construct-block-part").constructBlockPart;

exports.createTopBlockPart = function (blockConfig) {
    // console.debug("createTopBlockPart -> blockConfig.innerWidth ===", blockConfig.innerWidth);
    // console.debug("createTopBlockPart -> blockConfig.borders.top.width ===", blockConfig.borders.top.width);

    const partLines = [];

    for (let i = 0; i < blockConfig.borders.top.width; ++i) {
        const partLine = constructBlockPartLine(
            {
                left:
                    blockConfig.widerThanHigher === true
                        ? blockConfig.borders.top.char.repeat(
                            blockConfig.borders.left.width
                        )
                        : blockConfig.borders.left.char.repeat(
                            blockConfig.borders.left.width
                        ),
                centerLeft:
                    blockConfig.borders.top.char.repeat(
                        blockConfig.paddings.left.width
                    ),
                center:
                    blockConfig.borders.top.char.repeat(blockConfig.innerWidth),
                centerRight:
                    blockConfig.borders.top.char.repeat(
                        blockConfig.paddings.right.width
                    ),
                right:
                    blockConfig.widerThanHigher === true
                        ? blockConfig.borders.top.char.repeat(
                            blockConfig.borders.right.width
                        )
                        : blockConfig.borders.right.char.repeat(
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