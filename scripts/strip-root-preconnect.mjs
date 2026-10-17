// React adds a redundant preconnect to "/" for local images. Remove that
// resource hint so exported sub-brand HTML contains no root href at all.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "out");
const hint = '<link rel="preconnect" href="/" crossorigin=""/>';
let changed = 0;

function visit(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) visit(path);
    else if (entry.name.endsWith(".html")) {
      const html = readFileSync(path, "utf8");
      if (html.includes(hint)) {
        writeFileSync(path, html.replaceAll(hint, ""));
        changed++;
      }
    }
  }
}

visit(root);
console.log(`Removed redundant root preconnect from ${changed} HTML files.`);
