# Testing

We use **Jest** for comprehensive unit testing in our NestJS project. Below are the various commands and methods you can use to run tests effectively.

---

[[toc]]

## Unit Testing

### Running a Specific Test File

To run tests in a specific file, use the following command:

```bash
pnpm test path/to/file

# example: pnpm test src/api/auth/auth.controller.spec.ts
```

## Integration Testing

// TODO: Add details on integration testing.

## End-to-End (E2E) Testing

### Running End-to-End (e2e) Tests

End-to-end tests can be executed using:

```bash
pnpm test:e2e
```

## All Tests

### Running All Tests

Execute all test cases across the project using:

```bash
pnpm test
```

### Running Tests in Watch Mode

For continuous testing, enabling watch mode allows you to re-run tests automatically upon file changes:

```bash
pnpm test:watch
```

### Running Tests with Coverage

To generate a code coverage report, use the command:

```bash
pnpm test:cov
```

## Testing in IDE

### Visual Studio Code

For a seamless testing experience within Visual Studio Code, install the [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) extension. This extension allows you to run tests directly from the test file, streamlining the development process.

![Jest Runner](https://github.com/firsttris/vscode-jest/raw/master/public/vscode-jest.gif)

By following this guide, you can ensure a robust testing workflow, leading to more reliable and maintainable code.
