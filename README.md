# ExcelcungChinh

Web học Excel cho dân văn phòng. Bài giảng tiếng Việt, bảng tính thực hành ngay trên trình duyệt, chấm điểm tự động, bài kiểm tra mở khoá từng phần và trang tra cứu hàm.

## Cây thư mục

```
site/                 Toàn bộ web (chỉ thư mục này được đưa lên mạng)
  index.html
  css/style.css       Giao diện
  js/app.js           Các trang: trang chủ, lộ trình, bài học, kiểm tra, tra cứu, bảng nháp
  js/sheet.js         Bảng tính mini
  js/excelui.js       Hình giao diện Excel vẽ lại (Ribbon, hộp thoại) và mô phỏng bấm
  js/engine.js        Bộ tính và chấm công thức
  js/vendor/          Thư viện HyperFormula
  js/data/            NỘI DUNG BÀI HỌC: part1.js … part8.js, functions.js
tools/                Công cụ kiểm tra, không đưa lên web
docs/content-guide.md Hướng dẫn viết bài học
.github/workflows/    Tự đưa web lên GitHub Pages khi đẩy code lên nhánh main
```

## Chạy trên máy

Cần cài [Node.js](https://nodejs.org).

```
npm install
npm start          # mở http://localhost:8080
```

## Sửa hoặc thêm bài học

Nội dung nằm trong `site/js/data/`. Cách viết xem `docs/content-guide.md`. Sửa xong chạy:

```
npm run check      # soát lỗi nội dung và chấm thử mọi bài tập bằng đáp án chuẩn
npm test           # chạy thử web trên trình duyệt, ảnh chụp lưu ở shots/
```

## Đưa lên mạng

Đẩy code lên GitHub (nhánh `main`), vào **Settings › Pages › Source** chọn **GitHub Actions**. Web có địa chỉ `https://<tên-tài-khoản>.github.io/ExcelcungChinh`.
