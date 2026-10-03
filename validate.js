/* Kiểm tra nội dung khoá học ExcelcungChinh.
   Cách chạy:  node validate.js            (kiểm tra tất cả file data)
               node validate.js part3.js   (chỉ một file)                        */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'site', 'js');
global.window = global;
global.HyperFormula = require('hyperformula').HyperFormula;
require(path.join(ROOT, 'engine.js'));
require(path.join(ROOT, 'data', 'core.js'));
const E = window.ECC_ENGINE;

const only = process.argv[2];
const files = fs.readdirSync(path.join(ROOT, 'data')).filter(f => f !== 'core.js' && f.endsWith('.js'));
for (const f of files) {
  if (only && f !== only && f !== 'functions.js') continue;
  try { require(path.join(ROOT, 'data', f)); }
  catch (e) { console.log('LỖI CÚ PHÁP ' + f + ': ' + e.message); process.exitCode = 1; }
}

let errors = 0, warns = 0;
const err = (where, msg) => { errors++; console.log('  ✗ ' + where + ': ' + msg); };
const warn = (where, msg) => { warns++; console.log('  ! ' + where + ': ' + msg); };
const SUPPORTED = new Set(E.functionNames);

function checkFormula(where, f) {
  E.usedFunctions(f).forEach(fn => { if (!SUPPORTED.has(fn)) err(where, 'hàm ' + fn + ' không được bộ tính hỗ trợ'); });
}
const perturb = E.perturb;
function answerCells(ex) {
  const cells = [];
  (ex.answers || []).forEach(a => cells.push({ cell: a.cell.toUpperCase(), solution: a.solution }));
  const fills = ex.fill ? (Array.isArray(ex.fill) ? ex.fill : [ex.fill]) : [];
  fills.forEach(fl => {
    const list = E.expandRange(fl.range);
    const first = E.parseAddr(list[0]);
    list.forEach(c => {
      const p = E.parseAddr(c);
      cells.push({ cell: c, solution: E.shiftFormula(fl.solution, p.row - first.row, p.col - first.col) });
    });
  });
  return cells;
}
function checkData(where, data) {
  if (!Array.isArray(data) || !data.length) return err(where, 'thiếu data');
  data.forEach((r, i) => { if (!Array.isArray(r)) err(where, 'hàng ' + (i + 1) + ' không phải mảng'); });
  if (data.length > 16) warn(where, 'bảng dài ' + data.length + ' hàng (nên ≤ 15)');
  const w = Math.max(...data.map(r => r.length));
  if (w > 9) warn(where, 'bảng rộng ' + w + ' cột (nên ≤ 8)');
}
function checkExample(where, b) {
  checkData(where, b.data);
  const hf = E.build(b.data);
  b.data.forEach((r, ri) => r.forEach((v, ci) => {
    if (typeof v === 'string' && v.trim()[0] === '=') {
      checkFormula(where + ' ' + E.addr(ci, ri), v);
      const c = E.getCell(hf, E.addr(ci, ri));
      if (c.error && !b.allowError) err(where + ' ' + E.addr(ci, ri), v + ' → ' + c.value + ' ' + (c.message || ''));
    }
  }));
  hf.destroy();
}
function checkWithFormula(where, b) {
  if (!b.cell || !b.formula) return err(where, 'thiếu cell/formula');
  const d = b.data.map(r => r.slice()); const p = E.parseAddr(b.cell);
  while (d.length <= p.row) d.push([]); d[p.row][p.col] = b.formula;
  checkExample(where, { data: d });
  if (b.t === 'anatomy') {
    const n = E.splitArgs(b.formula.replace(/^=\s*[A-Za-z.]+\(/, '').replace(/\)\s*$/, '')).length;
    if ((b.parts || []).length !== n) err(where, 'số parts (' + (b.parts || []).length + ') khác số đối số (' + n + ')');
  }
  if (b.t === 'walk' && !(b.steps || []).length) err(where, 'walk thiếu steps');
}
const RIBBON_IDS = new Set(fs.readFileSync(path.join(__dirname, 'ribbon-ids.txt'), 'utf8').split(/\s+/).filter(Boolean));
const TABS = ['home', 'insert', 'pagelayout', 'formulas', 'data', 'review', 'view'];
function checkId(where, id) {
  if (!id) return err(where, 'thiếu id nút');
  if (id.indexOf('tab.') === 0) { if (!TABS.includes(id.slice(4))) err(where, 'tab lạ ' + id); return; }
  if (!RIBBON_IDS.has(id)) err(where, 'nút ' + id + ' không có trong tools/ribbon-ids.txt');
}
function checkSim(where, b) {
  if (!b.id) err(where, 'sim thiếu id');
  const head = b.data[0];
  const steps = b.steps || [];
  steps.forEach((st, i) => {
    const w = where + ' bước ' + (i + 1);
    if (!['cell', 'tab', 'button', 'menu', 'sortDialog', 'filterArrow', 'filterPick'].includes(st.do)) err(w, 'loại lạ ' + st.do);
    if (!st.text) err(w, 'thiếu text');
    if (st.do === 'tab' && !TABS.includes(st.target)) err(w, 'tab lạ ' + st.target);
    if (st.do === 'button') checkId(w, st.target);
    if (st.do === 'menu') {
      checkId(w, st.at);
      const prev = steps[i - 1];
      if (!prev || (prev.do !== 'button' && prev.do !== 'menu')) err(w, 'bước menu phải đi ngay sau bước button/menu');
      const names = (st.items || []).map(x => x.replace(/ ›$/, ''));
      if (names.indexOf(st.answer) < 0) err(w, 'answer "' + st.answer + '" không có trong items');
    }
    if (st.do === 'sortDialog' && !(steps[i - 1] && steps[i - 1].target === 'data.sort')) err(w, 'sortDialog phải sau bước button data.sort');
    (st.levels || []).forEach(l => { if (head.indexOf(l.col) < 0) err(w, 'cột ' + l.col + ' không có'); });
    if (st.col && head.indexOf(st.col) < 0) err(w, 'cột ' + st.col + ' không có');
    if (st.effect && st.effect.col && head.indexOf(st.effect.col) < 0) err(w, 'effect: cột ' + st.effect.col + ' không có');
  });
}
function checkUi(where, b) {
  if (b.tab && !TABS.includes(b.tab)) err(where, 'tab lạ ' + b.tab);
  (b.marks || []).forEach(m => checkId(where, m.id));
}
function checkExercise(where, ex) {
  if (!ex.id) err(where, 'thiếu id');
  if (!ex.task) err(where, 'thiếu task');
  checkData(where, ex.data);
  const cells = answerCells(ex);
  if (!cells.length) return err(where, 'không có ô đáp án (answers/fill)');
  const hf = E.build(ex.data);
  cells.forEach(a => {
    const p = E.parseAddr(a.cell);
    const v = ex.data[p.row] && ex.data[p.row][p.col];
    if (v !== undefined && v !== null && v !== '') err(where + ' ' + a.cell, 'ô đáp án đang có dữ liệu "' + v + '" (phải để trống)');
    if (!a.solution || a.solution.trim()[0] !== '=') err(where + ' ' + a.cell, 'solution phải bắt đầu bằng =');
    checkFormula(where + ' ' + a.cell, a.solution);
  });
  cells.forEach(a => E.setCell(hf, a.cell, a.solution));
  let sameAll = true;
  const hp = E.build(perturb(ex.data));
  cells.forEach(a => E.setCell(hp, a.cell, a.solution));
  cells.forEach(a => {
    const c = E.getCell(hf, a.cell);
    if (c.error) err(where + ' ' + a.cell, a.solution + ' → ' + c.value + ' ' + (c.message || ''));
    if (c.value === null || c.value === '') warn(where + ' ' + a.cell, a.solution + ' ra kết quả rỗng');
    if (!E.sameValue(c, E.getCell(hp, a.cell))) sameAll = false;
  });
  if (sameAll && ex.strict !== false) warn(where, 'kết quả không đổi khi đổi dữ liệu số → không phát hiện được gõ cứng (có thể đặt strict:false nếu cố ý)');
  (ex.mustUse || []).forEach(fn => {
    if (!cells.every(a => E.usedFunctions(a.solution).includes(fn.toUpperCase()))) err(where, 'mustUse ' + fn + ' nhưng solution không dùng');
  });
  hf.destroy(); hp.destroy();
}
function checkMcq(where, q) {
  if (!q.q) err(where, 'thiếu câu hỏi');
  if (!Array.isArray(q.options) || q.options.length < 2) return err(where, 'thiếu options');
  if (!(q.answer >= 0 && q.answer < q.options.length)) err(where, 'answer ngoài phạm vi');
  if (new Set(q.options).size !== q.options.length) err(where, 'options bị trùng');
  if (!q.explain) warn(where, 'thiếu explain');
}

