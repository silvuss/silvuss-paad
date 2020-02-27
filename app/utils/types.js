const errors = require("./errors");

/**
 * @param {any} x 
 */
const getType = (x) => Object.prototype.toString.call(x);

/**
 * @param {any} x 
 */
exports.isObject = (x) => getType(x).includes("Object");

/**
 * @param {any} x 
 */
exports.isArray = (x) => getType(x).includes("Array");

/**
 * @param {any} x 
 */
exports.isNumber = (x) => getType(x).includes("Number");

/**
 * @param {any} x 
 */
exports.isBoolean = (x) => getType(x).includes("Boolean");

/**
 * @param {any} x 
 */
exports.isString = (x) => getType(x).includes("String");

/**
 * @param {any} x 
 */
exports.isFunction = (x) => getType(x).includes("Function");

/**
 * @typedef {number} naturalOrZero
 */

/**
 * @param {any} x
 */
exports.isNaturalOrZero = (x) =>
    module.exports.isNumber(x)
    && !Number.isNaN(x)
    && Number.isFinite(x)
    && Number.isInteger(x)
    && x >= 0;

/**
 * @typedef {number} size
 */

/**
 * @param {any} x 
 */
exports.isSize = (x) =>
    module.exports.isNumber(x)
    && !Number.isNaN(x)
    && Number.isFinite(x)
    && Number.isInteger(x)
    && x >= 0;

/**
 * @typedef {string} char
 */

/**
 * @typedef {number} ID
 */

/**
 * @param {any} x 
 */
exports.isID = (x) =>
    module.exports.isNumber(x)
    && !Number.isNaN(x)
    && Number.isFinite(x)
    && Number.isInteger(x)
    && x >= 0;

/**
* @param {any} x 
*/
exports.isChar = (x) => module.exports.isString(x) && x.length === 1;

/**
 * @typedef {object} arg
 * @property {string} name
 * @property {any[]} values
 */

/**
 * @param {any} x
 */
exports.isArg = (x) =>
    module.exports.isObject(x)
    && module.exports.isString(x.name)
    && Array.isArray(x.values);

/**
 * @typedef {object} vertex
 * @property {ID} id
 * @property {string} content
 */

/**
 * @param {any} x
 */
exports.isVertex = (x) =>
    module.exports.isObject(x)
    && module.exports.isNumber(x.id)
    && module.exports.isString(x.content);

/**
 * @typedef {object} edge
 * @property {ID} firstVertexID
 * @property {ID} secondVertexID
 */

/**
 * @param {any} x
 */
exports.isEdge = (x) =>
    module.exports.isObject(x)
    && module.exports.isNumber(x.firstVertexID)
    && module.exports.isNumber(x.secondVertexID);

/**
 * @typedef {object} graph
 * @property {vertex[]} vertices
 * @property {edge[]} edges
 */

/**
 * @param {any} x
 */
exports.isGraph = (x) =>
    module.exports.isObject(x)
    && Array.isArray(x.vertices)
    && x.vertices.every(
        /**
         * @param {any} v
         */
        (v) => module.exports.isVertex(v)
    )
    && Array.isArray(x.edges)
    && x.edges.every(
        /**
         * @param {any} e
         */
        (e) => module.exports.isEdge(e)
    );

/**
 * @typedef {object} cell
 * @property {char|""} content
 */

/**
 * @param {any} x
 */
exports.isCell = (x) =>
    module.exports.isObject(x)
    && (x.content === "" || module.exports.isChar(x.content));

/**
 * @callback wrap
 * @param {cell} cell
 * @param {size} frameSize
 */

/**
 * @param {any} x
 */
exports.isWrap = (x) => module.exports.isFunction(x);

/**
 * @callback toString
 */

/**
 * @param {any} x
 */
exports.isToString = (x) => module.exports.isFunction(x);

/**
 * @typedef {object} box
 * @property {cell[][]} data
 * @property {size} width
 * @property {size} height
 * @property {wrap} wrap
 * @property {function} toString
 */

/**
 * @param {any} x
 */
exports.isBox = (x) =>
    module.exports.isObject(x)
    && Array.isArray(x.data)
    && x.data.every(
        /**
         * @param {any} d
         */
        (d) =>
            Array.isArray(d)
            && d.every(
                /**
                 * @param {any} dd
                 */
                (dd) => module.exports.isCell(dd)
            )
    )
    && module.exports.isSize(x.width)
    && module.exports.isSize(x.height)
    && module.exports.isWrap(x.wrap);

/**
 * @typedef {object} link Links must exist outside of any box (so that the boxes
 *  do not contain them in any way) because it is not distinguishable
 *  which of two linked boxes "has the link between them more"
 * @property {ID} firstBoxID
 * @property {ID} secondBoxID
 * @property {cell} fillCell
 */

/**
 * @param {any} x
 */
exports.isLink = (x) =>
    module.exports.isObject(x)
    && module.exports.isNumber(x.firstBoxID)
    && module.exports.isNumber(x.secondBoxID)
    && module.exports.isCell(x.fillCell);

/**
 * @typedef {number} coordinate
 */

/**
 * @param {any} x
 */
exports.isCoordinate = (x) => module.exports.isNumber(x);

/**
 * @typedef {object} position
 * @property {coordinate} x
 * @property {coordinate} y
 */

/**
 * @param {any} x
 */
