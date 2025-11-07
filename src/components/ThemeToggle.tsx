"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Toggle variant="outline" className="size-9" aria-label="Toggle theme">
        <SunIcon size={16} aria-hidden="true" />
      </Toggle>
    )
  }

  return (
    <Toggle
      variant="outline"
      className="group size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
      pressed={theme === "dark"}
      onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <MoonIcon
        size={16}
        className="shrink-0 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100"
        aria-hidden="true"
      />
      <SunIcon
        size={16}
        className="absolute shrink-0 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0"
        aria-hidden="true"
      />
    </Toggle>
  )
}