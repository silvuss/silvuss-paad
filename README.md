# paad – print ASCII art diagram

paas (**p**rint **A**SCII **a**rt **s**chema) is a utility that allows the user to generate a diagram in a form similar (the same?) to ASCII art.

**Read before use:** This application **is not** intended to be used according to the purpose described above. You may use it **only** to test whether the code is written the way it is expected to be (i.e. it produces expected results) and **only** when you know what the code will really do. For details, see the section "[Disclaimers](#disclaimers)" below.

1. [Copyright note](#copyright-note)
2. [Disclaimers](#disclaimers)
3. [Dependencies](#dependencies)
4. [Usage](#usage)
5. [Examples](#examples)
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
        "commands": [
            {
                "desc": "Entry point to the program",
                "template": "node app/front-end/cli.js [<list of chosen params>] [-- [<space-separated list of pieces of contents of particular boxes>]]",
                "params": "(all the params are defined in the file app/front-end/params-config.js)"
            }
        ]
    }
}
```

## Examples

#### Example 1

The command:

```
node cli.js -s 2 " " -b 1 '#' -p 1 -c 3 -f ' ' -- 'a b' 'c' 'd' 'e' 'f g h' 'i' 'j k' 'l m n o' 'p'
```

produces the following diagram:

```
###########  ###########  ###########
#         #  #         #  #         #
# a b     #  # c       #  # d       #
#         #  #         #  #         #
###########  ###########  ###########
                                     
                                     
###########  ###########  ###########
#         #  #         #  #         #
# e       #  # f g h   #  # i       #
#         #  #         #  #         #
###########  ###########  ###########
                                     
                                     
###########  ###########  ###########
#         #  #         #  #         #
# j k     #  # l m n o #  # p       #
#         #  #         #  #         #
###########  ###########  ###########
```

## Environments, tools and technologies used

```json
[
    {
        "development": {
            "programming-languages": [
                {
                    "name": "JavaScript",
                    "notes": [
                        "ECMAScript verson: 2018",
                        "runtime-environment: Node.js v10.16.3"
                    ]
                }
            ],
            "operating-systems": [
                {
                    "family-name": "Linux",
                    "distribution-name": "Fedora",
                    "version": "Fedora release 30 (Thirty)"
                }
            ]
        },
        "testing": {
            "operating-systems": [
                {
                    "family-name": "Linux",
                    "distribution-name": "Fedora",
                    "version": "Fedora release 30 (Thirty)"
                }
            ]
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
    },
    {
        "url": "https://stackoverflow.com/q/22053757"
    },
    {
        "url": "https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase"
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

### Resources worth attention

```json
[
    {
        "url": "https://4programmers.net/Forum/JavaScript/336248-jak_mapowac_argumenty_wiersza_polecen_na_wywolania_funkcji?p=1654291#id1654291"
    },
    {
        "url": "https://cs.stackexchange.com/questions/92740/why-is-it-called-throwing-an-exception"
    }
]
```