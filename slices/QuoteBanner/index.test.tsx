import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import type { Content } from "@prismicio/client"
import QuoteBanner from "./index"

/**
 * SliceMachine's `mocks.json` is in the *simulator content* format
 * (`__TYPE__`/`value` wrappers), not the API shape a slice actually receives,
 * so we author a small typed fixture in the rendered shape instead.
 */
const slice: Content.QuoteBannerSlice = {
  id: "quote_banner$test",
  slice_type: "quote_banner",
  slice_label: null,
  variation: "default",
  version: "test",
  primary: {
    quote: [
      {
        type: "paragraph",
        text: "Select. Connect. Evolve.",
        spans: [],
      },
    ],
  },
  items: [],
}

describe("QuoteBanner slice", () => {
  it("renders the quote text", () => {
    render(
      <QuoteBanner slice={slice} index={0} slices={[slice]} context={{}} />
    )
    expect(screen.getByText("Select. Connect. Evolve.")).toBeInTheDocument()
  })

  it("exposes the slice type and variation as data attributes", () => {
    const { container } = render(
      <QuoteBanner slice={slice} index={0} slices={[slice]} context={{}} />
    )
    const section = container.querySelector("section")
    expect(section).toHaveAttribute("data-slice-type", "quote_banner")
    expect(section).toHaveAttribute("data-slice-variation", "default")
  })
})
