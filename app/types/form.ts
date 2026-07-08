export interface PhoneValue {
  /** ISO 3166-1 alpha-2, lowercase. */
  iso2: string;
  /** National number as typed (digits/spaces). */
  number: string;
}

export interface PartnerFormValues {
  fullName: string;
  company: string;
  email: string;
  phone: PhoneValue;
  partnerTypes: string[];
  industry: string[];
  systemFocus: string;
  comments: string;
  privacyAccepted: boolean;
}

/** Field-level error messages, keyed by field name. */
export type FormErrors = Partial<Record<keyof PartnerFormValues, string>>;

export type ToastType = "success" | "error";

export interface ToastState {
  type: ToastType;
  message: string;
}