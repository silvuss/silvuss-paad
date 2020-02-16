// To be invoked like
//  constructBlockPartLine(
//      blockPartLineElements,
//      (list) => list.join()
//  )
exports.constructBlockPartLine = function (parts, join) {
    // console.debug("constructBlockPartLine: parts ===", parts);
    // console.debug("constructBlockPartLine: join ===", join);

    return join([
        parts.left,
        parts.centerLeft,
        parts.center,
        parts.centerRight,
        parts.right
    ]);
}