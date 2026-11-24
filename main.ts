// Fortune Cookie Wisdom for Developers — a single-line entry.
//
// The whole entry is one fortune, kept as a plain constant below.
// Running this file writes that fortune, and nothing else, to
// entry.txt inside the chosen output directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One breath long, the way a real fortune cookie reads: calm,
// prophetic, and aimed straight at the reader. The truth it turns
// on is a familiar one — a bug rarely lives where we already
// suspect it. It lives in the line we never thought to test, and
// it will outlast the very certainty that hid it there.
const FORTUNE =
  "The bug you seek hides in the line you never thought to test; it will outlast the certainty that hid it.";

// A fortune cookie line is short by definition, so guard the size
// here rather than discovering a problem after the file is written.
if (FORTUNE.length < 1 || FORTUNE.length > 120) {
  throw new Error(
    `fortune must be 1-120 characters, got ${FORTUNE.length}`,
  );
}

// The grader may point us at its own directory; fall back to the
// conventional mount when it does not. Create the directory if it
// is missing, but never remove it — on the grading runner it can
// be a mounted volume, and deleting a mount point fails the run.
const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, FORTUNE, "utf8");

console.log(`wrote ${FORTUNE.length} characters to ${entryPath}`);
