/**
 * Single source of truth for control styling, so <input>, <textarea>,
 * the multi-select trigger and the phone wrapper stay pixel-identical.
 *
 * Accent colour (`#e46a1c`) matches the eddyson design tokens — swap it for
 * a Tailwind theme token (e.g. `primary`) once you've wired it into your config.
 */
export const ACCENT = "#e46a1c";

/** Base look shared by text-like controls. */
export const fieldBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-[15px] leading-normal text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-900/5";

/** Border colour depending on validity. */
export function fieldBorder(hasError?: boolean): string {
  return hasError ? "border-red-400" : "border-neutral-200";
}