# Linting & Formatting

This project uses [Typescript Eslint](https://typescript-eslint.io/), and [Prettier](https://prettier.io/) to catch errors and avoid bike-shedding by enforcing a common code style.

---

[[toc]]

## Languages

- **Typescript** is linted by Typescript Eslint and formatted by Prettier
- **JSON** is formatted by Prettier

## Scripts

There are a few different contexts in which the linters run.

### Terminal

```bash
# Lint all files, fixing many violations automatically
pnpm lint
```

See `package.json` to update.

### Pre-commit

Staged files are automatically linted and tested before each commit. See `lint-staged.config.mjs` to update.

### Editor

In supported editors, all files will be linted and show under the linter errors section.

## Configuration

- [ESLint](https://eslint.org/docs/latest/use/configure/)
  - `eslint.config.mjs`

- [Prettier](https://prettier.io/docs/en/configuration.html)
  - `.prettierrc`
