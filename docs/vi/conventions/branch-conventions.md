# Branch conventions

[[toc]]

## Code Flow Branches

These branches which we expect to be permanently available on the repository follow the flow of code changes starting from development until the production.

- `develop` (dev): All new features and bug fixes should be brought to the development branch. Resolving developer codes conflicts should be done as early as here.
- `staging` (stage): It contains tested features that the stakeholders wanted to be available either for a demo or a proposal before elevating into the production. Decisions are made here if a feature should be finally brought to the production code.
- `main` (master): The production branch, if the repository is published, this is the default branch being presented.

Except for Hotfixes, we want our codes to follow a one-way merge starting from **development** ➯ **test** ➯ **staging** ➯ **production**.

## Tên nhánh phải khớp với biểu thức chính quy sau

```js
/^(feature|bugfix|hotfix|chore|release|merge)\.([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*)$/;
```

## Định dạng

```txt
<type>(.<ticket>?).<subject>
```

1. `"type"` phải là một trong các loại sau

    - `feature`: adding, refactoring or removing a feature
    - `bugfix`: fixing a bug
    - `hotfix`: changing code with a temporary solution and/or without following the usual process (usually because of an emergency)
    - `chore`: changing that don't modify the logic or test code
    - `release`: a branch for tagging a specific release version
    - `merge`: a temporary branch for resolving merge conflicts, usually between the latest development and a feature or Hotfix branch

2. `"ticket"` (optional)

   A ticket number (e.g. Jira, GitHub issue, etc.)
    - if the branch is related to a ticket, the ticket number must be included in the branch name
    - if the branch is not related to a ticket, the branch name must contain a short description of the task

3. `"subject"`

   The subject contains a short description of the change

   - use the imperative, present tense (use "add" instead of "added" or "adds")
   - don't capitalize the first letter
   - no dot (.) at the end

## Ví dụ

```bash
feature.jira-1234

feature.jira-1234.support-dark-theme

feature.1234.support-dark-theme

feature.1234.new

feature.1234.refactor

feature.1234.ut

feature.integrate-swagger
```

```bash
bugfix.jira-1234

bugfix.jira-1234.registration-form-not-working

bugfix.1234.registration-form-not-working

bugfix.registration-form-not-working
```

```bash
chore.jira-1234

chore.jira-1234.registration-form-not-working

chore.1234.registration-form-not-working

chore.registration-form-not-working
```

```bash
bugfix.jira-1234

bugfix.jira-1234.registration-form-not-working

bugfix.1234.registration-form-not-working

bugfix.registration-form-not-working
```

```bash
release.myapp-1.01.123
```

```bash
merge.dev.lombok-refactoring
```
