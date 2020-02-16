exports.constructSchema = function (rows, join) {
    return join(rows.encompassing, rows.encompassed);
}