/* ExcelcungChinh – điều hướng và các trang */
(function () {
  'use strict';
  var E = window.ECC_ENGINE, S = window.ECC_SHEET;
  var PASS = 70;
  var main = document.getElementById('main');

  /* ================= Tiến độ ================= */
  var KEY = 'ecc_progress_v1';
  var st = {};
  try { st = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { st = {}; }
  st.lessons = st.lessons || {};
  st.tests = st.tests || {};
  st.answers = st.answers || {};
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* trình duyệt chặn lưu */ } }

  function parts() { return ECC.parts; }
  function findPart(id) { return parts().filter(function (p) { return p.id === id; })[0]; }
  function findLesson(p, id) { return (p.lessons || []).filter(function (l) { return l.id === id; })[0]; }
  function lkey(p, l) { return p.id + '/' + l.id; }
  function requirements(l) {
    var req = [];
    (l.exercises || []).forEach(function (x) { req.push('ex:' + x.id); });
    (l.blocks || []).forEach(function (b) {
      if (b.t === 'quiz') req.push('q:' + b.id);
      if (b.t === 'sim') req.push('sim:' + b.id);
    });
    if (!req.length) req.push('read');
    return req;
  }
  function lessonState(p, l) { return st.lessons[lkey(p, l)] || {}; }
  function isDone(p, l) {
    var s = lessonState(p, l);
    return requirements(l).every(function (r) { return s[r]; });
  }
  function mark(p, l, item) {
    var k = lkey(p, l);
    var was = isDone(p, l);
    st.lessons[k] = st.lessons[k] || {};
    st.lessons[k][item] = true;
    save();
    var now = isDone(p, l);
    if (!was && now) onLessonDone(p, l);
    updatePill();
    return now;
  }
  function partDone(p) { return (p.lessons || []).filter(function (l) { return isDone(p, l); }).length; }
  // Chế độ xem trước cho người soạn bài: mở link có ?xem-truoc thì mọi phần đều mở
  var PREVIEW = /[?&]xem-truoc/.test(location.search);
  function unlocked(p) {
    if (p.no === 1 || PREVIEW) return true;
    var prev = parts().filter(function (x) { return x.no === p.no - 1; })[0];
    return !prev || !!(st.tests[prev.id] && st.tests[prev.id].passed);
  }
  function totals() {
    var lessons = 0, done = 0, ex = 0;
    parts().forEach(function (p) {
      (p.lessons || []).forEach(function (l) { lessons++; ex += (l.exercises || []).length; if (isDone(p, l)) done++; });
    });
    return { lessons: lessons, done: done, ex: ex };
  }
  function nextTarget() {
    var ps = parts();
    for (var i = 0; i < ps.length; i++) {
      var p = ps[i];
      if (!unlocked(p)) break;
      for (var j = 0; j < p.lessons.length; j++) if (!isDone(p, p.lessons[j])) return '#/bai/' + p.id + '/' + p.lessons[j].id;
      if (!(st.tests[p.id] && st.tests[p.id].passed)) return '#/kiem-tra/' + p.id;
    }
    return '#/lo-trinh';
  }

  /* ================= Tiện ích DOM ================= */
  function h(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function link(href, cls, html) { var a = h('a', cls, html); a.href = href; return a; }
  function strip(s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  /* ================= Điều hướng ================= */
  var route = location.hash || '#/';
  function go(hash) {
    route = hash;
    try { history.pushState(null, '', hash); } catch (e) { /* khung nhúng chặn đổi URL */ }
    render();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#/"]');
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    document.getElementById('nav').classList.remove('open');
    go(a.getAttribute('href'));
  });
  window.addEventListener('popstate', function () { route = location.hash || '#/'; render(); });
  window.addEventListener('hashchange', function () {
    if ((location.hash || '#/') !== route) { route = location.hash || '#/'; render(); }
  });
  document.getElementById('menuBtn').addEventListener('click', function () {
    document.getElementById('nav').classList.toggle('open');
  });

  function render() {
    S.destroyAll();
    main.innerHTML = '';
    var parts2 = route.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    var page = parts2[0] || '';
    var navKey = page;
    if (page === '' ) homePage();
    else if (page === 'lo-trinh') mapPage();
    else if (page === 'bai') { lessonPage(parts2[1], parts2[2]); navKey = 'lo-trinh'; }
    else if (page === 'kiem-tra') { testPage(parts2[1]); navKey = 'lo-trinh'; }
    else if (page === 'tra-cuu') refPage(parts2[1]);
    else if (page === 'bang-nhap') playPage();
    else homePage();
    document.querySelectorAll('#nav a').forEach(function (a) { a.classList.toggle('on', a.dataset.k === navKey); });
    updatePill();
    window.scrollTo(0, 0);
  }
  function updatePill() {
    var t = totals();
    var pill = document.getElementById('pill');
    pill.innerHTML = (PREVIEW ? '<span style="color:var(--warn)">Xem trước · </span>' : '') + '<b>' + t.done + '</b>/' + t.lessons + ' bài đã học';
  }

  /* ================= Thẻ phần học ================= */
  function partCard(p) {
    var open = unlocked(p);
    var done = partDone(p), total = p.lessons.length;
    var tr = st.tests[p.id];
    var href = open ? firstOpenLesson(p) : '#/bai/' + p.id + '/' + p.lessons[0].id;
    var a = link(href, 'part-card' + (open ? '' : ' locked'));
    var chip;
    if (!open) chip = '<span class="chip lock">Khoá</span>';
    else if (tr && tr.passed) chip = '<span class="chip ok">Đã qua kiểm tra · ' + tr.best + '%</span>';
    else if (tr) chip = '<span class="chip warn">Kiểm tra: ' + tr.best + '%</span>';
    else chip = '<span class="chip">Chưa kiểm tra</span>';
    a.innerHTML = '<div class="part-no">' + p.no + '</div><div><h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p>' +
      '<div class="part-meta"><span>' + done + '/' + total + ' bài</span><div class="bar"><i style="width:' + Math.round(done / total * 100) + '%"></i></div>' + chip + '</div></div>';
    return a;
  }
  function firstOpenLesson(p) {
    for (var j = 0; j < p.lessons.length; j++) if (!isDone(p, p.lessons[j])) return '#/bai/' + p.id + '/' + p.lessons[j].id;
    if (!(st.tests[p.id] && st.tests[p.id].passed)) return '#/kiem-tra/' + p.id;
    return '#/bai/' + p.id + '/' + p.lessons[0].id;
  }

  /* ================= Trang chủ ================= */
  function homePage() {
    var t = totals();
    var started = t.done > 0 || Object.keys(st.tests).length > 0;
    var w = h('div', 'wrap');
    var hero = h('section', 'hero');
    var left = h('div');
    left.innerHTML = '<div class="eyebrow">Excel cho dân văn phòng</div>' +
      '<h1>Học Excel bằng cách <em>làm thật</em>, ngay trên trình duyệt</h1>' +
      '<p class="lead">' + parts().length + ' phần học từ cơ bản tới thành thạo: hàm tính toán, logic, điều kiện, văn bản, ngày giờ, tra cứu và các công cụ có sẵn. Mỗi bài có bảng tính để thực hành, web chấm điểm ngay.</p>';
    var cta = h('div', 'cta');
    cta.appendChild(link(nextTarget(), 'btn primary lg', started ? 'Học tiếp' : 'Bắt đầu học'));
    cta.appendChild(link('#/tra-cuu', 'btn lg', 'Tra cứu hàm'));
    left.appendChild(cta);
    var facts = h('div', 'facts');
    facts.innerHTML = '<div><b>' + t.lessons + '</b>bài học</div><div><b>' + t.ex + '</b>bài tập chấm tự động</div><div><b>' + ECC.funcs.length + '</b>hàm có giải thích tiếng Việt</div>';
    left.appendChild(facts);
    hero.appendChild(left);

    var demo = h('div', 'hero-demo');
    demo.appendChild(h('div', 'demo-task', '<b>Thử ngay:</b> bấm vào ô <code>B6</code>, gõ <code>=SUM(</code> rồi kéo chuột chọn B2 đến B5, nhấn <kbd>Enter</kbd> và bấm <b>Kiểm tra</b>.'));
    hero.appendChild(demo);
    w.appendChild(hero);
    S.create(demo, {
      data: [['Tháng', 'Doanh thu'], ['Tháng 1', 125000000], ['Tháng 2', 98500000], ['Tháng 3', 143200000], ['Tháng 4', 117800000], ['Tổng']],
      answers: [{ cell: 'B6', solution: '=SUM(B2:B5)' }],
      mustUse: ['SUM'],
      fmt: { B: 'int' },
      hint: 'Gõ <code>=SUM(B2:B5)</code>. Khi đang gõ công thức, bấm chuột vào ô để Excel tự điền địa chỉ.',
      explain: 'Bạn vừa dùng hàm SUM. Toàn bộ khoá học đều thực hành theo cách này.'
    }, { mode: 'practice', idBase: 'demo' });

    var sec = h('section', 'section');
    var sh = h('div', 'section-h');
    sh.innerHTML = '<h2>Lộ trình ' + parts().length + ' phần</h2>';
    sh.appendChild(link('#/lo-trinh', '', 'Xem chi tiết lộ trình'));
    sec.appendChild(sh);
    var grid = h('div', 'parts');
    parts().forEach(function (p) { grid.appendChild(partCard(p)); });
    sec.appendChild(grid);
    w.appendChild(sec);

    var how = h('section', 'section');
    how.innerHTML = '<div class="section-h"><h2>Cách học</h2></div><div class="how">' +
      '<div><h3>Đọc lý thuyết ngắn</h3><p>Mỗi bài giải thích một nhóm hàm bằng tiếng Việt, có cú pháp, ví dụ mẫu và các lỗi hay gặp.</p></div>' +
      '<div><h3>Thực hành trên bảng tính</h3><p>Gõ công thức như trong Excel. Web chấm theo kết quả, gợi ý khi sai và cho xem đáp án tham khảo.</p></div>' +
      '<div><h3>Qua bài kiểm tra để mở khoá</h3><p>Cuối mỗi phần có bài kiểm tra trắc nghiệm và thực hành. Đạt từ ' + PASS + '% mới mở phần tiếp theo.</p></div>' +
      '</div>';
    w.appendChild(how);
    main.appendChild(w);
  }

  /* ================= Lộ trình ================= */
  function mapPage() {
    var w = h('div', 'wrap page');
    var t = totals();
    var passed = parts().filter(function (p) { return st.tests[p.id] && st.tests[p.id].passed; }).length;
    var head = h('div', 'lesson-h');
    head.innerHTML = '<h1>Lộ trình học</h1><div class="meta"><span>' + t.done + '/' + t.lessons + ' bài đã học</span><span>·</span><span>' + passed + '/' + parts().length + ' phần đã qua kiểm tra</span></div>';
    w.appendChild(head);
    if (passed === parts().length && parts().length) {
      w.appendChild(h('div', 'done-banner', '<span>Chúc mừng! Bạn đã hoàn thành toàn bộ khoá học Excel văn phòng.</span>'));
      w.lastChild.style.marginBottom = '20px';
    }
    var grid = h('div', 'parts');
    parts().forEach(function (p) {
      var card = partCard(p);
      grid.appendChild(card);
    });
    w.appendChild(grid);

    var detail = h('div', 'section');
    parts().forEach(function (p) {
      var open = unlocked(p);
      var box = h('div', 'section-title');
      box.innerHTML = '<h2>Phần ' + p.no + '. ' + esc(p.title) + '</h2>' + (open ? '' : '<span class="chip lock">Qua bài kiểm tra Phần ' + (p.no - 1) + ' để mở</span>');
      detail.appendChild(box);
      var tb = h('div', 'tbl-wrap');
      var rows = p.lessons.map(function (l, i) {
        var done = isDone(p, l);
        var name = open ? '<a href="#/bai/' + p.id + '/' + l.id + '">' + esc(l.title) + '</a>' : esc(l.title);
        return '<tr><td style="width:44px" class="muted">' + (i + 1) + '</td><td>' + name + '</td><td style="width:1%;white-space:nowrap">' +
          (done ? '<span class="chip ok">Đã học</span>' : '<span class="muted">' + (l.minutes || 5) + ' phút</span>') + '</td></tr>';
      }).join('');
      var tr = st.tests[p.id];
      rows += '<tr><td class="muted">✓</td><td>' + (open ? '<a href="#/kiem-tra/' + p.id + '"><b>Bài kiểm tra Phần ' + p.no + '</b></a>' : '<b>Bài kiểm tra Phần ' + p.no + '</b>') +
        '</td><td style="white-space:nowrap">' + (tr ? '<span class="chip ' + (tr.passed ? 'ok' : 'warn') + '">' + tr.best + '%</span>' : '<span class="muted">Đạt ' + PASS + '%</span>') + '</td></tr>';
      tb.innerHTML = '<table class="tbl"><tbody>' + rows + '</tbody></table>';
      tb.style.marginTop = '12px';
      detail.appendChild(tb);
    });
    w.appendChild(detail);

    var reset = h('div', 'confirm-row');
    reset.style.marginTop = '32px';
    var rb = h('button', 'btn subtle', 'Xoá toàn bộ tiến độ');
    rb.type = 'button';
    rb.addEventListener('click', function () {
      reset.innerHTML = '<span>Xoá hết tiến độ, điểm kiểm tra và bài làm đã lưu trên trình duyệt này?</span>';
      var y = h('button', 'btn', 'Xoá'); y.type = 'button';
      var n = h('button', 'btn subtle', 'Huỷ'); n.type = 'button';
      y.addEventListener('click', function () { st = { lessons: {}, tests: {}, answers: {} }; save(); render(); });
      n.addEventListener('click', function () { render(); });
      reset.appendChild(y); reset.appendChild(n);
    });
    reset.appendChild(rb);
    w.appendChild(reset);
    main.appendChild(w);
  }

  function lockedPage(p) {
    var w = h('div', 'wrap page');
    var box = h('div', 'locked-page');
    box.innerHTML = '<div class="part-no" style="background:var(--head-bg);color:var(--lock)">' + p.no + '</div>' +
      '<h1 style="font-size:24px">Phần ' + p.no + ' đang khoá</h1>' +
      '<p class="muted">Hoàn thành bài kiểm tra Phần ' + (p.no - 1) + ' với số điểm từ ' + PASS + '% để mở khoá phần này.</p>';
    box.appendChild(link('#/kiem-tra/' + parts().filter(function (x) { return x.no === p.no - 1; })[0].id, 'btn primary', 'Làm bài kiểm tra Phần ' + (p.no - 1)));
    w.appendChild(box);
    main.appendChild(w);
  }

  /* ================= Khối nội dung ================= */
  function fmtKeys(s) {
    return String(s).split(' / ').map(function (alt) {
      return alt.split(' + ').map(function (k) { return '<kbd>' + esc(k.trim()) + '</kbd>'; }).join(' + ');
    }).join(' <span class="muted">/</span> ');
  }
  function syntaxBox(code, args) {
    var box = h('div', 'syntax');
    var c = esc(code).replace(/^(=?)([A-Z][A-Z0-9.]*)\(/, '$1<span class="fn">$2</span>(');
    box.appendChild(h('div', 'syntax-code', c));
    if (args && args.length) {
      var t = h('table', 'args');
      t.innerHTML = '<tbody>' + args.map(function (a) {
        var name = a[2] ? '<b>' + esc(a[2]) + '</b>' + esc(a[0]) : esc(a[0]);
        return '<tr><td>' + name + '</td><td>' + a[1] + '</td></tr>';
      }).join('') + '</tbody>';
      box.appendChild(t);
    } else box.firstChild.style.borderBottom = '0';
    return box;
  }
  var PART_COLORS = ['#2f6fdb', '#1b8a4a', '#c25100', '#8a3ffc', '#d13438', '#00838f'];
  function withFormula(data, cell, formula) {
    var d = data.map(function (r) { return r.slice(); });
    if (!cell) return d;
    var p = E.parseAddr(cell);
    while (d.length <= p.row) d.push([]);
    while (d[p.row].length < p.col) d[p.row].push('');
    d[p.row][p.col] = formula;
    return d;
  }
  function refsIn(text) {
    var out = [], re = /\$?([A-Za-z]{1,3})\$?(\d+)(?::\$?([A-Za-z]{1,3})\$?(\d+))?/g, m;
    E.segments(text).forEach(function (sg) {
      if (sg.str) return;
      while ((m = re.exec(sg.text))) out.push(m[1].toUpperCase() + m[2] + (m[3] ? ':' + m[3].toUpperCase() + m[4] : ''));
    });
    return out;
  }
  function anatomyBlock(b) {
    var box = h('div', 'anatomy');
    if (b.title) box.appendChild(h('div', 'block-h', esc(b.title)));
    var m = /^=\s*([A-Za-z][A-Za-z0-9.]*)\((.*)\)\s*$/.exec(b.formula);
    var fn = m ? m[1] : '', args = m ? E.splitArgs(m[2]) : [b.formula];
    var parts = b.parts || [];
    var fbox = h('div', 'ana-formula');
    fbox.innerHTML = '=' + '<span class="fn">' + esc(fn) + '</span>(' + args.map(function (a, i) {
      return '<span class="ana-part" data-i="' + i + '" style="--c:' + PART_COLORS[i % PART_COLORS.length] + '">' + esc(a) + '</span>';
    }).join(',') + ')';
    box.appendChild(fbox);
    var holder = h('div');
    var legend = h('div', 'ana-legend');
    parts.forEach(function (p, i) {
      var it = h('button', 'ana-item', '<i></i><div><b>' + esc(p.label) + ': <code>' + esc(args[i] || '') + '</code></b><span>' + p.desc + '</span></div>');
      it.type = 'button';
      it.dataset.i = i;
      it.style.setProperty('--c', PART_COLORS[i % PART_COLORS.length]);
      legend.appendChild(it);
    });
    box.appendChild(legend);
    box.appendChild(holder);
    if (b.note) box.appendChild(h('div', 'example-note', b.note));
    var sheet = S.create(holder, { data: withFormula(b.data, b.cell, b.formula), fmt: b.fmt }, { mode: 'example' });
    var focus = -1;
    function ranges(i) {
      var p = parts[i] || {};
      var rs = p.range ? [].concat(p.range) : refsIn(args[i] || '');
      return rs.map(function (r) { return { range: r, color: PART_COLORS[i % PART_COLORS.length] }; });
    }
    function show() {
      var list = [];
      args.forEach(function (_, i) { if (focus < 0 || focus === i) list = list.concat(ranges(i)); });
      sheet.highlight(list);
      box.querySelectorAll('[data-i]').forEach(function (n) { n.classList.toggle('on', focus === +n.dataset.i); });
    }
    box.addEventListener('click', function (e) {
      var t = e.target.closest('[data-i]');
      if (!t) return;
      var i = +t.dataset.i;
      focus = focus === i ? -1 : i;
      show();
    });
    show();
    if (b.cell) sheet.select(b.cell);
    return box;
  }
  function walkBlock(b) {
    var box = h('div', 'walk');
    if (b.title) box.appendChild(h('div', 'block-h', esc(b.title)));
    var panel = h('div', 'walk-box');
    var text = h('div', 'walk-text');
    var ctrl = h('div', 'walk-ctrl');
    var count = h('span', 'muted');
    var prev = h('button', 'btn', '◀ Trước'); prev.type = 'button';
    var next = h('button', 'btn primary', 'Tiếp ▶'); next.type = 'button';
    var play = h('button', 'btn ghost', 'Tự chạy'); play.type = 'button';
    ctrl.appendChild(count); ctrl.appendChild(prev); ctrl.appendChild(next); ctrl.appendChild(play);
    panel.appendChild(text); panel.appendChild(ctrl);
    box.appendChild(panel);
    var holder = h('div');
    box.appendChild(holder);
    var sheet = S.create(holder, { data: withFormula(b.data, b.cell, b.formula), fmt: b.fmt }, { mode: 'example' });
    var i = 0, timer = null;
    function draw() {
      var st = b.steps[i];
      text.innerHTML = st.html;
      count.textContent = 'Bước ' + (i + 1) + '/' + b.steps.length;
      prev.disabled = i === 0;
      next.disabled = i === b.steps.length - 1;
      sheet.highlight((st.hl || []).map(function (x) { return { range: x[0], color: PART_COLORS[(x[1] || 0) % PART_COLORS.length] }; }));
      if (st.select) sheet.select(st.select);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; play.textContent = 'Tự chạy'; } }
    prev.addEventListener('click', function () { stop(); if (i > 0) { i--; draw(); } });
    next.addEventListener('click', function () { stop(); if (i < b.steps.length - 1) { i++; draw(); } });
    play.addEventListener('click', function () {
      if (timer) return stop();
      if (i >= b.steps.length - 1) i = -1;
      play.textContent = 'Dừng';
      timer = setInterval(function () {
        if (!box.isConnected || i >= b.steps.length - 1) return stop();
        i++; draw();
      }, 1800);
      i++; draw();
    });
    draw();
    return box;
  }
  function renderBlock(b, ctx) {
    switch (b.t) {
      case 'p': return h('p', null, b.html);
      case 'h': return h('h2', null, esc(b.text));
      case 'list': {
        var l = h(b.ordered ? 'ol' : 'ul');
        l.innerHTML = b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('');
        return l;
      }
      case 'syntax': return syntaxBox(b.code, b.args);
      case 'tip': return h('div', 'callout tip', '<span class="lbl">Mẹo</span><div>' + b.html + '</div>');
      case 'warn': return h('div', 'callout warn', '<span class="lbl">Lưu ý</span><div>' + b.html + '</div>');
      case 'table': {
        var tw = h('div', 'tbl-wrap');
        tw.innerHTML = '<table class="tbl"><thead><tr>' + b.head.map(function (x) { return '<th>' + x + '</th>'; }).join('') + '</tr></thead><tbody>' +
          b.rows.map(function (r) { return '<tr>' + r.map(function (x) { return '<td>' + x + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
        return tw;
      }
      case 'keys': {
        var kw = h('div', 'tbl-wrap');
        kw.innerHTML = '<table class="tbl keys"><tbody>' + b.items.map(function (r) { return '<tr><td>' + fmtKeys(r[0]) + '</td><td>' + r[1] + '</td></tr>'; }).join('') + '</tbody></table>';
        return kw;
      }
      case 'steps': {
        var s = h('div', 'steps');
        s.innerHTML = (b.title ? '<div class="steps-h">' + b.title + '</div>' : '') + '<ol>' + b.items.map(function (i) { return '<li><div>' + i + '</div></li>'; }).join('') + '</ol>';
        return s;
      }
      case 'example': {
        var ex = h('div', 'example');
        if (b.title) ex.appendChild(h('div', 'example-h', b.title));
        var holder = h('div');
        ex.appendChild(holder);
        S.create(holder, { data: b.data, fmt: b.fmt }, { mode: 'example' });
        if (b.note) ex.appendChild(h('div', 'example-note', b.note));
        return ex;
      }
      case 'quiz': return quizBlock(b, ctx);
      case 'scenario':
        return h('div', 'scenario', '<div class="sc-ic">?</div><div><div class="sc-h">' + esc(b.title || 'Tình huống') + '</div>' + b.html + '</div>');
      case 'excelui': return window.ECC_XL.window(b);
      case 'sim': {
        var sw = h('div', 'example');
        if (b.title) sw.appendChild(h('div', 'block-h', esc(b.title)));
        var sh = h('div');
        sw.appendChild(sh);
        var doneBefore = ctx && lessonState(ctx.p, ctx.l)['sim:' + b.id];
        window.ECC_XL.sim(sh, b, {
          completed: doneBefore,
          onDone: function () { if (ctx) { mark(ctx.p, ctx.l, 'sim:' + b.id); if (ctx.refresh) ctx.refresh(); } }
        });
        return sw;
      }
      case 'anatomy': return anatomyBlock(b);
      case 'walk': return walkBlock(b);
    }
    return h('div');
  }
  function quizBlock(b, ctx) {
    var box = h('div', 'quiz');
    box.appendChild(h('div', 'quiz-q', b.q));
    var opts = h('div', 'opts');
    var ex = h('div', 'quiz-ex'); ex.hidden = true;
    var done = ctx && lessonState(ctx.p, ctx.l)['q:' + b.id];
    var buttons = b.options.map(function (o, i) {
      var bt = h('button', 'opt', '<span class="k">' + LETTERS[i] + '</span><span>' + esc(o) + '</span>');
      bt.type = 'button';
      bt.addEventListener('click', function () {
        if (i === b.answer) {
          bt.classList.add('right');
          buttons.forEach(function (x) { x.disabled = true; });
          ex.innerHTML = '<b style="color:var(--ok)">Đúng.</b> ' + esc(b.explain || '');
          ex.hidden = false;
          if (ctx) mark(ctx.p, ctx.l, 'q:' + b.id);
          if (ctx && ctx.refresh) ctx.refresh();
        } else {
          bt.classList.add('wrong');
          bt.disabled = true;
          ex.innerHTML = '<b style="color:var(--bad)">Chưa đúng.</b> Thử lại nhé.';
          ex.hidden = false;
        }
      });
      opts.appendChild(bt);
      return bt;
    });
    if (done) {
      buttons[b.answer].classList.add('right');
      buttons.forEach(function (x) { x.disabled = true; });
      ex.innerHTML = '<b style="color:var(--ok)">Đã trả lời đúng.</b> ' + esc(b.explain || '');
      ex.hidden = false;
    }
    box.appendChild(opts);
    box.appendChild(ex);
    return box;
  }

  /* ================= Trang bài học ================= */
  var currentLesson = null;
  function onLessonDone(p, l) {
    if (currentLesson && currentLesson.p === p && currentLesson.l === l && currentLesson.onDone) currentLesson.onDone();
  }
  function lessonPage(pid, lid) {
    var p = findPart(pid);
    if (!p) return mapPage();
    var l = findLesson(p, lid) || p.lessons[0];
    if (!unlocked(p)) return lockedPage(p);
    var idx = p.lessons.indexOf(l);
    var w = h('div', 'wrap page');
    var lay = h('div', 'lesson-layout');

    // thanh bên
    var side = h('aside', 'side');
    side.appendChild(h('div', 'side-h', 'Phần ' + p.no + '<b>' + esc(p.title) + '</b>'));
    var ol = h('ol');
    var dots = [];
    p.lessons.forEach(function (x, i) {
      var li = h('li');
      var a = link('#/bai/' + p.id + '/' + x.id, x === l ? 'on' : '');
      var d = isDone(p, x);
      a.innerHTML = '<span class="dot' + (d ? ' done' : '') + '">' + (d ? '✓' : i + 1) + '</span><span>' + esc(x.title) + '</span>';
      dots.push(a.firstChild);
      li.appendChild(a);
      ol.appendChild(li);
    });
    side.appendChild(ol);
    var tl = h('div', 'test-link');
    var tr = st.tests[p.id];
    tl.appendChild(link('#/kiem-tra/' + p.id, 'btn' + (tr && tr.passed ? '' : ' primary'), tr ? 'Bài kiểm tra · ' + tr.best + '%' : 'Làm bài kiểm tra Phần ' + p.no));
    side.appendChild(tl);
    lay.appendChild(side);

    // nội dung
    var col = h('div');
    col.appendChild(h('div', 'crumb', '<a href="#/lo-trinh">Lộ trình</a><span>›</span><span>Phần ' + p.no + ': ' + esc(p.title) + '</span>'));
    var head = h('div', 'lesson-h');
    head.innerHTML = '<h1>' + esc(l.title) + '</h1>';
    var meta = h('div', 'meta');
    meta.innerHTML = '<span>Bài ' + (idx + 1) + '/' + p.lessons.length + '</span><span>·</span><span>' + (l.minutes || 5) + ' phút</span>';
    var doneChip = h('span', 'chip ok', 'Đã hoàn thành');
    doneChip.hidden = !isDone(p, l);
    meta.appendChild(doneChip);
    if (l.funcs && l.funcs.length) {
      l.funcs.forEach(function (fn) {
        if (ECC.funcs.some(function (f) { return f.name === fn; })) meta.appendChild(link('#/tra-cuu/' + encodeURIComponent(fn), 'chip', fn));
      });
    }
    head.appendChild(meta);
    col.appendChild(head);

    var content = h('div', 'content');
    var ctx = { p: p, l: l };
    (l.blocks || []).forEach(function (b) { content.appendChild(renderBlock(b, ctx)); });

    var exs = l.exercises || [];
    var exCounter = null;
    if (exs.length) {
      var stitle = h('div', 'section-title');
      stitle.innerHTML = '<h2>Bài tập thực hành</h2>';
      exCounter = h('span', 'muted');
      stitle.appendChild(exCounter);
      content.appendChild(stitle);
      content.appendChild(h('p', 'muted', 'Ô nền vàng là ô bạn cần viết công thức. Bấm đúp hoặc gõ trực tiếp để nhập, khi đang gõ công thức có thể bấm chuột vào ô khác để chèn địa chỉ. Phím <kbd>F4</kbd> thêm dấu $.'));
      exs.forEach(function (x, i) {
        var blk = h('div', 'ex-block');
        var eh = h('div', 'ex-head');
        var passed = lessonState(p, l)['ex:' + x.id];
        eh.innerHTML = '<h3>Bài tập ' + (i + 1) + '</h3>';
        var chip = h('span', 'chip ok', 'Đã hoàn thành');
        chip.hidden = !passed;
        eh.appendChild(chip);
        blk.appendChild(eh);
        blk.appendChild(h('div', 'ex-task', x.task));
        var holder = h('div');
        blk.appendChild(holder);
        var key = lkey(p, l) + '/' + x.id;
        S.create(holder, x, {
          mode: 'practice',
          idBase: 'ex-' + p.id + '-' + l.id + '-' + x.id,
          saved: st.answers[key],
          onChange: function (ans) { st.answers[key] = ans; save(); },
          onPass: function () { chip.hidden = false; mark(p, l, 'ex:' + x.id); refresh(); }
        });
        content.appendChild(blk);
      });
    }
    var reqs = requirements(l);
    var finish = h('div');
    if (reqs.length === 1 && reqs[0] === 'read') {
      var mb = h('button', 'btn primary', 'Đánh dấu đã học xong');
      mb.type = 'button';
      mb.addEventListener('click', function () { mark(p, l, 'read'); refresh(); });
      finish.appendChild(mb);
    }
    content.appendChild(finish);

    var banner = h('div', 'done-banner');
    banner.hidden = true;
    content.appendChild(banner);

    var nav = h('div', 'lesson-nav');
    var prev = p.lessons[idx - 1], next = p.lessons[idx + 1];
    nav.appendChild(prev ? link('#/bai/' + p.id + '/' + prev.id, 'btn', '← ' + esc(prev.title)) : h('span'));
    nav.appendChild(next ? link('#/bai/' + p.id + '/' + next.id, 'btn primary', esc(next.title) + ' →') : link('#/kiem-tra/' + p.id, 'btn primary', 'Làm bài kiểm tra Phần ' + p.no + ' →'));
    content.appendChild(nav);

    function refresh() {
      var s = lessonState(p, l);
      var d = isDone(p, l);
      doneChip.hidden = !d;
      var di = dots[idx];
      di.className = 'dot' + (d ? ' done' : '');
      di.textContent = d ? '✓' : String(idx + 1);
      if (exCounter) exCounter.textContent = exs.filter(function (x) { return s['ex:' + x.id]; }).length + '/' + exs.length + ' hoàn thành';
      if (d) {
        finish.innerHTML = '';
        banner.hidden = false;
        banner.innerHTML = '<span>Bạn đã hoàn thành bài này.</span>';
        var nx = next ? link('#/bai/' + p.id + '/' + next.id, 'btn primary', 'Bài tiếp theo →') : link('#/kiem-tra/' + p.id, 'btn primary', 'Làm bài kiểm tra →');
        banner.appendChild(nx);
      } else {
        var left = reqs.filter(function (r) { return !s[r]; });
        var nq = left.filter(function (r) { return r.indexOf('q:') === 0; }).length;
        var ne = left.filter(function (r) { return r.indexOf('ex:') === 0; }).length;
        var ns = left.filter(function (r) { return r.indexOf('sim:') === 0; }).length;
        if (nq || ne || ns) {
          banner.hidden = false;
          banner.style.background = 'var(--head-bg)';
          banner.style.color = 'var(--ink-2)';
          var bits = [];
          if (ns) bits.push(ns + ' bài mô phỏng');
          if (ne) bits.push(ne + ' bài tập');
          if (nq) bits.push(nq + ' câu hỏi nhanh');
          banner.innerHTML = '<span>Còn ' + bits.join(' và ') + ' để hoàn thành bài này.</span>';
        }
      }
      if (d) { banner.style.background = ''; banner.style.color = ''; }
    }
    ctx.refresh = refresh;
    currentLesson = { p: p, l: l, onDone: refresh };
    refresh();

    col.appendChild(content);
    lay.appendChild(col);
    w.appendChild(lay);
    main.appendChild(w);
  }

  /* ================= Bài kiểm tra ================= */
  function testPage(pid) {
    var p = findPart(pid);
    if (!p) return mapPage();
    if (!unlocked(p)) return lockedPage(p);
    var T = p.test || { mcq: [], practice: [] };
    var w = h('div', 'wrap page');
    w.style.maxWidth = '900px';
    w.appendChild(h('div', 'crumb', '<a href="#/lo-trinh">Lộ trình</a><span>›</span><a href="' + firstOpenLesson(p) + '">Phần ' + p.no + ': ' + esc(p.title) + '</a>'));
    var head = h('div', 'lesson-h');
    head.innerHTML = '<h1>Bài kiểm tra Phần ' + p.no + '</h1>';
    w.appendChild(head);
    var body = h('div', 'content');
    body.style.maxWidth = 'none';
    w.appendChild(body);
    main.appendChild(w);

    var tr = st.tests[p.id];
    var total = T.mcq.length + 2 * T.practice.length;
    var intro = h('div', 'test-intro');
    intro.innerHTML = '<div class="rules"><div><b>' + T.mcq.length + '</b>câu trắc nghiệm</div><div><b>' + T.practice.length + '</b>bài thực hành</div><div><b>' + PASS + '%</b>điểm đạt</div>' +
      (tr ? '<div><b>' + tr.best + '%</b>điểm cao nhất (' + tr.attempts + ' lần)</div>' : '') + '</div>' +
      '<p class="muted">Mỗi câu trắc nghiệm 1 điểm, mỗi bài thực hành 2 điểm (tính theo số ô làm đúng). Không giới hạn thời gian, được làm lại nhiều lần. ' +
      (p.no < parts().length ? 'Đạt từ ' + PASS + '% sẽ mở khoá Phần ' + (p.no + 1) + '.' : 'Đây là bài kiểm tra cuối khoá.') + '</p>';
    var startBtn = h('button', 'btn primary lg', tr ? 'Làm lại bài kiểm tra' : 'Bắt đầu làm bài');
    startBtn.type = 'button';
    startBtn.style.justifySelf = 'start';
    intro.appendChild(startBtn);
    body.appendChild(intro);
    startBtn.addEventListener('click', function () { startTest(); });

    function startTest() {
      S.destroyAll();
      body.innerHTML = '';
      var picks = {};
      var qs = shuffle(T.mcq.map(function (q, i) { return { q: q, i: i }; })).map(function (o) {
        var order = shuffle(o.q.options.map(function (_, k) { return k; }));
        return { q: o.q, order: order };
      });
      var qEls = [];
      qs.forEach(function (o, n) {
        var box = h('div', 'tq');
        box.appendChild(h('div', 'tq-n', 'Câu ' + (n + 1)));
        box.appendChild(h('div', 'tq-q', o.q.q));
        var opts = h('div', 'opts');
        var bts = o.order.map(function (k, j) {
          var bt = h('button', 'opt', '<span class="k">' + LETTERS[j] + '</span><span>' + esc(o.q.options[k]) + '</span>');
          bt.type = 'button';
          bt.addEventListener('click', function () {
            picks[n] = k;
            bts.forEach(function (x) { x.classList.remove('picked'); });
            bt.classList.add('picked');
            updateCount();
          });
          opts.appendChild(bt);
          return bt;
        });
        box.appendChild(opts);
        var ex = h('div', 'quiz-ex'); ex.hidden = true;
        box.appendChild(ex);
        body.appendChild(box);
        qEls.push({ box: box, bts: bts, ex: ex });
      });
      var sheets = [];
      if (T.practice.length) {
        var stt = h('div', 'section-title');
        stt.innerHTML = '<h2>Phần thực hành</h2>';
        body.appendChild(stt);
        T.practice.forEach(function (x, i) {
          var blk = h('div', 'ex-block');
          blk.appendChild(h('div', 'ex-head', '<h3>Bài ' + (i + 1) + '</h3>'));
          blk.appendChild(h('div', 'ex-task', x.task));
          var holder = h('div');
          blk.appendChild(holder);
          body.appendChild(blk);
          sheets.push(S.create(holder, x, { mode: 'test', idBase: 'test-' + p.id + '-' + x.id }));
        });
      }
      var bar = h('div', 'sticky-submit');
      var count = h('span', 'muted');
      var sub = h('button', 'btn primary lg', 'Nộp bài');
      sub.type = 'button';
      bar.appendChild(count); bar.appendChild(sub);
      body.appendChild(bar);
      function updateCount() { count.textContent = 'Đã trả lời ' + Object.keys(picks).length + '/' + qs.length + ' câu trắc nghiệm'; }
      updateCount();
      sub.addEventListener('click', function () {
        var missing = qs.length - Object.keys(picks).length;
        if (missing > 0 && !sub.dataset.sure) {
          sub.dataset.sure = '1';
          count.innerHTML = '<b style="color:var(--warn)">Còn ' + missing + ' câu chưa trả lời.</b> Bấm Nộp bài lần nữa để nộp luôn.';
          return;
        }
        finish();
      });

      function finish() {
        var score = 0;
        qs.forEach(function (o, n) {
          var el = qEls[n], right = picks[n] === o.q.answer;
          if (right) score += 1;
          el.bts.forEach(function (bt, j) {
            bt.disabled = true;
            var k = o.order[j];
            if (k === o.q.answer) bt.classList.add('right');
            else if (picks[n] === k) bt.classList.add('wrong');
          });
          el.ex.hidden = false;
          el.ex.innerHTML = (right ? '<b style="color:var(--ok)">Đúng.</b> ' : '<b style="color:var(--bad)">' + (picks[n] == null ? 'Chưa trả lời.' : 'Sai.') + '</b> ') + esc(o.q.explain || '');
        });
        sheets.forEach(function (sh) {
          var res = sh.grade();
          score += 2 * res.ok / res.total;
          sh.showMarks(res);
          sh.lock();
          var bad = Object.keys(res.cells).filter(function (a) { return !res.cells[a].ok; });
          if (!bad.length) sh.showFeedback('<div class="fb-title">Đúng tất cả ' + res.total + ' ô</div>', 'good');
          else sh.showFeedback('<div class="fb-title">Đúng ' + res.ok + '/' + res.total + ' ô</div><ul>' + bad.slice(0, 4).map(function (a) { return '<li>' + sh.reason(a, res.cells[a], false) + '</li>'; }).join('') + '</ul>', 'bad');
        });
        var pct = total ? Math.round(score / total * 100) : 0;
        var passed = pct >= PASS;
        var prevRec = st.tests[p.id] || { best: 0, attempts: 0, passed: false };
        st.tests[p.id] = { best: Math.max(prevRec.best, pct), attempts: prevRec.attempts + 1, passed: prevRec.passed || passed, last: pct };
        save();
        updatePill();
        bar.remove();

        var next = parts().filter(function (x) { return x.no === p.no + 1; })[0];
        var card = h('div', 'score-card ' + (passed ? 'pass' : 'fail'));
        var msg;
        if (passed && next) msg = '<h2>Đạt! Phần ' + next.no + ' đã mở khoá.</h2><p>Bạn được ' + Math.round(score * 10) / 10 + '/' + total + ' điểm. Xem lại các câu sai bên dưới trước khi học tiếp.</p>';
        else if (passed) msg = '<h2>Xuất sắc! Bạn đã hoàn thành toàn bộ khoá học.</h2><p>Bạn được ' + Math.round(score * 10) / 10 + '/' + total + ' điểm.</p>';
        else msg = '<h2>Chưa đạt. Cần tối thiểu ' + PASS + '%.</h2><p>Bạn được ' + Math.round(score * 10) / 10 + '/' + total + ' điểm. Xem lại câu sai, ôn lại bài rồi làm lại nhé.</p>';
        card.innerHTML = '<div class="score-num">' + pct + '%</div><div>' + msg + '<div class="btns"></div></div>';
        var btns = card.querySelector('.btns');
        if (passed && next) btns.appendChild(link('#/bai/' + next.id + '/' + next.lessons[0].id, 'btn primary', 'Học Phần ' + next.no + ' →'));
        if (passed && !next) btns.appendChild(link('#/lo-trinh', 'btn primary', 'Xem lộ trình'));
        var again = h('button', 'btn' + (passed ? '' : ' primary'), 'Làm lại');
        again.type = 'button';
        again.addEventListener('click', function () { startTest(); window.scrollTo(0, 0); });
        btns.appendChild(again);
        if (!passed) btns.appendChild(link('#/bai/' + p.id + '/' + p.lessons[0].id, 'btn', 'Ôn lại Phần ' + p.no));
        body.insertBefore(card, body.firstChild);
        window.scrollTo(0, 0);
      }
    }
  }

  /* ================= Tra cứu hàm ================= */
  var GROUPS = ['Tính toán', 'Thống kê', 'Logic', 'Điều kiện', 'Văn bản', 'Ngày giờ', 'Tìm kiếm', 'Thông tin'];
  var refGroup = '', refQuery = '';
  var playPreset = null;
  function lessonExists(path) {
    if (!path) return false;
    var bits = path.split('/'), p = findPart(bits[0]);
    return !!(p && findLesson(p, bits[1]));
  }
  function refPage(name) {
    var funcs = ECC.funcs.slice();
    var w = h('div', 'wrap page');
    var head = h('div', 'lesson-h');
    head.innerHTML = '<h1>Tra cứu hàm Excel</h1><div class="meta"><span>' + funcs.length + ' hàm thông dụng nhất cho dân văn phòng, giải thích tiếng Việt</span></div>';
    w.appendChild(head);
    var tools = h('div', 'ref-tools');
    var search = h('input', 'search');
    search.type = 'search';
    search.id = 'ref-search';
    search.placeholder = 'Tìm theo tên hàm hoặc việc cần làm, ví dụ: tổng, tìm kiếm, ngày công…';
    search.value = refQuery;
    search.setAttribute('aria-label', 'Tìm hàm');
    tools.appendChild(search);
    var chips = h('div', 'chips');
    ['Tất cả'].concat(GROUPS).forEach(function (g) {
      var b = h('button', (g === 'Tất cả' ? !refGroup : refGroup === g) ? 'on' : '', g);
      b.type = 'button';
      b.addEventListener('click', function () {
        refGroup = g === 'Tất cả' ? '' : g;
        chips.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
        drawList();
      });
      chips.appendChild(b);
    });
    tools.appendChild(chips);
    w.appendChild(tools);

    var lay = h('div', 'ref-layout');
    var list = h('nav', 'ref-list');
    var detail = h('div', 'ref-detail');
    lay.appendChild(list); lay.appendChild(detail);
    w.appendChild(lay);
    main.appendChild(w);

    var current = name ? funcs.filter(function (f) { return f.name === name.toUpperCase(); })[0] : null;
    function drawList() {
      var q = strip(refQuery.trim());
      var shown = funcs.filter(function (f) {
        if (refGroup && f.group !== refGroup) return false;
        if (!q) return true;
        return strip(f.name + ' ' + f.short + ' ' + f.desc.replace(/<[^>]+>/g, '') + ' ' + f.group).indexOf(q) >= 0;
      });
      list.innerHTML = '';
      if (!shown.length) { list.appendChild(h('div', 'empty', 'Không tìm thấy hàm phù hợp.')); return; }
      GROUPS.forEach(function (g) {
        var items = shown.filter(function (f) { return f.group === g; });
        if (!items.length) return;
        list.appendChild(h('div', 'ref-group', g));
        items.forEach(function (f) {
          var a = link('#/tra-cuu/' + encodeURIComponent(f.name), current === f ? 'on' : '', '<b>' + esc(f.name) + '</b><span>' + esc(f.short) + '</span>');
          list.appendChild(a);
        });
      });
    }
    search.addEventListener('input', function () { refQuery = search.value; drawList(); });
    drawList();
    if (!current) current = funcs[0];
    if (current) drawDetail(current);
    if (name && window.innerWidth < 960) setTimeout(function () { detail.scrollIntoView({ block: 'start' }); }, 30);

    function drawDetail(f) {
      detail.innerHTML = '';
      detail.appendChild(h('h1', null, esc(f.name)));
      detail.appendChild(h('div', 'ref-sub', esc(f.short)));
      var meta = h('div', 'meta');
      meta.innerHTML = '<span class="chip">' + esc(f.group) + '</span>' + (f.since ? '<span class="chip warn">' + esc(f.since) + '</span>' : '') +
        (f.supported === false ? '<span class="chip lock">Chưa chạy được trên bảng tính mini</span>' : '');
      detail.appendChild(meta);
      detail.appendChild(h('p', null, f.desc));
      detail.appendChild(syntaxBox('=' + f.syntax, f.args));
      if (f.example) {
        var data = f.example.data.map(function (r) { return r.slice(); });
        var pa = E.parseAddr(f.example.cell);
        while (data.length <= pa.row) data.push([]);
        while (data[pa.row].length < pa.col) data[pa.row].push('');
        data[pa.row][pa.col] = f.example.formula;
        var ex = h('div', 'example');
        ex.appendChild(h('div', 'example-h', 'Công thức ở ô ' + f.example.cell + ': <code>' + esc(f.example.formula) + '</code>'));
        var holder = h('div');
        ex.appendChild(holder);
        S.create(holder, { data: data, fmt: f.example.fmt }, { mode: 'example' });
        if (f.example.note) ex.appendChild(h('div', 'example-note', f.example.note));
        detail.appendChild(ex);
      }
      (f.tips || []).forEach(function (t) { detail.appendChild(h('div', 'callout tip', '<span class="lbl">Mẹo</span><div>' + t + '</div>')); });
      if (f.errors && f.errors.length) {
        var tw = h('div', 'tbl-wrap');
        tw.innerHTML = '<table class="tbl"><thead><tr><th>Lỗi hay gặp</th><th>Nguyên nhân và cách sửa</th></tr></thead><tbody>' +
          f.errors.map(function (e) { return '<tr><td><code>' + esc(e[0]) + '</code></td><td>' + e[1] + '</td></tr>'; }).join('') + '</tbody></table>';
        detail.appendChild(tw);
      }
      var acts = h('div', 'cta');
      acts.style.display = 'flex'; acts.style.gap = '8px'; acts.style.flexWrap = 'wrap';
      if (lessonExists(f.lesson)) {
        var bits = f.lesson.split('/');
        acts.appendChild(link('#/bai/' + bits[0] + '/' + bits[1], 'btn primary', 'Học bài về ' + esc(f.name)));
      }
      if (f.example) {
        var tryBtn = h('button', 'btn', 'Thử trong bảng nháp');
        tryBtn.type = 'button';
        tryBtn.addEventListener('click', function () {
          var d = f.example.data.map(function (r) { return r.slice(); });
          var q = E.parseAddr(f.example.cell);
          while (d.length <= q.row) d.push([]);
          while (d[q.row].length < q.col) d[q.row].push('');
          d[q.row][q.col] = f.example.formula;
          playPreset = { title: f.name, data: d };
          go('#/bang-nhap');
        });
        acts.appendChild(tryBtn);
      }
      detail.appendChild(acts);
    }
  }

  /* ================= Bảng nháp ================= */
  var SAMPLE = [
    ['Mã NV', 'Họ tên', 'Phòng', 'Doanh số', 'Ngày vào làm'],
    ['NV01', 'Nguyễn Thu Hà', 'Kinh doanh', 185000000, '12/03/2019'],
    ['NV02', 'Trần Minh Quân', 'Kho vận', 92000000, '01/07/2021'],
    ['NV03', 'Lê Hoàng Yến', 'Kinh doanh', 243500000, '15/09/2017'],
    ['NV04', 'Phạm Đức Long', 'Kế toán', 0, '20/02/2022'],
    ['NV05', 'Võ Ngọc Ánh', 'Kinh doanh', 158700000, '05/05/2020'],
    ['NV06', 'Đặng Quốc Bảo', 'Kho vận', 77300000, '11/11/2023']
  ];
  function playPage() {
    var w = h('div', 'wrap page');
    var head = h('div', 'lesson-h');
    head.innerHTML = '<h1>Bảng nháp</h1><div class="meta"><span>Thử bất kỳ công thức nào. Mọi ô đều sửa được, không chấm điểm và không lưu.</span></div>';
    w.appendChild(head);
    var bar = h('div', 'cta');
    bar.style.display = 'flex'; bar.style.gap = '8px'; bar.style.flexWrap = 'wrap'; bar.style.marginBottom = '14px';
    var holder = h('div');
    var preset = playPreset;
    playPreset = null;
    function draw(data, cols) {
      S.destroyAll();
      holder.innerHTML = '';
      S.create(holder, { data: data }, { mode: 'playground', rows: 16, cols: cols || 8, idBase: 'play' });
    }
    var b1 = h('button', 'btn', 'Dữ liệu mẫu nhân viên'); b1.type = 'button';
    b1.addEventListener('click', function () { draw(SAMPLE); });
    var b2 = h('button', 'btn', 'Bảng trống'); b2.type = 'button';
    b2.addEventListener('click', function () { draw([]); });
    bar.appendChild(b1); bar.appendChild(b2);
    w.appendChild(bar);
    if (preset) w.appendChild(h('p', 'muted', 'Đang mở ví dụ của hàm <b>' + esc(preset.title) + '</b>. Sửa dữ liệu để xem kết quả thay đổi.'));
    w.appendChild(holder);
    var tips = h('div', 'callout tip');
    tips.style.marginTop = '16px';
    tips.innerHTML = '<span class="lbl">Mẹo</span><div>Bấm đúp vào ô hoặc gõ trực tiếp để nhập. Khi đang gõ công thức, bấm hoặc kéo chuột trên bảng để chèn địa chỉ ô. <kbd>F4</kbd> thêm dấu $, <kbd>Ctrl</kbd> + <kbd>D</kbd> hoặc nút Sao chép công thức để điền xuống.</div>';
    w.appendChild(tips);
    main.appendChild(w);
    draw(preset ? preset.data : SAMPLE);
  }

  render();
})();
