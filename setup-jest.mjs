/* eslint-disable no-undef */

process.env.NODE_ENV = 'test';

global.console = {
  ...global.console,
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
