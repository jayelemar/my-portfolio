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
              sizes="auto, (max-width: 639px) calc(100vw - 98px), (max-width: 767px) calc(100vw - 114px), (max-width: 1023px) calc(50vw - 92px), (max-width: 1263px) calc(33.333vw - 87.333px), 334px"
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
            sizes="auto, (max-width: 1023px) calc(80vw - 52.8px), (max-width: 1263px) calc(44vw - 29.04px), 527.12px"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        <div className="absolute bottom-[5%] right-[2%] h-[72%] w-[24%]">
          <Image
            src={mobileImage}
            alt={`${projectName} mobile interface`}
            fill
            sizes="auto, (max-width: 1023px) calc(24vw - 15.84px), (max-width: 1263px) calc(13.2vw - 8.712px), 158.136px"
            className="object-contain object-bottom"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardHeader;
