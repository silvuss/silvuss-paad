const validation = require("./validation");
const constructBlockLine = require("./construct-block-line").constructBlockLine;

/**
 * @typedef {object} blockConfig
 * @property {object} blockConfig.sizesConfig
 * @property {number} blockConfig.sizesConfig.outerWidth integer, >= 0
 * @property {number} blockConfig.sizesConfig.minOuterHeight integer, >= 0
 * @property {number} blockConfig.sizesConfig.maxOuterHeight integer, >= 0, >= minOuterHeight
 * @property {object} blockConfig.bordersConfig
 * @property {object} blockConfig.bordersConfig.widths
 * @property {object} blockConfig.bordersConfig.widths.top integer, >= 0
 * @property {object} blockConfig.bordersConfig.widths.right integer, >= 0
 * @property {object} blockConfig.bordersConfig.widths.bottom integer, >= 0
 * @property {object} blockConfig.bordersConfig.widths.left integer, >= 0
 * @property {object} blockConfig.bordersConfig.chars
 * @property {object} blockConfig.bordersConfig.chars.top length < 2
 * @property {object} blockConfig.bordersConfig.chars.right length < 2
 * @property {object} blockConfig.bordersConfig.chars.bottom length < 2
 * @property {object} blockConfig.bordersConfig.chars.left length < 2
 * @property {object} blockConfig.bordersConfig.horizontalBordersCharShift one of "none", "up", "bottom"
 * @property {object} blockConfig.paddingsConfig
 * @property {object} blockConfig.paddingsConfig.widths
 * @property {number} blockConfig.paddingsConfig.widths.top integer, >= 0
 * @property {number} blockConfig.paddingsConfig.widths.right integer, >= 0
 * @property {number} blockConfig.paddingsConfig.widths.bottom integer, >= 0
 * @property {number} blockConfig.paddingsConfig.widths.left integer, >= 0
 * @property {string} blockConfig.insideChar length < 2
 * @property {boolean} blockConfig.widerThanHigher
 */

/**
 * @typedef {object} contentConfig 
 * @property {string} content
 */

/**
 * Validates a blockConfig object.
 * @param {blockConfig} blockConfig 
 */
