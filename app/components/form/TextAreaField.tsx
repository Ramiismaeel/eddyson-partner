import { forwardRef, type TextareaHTMLAttributes } from "react"
import { FieldShell } from "./FieldShell"
import { cn } from "@/app/utils/cn"
import { fieldBase, fieldBorder } from "@/app/utils/fieldStyle"

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  required?: boolean
  error?: string
}

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(function TextAreaField(
  { label, required, error, id, className, rows = 3, ...rest },
  ref
) {
  return (
    <FieldShell label={label} htmlFor={id} required={required} error={error}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        aria-invalid={!!error}
        className={cn(
          fieldBase,
          "resize-none",
          fieldBorder(!!error),
          className
        )}
        {...rest}
      />
    </FieldShell>
  )
})
