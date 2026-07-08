import { forwardRef, type InputHTMLAttributes } from "react"
import { FieldShell } from "./FieldShell"
import { cn } from "@/app/utils/cn"
import { fieldBase, fieldBorder } from "@/app/utils/fieldStyle"

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  required?: boolean
  error?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ label, required, error, id, className, ...rest }, ref) {
    return (
      <FieldShell label={label} htmlFor={id} required={required} error={error}>
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          className={cn(fieldBase, fieldBorder(!!error), className)}
          {...rest}
        />
      </FieldShell>
    )
  }
)
