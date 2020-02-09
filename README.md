# paas – print ASCII art schema

paas (**p**rint **A**SCII **a**rt **s**chema) is a utility that allows the user to generate a schema in a form similar (the same?) to ASCII art.

**Read before use:** This application **is not** intended to be used according to the purpose described above. You may use it **only** to test whether the code is written the way it is expected to be (i.e. it produces expected results) and **only** when you know what the code will really do. For details, see the section "[Disclaimers](#disclaimers)" below.

1. [Copyright note](#copyright-note)
2. [Disclaimers](#disclaimers)
3. [Dependencies](#dependencies)
4. [Usage](#usage)
5. [Environments, tools and technologies used](#environments-tools-and-technologies-used)
6. [Exceptions thrown by the utility](#exceptions-thrown-by-the-utility)
7. [Sources](#sources)
8. [Notes](#notes)

## Copyright note

Note that this project "paas" (the repository "silvuss-paas") has currently **no license**, as explained in [this GitHub guide on licensing projects](https://choosealicense.com/no-permission/).

For your convenience, I am including below a quote from that site:

> When you make a creative work (which includes code), the work is under exclusive copyright by default. Unless you include a license that specifies otherwise, nobody else can use, copy, distribute, or modify your work without being at risk of take-downs, shake-downs, or litigation. Once the work has other contributors (each a copyright holder), “nobody” starts including you.

Also note that I can add a license in the future if it would be relevant to the needs of this project.

## Disclaimers

**The application that this project contains is an example application that is not intended to be run.** Its purpose is only to show code that is known to work. While probably nothing dangerous would happen, you may run it only under your own responsibility.

Although I have made efforts to make it work as intended and described, it is not a "professional" application. Specifically, it was not tested in terms of separate unit tests or similar. It was tested to build and work on only one platform. For details on the platform, see the section "[Environment, tools and technologies used](#environment-tools-and-technologies-used)" below.

## Dependencies

Dependencies that one has to provide to be able to run the utility are as follows:

```json
[
    {
        "name": "Node.js",
        "version": ">= v10.16.3"
    }
]
```

## Usage

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

## Environments, tools and technologies used

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

## Sources

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

## Notes

### Code notes

```json
[
    "The order of properties top, right, etc. is the same as in CSS's border's shorthand properties."
]
```