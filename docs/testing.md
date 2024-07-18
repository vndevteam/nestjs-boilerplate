# Testing

We use **Jest** for comprehensive unit testing in our NestJS project. Below are the various commands and methods you can use to run tests effectively.

## Running All Tests

Execute all test cases across the project using:

```bash
yarn test
```

## Running a Specific Test File

To run tests in a specific file, use the following command:

```bash
yarn test path/to/file

# example: yarn test src/api/auth/auth.controller.spec.ts
```

## Running End-to-End (e2e) Tests

End-to-end tests can be executed using:

```bash
yarn test:e2e
```

## Running Tests in Watch Mode

For continuous testing, enabling watch mode allows you to re-run tests automatically upon file changes:

```bash
yarn test:watch
```

## Running Tests with Coverage

To generate a code coverage report, use the command:

```bash
yarn test:cov
```

## Running Tests in IDE

### Visual Studio Code

For a seamless testing experience within Visual Studio Code, install the [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) extension. This extension allows you to run tests directly from the test file, streamlining the development process.

![Jest Runner](https://github.com/firsttris/vscode-jest/raw/master/public/vscode-jest.gif)

By following this guide, you can ensure a robust testing workflow, leading to more reliable and maintainable code.
