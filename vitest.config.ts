import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // ... Specify options here.
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
