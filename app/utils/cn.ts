/**
 * Tiny className helper (no external deps).
 * If your project already exposes `cn` from `@/lib/utils` (e.g. shadcn),
 * delete this file and import that one instead.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}