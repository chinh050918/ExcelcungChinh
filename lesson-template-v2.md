# Khuôn bài học v2 (đã được chủ dự án duyệt)

Người học: **dân văn phòng Việt Nam, không phải dân IT, nhiều người mới dùng Excel.** Phản hồi của chủ dự án về bản cũ: *"nội dung khó hiểu, thiếu hình ảnh giao diện Excel thật để hình dung"*. Khuôn v2 sửa đúng 2 điểm này.

**Hai bài mẫu chuẩn, BẮT BUỘC đọc kỹ trước khi viết:**
- Bài dạy hàm: `site/js/data/part7.js`, bài `id: 'vlookup'`
- Bài dạy công cụ: `site/js/data/part8.js`, bài `id: 'sap-xep-loc'`

Quy tắc chung về dữ liệu, bài tập, giới hạn bộ tính: `docs/content-guide.md` (vẫn áp dụng).

## Thứ tự một bài dạy HÀM
1. `scenario`: tình huống văn phòng thật, 2 đoạn ngắn: vấn đề → hàm này giải quyết ra sao.
2. `p` "Hiểu nôm na": so sánh đời thường (tra danh bạ, đếm phiếu, chấm điểm…), 1–2 câu.
3. `h` + `anatomy`: mổ xẻ công thức tiêu biểu nhất của bài. Mỗi đối số có `label` tiếng Việt dễ hiểu ("Tìm cái gì", "Cộng vùng nào", "Điều kiện là gì") và `desc` 1–2 câu. Đối số là con số/chữ không phải vùng ô thì có thể đặt `range` để tô vùng liên quan.
4. `h` + `walk`: Excel tính từng bước, 4–7 bước, mỗi bước 1 câu, tô sáng ô đang xét (`hl`) và chọn ô (`select`). Bước cuối nói kết quả hiện ở đâu.
5. `h` "Làm trong Excel thật" + (tuỳ bài) `excelui` chỉ nút trên Ribbon (ví dụ Formulas › Math & Trig, Home › AutoSum) + `steps` các bước gõ công thức thật, có <kbd>phím</kbd>.
6. `tip`/`warn` + `table` lỗi hay gặp: nguyên nhân → ví dụ → cách sửa.
7. Các hàm phụ trong bài (ví dụ bài AVERAGE/MIN/MAX): mỗi hàm phụ một `h` + 1 câu + 1 `example` nhỏ, KHÔNG cần anatomy/walk cho từng hàm phụ.
8. 2–3 `quiz`.
9. `exercises`: **GIỮ NGUYÊN các bài tập hiện có** (id, data, answers/fill, solution). Chỉ được viết lại `task`, `hint`, `explain` cho dễ hiểu hơn.

## Thứ tự một bài dạy CÔNG CỤ (Phần 8)
1. `scenario`.
2. `h` "… nằm ở đâu?" + `excelui` có `marks` đánh số chỉ từng nút.
3. 1–3 khối `sim` (mô phỏng bấm), mỗi sim một thao tác chính, kèm `doneText` giải thích điều vừa xảy ra.
4. `warn`/`tip`/`table`, 3 `quiz`, giữ nguyên `exercises` nếu có.

Bài dạy hàm có thể chèn 1 `sim` khi có thao tác menu đáng tập (ví dụ AutoSum ở Home).

## Văn phong
- Câu ngắn, mỗi câu một ý. Nói như người hướng dẫn ngồi cạnh.
- Thuật ngữ tiếng Anh của Excel giữ nguyên nhưng giải thích ngay lần đầu: "Sort (sắp xếp)".
- Tên đối số: tiếng Việt trước. Nếu dùng block `syntax`, mỗi `args` có thể thêm phần tử thứ 3 là tên tiếng Việt: `['lookup_value', 'giải thích', 'Tìm cái gì']`.
- Không emoji, không dấu gạch ngang dài "—", không "lorem".

## Các block mới

### scenario
```js
{ t: 'scenario', html: '<p>…</p><p>…</p>' }      // title mặc định "Tình huống"
```

### anatomy (mổ xẻ công thức)
```js
{ t: 'anatomy', title: 'Bấm vào từng phần có màu…',
  data: [[...tiêu đề...], [...], ...], fmt: { G: 'int' },
  cell: 'C2', formula: '=VLOOKUP(A2,$E$2:$G$5,2,FALSE)',      // ô C2 để trống trong data
  parts: [ { label: 'Tìm cái gì', desc: '…' }, { label: '…', desc: '…', range: 'F2:F5' }, … ],   // số parts = số đối số
  note: 'tuỳ chọn' }
```
Chỉ hỗ trợ công thức dạng một hàm ngoài cùng `=HÀM(đối số, …)`. Với công thức lồng (IF(AND(...)...)) thì đối số là cả cụm `AND(...)`, vẫn được.

### walk (Excel tính từng bước)
```js
{ t: 'walk', title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
  data: [...], fmt: {...}, cell: 'C2', formula: '=…',
  steps: [ { html: 'Excel đọc ô <b>A2</b>…', hl: [['A2', 0], ['E2:E5', 1]], select: 'A2' }, … ] }
```
`hl`: mảng [vùng, số màu 0–5]. Màu 0 xanh dương, 1 xanh lá, 2 cam, 3 tím, 4 đỏ, 5 xanh ngọc. Nên dùng cùng màu với phần tương ứng trong anatomy.

