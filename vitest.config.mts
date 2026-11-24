import { resolve } from "node:path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(process.cwd(), "src"),
    },
  },
  test: {
    // .ai is a separate repository whose Node test suites have their own runner.
    exclude: [...configDefaults.exclude, ".ai/**"],
    environment: "node",
    clearMocks: true,
  },
});
