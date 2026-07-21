import "@testing-library/jest-dom/vitest"
import React from "react"
import { afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"

// Unmount React trees between tests so queries don't bleed across cases.
afterEach(() => {
  cleanup()
})

// `next/image` validates remote hosts against the Next image config at render
// time — config that isn't loaded under Vitest, so it throws for the flagcdn
// URLs used by PhoneField. Render a plain <img> instead, dropping the
// Next-only props that a real <img> doesn't understand.
const NEXT_IMAGE_ONLY_PROPS = new Set([
  "priority",
  "fill",
  "loader",
  "quality",
  "placeholder",
  "blurDataURL",
])
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...rest }: Record<string, unknown>) => {
    const imgProps = Object.fromEntries(
      Object.entries(rest).filter(([key]) => !NEXT_IMAGE_ONLY_PROPS.has(key))
    )
    return React.createElement("img", { src, alt, ...imgProps })
  },
}))

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
