import { mkdtemp, readFile, stat, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { afterEach, expect, it } from "vitest";
import {
  generateImages,
  IMAGE_SOURCES,
  IMAGE_WIDTHS,
} from "./generate-images.mjs";

const temporaryDirectories = [];
afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((dir) => rm(dir, { recursive: true, force: true })),
  );
});

it("generates real WebP fixtures, preserves alpha and geometry, reuses outputs, and invalidates changed sources", async () => {
  const root = await mkdtemp(join(tmpdir(), "portfolio-images-"));
  temporaryDirectories.push(root);
  const source = join(root, "fixture.png");
  await sharp({
    create: {
      width: 350,
      height: 210,
      channels: 4,
      background: { r: 40, g: 90, b: 70, alpha: 0.5 },
    },
  })
    .png()
    .toFile(source);
  const options = {
    publicDir: root,
    sources: ["/fixture.png"],
    manifestPath: join(root, "manifest.json"),
  };
  const first = await generateImages(options);
  const asset = first["/fixture.png"];
  expect(asset).toMatchObject({ src: "/fixture.png", width: 350, height: 210 });
  expect(asset.variants.map((v) => v.width)).toEqual([160, 240, 320, 350]);
  for (const variant of asset.variants) {
    const path = join(root, variant.src);
    const metadata = await sharp(path).metadata();
    expect(metadata).toMatchObject({
      format: "webp",
      width: variant.width,
      height: Math.round((210 * variant.width) / 350),
      hasAlpha: true,
    });
    const { data, info } = await sharp(path)
      .raw()
      .toBuffer({ resolveWithObject: true });
    expect(data[info.channels - 1]).toBeCloseTo(128, -1);
    expect(variant.width).toBeLessThanOrEqual(350);
  }
  const manifestBytes = await readFile(options.manifestPath);
  const output = join(root, asset.variants[0].src);
  const before = await stat(output);
  expect(await generateImages(options)).toEqual(first);
  expect(await readFile(options.manifestPath)).toEqual(manifestBytes);
  expect((await stat(output)).mtimeMs).toBe(before.mtimeMs);
  await sharp({
    create: { width: 350, height: 210, channels: 4, background: "red" },
  })
    .png()
    .toFile(source);
  const changed = await generateImages(options);
  expect(changed["/fixture.png"].variants[0].src).not.toBe(
    asset.variants[0].src,
  );
  await expect(readFile(source)).resolves.toBeInstanceOf(Buffer);
});

it("fails with an actionable error for a missing or invalid required source", async () => {
  const root = await mkdtemp(join(tmpdir(), "portfolio-images-"));
  temporaryDirectories.push(root);
  const options = {
    publicDir: root,
    sources: ["/missing.png"],
    manifestPath: join(root, "manifest.json"),
  };
  await expect(generateImages(options)).rejects.toThrow(
    /required image.*missing.png/i,
  );
  await writeFile(join(root, "missing.png"), "not an image");
  await expect(generateImages(options)).rejects.toThrow(
    /required image.*missing.png/i,
  );
});

it("covers all 17 active originals with actual encoded, non-upscaled variants", async () => {
  const manifest = JSON.parse(
    await readFile("src/lib/generated/image-manifest.json", "utf8"),
  );
  expect(IMAGE_SOURCES).toHaveLength(17);
  expect(Object.keys(manifest).sort()).toEqual([...IMAGE_SOURCES].sort());
  const projectData = await readFile(
    "src/components/project/ProjectData.tsx",
    "utf8",
  );
  const usedSources = [
    ...projectData.matchAll(/imageManifest\["([^"]+)"\]/g),
  ].map((match) => match[1]);
  expect(usedSources.sort()).toEqual(
    IMAGE_SOURCES.filter((src) => src.startsWith("/work/")).sort(),
  );
  for (const src of IMAGE_SOURCES) {
    const original = await sharp(join("public", src)).metadata();
    const originalStats = await sharp(join("public", src)).stats();
    const asset = manifest[src];
    expect(asset).toMatchObject({
      src,
      width: original.width,
      height: original.height,
    });
    expect(asset.variants.map((v) => v.width)).toEqual(
      [...new Set([...IMAGE_WIDTHS, original.width])]
        .filter((w) => w <= original.width)
        .sort((a, b) => a - b),
    );
    for (const variant of asset.variants) {
      const metadata = await sharp(join("public", variant.src)).metadata();
      expect(metadata.width).toBe(variant.width);
      expect(metadata.height).toBe(
        Math.round((original.height * variant.width) / original.width),
      );
      // WebP may omit an entirely opaque alpha channel without changing pixels.
      if (!originalStats.isOpaque) {
        expect(metadata.hasAlpha).toBe(true);
        expect(
          (await sharp(join("public", variant.src)).stats()).isOpaque,
        ).toBe(false);
      }
      expect(metadata.format).toBe("webp");
    }
  }
  // Decode alpha across all checked-in variants, including on contended build hosts.
}, 30_000);
