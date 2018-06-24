module.export = {
  "setupFiles": [
    "<rootDir>/test-shim.js",
    "<rootDir>/test-setup.js"
  ],
    "testEnvironment": "node",
    "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$"
  ],
    "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)",
    "<rootDir>/src/**/?(*.)(spec|test).(j|t)s?(x)"
  ],
    "moduleNameMapper": {
    "src/([^\\.]*)$": ["<rootDir>/src/$1/index.ts", "<rootDir>/src/$1.ts?(x)"]
  },
  "moduleFileExtensions": [
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "web.js",
    "js",
    "web.jsx",
    "jsx",
    "json",
    "node",
    "mjs"
  ],
    "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.test.json"
    }
  }
}