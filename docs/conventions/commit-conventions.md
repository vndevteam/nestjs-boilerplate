# Commit conventions

We use convention at [here](https://www.conventionalcommits.org/en/v1.0.0/)

---

[[toc]]

## Commit messages must be matched by the following regex

```js
/^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)\(?[a-zA-Z0-9-]{0,20}\)?:\s[a-zA-Z0-9-_#\/\s]{1,49}[a-zA-Z0-9]$/;
```

## Format

```txt
<type>(<scope>?): <subject>
```

1. `"type"` must be one of the following types

    - `build`: changes that affect the build system or external dependencies
    - `chore`: changes that don't modify the logic or test code
    - `ci`: changes to our CI configuration files and scripts
    - `docs`: documentation only changes (add/update/delete)
    - `feat`: to add/update/delete a feature
    - `fix`: to fix a normal bug, critical bug (maybe refactor that code)
    - `perf`: to improve performance
    - `refactor`: a code change that neither fixes a bug nor adds a feature
    - `revert`: to revert a previous commit
    - `style`: changes that do not affect the meaning of the code (whitespace, formatting, missing semi-colons, etc.)
    - `test`: adding missing tests or correcting existing tests

2. `"scope"` (optional)

   The scope must be noun and it represents the section of the section of the codebase

3. `"subject"`

   The subject contains a short description of the change

   - use the imperative, present tense (use "add" instead of "added" or "adds")
   - don't capitalize the first letter
   - no dot (.) at the end
   - is one of the following types
       - ticket: `<ticket No> <a short description>`
       - some special tasks (no ticket) such as documentation, building or refactoring the source code: `<a short description>`

## Example

```txt
feat: #1001

feat: #1001 login

feat: #1001 add product

feat: #1001 search customer
```

```txt
refactor: improve type safety

refactor: rename some variables

refactor: #1001 structure shared button
```

```txt
build: add eslint configuration

build: #1001 update unit test configuration
```

```txt
docs: add coding convention

docs: add branch convention
```

```txt
chore: update dependencies

chore: typo
```

```txt
test: shared is-string

test: 1001 shared button
```