exports.isPosition = (x) =>
    module.exports.isObject(x)
    && module.exports.isCoordinate(x.x)
    && module.exports.isCoordinate(x.y);

/**
 * @typedef {object} diagramBox
 * @property {box} box
 * @property {position} position
 */

/**
 * @param {any} x
 */
exports.isDiagramBox = (x) =>
    module.exports.isObject(x)
    && module.exports.isBox(x.box)
    && module.exports.isPosition(x.position);

/**
 * @typedef {object} diagram
 * @property {function} toString
 */

/**
 * @param {any} x
 */
exports.isDiagram = (x) =>
    module.exports.isObject(x)
    && module.exports.isToString(x.toString);

/**
 * @typedef {object} graphDiagram
 * @property {function} toString
 */

/**
 * @param {any} x
 */
exports.isGraphDiagram = (x) =>
    module.exports.isObject(x)
    && module.exports.isToString(x.toString);

/**
 * @typedef {object} move
 * @property {object} base
 * @property {ID} base.id
 * @property {function} base.perform
 * @property {ID} steppingBackMoveID
 */

/**
 * @param {any} x
 */
exports.isMove = (x) =>
    module.exports.isObject(x)
    && module.exports.isObject(x.base)
    && module.exports.isNumber(x.base.id)
    && module.exports.isFunction(x.base.perform)
    && module.exports.isNumber(x.steppingBackMoveID);

/**
 * @typedef {object} step
 * @property {position} comeFrom
 * @property {move} moveThatLed
 * @property {position} position
 */

/**
 * @param {any} x
 */
exports.isStep = (x) =>
    module.exports.isObject(x)
    && module.exports.isPosition(x.comeFrom)
    && module.exports.isMove(x.moveThatLed)
    && module.exports.isPosition(x.position);

/**
 * @typedef {step[]} path
 */

/**
 * @param {any} x
 */
exports.isPath = (x) =>
    Array.isArray(x)
    && x.every(
        /**
         * @param {any} s
         */
        (s) => module.exports.isStep(s)
    );

/**
 * @typedef {object} forbiddenMove
 * @property {position} from
 * @property {position} to
 */

/**
 * @param {any} x
 */
exports.isForbiddenMove = (x) =>
    module.exports.isObject(x)
    && module.exports.isPosition(x.from)
    && module.exports.isPosition(x.to);

/**
 * @typedef {object} boxConfig
 * @property {size} innerWidth
 * @property {object} innerHeights
 * @property {size} innerHeights.min
 * @property {size} innerHeights.max and >= innerHeights.min
 * @property {object} border
 * @property {size} border.width
 * @property {char} border.char
 * @property {object} padding
 * @property {size} padding.width
 * @property {char} padding.char
 * @property {string} overflowIndicator
 * @property {char} fillChar
 */

/**
 * @param {any} x
 */
exports.isBoxConfig = (x) =>
    module.exports.isObject(x)
    && module.exports.isSize(x.innerWidth)
    && module.exports.isObject(x.innerHeights)
    && (x.innerHeights.min === undefined
        || x.innerHeights.max === undefined
        || (module.exports.isSize(x.innerHeights.min)
            && module.exports.isSize(x.innerHeights.max)
            && x.innerHeights.max >= x.innerHeights.min))
    && module.exports.isObject(x.border)
    && module.exports.isSize(x.border.width)
    && (x.border.char === "" || module.exports.isChar(x.border.char))
    && module.exports.isObject(x.padding)
    && module.exports.isSize(x.padding.width)
    && (x.padding.char === "" || module.exports.isChar(x.padding.char))
    && module.exports.isString(x.overflowIndicator)
    && module.exports.isChar(x.fillChar);

/**
 * @typedef {object} diagramConfig
 * @property {size} width
 * @property {char} fillChar
 * @property {object} boxesSeparator
 * @property {object} boxesSeparator.horizontal
 * @property {size} boxesSeparator.horizontal.size
 * @property {object} boxesSeparator.vertical
 * @property {size} boxesSeparator.vertical.size
 */

/**
 * @param {any} x
 */
exports.isDiagramConfig = (x) =>
    module.exports.isObject(x)
    && module.exports.isSize(x.width)
    && module.exports.isChar(x.fillChar)
    && module.exports.isObject(x.boxesSeparator)
    && module.exports.isObject(x.boxesSeparator.horizontal)
    && module.exports.isSize(x.boxesSeparator.horizontal.size)
    && module.exports.isObject(x.boxesSeparator.vertical)
    && module.exports.isSize(x.boxesSeparator.vertical.size);


/**
 * @typedef {object} linkConfig
 * @property {char|""} fillChar
 */

/**
 * @param {any} x
 */
exports.isLinkConfig = (x) =>
    module.exports.isObject(x)
    && (x.fillChar === "" || module.exports.isChar(x.fillChar));

/**
 * @typedef {object} graphConfig
 * @property {string} separator
 */

/**
 * @param {any} x
 */
exports.isGraphConfig = (x) =>
    module.exports.isObject(x)
    && module.exports.isString(x.separator);

/**
* @param {any} x 
*/
exports.parseIntOrThrow = (x) => {
    const parsed = Number.parseInt(x);
    if (Number.isNaN(parsed)) {
        throw errors.createNotANumberError(x);
    }
    return parsed;
};