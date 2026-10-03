/* So bài tập hiện tại với bản gốc (Downloads/ExcelcungChinh) – chỉ cho phép khác task/hint/explain.
   node tools/compare-exercises.js                                                              */
const path = require('path');
const vm = require('vm');
const fs = require('fs');
function load(dir) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(dir, 'core.js'), 'utf8') + ';var ECC=window.ECC;', ctx);
  for (let i = 1; i <= 8; i++) vm.runInContext(fs.readFileSync(path.join(dir, 'part' + i + '.js'), 'utf8'), ctx);
  return ctx.window.ECC.parts;
}
const now = load(path.join(__dirname, '..', 'site', 'js', 'data'));
const old = load('C:/Users/A/Downloads/ExcelcungChinh/js/data');
const strip = x => { const { task, hint, explain, ...rest } = x; return JSON.stringify(rest); };
let diff = 0;
old.forEach(po => {
  const pn = now.find(p => p.id === po.id);
  po.lessons.forEach(lo => {
    const ln = pn.lessons.find(l => l.id === lo.id);
    if (!ln) { diff++; return console.log('THIẾU BÀI', po.id, lo.id); }
    (lo.exercises || []).forEach(xo => {
      const xn = (ln.exercises || []).find(x => x.id === xo.id);
      if (!xn) { diff++; console.log('THIẾU BÀI TẬP', po.id, lo.id, xo.id); }
      else if (strip(xo) !== strip(xn)) { diff++; console.log('ĐỔI BÀI TẬP', po.id, lo.id, xo.id); }
    });
  });
  const to = JSON.stringify((po.test.mcq || []).map(q => q.answer)) + JSON.stringify((po.test.practice || []).map(strip));
  const tn = JSON.stringify((pn.test.mcq || []).map(q => q.answer)) + JSON.stringify((pn.test.practice || []).map(strip));
  if (to !== tn) { diff++; console.log('ĐỔI BÀI TEST', po.id); }
});
console.log(diff ? diff + ' khác biệt' : 'Bài tập và bài test giữ nguyên như bản gốc');
