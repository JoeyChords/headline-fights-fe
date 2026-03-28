const nextConfig = require("eslint-config-next");
const prettierConfig = require("eslint-config-prettier");

// nextConfig[1] contains the @typescript-eslint plugin definition — reuse it so rules resolve.
const tsPlugin = nextConfig[1].plugins;

module.exports = [
  ...nextConfig,
  prettierConfig,
  {
    plugins: tsPlugin,
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
