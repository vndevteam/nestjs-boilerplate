# NestJS Boilerplate Documentation

This is a boilerplate for NestJS projects. It is a starting point for building a RESTful API with NestJS.

## Detail Documentation

- [Setup & Development](development.md)
- [Architecture](architecture.md)
- [Database](database.md)
- [Security](security.md)
- [Testing](testing.md)
- [Deployment](deployment.md)
- [Technologies](technologies.md)
- [Troubleshooting](troubleshooting.md)
- Convention
  - [Naming cheatsheet](conventions/naming-cheatsheet.md)
  - [TypeScript Style Guide and Coding Conventions](conventions/styleguide.md)
  - [Clean code Typescript](conventions/clean-code-typescript.md)
  - [Branch conventions](conventions/branch-conventions.md)
  - [Commit conventions](conventions/commit-conventions.md)
  - [Linting & formatting](conventions/linting.md)

## Features

- [x] Fastify support. (Checkout the [`feature.fastify`](https://github.com/vndevteam/nestjs-boilerplate/tree/feature.fastify) branch)
- [x] Database. Support [TypeORM](https://www.npmjs.com/package/typeorm)
- [x] Seeding ([Typeorm Extension](https://www.npmjs.com/package/typeorm-extension)).
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([@nestjs-modules/mailer](https://www.npmjs.com/package/@nestjs-modules/mailer) & [nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] Sign in and sign up via email.
- [ ] Social sign in (Apple, Facebook, Google, Twitter).
- [ ] Admin and User roles.
- [x] Pagination: Offset and Cursor (Clone from [typeorm-cursor-pagination](https://github.com/benjamin658/typeorm-cursor-pagination) and add more features).
- [x] Internationalization/Translations (I18N) ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [ ] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).

## References

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://docs.nestjs.com/)
- [NestJS I18n](https://nestjs-i18n.com/)
- [TypeORM](https://typeorm.io/)
- [TypeORM Extension](https://typeorm-extension.tada5hi.net/)
- [Nodemailer](https://nodemailer.com/)
- [NestJS Mailer](https://nest-modules.github.io/mailer/)
- [Jest](https://jestjs.io/)
- [PNPM](https://pnpm.io/)
- [ESLint](https://eslint.org/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
- [Lint Staged](https://github.com/lint-staged/lint-staged)
- [Commitlint](https://commitlint.js.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitizen](https://commitizen-tools.github.io/commitizen/)
- [Renovate](https://docs.renovatebot.com/)
