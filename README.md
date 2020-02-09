paas (**p**rint **A**SCII **a**rt **s**chema)

## Dependencies that one has to provide to be able to run the utility

```json
[
    {
        "name": "Node.js",
        "version": ">= v10.16.3"
    }
]
```

## Ways to run the utility

```json
{
    "cli": {
        "commands": [{
            "desc": "Entry point to the program",
            "template": "node cli.js <optional list of chosen params>",
            "params": {
                "-w": {
                    "long-name": "--block-width",
                    "values-type": "(integer >= 0)",
                    "default-value": "'0'",
                    "desc": "Optional; the width of a block (including border)"
                },
                "-h": {
                    "long-name": "--block-heights",
                    "values-type": "((integer >= 0) (integer >= 0))",
                    "default-value": "(none) (none)",
                    "desc": "Required; the values for the height of a block: minimum, maximum (including borders)"
                },
                "-b": {
                    "long-name": "--block-borders",
                    "values-type": "((integer >= 0) (('') || (character)))",
                    "default-value": "'0' ''",
                    "desc": "Optional; the configuration of borders of a block: borders' size, borders' character"
                },
                "-p": {
                    "long-name": "--block-paddings",
                    "values-type": "(integer >= 0)",
                    "default-value": "'0'",
                    "desc": "Optional; the configuration of paddings of a block: paddings' size"
                },
                "-s": {
                    "long-name": "--block-separators",
                    "values-type": "((integer >= 0) (('') || (character)))",
                    "default-value": "'0' ''",
                    "desc": "Optional; the configuration of separators between blocks: separators' size, separators' fill's character"
                },
                "-c": {
                    "long-name": "--columns-number",
                    "values-type": "(integer >= 0)",
                    "default-value": "(the number of provided contents strings)",
                    "desc": "Optional; the number of columns in the schema"
                },
                "-f": {
                    "long-name": "--schema-fill-character",
                    "values-type": "(character)",
                    "default-value": "(none)",
                    "desc": "Required; the character of the schema's fill"
                },
                "(no-name)": {
                    "long-name": "(no-name)",
                    "values-type": "(a list of strings)",
                    "default-value": "(an empty list)",
                    "desc": "Contents of the blocks; to be recognized correctly, it must be separated by '--' (double dash) from the rest of the arguments"
                }
            }
        }]
    }
}
```

## Platforms that the utility was tested to work on

```json
[
    {
        "operating-system": {
            "family-name": "Linux",
            "distribution-name": "Fedora",
            "version": "Fedora release 30 (Thirty)"
        },
        "javascript-runtime-environment": {
            "name": "Node.js",
            "version": "v10.16.3"
        }
    }
]
```

## Exceptions thrown by the utility

[TODO]

## Helpful sources

```json
[
    {
        "url": "https://stackoverflow.com/a/6259543"
    },
    {
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers"
    },
    {
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp"
    },
    {
        "url": "https://ultimatecourses.com/blog/understanding-javascript-types-and-reliable-type-checking"
    },
    {
        "url": "https://jsdoc.app/tags-typedef.html"
    },
    {
        "url": "https://stackoverflow.com/a/10462275"
    },
    {
        "url": "https://www.jstips.co/en/javascript/create-range-0/.n-easily-using-one-line/"
    }
]
```

## Code notes

```json
[
    "The order of properties top, right, etc. is the same as in CSS's border's shorthand properties."
]
```