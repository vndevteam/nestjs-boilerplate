# Base Coding Conventions

- [Folder names](#folder-names)
- [File names](#file-names)
- [Naming](#naming)
  - [English language](#english-language)
  - [S-I-D](#s-i-d)
  - [Prefixes](#prefixes)
  - [Singular and Plurals](#singular-and-plurals)
  - [Basic naming convention](#basic-naming-convention)
  - [Constant naming convention](#constant-naming-convention)
  - [Function naming convention](#function-naming-convention)
- [Handle promise](#handle-promise)
- [Type Casting & Coercion](#type-casting--coercion)
- [Properties](#properties)
- [Comparison Operators & Equality](#comparison-operators--equality)
- [Blocks](#blocks)
- [Comments](#comments)
- [JSDocs for sharing functions](#jsdocs-for-sharing-functions)
- [Modules](#modules)

We use `eslint` to lint the code

## Folder names

We use `kebab-case` for folder names

```txt
// bad ❌
src/datetimeUtils;

// bad ❌
src/datetime_utils;

// bad ❌
src/DateTimeUtils;

// good ✅
src/datetime-utils;
```

## File names

We use `kebab-case` for file names

```txt
// bad ❌
src/utilities/emailValidator.ts;

// bad ❌
src/utilities/email_validator.ts;

// bad ❌
src/utilities/EmailValidator.ts;

// good ✅
src/utilities/email-validator.ts;
```

## Naming

### English language

We use `English language` when naming variables and functions

```ts
// bad ❌
const ten = "Gustavo";
const amigos = ["Kate", "John"];

// good ✅
const name = "Gustavo";
const friends = ["Kate", "John"];
```

### S-I-D

A name must be _short_, _intuitive_ and _descriptive_:

- **Short**. A name must not take long to type and, therefore, remember
- **Intuitive**. A name must read naturally, as close to the common speech as possible
- **Descriptive**. A name must reflect what it does/possesses in the most efficient way

```ts
// bad ❌
const a = 5; // "a" could mean anything
const isPaginatable = a > 10; // "Paginatable" sounds extremely unnatural
const shouldPaginatize = a > 10; // Made up verbs are so much fun!

// good ✅
const postCount = 5;
const hasPagination = postCount > 10;
const shouldPaginate = postCount > 10; // alternatively
```

### Prefixes

Prefix enhances the meaning of a variable

- **is** describes a characteristic or state of the current context (usually `boolean`)

```ts
const color = "blue";
const isBlue = color === "blue"; // characteristic
const isPresent = true; // state

if (isBlue && isPresent) {
  console.log("Blue is present!");
}
```

- **has** describes whether the current context possesses a certain value or state (usually `boolean`)

```ts
const hasProducts = productsCount > 0;
```

- **should** reflects a positive conditional statement (usually `boolean`)

```ts
const shouldUpdate = true;
```

- **prev**/**next** indicate the previous or the next state of a variable in the current context. Used when describing state transitions

```ts
async function getPosts() {
  const prevPosts = state.posts;
  const newPost = await fetch("...");
  const nextPosts = [...prevPosts, newPost];

  return nextPosts;
}
```

### Singular and Plurals

Like a prefix, variable names can be made singular or plural depending on whether they hold a single value or multiple values

```ts
// bad ❌
const friends = "Bob";
const friend = ["Bob", "Tony", "Tanya"];

// good ✅
const friend = "Bob";
const friends = ["Bob", "Tony", "Tanya"];
```

### Basic naming convention

We use `camelCase` for variable names
All names start with a `letter`

- Primitive data

```ts
// bad ❌
const property_name = "";

// bad ❌
const PropertyName = "";

// good ✅
const propertyName = "";
```

- Object data

```ts
// bad ❌
const property_name = {
  property_name_1: 1,
  property_name_2: "",
};

// good ✅
const propertyName = {
  propertyName1: 1,
  propertyName2: "",
};
```

- Class

```ts
// bad ❌
function MyClass() {}

// good ✅
class MyClass {}
```

### Constant naming convention

- Primitive data

```ts
// bad ❌
const minZip = 1;

// bad ❌
const MinZip = 1;

// good ✅
const MIN_ZIP = 1;
```

- Object data

We use `as const` syntax for object constant variables

```ts
// bad ❌
const routes = {
  login: "/login",
  logout: "/logout",
  userSetting: "/user-setting",
};

// good ✅
const Routes = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  USER_SETTING: "/user-setting",
} as const;
```

### Function naming convention

We use `camelCase` for function names
The function name will use the format `verb` + `object`

```ts
// bad ❌
function create_product() {}

// bad ❌
const create_product = () => {};

// good ✅ (prefer)
function createProduct() {}

// good ✅
const createProduct = () => {};
```

We use `A/HC/LC Pattern`

```txt
prefix? + action (A) + high context (HC) + low context? (LC)
```

Take a look at how this pattern may be applied in the table below

| Name                   | Prefix   | Action (A) | High context (HC) | Low context (LC) |
|------------------------|----------|------------|-------------------|------------------|
| `getUser`              |          | `get`      | `User`            |                  |
| `getUserMessages`      |          | `get`      | `User`            | `Messages`       |
| `handleClickOutside`   |          | `handle`   | `Click`           | `Outside`        |
| `shouldDisplayMessage` | `should` | `Display`  | `Message`         |                  |

> **Note:** The order of context affects the meaning of a variable. For example, `shouldUpdateComponent` means _you_ are about to update a component, while `shouldComponentUpdate` tells you that _component_ will update itself, and you are only controlling _when_ it should update.
> In other words, **high context emphasizes the meaning of a variable**.

## Handle promise

```ts
// bad ❌
await somePromise().then().catch();

// bad ❌
await somePromise().catch((error) => {
  // do something
});

// good ✅
try {
  await somePromise();
} catch (error) {
  // do something
}
```

## Type Casting & Coercion

- Strings

```ts
// bad ❌
const totalScore = new String(data.reviewScore);

// bad ❌
const totalScore = data.reviewScore + "";

// good ✅
const totalScore = String(this.reviewScore);

// good ✅
const totalScore = `${this.reviewScore}`;
```

- Numbers

```ts
const inputValue = "4";

// bad ❌
const val = new Number(inputValue);

// bad ❌
const val = inputValue >> 0;

// bad ❌
const val = Number.parseInt(inputValue);

// good ✅
const val = Number(inputValue);

// good ✅
const val = Number.parseInt(inputValue, 10);

// good ✅
const val = +inputValue;
```

- Booleans

```ts
const age = 0;

// bad ❌
const hasAge = new Boolean(age);

// good ✅
const hasAge = Boolean(age);

// good ✅
const hasAge = !!age;
```

## Properties

- Use dot notation when accessing properties

```js
const user = {
  name: "abc",
  age: 28,
};

// bad ❌
const age = user["age"];

// good ✅
const age = user.age;
```

## Comparison Operators & Equality

- Use `===` and `!==` comparisons

```ts
// bad ❌
check == 0;

// bad ❌
check != 0;

// good ✅
check === 0;

// good ✅
check !== 0;
```

- Use shortcuts for booleans, but explicit comparisons for strings and numbers

```ts
// bad ❌
if (isValid === true) {
  // do something
}

// bad ❌
if (name) {
  // do something
}

// bad ❌
if (collection.length) {
  // do something
}

// good ✅
if (isValid) {
  // do something
}

// good ✅
if (name !== "") {
  // do something
}

// good ✅
if (collection.length > 0) {
  // do something
}
```

## Blocks

- Do not use `else` block after `return` statements in `if` statements

```ts
// bad ❌
function foo() {
  if (x) {
    return y;
  } else {
    return z;
  }
}

// bad ❌
function foo() {
  if (x) {
    return y;
  } else if (z) {
    return w;
  } else {
    return t;
  }
}

// good ✅
function foo() {
  if (x) {
    return y;
  }

  return z;
}

// good ✅
function foo() {
  if (x) {
    return y;
  }

  if (z) {
    return w;
  }

  return t;
}
```

- Do not use selection operators in place of control statements

```ts
// bad ❌
!canRun && startRun();

// good ✅
if (!canRun) {
  startRun();
}
```

## Comments

- Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it’s on the first line of a block

```ts
// bad ❌
const isActive = true; // is current tab

// good ✅
// is current tab
const isActive = true;
```

- Use `/** ... */` for multiline comments

```ts
// bad ❌
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {
  // do something

  return element;
}

// good ✅
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {
  // do something

  return element;
}
```

- Use `// FIXME:` to annotate problems

```ts
// bad ❌
class Calculator {
  constructor() {
    // shouldn’t use a global here
    total = 0;
  }
}

// good ✅
class Calculator {
  constructor() {
    // FIXME: shouldn’t use a global here
    total = 0;
  }
}
```

- Use `// TODO:` to annotate solutions to problems

```ts
// bad ❌
class Calculator {
  constructor() {
    // total should be configurable by an options param
    this.total = 0;
  }
}

// good ✅
class Calculator {
  constructor() {
    // TODO: total should be configurable by an options param
    this.total = 0;
  }
}
```

## JSDocs for sharing functions

- Write JSDocs
  - What does the function do?
  - Argument types are defined with high versatility
  - Always define the return value type of the function

```ts
// bad ❌
function someFunction(value: string) {
  // do something
}

// good ✅
/**
 * Function that does
 *
 * @param value
 * @returns
 */
function someFunction(value: string): string {
  // do something
}
```

## Modules

- Importing

```ts
// bad ❌
import { FooComponent, FooComponentProps } from "components/my-component";
import { isString } from "utils/isString";

// good ✅
import { FooComponent } from "components/my-component";
import type { FooComponentProps } from "components/my-component";
import isString from "utils/isString";
```

- Exporting

```ts
// bad ❌
type FooComponentProps = {};

function FooComponent() {}

export { FooComponent, FooComponentProps };

// good ✅
export type FooComponentProps = {};

export function FooComponent() {}

// good ✅
type FooComponentProps = {};

function FooComponent() {}

export type { FooComponentProps };
export { FooComponent };
```

- Do not export mutable bindings

```ts
// bad ❌
let foo = 1;
export { foo };

// good ✅
const foo = 1;
export { foo };
```

- In modules with a single export, prefer default export over named export

```js
// bad ❌
export function someFunction() {}

// good ✅
export default function someFunction() {}
```

- Do not include TypeScript filename extension

```ts
// bad ❌
import foo from "./foo.ts";
import { BarComponent } from "./bar.tsx";
import baz from "./baz/index.ts";

// good ✅
import foo from "./foo";
import { BarComponent } from "./bar";
import baz from "./baz";
```
