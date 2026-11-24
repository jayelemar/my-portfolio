import { getImageProps, type ImageProps } from "next/image";

export type ResponsiveImageAsset = {
  src: string;
  width: number;
  height: number;
  variants: { src: string; width: number }[];
};

type ResponsiveImageOptions = Omit<
  ImageProps,
  "src" | "srcSet" | "width" | "height"
>;

export function getResponsiveImageProps(
  asset: ResponsiveImageAsset,
  options: ResponsiveImageOptions,
) {
  const { props } = getImageProps({
    ...options,
    src: asset.src,
    ...(!options.fill && { width: asset.width, height: asset.height }),
  });
  // Next embeds the build's image configuration into getImageProps. Keep its
  // optimizer URLs when enabled; otherwise supply our versioned static files.
  if (props.srcSet) return props;
  const fallback = asset.variants.reduce((selected, variant) => {
    if (
      variant.width <= 640 &&
      (selected.width > 640 || variant.width > selected.width)
    )
      return variant;
    return selected;
  }, asset.variants[0]);
  return {
    ...props,
    sizes: options.sizes,
    srcSet: asset.variants
      .map((variant) => `${variant.src} ${variant.width}w`)
      .join(", "),
    src: fallback.src,
  };
}
