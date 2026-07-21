import "@testing-library/jest-dom/vitest"
import { afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"

// Unmount React trees between tests so queries don't bleed across cases.
afterEach(() => {
  cleanup()
})

// `next/font/google` runs a build-time loader that throws under Vitest.
// Only `app/layout.tsx` imports fonts (covered by Playwright, not unit tests),
// but stub it here so any transitive import is harmless.
vi.mock("next/font/google", () => {
  const font = () => ({
    className: "font-mock",
    variable: "font-mock",
    style: { fontFamily: "mock" },
  })
  return new Proxy({}, { get: () => font })
})
