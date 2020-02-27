# General design and architecture notes

## Functions

### In what cases all functions are to throw exceptions

A function is to throw an exception:

1. if the `arguments` variable is of different type than it is specified for it to be (e.g. (at the time of writing this), it does not have the `lenght` property, or this property is of different type than it is specified for it to be);
2. if there are less arguments than specified\*;
3. if there are more arguments than specified;
4. if an argument has different type than it is specified for the corresponding parameter.

\* _Be aware that this **is not** to be skipped e.g. in JavaScript. In JavaScript, although parameter variables for which the corresponding arguments have not been given are assigned the `undefined` value, it need not make them having a **different** type than expected (and thereby falling under the case no. 4). There is always a possibility that a parameter of a function in this application will once have `undefined` set as its default value. — Generally, this restriction is meant to facilitate the design and development of the application. But, since it seems to violate the [YAGNI principle](https://en.wikipedia.org/wiki/You_aren't_gonna_need_it), it might be changed in some future version of the application._

### Callback functions

Callback functions are to be appended a string `Callback` to their names. Otherwise, in case a callback function's name is the same as a name of some other non-callback function passed inside the callback function, error messages may be misleading (at least in Visual Studio Code at the time of writing this).

### "Factory functions"

There are to be no classes per se by design. Instead, some functions are expected to behave like, let us say, "factory functions"; they are to have names starting with the word `create` and to return new objects.

Regardless of that, other functions may also return new objects – even objects of the same type as some "factory functions". The difference is: before executing a "factory function" within a given scope, it shall be expected that **there is no** variable within this scope that references an object of the same type that the function creates; on the other hand, before executing a "normal" function that creates a new object, **there may be** variables within this scope that reference an object of the same type that the function creates.