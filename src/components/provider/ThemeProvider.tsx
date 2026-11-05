"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { RouteEntryProvider } from "./RouteEntryProvider";
import { MotionConfig } from "framer-motion";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <MotionConfig reducedMotion="user">
        <RouteEntryProvider>{children}</RouteEntryProvider>
      </MotionConfig>
    </NextThemesProvider>
  );
}
