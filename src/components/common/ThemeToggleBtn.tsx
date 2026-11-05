"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggleBtn() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      className="size-11 rounded-full bg-muted/60 text-foreground hover:bg-muted"
      variant="ghost"
      name="theme"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle color theme"
    >
      <Moon
        size={22}
        strokeWidth={1.75}
        className="dark:hidden"
        aria-hidden="true"
      />
      <Sun
        size={22}
        strokeWidth={1.75}
        className="hidden dark:block"
        aria-hidden="true"
      />
    </Button>
  );
}
