/* Chạy thử 2 bài mẫu (VLOOKUP, Sắp xếp & Lọc): node tools/sample-test.js */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const URL = pathToFileURL(path.join(__dirname, '..', 'site', 'index.html')).href;
const OUT = path.join(__dirname, '..', 'shots');
fs.mkdirSync(OUT, { recursive: true });
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
  const p = await b.newPage();
  const errors = [];
  p.on('pageerror', e => errors.push(e.message));
  p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await p.setViewport({ width: 1366, height: 900 });
  await p.goto(URL, { waitUntil: 'networkidle0' });
  await p.evaluate(() => {
    const st = { lessons: {}, tests: {}, answers: {} };
    ECC.parts.forEach(x => { st.tests[x.id] = { best: 100, attempts: 1, passed: true }; });
    localStorage.setItem('ecc_progress_v1', JSON.stringify(st));
  });

  await p.reload({ waitUntil: 'networkidle0' });
  // ---- Bài VLOOKUP ----
  await p.goto(URL + '#/bai/p7/vlookup', { waitUntil: 'networkidle0' });
  await wait(300);
  await p.screenshot({ path: path.join(OUT, 'v1-top.png') });
  const ana = await p.$('.anatomy');
  await ana.screenshot({ path: path.join(OUT, 'v2-anatomy.png') });
  await p.click('.ana-item[data-i="2"]');
  await ana.screenshot({ path: path.join(OUT, 'v3-anatomy-focus.png') });
  const walk = await p.$('.walk');
  for (let i = 0; i < 4; i++) await p.click('.walk .btn.primary');
  await walk.screenshot({ path: path.join(OUT, 'v4-walk.png') });
  const fig = await p.$('.xl-fig');
  await fig.screenshot({ path: path.join(OUT, 'v5-ribbon.png') });
  // sheet bài tập: gõ công thức để xem tô màu tham chiếu
  const s1 = (await p.$$('.ex-block .sheet'))[0];
  await (await s1.$('td[data-a="C2"]')).click();
  await p.keyboard.type('=VLOOKUP(A2,$F$2:$H$5,2,');
  await s1.screenshot({ path: path.join(OUT, 'v6-sheet-editing.png') });
  await p.keyboard.press('Escape');

  // ---- Bài Sắp xếp & Lọc ----
  await p.goto(URL + '#/bai/p8/sap-xep-loc', { waitUntil: 'networkidle0' });
  await wait(300);
  const figs = await p.$$('.xl-fig');
  await figs[0].screenshot({ path: path.join(OUT, 's1-ribbon-data.png') });
  const sims = await p.$$('.xl-sim');
  const clickIn = async (root, sel) => { const e = await root.$(sel); if (!e) throw new Error('không thấy ' + sel); await e.click(); await wait(80); };

  // Sim 1: sort desc
  let s = sims[0];
  await clickIn(s, 'td[data-r="2"][data-c="1"]');
  await clickIn(s, '[data-id="data.sort"]').catch(() => {});        // bấm sai: chưa chọn tab Data
  await clickIn(s, '[data-id="home.paste"]');                         // bấm sai lần 2 → hiện gợi ý
  await s.screenshot({ path: path.join(OUT, 's2-sim-hint.png') });
  await clickIn(s, '[data-id="tab.data"]');
  await clickIn(s, '[data-id="data.sort"]');
  await s.screenshot({ path: path.join(OUT, 's3-sort-dialog.png') });
  await (await s.$('.xd-sel[data-k="ci"][data-i="0"]')).select('3');
  await (await s.$('.xd-sel[data-k="order"][data-i="0"]')).select('desc');
  await clickIn(s, '.xd-ok');
  await s.screenshot({ path: path.join(OUT, 's4-sorted.png') });
  const firstAfterSort = await s.$eval('td[data-r="1"][data-c="0"]', e => e.textContent);
  console.log('Sim 1 – dòng đầu sau khi sắp:', firstAfterSort, '| hoàn thành:', await s.$eval('.sim-msg', e => e.textContent.slice(0, 40)));

  // Sim 2: filter
  s = sims[1];
  await clickIn(s, 'td[data-r="1"][data-c="0"]');
  await clickIn(s, '[data-id="tab.data"]');
  await clickIn(s, '[data-id="data.filter"]');
  await clickIn(s, '[data-id="arrow.2"]');
  await s.screenshot({ path: path.join(OUT, 's5-filter-menu.png') });
  await clickIn(s, '.xfm-list input[data-v="__all"]');
  await clickIn(s, '.xfm-list input[data-v="Miền Bắc"]');
  await clickIn(s, '.xfm-foot .xd-ok');
  const visible = await s.$$eval('.xw-grid tbody tr', r => r.length - 1);
  await s.screenshot({ path: path.join(OUT, 's6-filtered.png') });
  console.log('Sim 2 – số dòng đang hiện:', visible, '| hoàn thành:', await s.$eval('.sim-msg', e => e.textContent.slice(0, 40)));

  // Sim 3: multi-level
  s = sims[2];
  await clickIn(s, 'td[data-r="1"][data-c="0"]');
  await clickIn(s, '[data-id="data.sort"]');
  await (await s.$('.xd-sel[data-k="ci"][data-i="0"]')).select('2');
  await clickIn(s, '[data-a="add"]');
  await (await s.$('.xd-sel[data-k="ci"][data-i="1"]')).select('3');
  await (await s.$('.xd-sel[data-k="order"][data-i="1"]')).select('desc');
  await clickIn(s, '.xd-ok');
  const order = await s.$$eval('.xw-grid tbody tr td:first-of-type', t => t.slice(1).map(x => x.textContent).join(' '));
  console.log('Sim 3 – thứ tự:', order);

  const banner = await p.$eval('.done-banner', e => e.textContent).catch(() => '');
  console.log('Banner bài:', banner.slice(0, 80));

  // điện thoại
  await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await p.goto(URL + '#/bai/p7/vlookup', { waitUntil: 'networkidle0' });
  await wait(300);
  console.log('Tràn ngang trên điện thoại (px):', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
  await (await p.$('.anatomy')).screenshot({ path: path.join(OUT, 'm1-anatomy.png') });

  console.log(errors.length ? 'LỖI JS:\n' + [...new Set(errors)].join('\n') : 'Không có lỗi JS');
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
