import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PartnerForm } from "./Partnerform"

/** Fill the whole form with valid data, ready to submit. */
async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("First and Last name"), "Ada Lovelace")
  await user.type(screen.getByLabelText("Company"), "Analytical Engines")
  await user.type(screen.getByLabelText("Business email"), "ada@engines.com")
  await user.type(screen.getByLabelText("Phone"), "20 7946 0958")

  // Partner types + Industry are custom multiselects: open, pick one, close.
  // Each multiselect's trigger takes its accessible name from the field label;
  // options are inner <button>s, so click those (not the <li role="option">).
  await user.click(screen.getByRole("button", { name: /partner types/i }))
  await user.click(screen.getByRole("button", { name: "Reseller" }))
  await user.keyboard("{Escape}")

  await user.click(screen.getByRole("button", { name: /industry/i }))
  await user.click(screen.getByRole("button", { name: "Manufacturing" }))
  await user.keyboard("{Escape}")

  await user.click(screen.getByRole("checkbox"))
}

describe("PartnerForm", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {})
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("shows validation errors and an error toast when submitting empty", async () => {
    const user = userEvent.setup()
    render(<PartnerForm />)

    await user.click(screen.getByRole("button", { name: /submit/i }))

    expect(
      screen.getByText("Enter your first and last name.")
    ).toBeInTheDocument()
    expect(screen.getByText("Enter your business email.")).toBeInTheDocument()
    expect(
      screen.getByText("Please accept the privacy policy.")
    ).toBeInTheDocument()

    const toast = screen.getByRole("status")
    expect(toast).toHaveTextContent(/please fix the highlighted fields/i)

    // Nothing is logged on a failed submit.
    expect(console.log).not.toHaveBeenCalled()
  })

  it("clears a field's error as soon as the user edits it", async () => {
    const user = userEvent.setup()
    render(<PartnerForm />)

    await user.click(screen.getByRole("button", { name: /submit/i }))
    expect(
      screen.getByText("Enter your first and last name.")
    ).toBeInTheDocument()

    await user.type(screen.getByLabelText("First and Last name"), "A")
    expect(
      screen.queryByText("Enter your first and last name.")
    ).not.toBeInTheDocument()
    // Other errors remain until their own fields are edited.
    expect(screen.getByText("Enter your business email.")).toBeInTheDocument()
  })

  it("submits a valid form: logs the payload, shows success, and resets", async () => {
    const user = userEvent.setup()
    render(<PartnerForm />)

    await fillValid(user)
    await user.click(screen.getByRole("button", { name: /submit/i }))

    const toast = screen.getByRole("status")
    expect(toast).toHaveTextContent(/your request has been submitted/i)

    expect(console.log).toHaveBeenCalledWith(
      "Partner form submitted:",
      expect.objectContaining({
        fullName: "Ada Lovelace",
        company: "Analytical Engines",
        email: "ada@engines.com",
        partnerTypes: ["reseller"],
        industry: ["manufacturing"],
        privacyAccepted: true,
      })
    )

    // Form resets to its initial (empty) state.
    expect(screen.getByLabelText("First and Last name")).toHaveValue("")
    expect(screen.getByLabelText("Business email")).toHaveValue("")
  })

  it("does not submit when only some required fields are filled", async () => {
    const user = userEvent.setup()
    render(<PartnerForm />)

    await user.type(screen.getByLabelText("First and Last name"), "Ada")
    await user.click(screen.getByRole("button", { name: /submit/i }))

    expect(console.log).not.toHaveBeenCalled()
    const toast = screen.getByRole("status")
    expect(toast).toHaveTextContent(/please fix the highlighted fields/i)
  })
})
