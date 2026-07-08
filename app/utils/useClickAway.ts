import { useEffect, useRef, type RefObject } from "react";

/**
 * Calls `onAway` when the user clicks outside `ref` or presses Escape,
 * while `active` is true. Listeners are attached only when active.
 */
export function useClickAway(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onAway: () => void,
): void {
  const callback = useRef(onAway);
  useEffect(() => {
    callback.current = onAway;
  });

  useEffect(() => {
    if (!active) return;

    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback.current();
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") callback.current();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [ref, active]);
}