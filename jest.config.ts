// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFiles: [],
  testMatch: ['**/tests/**/*.test.(ts|tsx)'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
};

export default config;
