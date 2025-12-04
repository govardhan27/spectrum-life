import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@assets/(.*)\\?react$": "<rootDir>/src/__tests__/__mocks__/svgMock.tsx",
    "^@test/(.*)$": "<rootDir>/src/__tests__/$1",
    "^@theme$": "<rootDir>/src/theme/index",
    "^@theme/(.*)$": "<rootDir>/src/theme/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@types$": "<rootDir>/src/types/index",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "\\.svg\\?react$": "<rootDir>/src/__tests__/__mocks__/svgMock.tsx",
    "\\.svg$": "<rootDir>/src/__tests__/__mocks__/svgMock.tsx",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.styles.ts",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],
  clearMocks: true,
  restoreMocks: true,
};

export default config;
