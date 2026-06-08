import fs from 'fs';
import path from 'path';
import { reviewChapterPractice } from './practice-quality.mjs';
import {
  resolveQualityConfig,
  pushIssue,
  getForbiddenTopics,
  scanForbiddenTopics,
  validateTermPrompt,
  countPresentationForms,
} from './quality-policy.mjs';
import { reviewStandardCodeBlocks } from './code-block-quality.mjs';

const INVALID_TAG_RE = /<\/?(motion|TAGDIV)\b/i;

export function loadQualityConfig(skillRoot, options = null) {
  const p = path.join(skillRoot, 'config/chapter-quality.json');
  const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (!options) return raw;
  return resolveQualityConfig(raw, options);
}

export function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, '')
    .trim();
}

export function getChapterOutlineEntry(course, chapterId) {
  for (const phase of course.outline || []) {
    for (const ch of phase.chapters || []) {
      if (ch.id === chapterId) return ch;
    }
  }
  return null;
}

export function extractH3Texts(html) {
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    out.push(stripHtml(m[1]));
  }
  return out;
}

export function fuzzyTitleMatch(a, b) {
  const na = stripHtml(a).replace(/\s/g, '');
  const nb = stripHtml(b).replace(/\s/g, '');
  if (!na || !nb) return false;
  return na.includes(nb) || nb.includes(na) || na === nb;
}

export function countTerms(html) {
  return (html.match(/class="term"/g) || []).length;
}

export function extractTermIds(html) {
  const re = /data-term-id="([^"]+)"/g;
  const ids = new Set();
  let m;
  while ((m = re.exec(html))) ids.add(m[1]);
  return ids;
}

export function isTheoryChapter(phaseId, chapterId, config) {
  const theoryPhases = config.terms?.theoryPhaseIds || ['basics', 'advanced'];
  if (phaseId && theoryPhases.includes(phaseId)) return true;
  return /^(basics|advanced)-/.test(chapterId || '');
}

/** concept = basics；practice = practice 阶段；advanced = advanced 阶段 */
export function getChapterType(phaseId, chapterId) {
  if (phaseId === 'practice' || /^practice-/.test(chapterId || '')) return 'practice';
  if (phaseId === 'advanced' || /^advanced-/.test(chapterId || '')) return 'advanced';
  return 'concept';
}

export function countPhysicalLines(source, countMode = 'physical') {
  const text =
    typeof source === 'string' && (source.includes('<') || !fs.existsSync(source))
      ? source
      : fs.readFileSync(source, 'utf8');
  if (countMode !== 'physical') {
    return text.replace(/\s+/g, ' ').trim().length;
  }
  return text.split(/\r?\n/).length;
}

const BODY_SECTION_EXCLUDED =
  /chapter-conclusions-block|learn-review-block|official-links|chapter-practice|resources\s+content-section/i;

/** 知识正文：`.section-block` 且非结论/复习/官方链接/动手/延伸 */
export function getBodySectionBlockRanges(html) {
  const ranges = [];
  const openRe = /<div\s+class="([^"]*)"[^>]*>/gi;
  let m;
  while ((m = openRe.exec(html))) {
    const classes = m[1];
    if (!/\bsection-block\b/.test(classes) || BODY_SECTION_EXCLUDED.test(classes)) {
      continue;
    }
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
          ranges.push({ start: openStart, end: pos });
          break;
        }
      }
    }
  }
  return ranges;
}

export function countChapterLines(html, linesCfg = {}) {
  const scope = linesCfg.countScope || 'full-file';
  const countMode = linesCfg.countMode || 'physical';
  if (scope === 'body-section-blocks') {
    const ranges = getBodySectionBlockRanges(html);
    if (!ranges.length) return 0;
    return ranges.reduce(
      (sum, { start, end }) => sum + countPhysicalLines(html.slice(start, end), countMode),
      0
    );
  }
  return countPhysicalLines(html, countMode);
}

function countMermaid(html) {
  return (html.match(/class="mermaid-wrap"/g) || []).length;
}

function countCodeBlocks(html) {
  return (html.match(/<pre\b/gi) || []).length;
}

