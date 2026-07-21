import { describe, it, expect } from "vitest"
import { validate, INITIAL_VALUES } from "./validateForm"
import type { PartnerFormValues } from "@/app/types/form"

/** A fully valid submission — override one field at a time to test a rule. */
const VALID: PartnerFormValues = {
  fullName: "Ada Lovelace",
  company: "Analytical Engines",
  email: "ada@engines.com",
  phone: { iso2: "gb", number: "20 7946 0958" },
  partnerTypes: ["reseller"],
  industry: ["manufacturing"],
  systemFocus: "",
  comments: "",
  privacyAccepted: true,
}

describe("validate", () => {
  it("returns no errors for a fully valid submission", () => {
    expect(validate(VALID)).toEqual({})
  })

  it("flags every required field on an empty form", () => {
    const errors = validate(INITIAL_VALUES)
    expect(errors).toMatchObject({
      fullName: expect.any(String),
      company: expect.any(String),
      email: expect.any(String),
      phone: expect.any(String),
      partnerTypes: expect.any(String),
      industry: expect.any(String),
      privacyAccepted: expect.any(String),
    })
    // Optional fields never produce errors.
    expect(errors.systemFocus).toBeUndefined()
    expect(errors.comments).toBeUndefined()
  })

  it("treats whitespace-only text as empty", () => {
    const errors = validate({ ...VALID, fullName: "   ", company: "\t" })
    expect(errors.fullName).toBeDefined()
    expect(errors.company).toBeDefined()
  })

  it.each([
    "plainaddress",
    "no-at-sign.com",
    "missing@domain",
    "spaces in@email.com",
    "@nolocal.com",
  ])("rejects malformed email %j", (email) => {
    expect(validate({ ...VALID, email }).email).toBeDefined()
  })

  it("distinguishes an empty email from a malformed one", () => {
    expect(validate({ ...VALID, email: "" }).email).toBe(
      "Enter your business email."
    )
    expect(validate({ ...VALID, email: "nope" }).email).toBe(
      "Enter a valid email address."
    )
  })

  it("requires at least 8 phone digits, ignoring formatting", () => {
    expect(
      validate({ ...VALID, phone: { iso2: "gb", number: "12 34 5" } }).phone
    ).toBeDefined()
    // Non-digits don't count toward the minimum.
    expect(
      validate({ ...VALID, phone: { iso2: "gb", number: "()-  1234567" } })
        .phone
    ).toBeDefined()
    // Exactly 8 digits passes.
    expect(
      validate({ ...VALID, phone: { iso2: "gb", number: "12-34-56-78" } }).phone
    ).toBeUndefined()
  })

  it("requires at least one partner type and one industry", () => {
    expect(validate({ ...VALID, partnerTypes: [] }).partnerTypes).toBeDefined()
    expect(validate({ ...VALID, industry: [] }).industry).toBeDefined()
  })

  it("requires the privacy policy to be accepted", () => {
    expect(
      validate({ ...VALID, privacyAccepted: false }).privacyAccepted
    ).toBeDefined()
  })
})
