export interface PartnerFormValues {
  fullName: string;
  company: string;
  email: string;
  phone: string;
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