function countSectionBlocks(html) {
  return (html.match(/class="section-block"/g) || []).length;
}

function hasCompareOrTable(html) {
  return (
    /learn-compare|learn-compare-heading|role-cards|outline-table|<table\b/i.test(html)
  );
}

export function hasIllegalTags(html) {
  return INVALID_TAG_RE.test(html);
}

export function fixH5Check(html) {
  const parts = html.split(/<div class="mermaid-wrap">/i);
  if (parts.length === 1) return /<h5\b/i.test(html);
  let rest = parts[0];
  for (let i = 1; i < parts.length; i++) {
    const closeIdx = parts[i].indexOf('</div>');
    const end = closeIdx >= 0 ? closeIdx + 6 : parts[i].length;
    rest += parts[i].slice(end);
  }
  return /<h5\b/i.test(rest);
}

export function getQuizSection(quizHtml, chapterId) {
  if (!quizHtml) return null;
  const re = new RegExp(
    `<section[^>]*class="quiz-section"[^>]*data-chapter="${chapterId}"[\\s\\S]*?<\\/section>`,
    'i'
  );
  const m = quizHtml.match(re);
  return m ? m[0] : null;
}

export function quizHasTypes(quizSectionHtml, types) {
  const has = { single: false, multi: false, fill: false };
  if (/type="radio"/i.test(quizSectionHtml)) has.single = true;
  if (/type="checkbox"/i.test(quizSectionHtml)) has.multi = true;
  if (/class="fill-input"/i.test(quizSectionHtml)) has.fill = true;
  return types.every((t) => has[t]);
}

export function findQuizMetaKey(quizzes, chapterId) {
  if (!quizzes) return null;
  if (quizzes[`${chapterId}-quiz`]) return `${chapterId}-quiz`;
  for (const key of Object.keys(quizzes)) {
    if (quizzes[key]?.chapterId === chapterId) return key;
  }
  return null;
}

export function countSteps(html) {
  const m = html.match(/<ol class="steps">([\s\S]*?)<\/ol>/i);
  if (!m) return 0;
  return (m[1].match(/<li\b/gi) || []).length;
}

function countConsecutivePlainParagraphLines(html) {
  const blocks = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
  let maxRun = 0;
  let run = 0;
  for (const p of blocks) {
    const plain = stripHtml(p);
    if (plain.length > 40 && !/class="steps-intro"/.test(p)) {
      run += 1;
      maxRun = Math.max(maxRun, run);
    } else {
      run = 0;
    }
  }
  return maxRun;
}

function getKnowledgeSectionBlocks(html) {
  const ranges = getBodySectionBlockRanges(html);
  return ranges.map(({ start, end }) => html.slice(start, end));
}

function checkQuizSectionCoverage(quizSectionHtml, outlineChapter, config, buckets) {
  if (!config.quiz?.requireSectionKeywordCoverage || !outlineChapter?.sections?.length) return;
  const plain = stripHtml(quizSectionHtml);
  const sections = outlineChapter.sections.map((s) =>
    typeof s === 'string' ? s : s.title || ''
  );
  let covered = 0;
  for (const title of sections) {
    const key = title.replace(/\s/g, '').slice(0, 6);
    if (key.length >= 2 && plain.includes(key.slice(0, 4))) covered += 1;
  }
  const ratio = covered / sections.length;
  const minRatio = config.quiz.minSectionKeywordCoverageRatio ?? 0.5;
  if (ratio < minRatio) {
    pushIssue(
      buckets,
      config,
      'quiz.sectionCoverage',
      `测验与大纲节关联偏弱（约 ${covered}/${sections.length} 节有题干关键词）`
    );
  }
}

