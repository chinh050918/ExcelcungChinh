/* ExcelcungChinh – lớp bọc bộ tính công thức (HyperFormula)
   - Chuẩn hoá công thức người học gõ (chấp nhận ; hoặc , , chữ thường, TRUE/FALSE…)
   - Bổ sung các hàm còn thiếu: AVERAGEIFS, CONCAT, RANK / RANK.EQ
   - Dịch chuyển tham chiếu khi "điền xuống"
   - Định dạng giá trị hiển thị và giải thích lỗi bằng tiếng Việt */
(function () {
  'use strict';

  var HF_CONFIG = {
    licenseKey: 'gpl-v3',
    dateFormats: ['DD/MM/YYYY', 'DD/MM/YY', 'YYYY-MM-DD'],
    timeFormats: ['hh:mm', 'hh:mm:ss'],
    functionArgSeparator: ',',
    decimalSeparator: '.',
    thousandSeparator: '',
    currencySymbol: ['$', 'đ', '₫'],
    useColumnIndex: false,
    smartRounding: true,
    precisionRounding: 10
  };

  /* ---------- Địa chỉ ô ---------- */
  function colName(i) {
    var s = '';
    i += 1;
    while (i > 0) {
      var m = (i - 1) % 26;
      s = String.fromCharCode(65 + m) + s;
      i = Math.floor((i - 1) / 26);
    }
    return s;
  }
  function colIndex(name) {
    var n = 0;
    name = name.toUpperCase();
    for (var i = 0; i < name.length; i++) n = n * 26 + (name.charCodeAt(i) - 64);
    return n - 1;
  }
  function parseAddr(a) {
    var m = /^\$?([A-Za-z]{1,3})\$?(\d+)$/.exec(String(a).trim());
    if (!m) return null;
    return { col: colIndex(m[1]), row: parseInt(m[2], 10) - 1 };
  }
  function addr(col, row) { return colName(col) + (row + 1); }
  function expandRange(r) {
    var parts = String(r).split(':');
    var a = parseAddr(parts[0]);
    var b = parseAddr(parts[1] || parts[0]);
    var out = [];
    for (var row = Math.min(a.row, b.row); row <= Math.max(a.row, b.row); row++) {
      for (var col = Math.min(a.col, b.col); col <= Math.max(a.col, b.col); col++) out.push(addr(col, row));
    }
    return out;
  }

  /* ---------- Tách chuỗi trong công thức ---------- */
  // Trả về mảng đoạn {str:boolean, text}
  function segments(f) {
    var out = [], buf = '', i = 0, inStr = false;
    while (i < f.length) {
      var c = f[i];
      if (inStr) {
        buf += c;
        if (c === '"') {
          if (f[i + 1] === '"') { buf += '"'; i++; }
          else { out.push({ str: true, text: buf }); buf = ''; inStr = false; }
        }
      } else if (c === '"') {
        if (buf) out.push({ str: false, text: buf });
        buf = '"'; inStr = true;
      } else buf += c;
      i++;
    }
    if (buf) out.push({ str: inStr, text: buf });
    return out;
  }

  // Tìm ngoặc đóng tương ứng, bỏ qua chuỗi
  function matchParen(f, open) {
    var depth = 0, inStr = false;
    for (var i = open; i < f.length; i++) {
      var c = f[i];
      if (inStr) {
        if (c === '"') { if (f[i + 1] === '"') i++; else inStr = false; }
        continue;
      }
      if (c === '"') inStr = true;
      else if (c === '(') depth++;
      else if (c === ')') { depth--; if (depth === 0) return i; }
    }
    return -1;
  }
  // Tách các đối số cấp cao nhất
  function splitArgs(s) {
    var args = [], depth = 0, inStr = false, buf = '';
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (inStr) {
        buf += c;
        if (c === '"') { if (s[i + 1] === '"') { buf += '"'; i++; } else inStr = false; }
        continue;
      }
      if (c === '"') { inStr = true; buf += c; continue; }
      if (c === '(' || c === '{') depth++;
      if (c === ')' || c === '}') depth--;
      if (c === ',' && depth === 0) { args.push(buf); buf = ''; continue; }
      buf += c;
    }
    args.push(buf);
    return args;
  }

  // Vị trí "TÊN(" ngoài chuỗi, không phải phần đuôi của tên khác
  function findFn(f, name, from) {
    var re = new RegExp('(^|[^A-Z0-9_.])' + name.replace(/\./g, '\\.') + '\\s*\\(', 'g');
    var segs = segments(f), pos = 0;
    for (var k = 0; k < segs.length; k++) {
      var sg = segs[k];
      if (!sg.str) {
        re.lastIndex = 0;
        var m;
        while ((m = re.exec(sg.text))) {
          var start = pos + m.index + m[1].length;
          if (start >= (from || 0)) return { start: start, open: pos + m.index + m[0].length - 1 };
        }
      }
      pos += sg.text.length;
    }
    return null;
  }

  function rewriteFn(f, name, build) {
    var guard = 0, from = 0, hit;
    while ((hit = findFn(f, name, from)) && guard++ < 50) {
      var close = matchParen(f, hit.open);
      if (close < 0) return f;
      var inner = f.slice(hit.open + 1, close);
      var args = splitArgs(inner).map(function (a) { return rewriteAll(a); });
      var rep = build(args);
      if (rep == null) { from = close; continue; }
      f = f.slice(0, hit.start) + rep + f.slice(close + 1);
      from = hit.start;
    }
    return f;
  }

  function rewriteAll(f) {
    f = rewriteFn(f, 'AVERAGEIFS', function (a) {
      if (a.length < 3) return null;
      var rest = a.slice(1).join(',');
      return '(SUMIFS(' + a[0] + ',' + rest + ')/COUNTIFS(' + rest + '))';
    });
    f = rewriteFn(f, 'RANK.EQ', rankBuild);
    f = rewriteFn(f, 'RANK', rankBuild);
    f = rewriteFn(f, 'CONCAT', function (a) { return 'CONCATENATE(' + a.join(',') + ')'; });
    // EDATE: bộ tính sai khi rơi vào 29/02, viết lại theo cách Excel tính
    f = rewriteFn(f, 'EDATE', function (a) {
      if (a.length !== 2) return null;
      var d = '(' + a[0] + ')', n = '(' + a[1] + ')';
      return 'DATE(YEAR(' + d + '),MONTH(' + d + ')+' + n + ',MIN(DAY(' + d + '),DAY(EOMONTH(' + d + ',' + n + '))))';
    });
    // MOD: Excel lấy dấu theo số chia (MOD(-5,3)=1)
    f = rewriteFn(f, 'MOD', function (a) {
      if (a.length !== 2) return null;
      var x = '(' + a[0] + ')', y = '(' + a[1] + ')';
      return '(' + x + '-' + y + '*INT(' + x + '/' + y + '))';
    });
    // DATEDIF: Excel nhận cả đơn vị viết thường
    f = rewriteFn(f, 'DATEDIF', function (a) {
      if (a.length !== 3 || /^\s*"[A-Z]+"\s*$/.test(a[2])) return null;
      return 'DATEDIF(' + a[0] + ',' + a[1] + ',UPPER(' + a[2] + '))';
    });
    // INT: Excel làm tròn xuống (INT(-2.5)=-3), bộ tính cắt về 0
    f = rewriteFn(f, 'INT', function (a) {
      if (a.length !== 1) return null;
      return 'FLOOR.MATH(' + a[0] + ')';
    });
    return f;
  }
  function rankBuild(a) {
    if (a.length < 2) return null;
    var n = '(' + a[0] + ')', ref = a[1];
    var order = a.length > 2 && a[2].trim() !== '' ? a[2] : '0';
    if (order.trim() === '0') return '(COUNTIF(' + ref + ',">"&' + n + ')+1)';
    if (/^\s*1\s*$/.test(order)) return '(COUNTIF(' + ref + ',"<"&' + n + ')+1)';
    return 'IF((' + order + ')=0,COUNTIF(' + ref + ',">"&' + n + ')+1,COUNTIF(' + ref + ',"<"&' + n + ')+1)';
  }

  /* ---------- Chuẩn hoá công thức người học gõ ---------- */
  function normalizeFormula(raw) {
    if (typeof raw !== 'string') return raw;
    var t = raw.trim();
    if (t[0] !== '=') return raw;
    var segs = segments(t);
    var body = segs.map(function (sg) {
      if (sg.str) return sg.text;
      var s = sg.text.toUpperCase().replace(/;/g, ',');
      // TRUE / FALSE đứng riêng -> TRUE() / FALSE()
      s = s.replace(/(^|[^A-Z0-9_.])(TRUE|FALSE)(?![A-Z0-9_.]|\s*\()/g, '$1$2()');
      return s;
    }).join('');
    // Tự đóng ngoặc còn thiếu (Excel cũng làm vậy)
    var open = 0;
    segments(body).forEach(function (sg) {
      if (sg.str) return;
      for (var i = 0; i < sg.text.length; i++) {
        if (sg.text[i] === '(') open++;
        else if (sg.text[i] === ')') open--;
      }
    });
    if (segments(body).length && segments(body).slice(-1)[0].str && !/"$/.test(body)) body += '"';
    while (open-- > 0) body += ')';
    return rewriteAll(body);
  }

  /* ---------- Dịch tham chiếu khi sao chép công thức ---------- */
  var REF_RE = /(^|[^A-Za-z0-9_.$])(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![A-Za-z0-9_(])/g;
  function shiftFormula(f, dr, dc) {
    if (typeof f !== 'string' || f.trim()[0] !== '=') return f;
    return segments(f).map(function (sg) {
      if (sg.str) return sg.text;
      return sg.text.replace(REF_RE, function (m, pre, dCol, col, dRow, row) {
        var ci = colIndex(col), ri = parseInt(row, 10) - 1;
        if (!dCol) ci += dc;
        if (!dRow) ri += dr;
        if (ci < 0 || ri < 0) return pre + '#REF!';
        return pre + dCol + colName(ci) + dRow + (ri + 1);
      });
    }).join('');
  }

  /* ---------- Tạo bảng tính ---------- */
  function prepCell(v) {
    if (v === null || v === undefined || v === '') return null;
    if (typeof v === 'string' && v.trim()[0] === '=') return normalizeFormula(v);
    return v;
  }
  function build(data) {
    var rows = (data || []).map(function (r) { return r.map(prepCell); });
    if (!rows.length) rows = [[null]];
    return HyperFormula.buildFromArray(rows, HF_CONFIG);
  }
  function setCell(hf, a, raw) {
    var p = typeof a === 'string' ? parseAddr(a) : a;
    var v = raw;
    if (typeof raw === 'string') {
      if (raw.trim() === '') v = null;
      else if (raw.trim()[0] === '=') v = normalizeFormula(raw);
    }
    try {
      hf.setCellContents({ sheet: 0, col: p.col, row: p.row }, [[v]]);
    } catch (e) {
      hf.setCellContents({ sheet: 0, col: p.col, row: p.row }, [[String(raw)]]);
    }
  }
  function getCell(hf, a) {
    var p = typeof a === 'string' ? parseAddr(a) : a;
    var at = { sheet: 0, col: p.col, row: p.row };
    var v = hf.getCellValue(at);
    var type = 'NUMBER_RAW';
    try { type = hf.getCellValueDetailedType(at); } catch (e) { /* ô trống */ }
    if (v && typeof v === 'object' && 'value' in v) return { error: true, value: v.value, type: v.type, message: v.message || '' };
    return { value: v, type: type };
  }

  /* ---------- So sánh kết quả ---------- */
  function sameValue(a, b) {
    if (a.error || b.error) return !!(a.error && b.error && a.value === b.value);
    var x = a.value, y = b.value;
    if (x === null || x === '' ) x = null;
    if (y === null || y === '' ) y = null;
    if (typeof x === 'number' && typeof y === 'number') {
      return Math.abs(x - y) <= 1e-7 * Math.max(1, Math.abs(y));
    }
    if (typeof x === 'string' && typeof y === 'string') return x.trim() === y.trim();
    return x === y;
  }

  /* ---------- Định dạng hiển thị ---------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function serialToDate(s) {
    var ms = Math.round((s - 25569) * 86400000);
    return new Date(ms);
  }
  function fmtDate(s) {
    var d = serialToDate(Math.floor(s));
    return pad(d.getUTCDate()) + '/' + pad(d.getUTCMonth() + 1) + '/' + d.getUTCFullYear();
  }
  function fmtTime(s, withSec) {
    var frac = s - Math.floor(s);
    var total = Math.round(frac * 86400);
    var h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), sec = total % 60;
    return pad(h) + ':' + pad(m) + (withSec || sec ? ':' + pad(sec) : '');
  }
  function fmtNumber(v, maxDec) {
    if (!isFinite(v)) return String(v);
    return v.toLocaleString('en-US', { maximumFractionDigits: maxDec == null ? 6 : maxDec });
  }
  function formatValue(cell, fmt) {
    if (!cell) return '';
    if (cell.error) return cell.value;
    var v = cell.value;
    if (v === null || v === undefined) return '';
    if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
    if (typeof v === 'string') return v;
    if (typeof v !== 'number') return String(v);
    var f = fmt || '';
    if (!f) {
      if (cell.type === 'NUMBER_DATE') f = 'date';
      else if (cell.type === 'NUMBER_DATETIME') f = 'datetime';
      else if (cell.type === 'NUMBER_TIME') f = Math.abs(v) < 1 ? 'time' : '';
      else if (cell.type === 'NUMBER_PERCENT') f = 'pct';
    }
    switch (f) {
      case 'date': return fmtDate(v);
      case 'datetime': return fmtDate(v) + ' ' + fmtTime(v);
      case 'time': return fmtTime(v);
      case 'pct': return fmtNumber(v * 100, 2) + '%';
      case 'pct0': return fmtNumber(v * 100, 0) + '%';
      case 'int': return fmtNumber(v, 0);
      case 'dec1': return v.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      case 'dec2': return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      case 'vnd': return fmtNumber(v, 0) + ' đ';
      case 'raw': return String(v);
      default: return fmtNumber(v);
    }
  }

  /* ---------- Giải thích lỗi ---------- */
  var ERR = {
    '#DIV/0!': 'Chia cho 0 (hoặc chia cho ô trống). Kiểm tra lại số chia.',
    '#N/A': 'Không tìm thấy giá trị cần tìm. Kiểm tra giá trị tìm kiếm và vùng dò.',
    '#NAME?': 'Excel không hiểu một tên trong công thức: gõ sai tên hàm, hoặc chữ chưa đặt trong dấu ngoặc kép "".',
    '#VALUE!': 'Sai kiểu dữ liệu, ví dụ lấy chữ cộng với số.',
    '#REF!': 'Tham chiếu tới ô không tồn tại.',
    '#NUM!': 'Số không hợp lệ cho phép tính này.',
    '#ERROR!': 'Công thức viết sai cú pháp: thiếu ngoặc, thừa dấu phẩy, hoặc thiếu đối số.',
    '#CYCLE!': 'Công thức tự tham chiếu tới chính ô của nó (vòng lặp).',
    '#SPILL!': 'Kết quả trả về nhiều ô, bảng tính mini chưa hỗ trợ.'
  };
  function explainError(cell, raw) {
    if (!cell || !cell.error) return '';
    var base = ERR[cell.value] || 'Công thức bị lỗi.';
    if (cell.value === '#ERROR!' && typeof raw === 'string') {
      var outside = segments(raw).filter(function (sg) { return !sg.str; }).map(function (sg) { return sg.text; }).join(' ');
      if (/[^\x00-\x7F]/.test(outside)) base = 'Có chữ tiếng Việt nằm ngoài dấu ngoặc kép. Chữ trong công thức phải viết trong "", ví dụ "Đạt".';
    }
    var m = cell.message || '';
    var fn = /Function name (\S+) not recognized/.exec(m);
    if (fn) base = 'Không có hàm tên "' + fn[1] + '". Kiểm tra lại chính tả tên hàm.';
    var ne = /Named expression (\S+) not recognized/.exec(m);
    if (ne) base = '"' + ne[1] + '" không phải tên hàm hay địa chỉ ô. Nếu là chữ, hãy đặt trong ngoặc kép: "' + ne[1] + '".';
    return base;
  }

  /* ---------- Hàm trong công thức (dùng cho kiểm tra mustUse) ---------- */
  function usedFunctions(raw) {
    if (typeof raw !== 'string') return [];
    var out = [];
    segments(raw.toUpperCase()).forEach(function (sg) {
      if (sg.str) return;
      var re = /([A-Z][A-Z0-9.]*)\s*\(/g, m;
      while ((m = re.exec(sg.text))) out.push(m[1]);
    });
    return out;
  }

  /* ---------- Dữ liệu "xáo" để phát hiện gõ cứng kết quả ----------
     Mỗi ô số (trừ hàng tiêu đề) nhân một hệ số khác nhau. Công thức đúng sẽ
     cho cùng kết quả với lời giải trên dữ liệu xáo; gõ cứng số thì không. */
  function perturb(data) {
    return (data || []).map(function (r, ri) {
      return r.map(function (v, ci) {
        if (ri === 0 || typeof v !== 'number') return v;
        return v * (1 + ((ri * 7 + ci * 3) % 5 + 1) / 4) + 1;
      });
    });
  }

  var names = [];
  try { names = HyperFormula.getRegisteredFunctionNames('enGB').concat(['AVERAGEIFS', 'CONCAT', 'RANK', 'RANK.EQ']); } catch (e) { /* bỏ qua */ }

  window.ECC_ENGINE = {
    colName: colName, colIndex: colIndex, parseAddr: parseAddr, addr: addr, expandRange: expandRange,
    normalizeFormula: normalizeFormula, shiftFormula: shiftFormula, splitArgs: splitArgs,
    build: build, setCell: setCell, getCell: getCell, sameValue: sameValue,
    formatValue: formatValue, explainError: explainError, usedFunctions: usedFunctions,
    functionNames: names, segments: segments, perturb: perturb
  };
})();
