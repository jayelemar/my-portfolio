import React, { FC } from "react";
import { Badge } from "../../ui/badge";
import Link from "next/link";
import { FiFigma, FiGithub, FiLink } from "react-icons/fi";

type ProjectCardBodyType = {
  category: string;
  name: string;
  description: string;
  link: string;
  github?: string;
  figma?: string;
};

const ProjectCardBody: FC<ProjectCardBodyType> = ({
  category,
  name,
  description,
  link,
  github,
  figma,
}) => {
  return (
    <div className=" h-full px-8 pb-16 pt-0 xl:w-full">
      <Badge className="absolute left-5 top-4 mb-2 bg-green-400 text-sm font-medium uppercase">
        {category}
      </Badge>
      <h1 className="h4 mb-1 text-primary">{name}</h1>
      <p className="mb-3 line-clamp-2 text-base text-muted-foreground sm:line-clamp-none xl:line-clamp-2">
        {description}
      </p>
      <div className="flex">
        {/* buttons */}
        <div className="absolute flex gap-3">
          <Link
            href={link}
            target="_blank"
            className="flex items-center justify-center gap-1 rounded-full bg-primary px-3 py-1  text-sm font-medium text-muted hover:scale-110"
            aria-label="Click to see the Linked Project"
          >
            Demo <FiLink />
          </Link>
          {github && (
            <Link
              href={github}
              target="_blank"
              className="rounded-full bg-muted p-2 text-muted-foreground hover:scale-125"
              aria-label="Click to see the Github Repot"
            >
              <FiGithub />
            </Link>
          )}
          {figma && (
            <Link
              href={figma}
              target="_blank"
              className="rounded-full bg-muted p-1.5 text-muted-foreground hover:scale-125"
              aria-label="Click to see the Github Repot"
            >
              <FiFigma size={18} strokeWidth={2} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCardBody;
