import fs from 'fs';
import path from 'path';

const cj = JSON.parse(fs.readFileSync('courses/transformer-algorithms-fundamentals/course.json', 'utf8'));
const terms = new Set(Object.keys(cj.terms));
const dir = 'courses/transformer-algorithms-fundamentals/chapters';
const used = new Map();

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.html'))) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8');
  for (const m of t.matchAll(/data-term-id="([^"]+)"/g)) {
    const id = m[1];
    if (!used.has(id)) used.set(id, []);
    used.get(id).push(f);
  }
}

const missing = [...used.keys()].filter((id) => !terms.has(id));
const unused = [...terms].filter((id) => !used.has(id));

console.log('MISSING_TERM_IDS:', missing.length ? missing.join(', ') : 'none');
console.log('UNUSED_IN_CHAPTERS_COUNT:', unused.length);
console.log('UNUSED:', unused.join(', '));
