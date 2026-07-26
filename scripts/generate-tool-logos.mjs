// Regenerates app/data/tool-logos.ts from the tool reviews' frontmatter.
//
// Why this exists: the logo map has to stay a plain static module because 11
// client components import it, so it cannot read the filesystem itself. Keeping
// it by hand meant every new review needed a second manual edit, and forgetting
// it silently fell back to coloured initials. Now content/tools/*.mdx is the
// single source of truth and this script mirrors it.
//
// Runs automatically via the `prebuild` / `predev` npm scripts.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const TOOLS_DIR = path.join(ROOT, "content/tools");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_FILE = path.join(ROOT, "app/data/tool-logos.ts");

// Mirrors EXCLUDED_SLUGS in lib/tools.ts — kept out of every listing.
const EXCLUDED_SLUGS = new Set(["sample-tool"]);

const entries = [];
const missingFiles = [];

for (const filename of fs.readdirSync(TOOLS_DIR).sort()) {
  if (!filename.endsWith(".mdx")) continue;

  const slug = filename.replace(/\.mdx$/, "");
  if (EXCLUDED_SLUGS.has(slug)) continue;

  const { data } = matter(fs.readFileSync(path.join(TOOLS_DIR, filename), "utf-8"));
  const logoUrl = typeof data.logoUrl === "string" ? data.logoUrl.trim() : "";
  if (!logoUrl) continue;

  // Never emit a path with no image behind it: Next/Image would 404 instead of
  // falling back to initials.
  if (!fs.existsSync(path.join(PUBLIC_DIR, logoUrl))) {
    missingFiles.push({ slug, logoUrl });
    continue;
  }

  entries.push({ slug, logoUrl });
}

const width = Math.max(...entries.map((e) => e.slug.length)) + 3;
const body = entries
  .map((e) => `  ${`"${e.slug}":`.padEnd(width)} "${e.logoUrl}",`)
  .join("\n");

const output = `// AUTO-GENERATED — DO NOT EDIT BY HAND.
// Source: content/tools/*.mdx (frontmatter \`logoUrl\`).
// Regenerate with: npm run generate:tool-logos  (runs automatically on dev/build)
//
// To change a tool's logo, edit that tool's MDX frontmatter, not this file.
export const TOOL_LOGO_URLS: Record<string, string> = {
${body}
};
`;

fs.writeFileSync(OUT_FILE, output);

console.log(`[tool-logos] wrote ${entries.length} logos to app/data/tool-logos.ts`);
if (missingFiles.length) {
  console.warn(
    `[tool-logos] WARNING: ${missingFiles.length} review(s) point at a logo file that does not exist — ` +
      `they will fall back to initials:`,
  );
  for (const { slug, logoUrl } of missingFiles) {
    console.warn(`[tool-logos]   ${slug} → ${logoUrl}`);
  }
}
