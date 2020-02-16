const process = require("process");
const parseArgsList = require("./parse-args").parseArgsList;
const createBlock = require("../back-end2/block/create-block").createBlock;
const createSchema = require("../back-end2/schema/create-schema").createSchema;

const {
    contentBlockConfig,
    separatorBlockConfig,
    contents,
    schemaConfig
} = parseArgsList(
    process.argv.slice(2),
    (x) => x.startsWith("-"),
    (x) => x === "--"
).validateAndConvertArgs()
    .provideDefaultValues()
    .getConfig();

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max#Getting_the_maximum_element_of_an_array
const maxContentLength = contents
    .map((x) => x.length)
    .reduce((x, y) => Math.max(x, y));

const contentRowContentBlocks = contents.map(content =>
    createBlock(contentBlockConfig, content, maxContentLength)
);

const schema = createSchema(
    contentRowContentBlocks, separatorBlockConfig, schemaConfig
);

console.log(schema);