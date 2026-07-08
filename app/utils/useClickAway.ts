import { useEffect, useRef, type RefObject } from "react";

/**
 * Calls `onAway` when the user clicks outside `ref` or presses Escape, while
 * `active` is true. Uses the "latest ref" pattern so listeners are attached
 * only when `active` toggles (not on every render) and no ref is written
 * during render.
 */
export function useClickAway(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onAway: () => void,
): void {
  const savedOnAway = useRef(onAway);

  useEffect(() => {
    savedOnAway.current = onAway;
  }, [onAway]);

  useEffect(() => {
    if (!active) return;

    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        savedOnAway.current();
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") savedOnAway.current();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [ref, active]);
}