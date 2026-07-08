"use client"

import type { ReactNode } from "react"
import { ACCENT } from "@/app/utils/fieldStyle"
import { cn } from "@/app/utils/cn"
import { CheckIcon } from "./Icons"

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  children: ReactNode
  id?: string
}

export function Checkbox({ checked, onChange, children, id }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer select-none items-center gap-3"
    >
      {/* Real input kept for accessibility + form semantics, visually hidden. */}
      <input
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-900/20",
          checked ? "border-transparent" : "border-neutral-300 bg-white"
        )}
        style={checked ? { backgroundColor: ACCENT } : undefined}
      >
        {checked && <CheckIcon className="h-3.5 w-3.5 text-white" />}
      </span>
      <span className="text-[14px] text-neutral-700">{children}</span>
    </label>
  )
}
