"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ProjectSelectorStyle = "underline" | "segmented" | "pills";

type ProjectSelectorProps = {
  names: string[];
  active: number;
  onSelect: (index: number) => void;
  style?: ProjectSelectorStyle;
  reduceMotion?: boolean;
  controlsId?: string;
};

export default function ProjectSelector({
  names,
  active,
  onSelect,
  style = "pills",
  reduceMotion = false,
  controlsId,
}: ProjectSelectorProps) {
  const id = useId();
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2",
        style === "underline" && "gap-4 border-b border-border",
        style === "segmented" && "gap-1 rounded-xl bg-muted p-1",
      )}
      aria-label="Choose a featured project"
    >
      {names.map((name, index) => (
        <button
          key={name}
          type="button"
          onClick={() => onSelect(index)}
          aria-controls={controlsId}
          aria-current={active === index ? "true" : undefined}
          className={cn(
            "relative isolate inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            style === "pills" && "rounded-full border",
            style === "pills" &&
              (active === index
                ? "border-primary bg-primary/5"
                : "border-border"),
            style === "underline" && "rounded-sm px-2",
            style === "segmented" && "rounded-lg",
            active === index ? "text-primary" : "text-muted-foreground",
          )}
        >
          {active === index && style !== "pills" && (
            <motion.span
              aria-hidden="true"
              layoutId={`project-selector-${id}`}
              className={cn(
                "absolute -z-10",
                style === "underline"
                  ? "inset-x-0 -bottom-px h-0.5 bg-primary"
                  : "inset-0 rounded-lg bg-background shadow-sm",
              )}
              transition={{
                duration: reduceMotion ? 0 : 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          )}
          {name}
        </button>
      ))}
    </div>
  );
}
