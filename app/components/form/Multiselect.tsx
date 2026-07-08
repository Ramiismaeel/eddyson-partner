"use client"

import { useRef, useState } from "react"
import { FieldShell } from "./FieldShell"
import { cn } from "@/app/utils/cn"
import { fieldBorder, ACCENT } from "@/app/utils/fieldStyle"
import { ChevronsUpDownIcon, CheckIcon } from "./Icons"
import { useClickAway } from "@/app/utils/useClickAway"

export interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  label: string
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  required?: boolean
  error?: string
  id?: string
}

export function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select at least one",
  required,
  error,
  id,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useClickAway(wrapperRef, open, () => setOpen(false))

  function toggle(optionValue: string) {
    onChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue]
    )
  }

  const selectedLabels = options
    .filter((o) => value.includes(o.value))
    .map((o) => o.label)
    .join(", ")

  return (
    <FieldShell label={label} htmlFor={id} required={required} error={error}>
      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          id={id}
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-3 text-left text-[15px] outline-none transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-900/5",
            fieldBorder(!!error)
          )}
        >
          <span
            className={cn(
              "truncate",
              value.length ? "text-neutral-900" : "text-neutral-400"
            )}
          >
            {value.length ? selectedLabels : placeholder}
          </span>
          <ChevronsUpDownIcon className="h-4 w-4 shrink-0 text-neutral-400" />
        </button>

        {open && (
          <ul
            role="listbox"
            aria-multiselectable
            className="absolute left-0 right-0 top-full z-20 mt-2 max-h-60 overflow-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg"
          >
            {options.map((option) => {
              const checked = value.includes(option.value)
              return (
                <li key={option.value} role="option" aria-selected={checked}>
                  <button
                    type="button"
                    onClick={() => toggle(option.value)}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[14px] text-neutral-700 transition-colors hover:bg-neutral-50"
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                        checked ? "border-transparent" : "border-neutral-300"
                      )}
                      style={checked ? { backgroundColor: ACCENT } : undefined}
                    >
                      {checked && <CheckIcon className="h-3 w-3 text-white" />}
                    </span>
                    {option.label}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </FieldShell>
  )
}
