const validationUtils = require("./validation-utils");

exports.splitArray = function (array, isSeparator) {
    try {
        if (Array.isArray(array) === false) {
            throw Error(`It is not an array: ${array}`);
        }

        if (validationUtils.isFunction(isSeparator) === false) {
            throw Error(`It is not a function: ${isSeparator}`);
        }

        const result = [];

        const lastSeparatorIndex = 0;
        while (true) {
            const arrayRest = array.slice(lastSeparatorIndex);
            const currSeparatorIndex =
                arrayRest.findIndex(elem => isSeparator(elem));

            if (currSeparatorIndex === -1) {
                result.push(arrayRest);
                break;
            } else {
                result.push(array.slice(0, currSeparatorIndex));
                lastSeparatorIndex = currSeparatorIndex;
            }
        }

        return result;
    } catch (e) {
        throw Error("splitArray: " + e.message);
    }
}

exports.joinElemsWithElems
    = function (encompassingElems, encompassedElems, join) {
        // console.debug("joinElemsWithElems: encompassingElems ===", encompassingElems);
        // console.debug("joinElemsWithElems: encompassedElems ===", encompassedElems);
        // console.debug("joinElemsWithElems: join ===", join);

        try {
            if (Array.isArray(encompassingElems) === false) {
                throw Error("It is not an array:", encompassingElems);
            }

            if (Array.isArray(encompassedElems) === false) {
                throw Error("It is not an array:", encompassedElems);
            }

            if (encompassingElems.length === 0
                && encompassedElems.length === 0) {
                return join([]);
            }

            if (encompassingElems.length - 1 !== encompassedElems.length) {
                throw Error(
                    `The arrays have their lengths incompatible with each `
                    + `other: ${encompassingElems.length}, `
                    + `${encompassedElems.length}`
                );
            }

            const result = [];

            for (let i = 0; i < encompassingElems.length - 1; ++i) {
                result.push(encompassingElems[i]);
                result.push(encompassedElems[i]);
            }
            result.push(encompassingElems[encompassingElems.length - 1]);

            return join(result);
        } catch (e) {
            throw Error("joinElemsWithElems: " + e.message);
        }
    };

exports.joinArrayWithArray
    = function (encompassingElems, encompassedElems, separator) {
        try {
            return module.exports.joinElemsWithElems(
                encompassingElems,
                encompassedElems,
                (result) =>
                    result.reduce((r, c) => r.concat(separator).concat(c))
            );
        } catch (e) {
            throw Error("joinArrayWithArray: " + e.message);
        }
    };

exports.joinStringsWithStrings
    = function (encompassingElems, encompassedElems, separator) {
        try {
            return module.exports.joinElemsWithElems(
                encompassingElems,
                encompassedElems,
                (result) =>
                    (result.length === 0)
                        ? ""
                        : result.reduce((r, c) => r + separator + c)
            );
        } catch (e) {
            throw Error("joinStringsWithStrings: " + e.message);
        }
    };