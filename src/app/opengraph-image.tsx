import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Jay Elemar Termulo - Full Stack Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const portrait = await readFile(
    join(process.cwd(), "public/about/jay-elemar-termulo.jpg"),
    "base64",
  );

  return new ImageResponse(
    (
      <img
        src={`data:image/jpeg;base64,${portrait}`}
        width={size.width}
        height={size.height}
        alt="Portrait of Jay Elemar Termulo"
        style={{ objectFit: "cover" }}
      />
    ),
    size,
  );
}
