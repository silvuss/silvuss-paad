# Back-end design and architecture notes

## Functions – functions' specifications

**Note:** There are not covered within this list of functions' specifications any corner cases; e.g., there is not expressed what a function shall do when it received empty `array` in case of a parameter of type `array`, or empty `string` in case of a parameter of type `object`. Since this design has been written somewhat **after** the implementation, this does not seemed necessary.

- **Function `createBox`**

  - Return type: `box`

  - Parameters:
  
    Name|Type\*|Required?|Default value
    -|-|-|-
    `boxConfig`|`boxConfig`|Yes|(n/a)
    `content`|`string`|If `boxConfig` is provided\*\*, no; otherwise, it is not to be used|If `boxConfig` is provided, empty string; otherwise, it is not to be used

    \* _The type is expressed in terms of custom types or JavaScript built-in types._

    \*\* _There may arise some confusion from this statement in an implementation in, e.g., JavaScript. In JavaScript, parameter variables for which the corresponding arguments have not been given are assigned the `undefined` value. But, the implementator may want to assing this value to some variables (and/or parameter varaiables) in some other cases (as it will be then e.g. the most intuitive one). Generally the design shall be treated as describing the behavior of a function from the **domain (=theoretical) perspective**, not from the technology's (=language's, =implementation's) perspective. Therefore, it is up to the implementator how to model the design in particular technology/language in cases like this one._

- **Function `wrap`**

  - Return type: `box`

  - Parameters:

    Name|Type|Required?|Default value
    -|-|-|-
    `box`|`box`|Yes|(n/a)
    `cell`|`cell`|Yes|(n/a)
    `frameSize`|`number`|Yes|(n/a)

- **Function `createCell`**

  - Return type: `cell`

  - Parameters:

    Name|Type|Required?|Default value
    -|-|-|-
    `content`|`string`|Yes|(n/a)

- **Function `createDiagramBox`**

  - Return type: `diagramBox`

  - Parameters:

    Name|Type|Required?|Default value
    -|-|-|-
    `box`|`box`|Yes|(n/a)
    `position`|`position`|Yes|(n/a)

- **Function `createDiagram`**

  - Return type: `diagram`

  - Parameters:

    Name|Type|Required?|Default value
    -|-|-|-
    `diagramConfig`|`diagramConfig`|Yes|(n/a)
    `createBoxCallback`|`createBoxCallback`|Yes|(n/a)

- **Function `createGraphDiagram`**

  - Return type: `graphDiagram`

  - Parameters:

    Name|Type|Required?|Default value
    -|-|-|-
    `diagramConfig`|`diagramConfig`|Yes|(n/a)
    `graph`|`graph`|Yes|(n/a)
    `createBoxCallback`|`createBoxCallback`|Yes|(n/a)
    `linkConfig`|`linkConfig`|Yes|(n/a)

- **Function `traverse`**

  - Return type: list of `position`

  - Parameters:

    Name|Type|Required?|Default value
    -|-|-|-
    `startPosition`|`position`|Yes|(n/a)
    `moves`|list of `move`|Yes|(n/a)
    `isTargetPositionCallback`|`isTargetPositionCallback`|Yes|(n/a)
    `isPositionForbiddenCallback`|`isPositionForbiddenCallback`|No|A one-argument function returning false for any value of its argument

- **Function `createGraph`**

  - Return type: `graph`

  - Parameters:

    Name|Type|Required?|Default value
    -|-|-|-
    `rawGraphContents`|list of `string`|Yes|(n/a)
    `rawGraphContentSeparator`|`string`|If `rawGraphContents` is supplied, yes; otherwise, it is not to be used|(n/a)

- **Function `createPosition`**

  - Return type: `position`

  - Parameters:

    Name|Type|Required?|Default value
    -|-|-|-
    `x`|`number`|Yes|(n/a)
    `y`|`number`|Yes|(n/a)

