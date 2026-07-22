import { defineConfig, devices } from "@playwright/test"
import path from "node:path"

const PORT = Number(process.env.E2E_PORT ?? 3100)
const baseURL = `http://localhost:${PORT}`

// Inject the Prismic interceptor into the Next server process (build + start).
const mockRegister = path.resolve(__dirname, "e2e/prismic-mock.register.mjs")

export default defineConfig({
  testDir: "./e2e",
  // Only run Playwright specs here; Vitest owns *.test.tsx.
  testMatch: /.*\.spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Production build: the homepage's force-cache Prismic fetch resolves at
    // build time, so the mock must be active for `build` as well as `start`.
    command: `npx next build && npx next start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      NODE_OPTIONS: `--import ${mockRegister}`,
    },
  },
})