const BLOCK_TYPES = new Set(['p', 'h', 'list', 'syntax', 'example', 'tip', 'warn', 'table', 'steps', 'keys', 'quiz', 'scenario', 'excelui', 'sim', 'anatomy', 'walk']);
const funcNames = new Set(ECC.funcs.map(f => f.name));
let lessonCount = 0, exCount = 0, mcqCount = 0;

ECC.parts.forEach(p => {
  console.log('Phần ' + p.no + ' – ' + p.title);
  ['id', 'no', 'title', 'short', 'desc'].forEach(k => { if (p[k] === undefined) err(p.id, 'thiếu ' + k); });
  const lids = new Set();
  (p.lessons || []).forEach(l => {
    lessonCount++;
    const W = p.id + '/' + l.id;
    if (lids.has(l.id)) err(W, 'trùng id bài');
    lids.add(l.id);
    if (!l.title) err(W, 'thiếu title');
    const qids = new Set();
    (l.blocks || []).forEach((b, i) => {
      const w = W + ' block#' + i + '(' + b.t + ')';
      if (!BLOCK_TYPES.has(b.t)) err(w, 'loại block lạ');
      if (b.t === 'example') checkExample(w, b);
      if (b.t === 'anatomy' || b.t === 'walk') checkWithFormula(w, b);
      if (b.t === 'sim') checkSim(w, b);
      if (b.t === 'excelui') checkUi(w, b);
      if (b.t === 'syntax' && b.code) checkFormula(w, b.code.replace(/\[|\]|\.\.\./g, ''));
      if (b.t === 'quiz') {
        mcqCount++;
        if (!b.id) err(w, 'quiz thiếu id');
        if (qids.has(b.id)) err(w, 'trùng id quiz');
        qids.add(b.id);
        checkMcq(w, b);
      }
    });
    const eids = new Set();
    (l.exercises || []).forEach(ex => {
      exCount++;
      if (eids.has(ex.id)) err(W, 'trùng id bài tập ' + ex.id);
      eids.add(ex.id);
      checkExercise(W + ' ' + ex.id, ex);
    });
    (l.funcs || []).forEach(fn => { if (ECC.funcs.length && !funcNames.has(fn)) warn(W, 'hàm ' + fn + ' chưa có trong trang Tra cứu'); });
  });
  if (!p.test) err(p.id, 'thiếu bài test');
  else {
    (p.test.mcq || []).forEach((q, i) => { mcqCount++; checkMcq(p.id + ' test mcq#' + (i + 1), q); });
    (p.test.practice || []).forEach(ex => { exCount++; checkExercise(p.id + ' test ' + ex.id, ex); });
    if ((p.test.mcq || []).length < 8) warn(p.id, 'test nên có ≥ 8 câu trắc nghiệm');
  }
});

