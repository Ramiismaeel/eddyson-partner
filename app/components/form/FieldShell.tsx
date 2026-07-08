import type { ReactNode } from "react"
import { cn } from "@/app/utils/cn"
import { ACCENT } from "@/app/utils/fieldStyle"

interface FieldShellProps {
  label: string
  htmlFor?: string
  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}

/**
 * Wraps any control and renders the label that sits *on* the top border.
 *
 * The gap in the border is created by giving the label a solid `bg-white`
 * matching the card behind it plus horizontal padding — the label's
 * background masks the border segment underneath it. Because it's a real
 * element (not a fieldset legend) it works for inputs, selects and
 * textareas alike. If your card sits on a non-white surface, change the
 * label background to that colour so the notch stays clean.
 */
export function FieldShell({
  label,
  htmlFor,
  required,
  error,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn("relative", className)}>
      <label
        htmlFor={htmlFor}
        className="absolute -top-[6px] left-3 z-10 bg-white px-1 text-[12px] font-medium leading-none text-neutral-600"
      >
        {label}
        {required && (
          <div
            aria-hidden
            className="inline-flex ml-1 w-1 h-1 bg-[#C43A36] rounded-full max-h-1 align-middle self-center"
          />
        )}
      </label>

      {children}

      {error && (
        <p role="alert" className="mt-1.5 pl-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
