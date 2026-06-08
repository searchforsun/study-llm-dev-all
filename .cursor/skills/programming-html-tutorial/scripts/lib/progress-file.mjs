/**
 * 课程目录内 progress.local.json 的初始结构与写入（通用，无业务 slug 硬编码）
 */
import fs from 'fs';
import path from 'path';

export const DEFAULT_PROGRESS_FILE_NAME = 'progress.local.json';

export function buildEmptyProgressPayload(slug, overrides = {}) {
  return {
    courseId: slug,
    exportedAt: new Date().toISOString(),
    completedChapters: [],
    visitedChapters: [],
    storage: {},
    theme: 'light',
    uiStyle: 'minimal',
    ...overrides,
  };
}

export function progressFilePath(courseDir, fileName = DEFAULT_PROGRESS_FILE_NAME) {
  return path.join(courseDir, fileName);
}

/** 若不存在则创建；存在则不覆盖 */
export function ensureCourseProgressFile(courseDir, slug, options = {}) {
  const fileName = options.fileName || DEFAULT_PROGRESS_FILE_NAME;
  const filePath = progressFilePath(courseDir, fileName);
  if (fs.existsSync(filePath)) {
    return { created: false, path: filePath };
  }
  const payload = buildEmptyProgressPayload(slug, options.payload);
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  return { created: true, path: filePath };
}

export function writeCourseProgressFile(courseDir, payload, fileName = DEFAULT_PROGRESS_FILE_NAME) {
  const filePath = progressFilePath(courseDir, fileName);
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  return filePath;
}
