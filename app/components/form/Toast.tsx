"use client"

import { useEffect } from "react"
import { cn } from "@/app/utils/cn"
import { CheckCircleIcon, AlertCircleIcon, CloseIcon } from "./Icons"
import type { ToastState } from "@/app/types/form"

interface ToastProps {
  toast: ToastState
  onClose: () => void
  /** Auto-dismiss delay in ms. Set to 0 to disable. */
  duration?: number
}

export function Toast({ toast, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (duration <= 0) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [toast, duration, onClose])

  const isSuccess = toast.type === "success"

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed left-1/2 top-6 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-start gap-3 rounded-xl border p-4 shadow-lg",
        isSuccess
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-red-200 bg-red-50 text-red-800"
      )}
    >
      {isSuccess ? (
        <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
      ) : (
        <AlertCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
      )}
      <p className="flex-1 text-sm leading-snug">{toast.message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
