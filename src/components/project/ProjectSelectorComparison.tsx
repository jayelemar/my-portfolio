"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { projectData } from "./ProjectData";
import ProjectSelector, { type ProjectSelectorStyle } from "./ProjectSelector";
import ProjectCard from "./projectCard/ProjectCard";

const projects = projectData.filter((project) => project.featured);
const options: {
  style: ProjectSelectorStyle;
  title: string;
  description: string;
}[] = [
  {
    style: "underline",
    title: "Underline tabs · Recommended",
    description:
      "The quietest option. A sliding green underline keeps the selected project clear.",
  },
  {
    style: "segmented",
    title: "Soft segmented control",
    description:
      "A sliding selected background, following the style of your About tabs.",
  },
  {
    style: "pills",
    title: "Refined pills",
    description:
      "Separate outlined buttons with a subtle green selected state.",
  },
];

export default function ProjectSelectorComparison() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="container mx-auto max-w-[1264px] py-10 sm:py-14"
    >
      <Link
        href="/#projects"
        className="inline-flex min-h-11 items-center text-sm text-forest-ink underline underline-offset-4"
      >
        Back to Projects
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Compare project selectors
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Try a project in any row to compare the selected states and animations.
        All three rows control the same preview.
      </p>
      <div className="mt-10 space-y-8">
        {options.map((option) => (
          <section
            key={option.style}
            aria-labelledby={`selector-${option.style}`}
            className="border-t border-border pt-6"
          >
            <h2
              id={`selector-${option.style}`}
              className="text-lg font-semibold"
            >
              {option.title}
            </h2>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">
              {option.description}
            </p>
            <div className="w-fit max-w-full">
              <ProjectSelector
                names={projects.map((project) => project.name)}
                active={active}
                onSelect={setActive}
                style={option.style}
                reduceMotion={Boolean(reduceMotion)}
                controlsId="selector-project-preview"
              />
            </div>
          </section>
        ))}
      </div>
      <div id="selector-project-preview" className="mt-10 scroll-mt-20">
        <ProjectCard project={projects[active]} variant="featured" />
      </div>
    </main>
  );
}
