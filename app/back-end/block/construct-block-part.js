// To be invoked like
//  constructBlockPart(
//      blockPartLines,
//      (list) => list.reduce((result, currElem) => result.concat(currElem), [])
//  )
exports.constructBlockPart = function (lines, join) {
    return join(lines);
}