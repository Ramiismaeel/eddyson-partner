import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

/* Fieldset-style container: label notched into the top border with a red required dot,
   a faint rule extending to the right edge. */
export function FieldShell({
    id,
    label,
    required,
    children,
}: {
    id: string;
    label: string;
    required?: boolean;
    children: ReactNode;
}) {
    return (
        <fieldset className="rounded-xl border border-black/10 px-3.5 pb-2.5 pt-0 transition focus-within:border-brand">
            <legend className="ml-1 flex items-center gap-1.5 px-1.5 text-sm text-ink">
                <label htmlFor={id}>{label}</label>
                {required && (
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#E5484D]" />
                )}
                {/* faint rule from label to the field's right edge */}
                <span aria-hidden="true" className="ml-1 h-px w-full min-w-[40px] flex-1 bg-black/10" />
            </legend>
            {children}
        </fieldset>
    );
}

/* Shared inner control — borderless, since the fieldset owns the border */
export const controlCls =
    "w-full bg-transparent px-1.5 pb-1 text-base text-ink placeholder:text-neutral-400 outline-none";

type BaseProps = { id: string; label: string; required?: boolean };

export function TextField({
    id, label, required, ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <FieldShell id={id} label={label} required={required}>
            <input id={id} className={controlCls} {...rest} />
        </FieldShell>
    );
}

export function TextAreaField({
    id, label, required, ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <FieldShell id={id} label={label} required={required}>
            <textarea id={id} className={`${controlCls} resize-none`} {...rest} />
        </FieldShell>
    );
}

export function SelectField({
    id, label, required, options, placeholder, value, ...rest
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement> & {
    options: string[];
    placeholder: string;
}) {
    return (
        <FieldShell id={id} label={label} required={required}>
            <div className="relative">
                <select
                    id={id}
                    value={value}
                    className={`${controlCls} appearance-none pr-8 ${value ? "" : "text-neutral-400"}`}
                    {...rest}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((o) => (
                        <option key={o} value={o} className="text-ink">{o}</option>
                    ))}
                </select>
                <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute right-1.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                    viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                >
                    <path d="M4 6.5 8 3l4 3.5M4 9.5 8 13l4-3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </FieldShell>
    );
}