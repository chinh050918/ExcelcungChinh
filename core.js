/* Kho dữ liệu khoá học. Mỗi file partN.js gọi ECC.addPart(...), functions.js gọi ECC.addFuncs(...) */
window.ECC = {
  parts: [],
  funcs: [],
  addPart: function (p) {
    this.parts.push(p);
    this.parts.sort(function (a, b) { return a.no - b.no; });
  },
  addFuncs: function (list) {
    this.funcs = this.funcs.concat(list);
  }
};
