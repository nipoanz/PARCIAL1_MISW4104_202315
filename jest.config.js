module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testMatch: [
    "**/*.spec.ts",
    "!**/*.class.ts",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/core/",
  ],
  coveragePathIgnorePatterns: [ 
    "<rootDir>/src/app/core"
  ],
  moduleFileExtensions: ["ts", "js", "html"],
  collectCoverage: true,
  coverageReporters: ["html", "text", "json", "lcov"],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    "@angular/common/locales/(.*)$":
      "<rootDir>/node_modules/@angular/common/locales/$1.mjs",
  },
};
