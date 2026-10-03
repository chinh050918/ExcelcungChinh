# ExcelcungChinh – Hướng dẫn viết nội dung

Web dạy Excel cho **dân văn phòng Việt Nam** (không phải dân IT). Viết tiếng Việt có dấu, giọng gần gũi, rõ ràng, chuyên nghiệp, câu ngắn. Ví dụ dùng dữ liệu văn phòng thật: lương, chấm công, bán hàng, kho, đơn hàng, vận chuyển/logistics, nhân sự, chi phí. Tên người Việt, tiền VNĐ.

Mẫu chuẩn để bắt chước: `C:\Users\A\Downloads\ExcelcungChinh\js\data\part1.js` — ĐỌC KỸ FILE NÀY TRƯỚC.

## Cấu trúc file phần (partN.js)

```js
ECC.addPart({
  id: 'p2', no: 2,
  title: 'Hàm tính toán',       // tên đầy đủ
  short: 'Tính toán',           // tên ngắn (1-2 từ)
  desc: '1-2 câu mô tả phần học',
  lessons: [ /* Lesson */ ],
  test: { mcq: [ /* MCQ, 10–12 câu */ ], practice: [ /* Exercise, 2–3 bài */ ] }
});
```

### Lesson
```js
{ id: 'sum', title: 'Hàm SUM: tính tổng', minutes: 8, funcs: ['SUM'],
  blocks: [ /* Block */ ],
  exercises: [ /* Exercise, thường 2–3 bài, bài sau khó hơn bài trước */ ] }
```
`funcs` = tên các hàm bài này dạy (để liên kết sang trang Tra cứu). Bài không có bài tập thì `exercises: []` và nên có ≥ 2 quiz.

### Block (nội dung lý thuyết, theo thứ tự hiển thị)
| t | trường | ghi chú |
|---|---|---|
| `p` | `html` | đoạn văn; được dùng `<b> <i> <code> <kbd>` |
| `h` | `text` | tiêu đề nhỏ |
| `list` | `items: [html]`, `ordered?: bool` | |
| `syntax` | `code: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])'`, `args: [['lookup_value','Bắt buộc. Giá trị cần tìm…'], …]` | cú pháp; tên đối số giữ tiếng Anh như Excel, giải thích tiếng Việt; đối số tuỳ chọn trong [ ] |
| `example` | `title`, `data` (bảng 2 chiều, công thức viết thẳng vào ô dạng chuỗi '=...'), `fmt?`, `note?` (html) | bảng chỉ xem, người học bấm vào ô công thức để xem công thức. Mọi công thức phải tính ra không lỗi |
| `tip` | `html` | mẹo (khung xanh) |
| `warn` | `html` | lỗi thường gặp / cảnh báo (khung vàng) |
| `table` | `head: [..]`, `rows: [[..]]` | bảng tĩnh (chuỗi, có thể có html đơn giản) |
| `steps` | `title?`, `items: [html]` | các bước thao tác trên Excel thật, ví dụ `Vào <b>Data › Sort</b>` |
| `keys` | `items: [['Ctrl + C','Sao chép'], …]` | bảng phím tắt |
| `quiz` | `id` (duy nhất trong bài, 'q1','q2'…), `q`, `options: [4 lựa chọn]`, `answer` (chỉ số 0-3), `explain` | câu hỏi nhanh trong bài |

Mỗi bài nên có: giải thích ngắn hàm dùng để làm gì (khi nào dùng ở văn phòng) → `syntax` → 1–2 `example` → `tip`/`warn` (lỗi hay gặp) → 1–2 `quiz`.

