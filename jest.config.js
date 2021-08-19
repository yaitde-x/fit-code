/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = async () => {
  return {
    verbose: true,
    globals: {
      "ts-jest": {
        // Tell ts-jest about our typescript config.
        // You can specify a path to your tsconfig.json file,
        // but since we're compiling specifically for node here,
        // this works too.
        tsConfig: {
          target: "es2019",
        },
      },
    },
    roots: [
      "<rootDir>/src"
    ],
    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    }
  };
};
