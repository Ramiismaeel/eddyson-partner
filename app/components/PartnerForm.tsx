"use client";

import { FC, useState } from "react";
import { TextField, TextAreaField, SelectField } from "@/app/components/form/fields";
import PhoneField from "@/app/components/form/PhoneField";

const PARTNER_TYPES = ["Implementation Partner", "Sales Partner", "Other"];
const INDUSTRIES = ["Automotive", "Grocery", "Logistics", "Retail", "Production"];

const PartnerForm: FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: "", company: "", email: "", phone: "",
        partnerType: "", industry: "", system: "", message: "",
        privacy: true,
    });

    const handleSubmit = () => {
        setError(null);
        if (!form.name || !form.company || !form.email || !form.partnerType || !form.industry) {
            setError("Please fill in all required fields.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setError("Please enter a valid business email.");
            return;
        }
        if (form.phone.replace(/\D/g, "").length < 7) {
            setError("Please enter a valid phone number.");
            return;
        }
        if (!form.privacy) {
            setError("Please agree to the privacy policy.");
            return;
        }
        console.log("Partner inquiry:", form);
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
        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_36px_rgba(0,0,0,0.10)] md:p-7">
            <div className="space-y-4">
                <TextField id="pf-name" label="First and Last name" required
                    placeholder="Valery Jacobson jr III" autoComplete="name"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

                <TextField id="pf-company" label="Company" required
                    placeholder="Your company" autoComplete="organization"
                    value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />

                <TextField id="pf-email" label="Business email" required type="email"
                    placeholder="you@yourcompany.com" autoComplete="email"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

                <PhoneField id="pf-phone" label="Phone" required
                    value={form.phone} onChange={(phone) => setForm({ ...form, phone })} />

                <SelectField id="pf-type" label="Partner types" required
                    placeholder="Select at least one" options={PARTNER_TYPES}
                    value={form.partnerType} onChange={(e) => setForm({ ...form, partnerType: e.target.value })} />

                <SelectField id="pf-industry" label="Industry" required
                    placeholder="Select at least one" options={INDUSTRIES}
                    value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />

                <TextField id="pf-system" label="System focus"
                    placeholder="e.g. SAP, Microsoft"
                    value={form.system} onChange={(e) => setForm({ ...form, system: e.target.value })} />

                <TextAreaField id="pf-message" label="Questions or comments" rows={2}
                    placeholder="Anything you would like to add for optimal feedback"
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />

                {/* privacy checkbox + error + submit button — unchanged from before */}
            </div>
        </div>
    );
};

export default PartnerForm;