function validateBlockConfig(blockConfig) {
	if (validation.types.isObject(blockConfig) === false) {
		throw Error("blockConfig === " + blockConfig);
	}

	if (validation.types.isObject(blockConfig.sizesConfig) === false) {
		throw Error("blockConfig.sizesConfig === " + blockConfig.sizesConfig);
	}

	if (validation.domain.isSize(blockConfig.sizesConfig.outerWidth)
		=== false) {
		throw Error("blockConfig.sizesConfig.outerWidth === "
			+ blockConfig.sizesConfig.outerWidth);
	}

	if (validation.domain.isSize(blockConfig.sizesConfig.minOuterHeight)
		=== false) {
		throw Error("blockConfig.sizesConfig.minOuterHeight === "
			+ blockConfig.sizesConfig.minOuterHeight);
	}

	if (validation.domain.isSize(blockConfig.sizesConfig.maxOuterHeight)
		=== false) {
		throw Error("blockConfig.sizesConfig.maxOuterHeight === "
			+ blockConfig.sizesConfig.maxOuterHeight);
	}

	if (blockConfig.sizesConfig.maxOuterHeight <
		blockConfig.sizesConfig.minOuterHeight) {
		throw Error(
			"blockConfig.sizesConfig.maxOuterHeight <" +
			"blockConfig.sizesConfig.minOuterHeight"
		);
	}

	if (validation.types.isObject(blockConfig.bordersConfig) === false) {
		throw Error("blockConfig.bordersConfig === "
			+ blockConfig.bordersConfig);
	}

	if (validation.types.isObject(blockConfig.bordersConfig.widths) === false) {
		throw Error("blockConfig.bordersConfig.widths === "
			+ blockConfig.bordersConfig.widths);
	}

	if (validation.domain.isSize(blockConfig.bordersConfig.widths.top)
		=== false) {
		throw Error("blockConfig.bordersConfig.widths.top === "
			+ blockConfig.bordersConfig.widths.top);
	}

	if (validation.domain.isSize(blockConfig.bordersConfig.widths.right)
		=== false) {
		throw Error("blockConfig.bordersConfig.widths.right === "
			+ blockConfig.bordersConfig.widths.right);
	}

	if (validation.domain.isSize(blockConfig.bordersConfig.widths.bottom)
		=== false) {
		throw Error("blockConfig.bordersConfig.widths.bottom === "
			+ blockConfig.bordersConfig.widths.bottom);
	}

	if (validation.domain.isSize(blockConfig.bordersConfig.widths.left)
		=== false) {
		throw Error("blockConfig.bordersConfig.widths.left === "
			+ blockConfig.bordersConfig.widths.left);
	}

	if (validation.types.isObject(blockConfig.bordersConfig.chars) === false) {
		throw Error("blockConfig.bordersConfig.chars === "
			+ blockConfig.bordersConfig.chars);
	}

	if (validation.domain.isProperChar(blockConfig.bordersConfig.chars.top)
		=== false
		&& blockConfig.bordersConfig.chars.top !== "") {
		throw Error(
			"blockConfig.bordersConfig.chars.top === "
			+ blockConfig.bordersConfig.chars.top
		);
	}

	if (validation.domain.isProperChar(blockConfig.bordersConfig.chars.right)
		=== false
		&& blockConfig.bordersConfig.chars.top !== "") {
		throw Error(
			"blockConfig.bordersConfig.chars.right === "
			+ blockConfig.bordersConfig.chars.right
		);
	}

	if (validation.domain.isProperChar(blockConfig.bordersConfig.chars.bottom)
		=== false
		&& blockConfig.bordersConfig.chars.top !== "") {
		throw Error(
			"blockConfig.bordersConfig.chars.bottom === "
			+ blockConfig.bordersConfig.chars.bottom
		);
	}

	if (validation.domain.isProperChar(blockConfig.bordersConfig.chars.left)
		=== false
		&& blockConfig.bordersConfig.chars.top !== "") {
		throw Error(
			"blockConfig.bordersConfig.chars.left === "
			+ blockConfig.bordersConfig.chars.left
		);
	}

	if (validation.domain.isHorizontalBordersCharShift(
		blockConfig.bordersConfig.horizontalBordersCharShift
	) === false) {
		throw Error("blockConfig.bordersConfig.horizontalBordersCharShift === "
			+ blockConfig.bordersConfig.horizontalBordersCharShift);
	}

	if (validation.types.isObject(blockConfig.paddingsConfig) === false) {
		throw Error("blockConfig.paddingsConfig === "
			+ blockConfig.paddingsConfig);
	}

	if (validation.types.isObject(blockConfig.paddingsConfig.widths)
		=== false) {
		throw Error("blockConfig.paddingsConfig.widths === "
			+ blockConfig.paddingsConfig.widths);
	}

	if (validation.domain.isSize(blockConfig.paddingsConfig.widths.top)
		=== false) {
		throw Error("blockConfig.paddingsConfig.widths.top === "
			+ blockConfig.paddingsConfig.widths.top);
	}

	if (validation.domain.isSize(blockConfig.paddingsConfig.widths.right)
		=== false) {
		throw Error("blockConfig.paddingsConfig.widths.right === "
			+ blockConfig.paddingsConfig.widths.right);
	}

	if (validation.domain.isSize(blockConfig.paddingsConfig.widths.bottom)
		=== false) {
		throw Error("blockConfig.paddingsConfig.widths.bottom === "
			+ blockConfig.paddingsConfig.widths.bottom);
	}

	if (validation.domain.isSize(blockConfig.paddingsConfig.widths.left)
		=== false) {
		throw Error("blockConfig.paddingsConfig.widths.left === "
			+ blockConfig.paddingsConfig.widths.left);
	}

	if (validation.domain.isProperChar(blockConfig.insideChar) === false) {
		throw Error(`blockConfig.insideChar === '${blockConfig.insideChar}'`);
	}

	if (blockConfig.bordersConfig.widths.top
		+ blockConfig.paddingsConfig.widths.top
		+ blockConfig.paddingsConfig.widths.bottom
		+ blockConfig.bordersConfig.widths.bottom
		> blockConfig.sizesConfig.maxOuterHeight) {
		throw Error(
			"The total size of relevant borders' widths and paddings " +
			"is bigger than the declared blocks's maximum height"
		);
	}

	if (blockConfig.bordersConfig.widths.right
		+ blockConfig.paddingsConfig.widths.right
		+ blockConfig.paddingsConfig.widths.left
		+ blockConfig.bordersConfig.widths.left
		> blockConfig.sizesConfig.outerWidth) {
		throw Error(
			"The total size of relevant borders' widths and paddings " +
			"is bigger than the declared blocks's width"
		);
	}
}

/**
 * Validates a contentConfig object.
 * @param {contentConfig} contentConfig
 */
