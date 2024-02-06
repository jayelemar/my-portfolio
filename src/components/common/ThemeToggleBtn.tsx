"use client"

import * as React from "react"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"


export function ThemeToggleBtn() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="">
      <Button onClick={() => setTheme( theme === 'dark' ? 'light' : 'dark')}>
        <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0"/>
        <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
      </Button>
    </div>
  )
}
