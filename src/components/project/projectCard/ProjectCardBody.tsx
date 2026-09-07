import React, { FC } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiFigma, FiGithub } from "react-icons/fi";
import { ProjectStatus } from "../ProjectData";
import { cn } from "@/lib/utils";

type ProjectCardBodyType = {
  category: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  github?: string;
  figma?: string;
  status: ProjectStatus;
  index: number;
  variant: "featured" | "compact";
};

const PROJECT_STATUS = {
  active: {
    label: "Live",
    dotClassName: "bg-primary",
    actionLabel: "Visit live site",
  },
  inactive: {
    label: "Archived",
    dotClassName: "bg-muted-foreground",
    actionLabel: null,
  },
  demo: {
    label: "Demo",
    dotClassName: "bg-amber-400",
    actionLabel: "View demo",
  },
} as const;

const ProjectCardBody: FC<ProjectCardBodyType> = ({
  category,
  name,
  description,
  technologies,
  link,
  github,
  figma,
  status,
  index,
  variant,
}) => {
  const statusConfig = PROJECT_STATUS[status];

  return (
    <div
      className={cn(
        "flex h-full flex-col",
        variant === "featured" ? "p-5 sm:p-8 lg:p-10" : "p-5 sm:p-6",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-4",
          variant === "featured" ? "mb-4 lg:mb-8" : "mb-4",
        )}
      >
        <div className="flex items-center gap-2">
          <span className="rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            {category}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span
              className={cn("size-2 rounded-full", statusConfig.dotClassName)}
            />
            {statusConfig.label}
          </span>
        </div>
        <span className="font-mono text-xs text-muted-foreground/70">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3
        className={cn(
          "font-bold tracking-tight text-primary",
          variant === "featured"
            ? "text-2xl sm:text-3xl lg:text-4xl"
            : "text-2xl lg:min-h-[3.5rem]",
        )}
      >
        {name}
      </h3>
      <p
        className={cn(
          "mt-3 leading-relaxed text-muted-foreground lg:mt-4",
          variant === "featured"
            ? "line-clamp-2 lg:line-clamp-none"
            : "line-clamp-2 lg:min-h-[3.25rem]",
        )}
      >
        {description}
      </p>

      <ul
        className={cn(
          "flex flex-wrap gap-2",
          variant === "featured"
            ? "mt-4 lg:mt-6"
            : "mt-4 lg:min-h-[3.5rem] lg:content-start",
        )}
        aria-label="Technologies used"
      >
        {technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
          >
            {technology}
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "mt-auto flex flex-wrap items-center gap-3",
          variant === "featured" ? "pt-5 lg:pt-8" : "pt-5",
        )}
      >
        {statusConfig.actionLabel && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`${statusConfig.actionLabel}: ${name}`}
          >
            {statusConfig.actionLabel}
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        )}
        {github && (
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border bg-background p-2.5 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`View ${name} source code on GitHub`}
            title="View GitHub repository"
          >
            <FiGithub aria-hidden="true" />
          </Link>
        )}
        {figma && (
          <Link
            href={figma}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border bg-background p-2.5 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`View the ${name} design in Figma`}
            title="View Figma design"
          >
            <FiFigma aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectCardBody;
