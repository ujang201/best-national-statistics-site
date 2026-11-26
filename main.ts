// Kalandra National Statistics — the entry program (Node 22, standard library
// only). It hands the site in: it copies this repository's app/ and
// screenshots/ into the output directory and writes /output/dossier.json with
// buildDossier from the vendored make.fun library. vendor/makefun-frontend.ts
// must stay exactly as the kit shipped it: the scorer rebuilds the dossier
// with its own copy and compares the two byte for byte.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(out, { recursive: true });
cpSync(join(here, "app"), join(out, "app"), { recursive: true });
mkdirSync(join(out, "screenshots"), { recursive: true });
if (existsSync(join(here, "screenshots"))) {
  cpSync(join(here, "screenshots"), join(out, "screenshots"), { recursive: true });
}

// The gate's own caps: the text is capped at 160 KiB, at most 4 screenshots
// of at most 256 KiB each, app/ at most 993 files and directories and 16 MiB.
writeFileSync(
  join(out, "dossier.json"),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
