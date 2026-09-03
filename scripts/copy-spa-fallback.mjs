import { copyFile, mkdir } from "node:fs/promises";

await copyFile("dist/index.html", "dist/404.html");
await mkdir("dist/projects/in-progress", { recursive: true });
await copyFile("dist/index.html", "dist/projects/in-progress/index.html");
