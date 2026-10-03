/* Chạy thử web: node smoke.js  → ảnh chụp trong thư mục shots/ */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const URL = 'file:///' + path.join(__dirname, '..', 'site', 'index.html').replace(/\\/g, '/');
const OUT = path.join(__dirname, '..', 'shots');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.setViewport({ width: 1280, height: 860 });
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUT, '1-home.png') });

  // Demo trang chủ: chọn B6, gõ công thức bằng bàn phím, Enter, Kiểm tra
  await page.click('td[data-a="B6"]');
  await page.keyboard.type('=sum(B2:B5');
  await page.keyboard.press('Enter');
  await page.evaluate(() => [...document.querySelectorAll('.hero-demo .btn')].find(b => b.textContent === 'Kiểm tra').click());
  const fb = await page.$eval('.hero-demo .feedback', e => e.textContent);
  console.log('Demo feedback:', fb.slice(0, 80));
  await page.screenshot({ path: path.join(OUT, '2-home-demo.png') });

  // Bài học có bài tập: p1/cong-thuc
  await page.evaluate(() => { location.hash = '#/bai/p1/cong-thuc'; });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT, '3-lesson.png'), fullPage: true });
  // Làm bài tập 1: D2 =B2*C2, sao chép, kiểm tra
  const sheets = await page.$$('.ex-block .sheet');
  const s1 = sheets[0];
  await (await s1.$('td[data-a="D2"]')).click();
  await page.keyboard.type('=');
  await (await s1.$('td[data-a="B2"]')).click();   // chọn ô bằng chuột khi gõ công thức
  await page.keyboard.type('*');
  await (await s1.$('td[data-a="C2"]')).click();
  const editorVal = await s1.$eval('.cell-editor', e => e.value);
  console.log('Editor sau khi bấm chọn ô:', editorVal);
  await page.keyboard.press('Enter');
  await (await s1.$('td[data-a="D2"]')).click();
  await s1.evaluate(el => [...el.querySelectorAll('.btn')].find(b => b.textContent === 'Sao chép công thức').click());
  await s1.evaluate(el => [...el.querySelectorAll('.btn')].find(b => b.textContent === 'Kiểm tra').click());
  console.log('Bài tập 1:', (await s1.$eval('.feedback', e => e.textContent)).slice(0, 60));
  // Bài tập 2: thử gõ cứng
  const s2 = sheets[1];
  await (await s2.$('td[data-a="D2"]')).click();
  await page.keyboard.type('=17020000');
  await page.keyboard.press('Enter');
  await s2.evaluate(el => [...el.querySelectorAll('.btn')].find(b => b.textContent === 'Kiểm tra').click());
  console.log('Bài tập 2 (gõ cứng):', (await s2.$eval('.feedback', e => e.textContent)).slice(0, 160));
  await page.screenshot({ path: path.join(OUT, '4-lesson-done.png'), fullPage: true });

  // Duyệt mọi bài & test để bắt lỗi JS
  const routes = await page.evaluate(() => {
    const r = ['#/lo-trinh', '#/tra-cuu', '#/tra-cuu/VLOOKUP', '#/bang-nhap'];
    ECC.parts.forEach(p => { p.lessons.forEach(l => r.push('#/bai/' + p.id + '/' + l.id)); r.push('#/kiem-tra/' + p.id); });
    return r;
  });
  // mở khoá tất cả để duyệt
  await page.evaluate(() => {
    const st = JSON.parse(localStorage.getItem('ecc_progress_v1') || '{}');
    st.tests = st.tests || {};
    ECC.parts.forEach(p => { st.tests[p.id] = { best: 100, attempts: 1, passed: true }; });
    localStorage.setItem('ecc_progress_v1', JSON.stringify(st));
  });
  await page.goto(URL, { waitUntil: 'networkidle0' });
  for (const r of routes) {
    await page.evaluate(h => { location.hash = h; }, r);
    await new Promise(res => setTimeout(res, 120));
    const n = await page.evaluate(() => document.querySelectorAll('#main *').length);
    if (n < 10) errors.push('trang trống: ' + r);
  }
  await page.evaluate(() => { location.hash = '#/tra-cuu/VLOOKUP'; });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUT, '5-ref.png') });
  await page.evaluate(() => { location.hash = '#/kiem-tra/p1'; });
  await new Promise(r => setTimeout(r, 300));
  await page.evaluate(() => [...document.querySelectorAll('.btn')].find(b => /bài kiểm tra|Bắt đầu/.test(b.textContent)).click());
  await page.evaluate(() => document.querySelectorAll('.tq').forEach(q => q.querySelector('.opt').click()));
  await page.evaluate(() => [...document.querySelectorAll('.btn')].find(b => b.textContent === 'Nộp bài')?.click());
  await page.evaluate(() => [...document.querySelectorAll('.btn')].find(b => b.textContent === 'Nộp bài')?.click());
  await new Promise(r => setTimeout(r, 300));
  console.log('Điểm test:', await page.$eval('.score-num', e => e.textContent));
  await page.screenshot({ path: path.join(OUT, '6-test.png') });
  await page.evaluate(() => { location.hash = '#/lo-trinh'; });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUT, '7-map.png') });

  // điện thoại + chế độ tối
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => { location.hash = '#/bai/p4/sumif'; });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT, '8-mobile-dark.png') });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log('Tràn ngang trên điện thoại (px):', overflow);

  console.log(errors.length ? 'LỖI:\n' + [...new Set(errors)].join('\n') : 'Không có lỗi JS');
  await browser.close();
})();
