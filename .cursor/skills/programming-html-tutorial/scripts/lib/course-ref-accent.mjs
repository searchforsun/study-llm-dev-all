/**
 * Generate per-slug .course-ref accent CSS from courses/courses.json + per-course theme.css.
 * Injected during assemble-index (after theme.css, before enrichment).
 */
import fs from 'fs';
import path from 'path';

function hoverLight(hex) {
  return `color-mix(in srgb, ${hex} 78%, #000)`;
}

function hoverDark(hex) {
  return `color-mix(in srgb, ${hex} 78%, #fff)`;
}

function parseThemeAccent(themeCss, slug) {
  if (!themeCss) return null;
  const lightRe = new RegExp(
    `\\[data-theme-preset="${slug}"\\]\\[data-theme="light"\\][^{]*\\{[^}]*--accent:\\s*(#[0-9a-fA-F]{3,8})`,
    's'
  );
  const darkRe = new RegExp(
    `\\[data-theme-preset="${slug}"\\]\\[data-theme="dark"\\][^{]*\\{[^}]*--accent:\\s*(#[0-9a-fA-F]{3,8})`,
    's'
  );
  const light = themeCss.match(lightRe)?.[1];
  const dark = themeCss.match(darkRe)?.[1];
  return light && dark ? { light, dark } : null;
}

/** @returns {Map<string, { light: string, dark: string }>} */
export function loadCourseAccentMap(coursesRoot) {
  const map = new Map();
  const catalogPath = path.join(coursesRoot, 'courses.json');
  if (fs.existsSync(catalogPath)) {
    try {
      const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      for (const c of catalog.courses ?? []) {
        if (c.slug && c.accent?.light && c.accent?.dark) {
          map.set(c.slug, { light: c.accent.light, dark: c.accent.dark });
        }
      }
    } catch {
      /* ignore */
    }
  }

  if (!fs.existsSync(coursesRoot)) return map;
  for (const ent of fs.readdirSync(coursesRoot, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    const slug = ent.name;
    if (map.has(slug)) continue;
    const themePath = path.join(coursesRoot, slug, 'theme.css');
    if (!fs.existsSync(themePath)) continue;
    const accent = parseThemeAccent(fs.readFileSync(themePath, 'utf8'), slug);
    if (accent) map.set(slug, accent);
  }
  return map;
}

/**
 * @param {string} courseDir absolute path to courses/<slug>/
 * @returns {string} CSS block (empty if no accents)
 */
export function buildCourseRefAccentCss(courseDir) {
  const coursesRoot = path.resolve(courseDir, '..');
  const accentMap = loadCourseAccentMap(coursesRoot);
  if (!accentMap.size) return '';

  const lines = ['/* ── 跨课程引用：目标课 accent（assemble 自 courses.json / theme.css）── */'];
  for (const [slug, { light, dark }] of [...accentMap.entries()].sort()) {
    const sel = `.course-ref[href*="${slug}"] .course-ref-zh`;
    const plain = `.course-ref[href*="${slug}"]:not(:has(.course-ref-zh))`;
    const hov = `.course-ref[href*="${slug}"]:hover .course-ref-zh`;
    const hovPlain = `.course-ref[href*="${slug}"]:not(:has(.course-ref-zh)):hover`;
    lines.push(`${sel} { color: ${light}; }`);
    lines.push(`${plain} { color: ${light}; }`);
    lines.push(`${hov} { color: ${hoverLight(light)}; }`);
    lines.push(`${hovPlain} { color: ${hoverLight(light)}; }`);
    lines.push(`[data-theme="dark"] ${sel} { color: ${dark}; }`);
    lines.push(`[data-theme="dark"] ${plain} { color: ${dark}; }`);
    lines.push(`[data-theme="dark"] ${hov} { color: ${hoverDark(dark)}; }`);
    lines.push(`[data-theme="dark"] ${hovPlain} { color: ${hoverDark(dark)}; }`);
  }
  return lines.join('\n');
}

/** Resolve courses.json from a course directory (courses/<slug>/). */
export function resolveCoursesJsonPath(courseDir) {
  return path.resolve(courseDir, '..', 'courses.json');
}

/** @returns {Record<string, string>} slug → title */
export function loadCourseTitleMap(coursesRoot) {
  const titles = {};
  const catalogPath = path.join(coursesRoot, 'courses.json');
  if (fs.existsSync(catalogPath)) {
    try {
      const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      Object.assign(titles, catalog.courseTitleCatalog ?? {});
      for (const c of catalog.courses ?? []) {
        if (c.slug && c.title) titles[c.slug] = c.title;
      }
    } catch {
      /* ignore */
    }
  }
  if (!fs.existsSync(coursesRoot)) return titles;
  for (const ent of fs.readdirSync(coursesRoot, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    const cj = path.join(coursesRoot, ent.name, 'course.json');
    if (!fs.existsSync(cj)) continue;
    try {
      const c = JSON.parse(fs.readFileSync(cj, 'utf8'));
      const slug = c.meta?.slug || ent.name;
      if (c.meta?.title) titles[slug] = c.meta.title;
    } catch {
      /* ignore */
    }
  }
  return titles;
}