if (ECC.funcs.length && (!only || only === 'functions.js')) {
  console.log('Tra cứu hàm: ' + ECC.funcs.length + ' hàm');
  const seen = new Set();
  ECC.funcs.forEach(f => {
    const w = 'func ' + f.name;
    if (seen.has(f.name)) err(w, 'trùng');
    seen.add(f.name);
    ['name', 'group', 'short', 'syntax', 'desc'].forEach(k => { if (!f[k]) err(w, 'thiếu ' + k); });
    if (f.example) {
      checkData(w, f.example.data);
      const hf = E.build(f.example.data);
      const cell = f.example.cell;
      if (!cell) err(w, 'example thiếu cell');
      else {
        const p = E.parseAddr(cell);
        const v = f.example.data[p.row] && f.example.data[p.row][p.col];
        if (v !== undefined && v !== null && v !== '') err(w, 'example.cell phải trống trong data');
        checkFormula(w, f.example.formula);
        E.setCell(hf, cell, f.example.formula);
        const c = E.getCell(hf, cell);
        if (c.error) err(w, f.example.formula + ' → ' + c.value + ' ' + (c.message || ''));
      }
      hf.destroy();
    } else if (f.supported !== false) warn(w, 'không có example');
  });
}

console.log('\n' + ECC.parts.length + ' phần, ' + lessonCount + ' bài, ' + exCount + ' bài tập, ' + mcqCount + ' câu trắc nghiệm');
console.log(errors ? errors + ' LỖI, ' + warns + ' cảnh báo' : 'OK – 0 lỗi, ' + warns + ' cảnh báo');
if (errors) process.exitCode = 1;
