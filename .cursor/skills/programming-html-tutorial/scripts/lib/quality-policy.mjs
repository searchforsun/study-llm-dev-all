/**
 * Resolve chapter-quality.json and classify check severity (v3 single policy).
 */

export function resolveQualityConfig(raw, { strict = false, course = {} } = {}) {
  return {
    ...raw,
    _strict: strict,
    _course: course,
  };
}

export function issueLevel(config, key) {
  if (config._strict) return 'error';
  if (key === 'forbidden.topic') return 'error';
  if (key === 'terms.promptSemantics') return 'error';
  if (key === 'practice.operateDom') return 'error';
  if (key === 'practice.judgmentDom') return 'error';
  if (key === 'pedagogy.judgment' && config.pedagogy?.requireJudgmentPractice) return 'error';
  if (key === 'pedagogy.judgmentAnswers' && config.pedagogy?.requireJudgmentPractice) return 'error';
  if (key === 'pedagogy.microCheck' && config.pedagogy?.requireMicroCheckConcept) return 'error';
  if (key === 'pedagogy.demoBoxTitle' && config.pedagogy?.requireDemoBoxTitle) return 'error';
  if (key === 'practice.sectionTitles' && config.pedagogy?.requirePracticeSectionTitles) return 'error';
  if (key === 'richness.compareTable' && (config.richness?.minCompareOrTableConcept ?? 0) > 0) {
    return 'error';
  }
  if (key === 'richness.preBlocksConcept' && (config.richness?.minPreBlocksConcept ?? 0) > 0) {
    return 'error';
  }
  if (key === 'codeBlocks.standardToolbar' && config.codeBlocks?.requireStandardToolbar !== false) {
    return 'error';
  }
  if (key === 'terms.promptLength') return 'warning';
  if (key === 'richness.presentationForms') return 'warning';
  if (key === 'empty.plainParagraphs') return 'warning';
  if (key === 'quiz.sectionCoverage') return 'warning';
  return 'warning';
}

export function pushIssue(buckets, config, key, message) {
  const level = issueLevel(config, key);
  if (level === 'error') buckets.errors.push(message);
  else buckets.warnings.push(message);
}

export function getForbiddenTopics(config, course) {
  const fromCourse = course?.meta?.forbiddenTopics || course?.forbiddenTopics;
  const list = [
    ...(Array.isArray(fromCourse) ? fromCourse : []),
    ...(config.forbiddenTopics?.defaultTopics || []),
  ];
  return [...new Set(list.map((t) => String(t).trim()).filter(Boolean))];
}

export function scanForbiddenTopics(text, topics) {
  const hits = [];
  for (const topic of topics) {
    if (topic && text.includes(topic)) hits.push(topic);
  }
  return hits;
}

export function expandPromptPlaceholders(template, course) {
  const title = course?.meta?.title || course?.title || '';
  const slug = course?.meta?.slug || '';
  const domain = course?.meta?.domain || '';
  return String(template)
    .replace(/\{courseTitle\}/g, title)
    .replace(/\{slug\}/g, slug)
    .replace(/\{domain\}/g, domain);
}

export function validateTermPrompt(prompt, termsCfg, course) {
  const issues = [];
  const minChars = termsCfg.minPromptChars ?? 80;
  if ((prompt || '').length < minChars) {
    issues.push({
      key: 'terms.promptLength',
      message: `prompt 偏短（${(prompt || '').length}，建议 ≥${minChars} 字）`,
    });
  }
  if (termsCfg.requirePromptSemantics) {
    for (const fragment of termsCfg.requirePromptContains || []) {
      const needle = expandPromptPlaceholders(fragment, course);
      if (needle && !prompt.includes(needle)) {
        issues.push({
          key: 'terms.promptSemantics',
          message: `prompt 须包含「${needle}」`,
        });
      }
    }
    for (const pat of termsCfg.forbidPromptPatterns || []) {
      if (new RegExp(pat, 'i').test(prompt)) {
        issues.push({
          key: 'terms.promptSemantics',
          message: `prompt 过于空泛（匹配「${pat}」）`,
        });
      }
    }
  }
  return issues;
}

const FORM_PATTERNS = {
  mermaid: /class="mermaid-wrap"|class="mermaid"/i,
  table: /outline-table|<table\b|role-cards/i,
  pre: /<pre\b/i,
  'learn-compare': /learn-compare/i,
  'learn-scenario': /learn-scenario/i,
  'learn-faq': /learn-faq/i,
  'code-block': /class="code-block"/i,
};

export function countPresentationForms(html) {
  let n = 0;
  for (const re of Object.values(FORM_PATTERNS)) {
    if (re.test(html)) n += 1;
  }
  return n;
}

export function extractReferencedPaths(text) {
  const paths = new Set();
  const patterns = [
    /`([^`]+\.(?:md|yaml|yml|json|xml|properties|sh|py|java|ts|js))`/gi,
    /(?:^|\s)([\w.-]+\/[\w./-]+\.(?:md|yaml|yml|json|xml|properties|sh|py|java|ts|js))/gm,
    /demos\/[\w-]+\/[\w./-]+/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) {
      const p = m[1] || m[0];
      if (p && !p.startsWith('http')) paths.add(p.replace(/^\.\//, ''));
    }
  }
  return [...paths];
}

export function filterMissingFiles(courseDir, labSlug, refs, pathModule, fsModule) {
  const missing = [];
  for (const ref of refs) {
    const candidates = [
      pathModule.join(courseDir, 'demos', labSlug, ref),
      pathModule.join(courseDir, 'demos', ref),
      pathModule.join(courseDir, ref),
    ];
    if (!candidates.some((p) => fsModule.existsSync(p))) missing.push(ref);
  }
  return missing;
}

export function checkReferencedPaths(courseDir, labSlug, text, pathModule, fsModule) {
  const refs = extractReferencedPaths(text);
  return filterMissingFiles(courseDir, labSlug, refs, pathModule, fsModule);
}