### Exercise (bài tập trên bảng tính mini, web tự chấm)
```js
{
  id: 'ex1',
  task: 'Đề bài (html). Nói rõ ô nào cần viết công thức, ví dụ <code>E2</code>.',
  data: [ ['Tiêu đề A','Tiêu đề B', ...], [giá trị...], ... ],   // hàng 0 là tiêu đề, bắt đầu từ ô A1
  answers: [ { cell: 'B8', solution: '=SUM(B2:B7)' } ],          // các ô đáp án riêng lẻ
  fill: { range: 'E2:E6', solution: '=C2*D2' },                   // HOẶC/VÀ: một vùng dùng cùng một công thức (viết cho ô đầu, tự dịch tham chiếu như sao chép trong Excel). Có thể là mảng nhiều vùng.
  mustUse: ['SUM'],          // tuỳ chọn: bắt buộc dùng hàm này (chỉ đặt khi bài muốn luyện đúng hàm đó)
  fmt: { E: 'int' },         // tuỳ chọn: định dạng hiển thị theo cột: int | dec1 | dec2 | pct | pct0 | date | time | vnd | raw
  hint: 'Gợi ý (html), nên đưa luôn công thức mẫu ở cuối gợi ý',
  explain: 'Giải thích sau khi làm đúng (html)'
}
```
Quy tắc chấm: web so **kết quả** công thức người học với kết quả của `solution` (cách viết khác mà đúng vẫn được điểm), bắt buộc ô phải là công thức, và thử lại với dữ liệu số bị đổi ngẫu nhiên để phát hiện gõ cứng. Vì vậy:
- Ô đáp án phải **để trống** trong `data` (hàng có thể ngắn hơn, hoặc bỏ trống phần cuối).
- Dữ liệu số là số JS (`1250000`, `0.1` cho 10% + fmt `pct`). Ngày viết chuỗi `'05/03/2024'` (dd/mm/yyyy). Chữ là chuỗi.
- Nếu đề có một "ô tham số" (tỉ giá, điều kiện, mã cần tra) hãy đặt nó trong bảng (thường ở cột F/G cạnh bảng chính, ví dụ `['', 'Tỉ giá', 25400]`) và `solution` tham chiếu tới ô đó.
- Bảng nhỏ gọn: ≤ 8 cột, ≤ 12 hàng.
- Phần test: `practice` không có hint/explain cũng được; độ khó tổng hợp cả phần.

### MCQ (bài test)
```js
{ q: 'Câu hỏi', options: ['A','B','C','D'], answer: 1, explain: 'Vì sao' }
```
Câu hỏi thực tế (đọc công thức đoán kết quả, chọn công thức đúng cho tình huống, sửa lỗi…). Không trùng lựa chọn.

## Giới hạn của bộ tính công thức (HyperFormula)
- Dùng dấu phẩy `,` ngăn đối số trong `solution` (web vẫn chấp nhận người học gõ `;`).
- **Không dùng** trong solution/example: FILTER, SORT, UNIQUE, SEQUENCE (mảng tràn), INDIRECT, OFFSET, hàm mảng Ctrl+Shift+Enter. Có thể nhắc tới chúng trong lý thuyết.
- Đã hỗ trợ (kể cả bổ sung riêng): AVERAGEIFS, CONCAT, RANK, RANK.EQ, XLOOKUP, IFS, SWITCH, MAXIFS, MINIFS, TEXTJOIN, DATEDIF, NETWORKDAYS, WORKDAY, EDATE, EOMONTH…
- TRUE/FALSE viết thường được (web tự xử lý).
- Hàm TEXT: chỉ dùng các mã định dạng đơn giản như "dd/mm/yyyy", "mm/yyyy", "0.00", "#,##0" — sau khi viết hãy chạy validate để chắc kết quả đúng như mong đợi (có thể in thử bằng node).

## Bắt buộc: chạy kiểm tra
```
cd C:\Users\A\Downloads\ExcelcungChinh-tools
node validate.js partN.js
```
Sửa đến khi **0 lỗi**. Cảnh báo "kết quả không đổi khi đổi dữ liệu số" là chấp nhận được với bài có kết quả là chữ/ngày; nếu bài cố ý như vậy có thể đặt `strict: false`.
Muốn thử một công thức nhanh:
```
node -e "global.window=global;global.HyperFormula=require('./node_modules/hyperformula').HyperFormula;require('../ExcelcungChinh/js/engine.js');const E=ECC_ENGINE;const hf=E.build([[1,2],[3,4]]);E.setCell(hf,'C1','=SUM(A1:B2)');console.log(E.getCell(hf,'C1'))"
```

## Không được
- Không sửa file khác ngoài file được giao.
- Không dùng emoji. Không lorem ipsum. Không dùng dấu gạch ngang dài "—" để chèn ý phụ; viết câu ngắn.
- Chuỗi JS dùng nháy đơn; nhớ escape `\'` khi trong chuỗi có nháy đơn.
