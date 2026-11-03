import Image, { type StaticImageData } from "next/image";
import type { FC } from "react";

type ProjectCardHeader = {
  desktopImage: StaticImageData;
  mobileImage: StaticImageData;
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
    <div className="relative flex h-full items-center overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-white dark:from-emerald-950/60 dark:via-neutral-900 dark:to-neutral-950">
      <div className="relative aspect-[3/2] w-full">
        <div className="absolute left-[5%] top-[5%] w-[80%] overflow-hidden rounded-lg bg-white shadow-2xl sm:rounded-xl">
          <div
            aria-hidden="true"
            className="flex h-4 items-center gap-1 border-b border-black/10 bg-neutral-100 px-2 dark:border-white/10 dark:bg-neutral-800 sm:h-6 sm:gap-1.5 sm:px-3"
          >
            <span className="size-1 rounded-full bg-primary sm:size-2" />
            <span className="size-1 rounded-full bg-primary/60 sm:size-2" />
            <span className="size-1 rounded-full bg-primary/30 sm:size-2" />
          </div>
          <Image
            src={desktopImage}
            alt={`${projectName} desktop interface`}
            sizes="(max-width: 1023px) 80vw, 44vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        <div className="absolute bottom-[5%] right-[2%] h-[72%] w-[24%]">
          <Image
            src={mobileImage}
            alt={`${projectName} mobile interface`}
            fill
            sizes="(max-width: 1023px) 24vw, 14vw"
            className="object-contain object-bottom"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardHeader;
