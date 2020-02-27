const errors = require("../../utils/errors");
const types = require("../../utils/types");

/**
 * @callback createBoxCallback
 * @param {string} content
 */

/**
 * Creates a graph diagram.
 * @param {import("../../utils/types").diagramConfig} diagramConfig
 * @param {import("../../utils/types").graph} graph
 * @param {createBoxCallback} createBoxCallback
 * @param {import("../../utils/types").linkConfig} linkConfig
 * @returns {import("../../utils/types").graphDiagram} The created graph diagram
 */
exports.createGraphDiagram = function (
    diagramConfig, graph, createBoxCallback, linkConfig
) {
    if (!types.isNaturalOrZero(arguments.length)) {
        throw errors.createUnexpectedArgumentsVariableTypeError();
    } else if (arguments.length < 4) {
        throw errors.createTooLittleArgumentsError(arguments.length);
    } else if (arguments.length > 4) {
        throw errors.createTooManyArgumentsError(arguments.length);
    }

    if (!types.isDiagramConfig(diagramConfig)) {
        throw errors.createInvalidArgumentTypeError(diagramConfig);
    }

    if (!types.isGraph(graph)) {
        throw errors.createInvalidArgumentTypeError(graph);
    }

    if (!types.isFunction(createBoxCallback)) {
        throw errors.createInvalidArgumentTypeError(createBoxCallback);
    }

    if (!types.isLinkConfig(linkConfig)) {
        throw errors.createInvalidArgumentTypeError(linkConfig);
    }

    const boxes = graph.vertices.map((c) => createBoxCallback(c.content));

    return {
        toString: () => ""
    };
}