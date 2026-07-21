import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MultiSelect, type Option } from "./Multiselect"

const OPTIONS: Option[] = [
  { label: "Reseller", value: "reseller" },
  { label: "Referral", value: "referral" },
  { label: "Technology", value: "technology" },
]

/** Render with a controlled `value` we can inspect via the onChange spy. */
function setup(value: string[] = []) {
  const onChange = vi.fn()
  render(
    <MultiSelect
      id="partnerTypes"
      label="Partner types"
      options={OPTIONS}
      value={value}
      onChange={onChange}
    />
  )
  return { onChange }
}

describe("MultiSelect", () => {
  it("shows the placeholder when nothing is selected", () => {
    setup()
    // The trigger's accessible name comes from the field label, so assert the
    // placeholder via its visible text.
    expect(screen.getByText("Select at least one")).toBeInTheDocument()
  })

  it("opens the listbox on click and lists the options", async () => {
    const user = userEvent.setup()
    setup()

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    await user.click(screen.getByRole("button", { expanded: false }))

    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(screen.getAllByRole("option")).toHaveLength(OPTIONS.length)
  })

  it("adds a value when an unselected option is clicked", async () => {
    const user = userEvent.setup()
    const { onChange } = setup(["reseller"])

    await user.click(screen.getByRole("button", { expanded: false }))
    // Each option is a <button> inside the <li role="option">; click the button.
    await user.click(screen.getByRole("button", { name: "Referral" }))

    expect(onChange).toHaveBeenCalledWith(["reseller", "referral"])
  })

  it("removes a value when an already-selected option is clicked", async () => {
    const user = userEvent.setup()
    const { onChange } = setup(["reseller", "referral"])

    await user.click(screen.getByRole("button", { expanded: false }))
    await user.click(screen.getByRole("button", { name: "Reseller" }))

    expect(onChange).toHaveBeenCalledWith(["referral"])
  })

  it("summarises selected labels on the trigger", () => {
    setup(["reseller", "technology"])
    expect(screen.getByText("Reseller, Technology")).toBeInTheDocument()
  })

  it("marks selected options with aria-selected", async () => {
    const user = userEvent.setup()
    setup(["referral"])

    await user.click(screen.getByRole("button", { expanded: false }))
    expect(screen.getByRole("option", { name: "Referral" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("option", { name: "Reseller" })).toHaveAttribute(
      "aria-selected",
      "false"
    )
  })

  it("closes when clicking outside (useClickAway)", async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByRole("button", { expanded: false }))
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    await user.click(document.body)
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("closes when Escape is pressed (useClickAway)", async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByRole("button", { expanded: false }))
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })
})
