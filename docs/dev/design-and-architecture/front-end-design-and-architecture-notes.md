# Front-end design and architecture notes

## Functions – functions' specifications

- **Function `parseArgs`**

  - Return type: `object`; the returned object shall include only one property – the function `validateAndConvertArgs`

  - Parameters:

    Name|Type|Required?|Default value
    -|-|-|-
    `argsList`|list of `string`|Yes|(n/a)
    `isParamNameCallback`|`isParamNameCallback`|If `argsList` is provided, yes; otherwise, it is not to be used|(n/a)
    `isContentSeparatorCallback`|`isContentSeparatorCallback`|If `argsList` is provided, yes; otherwise, it is not to be used|(n/a)

- **Function `validateAndConvertArgs`**

  - Return type: `object`; the returned object shall include only one property – the function `provideDefaultValues`

  - Parameter:

    Name|Type|Required?|Default value
    -|-|-|-
    `args`|list of `arg`|Yes|(n/a)
    `contents`|list of `string`|Yes|(n/a)

- **Function `provideDefaultValues`**

  - Return type: `object`; the returned object shall include only one property – the function `getConfig`

  - Parameters:

    Name|Type\*|Required?|Default value
    -|-|-|-
    `args`|list of `arg`|Yes|(n/a)
    `contents`|list of `string`|Yes|(n/a)

- **Function `getConfig`**

  - Return type: `object`; the returned object shall include the following properties: `boxConfig`, `diagramConfig`, `linkConfig`, `graphConfig` and `contents`

  - Parameters:

    Name|Type\*|Required?|Default value
    -|-|-|-
    `args`|list of `arg`|Yes|(n/a)
    `contents`|list of `string`|Yes|(n/a)