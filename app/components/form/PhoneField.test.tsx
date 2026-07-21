import { describe, it, expect, vi } from "vitest"
import { useState } from "react"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PhoneField } from "./PhoneField"
import type { PhoneValue } from "@/app/types/form"

/**
 * PhoneField is fully controlled, so drive it through a stateful harness —
 * this lets `user.type` behave like the real form and exposes the latest
 * value to assertions via the onChange spy.
 */
function Harness({
  initial = { iso2: "fr", number: "" },
  onChange,
}: {
  initial?: PhoneValue
  onChange?: (v: PhoneValue) => void
}) {
  const [value, setValue] = useState<PhoneValue>(initial)
  return (
    <PhoneField
      id="phone"
      label="Phone"
      value={value}
      onChange={(v) => {
        setValue(v)
        onChange?.(v)
      }}
    />
  )
}

describe("PhoneField", () => {
  it("defaults the dial code to the provided country", () => {
    render(<Harness initial={{ iso2: "fr", number: "" }} />)
    expect(screen.getByText("+33")).toBeInTheDocument()
  })

  it("strips non-numeric characters as the user types", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const input = screen.getByLabelText("Phone")
    await user.type(input, "12a3-45b6")

    // Letters and punctuation are removed; digits (and spaces) survive.
    expect(input).toHaveValue("123456")
  })

  it("opens the country dropdown and filters by search", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.click(screen.getByRole("button", { name: /country code/i }))

    const search = screen.getByPlaceholderText("Search country")
    await user.type(search, "germ")

    const listbox = screen.getByRole("listbox")
    const options = within(listbox).getAllByRole("option")
    expect(options).toHaveLength(1)
    expect(options[0]).toHaveTextContent("Germany")
  })

  it("selecting a country updates the dial code and closes the dropdown", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Harness onChange={onChange} />)

    await user.click(screen.getByRole("button", { name: /country code/i }))
    await user.type(screen.getByPlaceholderText("Search country"), "germ")
    // Click the option's inner <button>, not the wrapping <li role="option">.
    await user.click(screen.getByRole("button", { name: /Germany/i }))

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ iso2: "de" })
    )
    expect(screen.getByText("+49")).toBeInTheDocument()
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("shows a no-matches message for an unknown query", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.click(screen.getByRole("button", { name: /country code/i }))
    await user.type(screen.getByPlaceholderText("Search country"), "zzzzz")

    expect(screen.getByText(/no matches/i)).toBeInTheDocument()
  })
})
