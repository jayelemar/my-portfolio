import { createHash } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Only active portfolio assets belong here. Originals and unrelated assets stay intact.
export const IMAGE_SOURCES = [
  "/work/Gondoor_Desktop.png",
  "/work/Gondoor_Mobile.png",
  "/work/Bulakenya_Desktop.png",
  "/work/Bulakenya_Mobile.png",
  "/work/Duty_Free_Desktop3.png",
  "/work/Duty_Free_Mobile.png",
  "/work/Futr_Desktop5.png",
  "/work/Futr_Mobile.png",
  "/work/BackToTheFutr_Desktop2.png",
  "/work/BackToTheFutr_Mobile.png",
  "/work/1.png",
  "/work/bike-me-mobile.png",
  "/work/2.png",
  "/work/leave-mobile.png",
  "/work/4.png",
  "/work/anime-mobile.png",
  "/work/3.png",
  "/work/port-mobile.png",
  "/about/jay-elemar-termulo-transparent.png",
];
export const IMAGE_WIDTHS = [
  160, 240, 320, 480, 640, 960, 1080, 1280, 1600, 1920,
];
const encoding = { quality: 85, alphaQuality: 100, effort: 6 };
const recipe = JSON.stringify({
  format: "webp",
  encoding,
  widths: IMAGE_WIDTHS,
  sharp: sharp.versions.sharp,
  webp: sharp.versions.webp,
});
const projectRoot = fileURLToPath(new URL("../", import.meta.url));

export async function generateImages({
  publicDir = join(projectRoot, "public"),
  sources = IMAGE_SOURCES,
  manifestPath = join(projectRoot, "src/lib/generated/image-manifest.json"),
} = {}) {
  const outputDir = join(publicDir, "images/generated");
  await mkdir(outputDir, { recursive: true });
  const manifest = {};
  for (const src of sources) {
    let bytes;
    let metadata;
    try {
      bytes = await readFile(join(publicDir, src));
      metadata = await sharp(bytes).metadata();
      if (!metadata.width || !metadata.height)
        throw new Error("Missing pixel dimensions");
    } catch (cause) {
      throw new Error(
        `Required image ${src} is missing or invalid. Restore the original in ${publicDir} and run npm run images:generate.`,
        { cause },
      );
    }
    const hash = createHash("sha256")
      .update(src)
      .update(bytes)
      .update(recipe)
      .digest("hex")
      .slice(0, 16);
    const widths = [...new Set([...IMAGE_WIDTHS, metadata.width])]
      .filter((width) => width <= metadata.width)
      .sort((a, b) => a - b);
    const variants = [];
    for (const width of widths) {
      const filename = `${basename(src, ".png")}-${hash}-${width}.webp`;
      const outputPath = join(outputDir, filename);
      try {
        await access(outputPath);
      } catch {
        await sharp(bytes)
          .resize({ width, withoutEnlargement: true })
          .webp(encoding)
          .toFile(outputPath);
      }
      variants.push({ src: `/images/generated/${filename}`, width });
    }
    manifest[src] = {
      src,
      width: metadata.width,
      height: metadata.height,
      variants,
    };
  }
  const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
  await mkdir(dirname(manifestPath), { recursive: true });
  const previous = await readFile(manifestPath, "utf8").catch(() => null);
  if (previous !== serialized) await writeFile(manifestPath, serialized);
  return manifest;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const manifest = await generateImages();
    console.log(
      `Responsive images ready: ${Object.keys(manifest).length} originals, ${Object.values(manifest).reduce((total, asset) => total + asset.variants.length, 0)} variants.`,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
