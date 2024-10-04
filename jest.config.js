module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"], // Optional, for jest-dom matchers
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Tell Jest to transform TypeScript files using ts-jest
  },
};
