ECC.addPart({
  id: 'p2',
  no: 2,
  title: 'Hàm tính toán và thống kê',
  short: 'Tính toán',
  desc: 'Các hàm dân văn phòng dùng hằng ngày: tính tổng, trung bình, đếm, làm tròn tiền, nhân số lượng với đơn giá và xếp hạng nhân viên. Học xong phần này bạn tự làm được bảng lương, bảng doanh số và báo cáo kho.',
  lessons: [
    /* ---------------- Bài 1 ---------------- */
    {
      id: 'sum',
      title: 'Hàm SUM: tính tổng',
      minutes: 12,
      funcs: ['SUM'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Cuối tháng, kế toán cần báo cáo <b>tổng chi phí văn phòng</b>. Bảng có từng khoản: giấy in, mực in, nước uống, điện thoại…</p><p>Bấm máy tính cộng từng số thì dễ sót, và chỉ cần sửa một khoản là phải cộng lại từ đầu. Hàm <b>SUM</b> cộng cả cột bằng một công thức. Sửa số nào, tổng tự cập nhật ngay.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> SUM giống máy tính tiền ở siêu thị. Bạn bỏ các món vào giỏ (chọn vùng ô), máy cộng tất cả lại và đưa ra một con số tổng.' },
        { t: 'h', text: 'Công thức SUM gồm những gì?' },
        {
          t: 'anatomy',
          title: 'Bấm vào phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Khoản chi', 'Số tiền'],
            ['Giấy in', 1250000],
            ['Mực in', 2100000],
            ['Nước uống', 860000],
            ['Điện thoại', 1540000],
            ['Tổng', '']
          ],
          fmt: { B: 'int' },
          cell: 'B6',
          formula: '=SUM(B2:B5)',
          parts: [
            { label: 'Cộng vùng nào', desc: 'Vùng ô cần cộng, viết bằng <b>ô đầu : ô cuối</b>. <code>B2:B5</code> nghĩa là từ ô B2 đến ô B5, gồm 4 ô.' }
          ],
          note: 'Muốn cộng thêm vùng khác, thêm dấu phẩy rồi ghi vùng đó: <code>=SUM(B2:B5,D2:D5)</code>. SUM nhận tối đa 255 vùng.'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Khoản chi', 'Số tiền'],
            ['Giấy in', 1250000],
            ['Mực in', 2100000],
            ['Nước uống', 860000],
            ['Điện thoại', 1540000],
            ['Tổng', '']
          ],
          fmt: { B: 'int' },
          cell: 'B6',
          formula: '=SUM(B2:B5)',
          steps: [
            { html: 'Excel đọc vùng <b>B2:B5</b>: 4 ô từ B2 đến B5.', hl: [['B2:B5', 0]], select: 'B2' },
            { html: 'Lấy ô <b>B2</b>: 1.250.000. Tổng tạm là <b>1.250.000</b>.', hl: [['B2', 1]], select: 'B2' },
            { html: 'Cộng thêm ô <b>B3</b>: 2.100.000. Tổng tạm là <b>3.350.000</b>.', hl: [['B2', 1], ['B3', 2]], select: 'B3' },
            { html: 'Cộng thêm ô <b>B4</b>: 860.000. Tổng tạm là <b>4.210.000</b>.', hl: [['B2:B3', 1], ['B4', 2]], select: 'B4' },
            { html: 'Cộng thêm ô <b>B5</b>: 1.540.000. Tổng là <b>5.750.000</b>.', hl: [['B2:B4', 1], ['B5', 2]], select: 'B5' },
            { html: 'Kết quả <b>5.750.000</b> hiện ở ô B6. Sửa một khoản bất kỳ, ô B6 tự tính lại.', hl: [['B6', 2]], select: 'B6' }
          ]
        },
        { t: 'h', text: 'Ba cách dùng SUM' },
        {
          t: 'table',
          head: ['Cách viết', 'Ý nghĩa'],
          rows: [
            ['<code>=SUM(B2,B5,B7)</code>', 'Cộng các ô rời nhau'],
            ['<code>=SUM(B2:B7)</code>', 'Cộng cả một vùng liền nhau'],
            ['<code>=SUM(B2:B7,D2:D7)</code>', 'Cộng nhiều vùng cùng lúc']
          ]
        },
        {
          t: 'example',
          title: 'Tổng chi phí văn phòng phẩm theo quý',
          data: [
            ['Khoản chi', 'Quý 1', 'Quý 2', 'Cả năm (2 quý)'],
            ['Giấy in', 1250000, 1480000, '=SUM(B2:C2)'],
            ['Mực in', 2100000, 1850000, '=SUM(B3:C3)'],
            ['Văn phòng phẩm', 760000, 920000, '=SUM(B4:C4)'],
            ['Tổng', '=SUM(B2:B4)', '=SUM(C2:C4)', '=SUM(B2:C4)']
          ],
          fmt: { B: 'int', C: 'int', D: 'int' },
          note: 'Bấm vào các ô có công thức để xem. Cột D cộng theo hàng, hàng 5 cộng theo cột. Ô D5 cộng cả khối <code>B2:C4</code> một lần, kết quả bằng B5 + C5.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'home',
          file: 'ChiPhi_T3.xlsx',
          groups: ['Font', 'Number', 'Editing'],
          marks: [
            { id: 'tab.home', n: 1, text: 'Bấm tab <b>Home</b> (Trang chủ).' },
            { id: 'home.autosum', n: 2, text: 'Bấm nút <b>AutoSum</b> (tự động tính tổng, biểu tượng Σ). Excel tự viết hàm SUM và đoán vùng cần cộng.' }
          ],
          caption: 'Phím tắt của AutoSum là Alt + =. Nút này cũng có ở tab Formulas.'
        },
        { t: 'p', html: 'Tập bấm AutoSum trên cửa sổ Excel mô phỏng bên dưới. Bấm nhầm chỗ, web sẽ nhắc. Nhầm 2 lần, chỗ cần bấm sẽ được tô sáng.' },
        {
          t: 'sim', id: 'autosum1',
          task: 'Yêu cầu: dùng AutoSum tính tổng doanh thu 4 tuần ở ô B6.',
          file: 'DoanhThu_T3.xlsx',
          tab: 'insert',
          data: [
            ['Tuần', 'Doanh thu'],
            ['Tuần 1', 45200000],
            ['Tuần 2', 51800000],
            ['Tuần 3', 38600000],
            ['Tuần 4', 62400000],
            ['Tổng', '']
          ],
          fmt: { B: 'int' },
          steps: [
            { do: 'cell', text: 'Bấm vào ô <b>B6</b>: ô trống ngay dưới cột Doanh thu, nơi sẽ hiện tổng.' },
            { do: 'tab', target: 'home', text: 'Cửa sổ đang mở tab Insert. Bấm tab <b>Home</b>.' },
            { do: 'button', target: 'home.autosum', text: 'Bấm nút <b>AutoSum</b> (Σ) ở nhóm Editing, góc phải Ribbon.' }
          ],
          doneText: 'Excel tự viết <code>=SUM(B2:B5)</code> vào ô B6 và viền nhấp nháy quanh vùng B2:B5 để bạn kiểm tra. Vùng đúng thì nhấn <kbd>Enter</kbd>, ô B6 hiện <b>198.000.000</b>.'
        },
        {
          t: 'steps',
          title: 'Cách khác: gõ công thức trực tiếp',
          items: [
            'Bấm vào ô cần hiện tổng, ví dụ <b>B6</b>.',
            'Gõ <code>=SUM(</code>. Excel hiện dòng gợi ý ngay dưới ô.',
            'Kéo chuột chọn vùng <b>B2:B5</b>. Excel tự điền <code>B2:B5</code> vào công thức.',
            'Gõ dấu đóng ngoặc <code>)</code> rồi nhấn <kbd>Enter</kbd>.'
          ]
        },
        { t: 'tip', html: 'Chọn cả bảng số <b>cùng với</b> hàng trống bên dưới và cột trống bên phải, rồi nhấn <kbd>Alt</kbd> + <kbd>=</kbd>. Excel điền tổng cho tất cả các hàng và các cột cùng lúc.' },
        { t: 'h', text: 'Lỗi hay gặp với SUM' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Số bị lưu dạng chữ', 'Số dán từ phần mềm khác, căn lề trái, góc ô có tam giác xanh. SUM bỏ qua nên tổng bị thiếu', 'Chọn ô, bấm biểu tượng cảnh báo, chọn <b>Convert to Number</b> (chuyển thành số)'],
            ['AutoSum đoán sai vùng', 'Giữa cột có một ô trống, AutoSum chỉ lấy phần bên dưới ô trống', 'Nhìn viền nhấp nháy trước khi Enter. Sai thì kéo chọn lại vùng đúng'],
            ['Cộng lẫn cả dòng Tổng', '<code>=SUM(B2:B10)</code> mà B10 là dòng tổng phụ, kết quả bị gấp đôi', 'Chỉ chọn các dòng chi tiết'],
            ['Dùng dấu hai chấm thay dấu phẩy', '<code>=SUM(B2:D5)</code> cộng cả khối B2 đến D5, kể cả cột C', 'Cộng hai vùng rời thì ngăn bằng dấu phẩy: <code>=SUM(B2:B5,D2:D5)</code>']
          ]
        },
        { t: 'warn', html: 'SUM <b>không báo lỗi</b> khi bỏ qua ô chứa chữ. Khi nghi ngờ, hãy chọn cả cột số và nhìn chữ <b>Sum</b> trên thanh trạng thái phía dưới để so với kết quả công thức.' },
        {
          t: 'quiz', id: 'q1',
          q: 'B2 = 100, B3 = 200, B4 = "abc", B5 = 300. Công thức =SUM(B2:B5) ra bao nhiêu?',
          options: ['600', '#VALUE!', '300', '0'],
          answer: 0,
          explain: 'SUM bỏ qua ô chứa chữ, chỉ cộng 100 + 200 + 300 = 600.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Muốn cộng vùng B2:B10 và thêm ô D5, viết thế nào?',
          options: ['=SUM(B2:B10:D5)', '=SUM(B2:B10,D5)', '=SUM(B2-B10,D5)', '=SUM(B2:D5)'],
          answer: 1,
          explain: 'Các vùng hoặc ô khác nhau ngăn cách bằng dấu phẩy. B2:D5 sẽ cộng cả khối từ B2 đến D5, không đúng ý.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Bạn bấm ô B8 (ngay dưới cột số B2:B7) rồi nhấn Alt + =. Excel làm gì?',
          options: ['Lưu file', 'Tự viết =SUM(B2:B7) vào ô B8 để bạn kiểm tra rồi Enter', 'Xoá cột B', 'Sắp xếp cột B'],
          answer: 1,
          explain: 'Alt + = là phím tắt của AutoSum. Excel đoán vùng số ngay phía trên và viết sẵn hàm SUM.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tính <b>tổng doanh thu</b> của cả 6 cửa hàng ở ô <code>B8</code> bằng hàm SUM.',
          data: [
            ['Cửa hàng', 'Doanh thu'],
            ['Cầu Giấy', 185000000],
            ['Đống Đa', 142500000],
            ['Hai Bà Trưng', 168000000],
            ['Long Biên', 97500000],
            ['Hà Đông', 121000000],
            ['Thanh Xuân', 156800000],
            ['Tổng']
          ],
          answers: [{ cell: 'B8', solution: '=SUM(B2:B7)' }],
          mustUse: ['SUM'],
          fmt: { B: 'int' },
          hint: 'Cộng cả vùng từ B2 đến B7: <code>=SUM(B2:B7)</code>.',
          explain: 'Vùng liền nhau viết bằng ô đầu : ô cuối. Thêm cửa hàng mới thì chèn hàng ở giữa vùng, SUM tự mở rộng theo.'
        },
        {
          id: 'ex2',
          task: 'Bảng chấm công làm thêm giờ. Tính <b>tổng giờ làm thêm</b> của mỗi nhân viên trong 4 tuần ở cột F. Viết ở <code>F2</code> rồi sao chép xuống F3:F6.',
          data: [
            ['Nhân viên', 'Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tổng giờ'],
            ['Nguyễn Thị Mai', 4, 6, 2, 5],
            ['Trần Văn Tuấn', 8, 3, 7, 6],
            ['Lê Thu Hà', 0, 2, 4, 3],
            ['Phạm Minh Đức', 5, 5, 6, 8],
            ['Vũ Hồng Nhung', 3, 7, 1, 4]
          ],
          fill: { range: 'F2:F6', solution: '=SUM(B2:E2)' },
          mustUse: ['SUM'],
          hint: 'Lần này cộng theo hàng ngang: <code>=SUM(B2:E2)</code>. Sao chép xuống thì tự thành B3:E3, B4:E4…',
          explain: 'SUM cộng theo hàng hay theo cột đều được. Nhờ tham chiếu tương đối, một công thức dùng được cho cả cột.'
        },
        {
          id: 'ex3',
          task: 'Kho có hai khu A và B. Ở ô <code>B8</code>, tính <b>tổng tồn kho của cả hai khu</b> bằng <b>một</b> hàm SUM cộng hai vùng <code>B2:B6</code> và <code>D2:D6</code>.',
          data: [
            ['Mã hàng (Khu A)', 'Tồn Khu A', 'Mã hàng (Khu B)', 'Tồn Khu B'],
            ['TH-001', 320, 'TH-101', 150],
            ['TH-002', 85, 'TH-102', 410],
            ['TH-003', 140, 'TH-103', 95],
            ['TH-004', 260, 'TH-104', 180],
            ['TH-005', 75, 'TH-105', 230],
            [],
            ['Tổng tồn kho']
          ],
          answers: [{ cell: 'B8', solution: '=SUM(B2:B6,D2:D6)' }],
          mustUse: ['SUM'],
          hint: 'Hai vùng ngăn nhau bằng dấu phẩy: <code>=SUM(B2:B6,D2:D6)</code>.',
          explain: 'Mỗi đối số của SUM có thể là một vùng. Không nên viết B2:D6 vì sẽ quét cả cột mã hàng ở giữa. SUM bỏ qua chữ nên lần này vẫn đúng, nhưng nếu cột giữa là cột số khác thì tổng sẽ sai.'
        }
      ]
    },

    /* ---------------- Bài 2 ---------------- */
    {
      id: 'trung-binh',
      title: 'AVERAGE, MIN, MAX: trung bình, nhỏ nhất, lớn nhất',
      minutes: 12,
      funcs: ['AVERAGE', 'MIN', 'MAX'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Trưởng phòng kinh doanh hỏi: <b>"Tháng này mỗi bạn bán được trung bình bao nhiêu? Ai cao nhất, ai thấp nhất?"</b></p><p>Cộng tay rồi chia, dò từng dòng để tìm số lớn nhất thì vừa lâu vừa dễ nhầm. Ba hàm <b>AVERAGE</b> (trung bình), <b>MIN</b> (nhỏ nhất) và <b>MAX</b> (lớn nhất) trả lời ngay, bảng dài bao nhiêu cũng vậy.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> AVERAGE giống <b>chia đều</b>: gom hết lại rồi chia cho số người. MIN và MAX giống xếp mọi người thành hàng theo chiều cao rồi chỉ ra người thấp nhất và người cao nhất.' },
        { t: 'h', text: 'Công thức AVERAGE gồm những gì?' },
        {
          t: 'anatomy',
          title: 'Bấm vào phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Nhân viên', 'Doanh số'],
            ['Mai', 120000000],
            ['Tuấn', null],
            ['Hà', 95000000],
            ['Phong', 140000000],
            ['Linh', 105000000],
            ['Trung bình', '']
          ],
          fmt: { B: 'int' },
          cell: 'B7',
          formula: '=AVERAGE(B2:B6)',
          parts: [
            { label: 'Tính trung bình vùng nào', desc: 'Vùng chứa các con số. Ô <b>trống</b> và ô chứa <b>chữ</b> trong vùng bị bỏ qua, không tính vào số người chia.' }
          ],
          note: 'Tuấn nghỉ phép nên ô B3 để trống. AVERAGE chỉ tính trên 4 người có số liệu.'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Nhân viên', 'Doanh số'],
            ['Mai', 120000000],
            ['Tuấn', null],
            ['Hà', 95000000],
            ['Phong', 140000000],
            ['Linh', 105000000],
            ['Trung bình', '']
          ],
          fmt: { B: 'int' },
          cell: 'B7',
          formula: '=AVERAGE(B2:B6)',
          steps: [
            { html: 'Excel đọc vùng <b>B2:B6</b>: 5 ô.', hl: [['B2:B6', 0]], select: 'B2' },
            { html: 'Ô <b>B3</b> trống nên bị <b>bỏ qua</b>: không cộng, cũng không đếm.', hl: [['B2:B6', 0], ['B3', 4]], select: 'B3' },
            { html: 'Cộng 4 ô có số: 120 + 95 + 140 + 105 = <b>460 triệu</b>.', hl: [['B2', 1], ['B4:B6', 1]], select: 'B6' },
            { html: 'Đếm số ô có số: <b>4 ô</b>.', hl: [['B2', 2], ['B4:B6', 2]], select: 'B2' },
            { html: 'Chia: 460.000.000 / 4 = <b>115.000.000</b>.', hl: [['B2', 1], ['B4:B6', 1]], select: 'B4' },
            { html: 'Kết quả <b>115.000.000</b> hiện ở ô B7. Nếu gõ số 0 vào B3, Excel sẽ chia cho 5 và ra 92.000.000.', hl: [['B7', 2]], select: 'B7' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'home',
          file: 'DoanhSo_T3.xlsx',
          groups: ['Number', 'Editing'],
          marks: [
            { id: 'tab.home', n: 1, text: 'Bấm tab <b>Home</b>.' },
            { id: 'home.autosum', n: 2, text: 'Bấm mũi tên nhỏ ▾ cạnh <b>AutoSum</b>. Menu có <b>Average</b> (trung bình), <b>Max</b> (lớn nhất), <b>Min</b> (nhỏ nhất).' }
          ],
          caption: 'Cùng menu này cũng có ở tab Formulas › AutoSum.'
        },
        {
          t: 'sim', id: 'avg1',
          task: 'Yêu cầu: dùng menu AutoSum tính doanh số trung bình ở ô B7.',
          file: 'DoanhSo_T3.xlsx',
          tab: 'home',
          data: [
            ['Nhân viên', 'Doanh số'],
            ['Mai', 120000000],
            ['Hà', 95000000],
            ['Phong', 140000000],
            ['Linh', 105000000],
            ['Quân', 88000000],
            ['Trung bình', '']
          ],
          fmt: { B: 'int' },
          steps: [
            { do: 'cell', text: 'Bấm vào ô <b>B7</b>, ngay dưới cột Doanh số.' },
            { do: 'button', target: 'home.autosum', text: 'Tab Home đang mở. Bấm vào mũi tên ▾ của nút <b>AutoSum</b>.' },
            { do: 'menu', at: 'home.autosum', items: ['Sum', 'Average', 'Count Numbers', 'Max', 'Min', '-', 'More Functions...'], answer: 'Average', text: 'Chọn <b>Average</b>.' }
          ],
          doneText: 'Excel viết <code>=AVERAGE(B2:B6)</code> vào ô B7. Nhấn <kbd>Enter</kbd> là có kết quả <b>109.600.000</b>. Chọn Max hoặc Min thì Excel viết hàm MAX, MIN theo cách y hệt.'
        },
        {
          t: 'steps',
          title: 'Cách khác: gõ công thức trực tiếp',
          items: [
            'Bấm vào ô cần hiện kết quả, ví dụ <b>B7</b>.',
            'Gõ <code>=AVERAGE(</code> rồi kéo chuột chọn vùng <b>B2:B6</b>.',
            'Gõ <code>)</code> và nhấn <kbd>Enter</kbd>.',
            'Muốn tìm lớn nhất, nhỏ nhất thì chỉ đổi tên hàm: <code>=MAX(B2:B6)</code>, <code>=MIN(B2:B6)</code>.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp với AVERAGE' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Gõ 0 thay vì để trống', 'Nhân viên nghỉ cả tháng bị gõ 0, trung bình cả nhóm bị kéo xuống', 'Không muốn tính người đó thì để trống ô'],
            ['Vùng không có số nào', 'Cột chưa nhập gì, AVERAGE báo <code>#DIV/0!</code> (chia cho 0)', 'Nhập số liệu trước, hoặc kiểm tra lại vùng'],
            ['Lấy lẫn dòng Tổng', '<code>=AVERAGE(B2:B8)</code> mà B8 là ô tổng, kết quả bị đội lên', 'Chỉ chọn các dòng chi tiết'],
            ['Số lưu dạng chữ', 'Số dán từ phần mềm khác bị bỏ qua, chia cho ít người hơn', 'Chuyển về dạng số (Convert to Number)']
          ]
        },
        { t: 'h', text: 'MIN: tìm số nhỏ nhất' },
        { t: 'p', html: '<code>=MIN(vùng)</code> trả về số nhỏ nhất trong vùng. Dùng để tìm chuyến giao nhanh nhất, báo giá rẻ nhất, tồn kho thấp nhất.' },
        {
          t: 'example',
          title: 'Thời gian giao hàng nhanh nhất',
          data: [
            ['Mã chuyến', 'Thời gian (phút)', '', 'Nhanh nhất'],
            ['CX-01', 42, '', '=MIN(B2:B5)'],
            ['CX-02', 35],
            ['CX-03', 58],
            ['CX-04', 31]
          ],
          note: 'Giao nhanh nhất là tốn ít phút nhất, nên dùng MIN: 31 phút.'
        },
        { t: 'h', text: 'MAX: tìm số lớn nhất' },
        { t: 'p', html: '<code>=MAX(vùng)</code> trả về số lớn nhất trong vùng. Dùng để tìm đơn hàng lớn nhất, lương cao nhất, ngày nhập gần nhất.' },
        {
          t: 'example',
          title: 'Đơn hàng giá trị lớn nhất',
          data: [
            ['Mã đơn', 'Giá trị', '', 'Lớn nhất'],
            ['DH101', 48500000, '', '=MAX(B2:B5)'],
            ['DH102', 125000000],
            ['DH103', 36200000],
            ['DH104', 92800000]
          ],
          fmt: { B: 'int', D: 'int' },
          note: 'Đơn DH102 lớn nhất: 125.000.000.'
        },
        { t: 'h', text: 'Kết hợp cả ba trong một bảng thống kê' },
        {
          t: 'example',
          title: 'Thống kê lương phòng Kinh doanh',
          data: [
            ['Nhân viên', 'Lương', '', 'Chỉ số', 'Giá trị'],
            ['Hoàng Anh', 12500000, '', 'Trung bình', '=AVERAGE(B2:B6)'],
            ['Thu Trang', 9800000, '', 'Thấp nhất', '=MIN(B2:B6)'],
            ['Quốc Bảo', 15200000, '', 'Cao nhất', '=MAX(B2:B6)'],
            ['Ngọc Lan', 11000000, '', 'Chênh lệch', '=E4-E3'],
            ['Đức Thịnh', 13600000]
          ],
          fmt: { B: 'int', E: 'int' },
          note: 'Chênh lệch giữa người cao nhất và thấp nhất là MAX trừ MIN, rất hay dùng trong báo cáo nhân sự.'
        },
        { t: 'tip', html: 'Muốn làm tròn kết quả trung bình, lồng vào ROUND: <code>=ROUND(AVERAGE(B2:B6),0)</code>. Bạn sẽ học ROUND ở bài 4.' },
        {
          t: 'quiz', id: 'q1',
          q: 'B2:B5 lần lượt là 10, 20, (ô trống), 30. =AVERAGE(B2:B5) ra bao nhiêu?',
          options: ['15', '20', '60', '#DIV/0!'],
          answer: 1,
          explain: 'Ô trống bị bỏ qua, nên trung bình của 3 số: (10 + 20 + 30) / 3 = 20.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Cột C ghi thời gian giao hàng (giờ) của các chuyến. Tìm chuyến giao nhanh nhất dùng hàm nào?',
          options: ['MAX', 'MIN', 'AVERAGE', 'SUM'],
          answer: 1,
          explain: 'Giao nhanh nhất là thời gian ít nhất, nên dùng MIN.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'B2:B4 lần lượt là 10, 0, 20. =AVERAGE(B2:B4) ra bao nhiêu?',
          options: ['15', '10', '30', '#DIV/0!'],
          answer: 1,
          explain: 'Số 0 vẫn là số nên được tính: (10 + 0 + 20) / 3 = 10. Chỉ ô trống mới bị bỏ qua.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tính <b>điểm KPI trung bình</b> của nhóm ở ô <code>B8</code>.',
          data: [
            ['Nhân viên', 'Điểm KPI'],
            ['Nguyễn Văn Nam', 86],
            ['Trần Thị Hoa', 92],
            ['Lê Văn Khoa', 78],
            ['Đỗ Thị Yến', 95],
            ['Bùi Quang Huy', 81],
            ['Phan Thanh Tâm', 88],
            ['Trung bình']
          ],
          answers: [{ cell: 'B8', solution: '=AVERAGE(B2:B7)' }],
          mustUse: ['AVERAGE'],
          fmt: { B: 'dec1' },
          hint: 'Lấy trung bình vùng B2:B7: <code>=AVERAGE(B2:B7)</code>.',
          explain: 'AVERAGE = tổng chia cho số ô có số. Viết =SUM(B2:B7)/6 cũng ra, nhưng AVERAGE gọn hơn và bạn không phải tự đếm số người.'
        },
        {
          id: 'ex2',
          task: 'Bảng chuyến xe giao hàng. Tính ở cột F: <code>F2</code> là <b>khối lượng nhỏ nhất</b>, <code>F3</code> là <b>khối lượng lớn nhất</b>, <code>F4</code> là <b>khối lượng trung bình</b> mỗi chuyến (cột C).',
          data: [
            ['Mã chuyến', 'Tài xế', 'Khối lượng (kg)', '', 'Chỉ số', 'Kết quả'],
            ['CX-0301', 'Hùng', 1850, '', 'Nhỏ nhất'],
            ['CX-0302', 'Sơn', 2420, '', 'Lớn nhất'],
            ['CX-0303', 'Lâm', 960, '', 'Trung bình'],
            ['CX-0304', 'Hùng', 3150],
            ['CX-0305', 'Toàn', 2780],
            ['CX-0306', 'Sơn', 1470],
            ['CX-0307', 'Lâm', 2030]
          ],
          answers: [
            { cell: 'F2', solution: '=MIN(C2:C8)' },
            { cell: 'F3', solution: '=MAX(C2:C8)' },
            { cell: 'F4', solution: '=AVERAGE(C2:C8)' }
          ],
          fmt: { C: 'int', F: 'dec1' },
          hint: 'Cả ba ô đều xét vùng C2:C8, chỉ khác tên hàm. F2: <code>=MIN(C2:C8)</code>, F3: <code>=MAX(C2:C8)</code>, F4: <code>=AVERAGE(C2:C8)</code>.',
          explain: 'Ba hàm có cách viết giống hệt nhau, chỉ khác tên. Đây là bộ ba thống kê nhanh cho mọi cột số.'
        },
        {
          id: 'ex3',
          task: 'Tính <b>mức chênh lệch</b> giữa đơn giá cao nhất và thấp nhất của các nhà cung cấp ở ô <code>B8</code> (lấy cao nhất trừ thấp nhất) trong <b>một</b> công thức.',
          data: [
            ['Nhà cung cấp', 'Đơn giá giấy A4 (ram)'],
            ['Công ty Hồng Hà', 72000],
            ['Văn phòng phẩm Thiên Long', 68500],
            ['Công ty Phú Gia', 75000],
            ['Nhà sách Fahasa', 70000],
            ['Đại lý Minh Châu', 66000],
            [],
            ['Chênh lệch']
          ],
          answers: [{ cell: 'B8', solution: '=MAX(B2:B6)-MIN(B2:B6)' }],
          mustUse: ['MAX', 'MIN'],
          fmt: { B: 'int' },
          hint: 'Lấy kết quả của hai hàm trừ cho nhau: <code>=MAX(B2:B6)-MIN(B2:B6)</code>.',
          explain: 'Mỗi hàm trả về một con số, nên có thể cộng trừ nhân chia với nhau như số bình thường. Phòng mua hàng hay dùng chỉ số này khi so sánh báo giá.'
        }
      ]
    },

    /* ---------------- Bài 3 ---------------- */
    {
      id: 'dem',
      title: 'Hàm đếm: COUNT, COUNTA, COUNTBLANK',
      minutes: 12,
      funcs: ['COUNT', 'COUNTA', 'COUNTBLANK'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Thứ Hai nào sếp cũng hỏi: <b>"Bao nhiêu bạn đã nộp số liệu tuần? Còn bao nhiêu bạn chưa nộp?"</b></p><p>Danh sách dài, có ô ghi số, có ô ghi "Nghỉ phép", có ô để trống. Đếm bằng mắt rất dễ sót. Nhóm hàm đếm <b>COUNT</b>, <b>COUNTA</b>, <b>COUNTBLANK</b> đếm giúp bạn, và tự đếm lại khi có người nộp thêm.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> giống điểm danh lớp học. <b>COUNT</b> chỉ đếm bạn nào đã có <b>điểm số</b>. <b>COUNTA</b> đếm mọi bạn có <b>ghi gì đó</b> vào sổ. <b>COUNTBLANK</b> đếm những dòng còn <b>bỏ trống</b>.' },
        {
          t: 'table',
          head: ['Hàm', 'Đếm ô nào', 'Ví dụ dùng'],
          rows: [
            ['COUNT', 'Chỉ ô chứa <b>số</b> (kể cả ngày, vì ngày cũng là số)', 'Đếm số người đã có điểm, đã có doanh số'],
            ['COUNTA', 'Mọi ô <b>không trống</b> (số, chữ, ngày…)', 'Đếm số nhân viên theo cột Họ tên'],
            ['COUNTBLANK', 'Ô <b>trống</b>', 'Đếm số ô chưa nhập, số người chưa nộp báo cáo']
          ]
        },
        { t: 'h', text: 'Công thức COUNT gồm những gì?' },
        {
          t: 'anatomy',
          title: 'Bấm vào phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Nhân viên', 'Số đơn chốt'],
            ['Mai', 12],
            ['Tuấn', null],
            ['Hà', 8],
            ['Phong', 'Nghỉ phép'],
            ['Linh', 15],
            ['Quân', 0],
            ['Đã nộp số liệu', '']
          ],
          cell: 'B8',
          formula: '=COUNT(B2:B7)',
          parts: [
            { label: 'Đếm trong vùng nào', desc: 'Vùng cần đếm. COUNT chỉ đếm những ô trong vùng có chứa <b>số</b>. Ô trống và ô chữ không được đếm.' }
          ],
          note: 'COUNT không cộng các số lại. Nó chỉ đếm xem có bao nhiêu ô chứa số.'
        },
        { t: 'h', text: 'Excel đếm như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Nhân viên', 'Số đơn chốt'],
            ['Mai', 12],
            ['Tuấn', null],
            ['Hà', 8],
            ['Phong', 'Nghỉ phép'],
            ['Linh', 15],
            ['Quân', 0],
            ['Đã nộp số liệu', '']
          ],
          cell: 'B8',
          formula: '=COUNT(B2:B7)',
          steps: [
            { html: 'Excel xét vùng <b>B2:B7</b>: 6 ô, lần lượt từ trên xuống.', hl: [['B2:B7', 0]], select: 'B2' },
            { html: 'Ô <b>B2</b> là số 12: đếm <b>1</b>.', hl: [['B2', 1]], select: 'B2' },
            { html: 'Ô <b>B3</b> trống: bỏ qua.', hl: [['B2', 1], ['B3', 4]], select: 'B3' },
            { html: 'Ô <b>B4</b> là số 8: đếm <b>2</b>.', hl: [['B2', 1], ['B4', 1]], select: 'B4' },
            { html: 'Ô <b>B5</b> ghi "Nghỉ phép" là chữ: bỏ qua.', hl: [['B2', 1], ['B4', 1], ['B5', 4]], select: 'B5' },
            { html: 'Ô <b>B6</b> là 15: đếm <b>3</b>. Ô <b>B7</b> là 0, vẫn là số: đếm <b>4</b>.', hl: [['B2', 1], ['B4', 1], ['B6:B7', 1]], select: 'B7' },
            { html: 'Kết quả <b>4</b> hiện ở ô B8: có 4 người đã nộp số liệu.', hl: [['B8', 2]], select: 'B8' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'BaoCaoTuan.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Bấm tab <b>Formulas</b> (Công thức).' },
            { id: 'formulas.autosum', n: 2, text: 'Bấm mũi tên ▾ dưới <b>AutoSum</b>, chọn <b>Count Numbers</b>. Đó chính là hàm COUNT.' },
            { id: 'formulas.insertfn', n: 3, text: '<b>Insert Function</b>: gõ tên COUNTA hoặc COUNTBLANK vào ô tìm kiếm để chèn hai hàm còn lại.' }
          ],
          caption: 'Cách nhanh nhất vẫn là gõ thẳng công thức vào ô, như các bước dưới đây.'
        },
        {
          t: 'steps',
          title: 'Gõ công thức trực tiếp',
          items: [
            'Bấm vào ô cần hiện kết quả, ví dụ <b>B8</b>.',
            'Gõ <code>=COUNT(</code> rồi kéo chuột chọn vùng <b>B2:B7</b>.',
            'Gõ <code>)</code> và nhấn <kbd>Enter</kbd>.',
            'Muốn đếm ô có dữ liệu hay ô trống thì chỉ đổi tên hàm thành <code>COUNTA</code> hoặc <code>COUNTBLANK</code>.'
          ]
        },
        { t: 'h', text: 'COUNTA: đếm ô có dữ liệu' },
        { t: 'p', html: '<code>=COUNTA(vùng)</code> đếm mọi ô <b>không trống</b>, dù là số hay chữ. Dùng để đếm số nhân viên, số đơn hàng theo cột luôn có dữ liệu như Họ tên hoặc Mã.' },
        {
          t: 'example',
          title: 'Đếm số nhân viên theo cột Họ tên',
          data: [
            ['Mã NV', 'Họ tên', '', 'Số nhân viên'],
            ['NV01', 'Nguyễn Thị Mai', '', '=COUNTA(B2:B5)'],
            ['NV02', 'Trần Văn Tuấn'],
            ['NV03', 'Lê Thu Hà'],
            ['NV04', 'Phạm Quốc Phong']
          ],
          note: 'Cột Họ tên toàn chữ. Nếu dùng COUNT ở đây sẽ ra 0.'
        },
        { t: 'h', text: 'COUNTBLANK: đếm ô trống' },
        { t: 'p', html: '<code>=COUNTBLANK(vùng)</code> đếm số ô <b>còn trống</b>. Dùng để biết còn bao nhiêu mục chưa nhập, bao nhiêu người chưa nộp. Hàm này chỉ nhận <b>một vùng</b>.' },
        {
          t: 'example',
          title: 'Đếm số mã hàng chưa kiểm kê',
          data: [
            ['Mã hàng', 'SL thực đếm', '', 'Chưa kiểm'],
            ['VT-01', 450, '', '=COUNTBLANK(B2:B6)'],
            ['VT-02', null],
            ['VT-03', 36],
            ['VT-04', null],
            ['VT-05', 1200]
          ],
          fmt: { B: 'int' },
          note: 'Hai ô B3 và B5 còn trống nên kết quả là 2.'
        },
        { t: 'h', text: 'Lỗi hay gặp khi đếm' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Dùng COUNT trên cột chữ', '<code>=COUNT(B2:B50)</code> trên cột Họ tên ra 0', 'Đếm cột chữ thì dùng COUNTA'],
            ['Ô "trống giả" có dấu cách', 'Ô nhìn trống nhưng có dấu cách: COUNTA vẫn đếm, COUNTBLANK thì không', 'Bấm vào ô, nhấn <kbd>Delete</kbd> để xoá hẳn'],
            ['Số lưu dạng chữ', 'Số dán từ phần mềm khác: COUNT không đếm', 'Chuyển về dạng số (Convert to Number)'],
            ['Đếm nhân viên trên cột số', 'Người chưa nhập doanh số bị bỏ sót', 'Đếm trên cột luôn có dữ liệu như Họ tên, Mã NV']
          ]
        },
        { t: 'tip', html: 'Kiểm tra chéo: <b>COUNTA + COUNTBLANK</b> trên cùng một vùng phải bằng tổng số ô của vùng. Lệch là có ô "trống giả".' },
        {
          t: 'quiz', id: 'q1',
          q: 'Vùng A1:A5 gồm: 15, "Đã giao", (trống), 03/05/2024, 0. =COUNT(A1:A5) ra bao nhiêu?',
          options: ['2', '3', '4', '5'],
          answer: 1,
          explain: 'COUNT đếm ô chứa số: 15, ngày 03/05/2024 (ngày là số) và 0. Tổng cộng 3.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Cùng vùng đó, =COUNTA(A1:A5) ra bao nhiêu?',
          options: ['3', '4', '5', '1'],
          answer: 1,
          explain: 'COUNTA đếm mọi ô không trống: 4 ô. Chỉ ô trống bị bỏ qua.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Cột D ghi ngày nộp báo cáo, ai chưa nộp thì để trống. Muốn biết bao nhiêu người chưa nộp, dùng hàm nào?',
          options: ['COUNT', 'COUNTA', 'COUNTBLANK', 'SUM'],
          answer: 2,
          explain: 'Người chưa nộp là ô trống, nên dùng COUNTBLANK.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Đếm <b>số nhân viên</b> trong danh sách ở ô <code>B9</code> (dựa vào cột Họ tên).',
          data: [
            ['Mã NV', 'Họ tên', 'Phòng ban'],
            ['NV001', 'Nguyễn Thị Thu', 'Kế toán'],
            ['NV002', 'Trần Minh Khang', 'Kinh doanh'],
            ['NV003', 'Lê Thị Bích', 'Nhân sự'],
            ['NV004', 'Phạm Văn Lợi', 'Kho vận'],
            ['NV005', 'Hoàng Gia Huy', 'Kinh doanh'],
            ['NV006', 'Đặng Thuỳ Linh', 'Kế toán'],
            [],
            ['Số nhân viên']
          ],
          answers: [{ cell: 'B9', solution: '=COUNTA(B2:B7)' }],
          mustUse: ['COUNTA'],
          strict: false,
          hint: 'Họ tên là chữ nên phải dùng COUNTA: <code>=COUNTA(B2:B7)</code>.',
          explain: 'Nếu dùng COUNT sẽ ra 0 vì cả cột là chữ. Đây là lỗi rất hay gặp khi mới học hàm đếm.'
        },
        {
          id: 'ex2',
          task: 'Bảng kiểm kê kho, cột C là số lượng thực đếm (ô trống là chưa kiểm). Tính ở <code>F2</code> <b>số mã hàng đã kiểm</b> (đã có số) và ở <code>F3</code> <b>số mã hàng chưa kiểm</b>.',
          data: [
            ['Mã hàng', 'Tên hàng', 'SL thực đếm', '', 'Chỉ số', 'Kết quả'],
            ['VT-01', 'Thùng carton 40x30', 450, '', 'Đã kiểm'],
            ['VT-02', 'Băng keo trong', null, '', 'Chưa kiểm'],
            ['VT-03', 'Màng PE quấn pallet', 36],
            ['VT-04', 'Pallet gỗ', null],
            ['VT-05', 'Tem nhãn mã vạch', 1200],
            ['VT-06', 'Xốp chèn hàng', 85],
            ['VT-07', 'Dây đai nhựa', null],
            ['VT-08', 'Găng tay bảo hộ', 60]
          ],
          answers: [
            { cell: 'F2', solution: '=COUNT(C2:C9)' },
            { cell: 'F3', solution: '=COUNTBLANK(C2:C9)' }
          ],
          strict: false,
          fmt: { C: 'int' },
          hint: 'Đã kiểm là ô có số, chưa kiểm là ô trống. F2: <code>=COUNT(C2:C9)</code>. F3: <code>=COUNTBLANK(C2:C9)</code>.',
          explain: 'Đã kiểm + chưa kiểm = tổng số mã hàng (8). Kiểm tra chéo như vậy giúp bạn chắc chắn không sót dòng nào.'
        },
        {
          id: 'ex3',
          task: 'Tính <b>tỉ lệ nhân viên đã nộp bảng chấm công</b> ở ô <code>F2</code>: số ô đã có ngày công (cột C) chia cho tổng số nhân viên (đếm theo cột B). Ô C ghi "Chờ duyệt" chưa tính là đã nộp.',
          data: [
            ['Mã NV', 'Họ tên', 'Ngày công', '', 'Chỉ số', 'Kết quả'],
            ['NV101', 'Võ Thanh Tùng', 24, '', 'Tỉ lệ đã nộp'],
            ['NV102', 'Ngô Thị Hạnh', 26],
            ['NV103', 'Lý Văn Phúc', 'Chờ duyệt'],
            ['NV104', 'Mai Anh Thư', null],
            ['NV105', 'Trịnh Công Sơn', 25],
            ['NV106', 'Dương Kim Ngân', 22],
            ['NV107', 'Hồ Quang Minh', null],
            ['NV108', 'Tạ Thu Hiền', 26]
          ],
          answers: [{ cell: 'F2', solution: '=COUNT(C2:C9)/COUNTA(B2:B9)' }],
          mustUse: ['COUNT', 'COUNTA'],
          strict: false,
          fmt: { F: 'pct' },
          hint: 'Lấy số ô có số ở cột C chia cho số họ tên ở cột B: <code>=COUNT(C2:C9)/COUNTA(B2:B9)</code>.',
          explain: 'COUNT bỏ qua "Chờ duyệt" vì là chữ, nên chỉ đếm được 5 người. 5 / 8 = 62,5%.'
        }
      ]
    },

    /* ---------------- Bài 4 ---------------- */
    {
      id: 'lam-tron',
      title: 'Làm tròn số: ROUND, ROUNDUP, ROUNDDOWN, INT, MOD',
      minutes: 14,
      funcs: ['ROUND', 'ROUNDUP', 'ROUNDDOWN', 'INT', 'MOD'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Lương tính theo ngày công ra những con số lẻ như <b>8.653.846,15 đồng</b>. Phiếu lương và lệnh chuyển khoản thì cần số tròn nghìn.</p><p>Bấm nút giảm số thập phân chỉ <b>che</b> phần lẻ đi, giá trị thật trong ô vẫn còn. Cộng tổng quỹ lương sẽ lệch vài đồng so với phiếu. Hàm <b>ROUND</b> làm tròn <b>thật sự</b>, ô chứa đúng con số đã làm tròn.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> giống người bán hàng làm tròn tiền. Lẻ từ 500 đồng trở lên thì tính tròn lên 1.000, dưới 500 thì bỏ đi.' },
        { t: 'h', text: 'Công thức ROUND gồm 2 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Nhân viên', 'Lương tính ra', 'Lương làm tròn'],
            ['Mai', 8653846.15, ''],
            ['Tuấn', 11538461.54, '=ROUND(B3,-3)'],
            ['Hà', 7192307.69, '=ROUND(B4,-3)']
          ],
          fmt: { B: 'dec2', C: 'int' },
          cell: 'C2',
          formula: '=ROUND(B2,-3)',
          parts: [
            { label: 'Làm tròn số nào', desc: 'Ô chứa số cần làm tròn. Ở đây là lương tính ra của Mai ở ô B2.' },
            { label: 'Giữ đến hàng nào', desc: 'Số dương giữ số thập phân: <code>2</code> là giữ 2 số lẻ. <code>0</code> là tròn đến đơn vị. Số âm làm tròn sang trái: <code>-3</code> là tròn đến <b>hàng nghìn</b>.', range: 'C2' }
          ],
          note: 'Bảng ở dưới cho thấy từng giá trị của phần "giữ đến hàng nào".'
        },
        {
          t: 'table',
          head: ['Phần thứ 2 ghi', 'Ý nghĩa', '=ROUND(1234567.89, …)'],
          rows: [
            ['2', 'Giữ 2 số thập phân', '1234567.89'],
            ['0', 'Tròn tới hàng đơn vị', '1234568'],
            ['-1', 'Tròn tới hàng chục', '1234570'],
            ['-3', 'Tròn tới hàng nghìn', '1235000'],
            ['-6', 'Tròn tới hàng triệu', '1000000']
          ]
        },
        { t: 'h', text: 'Excel làm tròn như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Nhân viên', 'Lương tính ra', 'Lương làm tròn'],
            ['Mai', 8653846.15, ''],
            ['Tuấn', 11538461.54, '=ROUND(B3,-3)'],
            ['Hà', 7192307.69, '=ROUND(B4,-3)']
          ],
          fmt: { B: 'dec2', C: 'int' },
          cell: 'C2',
          formula: '=ROUND(B2,-3)',
          steps: [
            { html: 'Excel đọc ô <b>B2</b>: 8.653.846,15.', hl: [['B2', 0]], select: 'B2' },
            { html: 'Phần thứ 2 là <b>-3</b>: giữ đến hàng nghìn. Phần cần xử lý là <b>846,15</b> ở sau hàng nghìn.', hl: [['B2', 1]], select: 'B2' },
            { html: 'Nhìn chữ số ngay sau hàng nghìn (hàng trăm): là <b>8</b>, từ 5 trở lên nên làm tròn <b>lên</b>.', hl: [['B2', 2]], select: 'B2' },
            { html: 'Bỏ phần 846,15 và cộng thêm 1.000: 8.653.000 + 1.000 = <b>8.654.000</b>.', hl: [['B2', 1], ['C2', 2]], select: 'C2' },
            { html: 'Kết quả <b>8.654.000</b> hiện ở ô C2. Đây là giá trị thật: cộng tổng hay nhân tiếp đều dùng đúng 8.654.000.', hl: [['C2', 2]], select: 'C2' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'BangLuong_T3.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Bấm tab <b>Formulas</b>.' },
            { id: 'formulas.math', n: 2, text: 'Bấm <b>Math &amp; Trig</b> (nhóm hàm toán học). Cả 5 hàm của bài này đều ở đây: ROUND, ROUNDUP, ROUNDDOWN, INT, MOD.' }
          ],
          caption: 'Chọn tên hàm, Excel mở hộp thoại có ô Number (số cần làm tròn) và Num_digits (giữ đến hàng nào).'
        },
        {
          t: 'steps',
          title: 'Cách nhanh: gõ công thức trực tiếp',
          items: [
            'Bấm vào ô <b>C2</b>, gõ <code>=ROUND(</code>.',
            'Bấm chuột vào ô <b>B2</b>, rồi gõ dấu phẩy <code>,</code>',
            'Gõ <code>-3)</code> và nhấn <kbd>Enter</kbd>.',
            'Bấm lại ô C2, <b>nhấp đúp vào chấm vuông nhỏ</b> ở góc dưới bên phải ô để chép công thức xuống cả cột.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp khi làm tròn' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Chỉ bấm giảm số thập phân', 'Nút <b>Decrease Decimal</b> ở Home chỉ che phần lẻ. Tổng cộng vẫn lệch vài đồng', 'Dùng hàm ROUND để đổi giá trị thật'],
            ['Nhầm 3 với -3', '<code>=ROUND(B2,3)</code> giữ 3 số thập phân, không phải tròn nghìn', 'Tròn nghìn thì ghi <b>-3</b>'],
            ['Dùng ROUND khi phải luôn làm tròn lên', 'Cần 2,1 xe tải nhưng ROUND ra 2 xe, thiếu xe', 'Dùng ROUNDUP'],
            ['Dùng INT với số âm', '<code>=INT(-3.2)</code> ra -4, không phải -3', 'Dùng <code>ROUNDDOWN(…,0)</code> nếu muốn cắt bỏ phần lẻ']
          ]
        },
        { t: 'h', text: 'ROUNDUP: luôn làm tròn lên' },
        { t: 'p', html: 'Cách viết giống ROUND. Có phần lẻ là làm tròn lên, dù lẻ rất ít. Dùng khi tính số xe, số thùng, số kg tính cước.' },
        {
          t: 'example',
          title: 'Số kg tính cước (phần lẻ tính tròn 1 kg)',
          data: [
            ['Kiện hàng', 'Cân nặng (kg)', 'Kg tính cước'],
            ['K01', 3.2, '=ROUNDUP(B2,0)'],
            ['K02', 5.05, '=ROUNDUP(B3,0)'],
            ['K03', 2, '=ROUNDUP(B4,0)']
          ],
          note: 'Kiện 3,2 kg tính cước 4 kg. Kiện đúng 2 kg không có phần lẻ nên vẫn là 2.'
        },
        { t: 'h', text: 'ROUNDDOWN: luôn cắt bỏ phần lẻ' },
        { t: 'p', html: 'Cách viết giống ROUND. Phần lẻ bị bỏ đi, dù lẻ nhiều. Dùng khi chỉ tính phần đã đủ, ví dụ tiền thưởng chỉ trả tròn nghìn và không làm tròn lên.' },
        {
          t: 'example',
          title: 'So sánh ba cách làm tròn tới nghìn đồng',
          data: [
            ['Nhân viên', 'Lương tính ra', 'ROUND', 'ROUNDUP', 'ROUNDDOWN'],
            ['Mai', 8653846.15, '=ROUND(B2,-3)', '=ROUNDUP(B2,-3)', '=ROUNDDOWN(B2,-3)'],
            ['Tuấn', 11538461.54, '=ROUND(B3,-3)', '=ROUNDUP(B3,-3)', '=ROUNDDOWN(B3,-3)'],
            ['Hà', 7192307.69, '=ROUND(B4,-3)', '=ROUNDUP(B4,-3)', '=ROUNDDOWN(B4,-3)']
          ],
          fmt: { B: 'dec2', C: 'int', D: 'int', E: 'int' },
          note: 'Lương của Hà có phần lẻ 307 dưới 500: ROUND ra 7.192.000, ROUNDUP vẫn lên 7.193.000, ROUNDDOWN ra 7.192.000.'
        },
        { t: 'h', text: 'INT: lấy phần nguyên' },
        { t: 'p', html: '<code>=INT(số)</code> bỏ phần thập phân, chỉ giữ phần nguyên (làm tròn xuống). Hay dùng để tính số thùng đầy, số giờ đầy đủ.' },
        {
          t: 'example',
          title: 'Số thùng đầy',
          data: [
            ['Mặt hàng', 'Số lượng', 'Quy cách/thùng', 'Số thùng đầy'],
            ['Nước suối 500ml', 250, 24, '=INT(B2/C2)'],
            ['Sữa hộp 180ml', 1000, 48, '=INT(B3/C3)']
          ],
          note: '250 / 24 = 10,41… nên có 10 thùng đầy.'
        },
        { t: 'h', text: 'MOD: lấy số dư' },
        { t: 'p', html: '<code>=MOD(số bị chia, số chia)</code> trả về <b>số dư</b> của phép chia. Đi cùng INT trong bài toán đóng gói: INT ra số thùng, MOD ra số lẻ còn lại.' },
        {
          t: 'example',
          title: 'Quy đổi số lượng ra thùng và lẻ',
          data: [
            ['Mặt hàng', 'Số lượng', 'Quy cách/thùng', 'Số thùng', 'Số lẻ'],
            ['Nước suối 500ml', 250, 24, '=INT(B2/C2)', '=MOD(B2,C2)'],
            ['Sữa hộp 180ml', 1000, 48, '=INT(B3/C3)', '=MOD(B3,C3)'],
            ['Mì gói', 365, 30, '=INT(B4/C4)', '=MOD(B4,C4)']
          ],
          note: 'Kiểm tra: số thùng × quy cách + số lẻ = số lượng. Ví dụ 20 × 48 + 40 = 1000.'
        },
        { t: 'tip', html: 'Muốn tính <b>số thùng cần dùng</b> (thùng lẻ cũng tính là một thùng), dùng <code>=ROUNDUP(B2/C2,0)</code>. 250 chai cần 11 thùng.' },
        {
          t: 'quiz', id: 'q1',
          q: '=ROUND(2468500,-3) cho kết quả bao nhiêu?',
          options: ['2468000', '2469000', '2470000', '2468500'],
          answer: 1,
          explain: 'Làm tròn tới hàng nghìn: phần lẻ 500 từ 500 trở lên nên làm tròn lên thành 2.469.000.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Có 100 sản phẩm, mỗi hộp đựng 12 cái. =MOD(100,12) ra bao nhiêu?',
          options: ['8', '4', '8.33', '12'],
          answer: 1,
          explain: '100 = 8 × 12 + 4. MOD trả về phần dư là 4. Còn INT(100/12) = 8 là số hộp đầy.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Cước vận chuyển tính theo mỗi 1 kg, phần lẻ cũng tính tròn 1 kg. Hàng nặng 3,2 kg ở A2. Công thức nào ra số kg tính cước đúng?',
          options: ['=ROUND(A2,0)', '=INT(A2)', '=ROUNDUP(A2,0)', '=ROUNDDOWN(A2,0)'],
          answer: 2,
          explain: 'ROUNDUP luôn làm tròn lên: 3,2 kg thành 4 kg. ROUND chỉ ra 3.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Làm tròn <b>tiền thưởng</b> tới <b>nghìn đồng</b> ở cột C (làm tròn thông thường). Viết ở <code>C2</code> rồi sao chép xuống C3:C6.',
          data: [
            ['Nhân viên', 'Thưởng tính ra', 'Thưởng làm tròn'],
            ['Nguyễn Hải Yến', 2346153.85],
            ['Trần Đức Anh', 3115384.62],
            ['Lê Mỹ Duyên', 1730769.23],
            ['Phạm Quốc Việt', 4038461.54],
            ['Đinh Bảo Ngọc', 2884615.38]
          ],
          fill: { range: 'C2:C6', solution: '=ROUND(B2,-3)' },
          mustUse: ['ROUND'],
          fmt: { B: 'dec2', C: 'int' },
          hint: 'Tròn tới hàng nghìn thì phần thứ 2 ghi -3: <code>=ROUND(B2,-3)</code>.',
          explain: 'Số âm ở phần thứ 2 làm tròn sang bên trái dấu thập phân: -1 hàng chục, -2 hàng trăm, -3 hàng nghìn.'
        },
        {
          id: 'ex2',
          task: 'Kho cần đóng gói hàng theo thùng. Tính <b>số thùng đầy</b> ở cột D và <b>số lẻ còn lại</b> ở cột E. Viết ở <code>D2</code>, <code>E2</code> rồi sao chép xuống tới hàng 6.',
          data: [
            ['Mặt hàng', 'Số lượng', 'Quy cách/thùng', 'Số thùng', 'Số lẻ'],
            ['Nước tăng lực', 530, 24],
            ['Bánh quy hộp', 275, 12],
            ['Dầu ăn 1 lít', 418, 15],
            ['Nước rửa chén', 196, 20],
            ['Giấy vệ sinh', 1250, 40]
          ],
          fill: [
            { range: 'D2:D6', solution: '=INT(B2/C2)' },
            { range: 'E2:E6', solution: '=MOD(B2,C2)' }
          ],
          hint: 'Số thùng đầy là phần nguyên của phép chia: <code>=INT(B2/C2)</code>. Số lẻ là số dư: <code>=MOD(B2,C2)</code>.',
          explain: 'INT lấy phần nguyên của phép chia, MOD lấy phần dư. Hai hàm này luôn đi cùng nhau trong bài toán đóng gói, chia ca, đổi phút ra giờ.'
        },
        {
          id: 'ex3',
          task: 'Tính <b>số xe tải cần điều</b> cho mỗi đơn ở cột D: lấy khối lượng đơn hàng chia cho <b>tải trọng mỗi xe ở ô G1</b>, phần lẻ vẫn phải thêm một xe. Viết ở <code>D2</code> rồi sao chép xuống D3:D6.',
          data: [
            ['Đơn hàng', 'Khách hàng', 'Khối lượng (kg)', 'Số xe', '', 'Tải trọng/xe', 2500],
            ['DH-2401', 'Siêu thị Bình Minh', 6200],
            ['DH-2402', 'Công ty An Phát', 2500],
            ['DH-2403', 'Đại lý Hoà Bình', 1300],
            ['DH-2404', 'Nhà máy Sao Việt', 11050],
            ['DH-2405', 'Cửa hàng Thành Công', 4980]
          ],
          fill: { range: 'D2:D6', solution: '=ROUNDUP(C2/$G$1,0)' },
          mustUse: ['ROUNDUP'],
          fmt: { C: 'int', G: 'int' },
          hint: 'Chia rồi làm tròn lên số nguyên. Nhớ khoá ô tải trọng bằng dấu $: <code>=ROUNDUP(C2/$G$1,0)</code>.',
          explain: 'Đơn 6.200 kg chia 2.500 ra 2,48 nên cần 3 xe. Đơn đúng 2.500 kg thì ROUNDUP vẫn ra 1 vì không có phần lẻ.'
        }
      ]
    },

    /* ---------------- Bài 5 ---------------- */
    {
      id: 'toan-khac',
      title: 'Hàm toán học khác: ABS, PRODUCT, POWER, SQRT, SUMPRODUCT',
      minutes: 14,
      funcs: ['ABS', 'PRODUCT', 'POWER', 'SQRT', 'SUMPRODUCT'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Bạn làm báo giá theo mẫu cố định của công ty: có cột <b>Số lượng</b> và cột <b>Đơn giá</b>, nhưng mẫu không có cột Thành tiền. Sếp vẫn cần ô <b>Tổng tiền</b> ở cuối.</p><p>Thêm cột phụ thì phá mẫu. Hàm <b>SUMPRODUCT</b> nhân từng dòng rồi cộng lại, ra tổng tiền chỉ trong <b>một ô</b>. Bài này học thêm vài hàm toán học hay gặp: ABS, PRODUCT, POWER, SQRT.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> giống tính tiền ở chợ. Mỗi món lấy số lượng nhân giá, rồi cộng tất cả các món lại. SUMPRODUCT làm cả hai việc đó trong một lần.' },
        { t: 'h', text: 'Công thức SUMPRODUCT gồm 2 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Mặt hàng', 'Số lượng', 'Đơn giá'],
            ['Giấy A4 (ram)', 20, 68000],
            ['Bút bi (hộp)', 5, 45000],
            ['Mực in', 3, 250000],
            ['Tổng tiền', '', '']
          ],
          fmt: { C: 'int' },
          cell: 'C5',
          formula: '=SUMPRODUCT(B2:B4,C2:C4)',
          parts: [
            { label: 'Vùng thứ nhất', desc: 'Cột Số lượng, từ B2 đến B4.' },
            { label: 'Vùng thứ hai', desc: 'Cột Đơn giá, từ C2 đến C4. Hai vùng phải <b>dài bằng nhau</b> (cùng 3 dòng).' }
          ],
          note: 'Có thể đưa thêm vùng thứ ba, ví dụ cột tỉ lệ chiết khấu. SUMPRODUCT nhân cả ba trên từng dòng rồi mới cộng.'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Mặt hàng', 'Số lượng', 'Đơn giá'],
            ['Giấy A4 (ram)', 20, 68000],
            ['Bút bi (hộp)', 5, 45000],
            ['Mực in', 3, 250000],
            ['Tổng tiền', '', '']
          ],
          fmt: { C: 'int' },
          cell: 'C5',
          formula: '=SUMPRODUCT(B2:B4,C2:C4)',
          steps: [
            { html: 'Excel ghép hai vùng <b>B2:B4</b> và <b>C2:C4</b> theo từng dòng.', hl: [['B2:B4', 0], ['C2:C4', 1]], select: 'B2' },
            { html: 'Dòng 2: 20 × 68.000 = <b>1.360.000</b>.', hl: [['B2', 0], ['C2', 1]], select: 'C2' },
            { html: 'Dòng 3: 5 × 45.000 = <b>225.000</b>.', hl: [['B3', 0], ['C3', 1]], select: 'C3' },
            { html: 'Dòng 4: 3 × 250.000 = <b>750.000</b>.', hl: [['B4', 0], ['C4', 1]], select: 'C4' },
            { html: 'Cộng ba tích lại: 1.360.000 + 225.000 + 750.000 = <b>2.335.000</b>.', hl: [['B2:B4', 0], ['C2:C4', 1]], select: 'C4' },
            { html: 'Kết quả <b>2.335.000</b> hiện ở ô C5, không cần cột Thành tiền.', hl: [['C5', 2]], select: 'C5' }
          ]
        },
        {
          t: 'example',
          title: 'So sánh với cách dùng cột phụ',
          data: [
            ['Mặt hàng', 'Số lượng', 'Đơn giá', 'Thành tiền'],
            ['Giấy A4', 20, 68000, '=B2*C2'],
            ['Bút bi (hộp)', 5, 45000, '=B3*C3'],
            ['Mực in', 3, 250000, '=B4*C4'],
            ['Tổng (cách cũ)', '', '', '=SUM(D2:D4)'],
            ['Tổng (SUMPRODUCT)', '', '', '=SUMPRODUCT(B2:B4,C2:C4)']
          ],
          fmt: { C: 'int', D: 'int' },
          note: 'Hai ô tổng cho cùng kết quả 2.335.000. SUMPRODUCT không cần cột D.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'BaoGia.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Bấm tab <b>Formulas</b>.' },
            { id: 'formulas.math', n: 2, text: 'Bấm <b>Math &amp; Trig</b>. Cả 5 hàm của bài này đều nằm trong danh sách: ABS, POWER, PRODUCT, SQRT, SUMPRODUCT.' }
          ],
          caption: 'Chọn SUMPRODUCT, hộp thoại hiện các ô Array1, Array2 để bạn chọn từng vùng.'
        },
        {
          t: 'steps',
          title: 'Cách nhanh: gõ công thức trực tiếp',
          items: [
            'Bấm vào ô <b>C5</b>, gõ <code>=SUMPRODUCT(</code>.',
            'Kéo chuột chọn cột Số lượng <b>B2:B4</b>, gõ dấu phẩy <code>,</code>',
            'Kéo chuột chọn cột Đơn giá <b>C2:C4</b>.',
            'Gõ <code>)</code> và nhấn <kbd>Enter</kbd>.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp với SUMPRODUCT' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Hai vùng dài khác nhau', '<code>=SUMPRODUCT(B2:B4,C2:C5)</code> báo <code>#VALUE!</code>', 'Chọn hai vùng có cùng số dòng'],
            ['Lấy lẫn dòng Tổng', 'Vùng kéo xuống tới dòng tổng phụ, kết quả bị cộng thừa', 'Chỉ chọn các dòng chi tiết'],
            ['Dùng AVERAGE để tính giá bình quân', 'AVERAGE coi lần nhập 10 ram và lần nhập 300 ram như nhau', 'Dùng <code>SUMPRODUCT(SL,Giá)/SUM(SL)</code>']
          ]
        },
        { t: 'tip', html: 'SUMPRODUCT còn tính được <b>bình quân gia quyền</b> (bình quân có tính đến số lượng): đơn giá bình quân = <code>=SUMPRODUCT(B2:B4,C2:C4)/SUM(B2:B4)</code>. Kế toán kho dùng cách này để tính giá xuất kho.' },
        { t: 'h', text: 'ABS: chênh lệch không quan tâm dấu' },
        { t: 'p', html: '<code>=ABS(số)</code> bỏ dấu âm, cho biết <b>lệch bao nhiêu</b> mà không cần biết thừa hay thiếu. Hay dùng khi đối chiếu sổ sách và thực tế.' },
        {
          t: 'example',
          title: 'Đối chiếu tồn kho',
          data: [
            ['Mã hàng', 'Sổ sách', 'Thực tế', 'Chênh lệch', 'Mức lệch'],
            ['VT-01', 500, 488, '=C2-B2', '=ABS(C2-B2)'],
            ['VT-02', 120, 125, '=C3-B3', '=ABS(C3-B3)'],
            ['VT-03', 300, 300, '=C4-B4', '=ABS(C4-B4)']
          ],
          note: 'Cột D cho biết thừa hay thiếu (âm là thiếu). Cột E chỉ cho biết lệch bao nhiêu đơn vị.'
        },
        { t: 'h', text: 'PRODUCT: nhân nhiều số với nhau' },
        { t: 'p', html: '<code>=PRODUCT(B2:D2)</code> nhân tất cả các số trong vùng, giống <code>=B2*C2*D2</code> nhưng gọn hơn khi có nhiều ô.' },
        {
          t: 'example',
          title: 'Thành tiền sau chiết khấu',
          data: [
            ['Mặt hàng', 'Số lượng', 'Đơn giá', 'Tỉ lệ phải trả', 'Thành tiền'],
            ['Giấy A4 (ram)', 10, 68000, 0.95, '=PRODUCT(B2:D2)'],
            ['Mực in', 4, 250000, 0.9, '=PRODUCT(B3:D3)']
          ],
          fmt: { C: 'int', D: 'pct', E: 'int' },
          note: 'Giấy A4: 10 × 68.000 × 95% = 646.000.'
        },
        { t: 'h', text: 'POWER: luỹ thừa, tính tăng trưởng kép' },
        { t: 'p', html: '<code>=POWER(số, số mũ)</code> nâng một số lên luỹ thừa, giống toán tử <code>^</code>. Ví dụ giá thuê kho tăng 8% mỗi năm, sau 3 năm là giá × (1 + 8%)<sup>3</sup>.' },
        {
          t: 'example',
          title: 'Giá thuê kho sau 3 năm',
          data: [
            ['Giá thuê hiện tại', 'Tăng mỗi năm', 'Số năm', 'Giá thuê sau 3 năm'],
            [50000000, 0.08, 3, '=A2*POWER(1+B2,C2)']
          ],
          fmt: { A: 'int', B: 'pct', D: 'int' },
          note: 'Viết <code>=A2*(1+B2)^C2</code> cũng ra cùng kết quả: 62.985.600.'
        },
        { t: 'h', text: 'SQRT: căn bậc hai' },
        { t: 'p', html: '<code>=SQRT(số)</code> trả về căn bậc hai. Ví dụ biết diện tích một khu kho hình vuông, tính ra chiều dài mỗi cạnh.' },
        {
          t: 'example',
          title: 'Chiều dài cạnh khu kho hình vuông',
          data: [
            ['Diện tích (m²)', 'Chiều dài cạnh (m)'],
            [400, '=SQRT(A2)'],
            [900, '=SQRT(A3)']
          ],
          note: 'Khu 400 m² có cạnh 20 m, vì 20 × 20 = 400.'
        },
        {
          t: 'quiz', id: 'q1',
          q: 'B2:B3 = 2 và 3, C2:C3 = 10 và 20. =SUMPRODUCT(B2:B3,C2:C3) ra bao nhiêu?',
          options: ['35', '80', '600', '50'],
          answer: 1,
          explain: '2 × 10 + 3 × 20 = 20 + 60 = 80.'
        },
        {
          t: 'quiz', id: 'q2',
          q: '=POWER(2,10) bằng công thức nào sau đây?',
          options: ['=2*10', '=2^10', '=10^2', '=SQRT(2,10)'],
          answer: 1,
          explain: 'POWER(2,10) là 2 mũ 10, viết bằng toán tử là 2^10 = 1024.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Sổ sách ghi 200, thực tế đếm được 185. =ABS(185-200) ra bao nhiêu?',
          options: ['-15', '15', '385', '0'],
          answer: 1,
          explain: '185 - 200 = -15. ABS bỏ dấu âm nên ra 15: lệch 15 đơn vị.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tính <b>tổng giá trị đơn hàng</b> ở ô <code>C8</code> bằng <b>SUMPRODUCT</b> (số lượng × đơn giá của tất cả các dòng), không dùng cột phụ.',
          data: [
            ['Mặt hàng', 'Số lượng', 'Đơn giá'],
            ['Thùng carton', 200, 12500],
            ['Băng keo', 48, 18000],
            ['Màng PE', 15, 165000],
            ['Tem nhãn (cuộn)', 30, 42000],
            ['Pallet nhựa', 10, 380000],
            [],
            ['Tổng giá trị']
          ],
          answers: [{ cell: 'C8', solution: '=SUMPRODUCT(B2:B6,C2:C6)' }],
          mustUse: ['SUMPRODUCT'],
          fmt: { C: 'int' },
          hint: 'Vùng thứ nhất là cột Số lượng, vùng thứ hai là cột Đơn giá: <code>=SUMPRODUCT(B2:B6,C2:C6)</code>.',
          explain: 'SUMPRODUCT nhân từng dòng rồi cộng lại. Bảng càng dài, cách này càng đỡ phải thêm cột.'
        },
        {
          id: 'ex2',
          task: 'Đối chiếu ngân sách và chi thực tế. Ở cột D, tính <b>mức chênh lệch</b> (luôn là số dương) giữa chi thực tế và ngân sách. Viết ở <code>D2</code> rồi sao chép xuống D3:D6.',
          data: [
            ['Hạng mục', 'Ngân sách', 'Thực chi', 'Mức chênh lệch'],
            ['Tiếp khách', 15000000, 18200000],
            ['Công tác phí', 25000000, 21400000],
            ['Văn phòng phẩm', 6000000, 5750000],
            ['Đào tạo', 30000000, 34500000],
            ['Marketing', 50000000, 47800000]
          ],
          fill: { range: 'D2:D6', solution: '=ABS(C2-B2)' },
          mustUse: ['ABS'],
          fmt: { B: 'int', C: 'int', D: 'int' },
          hint: 'Lấy hiệu rồi bỏ dấu âm: <code>=ABS(C2-B2)</code>.',
          explain: 'ABS cho biết lệch bao nhiêu, bất kể chi vượt hay tiết kiệm. Muốn biết chiều lệch thì xem hiệu C2-B2 gốc.'
        },
        {
          id: 'ex3',
          task: 'Tính <b>đơn giá nhập bình quân</b> của mặt hàng giấy A4 qua các lần nhập ở ô <code>C8</code>: tổng tiền nhập (số lượng × đơn giá) chia cho tổng số lượng.',
          data: [
            ['Lần nhập', 'Số lượng (ram)', 'Đơn giá'],
            ['05/01/2024', 200, 65000],
            ['18/01/2024', 150, 67000],
            ['02/02/2024', 300, 66000],
            ['20/02/2024', 100, 70000],
            ['08/03/2024', 250, 68000],
            [],
            ['Giá bình quân']
          ],
          answers: [{ cell: 'C8', solution: '=SUMPRODUCT(B2:B6,C2:C6)/SUM(B2:B6)' }],
          mustUse: ['SUMPRODUCT'],
          fmt: { C: 'int' },
          hint: 'Tổng tiền nhập là SUMPRODUCT, tổng số lượng là SUM: <code>=SUMPRODUCT(B2:B6,C2:C6)/SUM(B2:B6)</code>.',
          explain: 'Đây là bình quân gia quyền: lần nhập nhiều hàng ảnh hưởng nhiều hơn. Dùng AVERAGE(C2:C6) sẽ sai vì coi mọi lần nhập như nhau.'
        }
      ]
    },

    /* ---------------- Bài 6 ---------------- */
    {
      id: 'xep-hang',
      title: 'Xếp hạng và top: LARGE, SMALL, RANK, MEDIAN',
      minutes: 13,
      funcs: ['LARGE', 'SMALL', 'RANK', 'MEDIAN'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Cuối tháng sếp hỏi: <b>"Ai đứng thứ mấy về doanh số? Top 3 là bao nhiêu?"</b></p><p>Sắp xếp lại bảng thì làm xáo thứ tự gốc, mà bảng lương lại cần giữ theo mã nhân viên. Hàm <b>RANK</b> ghi hạng ngay cạnh mỗi người, bảng vẫn giữ nguyên. Bài này học thêm LARGE, SMALL để lấy top và MEDIAN để tìm mức ở giữa.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> giống xếp hạng thi đấu. Lấy điểm của mình so với cả bảng, đếm xem có bao nhiêu người cao hơn, rồi cộng thêm 1. Đó là hạng của mình.' },
        { t: 'h', text: 'Công thức RANK gồm 3 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Nhân viên', 'Doanh số', 'Hạng'],
            ['Minh', 320000000, ''],
            ['Lan', 450000000, '=RANK(B3,$B$2:$B$6,0)'],
            ['Hùng', 280000000, '=RANK(B4,$B$2:$B$6,0)'],
            ['Trang', 510000000, '=RANK(B5,$B$2:$B$6,0)'],
            ['Phúc', 390000000, '=RANK(B6,$B$2:$B$6,0)']
          ],
          fmt: { B: 'int' },
          cell: 'C2',
          formula: '=RANK(B2,$B$2:$B$6,0)',
          parts: [
            { label: 'Xếp hạng số nào', desc: 'Doanh số của người cần xếp hạng. Ở đây là ô B2 của Minh.' },
            { label: 'So với cả vùng nào', desc: 'Toàn bộ cột doanh số. Dấu $ giữ vùng đứng yên khi kéo công thức xuống, để ai cũng được so trên cùng một bảng.' },
            { label: 'Xếp theo chiều nào', desc: '<b>0</b> hoặc bỏ trống: số <b>lớn nhất</b> hạng 1 (doanh số, điểm). <b>1</b>: số <b>nhỏ nhất</b> hạng 1 (thời gian giao, chi phí).', range: 'C2:C6' }
          ],
          note: 'Excel 2010 trở đi có thêm RANK.EQ, cách viết và kết quả giống hệt RANK.'
        },
        { t: 'h', text: 'Excel xếp hạng như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Nhân viên', 'Doanh số', 'Hạng'],
            ['Minh', 320000000, ''],
            ['Lan', 450000000, '=RANK(B3,$B$2:$B$6,0)'],
            ['Hùng', 280000000, '=RANK(B4,$B$2:$B$6,0)'],
            ['Trang', 510000000, '=RANK(B5,$B$2:$B$6,0)'],
            ['Phúc', 390000000, '=RANK(B6,$B$2:$B$6,0)']
          ],
          fmt: { B: 'int' },
          cell: 'C2',
          formula: '=RANK(B2,$B$2:$B$6,0)',
          steps: [
            { html: 'Excel đọc ô <b>B2</b>: doanh số của Minh là <b>320 triệu</b>.', hl: [['B2', 0]], select: 'B2' },
            { html: 'Nhìn cả vùng so sánh <b>B2:B6</b>. Phần thứ 3 là 0 nên số lớn nhất đứng hạng 1.', hl: [['B2', 0], ['B3:B6', 1]], select: 'B2' },
            { html: 'Tìm những người <b>cao hơn</b> 320 triệu: Lan 450, Trang 510, Phúc 390. Có <b>3 người</b>.', hl: [['B2', 0], ['B3', 2], ['B5:B6', 2]], select: 'B5' },
            { html: 'Hùng 280 triệu thấp hơn Minh nên không tính.', hl: [['B2', 0], ['B4', 4]], select: 'B4' },
            { html: 'Hạng = 3 + 1 = <b>4</b>. Kết quả hiện ở ô C2.', hl: [['C2', 2]], select: 'C2' },
            { html: 'Kéo công thức xuống, B2 tự đổi thành B3, B4… còn vùng <code>$B$2:$B$6</code> đứng yên. Trang hạng 1, Hùng hạng 5.', hl: [['C2:C6', 2], ['B2:B6', 1]], select: 'C5' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'DoanhSo_T3.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Bấm tab <b>Formulas</b>.' },
            { id: 'formulas.insertfn', n: 2, text: 'Bấm <b>Insert Function</b> (chèn hàm), gõ <b>RANK</b> vào ô tìm kiếm rồi bấm <b>Go</b>. RANK, LARGE, SMALL, MEDIAN thuộc nhóm thống kê (Statistical).' }
          ],
          caption: 'Dân văn phòng thường gõ thẳng công thức vào ô, như các bước dưới đây.'
        },
        {
          t: 'steps',
          title: 'Gõ công thức trực tiếp',
          items: [
            'Bấm vào ô <b>C2</b>, gõ <code>=RANK(</code>.',
            'Bấm chuột vào ô <b>B2</b>, gõ dấu phẩy <code>,</code>',
            'Kéo chọn vùng <b>B2:B6</b>, nhấn <kbd>F4</kbd> để thành <code>$B$2:$B$6</code>, gõ dấu phẩy.',
            'Gõ <code>0)</code> và nhấn <kbd>Enter</kbd>.',
            'Nhấp đúp vào chấm vuông nhỏ ở góc dưới bên phải ô C2 để chép xuống cả cột.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp khi xếp hạng' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Quên dấu $', '<code>=RANK(B2,B2:B6)</code> kéo xuống thành <code>RANK(B3,B3:B7)</code>, xếp hạng sai', 'Khoá vùng: <code>$B$2:$B$6</code>'],
            ['Nhầm chiều xếp', 'Xếp thời gian giao mà bỏ trống phần thứ 3, người chậm nhất lại hạng 1', 'Chỉ số càng nhỏ càng tốt thì ghi <b>1</b>'],
            ['Thấy thiếu hạng', 'Hai người bằng doanh số cùng hạng 2, không có ai hạng 3 (1, 2, 2, 4)', 'Đây là cách Excel xếp, không phải lỗi']
          ]
        },
        { t: 'h', text: 'LARGE: lấy số lớn thứ k' },
        { t: 'p', html: '<code>=LARGE(vùng, k)</code> trả về số lớn thứ k. <code>k = 1</code> là lớn nhất, <code>k = 2</code> là lớn thứ hai. Dùng để lập bảng top 3, top 5.' },
        {
          t: 'example',
          title: 'Top 3 doanh số',
          data: [
            ['Nhân viên', 'Doanh số', '', 'Top', 'Doanh số'],
            ['Minh', 320000000, '', 1, '=LARGE($B$2:$B$6,D2)'],
            ['Lan', 450000000, '', 2, '=LARGE($B$2:$B$6,D3)'],
            ['Hùng', 280000000, '', 3, '=LARGE($B$2:$B$6,D4)'],
            ['Trang', 510000000],
            ['Phúc', 390000000]
          ],
          fmt: { B: 'int', E: 'int' },
          note: 'Lấy k từ cột D thay vì gõ 1, 2, 3 nên một công thức dùng được cho cả bảng top.'
        },
        { t: 'h', text: 'SMALL: lấy số nhỏ thứ k' },
        { t: 'p', html: '<code>=SMALL(vùng, k)</code> ngược với LARGE: tính từ số nhỏ nhất. <code>SMALL(vùng,1)</code> cho kết quả giống MIN.' },
        {
          t: 'example',
          title: 'Hai báo giá rẻ nhất',
          data: [
            ['Nhà cung cấp', 'Báo giá', '', 'Rẻ nhất', '=SMALL(B2:B5,1)'],
            ['Hồng Hà', 72000, '', 'Rẻ thứ hai', '=SMALL(B2:B5,2)'],
            ['Thiên Long', 68500],
            ['Phú Gia', 75000],
            ['Minh Châu', 66000]
          ],
          fmt: { B: 'int', E: 'int' },
          note: 'Rẻ nhất 66.000, rẻ thứ hai 68.500.'
        },
        { t: 'h', text: 'MEDIAN: số ở giữa' },
        { t: 'p', html: '<code>=MEDIAN(vùng)</code> xếp các số từ nhỏ đến lớn rồi lấy <b>số ở giữa</b> (trung vị). Có số lượng chẵn thì lấy trung bình của hai số giữa.' },
        {
          t: 'example',
          title: 'Lương trung vị và lương trung bình',
          data: [
            ['Nhân viên', 'Lương', '', 'Chỉ số', 'Giá trị'],
            ['Mai', 9000000, '', 'Trung vị', '=MEDIAN(B2:B6)'],
            ['Tuấn', 10000000, '', 'Trung bình', '=AVERAGE(B2:B6)'],
            ['Hà', 11000000],
            ['Phong', 12000000],
            ['Giám đốc', 58000000]
          ],
          fmt: { B: 'int', E: 'int' },
          note: 'Lương giám đốc rất cao kéo trung bình lên 20 triệu. Trung vị 11 triệu phản ánh mức lương phổ biến đúng hơn.'
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Vùng A1:A5 = 5, 9, 2, 7, 4. =LARGE(A1:A5,2) ra bao nhiêu?',
          options: ['9', '7', '5', '2'],
          answer: 1,
          explain: 'Xếp giảm dần: 9, 7, 5, 4, 2. Số lớn thứ hai là 7.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Xếp hạng tài xế theo thời gian giao trung bình, ai ít thời gian nhất hạng 1. Phần thứ 3 (order) đặt bao nhiêu?',
          options: ['0', '1', '-1', 'Bỏ trống'],
          answer: 1,
          explain: 'order = 1 xếp tăng dần: số nhỏ nhất đứng hạng 1. Bỏ trống hoặc 0 thì số lớn nhất hạng 1.'
        },
        {
          t: 'quiz', id: 'q3',
          q: '=MEDIAN(10, 20, 30, 1000) ra bao nhiêu?',
          options: ['265', '25', '20', '30'],
          answer: 1,
          explain: 'Có 4 số nên trung vị là trung bình hai số giữa: (20 + 30) / 2 = 25. AVERAGE sẽ ra 265 vì bị số 1000 kéo lên.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Xếp hạng <b>doanh số</b> của từng nhân viên ở cột C (doanh số cao nhất hạng 1). Viết ở <code>C2</code> rồi sao chép xuống C3:C8.',
          data: [
            ['Nhân viên', 'Doanh số', 'Hạng'],
            ['Nguyễn Thanh Bình', 285000000],
            ['Trần Mỹ Linh', 412000000],
            ['Lê Hoàng Phúc', 198000000],
            ['Phạm Thu Thảo', 367000000],
            ['Đỗ Minh Quân', 254000000],
            ['Vũ Ngọc Ánh', 439000000],
            ['Hồ Đức Long', 311000000]
          ],
          fill: { range: 'C2:C8', solution: '=RANK(B2,$B$2:$B$8)' },
          mustUse: ['RANK'],
          fmt: { B: 'int' },
          hint: 'Nhớ khoá vùng so sánh bằng dấu $: <code>=RANK(B2,$B$2:$B$8)</code>. Viết RANK.EQ cũng được.',
          explain: 'Vùng $B$2:$B$8 đứng yên khi sao chép, chỉ B2 dịch xuống. Vũ Ngọc Ánh hạng 1, Lê Hoàng Phúc hạng 7.'
        },
        {
          id: 'ex2',
          task: 'Lập bảng <b>top 3 doanh số</b> và <b>doanh số thấp nhất</b>. Ở <code>F2</code>, <code>F3</code>, <code>F4</code> lấy doanh số lớn nhất, lớn thứ 2, lớn thứ 3 (dùng số thứ hạng ở cột E). Ở <code>F5</code> lấy doanh số nhỏ nhất bằng SMALL.',
          data: [
            ['Chi nhánh', 'Doanh số', '', '', 'Hạng', 'Doanh số'],
            ['Hà Nội', 1850000000, '', '', 1],
            ['Hải Phòng', 920000000, '', '', 2],
            ['Đà Nẵng', 1140000000, '', '', 3],
            ['Nha Trang', 680000000, '', '', 'Thấp nhất'],
            ['TP.HCM', 2370000000],
            ['Cần Thơ', 760000000],
            ['Bình Dương', 1420000000]
          ],
          fill: { range: 'F2:F4', solution: '=LARGE($B$2:$B$8,E2)' },
          answers: [{ cell: 'F5', solution: '=SMALL(B2:B8,1)' }],
          fmt: { B: 'int', F: 'int' },
          hint: 'Lấy k từ ô E2 và khoá vùng doanh số. F2: <code>=LARGE($B$2:$B$8,E2)</code> rồi sao chép xuống F4. F5: <code>=SMALL(B2:B8,1)</code>.',
          explain: 'Lấy k từ ô E2 thay vì gõ 1, 2, 3 giúp một công thức dùng cho cả bảng top. SMALL(…,1) cho kết quả giống MIN.'
        },
        {
          id: 'ex3',
          task: 'Bảng thời gian giao hàng trung bình (phút) của tài xế. Ở cột C, xếp hạng sao cho <b>ai giao nhanh nhất (ít phút nhất) hạng 1</b>. Viết ở <code>C2</code> rồi sao chép xuống C3:C7. Sau đó tính <b>trung vị</b> thời gian giao ở <code>F2</code>.',
          data: [
            ['Tài xế', 'Thời gian (phút)', 'Hạng', '', 'Chỉ số', 'Kết quả'],
            ['Nguyễn Văn Hùng', 42, null, '', 'Trung vị'],
            ['Trần Quốc Sơn', 35],
            ['Lê Thành Lâm', 58],
            ['Phạm Văn Toàn', 31],
            ['Đặng Hữu Tài', 47],
            ['Bùi Công Danh', 39]
          ],
          fill: { range: 'C2:C7', solution: '=RANK(B2,$B$2:$B$7,1)' },
          answers: [{ cell: 'F2', solution: '=MEDIAN(B2:B7)' }],
          hint: 'Ghi 1 ở phần thứ 3 để số nhỏ nhất hạng 1: <code>=RANK(B2,$B$2:$B$7,1)</code>. Trung vị: <code>=MEDIAN(B2:B7)</code>.',
          explain: 'Với chỉ số "càng nhỏ càng tốt" như thời gian, chi phí, tỉ lệ lỗi thì luôn ghi 1 ở phần thứ 3. Trung vị ở đây là (39 + 42) / 2 = 40,5 phút.'
        }
      ]
    }
  ],

  /* ---------------- Bài kiểm tra Phần 2 ---------------- */
  test: {
    mcq: [
      { q: 'Công thức nào cộng vùng B2:B10 và vùng D2:D10?', options: ['=SUM(B2:D10)', '=SUM(B2:B10,D2:D10)', '=SUM(B2:B10+D2:D10)', '=SUM(B2,D10)'], answer: 1, explain: 'Hai vùng ngăn nhau bằng dấu phẩy. B2:D10 sẽ cộng cả cột C.' },
      { q: 'Phím tắt AutoSum là gì?', options: ['Ctrl + S', 'Alt + =', 'Ctrl + =', 'Shift + F3'], answer: 1, explain: 'Alt + = chèn hàm SUM và tự đoán vùng cần cộng.' },
      { q: 'B2:B5 = 8, 0, (trống), 4. =AVERAGE(B2:B5) ra bao nhiêu?', options: ['3', '4', '6', '12'], answer: 1, explain: 'Ô trống bị bỏ qua nhưng số 0 vẫn được tính: (8 + 0 + 4) / 3 = 4.' },
      { q: 'Muốn đếm số nhân viên theo cột Họ tên, dùng hàm nào?', options: ['COUNT', 'COUNTA', 'COUNTBLANK', 'SUM'], answer: 1, explain: 'Họ tên là chữ, chỉ COUNTA đếm được ô chứa chữ.' },
      { q: 'Vùng C2:C9 có 5 ô chứa số, 1 ô chứa chữ "Chưa có", 2 ô trống. =COUNTBLANK(C2:C9) ra bao nhiêu?', options: ['1', '2', '3', '6'], answer: 1, explain: 'COUNTBLANK chỉ đếm ô thật sự trống: 2 ô.' },
      { q: '=ROUND(15467890,-3) cho kết quả bao nhiêu?', options: ['15467000', '15468000', '15470000', '15467890'], answer: 1, explain: 'Làm tròn tới hàng nghìn: phần lẻ 890 từ 500 trở lên nên lên thành 15.468.000.' },
      { q: '=ROUNDDOWN(7.98,0) ra bao nhiêu?', options: ['8', '7', '7.9', '7.98'], answer: 1, explain: 'ROUNDDOWN luôn cắt bỏ phần thừa nên ra 7.' },
      { q: 'Có 175 sản phẩm, mỗi thùng 24 cái. Công thức nào ra số sản phẩm lẻ không đủ thùng?', options: ['=INT(175/24)', '=MOD(175,24)', '=ROUND(175/24,0)', '=175-24'], answer: 1, explain: '175 = 7 × 24 + 7. MOD trả về phần dư là 7.' },
      { q: '=INT(-4.3) ra bao nhiêu?', options: ['-4', '-5', '4', '-4.3'], answer: 1, explain: 'INT làm tròn xuống số nguyên nhỏ hơn: -5.' },
      { q: 'B2:B4 là số lượng (2, 4, 1), C2:C4 là đơn giá (50, 10, 100). =SUMPRODUCT(B2:B4,C2:C4) ra bao nhiêu?', options: ['167', '240', '7', '160'], answer: 1, explain: '2 × 50 + 4 × 10 + 1 × 100 = 100 + 40 + 100 = 240.' },
      { q: 'Ô C2 có =RANK(B2,B2:B10). Sao chép xuống C3:C10 thì bị lỗi gì?', options: ['Không lỗi gì', 'Vùng so sánh bị trượt nên xếp hạng sai', 'Báo lỗi #NAME?', 'Hạng luôn ra 1'], answer: 1, explain: 'Vùng không khoá $ nên thành B3:B11, B4:B12… Phải viết $B$2:$B$10.' },
      { q: 'Muốn lấy doanh số cao thứ 3 trong vùng B2:B20, dùng công thức nào?', options: ['=MAX(B2:B20,3)', '=LARGE(B2:B20,3)', '=RANK(B2:B20,3)', '=SMALL(B2:B20,3)'], answer: 1, explain: 'LARGE(vùng, k) trả về số lớn thứ k.' }
    ],
    practice: [
      {
        id: 't1',
        task: 'Bảng lương tháng. Tính ở cột E <b>Lương thực nhận</b> = Lương cơ bản × Ngày công ÷ 26, <b>làm tròn tới nghìn đồng</b>. Viết ở <code>E2</code> rồi sao chép xuống E3:E7. Sau đó tính <b>tổng quỹ lương</b> ở <code>E8</code>.',
        data: [
          ['Mã NV', 'Họ tên', 'Lương cơ bản', 'Ngày công', 'Thực nhận'],
          ['NV01', 'Nguyễn Thị Mai', 9500000, 26],
          ['NV02', 'Trần Văn Tuấn', 12000000, 24],
          ['NV03', 'Lê Thu Hà', 8200000, 23],
          ['NV04', 'Phạm Minh Đức', 15500000, 25],
          ['NV05', 'Vũ Hồng Nhung', 10800000, 22],
          ['NV06', 'Hoàng Văn Phong', 11300000, 26],
          ['', 'Tổng quỹ lương']
        ],
        fill: { range: 'E2:E7', solution: '=ROUND(C2*D2/26,-3)' },
        answers: [{ cell: 'E8', solution: '=SUM(E2:E7)' }],
        fmt: { C: 'int', E: 'int' }
      },
      {
        id: 't2',
        task: 'Báo cáo bán hàng của đội kinh doanh. Tính: <code>G2</code> <b>tổng doanh thu</b> (số đơn × giá trị bình quân mỗi đơn, dùng SUMPRODUCT); <code>G3</code> <b>số nhân viên có số liệu</b> (ô cột B có số); <code>G4</code> <b>số đơn trung bình</b> của những người có số liệu; <code>G5</code> <b>số đơn nhiều nhất</b>.',
        data: [
          ['Nhân viên', 'Số đơn', 'Giá trị TB/đơn', '', '', 'Chỉ số', 'Kết quả'],
          ['Minh', 42, 3500000, '', '', 'Tổng doanh thu'],
          ['Lan', 38, 4200000, '', '', 'Số NV có số liệu'],
          ['Hùng', null, null, '', '', 'Số đơn trung bình'],
          ['Trang', 55, 2900000, '', '', 'Số đơn nhiều nhất'],
          ['Phúc', 27, 5100000],
          ['Thảo', 49, 3800000]
        ],
        answers: [
          { cell: 'G2', solution: '=SUMPRODUCT(B2:B7,C2:C7)' },
          { cell: 'G3', solution: '=COUNT(B2:B7)' },
          { cell: 'G4', solution: '=AVERAGE(B2:B7)' },
          { cell: 'G5', solution: '=MAX(B2:B7)' }
        ],
        fmt: { B: 'int', C: 'int', G: 'int' }
      },
      {
        id: 't3',
        task: 'Xếp hạng điểm đánh giá cuối năm. Ở cột C, xếp hạng (điểm cao nhất hạng 1), viết ở <code>C2</code> rồi sao chép xuống C3:C8. Ở <code>F2</code> lấy <b>điểm cao thứ 2</b>, ở <code>F3</code> tính <b>trung vị</b> điểm, ở <code>F4</code> tính <b>điểm trung bình làm tròn 1 chữ số thập phân</b>.',
        data: [
          ['Nhân viên', 'Điểm', 'Hạng', '', 'Chỉ số', 'Kết quả'],
          ['Bình', 8.6, null, '', 'Cao thứ 2'],
          ['Linh', 9.2, null, '', 'Trung vị'],
          ['Phúc', 7.4, null, '', 'TB làm tròn'],
          ['Thảo', 8.9],
          ['Quân', 7.9],
          ['Ánh', 9.5],
          ['Long', 8.1]
        ],
        fill: { range: 'C2:C8', solution: '=RANK(B2,$B$2:$B$8)' },
        answers: [
          { cell: 'F2', solution: '=LARGE(B2:B8,2)' },
          { cell: 'F3', solution: '=MEDIAN(B2:B8)' },
          { cell: 'F4', solution: '=ROUND(AVERAGE(B2:B8),1)' }
        ],
        fmt: { B: 'dec1', F: 'dec1' }
      }
    ]
  }
});
