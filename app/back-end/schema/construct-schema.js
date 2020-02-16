// To be invoked like
//  constructSchema(
//      schemaRows,
//      (rows) => rows.reduce((schema, row) => schema.concat(row), [])
//  )
exports.constructSchema = function (rows, join) {
    // console.debug("constructSchema: rows ===", rows);
    // console.debug("constructSchema: join ===", join);

    return join(rows.encompassing, rows.encompassed);
}