/* Gộp web thành một file HTML duy nhất (dùng để đăng Artifact trên claude.ai).
   node build.js  →  dist/ExcelcungChinh.html                                    */
const fs = require('fs');
const path = require('path');
const SRC = path.join(__dirname, '..', 'site');
const OUT = path.join(__dirname, '..', 'dist');
fs.mkdirSync(OUT, { recursive: true });

let html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
html = html.replace(/<link rel="stylesheet" href="(css\/[^"]+)">/g, (m, f) =>
  '<style>\n' + fs.readFileSync(path.join(SRC, f), 'utf8') + '\n</style>');
html = html.replace(/<script src="(js\/[^"]+)"><\/script>/g, (m, f) => {
  const p = path.join(SRC, f);
  if (!fs.existsSync(p)) { console.log('Bỏ qua (chưa có): ' + f); return ''; }
  return '<script>\n' + fs.readFileSync(p, 'utf8').replace(/<\/script/gi, '<\\/script') + '\n</script>';
});
// Artifact tự bọc doctype/html/head/body, nên bỏ các thẻ khung
html = html
  .replace(/<!doctype html>\s*/i, '')
  .replace(/<html[^>]*>\s*/i, '')
  .replace(/<\/html>\s*/i, '')
  .replace(/<head>\s*/i, '')
  .replace(/<\/head>\s*/i, '')
  .replace(/<body>\s*/i, '')
  .replace(/<\/body>\s*/i, '')
  .replace(/<meta charset="utf-8">\s*/i, '')
  .replace(/<meta name="viewport"[^>]*>\s*/i, '');
const out = path.join(OUT, 'ExcelcungChinh.html');
fs.writeFileSync(out, html);
console.log('Đã tạo ' + out + ' (' + Math.round(fs.statSync(out).size / 1024) + ' KB)');
