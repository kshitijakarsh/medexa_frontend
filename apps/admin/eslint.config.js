import { nextJsConfig } from "@workspace/eslint-config/next-js"

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...nextJsConfig,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
]
