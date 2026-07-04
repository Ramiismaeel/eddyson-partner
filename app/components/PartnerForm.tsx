"use client";

import { FC, useState } from "react";

const PARTNER_TYPES = ["Implementation Partner", "Sales Partner", "Other"];
const INDUSTRIES = ["Automotive", "Grocery", "Logistics", "Retail", "Production"];

// shared field styles
const inputCls =
    "w-full rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm text-ink " +
    "placeholder:text-neutral-400 outline-none transition focus:border-brand " +
    "focus:ring-2 focus:ring-brand/20";
const labelCls = "mb-1.5 block text-xs font-medium text-ink";

// orange required-asterisk
const Req = () => <span className="text-brand"> *</span>;

const PartnerForm: FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        partnerType: "",
        industry: "",
        system: "",
        message: "",
        privacy: true, // design shows it pre-checked; set false if UX should require opt-in
    });

    const set = (key: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
            setForm((f) => ({
                ...f,
                [key]: e.target.type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : e.target.value,
            }));

    const handleSubmit = () => {
        setError(null);
        if (!form.name || !form.company || !form.email || !form.phone || !form.partnerType || !form.industry) {
            setError("Please fill in all required fields.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setError("Please enter a valid business email.");
            return;
        }
        if (!form.privacy) {
            setError("Please agree to the privacy policy.");
            return;
        }
        console.log("Partner inquiry:", form); // stub — production would POST to a CRM/email service
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="rounded-2xl bg-white p-10 text-center shadow-[0_4px_36px_rgba(0,0,0,0.10)]">
                <p className="font-serif text-xl text-ink">Thank you!</p>
                <p className="mt-2 text-sm text-ink-soft">
                    Our partner management team will reach out to you shortly.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_36px_rgba(0,0,0,0.10)] md:p-7 /* verify: figma radius+shadow */">
            <div className="space-y-4">
                {/* First and Last name */}
                <div>
                    <label className={labelCls} htmlFor="pf-name">
                        First and Last name<Req />
                    </label>
                    <input
                        id="pf-name"
                        className={inputCls}
                        placeholder="Valery Jacobson jr III"
                        value={form.name}
                        onChange={set("name")}
                        autoComplete="name"
                    />
                </div>

                {/* Company */}
                <div>
                    <label className={labelCls} htmlFor="pf-company">
                        Company<Req />
                    </label>
                    <input
                        id="pf-company"
                        className={inputCls}
                        placeholder="Your company"
                        value={form.company}
                        onChange={set("company")}
                        autoComplete="organization"
                    />
                </div>

                {/* Business email */}
                <div>
                    <label className={labelCls} htmlFor="pf-email">
                        Business email<Req />
                    </label>
                    <input
                        id="pf-email"
                        type="email"
                        className={inputCls}
                        placeholder="you@yourcompany.com"
                        value={form.email}
                        onChange={set("email")}
                        autoComplete="email"
                    />
                </div>

                {/* Phone — flag prefix like the mock */}
                <div>
                    <label className={labelCls} htmlFor="pf-phone">
                        Phone<Req />
                    </label>
                    <div className="flex items-center rounded-lg border border-black/10 bg-white transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
                        <span aria-hidden="true" className="select-none pl-3.5 text-sm">
                            🇫🇷
                        </span>
                        <input
                            id="pf-phone"
                            type="tel"
                            className="w-full rounded-lg bg-transparent px-2.5 py-2.5 text-sm text-ink placeholder:text-neutral-400 outline-none"
                            placeholder="+33000000000"
                            value={form.phone}
                            onChange={set("phone")}
                            autoComplete="tel"
                        />
                    </div>
                </div>

                {/* Partner types — native select with custom chevron */}
                <div>
                    <label className={labelCls} htmlFor="pf-type">
                        Partner types<Req />
                    </label>
                    <div className="relative">
                        <select
                            id="pf-type"
                            className={`${inputCls} appearance-none pr-9 ${form.partnerType ? "" : "text-neutral-400"}`}
                            value={form.partnerType}
                            onChange={set("partnerType")}
                        >
                            <option value="" disabled>
                                Select at least one
                            </option>
                            {PARTNER_TYPES.map((t) => (
                                <option key={t} value={t} className="text-ink">
                                    {t}
                                </option>
                            ))}
                        </select>
                        <svg
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                            viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                        >
                            <path d="M4 6.5 8 3l4 3.5M4 9.5 8 13l4-3.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Industry */}
                <div>
                    <label className={labelCls} htmlFor="pf-industry">
                        Industry<Req />
                    </label>
                    <div className="relative">
                        <select
                            id="pf-industry"
                            className={`${inputCls} appearance-none pr-9 ${form.industry ? "" : "text-neutral-400"}`}
                            value={form.industry}
                            onChange={set("industry")}
                        >
                            <option value="" disabled>
                                Select at least one
                            </option>
                            {INDUSTRIES.map((t) => (
                                <option key={t} value={t} className="text-ink">
                                    {t}
                                </option>
                            ))}
                        </select>
                        <svg
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                            viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                        >
                            <path d="M4 6.5 8 3l4 3.5M4 9.5 8 13l4-3.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* System focus */}
                <div>
                    <label className={labelCls} htmlFor="pf-system">
                        System focus
                    </label>
                    <input
                        id="pf-system"
                        className={inputCls}
                        placeholder="e.g. SAP, Microsoft"
                        value={form.system}
                        onChange={set("system")}
                    />
                </div>

                {/* Questions or comments */}
                <div>
                    <label className={labelCls} htmlFor="pf-message">
                        Questions or comments
                    </label>
                    <textarea
                        id="pf-message"
                        rows={2}
                        className={`${inputCls} resize-none`}
                        placeholder="Anything you would like to add for optimal feedback"
                        value={form.message}
                        onChange={set("message")}
                    />
                </div>

                {/* Privacy — orange checkbox */}
                <label className="flex cursor-pointer items-center gap-2.5 text-xs text-ink">
                    <input
                        type="checkbox"
                        checked={form.privacy}
                        onChange={set("privacy")}
                        className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-black/15 bg-white
                       checked:border-brand checked:bg-brand
                       checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22white%22><path d=%22M12.7 4.7a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0l-2-2a1 1 0 1 1 1.4-1.4l1.3 1.3 4.3-4.3a1 1 0 0 1 1.4 0z%22/></svg>')]
                       bg-center bg-no-repeat"
                    />
                    <span>By submitting this form, I agree with the privacy policy</span>
                </label>

                {error && <p className="text-xs text-[#C43A36]">{error}</p>}

                {/* Submit */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full rounded-xl bg-charcoal-deep py-3.5 text-sm font-medium text-white transition hover:bg-charcoal"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default PartnerForm;