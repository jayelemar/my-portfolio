import type { FC } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiFigma, FiGithub } from "react-icons/fi";
import type { ProjectStatus } from "../ProjectData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
type ProjectCardBodyType = {
  name: string;
  description: string;
  technologies: string[];
  link: string;
  github?: string;
  figma?: string;
  status: ProjectStatus;
  variant: "featured" | "compact";
};

const PROJECT_ACTIONS = {
  active: "Visit live site",
  inactive: null,
  demo: "View demo",
} as const;

const ProjectCardBody: FC<ProjectCardBodyType> = ({
  name,
  description,
  technologies,
  link,
  github,
  figma,
  status,
  variant,
}) => {
  const actionLabel = PROJECT_ACTIONS[status];

  return (
    <div
      className={cn(
        "flex h-full flex-col",
        variant === "featured" ? "p-5 sm:p-8" : "p-5 sm:p-6",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h3
          className={cn(
            "font-bold tracking-tight text-primary",
            variant === "featured"
              ? "text-2xl sm:text-3xl lg:text-4xl"
              : "text-2xl lg:min-h-16 xl:min-h-8",
          )}
        >
          {name}
        </h3>
      </div>
      <p
        className={cn(
          "mt-3 leading-relaxed text-muted-foreground",
          variant === "featured" ? "lg:mt-4" : "lg:min-h-[5rem]",
        )}
      >
        {description}
      </p>

      <ul
        className={cn(
          "flex flex-wrap gap-2",
          variant === "featured" ? "mt-4 lg:mt-6" : "mt-3",
        )}
        aria-label="Technologies used"
      >
        {technologies.map((technology) => (
          <Badge key={technology} variant="technology" asChild>
            <li>{technology}</li>
          </Badge>
        ))}
      </ul>

      {(actionLabel || github || figma) && (
        <div
          className={cn(
            "mt-auto flex flex-wrap items-center gap-3",
            variant === "featured" ? "pt-5 lg:pt-8" : "pt-4",
          )}
        >
          {actionLabel && (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`${actionLabel}: ${name}`}
            >
              {actionLabel}
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          )}
          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-full border bg-background p-2.5 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
              className="inline-flex size-11 items-center justify-center rounded-full border bg-background p-2.5 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`View the ${name} design in Figma`}
              title="View Figma design"
            >
              <FiFigma aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCardBody;
