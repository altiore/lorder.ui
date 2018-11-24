module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  moduleFileExtensions: ['web.ts', 'ts', 'web.tsx', 'tsx', 'web.js', 'js', 'web.jsx', 'jsx', 'json', 'node', 'mjs'],
  moduleNameMapper: {
    'src/([^\\.]*)$': ['<rootDir>/src/$1/index.ts', '<rootDir>/src/$1.ts?(x)'],
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)', '<rootDir>/src/**/?(*.)(spec|test).(j|t)s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'],
};
