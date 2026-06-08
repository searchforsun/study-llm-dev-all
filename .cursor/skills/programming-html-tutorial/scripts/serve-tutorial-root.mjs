#!/usr/bin/env node
/**
 * 静态托管教程根目录（含课程中心 + 多课），并支持 PUT /<slug>/progress.local.json。
 *
 * 用法（skill 根目录）：
 *   node scripts/serve-tutorial-root.mjs
 *   node scripts/serve-tutorial-root.mjs --root example
 *   node scripts/serve-tutorial-root.mjs --root /path/to/courses
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.join(__dirname, '..');
const PORT = Number(process.env.PORT) || 3000;
const PROGRESS_FILE = 'progress.local.json';
const API_MARKER = '/.well-known/html-tutorial-progress';

function parseArgs(argv) {
  let root = path.join(SKILL_ROOT, 'example');
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--root' && argv[i + 1]) {
      root = path.resolve(argv[++i]);
    }
  }
  return { root };
}

const { root: siteRoot } = parseArgs(process.argv);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.md': 'text/markdown; charset=utf-8',
};

function isSafeSlug(slug) {
  return /^[a-z0-9][a-z0-9-]*$/.test(slug);
}

function progressFileForSlug(slug) {
  if (!isSafeSlug(slug)) return null;
  const abs = path.resolve(siteRoot, slug, PROGRESS_FILE);
  if (!abs.startsWith(siteRoot + path.sep) && abs !== siteRoot) return null;
  return abs;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function resolveStaticPath(urlPath) {
  let rel = decodeURIComponent(urlPath.split('?')[0]);
  if (!rel.startsWith('/')) rel = `/${rel}`;
  if (rel.endsWith('/')) rel += 'index.html';
  if (rel === '/') rel = '/index.html';
  const abs = path.normalize(path.join(siteRoot, rel.replace(/^\//, '')));
  if (!abs.startsWith(siteRoot)) return null;
  if (!fs.existsSync(abs)) return null;
  const st = fs.statSync(abs);
  if (st.isDirectory()) {
    const idx = path.join(abs, 'index.html');
    return fs.existsSync(idx) ? idx : null;
  }
  return abs;
}

function sendStatic(req, res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';
  res.setHeader('Content-Type', type);
  res.setHeader('X-Course-Progress-Api', '1');
  if (req.method === 'HEAD') {
    res.writeHead(200);
    res.end();
    return;
  }
  res.writeHead(200);
  fs.createReadStream(filePath).pipe(res);
}

async function handlePutProgress(slug, body, res) {
  const filePath = progressFileForSlug(slug);
  if (!filePath) {
    res.writeHead(400);
    res.end('Invalid slug');
    return;
  }
  try {
    JSON.parse(body);
  } catch {
    res.writeHead(400);
    res.end('Invalid JSON');
    return;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, body.endsWith('\n') ? body : `${body}\n`, 'utf8');
  res.setHeader('X-Course-Progress-Api', '1');
  res.writeHead(204);
  res.end();
}

const server = http.createServer(async (req, res) => {
  try {
    const host = req.headers.host || `localhost:${PORT}`;
    const url = new URL(req.url || '/', `http://${host}`);

    if (url.pathname === API_MARKER) {
      res.setHeader('X-Course-Progress-Api', '1');
      res.writeHead(204);
      res.end();
      return;
    }

    const putMatch = url.pathname.match(/^\/([a-z0-9][a-z0-9-]*)\/progress\.local\.json$/);
    if (req.method === 'PUT' && putMatch) {
      const body = await readBody(req);
      await handlePutProgress(putMatch[1], body, res);
      return;
    }

    if (req.method === 'GET' || req.method === 'HEAD') {
      const filePath = resolveStaticPath(url.pathname);
      if (filePath) {
        sendStatic(req, res, filePath);
        return;
      }
    }

    res.setHeader('X-Course-Progress-Api', '1');
    res.writeHead(404);
    res.end('Not found');
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end('Server error');
  }
});

server.listen(PORT, () => {
  console.log(`Tutorial dev server: http://localhost:${PORT}`);
  console.log(`  Progress API: PUT /<slug>/${PROGRESS_FILE}`);
  console.log(`  Root: ${siteRoot}`);
});
