"use client"
import Link from "next/link"

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Arman Kar
        </Link>
        <p className="text-zinc-600 dark:text-zinc-500">Frontend Engineer</p>
      </div>
    </header>
  )
}
