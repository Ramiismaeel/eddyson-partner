"use client";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { FieldShell } from "./fields";

type PhoneFieldProps = {
    id: string;
    label: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
};

export default function PhoneField({ id, label, required, value, onChange }: PhoneFieldProps) {
    return (
        <FieldShell id={id} label={label} required={required}>
            <PhoneInput
                defaultCountry="fr"           /* mock shows 🇫🇷 +33 */
                value={value}
                onChange={onChange}
                className="phone-field"
                inputProps={{ id, autoComplete: "tel" }}
            />
        </FieldShell>
    );
}