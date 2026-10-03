/* ExcelcungChinh – bảng tính mini
   Chế độ: 'example' (chỉ xem), 'practice' (bài tập, có chấm), 'test' (bài kiểm tra),
           'playground' (bảng nháp, sửa mọi ô)                                      */
(function () {
  'use strict';
  var E = window.ECC_ENGINE;
  var live = [];

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  var funcIndex = null;
  function funcInfo(name) {
    if (!funcIndex) {
      funcIndex = {};
      (window.ECC && ECC.funcs || []).forEach(function (f) { funcIndex[f.name] = f; });
    }
    return funcIndex[name];
  }
  function suggestNames(prefix) {
    prefix = prefix.toUpperCase();
    var taught = (window.ECC && ECC.funcs || []).filter(function (f) { return f.supported !== false; }).map(function (f) { return f.name; });
    var pool = taught.concat(E.functionNames.filter(function (n) { return taught.indexOf(n) < 0; }));
    return pool.filter(function (n) { return n.indexOf(prefix) === 0; }).slice(0, 7);
  }

  function Sheet(container, cfg, opts) {
    opts = opts || {};
    var mode = opts.mode || 'practice';
    var self = this;
    var data = (cfg.data || []).map(function (r) { return r.slice(); });
    var fmt = cfg.fmt || {};
    var readonly = mode === 'example';

    /* ----- ô đáp án ----- */
    var answers = []; // {cell, solution, group}
    var groups = {};
    (cfg.answers || []).forEach(function (a, i) {
      var g = 'a' + i;
      answers.push({ cell: a.cell.toUpperCase(), solution: a.solution, group: g });
      groups[g] = [a.cell.toUpperCase()];
    });
    var fills = cfg.fill ? (Array.isArray(cfg.fill) ? cfg.fill : [cfg.fill]) : [];
    fills.forEach(function (fl, i) {
      var g = 'f' + i, list = E.expandRange(fl.range), first = E.parseAddr(list[0]);
      groups[g] = list;
      list.forEach(function (c) {
        var p = E.parseAddr(c);
        answers.push({ cell: c, solution: E.shiftFormula(fl.solution, p.row - first.row, p.col - first.col), group: g });
      });
    });
    var answerMap = {};
    answers.forEach(function (a) { answerMap[a.cell] = a; });

    /* ----- kích thước lưới ----- */
    var nRows = data.length, nCols = 0;
    data.forEach(function (r) { nCols = Math.max(nCols, r.length); });
    answers.forEach(function (a) {
      var p = E.parseAddr(a.cell);
      nRows = Math.max(nRows, p.row + 1);
      nCols = Math.max(nCols, p.col + 1);
    });
    if (mode === 'playground') { nRows = Math.max(nRows, opts.rows || 14); nCols = Math.max(nCols, opts.cols || 8); }
    nRows = Math.max(nRows, 1); nCols = Math.max(nCols, 1);

    /* ----- nội dung người học gõ ----- */
    var raw = {};
    function isEditable(a) {
      if (readonly || self.locked) return false;
      if (mode === 'playground') return true;
      return !!answerMap[a];
    }
    if (mode === 'playground') {
      data.forEach(function (r, ri) {
        r.forEach(function (v, ci) { if (v !== null && v !== undefined && v !== '') raw[E.addr(ci, ri)] = String(v); });
      });
    }
    var saved = opts.saved || null;
    var hf = E.build(data);
    if (saved) Object.keys(saved).forEach(function (a) { if (isEditable(a)) { raw[a] = saved[a]; E.setCell(hf, a, saved[a]); } });

    var solHF = null;
    function solution() {
      if (!solHF) {
        solHF = E.build(data);
        answers.forEach(function (a) { E.setCell(solHF, a.cell, a.solution); });
      }
      return solHF;
    }

    /* ----- khung ----- */
    var root = el('div', 'sheet sheet-' + mode);
    root.tabIndex = -1;
    var fbar = el('div', 'fbar');
    var nameBoxEl = el('div', 'namebox', '<span class="nb-text">A1</span><span class="nb-caret" aria-hidden="true">▾</span>');
    var nameBox = nameBoxEl.firstChild;
    var fxIcons = el('div', 'fx-icons', '<span class="fx-x" title="Huỷ (Esc)">✕</span><span class="fx-ok" title="Nhập (Enter)">✓</span>');
    var fxLabel = el('div', 'fxlabel', '<i>f</i><i>x</i>');
    var finput = el('input', 'finput');
    finput.type = 'text';
    finput.spellcheck = false;
    finput.autocomplete = 'off';
    finput.setAttribute('aria-label', 'Thanh công thức');
    if (opts.idBase) finput.id = opts.idBase + '-fx';
    fbar.appendChild(nameBoxEl); fbar.appendChild(fxIcons); fbar.appendChild(fxLabel); fbar.appendChild(finput);
    fxIcons.firstChild.addEventListener('mousedown', function (e) { e.preventDefault(); cancel(); });
    fxIcons.lastChild.addEventListener('mousedown', function (e) { e.preventDefault(); commit(); });
    root.appendChild(fbar);
    var sig = el('div', 'sig'); sig.hidden = true; root.appendChild(sig);
    var ac = el('ul', 'ac'); ac.hidden = true; root.appendChild(ac);

    var wrap = el('div', 'grid-wrap');
    var table = el('table', 'grid');
    var thead = el('thead'), trh = el('tr');
    trh.appendChild(el('th', 'corner'));
    var colHeads = [], rowHeads = [];
    for (var c = 0; c < nCols; c++) { var chd = el('th', 'colh', E.colName(c)); colHeads.push(chd); trh.appendChild(chd); }
    thead.appendChild(trh); table.appendChild(thead);
    var tbody = el('tbody');
    var tds = {};
    for (var r = 0; r < nRows; r++) {
      var tr = el('tr');
      var rhd = el('th', 'rowh', String(r + 1));
      rowHeads.push(rhd);
      tr.appendChild(rhd);
      for (var cc = 0; cc < nCols; cc++) {
        var a = E.addr(cc, r);
        var td = el('td');
        td.dataset.a = a;
        var cls = [];
        if (r === 0 && mode !== 'playground' && cfg.header !== false) cls.push('head');
        if (answerMap[a] && mode !== 'playground') cls.push('ans');
        var dv = data[r] && data[r][cc];
        if (typeof dv === 'string' && dv.trim()[0] === '=') cls.push('has-f');
        td.className = cls.join(' ');
        tds[a] = td;
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);
    root.appendChild(wrap);
    // tab sheet + thanh trạng thái như Excel
    var foot = el('div', 'xl-foot',
      '<span class="xl-nav" aria-hidden="true">◀ ▶</span><span class="xl-tab">' + esc(cfg.sheetName || 'Sheet1') + '</span>' +
      '<span class="xl-add" aria-hidden="true">+</span><span class="xl-status">Ready</span>');
    var statusEl = foot.lastChild;
    root.appendChild(foot);

    // độ rộng cột theo nội dung
    var widths = [];
    for (var ci = 0; ci < nCols; ci++) {
      var mx = 3;
      for (var ri = 0; ri < data.length; ri++) {
        var v = data[ri] && data[ri][ci];
        if (v == null) continue;
        var s = typeof v === 'string' && v[0] === '=' ? 8 : String(typeof v === 'number' ? v.toLocaleString('en-US') : v).length;
        mx = Math.max(mx, s);
      }
      answers.forEach(function (aa) { if (E.parseAddr(aa.cell).col === ci) mx = Math.max(mx, 13); });
      if (mode === 'playground') mx = Math.max(mx, 10);
      widths.push(Math.min(230, Math.max(58, Math.round(mx * 7.6 + 18))));
    }
    var colgroup = el('colgroup');
    colgroup.appendChild(el('col', 'c-rowh'));
    widths.forEach(function (w) { var col = el('col'); col.style.width = w + 'px'; colgroup.appendChild(col); });
    table.insertBefore(colgroup, thead);

    var actions = el('div', 'sheet-actions');
    var feedback = el('div', 'feedback'); feedback.hidden = true;
    var hintBox = el('div', 'hintbox'); hintBox.hidden = true;
    root.appendChild(actions);
    root.appendChild(hintBox);
    root.appendChild(feedback);
    container.appendChild(root);

    function btn(label, cls, fn, title) {
      var b = el('button', 'btn ' + (cls || ''), label);
      b.type = 'button';
      if (title) b.title = title;
      b.addEventListener('click', fn);
      actions.appendChild(b);
      return b;
    }

    var fillBtn = null;
    if (mode !== 'example') {
      fillBtn = btn('Sao chép công thức', 'ghost', function () { fillFromSelected(); }, 'Chép công thức của ô đang chọn sang các ô cùng nhóm, tham chiếu tự dịch như khi kéo trong Excel (Ctrl+D)');
    }
    if (mode === 'practice') {
      btn('Kiểm tra', 'primary', function () { check(); });
      if (cfg.hint) btn('Gợi ý', 'ghost', function () {
        hintBox.innerHTML = '<b>Gợi ý:</b> ' + cfg.hint;
        hintBox.hidden = !hintBox.hidden;
      });
      btn('Xem đáp án', 'ghost', function () { showSolution(); });
      btn('Làm lại', 'ghost subtle', function () { resetAll(); });
    }
    if (mode === 'playground') {
      btn('Xoá hết', 'ghost subtle', function () { resetAll(true); });
    }
    if (!actions.children.length) actions.hidden = true;

    /* ----- hiển thị ----- */
    function fmtFor(a) {
      if (fmt[a]) return fmt[a];
      var col = a.replace(/\d+/g, '');
      return fmt[col];
    }
    function cellRaw(a) {
      if (raw[a] != null) return raw[a];
      var p = E.parseAddr(a);
      var v = data[p.row] && data[p.row][p.col];
      return v == null ? '' : String(v);
    }
    function paint() {
      Object.keys(tds).forEach(function (a) {
        var td = tds[a];
        if (editing && editing.a === a && editing.inCell) return;
        var c = E.getCell(hf, a);
        var txt = E.formatValue(c, fmtFor(a));
        td.textContent = txt;
        td.classList.remove('num', 'txt', 'err', 'bool');
        if (c.error) { td.classList.add('err'); td.title = E.explainError(c, cellRaw(a)); }
        else {
          td.removeAttribute('title');
          if (typeof c.value === 'number') td.classList.add('num');
          else if (typeof c.value === 'boolean') td.classList.add('bool');
          else td.classList.add('txt');
        }
        td.classList.toggle('edit', isEditable(a));
        td.classList.toggle('filled', raw[a] != null && raw[a] !== '' && !!answerMap[a]);
      });
    }

    /* ----- chọn ô ----- */
    var sel = null;
    function select(a, keepFocus) {
      if (!tds[a]) return;
      if (sel && tds[sel]) tds[sel].classList.remove('sel');
      sel = a;
      tds[a].classList.add('sel');
      markHeads(a);
      nameBox.textContent = a;
      if (!editing) finput.value = cellRaw(a);
      finput.readOnly = !isEditable(a);
      updateFillBtn();
      if (!keepFocus) root.focus({ preventScroll: true });
      var td = tds[a];
      var wr = wrap.getBoundingClientRect(), tr2 = td.getBoundingClientRect();
      if (tr2.right > wr.right) wrap.scrollLeft += tr2.right - wr.right + 8;
      if (tr2.left < wr.left + 40) wrap.scrollLeft -= wr.left + 40 - tr2.left;
    }
    function markHeads(a) {
      var p = E.parseAddr(a);
      colHeads.forEach(function (h, i) { h.classList.toggle('hl', i === p.col); });
      rowHeads.forEach(function (h, i) { h.classList.toggle('hl', i === p.row); });
    }
    function move(dr, dc) {
      if (!sel) return select('A1');
      var p = E.parseAddr(sel);
      var row = Math.min(nRows - 1, Math.max(0, p.row + dr));
      var col = Math.min(nCols - 1, Math.max(0, p.col + dc));
      select(E.addr(col, row));
    }
    function updateFillBtn() {
      if (!fillBtn) return;
      var ok = false;
      if (sel && isEditable(sel) && raw[sel] && raw[sel].trim()[0] === '=') {
        if (mode === 'playground') ok = true;
        else { var an = answerMap[sel]; ok = !!(an && groups[an.group].length > 1); }
      }
      fillBtn.disabled = !ok;
    }

    /* ----- sửa ô ----- */
    var editing = null; // {a, input, inCell, before}
    function startEdit(a, initial, viaBar) {
      if (!isEditable(a)) return;
      if (editing) commit();
      select(a, true);
      var td = tds[a];
      var before = cellRaw(a);
      var val = initial != null ? initial : before;
      if (viaBar) {
        editing = { a: a, input: finput, inCell: false, before: before };
        finput.value = val;
        finput.focus();
      } else {
        var inp = el('input', 'cell-editor');
        inp.type = 'text';
        inp.spellcheck = false;
        inp.autocomplete = 'off';
        inp.value = val;
        td.textContent = '';
        td.appendChild(inp);
        td.classList.add('editing');
        editing = { a: a, input: inp, inCell: true, before: before };
        bindEditor(inp);
        inp.focus();
        inp.setSelectionRange(val.length, val.length);
      }
      finput.value = val;
      root.classList.add('is-editing');
      statusEl.textContent = initial != null ? 'Enter' : 'Edit';
      onEditInput();
    }
    function endEditor() {
      if (!editing) return;
      var td = tds[editing.a];
      if (editing.inCell && editing.input.parentNode) editing.input.parentNode.removeChild(editing.input);
      td.classList.remove('editing');
      editing = null;
      root.classList.remove('is-editing');
      statusEl.textContent = 'Ready';
      hideAssist();
      clearRefs();
    }
    function commit(moveDr, moveDc) {
      if (!editing) return;
      var a = editing.a, v = editing.input.value;
      endEditor();
      setRaw(a, v);
      if (moveDr || moveDc) move(moveDr || 0, moveDc || 0);
      else select(a);
    }
    function cancel() {
      if (!editing) return;
      var a = editing.a;
      endEditor();
      paint();
      select(a);
    }
    function setRaw(a, v) {
      if (v === '' || v == null) delete raw[a]; else raw[a] = v;
      E.setCell(hf, a, v == null ? '' : v);
      tds[a].classList.remove('ok', 'bad');
      paint();
      if (opts.onChange) opts.onChange(self.getAnswers());
    }
    function fillFromSelected() {
      if (!sel || !raw[sel]) return;
      var src = E.parseAddr(sel), f = raw[sel], targets;
      if (mode === 'playground') {
        targets = [];
        for (var rr = src.row + 1; rr < nRows; rr++) {
          var below = E.addr(src.col, rr);
          if (raw[below] != null && raw[below] !== '') break;
          var left = E.addr(src.col - 1, rr);
          if (src.col === 0 || !raw[left]) break;
          targets.push(below);
        }
        if (!targets.length) targets = [E.addr(src.col, Math.min(nRows - 1, src.row + 1))];
      } else {
        targets = groups[answerMap[sel].group].filter(function (x) { return x !== sel; });
      }
      targets.forEach(function (t) {
        var p = E.parseAddr(t);
        var nf = E.shiftFormula(f, p.row - src.row, p.col - src.col);
        if (nf === '') delete raw[t]; else raw[t] = nf;
        E.setCell(hf, t, nf);
        tds[t].classList.remove('ok', 'bad');
        tds[t].classList.add('flash');
        setTimeout((function (td) { return function () { td.classList.remove('flash'); }; })(tds[t]), 600);
      });
      paint();
      if (opts.onChange) opts.onChange(self.getAnswers());
    }

    /* ----- hỗ trợ khi gõ công thức ----- */
    var acItems = [], acIndex = 0;
    function hideAssist() { ac.hidden = true; sig.hidden = true; acItems = []; }
    function onEditInput() {
      if (!editing) return;
      var inp = editing.input, val = inp.value;
      if (editing.inCell) finput.value = val;
      else if (tds[editing.a]) tds[editing.a].textContent = val;
      if (val.trim()[0] !== '=') { hideAssist(); clearRefs(); return; }
      var caret = inp.selectionStart == null ? val.length : inp.selectionStart;
      var before = val.slice(0, caret);
      highlightRefs(val);
      placeAssist();
      // gợi ý tên hàm
      var segs = E.segments(before);
      var lastIsStr = segs.length && segs[segs.length - 1].str;
      var m = !lastIsStr && /(?:^=|[=(,;+\-*/^&<>:\s])([A-Za-z][A-Za-z0-9.]*)$/.exec(before);
      if (m && !/^[A-Za-z]{1,3}\d+$/.test(m[1])) {
        acItems = suggestNames(m[1]);
        if (acItems.length === 1 && acItems[0] === m[1].toUpperCase()) acItems = [];
      } else acItems = [];
      acIndex = 0;
      renderAc(m ? m[1] : '');
      // gợi ý cú pháp
      var stack = [], inStr = false, tok = '';
      for (var i = 0; i < before.length; i++) {
        var ch = before[i];
        if (inStr) { if (ch === '"') inStr = false; continue; }
        if (ch === '"') { inStr = true; tok = ''; continue; }
        if (/[A-Za-z0-9.]/.test(ch)) { tok += ch; continue; }
        if (ch === '(') { stack.push({ name: tok.toUpperCase(), arg: 0 }); tok = ''; continue; }
        if (ch === ')') { stack.pop(); tok = ''; continue; }
        if ((ch === ',' || ch === ';') && stack.length) stack[stack.length - 1].arg++;
        tok = '';
      }
      var top = stack[stack.length - 1];
      var info = top && funcInfo(top.name);
      if (info && !acItems.length) {
        var syn = info.syntax, open = syn.indexOf('(');
        var argsTxt = syn.slice(open + 1, syn.lastIndexOf(')'));
        var parts = argsTxt.split(',');
        var idx = Math.min(top.arg, parts.length - 1);
        if (/\.\.\./.test(parts[parts.length - 1]) && top.arg >= parts.length - 1) idx = parts.length - 1;
        var html = '<b class="sig-fn">' + esc(info.name) + '</b>(' + parts.map(function (p, k) {
          return k === idx ? '<b class="sig-cur">' + esc(p.trim()) + '</b>' : esc(p.trim());
        }).join(', ') + ')';
        var argDoc = info.args && info.args[idx] ? '<span class="sig-doc">' + esc(info.args[idx][1]) + '</span>' : '';
        sig.innerHTML = html + argDoc;
        sig.hidden = false;
      } else sig.hidden = true;
    }
    // đặt khung gợi ý ngay dưới ô đang sửa, như Excel
    function placeAssist() {
      var top = '', left = '';
      if (editing && editing.inCell) {
        var rr = root.getBoundingClientRect(), tr = tds[editing.a].getBoundingClientRect();
        top = (tr.bottom - rr.top + 4) + 'px';
        left = Math.max(8, Math.min(tr.left - rr.left, rr.width - 300)) + 'px';
      }
      sig.style.top = ac.style.top = top;
      sig.style.left = ac.style.left = left;
    }
    function renderAc(prefix) {
      if (!acItems.length) { ac.hidden = true; return; }
      ac.innerHTML = '';
      acItems.forEach(function (n, i) {
        var info = funcInfo(n);
        var li = el('li', i === acIndex ? 'on' : '', '<b>' + esc(n) + '</b>' + (info ? '<span>' + esc(info.short) + '</span>' : ''));
        li.addEventListener('mousedown', function (e) { e.preventDefault(); acceptAc(i); });
        ac.appendChild(li);
      });
      ac.hidden = false;
    }
    function acceptAc(i) {
      if (!editing || !acItems[i]) return;
      var inp = editing.input, val = inp.value;
      var caret = inp.selectionStart == null ? val.length : inp.selectionStart;
      var before = val.slice(0, caret), after = val.slice(caret);
      var m = /([A-Za-z][A-Za-z0-9.]*)$/.exec(before);
      var start = m ? caret - m[1].length : caret;
      var ins = acItems[i] + '(';
      inp.value = val.slice(0, start) + ins + after;
      var pos = start + ins.length;
      inp.setSelectionRange(pos, pos);
      inp.focus();
      onEditInput();
    }

    /* ----- tô sáng vùng tham chiếu trong công thức ----- */
    var refCells = [];
    var REF_COLORS = ['#2f6fdb', '#d13438', '#8a3ffc', '#1b8a4a', '#c25100', '#00838f'];
    function clearRefs() {
      refCells.forEach(function (a) { if (tds[a]) { tds[a].classList.remove('ref'); tds[a].style.removeProperty('--ref'); } });
      refCells = [];
    }
    function highlightRefs(f) {
      clearRefs();
      var re = /\$?([A-Za-z]{1,3})\$?(\d+)(?::\$?([A-Za-z]{1,3})\$?(\d+))?/g, m, ci = 0, seen = {};
      E.segments(f).forEach(function (sg) {
        if (sg.str) return;
        while ((m = re.exec(sg.text))) {
          var a1 = m[1].toUpperCase() + m[2];
          var a2 = m[3] ? m[3].toUpperCase() + m[4] : a1;
          if (!E.parseAddr(a1) || !E.parseAddr(a2)) continue;
          var p1 = E.parseAddr(a1), p2 = E.parseAddr(a2);
          if (Math.abs(p2.row - p1.row) * Math.abs(p2.col - p1.col) > 400) continue;
          var key = a1 + ':' + a2;
          if (seen[key] == null) seen[key] = ci++;
          var color = REF_COLORS[seen[key] % REF_COLORS.length];
          E.expandRange(key).forEach(function (x) {
            if (tds[x]) { tds[x].classList.add('ref'); tds[x].style.setProperty('--ref', color); refCells.push(x); }
          });
        }
      });
    }

    /* ----- bấm chuột chọn ô khi đang gõ công thức ----- */
    var pick = null; // {start, len, anchor}
    function canPick() {
      if (!editing) return false;
      var inp = editing.input, val = inp.value;
      if (val.trim()[0] !== '=') return false;
      var caret = inp.selectionStart == null ? val.length : inp.selectionStart;
      var prev = val.slice(0, caret).replace(/\s+$/, '').slice(-1);
      return /[=(,;+\-*/^&<>:]/.test(prev);
    }
    function pickText(a, b) {
      if (!b || a === b) return a;
      var p = E.parseAddr(a), q = E.parseAddr(b);
      return E.addr(Math.min(p.col, q.col), Math.min(p.row, q.row)) + ':' + E.addr(Math.max(p.col, q.col), Math.max(p.row, q.row));
    }
    function applyPick(text) {
      var inp = editing.input, val = inp.value;
      inp.value = val.slice(0, pick.start) + text + val.slice(pick.start + pick.len);
      pick.len = text.length;
      var pos = pick.start + text.length;
      inp.setSelectionRange(pos, pos);
      onEditInput();
    }

    table.addEventListener('mousedown', function (e) {
      var td = e.target.closest('td');
      if (!td || e.target.classList.contains('cell-editor')) return;
      var a = td.dataset.a;
      if (editing && editing.a !== a && canPick()) {
        e.preventDefault();
        var inp = editing.input;
        var caret = inp.selectionStart == null ? inp.value.length : inp.selectionStart;
        pick = { start: caret, len: 0, anchor: a };
        applyPick(a);
        return;
      }
      if (editing && editing.a !== a) commit();
    });
    table.addEventListener('mouseover', function (e) {
      if (!pick || !editing) return;
      var td = e.target.closest('td');
      if (td) applyPick(pickText(pick.anchor, td.dataset.a));
    });
    document.addEventListener('mouseup', onUp);
    function onUp() { if (pick) { pick = null; if (editing) editing.input.focus(); } }

    var lastPointer = 'mouse';
    table.addEventListener('pointerdown', function (e) { lastPointer = e.pointerType; });
    table.addEventListener('click', function (e) {
      var td = e.target.closest('td');
      if (!td || e.target.classList.contains('cell-editor')) return;
      var a = td.dataset.a;
      if (editing && editing.a === a) return;
      if (editing) return; // vừa chọn ô làm tham chiếu
      var wasSel = sel === a;
      select(a);
      if (isEditable(a) && (wasSel || lastPointer === 'touch')) startEdit(a);
    });
    table.addEventListener('dblclick', function (e) {
      var td = e.target.closest('td');
      if (td && isEditable(td.dataset.a) && !editing) startEdit(td.dataset.a);
    });

    function editorKeys(e) {
      if (!ac.hidden && acItems.length) {
        if (e.key === 'ArrowDown') { e.preventDefault(); acIndex = (acIndex + 1) % acItems.length; renderAc(); return; }
        if (e.key === 'ArrowUp') { e.preventDefault(); acIndex = (acIndex - 1 + acItems.length) % acItems.length; renderAc(); return; }
        if (e.key === 'Tab') { e.preventDefault(); acceptAc(acIndex); return; }
      }
      if (e.key === 'Enter') { e.preventDefault(); commit(1, 0); }
      else if (e.key === 'Tab') { e.preventDefault(); commit(0, e.shiftKey ? -1 : 1); }
      else if (e.key === 'Escape') { e.preventDefault(); cancel(); }
      else if (e.key === 'F4') { e.preventDefault(); toggleAbs(); }
    }
    function bindEditor(inp) {
      inp.addEventListener('keydown', editorKeys);
      inp.addEventListener('input', onEditInput);
      inp.addEventListener('click', onEditInput);
      inp.addEventListener('keyup', function (e) { if (/Arrow|Home|End/.test(e.key)) onEditInput(); });
      inp.addEventListener('blur', function () {
        setTimeout(function () {
          if (editing && editing.input === inp && document.activeElement !== inp && !pick) commit();
        }, 120);
      });
    }
    // F4: xoay vòng A1 → $A$1 → A$1 → $A1
    function toggleAbs() {
      var inp = editing.input, val = inp.value, caret = inp.selectionStart;
      var re = /\$?[A-Za-z]{1,3}\$?\d+/g, m;
      while ((m = re.exec(val))) {
        if (caret >= m.index && caret <= m.index + m[0].length) {
          var t = m[0], core = t.replace(/\$/g, ''), col = core.match(/[A-Za-z]+/)[0], row = core.match(/\d+/)[0];
          var next;
          if (/^\$[A-Za-z]+\$\d+$/.test(t)) next = col + '$' + row;
          else if (/^[A-Za-z]+\$\d+$/.test(t)) next = '$' + col + row;
          else if (/^\$[A-Za-z]+\d+$/.test(t)) next = col + row;
          else next = '$' + col + '$' + row;
          inp.value = val.slice(0, m.index) + next + val.slice(m.index + t.length);
          var pos = m.index + next.length;
          inp.setSelectionRange(pos, pos);
          onEditInput();
          return;
        }
      }
    }

    // thanh công thức
    finput.addEventListener('focus', function () {
      if (sel && isEditable(sel) && !editing) {
        editing = { a: sel, input: finput, inCell: false, before: cellRaw(sel) };
        onEditInput();
      }
    });
    finput.addEventListener('keydown', function (e) { if (editing && editing.input === finput) editorKeys(e); });
    finput.addEventListener('input', onEditInput);
    finput.addEventListener('click', onEditInput);
    finput.addEventListener('blur', function () {
      setTimeout(function () {
        if (editing && editing.input === finput && document.activeElement !== finput && !pick) commit();
      }, 120);
    });

    // bàn phím trên lưới
    root.addEventListener('keydown', function (e) {
      if (editing) return;
      if (e.target !== root) return;
      var k = e.key;
      if (k === 'ArrowDown') { e.preventDefault(); move(1, 0); }
      else if (k === 'ArrowUp') { e.preventDefault(); move(-1, 0); }
      else if (k === 'ArrowLeft') { e.preventDefault(); move(0, -1); }
      else if (k === 'ArrowRight' || k === 'Tab') { e.preventDefault(); move(0, e.shiftKey && k === 'Tab' ? -1 : 1); }
      else if (!sel) return;
      else if ((k === 'Enter' || k === 'F2') && isEditable(sel)) { e.preventDefault(); startEdit(sel); }
      else if (k === 'Enter') { e.preventDefault(); move(1, 0); }
      else if ((k === 'Delete' || k === 'Backspace') && isEditable(sel)) { e.preventDefault(); setRaw(sel, ''); finput.value = ''; updateFillBtn(); }
      else if ((e.ctrlKey || e.metaKey) && (k === 'd' || k === 'D')) { e.preventDefault(); fillFromSelected(); }
      else if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && isEditable(sel)) { e.preventDefault(); startEdit(sel, k); }
    });

    /* ----- chấm điểm ----- */
    function hasRef(f) {
      return E.segments(String(f)).some(function (sg) {
        return !sg.str && /(^|[^A-Za-z0-9_.])\$?[A-Za-z]{1,3}\$?\d+(?![A-Za-z0-9_(])/.test(sg.text);
      });
    }
    function grade() {
      var sol = solution();
      var res = { cells: {}, ok: 0, total: answers.length };
      var pu = null, ps = null;
      answers.forEach(function (an) {
        var a = an.cell, v = raw[a], r;
        var exp = E.getCell(sol, a);
        if (v == null || String(v).trim() === '') r = { ok: false, why: 'empty' };
        else if (String(v).trim()[0] !== '=') r = { ok: false, why: 'notFormula' };
        else {
          var got = E.getCell(hf, a);
          if (!E.sameValue(got, exp)) r = { ok: false, why: 'wrong', got: got, exp: exp };
          else {
            var used = E.usedFunctions(v);
            var miss = (cfg.mustUse || []).filter(function (fn) { return used.indexOf(fn.toUpperCase()) < 0; });
            if (miss.length) r = { ok: false, why: 'mustUse', miss: miss };
            else if (hasRef(an.solution) && !hasRef(v)) r = { ok: false, why: 'hardcode' };
            else if (cfg.strict !== false) {
              if (!pu) {
                var pd = E.perturb(data);
                pu = E.build(pd); ps = E.build(pd);
                answers.forEach(function (x) {
                  if (raw[x.cell] != null) E.setCell(pu, x.cell, raw[x.cell]);
                  E.setCell(ps, x.cell, x.solution);
                });
              }
              r = E.sameValue(E.getCell(pu, a), E.getCell(ps, a)) ? { ok: true } : { ok: false, why: 'hardcode' };
            } else r = { ok: true };
          }
        }
        r.exp = exp;
        res.cells[a] = r;
        if (r.ok) res.ok++;
      });
      if (pu) { pu.destroy(); ps.destroy(); }
      res.allOk = res.ok === res.total;
      return res;
    }
    function showMarks(res) {
      Object.keys(res.cells).forEach(function (a) {
        tds[a].classList.remove('ok', 'bad');
        tds[a].classList.add(res.cells[a].ok ? 'ok' : 'bad');
      });
    }
    function reason(a, r, reveal) {
      var f = fmtFor(a);
      switch (r.why) {
        case 'empty': return '<b>' + a + '</b>: chưa có công thức.';
        case 'notFormula': return '<b>' + a + '</b>: bạn đang gõ giá trị. Hãy viết công thức bắt đầu bằng dấu =.';
        case 'mustUse': return '<b>' + a + '</b>: kết quả đúng, nhưng bài này yêu cầu dùng hàm ' + r.miss.join(', ') + '.';
        case 'hardcode': return '<b>' + a + '</b>: kết quả khớp với dữ liệu hiện tại nhưng công thức có số gõ cứng. Hãy tham chiếu tới ô chứa dữ liệu thay vì gõ số.';
        case 'wrong':
          if (r.got.error) return '<b>' + a + '</b>: công thức báo lỗi <code>' + esc(r.got.value) + '</code>. ' + esc(E.explainError(r.got, raw[a]));
          return '<b>' + a + '</b>: kết quả <code>' + esc(E.formatValue(r.got, f) || '(trống)') + '</code> chưa đúng' +
            (reveal ? ', cần ra <code>' + esc(E.formatValue(r.exp, f)) + '</code>.' : '.');
      }
      return '';
    }
    function solutionHtml() {
      var seen = {}, out = [];
      answers.forEach(function (an) {
        if (seen[an.group]) return;
        seen[an.group] = 1;
        var g = groups[an.group];
        var where = g.length > 1 ? g[0] + ' (rồi sao chép cho ' + g[1] + (g.length > 2 ? '…' + g[g.length - 1] : '') + ')' : g[0];
        out.push('<div class="sol-line"><span>' + where + '</span><code>' + esc(an.solution) + '</code></div>');
      });
      return out.join('');
    }
    function check() {
      if (editing) commit();
      var res = grade();
      showMarks(res);
      feedback.hidden = false;
      if (res.allOk) {
        feedback.className = 'feedback good';
        feedback.innerHTML = '<div class="fb-title">Chính xác!</div>' + (cfg.explain ? '<p>' + cfg.explain + '</p>' : '') +
          '<div class="sol"><div class="sol-h">Đáp án tham khảo</div>' + solutionHtml() + '</div>';
        if (opts.onPass) opts.onPass();
      } else {
        feedback.className = 'feedback bad';
        var bad = Object.keys(res.cells).filter(function (a) { return !res.cells[a].ok; });
        var lines = bad.slice(0, 4).map(function (a) { return '<li>' + reason(a, res.cells[a], true) + '</li>'; });
        if (bad.length > 4) lines.push('<li>… và ' + (bad.length - 4) + ' ô khác.</li>');
        feedback.innerHTML = '<div class="fb-title">Đúng ' + res.ok + '/' + res.total + ' ô</div><ul>' + lines.join('') + '</ul>';
      }
    }
    function showSolution() {
      feedback.hidden = false;
      feedback.className = 'feedback info';
      feedback.innerHTML = '<div class="sol"><div class="sol-h">Đáp án tham khảo</div>' + solutionHtml() +
        '<p class="muted">Hãy tự gõ lại công thức vào bảng rồi bấm Kiểm tra để hoàn thành bài.</p></div>';
    }
    function resetAll(all) {
      if (editing) endEditor();
      Object.keys(raw).forEach(function (a) {
        if (all || answerMap[a]) { delete raw[a]; E.setCell(hf, a, ''); }
      });
      if (all) data = [];
      Object.keys(tds).forEach(function (a) { tds[a].classList.remove('ok', 'bad'); });
      feedback.hidden = true;
      hintBox.hidden = true;
      paint();
      if (sel) select(sel);
      if (opts.onChange) opts.onChange(self.getAnswers());
    }

    /* ----- API ----- */
    self.locked = false;
    self.el = root;
    self.grade = grade;
    self.showMarks = showMarks;
    self.reason = reason;
    self.getAnswers = function () {
      var o = {};
      Object.keys(raw).forEach(function (a) { if (mode === 'playground' || answerMap[a]) o[a] = raw[a]; });
      return o;
    };
    var hlCells = [];
    self.highlight = function (list) {
      hlCells.forEach(function (a) { if (tds[a]) { tds[a].classList.remove('hlt', 'dim'); tds[a].style.removeProperty('--hl'); } });
      hlCells = [];
      (list || []).forEach(function (h) {
        E.expandRange(h.range).forEach(function (a) {
          if (!tds[a]) return;
          tds[a].classList.add(h.dim ? 'dim' : 'hlt');
          if (h.color) tds[a].style.setProperty('--hl', h.color);
          hlCells.push(a);
        });
      });
    };
    self.select = function (a) { select(a, true); };
    self.lock = function () { if (editing) commit(); self.locked = true; actions.hidden = true; paint(); finput.readOnly = true; };
    self.showFeedback = function (html, cls) { feedback.hidden = false; feedback.className = 'feedback ' + (cls || 'info'); feedback.innerHTML = html; };
    self.destroy = function () {
      document.removeEventListener('mouseup', onUp);
      try { hf.destroy(); } catch (e) { /* đã huỷ */ }
      if (solHF) try { solHF.destroy(); } catch (e) { /* đã huỷ */ }
    };

    paint();
    var firstSel = answers.length && mode !== 'example' ? answers[0].cell : 'A1';
    if (mode === 'example') {
      var fc = Object.keys(tds).filter(function (a) { return tds[a].classList.contains('has-f'); })[0];
      if (fc) firstSel = fc;
    }
    sel = null;
    if (tds[firstSel]) { tds[firstSel].classList.add('sel'); sel = firstSel; markHeads(firstSel); nameBox.textContent = firstSel; finput.value = cellRaw(firstSel); finput.readOnly = !isEditable(firstSel); }
    updateFillBtn();
    live.push(self);
  }

  window.ECC_SHEET = {
    create: function (container, cfg, opts) { return new Sheet(container, cfg, opts); },
    destroyAll: function () { live.forEach(function (s) { s.destroy(); }); live = []; }
  };
})();
