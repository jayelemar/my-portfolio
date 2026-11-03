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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: 64,
          gap: 56,
          backgroundColor: "#101713",
          color: "#ffffff",
          borderBottom: "12px solid #22c55e",
        }}
      >
        {/* ImageResponse renders native image elements directly. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${portrait}`}
          width={440}
          height={440}
          alt="Portrait of Jay Elemar Termulo"
          style={{ borderRadius: 24, objectFit: "contain" }}
        />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 24, color: "#4ade80", marginBottom: 24 }}>
            FULL STACK DEVELOPER
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            Jay Elemar Termulo
          </div>
          <div style={{ fontSize: 27, color: "#cbd5d1", marginTop: 28 }}>
            React · Next.js · TypeScript
          </div>
          <div style={{ fontSize: 24, color: "#4ade80", marginTop: 40 }}>
            www.elemar.site
          </div>
        </div>
      </div>
    ),
    size,
  );
}
