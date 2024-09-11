module.exports = {
    preset: 'jest-preset-angular',
    roots: ['src'],
    testMatch: ['**/*.spec.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    coverageReporters: ['html', 'text-summary'],
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/main.ts',
        '!src/polyfills.ts',
        '!src/environments/**',
        '!src/**/*.module.ts',
    ],
};
