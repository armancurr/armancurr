"use client"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const THEMES_OPTIONS = [
  {
    label: "Light",
    id: "light",
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    label: "Dark",
    id: "dark",
    icon: <MoonIcon className="h-4 w-4" />,
  },
  {
    label: "System",
    id: "system",
    icon: <MonitorIcon className="h-4 w-4" />,
  },
]

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex gap-1">
      {THEMES_OPTIONS.map((themeOption) => {
        return (
          <button
            key={themeOption.id}
            className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors duration-100 focus-visible:outline-2 ${
              theme === themeOption.id
                ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
            type="button"
            aria-label={`Switch to ${themeOption.label} theme`}
            onClick={() => setTheme(themeOption.id)}
          >
            {themeOption.icon}
          </button>
        )
      })}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">© 2024 Arman Kar.</span>
        <div className="text-xs text-zinc-400">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}
