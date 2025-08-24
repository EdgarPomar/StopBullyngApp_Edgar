import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {tsconfig: './tsconfig.app.json'}], // Usa el tsconfig correcto
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock para estilos
    },
    setupFiles: ['<rootDir>/jest.setup.ts'], // Mock de import.meta.env
    testMatch: ['**/tests/**/*.test.(ts|tsx)'],
};

export default config;
