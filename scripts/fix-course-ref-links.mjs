#!/usr/bin/env node
/**
 * Fix cross-course links in chapter/welcome sources:
 * - normalize ../../slug/ → ../slug/
 * - unwrap nested duplicate <a> tags
 * - add course-ref class + zh/slug structure for bare links
 *
 * Usage: node scripts/fix-course-ref-links.mjs [--write]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadCourseTitleMap } from '../.cursor/skills/programming-html-tutorial/scripts/lib/course-ref-accent.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coursesRoot = path.resolve(__dirname, '..', 'courses');
const titleBySlug = loadCourseTitleMap(coursesRoot);

const write = process.argv.includes('--write');
const crossRe =
  /<a\b([^>]*?)href=["']((?:\.\.\/)+([a-z0-9-]+)\/index\.html(?:#[^"']*)?)["']([^>]*)>([\s\S]*?)<\/a>/gi;

function stripTags(s) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function slugFromHref(href) {
  const m = href.match(/\/([a-z0-9-]+)\/index\.html/);
  return m ? m[1] : null;
}

function normalizeHref(href) {
  return href.replace(/^(\.\.\/)+/, '../');
}

function buildCourseRef(href, innerHtml) {
  const slug = slugFromHref(href);
  if (!slug || !titleBySlug[slug]) return null;

  const plain = stripTags(innerHtml);
  let zh = plain;
  zh = zh.replace(new RegExp(`\\s*${slug.replace(/-/g, '[\\s-]')}\\s*$`, 'i'), '').trim();
  zh = zh.replace(/\s*\(slug:\s*[a-z0-9-]+\)\s*$/i, '').trim();
  if (!zh) zh = titleBySlug[slug];

  const norm = normalizeHref(href);
  return `<a href="${norm}" class="course-ref" target="_blank" rel="noopener"><span class="course-ref-zh">${zh}</span><code class="course-ref-slug">${slug}</code></a>`;
}

function unwrapNestedAnchors(html) {
  let prev;
  do {
    prev = html;
    html = html.replace(
      /<a\b[^>]*>\s*(<a\b[^>]*class=["'][^"']*course-ref[^"']*["'][^>]*>[\s\S]*?<\/a>)\s*<\/a>/gi,
      '$1'
    );
  } while (html !== prev);
  return html;
}

function fixHtml(html) {
  html = html.replace(/href=["']\.\.\/\.\.\/(?:portal\/)?index\.html["']/g, 'href="../index.html"');
  html = unwrapNestedAnchors(html);
  html = html.replace(crossRe, (full, pre, href, _slug, post, inner) => {
    const attrs = `${pre} ${post}`;
    if (/\bclass=["'][^"']*course-ref/.test(attrs)) {
      if (/course-ref-zh/.test(inner)) {
        const norm = normalizeHref(href);
        return norm === href ? full : full.replace(href, norm);
      }
      const built = buildCourseRef(href, inner);
      if (built) {
        if (/course-ref-current/.test(attrs)) {
          return built.replace('class="course-ref"', 'class="course-ref course-ref-current"');
        }
        return built;
      }
      const norm = normalizeHref(href);
      return norm === href ? full : full.replace(href, norm);
    }
    const built = buildCourseRef(href, inner);
    return built || full;
  });
  return html;
}

function collectFiles(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && !['demos', 'scripts', 'node_modules'].includes(e.name)) {
      out.push(...collectFiles(p));
    } else if (e.name === 'welcome.partial.html') out.push(p);
    else if (e.name.endsWith('.html') && path.basename(path.dirname(p)) === 'chapters') out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of collectFiles(coursesRoot)) {
  const before = fs.readFileSync(file, 'utf8');
  const after = fixHtml(before);
  if (after !== before) {
    changed++;
    if (write) fs.writeFileSync(file, after, 'utf8');
    console.log(write ? 'fixed' : 'would fix', path.relative(coursesRoot, file));
  }
}
console.log(`${write ? 'Fixed' : 'Would fix'} ${changed} file(s).${write ? '' : ' Pass --write to apply.'}`);
