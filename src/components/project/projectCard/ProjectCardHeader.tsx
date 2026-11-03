import Image from "next/image";
import React, { FC } from "react";
import { cn } from "@/lib/utils";

type ProjectCardHeader = {
  desktopImage: string;
  mobileImage: string;
  projectName: string;
  variant: "featured" | "compact";
};

const ProjectCardHeader: FC<ProjectCardHeader> = ({
  desktopImage,
  mobileImage,
  projectName,
  variant,
}) => {
  if (variant === "compact") {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-white dark:from-emerald-950/60 dark:via-neutral-900 dark:to-neutral-950">
        <div className="absolute inset-4 overflow-hidden rounded-lg border border-black/10 bg-white shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:border-white/10 sm:inset-6">
          <div className="flex h-5 items-center gap-1.5 border-b border-black/10 bg-neutral-100 px-2.5 dark:border-white/10 dark:bg-neutral-800">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="size-1.5 rounded-full bg-primary/60" />
            <span className="size-1.5 rounded-full bg-primary/30" />
          </div>
          <div className="relative h-[calc(100%_-_1.25rem)]">
            <Image
              src={desktopImage}
              alt={`${projectName} desktop interface`}
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 42vw, 22vw"
              className="bg-white object-contain object-top"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[16/10] h-auto overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-white dark:from-emerald-950/60 dark:via-neutral-900 dark:to-neutral-950 sm:aspect-auto sm:h-80 lg:h-full lg:min-h-[440px]",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.18),transparent_42%)]" />

      <div className="absolute left-[5%] top-[6%] aspect-[16/10] w-[84%] overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:border-white/10 lg:top-[14%]">
        <div className="flex h-6 items-center gap-1.5 border-b border-black/10 bg-neutral-100 px-3 dark:border-white/10 dark:bg-neutral-800">
          <span className="size-2 rounded-full bg-primary" />
          <span className="size-2 rounded-full bg-primary/60" />
          <span className="size-2 rounded-full bg-primary/30" />
        </div>
        <div className="relative h-[calc(100%_-_1.5rem)]">
          <Image
            src={desktopImage}
            alt={`${projectName} desktop interface`}
            fill
            sizes="(max-width: 1024px) 82vw, 48vw"
            className="object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>

      <div className="absolute bottom-[5%] right-[2%] h-[72%] w-[24%] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03]">
        <Image
          src={mobileImage}
          alt={`${projectName} mobile interface`}
          fill
          sizes="(max-width: 1024px) 24vw, 14vw"
          className="object-contain object-bottom"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ProjectCardHeader;
