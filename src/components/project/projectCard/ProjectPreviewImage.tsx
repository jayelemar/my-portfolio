"use client";

import { useEffect, useRef, useState } from "react";
import {
  getResponsiveImageProps,
  type ResponsiveImageAsset,
} from "@/lib/responsive-images";
import { cn } from "@/lib/utils";

type ProjectPreviewImageProps = {
  asset: ResponsiveImageAsset;
  alt: string;
  sizes: string;
  fill?: boolean;
  className?: string;
};

type ImageState = "native" | "pending" | "ready" | "error";

export default function ProjectPreviewImage({
  asset,
  ...options
}: ProjectPreviewImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  // SSR remains usable before hydration and with JavaScript disabled.
  const [state, setState] = useState<ImageState>("native");
  const props = getResponsiveImageProps(asset, { ...options, loading: "lazy" });

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    let disposed = false;

    const fail = () => {
      if (!disposed) setState("error");
    };
    const decode = () => {
      const source = image.currentSrc || image.src;
      void image.decode().then(
        () => {
          if (!disposed && image.currentSrc === source) setState("ready");
        },
        () => {
          // A resize can replace a candidate while its previous decode awaits.
          if (!disposed && image.currentSrc === source) fail();
        },
      );
    };

    image.addEventListener("load", decode);
    image.addEventListener("error", fail);
    if (image.complete) {
      if (image.naturalWidth > 0) decode();
      else fail();
    } else {
      setState("pending");
    }

    return () => {
      disposed = true;
      image.removeEventListener("load", decode);
      image.removeEventListener("error", fail);
    };
  }, [asset.src]);

  return (
    <span
      className={cn("relative block w-full", options.fill && "h-full")}
      style={
        options.fill
          ? undefined
          : { aspectRatio: `${asset.width} / ${asset.height}` }
      }
      data-preview-state={state}
    >
      {state === "pending" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] bg-emerald-50 dark:bg-neutral-900"
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        ref={imageRef}
        className={cn(
          props.className,
          state === "ready" && "transition-opacity duration-200",
          "motion-reduce:transition-none",
        )}
        style={{
          ...props.style,
          opacity: state === "pending" || state === "error" ? 0 : 1,
        }}
      />
      {state === "error" && (
        <span className="absolute inset-0 grid place-items-center bg-muted px-2 text-center text-xs leading-relaxed text-muted-foreground">
          Preview unavailable
        </span>
      )}
    </span>
  );
}
