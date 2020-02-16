exports.constructBlockPartLine = function (parts, join) {
    return join([
        parts.left,
        parts.centerLeft,
        parts.center,
        parts.centerRight,
        parts.right
    ]);
}