function validateContentConfig(contentConfig) {
	if (validation.types.isObject(contentConfig) === false) {
		throw Error("contentConfig === " + contentConfig);
	}

	if (validation.types.isString(contentConfig.content) === false) {
		throw Error("contentConfig.content === " + contentConfig.content);
	}
}

/**
 * Constructs a block.
 * @param {blockConfig} blockConfig
 * @param {contentConfig} contentConfig
 * @returns {string} a string representing the constructed block
 */
exports.constructBlock = function (blockConfig, contentConfig) {
	console.debug(`blockConfig.sizesConfig === `, blockConfig.sizesConfig);
	console.debug(`blockConfig.insideChar === "${blockConfig.insideChar}"`);

	validateBlockConfig(blockConfig); // throws in case of an error
	validateContentConfig(contentConfig); // throws in case of an error

	const block = ((blockConfig, contentConfig) => {
		let _block = [];

		let isTopBorderEncompassed = undefined;
		let isBottomBorderEncompassed = undefined;

		switch (blockConfig.bordersConfig.horizontalBordersCharShift) {
			case "top":
				isTopBorderEncompassed = true;
				isBottomBorderEncompassed = false;
				break;
			case "bottom":
				isTopBorderEncompassed = false;
				isBottomBorderEncompassed = true;
				break;
			case "none":
				if (blockConfig.widerThanHigher === true) {
					isTopBorderEncompassed = false;
					isBottomBorderEncompassed = false;
				} else {
					isTopBorderEncompassed = true;
					isBottomBorderEncompassed = true;
				}
				break;
		}

		// Construct the top border

		const topBorderLines = (
			(blockConfig) => {
				const _topBorderLines = [];

				for (let i = 0; i < blockConfig.bordersConfig.widths.top; ++i) {
					const line = constructBlockLine({
						left: {
							char: (isTopBorderEncompassed === true)
								? blockConfig.bordersConfig.chars.left
								: blockConfig.bordersConfig.chars.top,
							width: blockConfig.bordersConfig.widths.left
						},
						middleLeft: {
							char: blockConfig.bordersConfig.chars.top,
							width: blockConfig.paddingsConfig.widths.left
						},
						middle: {
							string:
								blockConfig.bordersConfig.chars.top.repeat(
									blockConfig.sizesConfig.outerWidth
									- blockConfig.bordersConfig.widths.left
									- blockConfig.bordersConfig.widths.right
									- blockConfig.paddingsConfig.widths.left
									- blockConfig.paddingsConfig.widths.right
								)
						},
						middleRight: {
							char: blockConfig.bordersConfig.chars.top,
							width: blockConfig.paddingsConfig.widths.right
						},
						right: {
							char: (isTopBorderEncompassed === true)
								? blockConfig.bordersConfig.chars.right
								: blockConfig.bordersConfig.chars.top,
							width: blockConfig.bordersConfig.widths.right
						}
					});

					_topBorderLines.push(line);
				}

				return _topBorderLines;
			}
		)(blockConfig);

		// Construct the top padding middle lines

		const topPaddingMiddleLines = (
			(blockConfig) => {
				const topPaddingMiddleLines = [];

				for (let i = 0;
					i < blockConfig.paddingsConfig.widths.top;
					++i) {
					const line = constructBlockLine({
						left: {
							char: blockConfig.bordersConfig.chars.left,
							width: blockConfig.bordersConfig.widths.left
						},
						middleLeft: {
							char: blockConfig.insideChar,
							width: blockConfig.paddingsConfig.widths.left
						},
						middle: {
							string:
								blockConfig.insideChar.repeat(
									blockConfig.sizesConfig.outerWidth
									- blockConfig.bordersConfig.widths.left
									- blockConfig.bordersConfig.widths.right
									- blockConfig.paddingsConfig.widths.left
									- blockConfig.paddingsConfig.widths.right
								)
						},
						middleRight: {
							char: blockConfig.insideChar,
							width: blockConfig.paddingsConfig.widths.right
						},
						right: {
							char: blockConfig.bordersConfig.chars.right,
							width: blockConfig.bordersConfig.widths.right
						}
					});

					topPaddingMiddleLines.push(line);
				}

				return topPaddingMiddleLines;
			}
		)(blockConfig);

		// Construct the content and remainder middle lines

		const middleLines = (
			(blockConfig, contentConfig) => {
				const _middleLines = [];

				const declaredBlockInsideWidth =
					blockConfig.sizesConfig.outerWidth
					- blockConfig.bordersConfig.widths.left
					- blockConfig.paddingsConfig.widths.left
					- blockConfig.paddingsConfig.widths.right
					- blockConfig.bordersConfig.widths.right;

				// const declaredBlockInsideHeight =
				// 	blockConfig.sizesConfig.outerHeight
				// 	- blockConfig.bordersConfig.widths.top
				// 	- blockConfig.paddingsConfig.widths.top
				// 	- blockConfig.paddingsConfig.widths.bottom
				// 	- blockConfig.bordersConfig.widths.bottom;

				const minDeclaredBlockInsideHeight =
					blockConfig.sizesConfig.minOuterHeight
					- blockConfig.bordersConfig.widths.top
					- blockConfig.paddingsConfig.widths.top
					- blockConfig.paddingsConfig.widths.bottom
					- blockConfig.bordersConfig.widths.bottom;

				const maxDeclaredBlockInsideHeight =
					blockConfig.sizesConfig.maxOuterHeight
					- blockConfig.bordersConfig.widths.top
					- blockConfig.paddingsConfig.widths.top
					- blockConfig.paddingsConfig.widths.bottom
					- blockConfig.bordersConfig.widths.bottom;

				if (maxDeclaredBlockInsideHeight > 0) {
					const contentParts = (contentConfig.content === ""
						|| declaredBlockInsideWidth === 0)
						// There must be explicitly assigned [] because string.match
						//	returns null in case of no matches
						? []
						: contentConfig.content.match(
							new RegExp(`.{1,${declaredBlockInsideWidth}}`, "g")
						);

					// minHeight > contentHeight	&& maxHeight whatever			-> remainder lines	-> contentLinesNumber = content.length
					// minHeight = contentHeight	&& maxHeight whatever			-> fit				-> contentLinesNumber = content.length
					// minHeight < contentHeight	&& maxHeight < contentHeight	-> overflow			-> contentLinesNumber = maxHeight
					// minHeight < contentHeight	&& maxHeight = contentHeight	-> fit				-> contentLinesNumber = content.length
					// minHeight < contentHeight	&& maxHeight > contentHeight	-> remainder lines	-> contentLinesNumber = content.length

					const overflow =
						minDeclaredBlockInsideHeight < contentParts.length
						&& maxDeclaredBlockInsideHeight
						< contentParts.length;

					const underflow =
						minDeclaredBlockInsideHeight > contentParts.length
						|| (minDeclaredBlockInsideHeight < contentParts.length
							&& maxDeclaredBlockInsideHeight > contentParts.length);

					if (contentParts.length !== 0) {
						const contentMiddleLinesNumber =
							(overflow === true
								? maxDeclaredBlockInsideHeight
								: contentParts.length);

						for (let i = 0; i < contentMiddleLinesNumber - 1; ++i) {
							const line = constructBlockLine({
								left: {
									char: blockConfig.bordersConfig.chars.left,
									width: blockConfig.bordersConfig.widths.left
								},
								middleLeft: {
									char: blockConfig.insideChar,
									width: blockConfig.paddingsConfig.widths.left
								},
								middle: {
									string: contentParts[i]
								},
								middleRight: {
									char: blockConfig.insideChar,
									width: blockConfig.paddingsConfig.widths.right
								},
								right: {
									char: blockConfig.bordersConfig.chars.right,
									width: blockConfig.bordersConfig.widths.right
								}
							});

							_middleLines.push(line);
						}

						const overflowSignalString = "...";

						console.debug(`contentParts, maxDeclaredBlockInsideHeight - 1 === `, contentParts, ` `, maxDeclaredBlockInsideHeight - 1);

						const lastContentLine =
							constructBlockLine({
								left: {
									char: blockConfig.bordersConfig.chars.left,
									width: blockConfig.bordersConfig.widths.left
								},
								middleLeft: {
									char: blockConfig.insideChar,
									width: blockConfig.paddingsConfig.widths.left
								},
								middle: {
									string:
										(overflow === true
											? contentParts[maxDeclaredBlockInsideHeight - 1]
												.substr(0, contentParts[maxDeclaredBlockInsideHeight - 1].length - overflowSignalString.length)
											+ overflowSignalString
											: contentParts[contentParts.length - 1]
											+ blockConfig.insideChar
												.repeat(declaredBlockInsideWidth
													- contentParts[contentParts.length - 1].length))
								},
								middleRight: {
									char: blockConfig.insideChar,
									width: blockConfig.paddingsConfig.widths.right
								},
								right: {
									char: blockConfig.bordersConfig.chars.right,
									width: blockConfig.bordersConfig.widths.right
								}
							});

						_middleLines.push(lastContentLine);
					}

					// Construct the remainder middle lines

					console.log(`underflow === `, underflow);

					const remainderMiddleLinesNumber =
						(underflow === true
							? minDeclaredBlockInsideHeight - contentParts.length
							: 0);

					for (let i = 0; i < remainderMiddleLinesNumber; ++i) {
						const line = constructBlockLine({
							left: {
								char: blockConfig.bordersConfig.chars.left,
								width: blockConfig.bordersConfig.widths.left
							},
							middleLeft: {
								char: blockConfig.insideChar,
								width: blockConfig.paddingsConfig.widths.left
							},
							middle: {
								string:
									blockConfig.insideChar.repeat(
										blockConfig.sizesConfig.outerWidth
										- blockConfig.bordersConfig.widths.left
										- blockConfig.bordersConfig.widths.right
										- blockConfig.paddingsConfig.widths.left
										- blockConfig.paddingsConfig.widths.right
									)
							},
							middleRight: {
								char: blockConfig.insideChar,
								width: blockConfig.paddingsConfig.widths.right
							},
							right: {
								char: blockConfig.bordersConfig.chars.right,
								width: blockConfig.bordersConfig.widths.right
							}
						});

						_middleLines.push(line);
					}
				}

				return _middleLines;
			}
		)(blockConfig, contentConfig);

		// Construct the bottom padding middle lines

		const bottomPaddingMiddleLines = (
			(blockConfig) => {
				const _bottomPaddingMiddleLines = [];

				for (let i = 0;
					i < blockConfig.paddingsConfig.widths.bottom;
					++i) {
					const line = constructBlockLine({
						left: {
							char: blockConfig.bordersConfig.chars.left,
							width: blockConfig.bordersConfig.widths.left
						},
						middleLeft: {
							char: blockConfig.insideChar,
							width: blockConfig.paddingsConfig.widths.left
						},
						middle: {
							string:
								blockConfig.insideChar.repeat(
									blockConfig.sizesConfig.outerWidth
									- blockConfig.bordersConfig.widths.left
									- blockConfig.bordersConfig.widths.right
									- blockConfig.paddingsConfig.widths.left
									- blockConfig.paddingsConfig.widths.right
								)
						},
						middleRight: {
							char: blockConfig.insideChar,
							width: blockConfig.paddingsConfig.widths.right
						},
						right: {
							char: blockConfig.bordersConfig.chars.right,
							width: blockConfig.bordersConfig.widths.right
						}
					});

					_bottomPaddingMiddleLines.push(line);
				}

				return _bottomPaddingMiddleLines;
			}
		)(blockConfig);

		// Construct the bottom border

		const bottomBorderLines = (
			(blockConfig) => {
				const _bottomBorderLines = [];

				for (let i = 0;
					i < blockConfig.bordersConfig.widths.bottom;
					++i) {
					const line = constructBlockLine({
						left: {
							char: (isBottomBorderEncompassed === true)
								? blockConfig.bordersConfig.chars.left
								: blockConfig.bordersConfig.chars.bottom,
							width: blockConfig.bordersConfig.widths.left
						},
						middleLeft: {
							char: blockConfig.bordersConfig.chars.bottom,
							width: blockConfig.paddingsConfig.widths.left
						},
						middle: {
							string:
								blockConfig.bordersConfig.chars.bottom.repeat(
									blockConfig.sizesConfig.outerWidth
									- blockConfig.bordersConfig.widths.left
									- blockConfig.bordersConfig.widths.right
									- blockConfig.paddingsConfig.widths.left
									- blockConfig.paddingsConfig.widths.right
								)
						},
						middleRight: {
							char: blockConfig.bordersConfig.chars.bottom,
							width: blockConfig.paddingsConfig.widths.right
						},
						right: {
							char: (isBottomBorderEncompassed === true)
								? blockConfig.bordersConfig.chars.right
								: blockConfig.bordersConfig.chars.bottom,
							width: blockConfig.bordersConfig.widths.right
						}
					});

					_bottomBorderLines.push(line);
				}

				return _bottomBorderLines;
			}
		)(blockConfig);

		return _block
			.concat(topBorderLines)
			.concat(topPaddingMiddleLines)
			.concat(middleLines)
			.concat(bottomPaddingMiddleLines)
			.concat(bottomBorderLines)
	})(blockConfig, contentConfig);

	console.log(`block === `, block);
	console.log();

	return block;
}