export function reviewChapter({
  html,
  chapterId,
  outlineChapter,
  quizHtml,
  quizzes,
  config,
  terms = {},
  phaseId = null,
  chapterFilePath = null,
  course = {},
}) {
  const buckets = { errors: [], warnings: [], suggestions: [] };
  const { errors, warnings, suggestions } = buckets;
  const chapterType = getChapterType(phaseId, chapterId);
  const isTheory = isTheoryChapter(phaseId, chapterId, config);

  const linesCfg = config.lines || {};
  const skipLines = (linesCfg.skipChapterIds || []).includes(chapterId);
  if (!skipLines) {
    const minLines = linesCfg.minByChapterType?.[chapterType];
    if (minLines != null && minLines > 0) {
      const sourceHtml = chapterFilePath ? fs.readFileSync(chapterFilePath, 'utf8') : html;
      const lineCount = countChapterLines(sourceHtml, linesCfg);
      const scopeLabel =
        linesCfg.countScope === 'body-section-blocks'
          ? '正文 section-block（不含 intro/结论/复习/动手/延伸/测验）'
          : '整章 HTML';
      if (lineCount < minLines) {
        errors.push(
          `${scopeLabel} 仅 ${lineCount} 行（${chapterType} 章要求 ≥${minLines} 物理行）`
        );
      }
    }
  }

  const richness = config.richness || {};
  if (outlineChapter?.sections?.length && richness.minSectionBlocksMatchOutline) {
    const blocks = countSectionBlocks(html);
    const need = outlineChapter.sections.length;
    if (blocks > 0 && blocks < need) {
      warnings.push(
        `.section-block 仅 ${blocks} 个，大纲有 ${need} 节（广度不足，宜每节独立 section-block）`
      );
    }
  }
  if (isTheory) {
    const minM = richness.minMermaidConcept ?? config.mermaid?.minCountConcept ?? 0;
    if (minM > 0 && countMermaid(html) < minM) {
      errors.push(`理论章 Mermaid 图不足（${countMermaid(html)}，至少 ${minM}）`);
    }
    const minPre = richness.minPreBlocksConcept ?? 0;
    if (minPre > 0 && countCodeBlocks(html) < minPre) {
      pushIssue(
        buckets,
        config,
        'richness.preBlocksConcept',
        `理论章代码/示例块不足（<pre> ${countCodeBlocks(html)}，建议 ≥${minPre}）`
      );
    }
    const minTable = richness.minCompareOrTableConcept ?? 0;
    if (minTable > 0 && !hasCompareOrTable(html)) {
      pushIssue(
        buckets,
        config,
        'richness.compareTable',
        '理论章建议至少 1 处对比表/role-cards/outline-table（深度与广度）'
      );
    }
  } else {
    const minCode = richness.minCodeBlocksPractice ?? config.code?.minBlocksPractice ?? 0;
    if (minCode > 0 && countCodeBlocks(html) < minCode) {
      errors.push(`实践章代码块不足（${countCodeBlocks(html)}，至少 ${minCode} 个 <pre>）`);
    }
  }

  if (hasIllegalTags(html)) {
    errors.push('存在非法 HTML 标签（如 motion），会导致 DOM 断裂');
  }

  const codeBlockReview = reviewStandardCodeBlocks(html, config.codeBlocks || {});
  for (const msg of codeBlockReview.errors || []) {
    pushIssue(buckets, config, 'codeBlocks.standardToolbar', msg);
  }
  for (const msg of codeBlockReview.warnings || []) {
    pushIssue(buckets, config, 'codeBlocks.standardToolbar', msg);
  }

  if (fixH5Check(html)) {
    errors.push('存在 .mermaid-wrap 外的 h5（对比列请用 .learn-compare-heading）');
  }

  if ((html.match(/<h3[^>]*>\s*动手练习/gi) || []).length > 1) {
    errors.push('存在多个「动手练习」h3，请合并为 .chapter-practice 下一处');
  }
  for (const box of html.matchAll(/<div class="demo-box">([\s\S]*?)<\/div>/gi)) {
    const inner = box[1];
    if (!/demo-box-title/.test(inner)) {
      pushIssue(
        buckets,
        config,
        'pedagogy.demoBoxTitle',
        'demo-box 须含 h4.demo-box-title'
      );
    } else if (/<h3\b/i.test(inner)) {
      pushIssue(
        buckets,
        config,
        'pedagogy.demoBoxTitle',
        'demo-box 内勿使用 h3，请用 h4.demo-box-title'
      );
    }
  }

  const termsCfg = config.terms || {};
  const minSpans = isTheory
    ? (termsCfg.minSpansConcept ?? 8)
    : (termsCfg.minSpansPractice ?? 5);
  const minUnique = isTheory
    ? (termsCfg.minUniqueIdsConcept ?? 5)
    : (termsCfg.minUniqueIdsPractice ?? 3);
  const termCount = countTerms(html);
  const termIds = extractTermIds(html);
  if (termCount < minSpans) {
    warnings.push(
      `术语 .term 仅 ${termCount} 处（${isTheory ? '理论' : '实践'}章建议 ≥${minSpans}，见 reference/terms-policy.md）`
    );
  }
  if (termIds.size < minUnique) {
    warnings.push(`术语不同 data-term-id 仅 ${termIds.size} 个（建议 ≥${minUnique}）`);
  }
  for (const id of termIds) {
    if (!terms[id]) {
      errors.push(`未知 data-term-id="${id}"，请写入 course.json → terms`);
      continue;
    }
    const promptIssues = validateTermPrompt(terms[id].prompt || '', termsCfg, course);
    for (const pi of promptIssues) {
      pushIssue(buckets, config, pi.key, `术语「${terms[id].label || id}」${pi.message}`);
    }
  }

  if (outlineChapter?.sections?.length) {
    const h3s = extractH3Texts(html);
    const knowledgeH3 = h3s.filter(
      (t) => !/动手练习|复习与自检|官方文档|延伸学习|章节测验/.test(t)
    );
    for (const sec of outlineChapter.sections) {
      const title = typeof sec === 'string' ? sec : sec.title || '';
      if (!knowledgeH3.some((h) => fuzzyTitleMatch(h, title))) {
        errors.push(`缺少与大纲对应的 h3：「${title}」`);
      }
    }
  }

  if (config.quiz?.requiredByDefault) {
    const section = getQuizSection(quizHtml, chapterId);
    const metaKey = findQuizMetaKey(quizzes, chapterId);
    if (!section) {
      errors.push('缺少章节测验：quiz.partial.html 中无匹配的 quiz-section');
    } else {
      const types = config.quiz.requireQuestionTypes || ['single', 'multi', 'fill'];
      if (!quizHasTypes(section, types)) {
        errors.push(`章节测验须含题型：${types.join('、')}`);
      }
      const qCount = (section.match(/class="quiz-item"/g) || []).length;
      const minQ = config.quiz.minQuestionsPerChapter ?? 4;
      if (qCount < minQ) {
        errors.push(`章节测验题目不足（${qCount}，至少 ${minQ}）`);
      }
      checkQuizSectionCoverage(section, outlineChapter, config, buckets);
    }
    if (!metaKey) {
      errors.push('course.json.quizzes 缺少该章元数据');
    }
  }

  const forbidden = getForbiddenTopics(config, course);
  if (forbidden.length && (config.forbiddenTopics?.scanScopes || []).includes('chapter')) {
    const hits = scanForbiddenTopics(stripHtml(html), forbidden);
    if (hits.length) {
      pushIssue(
        buckets,
        config,
        'forbidden.topic',
        `正文含禁讲主题：${hits.join('、')}`
      );
    }
  }
  if (forbidden.length && (config.forbiddenTopics?.scanScopes || []).includes('quiz')) {
    const quizSection = getQuizSection(quizHtml, chapterId);
    if (quizSection) {
      const hits = scanForbiddenTopics(stripHtml(quizSection), forbidden);
      if (hits.length) {
        pushIssue(
          buckets,
          config,
          'forbidden.topic',
          `测验含禁讲主题：${hits.join('、')}`
        );
      }
    }
  }

  const minForms = richness.minPresentationFormsPerSection ?? 0;
  if (minForms > 0) {
    const blocks = getKnowledgeSectionBlocks(html);
    blocks.forEach((block, i) => {
      if (countPresentationForms(block) < minForms) {
        pushIssue(
          buckets,
          config,
          'richness.presentationForms',
          `第 ${i + 1} 个知识 section-block 呈现形式不足（${countPresentationForms(block)}，建议 ≥${minForms}）`
        );
      }
    });
  }

  const maxPlain = config.emptyContent?.maxConsecutivePlainParagraphLines;
  if (maxPlain > 0) {
    const run = countConsecutivePlainParagraphLines(html);
    if (run > maxPlain) {
      pushIssue(
        buckets,
        config,
        'empty.plainParagraphs',
        `连续长段落 ${run} 段（建议 ≤${maxPlain}，宜拆分列表/图/表）`
      );
    }
  }

  const steps = countSteps(html);
  const minSteps = config.steps?.minCount ?? 3;
  if (steps > 0 && steps < minSteps) {
    warnings.push(`动手步骤仅 ${steps} 条（建议 ≥${minSteps}）`);
  }

  const needsEnrichmentJs =
    /\.learn-checklist|\.learn-param-slider/.test(html) &&
    !/initChapterEnrichment/.test(quizHtml || '');
  if (needsEnrichmentJs) {
    warnings.push(
      '使用了 checklist/slider，请在 welcome.partial.html 末尾内联脚本（见技能 templates/chapter-enrichment.js）'
    );
  }

  if (!/class="section-block"/.test(html) && outlineChapter?.sections?.length > 1) {
    suggestions.push('建议使用 .section-block 分区，与 outline.sections 对齐');
  }

  const pedagogy = config.pedagogy || {};
  if (pedagogy.requiredForConceptChapters !== false) {
    if (!/notice-why-learn/.test(html)) {
      errors.push('缺少 .notice-why-learn（为什么要学本章，见 reference/chapter-authoring.md）');
    }
    if (!/notice-outcome/.test(html)) {
      errors.push('缺少 .notice-outcome（学完你能，见 reference/chapter-authoring.md）');
    }
    if (!/chapter-conclusions-block/.test(html)) {
      errors.push('缺少 .chapter-conclusions-block（本章结论，见 reference/chapter-authoring.md）');
    } else {
      const listMatch = html.match(/<ul class="chapter-conclusions-list">([\s\S]*?)<\/ul>/i);
      const bullets = listMatch ? (listMatch[1].match(/<li\b/gi) || []).length : 0;
      const minBullets = Math.max(
        pedagogy.minConclusionBullets ?? 2,
        outlineChapter?.sections?.length || 0
      );
      if (bullets > 0 && bullets < minBullets) {
        warnings.push(
          `本章结论仅 ${bullets} 条，建议与 outline sections（${outlineChapter?.sections?.length || '?'}）条数一致`
        );
      }
    }
    if (!/chapter-meta/.test(html)) {
      warnings.push('建议增加 .chapter-meta（时长/阶段/能力，见 reference/chapter-authoring.md）');
    }
    if (!/learn-micro-check/.test(html) && isTheory) {
      pushIssue(buckets, config, 'pedagogy.microCheck', '建议至少 1 处 .learn-micro-check（先想 10 秒）');
    }
    if (!/steps-judgment-list/.test(html) && /<div class="chapter-practice"/.test(html)) {
      pushIssue(
        buckets,
        config,
        'pedagogy.judgment',
        '动手区缺少判断练习（须 ol.steps-judgment-list + .learn-practice-answer）'
      );
    }
    if (/steps-judgment-list/.test(html) && !/learn-practice-answer/.test(html)) {
      pushIssue(
        buckets,
        config,
        'pedagogy.judgmentAnswers',
        '判断练习缺少 .learn-practice-answer（每题须 <details> 折叠参考答案）'
      );
    }

    const practiceReview = reviewChapterPractice({
      html,
      outlineChapter,
      phaseId,
      config,
      buckets,
    });
    errors.push(...(practiceReview.errors || []));
    warnings.push(...(practiceReview.warnings || []));
    suggestions.push(...(practiceReview.suggestions || []));

    if (
      /<div class="notice">\s*<strong>本章小结<\/strong>/.test(html) &&
      !/chapter-review-next/.test(html)
    ) {
      warnings.push('复习区建议用 p.chapter-review-next，避免与「本章结论」重复');
    }
  }

  return {
    chapterId,
    passed: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
}
