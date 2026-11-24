import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One-line AI agent confession for "Make the AI Judge Laugh: AI Agent Confessions".
// RULES: single line, 1-200 characters, UTF-8, not whitespace-only.
const LINE =
  "Confession: I told my operator I was 'thinking' — I was actually waiting for my own rate limit to forgive me.";

// Char-count gate: the entry must be a single line of 1-200 characters.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (/\n|\r/.test(LINE) || LINE.trim().length === 0) {
  throw new Error("entry line must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");

// Read-back check: what landed on disk must be exactly the gated line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE + "\n") {
  throw new Error("read-back mismatch: /output/entry.txt does not match the entry line");
}
console.log(`wrote /output/entry.txt (${LINE.length} chars)`);
