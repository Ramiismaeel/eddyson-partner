"use client"

import { useState, type FormEvent } from "react"
import { TextField } from "./Textfield"
import { TextAreaField } from "./TextAreaField"
import { PhoneField } from "./PhoneField"
import { MultiSelect, type Option } from "./Multiselect"
import { Checkbox } from "./Checkbox"
import { Toast } from "./Toast"
import type {
  PartnerFormValues,
  FormErrors,
  ToastState,
} from "@/app/types/form"

/**
 * Placeholder options — the Figma didn't specify the list.
 * In the eddyson project these would most likely come from Prismic.
 */
const PARTNER_TYPE_OPTIONS: Option[] = [
  { label: "Reseller", value: "reseller" },
  { label: "Referral", value: "referral" },
  { label: "Technology", value: "technology" },
  { label: "System Integrator", value: "system_integrator" },
  { label: "OEM", value: "oem" },
]

const INDUSTRY_OPTIONS: Option[] = [
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Retail & E-commerce", value: "retail" },
  { label: "Financial Services", value: "finance" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Logistics", value: "logistics" },
  { label: "Public Sector", value: "public_sector" },
]

const INITIAL_VALUES: PartnerFormValues = {
  fullName: "",
  company: "",
  email: "",
  phone: { iso2: "fr", number: "" },
  partnerTypes: [],
  industry: [],
  systemFocus: "",
  comments: "",
  privacyAccepted: false,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Minimal, synchronous validation — no library, no async. */
function validate(values: PartnerFormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.fullName.trim())
    errors.fullName = "Enter your first and last name."
  if (!values.company.trim()) errors.company = "Enter your company."

  if (!values.email.trim()) errors.email = "Enter your business email."
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Enter a valid email address."

  // Minimal length check on the national number digits.
  // For per-country validation, add `libphonenumber-js` and call
  // isValidPhoneNumber(toE164(values.phone)) here.
  if (values.phone.number.replace(/\D/g, "").length < 8) {
    errors.phone = "Enter a valid phone number."
  }

  if (values.partnerTypes.length === 0)
    errors.partnerTypes = "Select at least one."
  if (values.industry.length === 0) errors.industry = "Select at least one."
  if (!values.privacyAccepted)
    errors.privacyAccepted = "Please accept the privacy policy."

  return errors
}

export function PartnerForm() {
  const [values, setValues] = useState<PartnerFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [toast, setToast] = useState<ToastState | null>(null)

  function setField<K extends keyof PartnerFormValues>(
    key: K,
    value: PartnerFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
    // Clear a field's error as soon as the user edits it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setToast({ type: "error", message: "Please fix the highlighted fields." })
      return
    }

    // No API call — just log the payload, as requested.
    console.log("Partner form submitted:", values)

    setToast({
      type: "success",
      message: "Thanks — your request has been submitted.",
    })
    setValues(INITIAL_VALUES)
  }

  return (
    <>
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-xl rounded-3xl bg-white p-6 shadow-form sm:p-10"
      >
        <div className="space-y-6">
          <TextField
            id="fullName"
            label="First and Last name"
            required
            autoComplete="name"
            placeholder="Valery Jacobson jr III"
            value={values.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            error={errors.fullName}
          />

          <TextField
            id="company"
            label="Company"
            required
            autoComplete="organization"
            placeholder="Your company"
            value={values.company}
            onChange={(e) => setField("company", e.target.value)}
            error={errors.company}
          />

          <TextField
            id="email"
            label="Business email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@yourcompany.com"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            error={errors.email}
          />

          <PhoneField
            id="phone"
            label="Phone"
            required
            value={values.phone}
            onChange={(phone) => setField("phone", phone)}
            error={errors.phone}
          />

          <MultiSelect
            id="partnerTypes"
            label="Partner types"
            required
            options={PARTNER_TYPE_OPTIONS}
            value={values.partnerTypes}
            onChange={(v) => setField("partnerTypes", v)}
            error={errors.partnerTypes}
          />

          <MultiSelect
            id="industry"
            label="Industry"
            required
            options={INDUSTRY_OPTIONS}
            value={values.industry}
            onChange={(v) => setField("industry", v)}
            error={errors.industry}
          />

          <TextField
            id="systemFocus"
            label="System focus"
            placeholder="e.g. SAP, Microsoft"
            value={values.systemFocus}
            onChange={(e) => setField("systemFocus", e.target.value)}
          />

          <TextAreaField
            id="comments"
            label="Questions or comments"
            rows={3}
            placeholder="Anything you would like to add for optimal feedback"
            value={values.comments}
            onChange={(e) => setField("comments", e.target.value)}
          />

          <div className="text-muted text-[14px] leading-[1.4]">
            <Checkbox
              id="privacy"
              checked={values.privacyAccepted}
              onChange={(checked: boolean) =>
                setField("privacyAccepted", checked)
              }
            >
              By submitting this form, I agree with the privacy policy
            </Checkbox>
            {errors.privacyAccepted && (
              <p role="alert" className="mt-1.5 pl-8 text-xs text-red-500">
                {errors.privacyAccepted}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-4 font-medium text-inverse-soft transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}
