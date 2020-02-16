exports.constructSchemaRowLine = function (parts, join) {
    // console.debug("constructSchemaRowPartLine: parts ===", parts);
    // console.debug("constructSchemaRowPartLine: join ===", join);

    return join(parts.encompassing, parts.encompassed);
}