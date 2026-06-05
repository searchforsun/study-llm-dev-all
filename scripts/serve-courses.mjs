/**
 * 静态托管 courses/，并支持 PUT /<slug>/progress.local.json 写入学习进度。
 * 用法（仓库根目录）：node scripts/serve-courses.mjs
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coursesRoot = path.resolve(__dirname, '..', 'courses');
const PORT = Number(process.env.PORT) || 3000;
const PROGRESS_FILE = 'progress.local.json';
const API_MARKER = '/.well-known/html-tutorial-progress';

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
  const abs = path.resolve(coursesRoot, slug, PROGRESS_FILE);
  if (!abs.startsWith(coursesRoot + path.sep) && abs !== coursesRoot) return null;
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
  const abs = path.normalize(path.join(coursesRoot, rel.replace(/^\//, '')));
  if (!abs.startsWith(coursesRoot)) return null;
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
  console.log(`Courses dev server: http://localhost:${PORT}`);
  console.log(`  Progress API: PUT /<slug>/${PROGRESS_FILE}`);
  console.log(`  Root: ${coursesRoot}`);
});
