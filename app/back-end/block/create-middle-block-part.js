const constructBlockPartLine
    = require("./construct-block-part-line").constructBlockPartLine;
const constructBlockPart = require("./construct-block-part").constructBlockPart;

exports.createMiddleBlockPart = function (blockConfig, content) {
    const partLines = [];

    let contentParts =
        (blockConfig.innerWidth === 0 || content.length === 0)
            ? []
            : content.match(
                // Probably it could be 0 instead of 1 to be more concise (?)
                //  and/or more intuitive (?) if JavaScript had a greedy version
                //  of the {n,m} quantifier (it has only a lazy version of it)
                new RegExp(`.{1,${blockConfig.innerWidth}}`, "g")
            );

    const overflow =
        blockConfig.innerHeights.min < contentParts.length
        && blockConfig.innerHeights.max < contentParts.length;

    if (overflow === true) {
        if (content.length - blockConfig.overflowIndicator.length
            < 0
            || blockConfig.innerWidth * blockConfig.innerHeights.max
            < blockConfig.overflowIndicator.length) {
            throw Error(`The given overflow signal string is too big to fit `
                + `in the block: ${blockConfig.overflowIndicator}`);
        }
        const contentToMax
            = content.substring(
                0,
                blockConfig.innerWidth * blockConfig.innerHeights.max
            );
        const newContent
            = contentToMax.substring(
                0,
                contentToMax.length
                - blockConfig.overflowIndicator.length
            ) + blockConfig.overflowIndicator;
        contentParts =
            newContent.match(
                new RegExp(`.{1,${blockConfig.innerWidth}}`, "g")
            );
    }

    const underflow =
        blockConfig.innerHeights.min > contentParts.length
        || (blockConfig.innerHeights.min < contentParts.length
            && blockConfig.innerHeights.max > contentParts.length);

    const contentHeight =
        (overflow === true) ? blockConfig.innerHeights.max : contentParts.length;

    const remainderHeight =
        (underflow === true)
            ? blockConfig.innerHeights.min - contentParts.length
            : 0;

    // Content lines without the last one
    for (let i = 0; i < contentHeight - 1; ++i) {
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
                center: contentParts[i],
                centerRight:
                    blockConfig.fillChar.repeat(
                        blockConfig.paddings.right.width
                    ),
                right:
                    blockConfig.borders.right.char.repeat(
                        blockConfig.borders.right.width
                    )
            },
            (partsList) => partsList.join(""));

        partLines.push(partLine);
    }

    // The last content line
    if (blockConfig.innerHeights.max > 0
        && contentParts.length > 0) {
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
                    contentParts[contentParts.length - 1]
                    + blockConfig.fillChar.repeat(
                        blockConfig.innerWidth
                        - contentParts[contentParts.length - 1].length
                    ),
                centerRight:
                    blockConfig.fillChar.repeat(
                        blockConfig.paddings.right.width
                    ),
                right:
                    blockConfig.borders.right.char.repeat(
                        blockConfig.borders.right.width
                    )
            },
            (partsList) => partsList.join(""));

        partLines.push(partLine);
    }

    // Remainder lines
    for (let i = 0; i < remainderHeight; ++i) {
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
                center: blockConfig.fillChar.repeat(blockConfig.innerWidth),
                centerRight:
                    blockConfig.fillChar.repeat(
                        blockConfig.paddings.right.width
                    ),
                right:
                    blockConfig.borders.right.char.repeat(
                        blockConfig.borders.right.width
                    )
            },
            (partsList) => partsList.join(""));

        partLines.push(partLine);
    }

    return constructBlockPart(
        partLines,
        (lines) => lines.reduce((part, line) => part.concat(line), [])
    );
}