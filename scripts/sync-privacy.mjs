// Copies the published privacy policy from Termly into `content/privacy/policy.html`.
//
// The policy is written and versioned in Termly, and `/privacy` embeds it with Termly's script.
// That script is the only way Termly serves it, so a visitor without JavaScript (or with the
// script blocked) would get an empty page. The page therefore prerenders this copy and hides it
// once the live embed has loaded. Run `npm run sync-privacy` after the policy changes in Termly
// and commit the result; the build never calls Termly.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/** The same document id `/privacy` hands to the Termly embed. */
const POLICY_ID = 'babeea2f-52c8-4655-b2ec-061c72ff9f91';
const SOURCE = `https://app.termly.io/api/v1/consumer/policies/${POLICY_ID}/content`;
const outDir = fileURLToPath(new URL('../content/privacy/', import.meta.url));

const response = await fetch(SOURCE);
if (!response.ok) throw new Error(`Termly answered ${response.status} for the policy`);
const { content } = await response.json();
// A real policy is tens of thousands of characters; anything short is an error page, not a policy.
if (typeof content !== 'string' || content.length < 10_000) {
  throw new Error('Termly returned no policy text, keeping the copy already in the repo');
}

// The copy is injected into the page as HTML, so nothing executable may ride along with it.
const html = content
  .replace(/<script\b[\s\S]*?<\/script>/gi, '')
  .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"');

await mkdir(outDir, { recursive: true });
await writeFile(`${outDir}policy.html`, `${html.trim()}\n`);
console.log(`Wrote content/privacy/policy.html (${html.length} characters)`);
