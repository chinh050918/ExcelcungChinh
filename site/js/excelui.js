/* ExcelcungChinh – giao diện Excel vẽ lại
   - ECC_XL.window(cfg): cửa sổ Excel tĩnh có Ribbon, đánh số chỉ vào nút cần bấm
   - ECC_XL.sim(container, cfg, opts): mô phỏng thao tác (bấm tab, nút, hộp thoại Sort, bộ lọc)
   Giao diện theo Excel Microsoft 365 bản tiếng Anh.                                         */
(function () {
  'use strict';

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  /* ================= Biểu tượng ================= */
  var G = '#107c41', B = '#2b6cc4', O = '#d0732a', R = '#c42b1c', Y = '#e8b42a', P = '#7a4fc9';
  function svg(body, vb) { return '<svg viewBox="0 0 ' + (vb || 24) + ' ' + (vb || 24) + '" aria-hidden="true">' + body + '</svg>'; }
  var S = 'fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"';
  var gridIcon = function (fillTop) {
    return '<rect x="3" y="4" width="18" height="16" rx="1" ' + S + '/><path d="M3 9h18M3 14.5h18M9 4v16M15 4v16" ' + S + '/>' +
      (fillTop ? '<rect x="3.7" y="4.7" width="16.6" height="3.6" fill="' + fillTop + '" opacity=".85"/>' : '');
  };
  var ICONS = {
    paste: svg('<rect x="5" y="4" width="14" height="17" rx="1.5" ' + S + '/><rect x="8.5" y="2.5" width="7" height="3.5" rx="1" fill="' + O + '"/><rect x="10" y="9" width="10" height="12" rx="1" fill="#fff" stroke="currentColor" stroke-width="1.4"/><path d="M12 13h6M12 16h6" ' + S + '/>'),
    cut: svg('<circle cx="7" cy="17" r="3" ' + S + '/><circle cx="17" cy="17" r="3" ' + S + '/><path d="M9 15 17 4M15 15 7 4" ' + S + '/>'),
    copy: svg('<rect x="8" y="7" width="12" height="14" rx="1" ' + S + '/><path d="M5 17V4a1 1 0 0 1 1-1h10" ' + S + '/>'),
    painter: svg('<rect x="4" y="3" width="14" height="6" rx="1" fill="' + Y + '" stroke="currentColor" stroke-width="1.2"/><path d="M18 6h2v5h-8v3" ' + S + '/><rect x="10.5" y="14" width="3" height="7" rx="1" ' + S + '/>'),
    autosum: svg('<path d="M17 5H6l6 7-6 7h11" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'),
    fill: svg('<path d="M12 4v13M7 12l5 5 5-5" fill="none" stroke="' + B + '" stroke-width="1.8"/><path d="M4 20h16" ' + S + '/>'),
    clear: svg('<path d="M14 4 20 10 11 19H6l-2-2z" ' + S + '/><path d="M8 10l6 6" stroke="' + R + '" stroke-width="1.6"/>'),
    sortfilter: svg('<text x="2" y="10" font-size="8" font-weight="700" fill="currentColor" font-family="Arial">A</text><text x="2" y="20" font-size="8" font-weight="700" fill="currentColor" font-family="Arial">Z</text><path d="M11 5v13M8.5 15.5 11 18l2.5-2.5" fill="none" stroke="' + B + '" stroke-width="1.6"/><path d="M14 6h8l-3 4v5l-2 1v-6z" fill="' + B + '" opacity=".25" stroke="currentColor" stroke-width="1.2"/>'),
    find: svg('<circle cx="10" cy="10" r="6" ' + S + '/><path d="M14.5 14.5 20 20" stroke="currentColor" stroke-width="2"/>'),
    sortaz: svg('<text x="1" y="9" font-size="8" font-weight="700" fill="currentColor" font-family="Arial">A</text><text x="1" y="19" font-size="8" font-weight="700" fill="currentColor" font-family="Arial">Z</text><path d="M14 4v15M11 16l3 3 3-3" fill="none" stroke="' + B + '" stroke-width="1.8"/>', 22),
    sortza: svg('<text x="1" y="9" font-size="8" font-weight="700" fill="currentColor" font-family="Arial">Z</text><text x="1" y="19" font-size="8" font-weight="700" fill="currentColor" font-family="Arial">A</text><path d="M14 4v15M11 16l3 3 3-3" fill="none" stroke="' + B + '" stroke-width="1.8"/>', 22),
    sort: svg('<rect x="2" y="3" width="13" height="18" rx="1" fill="#fff" stroke="currentColor" stroke-width="1.3"/><text x="4.5" y="11" font-size="7" font-weight="700" fill="currentColor" font-family="Arial">Z</text><text x="4.5" y="19" font-size="7" font-weight="700" fill="currentColor" font-family="Arial">A</text><path d="M19 4v15M16.5 16.5 19 19l2.5-2.5" fill="none" stroke="' + B + '" stroke-width="1.8"/>'),
    filter: svg('<path d="M3 4h18l-7 8.5V19l-4 2v-8.5z" fill="' + B + '" fill-opacity=".18" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>'),
    clearf: svg('<path d="M3 4h14l-5.5 6.5V16l-3 1.5v-7z" ' + S + '/><path d="M15 14l6 6M21 14l-6 6" stroke="' + R + '" stroke-width="1.6"/>'),
    reapply: svg('<path d="M3 4h14l-5.5 6.5V16l-3 1.5v-7z" ' + S + '/><path d="M20 13a4 4 0 1 1-1.2-2.8M19.5 9v3h-3" fill="none" stroke="' + G + '" stroke-width="1.5"/>'),
    advanced: svg('<path d="M3 4h14l-5.5 6.5V16l-3 1.5v-7z" ' + S + '/><circle cx="18" cy="17" r="3" fill="none" stroke="' + O + '" stroke-width="1.5"/>'),
    textcols: svg('<rect x="2" y="5" width="8" height="14" rx="1" ' + S + '/><rect x="14" y="5" width="8" height="14" rx="1" ' + S + '/><path d="M10.5 12h3M12.5 10.5 14 12l-1.5 1.5" fill="none" stroke="' + B + '" stroke-width="1.5"/><path d="M4 9h4M4 12h4M16 9h4M16 12h4" stroke="currentColor" stroke-width="1"/>'),
    flashfill: svg('<rect x="3" y="4" width="18" height="16" rx="1" ' + S + '/><path d="M13 6 8 13h4l-1 5 5-7h-4z" fill="' + Y + '" stroke="currentColor" stroke-width=".8"/>'),
    removedup: svg(gridIcon() + '<path d="M14 13l6 6M20 13l-6 6" stroke="' + R + '" stroke-width="1.8"/>'),
    validation: svg('<rect x="3" y="4" width="14" height="16" rx="1" ' + S + '/><path d="M6 12l3 3 6-7" fill="none" stroke="' + G + '" stroke-width="1.8"/><circle cx="18.5" cy="17.5" r="3.5" fill="#fff" stroke="' + R + '" stroke-width="1.4"/><path d="M17 16l3 3" stroke="' + R + '" stroke-width="1.4"/>'),
    consolidate: svg('<rect x="2" y="3" width="8" height="7" ' + S + '/><rect x="2" y="14" width="8" height="7" ' + S + '/><rect x="14" y="8" width="8" height="8" fill="' + B + '" fill-opacity=".2" stroke="currentColor" stroke-width="1.4"/><path d="M10 6.5h2v11h-2M12 12h2" ' + S + '/>'),
    getdata: svg('<ellipse cx="11" cy="5" rx="7" ry="2.5" ' + S + '/><path d="M4 5v12c0 1.4 3.1 2.5 7 2.5M18 5v6" ' + S + '/><path d="M14 17h7M18 14l3 3-3 3" fill="none" stroke="' + G + '" stroke-width="1.6"/>'),
    csv: svg('<path d="M5 2h9l5 5v15H5z" ' + S + '/><path d="M14 2v5h5" ' + S + '/><text x="6.5" y="17" font-size="5.5" font-weight="700" fill="' + G + '" font-family="Arial">CSV</text>'),
    web: svg('<circle cx="12" cy="12" r="8.5" ' + S + '/><path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17" ' + S + '/>'),
    fromtable: svg(gridIcon(G)),
    refresh: svg('<path d="M19 8a8 8 0 1 0 1 6" fill="none" stroke="' + G + '" stroke-width="1.8"/><path d="M20 3v5h-5" fill="none" stroke="' + G + '" stroke-width="1.8"/>'),
    whatif: svg('<rect x="3" y="4" width="18" height="16" rx="1" ' + S + '/><text x="8" y="17" font-size="11" font-weight="700" fill="' + B + '" font-family="Arial">?</text>'),
    forecast: svg('<path d="M3 20h18M4 16l4-4 3 3 4-6" ' + S + '/><path d="M15 9l5-4" stroke="' + B + '" stroke-width="1.6" stroke-dasharray="2 2"/>'),
    group: svg('<path d="M5 4v16M5 4h3M5 20h3" ' + S + '/><rect x="10" y="5" width="11" height="3" fill="currentColor" opacity=".25"/><rect x="10" y="10.5" width="11" height="3" fill="currentColor" opacity=".25"/><rect x="10" y="16" width="11" height="3" fill="currentColor" opacity=".25"/>'),
    ungroup: svg('<path d="M5 4v6M5 14v6M5 4h3M5 20h3" ' + S + '/><rect x="10" y="5" width="11" height="3" fill="currentColor" opacity=".25"/><rect x="10" y="16" width="11" height="3" fill="currentColor" opacity=".25"/>'),
    subtotal: svg(gridIcon() + '<text x="13" y="20" font-size="7" font-weight="700" fill="' + G + '" font-family="Arial">Σ</text>'),
    condfmt: svg('<rect x="3" y="3" width="18" height="18" rx="1" ' + S + '/><rect x="5" y="6" width="9" height="3" fill="' + R + '"/><rect x="5" y="11" width="12" height="3" fill="' + Y + '"/><rect x="5" y="16" width="6" height="3" fill="' + G + '"/>'),
    fmttable: svg(gridIcon(B)),
    cellstyles: svg('<rect x="3" y="4" width="8" height="7" fill="' + G + '" opacity=".75"/><rect x="13" y="4" width="8" height="7" fill="' + Y + '" opacity=".85"/><rect x="3" y="13" width="8" height="7" fill="' + R + '" opacity=".7"/><rect x="13" y="13" width="8" height="7" fill="' + B + '" opacity=".7"/>'),
    insert: svg(gridIcon() + '<circle cx="18" cy="18" r="4.5" fill="' + G + '"/><path d="M18 15.5v5M15.5 18h5" stroke="#fff" stroke-width="1.6"/>'),
    delete: svg(gridIcon() + '<circle cx="18" cy="18" r="4.5" fill="' + R + '"/><path d="M16 16l4 4M20 16l-4 4" stroke="#fff" stroke-width="1.6"/>'),
    format: svg(gridIcon() + '<rect x="14" y="13" width="8" height="8" rx="1" fill="' + B + '" opacity=".8"/>'),
    pivot: svg('<rect x="3" y="3" width="18" height="18" rx="1" ' + S + '/><path d="M3 8h18M8 3v18" ' + S + '/><path d="M12 15h5M15 12l2 3-2 3" fill="none" stroke="' + G + '" stroke-width="1.5"/>'),
    recpivot: svg('<rect x="3" y="3" width="18" height="18" rx="1" ' + S + '/><path d="M3 8h18M8 3v18" ' + S + '/><path d="M15 11l1.3 2.7 3 .4-2.2 2 .6 3-2.7-1.5-2.7 1.5.6-3-2.2-2 3-.4z" fill="' + Y + '"/>'),
    table: svg(gridIcon(B)),
    pictures: svg('<rect x="3" y="5" width="18" height="14" rx="1" ' + S + '/><circle cx="9" cy="10" r="2" fill="' + Y + '"/><path d="M4 18l5-5 4 4 3-3 4 4" fill="none" stroke="' + G + '" stroke-width="1.4"/>'),
    shapes: svg('<circle cx="8" cy="9" r="5" fill="' + B + '" opacity=".6"/><rect x="11" y="11" width="10" height="9" fill="' + O + '" opacity=".7"/>'),
    reccharts: svg('<path d="M3 21h18" ' + S + '/><rect x="5" y="12" width="3" height="8" fill="' + B + '"/><rect x="10" y="7" width="3" height="13" fill="' + G + '"/><rect x="15" y="10" width="3" height="10" fill="' + O + '"/><path d="M18 2l.9 1.9 2.1.3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.4 2.1-.3z" fill="' + Y + '"/>'),
    colchart: svg('<rect x="4" y="11" width="4" height="9" fill="' + B + '"/><rect x="10" y="5" width="4" height="15" fill="' + B + '"/><rect x="16" y="8" width="4" height="12" fill="' + B + '"/>'),
    linechart: svg('<path d="M3 18l5-6 4 3 7-9" fill="none" stroke="' + B + '" stroke-width="2"/>'),
    piechart: svg('<circle cx="12" cy="12" r="8" fill="' + B + '"/><path d="M12 12V4a8 8 0 0 1 7.6 10.5z" fill="' + O + '"/>'),
    pivotchart: svg('<rect x="3" y="12" width="4" height="8" fill="' + B + '"/><rect x="9" y="7" width="4" height="13" fill="' + G + '"/><path d="M15 15h6M18 12l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1.4"/>'),
    spark: svg('<rect x="2" y="6" width="20" height="12" rx="1" ' + S + '/><path d="M4 15l4-5 3 3 4-5 5 4" fill="none" stroke="' + B + '" stroke-width="1.5"/>'),
    slicer: svg('<rect x="4" y="3" width="16" height="18" rx="1" ' + S + '/><rect x="6.5" y="7" width="11" height="3" fill="' + B + '"/><rect x="6.5" y="12" width="11" height="3" fill="currentColor" opacity=".25"/><rect x="6.5" y="17" width="11" height="2" fill="currentColor" opacity=".25"/>'),
    timeline: svg('<rect x="2" y="7" width="20" height="10" rx="1" ' + S + '/><rect x="6" y="10" width="7" height="4" fill="' + B + '"/>'),
    fx: svg('<text x="4" y="17" font-size="13" font-style="italic" font-family="Times New Roman, serif" fill="currentColor">fx</text>'),
    book: svg('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" ' + S + '/><path d="M5 17a3 3 0 0 1 3-3h11" ' + S + '/>'),
    namemgr: svg('<rect x="3" y="5" width="18" height="14" rx="1" ' + S + '/><path d="M6 10h8M6 14h12" ' + S + '/><rect x="15" y="8" width="4" height="3" fill="' + Y + '"/>'),
    calc: svg('<rect x="5" y="3" width="14" height="18" rx="1.5" ' + S + '/><rect x="7.5" y="5.5" width="9" height="4" fill="' + G + '" opacity=".35"/><path d="M8 13h1M12 13h1M16 13h0M8 17h1M12 17h1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'),
    trace: svg('<circle cx="5" cy="17" r="2" fill="' + B + '"/><path d="M6.5 15.5 18 6" stroke="' + B + '" stroke-width="1.5"/><path d="M14 5.5h4.5V10" fill="none" stroke="' + B + '" stroke-width="1.5"/>'),
    normal: svg('<rect x="3" y="4" width="18" height="16" rx="1" ' + S + '/><path d="M3 9h18M9 4v16M15 4v16" ' + S + '/>'),
    pagebreak: svg('<rect x="3" y="4" width="18" height="16" rx="1" ' + S + '/><path d="M12 4v16" stroke="' + B + '" stroke-width="2" stroke-dasharray="3 2"/>'),
    pagelayout: svg('<rect x="5" y="2" width="14" height="20" rx="1" ' + S + '/><path d="M8 7h8M8 11h8M8 15h5" ' + S + '/>'),
    freeze: svg('<rect x="3" y="4" width="18" height="16" rx="1" ' + S + '/><path d="M3 9h18M9 4v16" stroke="' + B + '" stroke-width="2"/><path d="M15 9v11M3 14.5h18" ' + S + '/>'),
    zoom: svg('<circle cx="10" cy="10" r="6" ' + S + '/><path d="M14.5 14.5 20 20" stroke="currentColor" stroke-width="2"/><path d="M7.5 10h5M10 7.5v5" ' + S + '/>'),
    margins: svg('<rect x="5" y="2" width="14" height="20" rx="1" ' + S + '/><rect x="8" y="5" width="8" height="14" fill="none" stroke="' + B + '" stroke-width="1" stroke-dasharray="2 1.5"/>'),
    orientation: svg('<rect x="3" y="7" width="16" height="12" rx="1" ' + S + '/><path d="M8 3h13v12" fill="none" stroke="' + B + '" stroke-width="1.4"/>'),
    size: svg('<rect x="5" y="2" width="14" height="20" rx="1" ' + S + '/><text x="7" y="15" font-size="6" font-weight="700" fill="' + B + '" font-family="Arial">A4</text>'),
    printarea: svg('<rect x="3" y="4" width="18" height="16" rx="1" ' + S + '/><rect x="6" y="7" width="10" height="9" fill="none" stroke="' + B + '" stroke-width="1.6" stroke-dasharray="2.5 1.5"/>'),
    printtitles: svg('<rect x="5" y="2" width="14" height="20" rx="1" ' + S + '/><rect x="5.7" y="2.7" width="12.6" height="4" fill="' + G + '" opacity=".6"/><path d="M8 11h8M8 15h8" ' + S + '/>'),
    spelling: svg('<text x="3" y="12" font-size="8" font-weight="700" fill="currentColor" font-family="Arial">ABC</text><path d="M6 17l3 3 7-7" fill="none" stroke="' + G + '" stroke-width="1.8"/>'),
    protect: svg('<rect x="5" y="10" width="14" height="11" rx="1.5" ' + S + '/><path d="M8 10V7a4 4 0 0 1 8 0v3" ' + S + '/><circle cx="12" cy="15.5" r="1.6" fill="' + Y + '"/>'),
    comment: svg('<path d="M4 4h16v12H10l-5 4v-4H4z" fill="' + Y + '" fill-opacity=".35" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>'),
    wrap: svg('<path d="M3 6h18M3 12h14a3 3 0 0 1 0 6h-4M3 18h6" ' + S + '/><path d="M14 16l-2 2 2 2" fill="none" stroke="' + B + '" stroke-width="1.5"/>', 24),
    merge: svg('<rect x="2" y="6" width="20" height="12" rx="1" ' + S + '/><path d="M6 12h12M8 10l-2 2 2 2M16 10l2 2-2 2" fill="none" stroke="' + B + '" stroke-width="1.4"/>'),
    alignl: svg('<path d="M3 6h18M3 10h12M3 14h18M3 18h12" ' + S + '/>'),
    alignc: svg('<path d="M3 6h18M6 10h12M3 14h18M6 18h12" ' + S + '/>'),
    alignr: svg('<path d="M3 6h18M9 10h12M3 14h18M9 18h12" ' + S + '/>'),
    borders: svg('<rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/><path d="M4 20h16" stroke="currentColor" stroke-width="2.2"/>'),
    fillcolor: svg('<path d="M6 13l6-8 6 8-6 4z" ' + S + '/><rect x="3" y="19" width="18" height="3" fill="' + Y + '"/>'),
    fontcolor: svg('<text x="6" y="16" font-size="14" font-weight="700" fill="currentColor" font-family="Arial">A</text><rect x="3" y="19" width="18" height="3" fill="' + R + '"/>')
  };

  /* ================= Ribbon =================
     Mỗi nhóm: { name, items: [...] }. item: { id, label, icon, lg (nút to), dd (có mũi tên), iconOnly } */
  var RIBBON = {
    home: [
      { name: 'Clipboard', items: [{ id: 'paste', label: 'Paste', icon: 'paste', lg: 1, dd: 1 }, { id: 'cut', label: 'Cut', icon: 'cut' }, { id: 'copy', label: 'Copy', icon: 'copy', dd: 1 }, { id: 'painter', label: 'Format Painter', icon: 'painter' }] },
      { name: 'Font', custom: 'font' },
      { name: 'Alignment', items: [{ id: 'alignl', icon: 'alignl', iconOnly: 1, label: 'Align Left' }, { id: 'alignc', icon: 'alignc', iconOnly: 1, label: 'Center' }, { id: 'alignr', icon: 'alignr', iconOnly: 1, label: 'Align Right' }, { id: 'wrap', label: 'Wrap Text', icon: 'wrap' }, { id: 'merge', label: 'Merge & Center', icon: 'merge', dd: 1 }] },
      { name: 'Number', custom: 'number' },
      { name: 'Styles', items: [{ id: 'condfmt', label: 'Conditional Formatting', icon: 'condfmt', lg: 1, dd: 1 }, { id: 'fmttable', label: 'Format as Table', icon: 'fmttable', lg: 1, dd: 1 }, { id: 'cellstyles', label: 'Cell Styles', icon: 'cellstyles', lg: 1, dd: 1 }] },
      { name: 'Cells', items: [{ id: 'insert', label: 'Insert', icon: 'insert', lg: 1, dd: 1 }, { id: 'delete', label: 'Delete', icon: 'delete', lg: 1, dd: 1 }, { id: 'format', label: 'Format', icon: 'format', lg: 1, dd: 1 }] },
      { name: 'Editing', items: [{ id: 'autosum', label: 'AutoSum', icon: 'autosum', dd: 1 }, { id: 'fill', label: 'Fill', icon: 'fill', dd: 1 }, { id: 'clear', label: 'Clear', icon: 'clear', dd: 1 }, { id: 'sortfilter', label: 'Sort & Filter', icon: 'sortfilter', lg: 1, dd: 1 }, { id: 'find', label: 'Find & Select', icon: 'find', lg: 1, dd: 1 }] }
    ],
    insert: [
      { name: 'Tables', items: [{ id: 'pivot', label: 'PivotTable', icon: 'pivot', lg: 1, dd: 1 }, { id: 'recpivot', label: 'Recommended PivotTables', icon: 'recpivot', lg: 1 }, { id: 'table', label: 'Table', icon: 'table', lg: 1 }] },
      { name: 'Illustrations', items: [{ id: 'pictures', label: 'Pictures', icon: 'pictures', lg: 1, dd: 1 }, { id: 'shapes', label: 'Shapes', icon: 'shapes', lg: 1, dd: 1 }] },
      { name: 'Charts', items: [{ id: 'reccharts', label: 'Recommended Charts', icon: 'reccharts', lg: 1 }, { id: 'colchart', icon: 'colchart', iconOnly: 1, label: 'Column Chart', dd: 1 }, { id: 'linechart', icon: 'linechart', iconOnly: 1, label: 'Line Chart', dd: 1 }, { id: 'piechart', icon: 'piechart', iconOnly: 1, label: 'Pie Chart', dd: 1 }, { id: 'pivotchart', label: 'PivotChart', icon: 'pivotchart', lg: 1, dd: 1 }] },
      { name: 'Sparklines', items: [{ id: 'spline', label: 'Line', icon: 'spark' }, { id: 'scol', label: 'Column', icon: 'colchart' }, { id: 'swin', label: 'Win/Loss', icon: 'spark' }] },
      { name: 'Filters', items: [{ id: 'slicer', label: 'Slicer', icon: 'slicer' }, { id: 'timeline', label: 'Timeline', icon: 'timeline' }] }
    ],
    pagelayout: [
      { name: 'Page Setup', items: [{ id: 'margins', label: 'Margins', icon: 'margins', lg: 1, dd: 1 }, { id: 'orientation', label: 'Orientation', icon: 'orientation', lg: 1, dd: 1 }, { id: 'size', label: 'Size', icon: 'size', lg: 1, dd: 1 }, { id: 'printarea', label: 'Print Area', icon: 'printarea', lg: 1, dd: 1 }, { id: 'breaks', label: 'Breaks', icon: 'pagebreak', lg: 1, dd: 1 }, { id: 'printtitles', label: 'Print Titles', icon: 'printtitles', lg: 1 }] },
      { name: 'Scale to Fit', custom: 'scale' }
    ],
    formulas: [
      { name: 'Function Library', items: [{ id: 'insertfn', label: 'Insert Function', icon: 'fx', lg: 1 }, { id: 'autosum', label: 'AutoSum', icon: 'autosum', lg: 1, dd: 1 }, { id: 'recent', label: 'Recently Used', icon: 'book', lg: 1, dd: 1 }, { id: 'logical', label: 'Logical', icon: 'book', lg: 1, dd: 1 }, { id: 'text', label: 'Text', icon: 'book', lg: 1, dd: 1 }, { id: 'datetime', label: 'Date & Time', icon: 'book', lg: 1, dd: 1 }, { id: 'lookup', label: 'Lookup & Reference', icon: 'book', lg: 1, dd: 1 }, { id: 'math', label: 'Math & Trig', icon: 'book', lg: 1, dd: 1 }] },
      { name: 'Defined Names', items: [{ id: 'namemgr', label: 'Name Manager', icon: 'namemgr', lg: 1 }] },
      { name: 'Formula Auditing', items: [{ id: 'traceprec', label: 'Trace Precedents', icon: 'trace' }, { id: 'tracedep', label: 'Trace Dependents', icon: 'trace' }, { id: 'showf', label: 'Show Formulas', icon: 'fx' }] },
      { name: 'Calculation', items: [{ id: 'calcopts', label: 'Calculation Options', icon: 'calc', lg: 1, dd: 1 }] }
    ],
    data: [
      { name: 'Get & Transform Data', items: [{ id: 'getdata', label: 'Get Data', icon: 'getdata', lg: 1, dd: 1 }, { id: 'csv', label: 'From Text/CSV', icon: 'csv' }, { id: 'web', label: 'From Web', icon: 'web' }, { id: 'fromtable', label: 'From Table/Range', icon: 'fromtable' }] },
      { name: 'Queries & Connections', items: [{ id: 'refresh', label: 'Refresh All', icon: 'refresh', lg: 1, dd: 1 }] },
      { name: 'Sort & Filter', custom: 'sortfilter' },
      { name: 'Data Tools', items: [{ id: 'textcols', label: 'Text to Columns', icon: 'textcols', lg: 1 }, { id: 'flashfill', label: 'Flash Fill', icon: 'flashfill' }, { id: 'removedup', label: 'Remove Duplicates', icon: 'removedup' }, { id: 'validation', label: 'Data Validation', icon: 'validation', dd: 1 }, { id: 'consolidate', label: 'Consolidate', icon: 'consolidate' }] },
      { name: 'Forecast', items: [{ id: 'whatif', label: 'What-If Analysis', icon: 'whatif', lg: 1, dd: 1 }, { id: 'forecast', label: 'Forecast Sheet', icon: 'forecast', lg: 1 }] },
      { name: 'Outline', items: [{ id: 'group', label: 'Group', icon: 'group', lg: 1, dd: 1 }, { id: 'ungroup', label: 'Ungroup', icon: 'ungroup', lg: 1, dd: 1 }, { id: 'subtotal', label: 'Subtotal', icon: 'subtotal', lg: 1 }] }
    ],
    review: [
      { name: 'Proofing', items: [{ id: 'spelling', label: 'Spelling', icon: 'spelling', lg: 1 }] },
      { name: 'Comments', items: [{ id: 'newcomment', label: 'New Comment', icon: 'comment', lg: 1 }] },
      { name: 'Protect', items: [{ id: 'protectsheet', label: 'Protect Sheet', icon: 'protect', lg: 1 }, { id: 'protectwb', label: 'Protect Workbook', icon: 'protect', lg: 1 }] }
    ],
    view: [
      { name: 'Workbook Views', items: [{ id: 'normal', label: 'Normal', icon: 'normal', lg: 1 }, { id: 'pagebreak', label: 'Page Break Preview', icon: 'pagebreak', lg: 1 }, { id: 'pagelayoutv', label: 'Page Layout', icon: 'pagelayout', lg: 1 }] },
      { name: 'Show', custom: 'show' },
      { name: 'Zoom', items: [{ id: 'zoom', label: 'Zoom', icon: 'zoom', lg: 1 }] },
      { name: 'Window', items: [{ id: 'freeze', label: 'Freeze Panes', icon: 'freeze', lg: 1, dd: 1 }] }
    ]
  };
  var TABS = [['file', 'File'], ['home', 'Home'], ['insert', 'Insert'], ['pagelayout', 'Page Layout'], ['formulas', 'Formulas'], ['data', 'Data'], ['review', 'Review'], ['view', 'View'], ['help', 'Help']];

  function btnHtml(tab, it) {
    var id = tab + '.' + it.id;
    var ic = ICONS[it.icon] || '';
    var cls = 'xr-btn ' + (it.lg ? 'lg' : it.iconOnly ? 'io' : 'sm');
    var label = it.iconOnly ? '' : '<span class="xr-l">' + esc(it.label) + (it.dd ? ' <i class="xr-dd">▾</i>' : '') + '</span>';
    return '<button type="button" class="' + cls + '" data-id="' + id + '" title="' + esc(it.label) + '">' + '<span class="xr-i">' + ic + '</span>' + label + '</button>';
  }
  function customGroup(tab, kind) {
    var b = function (id, label, ic, extra) {
      return '<button type="button" class="xr-btn ' + (extra || 'io') + '" data-id="' + tab + '.' + id + '" title="' + esc(label) + '"><span class="xr-i">' + (ic || '') + '</span>' + (extra === 'sm' ? '<span class="xr-l">' + esc(label) + '</span>' : '') + '</button>';
    };
    switch (kind) {
      case 'font':
        return '<div class="xr-rows"><div class="xr-row"><span class="xr-field w110" data-id="' + tab + '.fontname">Calibri<i>▾</i></span><span class="xr-field w44" data-id="' + tab + '.fontsize">11<i>▾</i></span>' +
          '<span class="xr-glyph">A<sup>▲</sup></span><span class="xr-glyph">A<sup>▼</sup></span></div>' +
          '<div class="xr-row"><button type="button" class="xr-btn io" data-id="' + tab + '.bold" title="Bold"><b class="xr-t">B</b></button><button type="button" class="xr-btn io" data-id="' + tab + '.italic" title="Italic"><i class="xr-t">I</i></button><button type="button" class="xr-btn io" data-id="' + tab + '.underline" title="Underline"><u class="xr-t">U</u></button>' +
          b('borders', 'Borders', ICONS.borders) + b('fillcolor', 'Fill Color', ICONS.fillcolor) + b('fontcolor', 'Font Color', ICONS.fontcolor) + '</div></div>';
      case 'number':
        return '<div class="xr-rows"><div class="xr-row"><span class="xr-field w130" data-id="' + tab + '.numfmt">General<i>▾</i></span></div>' +
          '<div class="xr-row"><button type="button" class="xr-btn io" data-id="' + tab + '.currency" title="Accounting Number Format"><span class="xr-t">$</span></button><button type="button" class="xr-btn io" data-id="' + tab + '.percent" title="Percent Style"><span class="xr-t">%</span></button><button type="button" class="xr-btn io" data-id="' + tab + '.comma" title="Comma Style"><span class="xr-t">,</span></button>' +
          '<button type="button" class="xr-btn io" data-id="' + tab + '.incdec" title="Increase Decimal"><span class="xr-t sm">.0<sub>←</sub></span></button><button type="button" class="xr-btn io" data-id="' + tab + '.decdec" title="Decrease Decimal"><span class="xr-t sm">.00<sub>→</sub></span></button></div></div>';
      case 'sortfilter':
        return '<div class="xr-stack">' + b('sortaz', 'Sort A to Z', ICONS.sortaz) + b('sortza', 'Sort Z to A', ICONS.sortza) + '</div>' +
          btnHtml(tab, { id: 'sort', label: 'Sort', icon: 'sort', lg: 1 }) + btnHtml(tab, { id: 'filter', label: 'Filter', icon: 'filter', lg: 1 }) +
          '<div class="xr-stack">' + b('clear', 'Clear', ICONS.clearf, 'sm') + b('reapply', 'Reapply', ICONS.reapply, 'sm') + b('advanced', 'Advanced', ICONS.advanced, 'sm') + '</div>';
      case 'scale':
        return '<div class="xr-rows"><div class="xr-row"><span class="xr-lbl">Width:</span><span class="xr-field w90" data-id="' + tab + '.width">Automatic<i>▾</i></span></div><div class="xr-row"><span class="xr-lbl">Height:</span><span class="xr-field w90" data-id="' + tab + '.height">Automatic<i>▾</i></span></div><div class="xr-row"><span class="xr-lbl">Scale:</span><span class="xr-field w90">100%</span></div></div>';
      case 'show':
        return '<div class="xr-rows"><label class="xr-chk"><input type="checkbox" checked tabindex="-1"> Gridlines</label><label class="xr-chk"><input type="checkbox" checked tabindex="-1"> Formula Bar</label><label class="xr-chk"><input type="checkbox" checked tabindex="-1"> Headings</label></div>';
    }
    return '';
  }
  function ribbonHtml(tab, only) {
    var groups = RIBBON[tab];
    if (!groups) return '<div class="xr-empty">Tab ' + esc(tab) + '</div>';
    var out = [];
    var skipped = false;
    groups.forEach(function (g) {
      if (only && only.indexOf(g.name) < 0) { skipped = true; return; }
      var body;
      if (g.custom) body = customGroup(tab, g.custom);
      else {
        body = '';
        var stack = [];
        var flush = function () { if (stack.length) { body += '<div class="xr-stack">' + stack.join('') + '</div>'; stack = []; } };
        g.items.forEach(function (it) {
          if (it.lg) { flush(); body += btnHtml(tab, it); }
          else { stack.push(btnHtml(tab, it)); if (stack.length === 3) flush(); }
        });
        flush();
      }
      out.push('<div class="xr-group"><div class="xr-gbody">' + body + '</div><div class="xr-gname">' + esc(g.name) + '</div></div>');
    });
    return (skipped && only ? '<div class="xr-more" title="Các nhóm khác được ẩn bớt">…</div>' : '') + out.join('') + (skipped && only ? '<div class="xr-more">…</div>' : '');
  }

  /* ================= Cửa sổ Excel ================= */
  function buildWindow(cfg) {
    var tab = cfg.tab || 'home';
    var win = el('div', 'xl-win');
    win.innerHTML =
      '<div class="xw-title"><span class="xw-logo">' + svg('<rect x="2" y="2" width="20" height="20" rx="3" fill="#fff"/><path d="M7 7l10 10M17 7 7 17" stroke="' + G + '" stroke-width="2.6"/>') + '</span>' +
      '<span class="xw-qa">AutoSave <i class="xw-toggle"></i> ' + svg('<rect x="4" y="3" width="16" height="18" rx="1.5" fill="none" stroke="#fff" stroke-width="1.6"/><rect x="8" y="3" width="8" height="6" fill="#fff"/>') + ' ↶ ↷</span>' +
      '<span class="xw-name">' + esc(cfg.file || 'BaoCao.xlsx') + ' - Excel</span>' +
      '<span class="xw-search">' + svg('<circle cx="10" cy="10" r="6" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M14.5 14.5 20 20" stroke="#fff" stroke-width="1.8"/>') + ' Search</span>' +
      '<span class="xw-ctrl">–&nbsp;&nbsp;&nbsp;▢&nbsp;&nbsp;&nbsp;✕</span></div>' +
      '<div class="xw-tabs">' + TABS.map(function (t) {
        return '<button type="button" class="xw-tab' + (t[0] === tab ? ' on' : '') + (t[0] === 'file' ? ' file' : '') + '" data-id="tab.' + t[0] + '">' + t[1] + '</button>';
      }).join('') + '</div>' +
      '<div class="xw-ribbon"></div>';
    win.querySelector('.xw-ribbon').innerHTML = ribbonHtml(tab, cfg.groups);
    return win;
  }
  function setTab(win, tab, only) {
    win.querySelectorAll('.xw-tab').forEach(function (t) { t.classList.toggle('on', t.dataset.id === 'tab.' + tab); });
    win.querySelector('.xw-ribbon').innerHTML = ribbonHtml(tab, only);
  }
  function findTarget(root, id) { return root.querySelector('[data-id="' + id + '"]'); }
  function addBadge(target, n) {
    if (!target) return;
    target.classList.add('xr-mark');
    var b = el('span', 'xr-badge', String(n));
    target.appendChild(b);
  }

  /* Lưới dữ liệu tĩnh (dùng trong cửa sổ minh hoạ và mô phỏng) */
  function colName(i) { var s = ''; i++; while (i > 0) { var m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; }
  function fmtVal(v, f) {
    if (v == null || v === '') return '';
    if (typeof v === 'number') {
      if (f === 'pct') return Math.round(v * 1000) / 10 + '%';
      if (f === 'vnd') return v.toLocaleString('en-US', { maximumFractionDigits: 0 }) + ' ₫';
      if (f === 'int') return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
      if (f === 'dec2') return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return v.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
    return String(v);
  }

  /* ================= Khối minh hoạ tĩnh ================= */
  function windowBlock(cfg) {
    var box = el('figure', 'xl-fig');
    var win = buildWindow(cfg);
    if (cfg.fbar || cfg.data) {
      var sel = cfg.sel || 'A1';
      var fb = el('div', 'xw-fbar',
        '<span class="namebox" data-id="ui.namebox"><span class="nb-text">' + esc(sel) + '</span><span class="nb-caret">▾</span></span>' +
        '<span class="fxlabel" data-id="ui.fxbtn"><i>f</i><i>x</i></span><span class="xw-fx" data-id="ui.fx">' + esc(cfg.fx || '') + '</span>');
      win.appendChild(fb);
    }
    var body = el('div', 'xw-body');
    if (cfg.data) body.appendChild(staticGrid(cfg));
    else body.appendChild(el('div', 'xw-blank'));
    win.appendChild(body);
    if (cfg.fbar || cfg.data) {
      win.appendChild(el('div', 'xl-foot',
        '<span class="xl-nav">◀ ▶</span><span class="xl-tab" data-id="ui.sheettab">' + esc(cfg.sheetName || 'Sheet1') + '</span>' +
        '<span class="xl-add" data-id="ui.newsheet">+</span><span class="xl-status" data-id="ui.status">' + esc(cfg.status || 'Ready') + '</span>'));
    }
    var scroller = el('div', 'xl-scroll');
    scroller.appendChild(win);
    box.appendChild(scroller);
    (cfg.marks || []).forEach(function (m) { addBadge(findTarget(win, m.id), m.n); });
    if (cfg.marks && cfg.marks.length) {
      var leg = el('ol', 'xl-legend');
      cfg.marks.forEach(function (m) { leg.appendChild(el('li', null, '<span class="xr-badge static">' + m.n + '</span><span>' + m.text + '</span>')); });
      box.appendChild(leg);
    }
    if (cfg.caption) box.appendChild(el('figcaption', 'xl-cap', cfg.caption));
    // cuộn tới nút được đánh số đầu tiên trên màn hình hẹp
    setTimeout(function () {
      var first = win.querySelector('.xr-mark:not(.xw-tab)');
      if (first && first.offsetLeft + first.offsetWidth > scroller.clientWidth) {
        scroller.scrollLeft = Math.max(0, first.offsetLeft - 40);
      }
    }, 0);
    return box;
  }
  function staticGrid(cfg) {
    var data = cfg.data, nCols = 0;
    data.forEach(function (r) { nCols = Math.max(nCols, r.length); });
    nCols = Math.max(nCols, cfg.minCols || 0);
    var t = el('table', 'grid xw-grid');
    var selP = /^([A-Z]+)(\d+)$/.exec(cfg.sel || '');
    var selC = selP ? selP[1] : null, selR = selP ? +selP[2] : null;
    var head = '<tr><th class="corner"></th>' + Array.from({ length: nCols }, function (_, i) {
      return '<th class="colh' + (colName(i) === selC ? ' hl' : '') + '"' + (i === 0 ? ' data-id="ui.colhead"' : '') + '>' + colName(i) + '</th>';
    }).join('') + '</tr>';
    var rows = data.map(function (r, ri) {
      return '<tr><th class="rowh' + (ri + 1 === selR ? ' hl' : '') + '"' + (ri === 0 ? ' data-id="ui.rowhead"' : '') + '>' + (ri + 1) + '</th>' + Array.from({ length: nCols }, function (_, ci) {
        var v = r[ci];
        var f = cfg.fmt && cfg.fmt[colName(ci)];
        var isSel = colName(ci) === selC && ri + 1 === selR;
        return '<td class="' + (ri === 0 ? 'head ' : '') + (typeof v === 'number' ? 'num ' : '') + (isSel ? 'sel' : '') + '"' + (isSel ? ' data-id="ui.cell"' : '') + '>' + esc(fmtVal(v, f)) + '</td>';
      }).join('') + '</tr>';
    }).join('');
    t.innerHTML = '<thead>' + head + '</thead><tbody>' + rows + '</tbody>';
    var w = el('div', 'grid-wrap');
    w.appendChild(t);
    return w;
  }

  /* ================= Mô phỏng thao tác ================= */
  var SORT_ORDERS = { text: [['asc', 'A to Z'], ['desc', 'Z to A']], num: [['asc', 'Smallest to Largest'], ['desc', 'Largest to Smallest']] };

  function Sim(container, cfg, opts) {
    opts = opts || {};
    var header = cfg.data[0];
    var rows = cfg.data.slice(1).map(function (r, i) { return { v: r, id: i }; });
    var isNum = header.map(function (_, ci) { return rows.every(function (r) { return typeof r.v[ci] === 'number' || r.v[ci] == null || r.v[ci] === ''; }); });
    var tab = cfg.tab || 'home';
    var stepIdx = 0, wrongCount = 0, done = false;
    var filterOn = false, filters = {}, selCell = null;
    var fills = {}, frozen = false, colFmt = {};

    var box = el('div', 'xl-sim');
    var panel = el('div', 'sim-panel');
    box.appendChild(panel);
    var scroller = el('div', 'xl-scroll');
    var win = buildWindow({ tab: tab, file: cfg.file, groups: null });
    var fbar = el('div', 'xw-fbar', '<span class="namebox"><span class="nb-text">A1</span><span class="nb-caret">▾</span></span><span class="fxlabel"><i>f</i><i>x</i></span><span class="xw-fx"></span>');
    win.appendChild(fbar);
    var body = el('div', 'xw-body');
    win.appendChild(body);
    var foot = el('div', 'xl-foot', '<span class="xl-nav">◀ ▶</span><span class="xl-tab">' + esc(cfg.sheetName || 'Sheet1') + '</span><span class="xl-add">+</span><span class="xl-status">Ready</span>');
    win.appendChild(foot);
    scroller.appendChild(win);
    box.appendChild(scroller);
    var layer = el('div', 'sim-layer');
    win.appendChild(layer);
    var actions = el('div', 'sim-actions');
    var resetBtn = el('button', 'btn ghost subtle', 'Làm lại từ đầu');
    resetBtn.type = 'button';
    actions.appendChild(resetBtn);
    box.appendChild(actions);
    container.appendChild(box);

    function steps() { return cfg.steps; }
    function cur() { return steps()[stepIdx]; }

    /* ---- lưới ---- */
    function visibleRows() {
      return rows.filter(function (r) {
        return Object.keys(filters).every(function (ci) { return filters[ci].indexOf(String(r.v[ci])) >= 0; });
      });
    }
    function drawGrid() {
      var n = header.length;
      var t = el('table', 'grid xw-grid');
      var html = '<thead><tr><th class="corner"></th>' + header.map(function (_, i) { return '<th class="colh">' + colName(i) + '</th>'; }).join('') + '</tr></thead><tbody>';
      html += '<tr><th class="rowh">1</th>' + header.map(function (hd, ci) {
        var arrow = filterOn ? '<button type="button" class="xf-arrow' + (filters[ci] ? ' on' : '') + '" data-id="arrow.' + ci + '" title="Bộ lọc cột ' + esc(hd) + '">' + (filters[ci] ? ICONS.filter : '▾') + '</button>' : '';
        return '<td class="head" data-r="0" data-c="' + ci + '"><span class="xf-h">' + esc(hd) + '</span>' + arrow + '</td>';
      }).join('') + '</tr>';
      var vis = visibleRows();
      var filtered = Object.keys(filters).length > 0;
      rows.forEach(function (r, i) {
        if (vis.indexOf(r) < 0) return;
        html += '<tr><th class="rowh' + (filtered ? ' fl' : '') + '">' + (i + 2) + '</th>' + Array.from({ length: n }, function (_, ci) {
          var v = r.v[ci], f = colFmt[ci] || (cfg.fmt && cfg.fmt[colName(ci)]);
          var fl = fills[r.id + '_' + ci];
          var style = fl ? ' style="background:' + fl.bg + ';color:' + (fl.ink || 'inherit') + '"' : '';
          return '<td class="' + (typeof v === 'number' ? 'num' : '') + '" data-r="' + (i + 1) + '" data-c="' + ci + '"' + style + '>' + esc(fmtVal(v, f)) + '</td>';
        }).join('') + '</tr>';
      });
      html += '</tbody>';
      t.innerHTML = html;
      if (frozen) t.classList.add('frozen');
      body.innerHTML = '';
      var w = el('div', 'grid-wrap');
      w.appendChild(t);
      body.appendChild(w);
      if (selCell) {
        var td = t.querySelector('td[data-r="' + selCell.r + '"][data-c="' + selCell.c + '"]');
        if (td) td.classList.add('sel');
      }
      var hint = hintTarget();
      if (hint) { var h = findTarget(win, hint); if (h) h.classList.add('sim-target'); }
    }

    /* ---- bảng hướng dẫn ---- */
    function drawPanel(msg, kind) {
      var st = cur();
      var list = steps().map(function (s, i) {
        var cls = i < stepIdx || done ? 'ok' : i === stepIdx ? 'now' : '';
        return '<li class="' + cls + '"><span class="sim-n">' + (i < stepIdx || done ? '✓' : i + 1) + '</span><span>' + s.text + '</span></li>';
      }).join('');
      panel.innerHTML = '<div class="sim-task">' + (cfg.task || '') + '</div><ol class="sim-steps">' + list + '</ol>' +
        (msg ? '<div class="sim-msg ' + (kind || '') + '">' + msg + '</div>' : '');
    }
    function hintTarget() {
      if (done) return null;
      var st = cur();
      if (wrongCount < 2 || !st) return null;
      if (st.do === 'tab') return 'tab.' + st.target;
      if (st.do === 'button') return st.target;
      if (st.do === 'filterArrow') return 'arrow.' + header.indexOf(st.col);
      return null;
    }
    function wrong(msg) {
      wrongCount++;
      drawPanel(msg + (wrongCount >= 2 ? ' Chỗ cần bấm đang được tô sáng.' : ''), 'bad');
      var h = hintTarget();
      win.querySelectorAll('.sim-target').forEach(function (x) { x.classList.remove('sim-target'); });
      if (h) { var t = findTarget(win, h); if (t) t.classList.add('sim-target'); }
      box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
    }
    function applyEffect(ef) {
      if (!ef) return;
      var ci = header.indexOf(ef.col);
      var test = function (v) {
        switch (ef.op) {
          case '>': return v > ef.value;
          case '<': return v < ef.value;
          case '>=': return v >= ef.value;
          case '<=': return v <= ef.value;
          case '=': return String(v) === String(ef.value);
          case 'contains': return String(v).toLowerCase().indexOf(String(ef.value).toLowerCase()) >= 0;
        }
        return false;
      };
      if (ef.type === 'fill') {
        var hit = [];
        if (ef.op === 'dup') {
          var cnt = {};
          rows.forEach(function (r) { var k = String(r.v[ci]); cnt[k] = (cnt[k] || 0) + 1; });
          hit = rows.filter(function (r) { return cnt[String(r.v[ci])] > 1; });
        } else if (ef.op === 'top' || ef.op === 'bottom') {
          var sorted = rows.slice().sort(function (a, b) { return ef.op === 'top' ? b.v[ci] - a.v[ci] : a.v[ci] - b.v[ci]; });
          hit = sorted.slice(0, ef.value);
        } else hit = rows.filter(function (r) { return test(r.v[ci]); });
        hit.forEach(function (r) {
          if (ef.row) header.forEach(function (_, c) { fills[r.id + '_' + c] = { bg: ef.bg || '#ffc7ce', ink: ef.ink || '#9c0006' }; });
          else fills[r.id + '_' + ci] = { bg: ef.bg || '#ffc7ce', ink: ef.ink || '#9c0006' };
        });
      }
      if (ef.type === 'dedupe') {
        var seen = {};
        var idx = (ef.cols || header).map(function (c) { return header.indexOf(c); });
        rows = rows.filter(function (r) {
          var k = idx.map(function (c) { return String(r.v[c]); }).join('|');
          if (seen[k]) return false;
          seen[k] = 1; return true;
        });
      }
      if (ef.type === 'freeze') frozen = true;
      if (ef.type === 'numfmt') colFmt[ci] = ef.fmt;
      if (ef.type === 'sort') {
        applySort([{ ci: ci, order: ef.order || 'asc' }]);
        return;
      }
      drawGrid();
    }
    function openMenu(st) {
      layer.innerHTML = '';
      layer.hidden = false;
      var anchor = findTarget(win, st.at);
      var m = el('div', 'xfm xmenu');
      var wr = win.getBoundingClientRect(), ar = anchor ? anchor.getBoundingClientRect() : wr;
      m.style.left = Math.max(4, Math.min(ar.left - wr.left, wr.width - 268)) + 'px';
      m.style.top = (ar.bottom - wr.top + 2) + 'px';
      m.innerHTML = (st.items || []).map(function (it) {
        if (it === '-') return '<hr>';
        var sub = / ›$/.test(it);
        var name = it.replace(/ ›$/, '');
        return '<button type="button" class="xfm-i xm-i" data-v="' + esc(name) + '">' + esc(name) + (sub ? '<span>›</span>' : '') + '</button>';
      }).join('') + '<div class="xfm-msg" hidden></div>';
      layer.appendChild(m);
      var need = m.offsetTop + m.offsetHeight + 10 - win.clientHeight;
      if (need > 0) win.style.paddingBottom = need + 'px';
      m.addEventListener('click', function (e) {
        var b = e.target.closest('[data-v]');
        if (!b) return;
        if (b.dataset.v === st.answer) {
          layer.hidden = true; layer.innerHTML = ''; win.style.paddingBottom = '';
          next();
        } else {
          wrongCount++;
          var msg = m.querySelector('.xfm-msg');
          msg.hidden = false;
          msg.innerHTML = '"' + esc(b.dataset.v) + '" chưa đúng.' + (wrongCount >= 2 ? ' Hãy chọn <b>' + esc(st.answer) + '</b>.' : '');
        }
      });
      layer.onclick = function (e) {
        if (e.target === layer) { layer.hidden = true; layer.innerHTML = ''; win.style.paddingBottom = ''; stepIdx = Math.max(0, stepIdx - 1); drawPanel('Bạn đã đóng menu. Bấm lại nút để mở lại.', 'bad'); }
      };
    }
    function next() {
      wrongCount = 0;
      win.querySelectorAll('.sim-target').forEach(function (x) { x.classList.remove('sim-target'); });
      if (cur() && cur().effect) applyEffect(cur().effect);
      stepIdx++;
      if (stepIdx < steps().length && cur().do === 'menu') { drawPanel(); openMenu(cur()); return; }
      if (stepIdx >= steps().length) {
        done = true;
        drawPanel('<b>Hoàn thành!</b> ' + (cfg.doneText || 'Bạn đã làm đúng các bước như trên Excel thật.'), 'good');
        if (opts.onDone) opts.onDone();
      } else drawPanel();
    }

    /* ---- xử lý bấm ---- */
    win.addEventListener('click', function (e) {
      if (done) return;
      var t = e.target.closest('[data-id], td');
      if (!t || layer.contains(t)) return;
      var st = cur();
      var id = t.dataset ? t.dataset.id : null;
      if (id && id.indexOf('tab.') === 0) {
        var tb = id.slice(4);
        if (tb !== 'file' && tb !== 'help') { tab = tb; setTab(win, tab); }
        if (st.do === 'tab' && st.target === tb) return next();
        if (st.do === 'tab') return wrong('Đây là tab <b>' + esc(t.textContent) + '</b>. Hãy tìm tab khác.');
        if (st.do === 'button' && st.target.split('.')[0] === tb) return; // vừa chuyển sang đúng tab
        return;
      }
      if (id && id.indexOf('arrow.') === 0) {
        e.stopPropagation();
        var ci = +id.slice(6);
        if (st.do === 'filterArrow' && header.indexOf(st.col) === ci) { openFilter(ci); return next(); }
        return wrong('Đây là nút lọc cột <b>' + esc(header[ci]) + '</b>.');
      }
      if (t.tagName === 'TD') {
        var r = +t.dataset.r, c = +t.dataset.c;
        selCell = { r: r, c: c };
        win.querySelector('.nb-text').textContent = colName(c) + (r === 0 ? 1 : rowNumber(r));
        win.querySelector('.xw-fx').textContent = t.textContent;
        win.querySelectorAll('.xw-grid td.sel').forEach(function (x) { x.classList.remove('sel'); });
        t.classList.add('sel');
        if (st.do === 'cell') {
          if (st.inData !== false || r > 0) return next();
        }
        return;
      }
      if (id) {
        if (st.do === 'button' && st.target === id) {
          if (id === 'data.sort' || id === 'home.sort') openSortDialog();
          if (id === 'data.filter') { filterOn = !filterOn; drawGrid(); }
          if (id === 'data.sortaz' || id === 'data.sortza') quickSort(id === 'data.sortaz' ? 'asc' : 'desc');
          if (id === 'data.clear') { filters = {}; drawGrid(); }
          return next();
        }
        var label = t.getAttribute('title') || t.textContent.trim();
        if (st.do === 'cell') return wrong('Trước tiên hãy bấm vào một ô trong bảng dữ liệu.');
        if (st.do === 'tab') return wrong('Nút <b>' + esc(label) + '</b> chưa phải. Trước hết cần chọn đúng tab trên Ribbon.');
        return wrong('Nút <b>' + esc(label) + '</b> chưa phải nút cần bấm.');
      }
    });
    function rowNumber(r) { return r + 1; }

    function compare(a, b, ci) {
      var x = a.v[ci], y = b.v[ci];
      if (isNum[ci]) return (x || 0) - (y || 0);
      return String(x).localeCompare(String(y), 'vi');
    }
    function applySort(levels) {
      rows.sort(function (a, b) {
        for (var i = 0; i < levels.length; i++) {
          var d = compare(a, b, levels[i].ci);
          if (d) return levels[i].order === 'desc' ? -d : d;
        }
        return a.id - b.id;
      });
      drawGrid();
    }
    function quickSort(order) {
      var ci = selCell ? selCell.c : 0;
      applySort([{ ci: ci, order: order }]);
    }

    /* ---- hộp thoại Sort ---- */
    function openSortDialog() {
      layer.innerHTML = '';
      layer.hidden = false;
      var d = el('div', 'xd');
      d.innerHTML = '<div class="xd-title">Sort<span class="xd-x">? &nbsp; ✕</span></div>' +
        '<div class="xd-bar"><button type="button" class="xd-b" data-a="add">+ Add Level</button><button type="button" class="xd-b" data-a="del">✕ Delete Level</button><button type="button" class="xd-b" disabled>Copy Level</button><span class="xd-arrows">▲ ▼</span><button type="button" class="xd-b" disabled>Options...</button>' +
        '<label class="xd-chk"><input type="checkbox" checked disabled> My data has headers</label></div>' +
        '<div class="xd-table"><div class="xd-th"><span></span><span>Column</span><span>Sort On</span><span>Order</span></div><div class="xd-levels"></div></div>' +
        '<div class="xd-msg" hidden></div>' +
        '<div class="xd-foot"><button type="button" class="xd-ok" data-a="ok">OK</button><button type="button" class="xd-cancel" data-a="cancel">Cancel</button></div>';
      layer.appendChild(d);
      var levelsBox = d.querySelector('.xd-levels');
      var lv = [{ ci: -1, order: 'asc' }];
      function draw() {
        levelsBox.innerHTML = '';
        lv.forEach(function (L, i) {
          var row = el('div', 'xd-row');
          var colSel = '<select class="xd-sel" data-k="ci" data-i="' + i + '"><option value="-1">' + (i ? '' : '') + '</option>' +
            header.map(function (h, ci) { return '<option value="' + ci + '"' + (L.ci === ci ? ' selected' : '') + '>' + esc(h) + '</option>'; }).join('') + '</select>';
          var kind = L.ci >= 0 && isNum[L.ci] ? 'num' : 'text';
          var ordSel = '<select class="xd-sel" data-k="order" data-i="' + i + '">' + SORT_ORDERS[kind].map(function (o) {
            return '<option value="' + o[0] + '"' + (L.order === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
          }).join('') + '<option disabled>Custom List...</option></select>';
          row.innerHTML = '<span class="xd-lbl">' + (i ? 'Then by' : 'Sort by') + '</span>' + colSel +
            '<select class="xd-sel" disabled><option>Cell Values</option></select>' + ordSel;
          levelsBox.appendChild(row);
        });
      }
      draw();
      d.addEventListener('change', function (e) {
        var s = e.target;
        if (!s.dataset.k) return;
        var L = lv[+s.dataset.i];
        if (s.dataset.k === 'ci') { L.ci = +s.value; L.order = 'asc'; draw(); }
        else L.order = s.value;
      });
      d.addEventListener('click', function (e) {
        var a = e.target.dataset && e.target.dataset.a;
        if (!a) return;
        var msg = d.querySelector('.xd-msg');
        if (a === 'add') { if (lv.length < 4) { lv.push({ ci: -1, order: 'asc' }); draw(); } }
        if (a === 'del') { if (lv.length > 1) { lv.pop(); draw(); } }
        if (a === 'cancel') { layer.hidden = true; layer.innerHTML = ''; win.style.paddingBottom = ''; drawPanel('Bạn đã đóng hộp thoại. Bấm lại nút <b>Sort</b> để mở lại.', 'bad'); stepIdx = Math.max(0, stepIdx - 1); drawPanel(); return; }
        if (a === 'ok') {
          var st = cur();
          var want = (st.levels || []).map(function (w) { return { ci: header.indexOf(w.col), order: w.order }; });
          var used = lv.filter(function (L) { return L.ci >= 0; });
          if (!used.length) { msg.hidden = false; msg.textContent = 'Chưa chọn cột ở ô Sort by.'; return; }
          var ok = st.do === 'sortDialog' && used.length === want.length && used.every(function (L, i) { return L.ci === want[i].ci && L.order === want[i].order; });
          if (!ok) {
            msg.hidden = false;
            msg.innerHTML = 'Chưa đúng yêu cầu. Cần: ' + want.map(function (w, i) {
              return (i ? 'rồi ' : '') + '<b>' + esc(header[w.ci]) + '</b> theo <b>' + SORT_ORDERS[isNum[w.ci] ? 'num' : 'text'].filter(function (o) { return o[0] === w.order; })[0][1] + '</b>';
            }).join(', ') + (want.length > 1 ? '. Dùng <b>Add Level</b> để thêm cấp.' : '.');
            wrongCount++;
            return;
          }
          layer.hidden = true; layer.innerHTML = ''; win.style.paddingBottom = '';
          applySort(used);
          next();
        }
      });
    }

    /* ---- menu bộ lọc ---- */
    function openFilter(ci) {
      layer.innerHTML = '';
      layer.hidden = false;
      var vals = [];
      rows.forEach(function (r) { var v = String(r.v[ci]); if (vals.indexOf(v) < 0) vals.push(v); });
      vals.sort(function (a, b) { return isNum[ci] ? a - b : a.localeCompare(b, 'vi'); });
      var cur0 = filters[ci] || vals.slice();
      var m = el('div', 'xfm');
      var arrow = win.querySelector('[data-id="arrow.' + ci + '"]');
      var wr = win.getBoundingClientRect(), ar = arrow.getBoundingClientRect();
      m.style.left = Math.max(4, Math.min(ar.left - wr.left - 4, wr.width - 268)) + 'px';
      m.style.top = (ar.bottom - wr.top + 2) + 'px';
      m.innerHTML = '<div class="xfm-i">' + ICONS.sortaz + ' Sort A to Z</div><div class="xfm-i">' + ICONS.sortza + ' Sort Z to A</div><div class="xfm-i dis">Sort by Color <span>›</span></div><hr>' +
        '<div class="xfm-i dis">Clear Filter From "' + esc(header[ci]) + '"</div><div class="xfm-i dis">Filter by Color <span>›</span></div><div class="xfm-i dis">' + (isNum[ci] ? 'Number' : 'Text') + ' Filters <span>›</span></div>' +
        '<div class="xfm-search">Search</div><div class="xfm-list"></div>' +
        '<div class="xfm-msg" hidden></div><div class="xfm-foot"><button type="button" class="xd-ok" data-a="ok">OK</button><button type="button" class="xd-cancel" data-a="cancel">Cancel</button></div>';
      layer.appendChild(m);
      var list = m.querySelector('.xfm-list');
      var checked = {};
      vals.forEach(function (v) { checked[v] = cur0.indexOf(v) >= 0; });
      function draw() {
        var all = vals.every(function (v) { return checked[v]; });
        var some = vals.some(function (v) { return checked[v]; });
        list.innerHTML = '<label><input type="checkbox" data-v="__all"' + (all ? ' checked' : '') + '> (Select All)</label>' +
          vals.map(function (v) { return '<label><input type="checkbox" data-v="' + esc(v) + '"' + (checked[v] ? ' checked' : '') + '> ' + esc(isNum[ci] ? (+v).toLocaleString('en-US') : v) + '</label>'; }).join('');
        list.querySelector('[data-v="__all"]').indeterminate = some && !all;
      }
      draw();
      var need = m.offsetTop + m.offsetHeight + 10 - win.clientHeight;
      if (need > 0) win.style.paddingBottom = need + 'px';
      list.addEventListener('change', function (e) {
        var v = e.target.dataset.v;
        if (v === '__all') vals.forEach(function (x) { checked[x] = e.target.checked; });
        else checked[v] = e.target.checked;
        draw();
      });
      m.addEventListener('click', function (e) {
        var a = e.target.dataset && e.target.dataset.a;
        if (a === 'cancel') { layer.hidden = true; layer.innerHTML = ''; win.style.paddingBottom = ''; stepIdx = Math.max(0, stepIdx - 1); drawPanel('Bạn đã đóng menu lọc. Bấm lại mũi tên ở tiêu đề cột để mở lại.', 'bad'); return; }
        if (a !== 'ok') return;
        var keep = vals.filter(function (v) { return checked[v]; });
        var st = cur();
        var msg = m.querySelector('.xfm-msg');
        if (!keep.length) { msg.hidden = false; msg.textContent = 'Phải chọn ít nhất một giá trị.'; return; }
        var want = (st.keep || []).map(String).sort();
        var ok = st.do === 'filterPick' && keep.slice().sort().join('|') === want.join('|');
        if (!ok) {
          msg.hidden = false;
          msg.innerHTML = 'Chưa đúng. Chỉ đánh dấu: <b>' + want.map(esc).join(', ') + '</b>. Mẹo: bỏ chọn <b>(Select All)</b> trước.';
          wrongCount++;
          return;
        }
        if (keep.length === vals.length) delete filters[ci]; else filters[ci] = keep;
        layer.hidden = true; layer.innerHTML = ''; win.style.paddingBottom = '';
        drawGrid();
        next();
      });
    }

    function reset() {
      rows = cfg.data.slice(1).map(function (r, i) { return { v: r, id: i }; });
      tab = cfg.tab || 'home'; setTab(win, tab);
      stepIdx = 0; wrongCount = 0; done = false; filterOn = false; filters = {}; selCell = null;
      fills = {}; frozen = false; colFmt = {}; win.style.paddingBottom = ''; layer.onclick = null;
      layer.hidden = true; layer.innerHTML = ''; win.style.paddingBottom = '';
      win.querySelector('.nb-text').textContent = 'A1';
      win.querySelector('.xw-fx').textContent = '';
      drawGrid(); drawPanel();
    }
    resetBtn.addEventListener('click', reset);
    layer.hidden = true;
    drawGrid();
    drawPanel();
    if (opts.completed) {
      panel.insertAdjacentHTML('beforeend', '<div class="sim-msg good">Bạn đã hoàn thành mô phỏng này. Có thể làm lại để ôn.</div>');
    }
  }

  window.ECC_XL = {
    icons: ICONS,
    window: windowBlock,
    sim: function (container, cfg, opts) { return new Sim(container, cfg, opts); }
  };
})();
