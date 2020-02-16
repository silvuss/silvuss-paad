exports.constructBlock = function (parts, join) {
    return join([
        parts.top,
        parts.middleTop,
        parts.middle,
        parts.middleBottom,
        parts.bottom
    ]);
}