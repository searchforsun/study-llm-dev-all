/**
 * 标准 .code-block DOM：顶栏（语言 + 复制）+ pre>code.language-*。
 * SSOT 模板见 reference/chapter-authoring.md §代码块。
 */

const COMPACT_BLOCK_RE = /<div class="code-block"><pre\b/i;
const BLOCK_OPEN_RE = /<div\s+class="([^"]*)"[^>]*>/gi;

export function extractCodeBlockRanges(html) {
  const ranges = [];
  let m;
  while ((m = BLOCK_OPEN_RE.exec(html))) {
    const classes = m[1];
    if (!/\bcode-block\b/.test(classes)) continue;
    const openStart = m.index;
    const contentStart = openStart + m[0].length;
    let depth = 1;
    let pos = contentStart;
    while (depth > 0 && pos < html.length) {
      const nextOpen = html.indexOf('<div', pos);
      const nextClose = html.indexOf('</div>', pos);
      if (nextClose === -1) break;
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth += 1;
        pos = nextOpen + 4;
      } else {
        depth -= 1;
        pos = nextClose + 6;
        if (depth === 0) {
          ranges.push({
            openStart,
            contentStart,
            contentEnd: nextClose,
            inner: html.slice(contentStart, nextClose),
          });
        }
      }
    }
  }
  return ranges;
}

function lineNumberAt(html, index) {
  return html.slice(0, index).split(/\r?\n/).length;
}

/**
 * @param {string} html
 * @param {object} [cfg] chapter-quality.json → codeBlocks
 * @returns {{ errors: string[], warnings: string[] }}
 */
export function reviewStandardCodeBlocks(html, cfg = {}) {
  const errors = [];
  const warnings = [];
  if (cfg.requireStandardToolbar === false) {
    return { errors, warnings };
  }

  if (COMPACT_BLOCK_RE.test(html)) {
    errors.push(
      '存在紧凑写法 <div class="code-block"><pre>（须拆为 .code-toolbar + <pre><code class="language-*">）'
    );
  }

  const copyLabel = cfg.requireCopyButtonLabel ?? '复制代码';
  const blocks = extractCodeBlockRanges(html);

  blocks.forEach((block, i) => {
    const line = lineNumberAt(html, block.openStart);
    const label = `代码块 #${i + 1}（约第 ${line} 行）`;
    const inner = block.inner;

    if (!/\bcode-toolbar\b/.test(inner)) {
      errors.push(`${label}：缺少 .code-toolbar`);
      return;
    }
    if (!/<span class="lang-tag">/i.test(inner)) {
      errors.push(`${label}：toolbar 缺少 <span class="lang-tag">`);
    }
    if (!/<button[^>]*class="[^"]*\bbtn-copy\b/i.test(inner)) {
      errors.push(`${label}：toolbar 缺少 <button class="btn-copy">`);
    } else if (copyLabel && !new RegExp(`aria-label="${copyLabel}"`).test(inner)) {
      errors.push(`${label}：btn-copy 须 aria-label="${copyLabel}"`);
    }
    if (!/<pre\b/i.test(inner)) {
      errors.push(`${label}：缺少 <pre>`);
    }
    const codeOpen = inner.match(/<pre[^>]*>\s*<code([^>]*)>/i);
    if (!codeOpen) {
      errors.push(`${label}：须为 <pre><code class="language-*">…</code></pre>`);
    } else if (
      cfg.requireLanguageClass !== false &&
      !/class="[^"]*\blanguage-[\w-]+/i.test(codeOpen[1])
    ) {
      errors.push(`${label}：<code> 须带 class="language-<lang>"（如 language-python）`);
    }
  });

  const blockCount = (html.match(/<div class="code-block"/g) || []).length;
  const toolbarCount = (html.match(/<div class="code-toolbar"/g) || []).length;
  if (blockCount > 0 && blockCount !== toolbarCount) {
    errors.push(
      `.code-block（${blockCount}）与 .code-toolbar（${toolbarCount}）数量不一致，可能有块未加顶栏`
    );
  }

  return { errors, warnings };
}
