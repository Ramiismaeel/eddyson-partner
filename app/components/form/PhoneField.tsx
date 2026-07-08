"use client"

import { useEffect, useRef, useState, type ChangeEvent } from "react"
import Image from "next/image"
import { FieldShell } from "./FieldShell"
import { cn } from "@/app/utils/cn"
import { useClickAway } from "@/app/utils/useClickAway"
import {
  COUNTRIES,
  findCountry,
  flagUrl,
  type Country,
} from "@/app/utils/countries"
import { ChevronDownIcon } from "./Icons"

interface PhoneFieldProps {
  label: string
  /** Full E.164-style value, e.g. "+33612345678" ("" when empty). */
  value: string
  onChange: (phone: string) => void
  required?: boolean
  error?: string
  id?: string
  /** ISO 3166-1 alpha-2, lowercase. */
  defaultCountry?: string
}

/**
 * Self-contained international phone input — no external library.
 *
 * Owns the selected country + national number internally and emits a single
 * combined string via `onChange` (so the form keeps `phone` as one string).
 * When the form clears `value`, the field resets itself.
 */
export function PhoneField({
  label,
  value,
  onChange,
  required,
  error,
  id = "phone",
  defaultCountry = "fr",
}: PhoneFieldProps) {
  const [iso2, setIso2] = useState(defaultCountry)
  const [nationalNumber, setNationalNumber] = useState("")
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const wrapperRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useClickAway(wrapperRef, open, () => setOpen(false))

  const country: Country = findCountry(iso2) ?? COUNTRIES[0]

  // Reset when the form clears the value (e.g. after a successful submit).
  useEffect(() => {
    if (value === "") {
      setNationalNumber("")
      setIso2(defaultCountry)
    }
  }, [value, defaultCountry])

  // Focus the search box when the dropdown opens; clear it when it closes.
  useEffect(() => {
    if (open) searchRef.current?.focus()
    else setSearch("")
  }, [open])

  function emit(nextIso: string, nextNumber: string) {
    const digits = nextNumber.replace(/\D/g, "")
    const c = findCountry(nextIso) ?? COUNTRIES[0]
    onChange(digits ? `+${c.dialCode}${digits}` : "")
  }

  function selectCountry(nextIso: string) {
    setIso2(nextIso)
    setOpen(false)
    emit(nextIso, nationalNumber)
  }

  function handleNumberChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.value.replace(/[^\d\s]/g, "")
    setNationalNumber(next)
    emit(iso2, next)
  }

  const query = search.trim().toLowerCase()
  const filtered = query
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.dialCode.includes(query.replace("+", ""))
      )
    : COUNTRIES

  return (
    <FieldShell label={label} htmlFor={id} required={required} error={error}>
      <div ref={wrapperRef} className="relative">
        <div
          className={cn(
            "flex w-full items-center rounded-lg border bg-white transition-colors focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-neutral-900/5",
            error ? "border-red-400" : "border-neutral-200"
          )}
        >
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`Country code: ${country.name} (+${country.dialCode})`}
            className="flex items-center gap-1 rounded-l-lg py-3 pl-4 pr-1 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/10"
          >
            <Image
              src={flagUrl(country.iso2)}
              alt=""
              width={22}
              height={16}
              className="h-4 w-[22px] rounded-[2px] object-cover"
            />
            <ChevronDownIcon className="h-4 w-4 text-neutral-400" />
          </button>

          <span className="select-none pr-1 text-[15px] text-neutral-500">
            +{country.dialCode}
          </span>

          <input
            id={id}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            aria-invalid={!!error}
            value={nationalNumber}
            onChange={handleNumberChange}
            placeholder="000 000 000"
            className="w-full border-0 bg-transparent py-3 pl-1 pr-4 text-[15px] text-neutral-900 outline-none placeholder:text-neutral-400"
          />
        </div>

        {open && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
            <div className="border-b border-neutral-100 p-2">
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country"
                className="w-full rounded-md border border-neutral-200 px-3 py-2 text-[14px] text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400"
              />
            </div>

            <ul role="listbox" className="max-h-56 overflow-auto p-1">
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-[14px] text-neutral-400">
                  No matches
                </li>
              )}
              {filtered.map((c) => (
                <li key={c.iso2} role="option" aria-selected={c.iso2 === iso2}>
                  <button
                    type="button"
                    onClick={() => selectCountry(c.iso2)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[14px] transition-colors hover:bg-neutral-50",
                      c.iso2 === iso2 && "bg-neutral-50"
                    )}
                  >
                    <Image
                      src={flagUrl(c.iso2)}
                      alt=""
                      width={22}
                      height={16}
                      loading="lazy"
                      className="h-4 w-[22px] rounded-[2px] object-cover"
                    />
                    <span className="flex-1 text-neutral-700">{c.name}</span>
                    <span className="text-neutral-400">+{c.dialCode}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </FieldShell>
  )
}
