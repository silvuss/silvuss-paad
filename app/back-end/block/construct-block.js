// To be invoked like
//  constructBlock(
//      blockParts,
//      (list) => list.reduce((result, currElem) => result.concat(currElem), [])
//  )
exports.constructBlock = function (parts, join) {
    return join([
        parts.top,
        parts.middleTop,
        parts.middle,
        parts.middleBottom,
        parts.bottom
    ]);
}