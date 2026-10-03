/* Mở từng bài trên trình duyệt, bắt lỗi JS, bấm qua các bước "walk" và tự làm mọi bài mô phỏng.
   Cần server đang chạy (npm start).
   node tools/lesson-check.js            (tất cả phần)
   node tools/lesson-check.js p8 p3      (chỉ các phần chỉ định)                               */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const BASE = process.env.BASE || 'http://localhost:8080/?xem-truoc';
const only = process.argv.slice(2);
const OUT = path.join(__dirname, '..', 'shots', 'lessons');
fs.mkdirSync(OUT, { recursive: true });
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
  const p = await b.newPage();
  let errors = [];
  p.on('pageerror', e => errors.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/favicon|404/.test(m.text())) errors.push(m.text()); });
  await p.setViewport({ width: 1366, height: 900 });
  await p.goto(BASE + '#/', { waitUntil: 'networkidle0' });
  const lessons = await p.evaluate(() => ECC.parts.flatMap(pt => pt.lessons.map(l => ({ p: pt.id, l: l.id, sims: l.blocks.filter(x => x.t === 'sim') }))));
  let bad = 0, simsOk = 0, simsAll = 0, walks = 0;

  for (const ls of lessons) {
    if (only.length && !only.includes(ls.p)) continue;
    errors = [];
    const problems = [];
    await p.evaluate(h => { location.hash = h; }, '#/bai/' + ls.p + '/' + ls.l);
    await wait(250);
    const h1 = await p.$eval('h1', e => e.textContent);
    if (/khoá/.test(h1)) problems.push('trang bị khoá');

    // walk: bấm Tiếp tới cuối
    const walkCount = await p.$$eval('.walk', w => w.length);
    for (let i = 0; i < walkCount; i++) {
      const steps = await p.evaluate(i => {
        const w = document.querySelectorAll('.walk')[i];
        const nx = w.querySelector('.btn.primary');
        let n = 0;
        while (!nx.disabled && n < 30) { nx.click(); n++; }
        return n;
      }, i);
      walks++;
      if (steps === 0) problems.push('walk #' + (i + 1) + ' chỉ có 1 bước');
    }
    // anatomy: bấm từng phần
    await p.evaluate(() => document.querySelectorAll('.ana-item').forEach(x => x.click()));

    // sim
    const simEls = await p.$$('.xl-sim');
    for (let si = 0; si < simEls.length; si++) {
      simsAll++;
      const s = simEls[si], cfg = ls.sims[si];
      const head = cfg.data[0];
      const click = async sel => { const e = await s.$(sel); if (!e) throw new Error('không thấy ' + sel); await e.click(); await wait(60); };
      try {
        for (const st of cfg.steps) {
          if (st.do === 'cell') await click('td[data-r="1"][data-c="0"]');
          else if (st.do === 'tab') await click('[data-id="tab.' + st.target + '"]');
          else if (st.do === 'button') {
            if (!(await s.$('[data-id="' + st.target + '"]'))) await click('[data-id="tab.' + st.target.split('.')[0] + '"]');
            await click('[data-id="' + st.target + '"]');
          } else if (st.do === 'menu') await click('.xm-i[data-v="' + st.answer.replace(/"/g, '\\"') + '"]');
          else if (st.do === 'sortDialog') {
            for (let i = 0; i < st.levels.length; i++) {
              if (i > 0) await click('[data-a="add"]');
              await (await s.$('.xd-sel[data-k="ci"][data-i="' + i + '"]')).select(String(head.indexOf(st.levels[i].col)));
              await (await s.$('.xd-sel[data-k="order"][data-i="' + i + '"]')).select(st.levels[i].order);
            }
            await click('.xd-ok');
          } else if (st.do === 'filterArrow') await click('[data-id="arrow.' + head.indexOf(st.col) + '"]');
          else if (st.do === 'filterPick') {
            await click('.xfm-list input[data-v="__all"]');
            for (const v of st.keep) await click('.xfm-list input[data-v="' + String(v).replace(/"/g, '\\"') + '"]');
            await click('.xfm-foot .xd-ok');
          }
        }
        const okMsg = await s.$('.sim-msg.good');
        if (okMsg) simsOk++;
        else problems.push('sim "' + cfg.id + '" không hoàn thành: ' + (await s.$eval('.sim-msg', e => e.textContent).catch(() => '')));
      } catch (e) {
        problems.push('sim "' + cfg.id + '": ' + e.message);
      }
    }
    if (errors.length) problems.push('lỗi JS: ' + [...new Set(errors)].join(' | '));
    await p.screenshot({ path: path.join(OUT, ls.p + '-' + ls.l + '.png'), fullPage: true });
    console.log((problems.length ? '✗ ' : '✓ ') + ls.p + '/' + ls.l + (problems.length ? '\n    ' + problems.join('\n    ') : ''));
    if (problems.length) bad++;
  }
  console.log('\n' + (bad ? bad + ' bài có vấn đề' : 'Tất cả bài OK') + ' · walk: ' + walks + ' · mô phỏng hoàn thành: ' + simsOk + '/' + simsAll);
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
