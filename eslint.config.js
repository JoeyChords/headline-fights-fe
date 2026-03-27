const nextConfig = require("eslint-config-next");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  ...nextConfig,
  prettierConfig,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
