const errors = require("../../utils/errors");
const types = require("../../utils/types");

/**
 * Creates a graph.
 * @param {string[]} rawGraphContents An array of strings, of which each
 *  represents a raw graph content
 * @param {string} rawGraphContentSeparator A string that represents a separator
 *  between IDs and content in a string representing a raw graph content
 * @returns {import("../../utils/types").graph} The created graph
 */
exports.createGraph = function (rawGraphContents, rawGraphContentSeparator) {
    if (!types.isNaturalOrZero(arguments.length)) {
        throw errors.createUnexpectedArgumentsVariableTypeError();
    } else if (arguments.length < 2) {
        throw errors.createTooLittleArgumentsError(arguments.length);
    } else if (arguments.length > 2) {
        throw errors.createTooManyArgumentsError(arguments.length);
    }

    if (!Array.isArray(rawGraphContents)
        || !rawGraphContents.every((c) => types.isString(c))) {
        throw errors.createInvalidArgumentTypeError(rawGraphContents);
    }

    if (!types.isString(rawGraphContentSeparator)) {
        throw errors.createInvalidArgumentTypeError(rawGraphContentSeparator);
    }

    const rawGraphContentsParts
        = rawGraphContents.map((c) => c.split(rawGraphContentSeparator));

    const vertices = rawGraphContentsParts.map((c) => {
        return {
            id: types.parseIntOrThrow(c[0]),
            content: c[1],
            linkedVerticesIDs: c.slice(2).map((stringID) =>
                types.parseIntOrThrow(stringID)
            )
        };
    });

    /**
     * @type {import("../../utils/types").edge[]}
     */
    const edges = [];

    vertices.forEach((v) => {
        v.linkedVerticesIDs.forEach((id) => {
            const relatedVertex = vertices.find((x) => x.id === id);
            if (relatedVertex === undefined) {
                throw new Error(`No vertex with such an ID: ${id}`);
            } else {
                edges.push({
                    firstVertexID: id,
                    secondVertexID: relatedVertex.id
                });
            }
        });
    });

    return {
        vertices: vertices,
        edges: edges
    };
};