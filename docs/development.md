# Setup & Development

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en) version >= `20.10.0`
- [Pnpm](https://pnpm.io/installation) version >= `9.5.0`

## Installation

```bash
# Install dependencies from the package.json file.
pnpm install
```

> Note: Don't delete the `pnpm-lock.yaml` file. It's used to lock the dependencies version.

### Configuration

Before running the app, you need to create a `.env` file in the root directory. You can copy the `.env.example` file and rename it to `.env`.

```bash
cp .env.example .env
```

### Dev server

```bash
# Start the development server
pnpm start

# Start the development server with file watcher
pnpm start:dev

# Start the development server with file watcher and debug mode
pnpm start:debug
```

## Upgrade

```bash
# Upgrade dependencies to the latest version
pnpm upgrade --interactive --latest
```
