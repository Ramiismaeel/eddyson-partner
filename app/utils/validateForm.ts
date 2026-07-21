import type { Option } from "@/app/components/form/Multiselect"
import type { PartnerFormValues, FormErrors } from "@/app/types/form"

/**
 * Placeholder options — the Figma didn't specify the list.
 * In the eddyson project these would most likely come from Prismic.
 */
export const PARTNER_TYPE_OPTIONS: Option[] = [
  { label: "Reseller", value: "reseller" },
  { label: "Referral", value: "referral" },
  { label: "Technology", value: "technology" },
  { label: "System Integrator", value: "system_integrator" },
  { label: "OEM", value: "oem" },
]

export const INDUSTRY_OPTIONS: Option[] = [
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Retail & E-commerce", value: "retail" },
  { label: "Financial Services", value: "finance" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Logistics", value: "logistics" },
  { label: "Public Sector", value: "public_sector" },
]

export const INITIAL_VALUES: PartnerFormValues = {
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

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Minimal, synchronous validation — no library, no async. */
export function validate(values: PartnerFormValues): FormErrors {
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
