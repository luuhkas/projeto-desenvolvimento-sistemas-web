const nextJest = require("next/jest");

// next/jest configura o Jest com o mesmo transform/SWC do Next,
// resolvendo CSS, imagens e os aliases "@/..." do jsconfig.json.
const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