### excelui (hình giao diện Excel, chỉ xem)
```js
{ t: 'excelui', tab: 'data', file: 'BaoCao.xlsx',
  groups: ['Sort & Filter', 'Data Tools'],            // tuỳ chọn: chỉ vẽ các nhóm này
  marks: [ { id: 'tab.data', n: 1, text: 'Bấm tab <b>Data</b>.' }, { id: 'data.sort', n: 2, text: '…' } ],
  caption: 'tuỳ chọn' }
```
- `tab`: home | insert | pagelayout | formulas | data | review | view
- Tên nhóm (groups) theo từng tab:
  - home: Clipboard, Font, Alignment, Number, Styles, Cells, Editing
  - insert: Tables, Illustrations, Charts, Sparklines, Filters
  - pagelayout: Page Setup, Scale to Fit
  - formulas: Function Library, Defined Names, Formula Auditing, Calculation
  - data: Get & Transform Data, Queries & Connections, Sort & Filter, Data Tools, Forecast, Outline
  - review: Proofing, Comments, Protect
  - view: Workbook Views, Show, Zoom, Window
- Thêm `fbar: true` (hoặc truyền `data` để vẽ bảng) thì cửa sổ có thanh công thức, tab Sheet và thanh trạng thái. Khi đó đánh số được cả: `ui.namebox` (Name Box), `ui.fxbtn` (nút fx), `ui.fx` (thanh công thức), `ui.colhead` (tiêu đề cột A), `ui.rowhead` (số hàng 1), `ui.cell` (ô đang chọn, đặt bằng `sel: 'B3'`), `ui.sheettab` (tab Sheet1), `ui.newsheet` (nút +), `ui.status` (thanh trạng thái). Có thể đặt `fx: '=SUM(B2:B5)'` để hiện nội dung thanh công thức.
- `id` của tab: `tab.home`, `tab.data`… `id` của nút: xem danh sách đầy đủ trong `tools/ribbon-ids.txt`. CHỈ dùng id có trong danh sách.

### sim (mô phỏng bấm trên cửa sổ Excel)
```js
{ t: 'sim', id: 'cf1', title: 'tuỳ chọn', task: 'Yêu cầu: …', file: 'X.xlsx', tab: 'home',
  data: [[tiêu đề…], [...], …],          // 4–10 dòng, giá trị số là số
  fmt: { D: 'int' },                     // int | vnd | pct | dec2
  steps: [ …các bước… ],
  doneText: 'Giải thích điều vừa xảy ra.' }
```
Các loại bước (`do`):
| do | trường | ý nghĩa |
|---|---|---|
| `cell` | text | bấm một ô bất kỳ trong bảng |
| `tab` | target: 'data', text | bấm đúng tab |
| `button` | target: 'home.condfmt', text, effect? | bấm đúng nút (id trong ribbon-ids.txt). Nút đặc biệt có hành vi riêng: `data.sort` mở hộp thoại Sort, `data.filter` bật nút lọc, `data.sortaz`/`data.sortza` sắp theo cột của ô đang chọn |
| `menu` | at: 'home.condfmt', items: ['Highlight Cells Rules ›', 'Top/Bottom Rules ›', '-', 'Data Bars ›'], answer: 'Highlight Cells Rules', text, effect? | menu thả xuống hiện dưới nút `at`, người học chọn đúng mục. `' ›'` cuối = có menu con, `'-'` = đường kẻ. `answer` ghi KHÔNG kèm ' ›'. Có thể nối nhiều bước menu liên tiếp (menu con). Bước menu phải đi ngay sau bước button/menu |
| `sortDialog` | levels: [{ col: 'Doanh thu', order: 'desc' }], text | hộp thoại Sort (chỉ sau bước button data.sort) |
| `filterArrow` | col: 'Khu vực', text | bấm nút ▾ ở tiêu đề cột (sau khi bật data.filter) |
| `filterPick` | keep: ['Miền Bắc'], text | chọn giá trị trong menu lọc rồi OK |

`effect` (tuỳ chọn, chạy khi bước đó hoàn thành) để bảng thay đổi giống Excel thật:
- `{ type: 'fill', col: 'Doanh thu', op: '>', value: 100000000, bg: '#ffc7ce', ink: '#9c0006', row: false }` tô ô thoả điều kiện. op: `>` `<` `>=` `<=` `=` `contains` `dup` (giá trị trùng) `top`/`bottom` (value = N). `row: true` tô cả dòng.
- `{ type: 'dedupe', cols: ['Mã KH'] }` xoá dòng trùng (giữ dòng đầu).
- `{ type: 'freeze' }` cố định dòng tiêu đề (vẽ vạch đậm dưới hàng 1).
- `{ type: 'numfmt', col: 'Doanh thu', fmt: 'vnd' }` đổi định dạng số của cột.
- `{ type: 'sort', col: 'Doanh thu', order: 'desc' }` sắp xếp.
Hộp thoại khác (Pivot, Data Validation, Format Cells…) KHÔNG mô phỏng được: dùng bước `menu` đến chỗ mở hộp thoại, rồi giải thích hộp thoại bằng `steps`/`table`.

Màu Excel chuẩn cho effect fill: đỏ nhạt `#ffc7ce`/chữ `#9c0006`, vàng `#ffeb9c`/`#9c5700`, xanh `#c6efce`/`#006100`.

## Kiểm tra bắt buộc
```
cd C:\Users\A\Documents\ExcelcungChinh
node tools/validate.js partN.js      # 0 lỗi
node tools/check-exercises.js        # sai: 0
```
Chạy thử trên trình duyệt (khuyến khích): server đang chạy ở http://localhost:8080 , mở `http://localhost:8080/?xem-truoc#/bai/pN/<id-bài>`. Có thể viết script puppeteer-core nhỏ (Chrome ở `C:/Program Files/Google/Chrome/Application/chrome.exe`) để mở các bài của phần mình, bắt `pageerror`, và bấm qua từng sim theo đúng steps để chắc sim hoàn thành được. Lưu ảnh chụp (nếu có) vào thư mục `shots/` .
