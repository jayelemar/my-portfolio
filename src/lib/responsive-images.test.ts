import { createRequire } from "node:module";
import { afterEach, describe, expect, it } from "vitest";
import {
  getResponsiveImageProps,
  type ResponsiveImageAsset,
} from "./responsive-images";

const require = createRequire(`${process.cwd()}/next.config.js`);
const originalMode = process.env.IMAGE_OPTIMIZATION_ENABLED;
afterEach(() => {
  if (originalMode === undefined) delete process.env.IMAGE_OPTIMIZATION_ENABLED;
  else process.env.IMAGE_OPTIMIZATION_ENABLED = originalMode;
});

describe("image delivery configuration", () => {
  it.each([undefined, "false", "true", "TRUE", "1"])(
    "only enables optimization for exact true (%s)",
    (mode) => {
      if (mode === undefined) delete process.env.IMAGE_OPTIMIZATION_ENABLED;
      else process.env.IMAGE_OPTIMIZATION_ENABLED = mode;
      delete require.cache[require.resolve("./next.config.js")];
      const config = require("./next.config.js");
      expect(config.images.unoptimized).toBe(mode !== "true");
      expect(config.env).not.toHaveProperty("IMAGE_OPTIMIZATION_ENABLED");
    },
  );
});

const asset: ResponsiveImageAsset = {
  src: "/work/example.png",
  width: 1000,
  height: 500,
  variants: [160, 320, 640, 1000].map((width) => ({
    src: `/images/generated/example-${width}.webp`,
    width,
  })),
};

describe("responsive image props", () => {
  it("uses static candidates and a small fallback with preserved dimensions and semantics", () => {
    const props = getResponsiveImageProps(asset, {
      alt: "Example",
      sizes: "50vw",
      loading: "lazy",
      unoptimized: true,
      className: "preview",
    });
    expect(props).toMatchObject({
      src: asset.variants[2].src,
      srcSet: asset.variants.map((v) => `${v.src} ${v.width}w`).join(", "),
      sizes: "50vw",
      width: 1000,
      height: 500,
      alt: "Example",
      loading: "lazy",
      className: "preview",
    });
  });
  it("keeps fill positioning without width/height attributes", () => {
    const props = getResponsiveImageProps(asset, {
      alt: "",
      sizes: "24vw",
      fill: true,
      unoptimized: true,
    });
    expect(props.style).toMatchObject({
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
    });
    expect(props.width).toBeUndefined();
    expect(props.height).toBeUndefined();
    expect(props.sizes).toBe("24vw");
  });
  it("falls back to the smallest candidate when all exceed 640px", () => {
    expect(
      getResponsiveImageProps(
        { ...asset, variants: asset.variants.slice(3) },
        { alt: "", unoptimized: true },
      ).src,
    ).toBe(asset.variants[3].src);
  });
  it("uses Next optimization URLs for the original source in enabled mode", () => {
    const props = getResponsiveImageProps(asset, {
      alt: "Example",
      sizes: "50vw",
    });
    expect(props.src).toContain("/_next/image?url=%2Fwork%2Fexample.png&");
    expect(props.srcSet).toContain("/_next/image?url=%2Fwork%2Fexample.png&");
    expect(props.srcSet).not.toContain("/images/generated/");
    expect(props).toMatchObject({ sizes: "50vw", width: 1000, height: 500 });
  });
});
