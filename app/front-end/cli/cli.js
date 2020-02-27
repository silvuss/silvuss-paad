const parseArgs = require("./parse-args").parseArgs;
const createBox = require("../../back-end3/box/create-box").createBox;
const createDiagram = require("../../back-end3/diagram/create-diagram").createDiagram;
const createGraphDiagram
    = require("../../back-end3/diagram/create-graph-diagram").createGraphDiagram;
const createGraph = require("../../back-end3/graph/create-graph").createGraph;
const createCell = require("../../back-end3/cell/create-cell").createCell;

// Providing configuration

// const data = "- Będzie się gniewał. - Nic mi się nie stanie.".match(/.{1,5}/g);
// const data = ['a b', 'c', 'd', 'e', 'f g h', 'i', 'j k', 'l m n o', 'p', ''];

// /**
//  * @type {import("../utils/types").boxConfig}
//  */
// const boxConfig = {
//     innerWidth: 5,
//     innerHeights: {
//         min: undefined,
//         max: undefined
//     },
//     border: {
//         width: 1,
//         char: "#"
//     },
//     padding: {
//         width: 1,
//         char: " "
//     },
//     overflowIndicator: "...",
//     fillChar: " "
// };

// /**
// * @type {import("../utils/types").diagramConfig}
// */
// const diagramConfig = {
//     width: 37,
//     fillChar: " ",
//     boxesSeparator: {
//         horizontal: {
//             size: 2
//         },
//         vertical: {
//             size: 2
//         }
//     }
// };

// /**
//  * @type {import("../utils/types").linkConfig}
//  */
// const linkConfig = {
//     fillChar: "*"
// }

// /**
//  * @type {import("../utils/types")}
//  */
// const graphConfig = undefined;
// {
//     separator: "-",
// };

const {
    boxConfig,
    diagramConfig,
    linkConfig,
    graphConfig,
    contents
}
    = parseArgs(
        process.argv.slice(2), (x) => x.startsWith("-"), (x) => x === "--"
    )
        .validateAndConvertArgs()
        .provideDefaultValues()
        .getConfig();

// Creating diagram

const diagram = (() => {
    if (graphConfig !== undefined) {
        const graph = createGraph(contents, graphConfig.separator);
        return createGraphDiagram(
            diagramConfig,
            graph,
            (content) =>
                createBox(boxConfig, content)
                    .wrap(
                        createCell(boxConfig.padding.char),
                        boxConfig.padding.width
                    )
                    .wrap(
                        createCell(boxConfig.border.char),
                        boxConfig.border.width
                    ),
            linkConfig
        )
    } else {
        return createDiagram(
            diagramConfig,
            contents,
            (content) =>
                createBox(boxConfig, content)
                    .wrap(
                        createCell(boxConfig.padding.char),
                        boxConfig.padding.width
                    )
                    .wrap(
                        createCell(boxConfig.border.char),
                        boxConfig.border.width
                    )
        );
    }
})();

// Displaying diagram

console.log(diagram.toString());