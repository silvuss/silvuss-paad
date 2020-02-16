const constructSchemaRowLine
    = require("./construct-schema-row-line").constructSchemaRowLine;
const arrayUtils = require("../utils/array-utils");

exports.createSchemaRowLine = function (encompassingParts, encompassedParts) {
    // console.debug("createSchemaRowLine:");

    return constructSchemaRowLine(
        {
            encompassing: encompassingParts,
            encompassed: encompassedParts
        },
        (encompassing, encompassed) =>
            arrayUtils.joinStringsWithStrings(encompassing, encompassed, "")
    )
}