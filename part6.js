ECC.addPart({
  id: 'p6',
  no: 6,
  title: 'Hàm ngày và giờ',
  short: 'Ngày giờ',
  desc: 'Hiểu bản chất ngày giờ trong Excel, tách và ghép ngày, tính tuổi, thâm niên, hạn hợp đồng, ngày công, ngày giao hàng và số giờ làm, tăng ca.',
  lessons: [
    /* ---------------- Bài 1 ---------------- */
    {
      id: 'ngay-co-ban',
      title: 'Ngày là số seri: TODAY, NOW, DATE',
      minutes: 12,
      funcs: ['TODAY', 'NOW', 'DATE'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Phòng kho cần ghi <b>hạn giao hàng</b> cho từng đơn: ngày đặt cộng thêm 30 ngày. Nhưng phần mềm xuất ra năm, tháng, ngày ở <b>3 cột riêng</b>, và nhiều người vẫn ngồi đếm lịch bằng tay.</p><p>Chỉ cần hiểu ngày trong Excel là gì, bạn ghép ngày bằng <b>DATE</b> rồi cộng số ngày bằng một dấu <b>+</b>. Excel tự qua tháng, qua năm, không bao giờ đếm nhầm.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> Excel đánh số mọi ngày giống <b>số trang của một cuốn lịch khổng lồ</b>. Trang 1 là ngày 01/01/1900, trang 45292 là ngày 01/01/2024. Cộng 30 vào ngày là lật thêm 30 trang lịch.' },
        { t: 'p', html: 'Con số thứ tự này gọi là <b>số seri</b> của ngày. Ô hiện "15/03/2024" chỉ là <b>cách hiển thị</b>, bên trong ô vẫn là số 45366. Vì vậy ngày cộng trừ được như số: ngày + 7 là một tuần sau, ngày sau trừ ngày trước ra số ngày chênh lệch.' },
        {
          t: 'example',
          title: 'Cùng một ngày, hai cách hiển thị',
          data: [
            ['Ngày (định dạng ngày)', 'Số seri (định dạng số)'],
            ['01/01/2024', '=A2'],
            ['15/03/2024', '=A3'],
            ['31/12/2024', '=A4']
          ],
          fmt: { B: 'raw' },
          note: 'Cột B lấy lại đúng giá trị cột A nhưng hiển thị dạng số. Trong Excel thật, chọn ô ngày rồi đổi định dạng thành <b>General</b> (Chung) sẽ thấy đúng con số này.'
        },
        { t: 'h', text: 'Hàm DATE: ghép năm, tháng, ngày thành một ngày thật' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở ô nào',
          data: [
            ['Năm', 'Tháng', 'Ngày', 'Ngày đặt'],
            [2024, 3, 15, ''],
            [2024, 6, 28, ''],
            [2024, 12, 29, '']
          ],
          cell: 'D2',
          formula: '=DATE(A2,B2,C2)',
          parts: [
            { label: 'Năm nào', desc: 'Ô chứa năm, nên đủ 4 chữ số như 2024. Ở đây là ô A2.' },
            { label: 'Tháng mấy', desc: 'Ô chứa tháng (1 đến 12). Ghi số lớn hơn 12 thì Excel tự chuyển sang năm sau.' },
            { label: 'Ngày mấy', desc: 'Ô chứa ngày trong tháng. Ghi quá số ngày của tháng thì Excel tự chuyển sang tháng sau.' }
          ],
          note: 'Thứ tự luôn là <b>năm, tháng, ngày</b>, ngược với thói quen viết ngày/tháng/năm của người Việt. Đây là chỗ hay nhầm nhất.'
        },
        { t: 'h', text: 'Excel tính hạn giao như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Năm', 'Tháng', 'Ngày', 'Số ngày giao', 'Hạn giao'],
            [2024, 3, 15, 30, ''],
            [2024, 12, 20, 30]
          ],
          cell: 'E2',
          formula: '=DATE(A2,B2,C2)+D2',
          steps: [
            { html: 'Excel đọc 3 ô <b>A2, B2, C2</b>: năm 2024, tháng 3, ngày 15.', hl: [['A2', 0], ['B2', 1], ['C2', 2]], select: 'A2' },
            { html: 'Hàm DATE ghép lại thành ngày <b>15/03/2024</b>. Bên trong, đó là trang lịch số <b>45366</b>.', hl: [['A2:C2', 0]], select: 'C2' },
            { html: 'Đọc ô <b>D2</b>: cần cộng thêm <b>30</b> ngày.', hl: [['A2:C2', 0], ['D2', 3]], select: 'D2' },
            { html: 'Cộng hai con số: 45366 + 30 = <b>45396</b>. Excel chỉ việc lật thêm 30 trang lịch.', hl: [['A2:C2', 0], ['D2', 3]], select: 'D2' },
            { html: 'Số 45396 được hiển thị thành ngày <b>14/04/2024</b>. Excel tự biết tháng 3 có 31 ngày nên chuyển sang tháng 4.', hl: [['E2', 2]], select: 'E2' },
            { html: 'Kéo công thức xuống E3: 20/12/2024 + 30 ngày ra <b>19/01/2025</b>. Qua năm mới cũng không cần làm gì thêm.', hl: [['E2:E3', 2]], select: 'E3' }
          ]
        },
        { t: 'tip', html: 'DATE tự "tràn" rất tiện: <code>=DATE(2024,13,1)</code> ra 01/01/2025, <code>=DATE(2024,2,30)</code> ra 01/03/2024. Bạn sẽ dùng mẹo này ở các bài sau để tìm ngày đầu tháng sau, cuối tháng…' },
        { t: 'h', text: 'TODAY và NOW: ngày giờ hiện tại' },
        { t: 'p', html: '<code>=TODAY()</code> trả về ngày hôm nay. <code>=NOW()</code> trả về cả ngày lẫn giờ hiện tại. Hai hàm này không có đối số, nhưng vẫn phải gõ cặp ngoặc <code>()</code>.' },
        {
          t: 'example',
          title: 'Kết quả thay đổi theo thời điểm bạn mở trang',
          data: [
            ['Nội dung', 'Công thức'],
            ['Hôm nay', '=TODAY()'],
            ['Bây giờ', '=NOW()'],
            ['Một tuần nữa', '=TODAY()+7']
          ],
          note: 'TODAY và NOW tự cập nhật mỗi khi file tính lại. Dùng để đếm "còn bao nhiêu ngày đến hạn", "đã quá hạn bao lâu" so với hôm nay.'
        },
        { t: 'warn', html: 'Cần <b>ghi cố định</b> ngày lập phiếu thì đừng dùng TODAY(), vì mai mở file ngày sẽ đổi. Hãy nhấn <kbd>Ctrl</kbd> + <kbd>;</kbd> để nhập ngày hôm nay dạng cố định (và <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>;</kbd> để nhập giờ hiện tại).' },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'home',
          file: 'DonHang.xlsx',
          groups: ['Number'],
          marks: [
            { id: 'tab.home', n: 1, text: 'Bấm tab <b>Home</b>.' },
            { id: 'home.numfmt', n: 2, text: 'Ô <b>Number Format</b> (định dạng số). Chọn <b>General</b> để thấy số seri, chọn <b>Short Date</b> để hiện lại thành ngày.' }
          ],
          caption: 'Công thức ngày ra con số lạ như 45396? Đó vẫn là ngày đúng, chỉ cần đổi định dạng ô ở đây.'
        },
        {
          t: 'steps',
          title: 'Gõ công thức hạn giao',
          items: [
            'Bấm vào ô <b>E2</b>, gõ <code>=DATE(</code>',
            'Bấm ô <b>A2</b>, gõ dấu phẩy, bấm ô <b>B2</b>, gõ dấu phẩy, bấm ô <b>C2</b>, rồi gõ <code>)</code>.',
            'Gõ <code>+</code>, bấm ô <b>D2</b>, nhấn <kbd>Enter</kbd>.',
            'Nếu ô hiện số 45396, vào <b>Home › Number Format › Short Date</b> để hiện thành ngày.',
            'Bấm lại ô E2, nhấp đúp vào chấm vuông nhỏ ở góc dưới bên phải để chép xuống cả cột.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp với ngày' },
        {
          t: 'table',
          head: ['Hiện tượng', 'Nguyên nhân', 'Cách sửa'],
          rows: [
            ['Kết quả là số lạ như 45396', 'Ô đang để định dạng số (General)', 'Đổi định dạng ô thành <b>Short Date</b>'],
            ['Ngày bị <b>căn trái</b>, cộng trừ ra <code>#VALUE!</code>', 'Excel hiểu ngày đó là chữ, thường do máy cài kiểu tháng/ngày (mm/dd) mà bạn gõ ngày/tháng', 'Kiểm tra cài đặt vùng của Windows, hoặc ghép lại bằng <code>DATE</code> cho chắc'],
            ['Gõ 03/04 mà Excel hiểu là 4 tháng 3', 'Máy đang dùng kiểu mm/dd', 'Như trên. Gõ ngày đủ năm rồi kiểm tra lại bằng hàm DAY, MONTH'],
            ['Ô hiện <code>#######</code>', 'Cột quá hẹp để hiện ngày, hoặc ra ngày âm', 'Kéo rộng cột. Nếu vẫn lỗi, kiểm tra phép trừ có bị ngược không'],
            ['Ngày lập phiếu tự đổi mỗi ngày', 'Dùng <code>TODAY()</code> cho ngày cần cố định', 'Nhấn <kbd>Ctrl</kbd> + <kbd>;</kbd> để nhập ngày cố định']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Ô A2 chứa ngày 28/02/2024. Công thức =A2+2 cho kết quả gì?',
          options: ['30/02/2024', '01/03/2024', '02/03/2024', '#VALUE!'],
          answer: 1,
          explain: 'Năm 2024 là năm nhuận nên tháng 2 có 29 ngày: 28/02 lật thêm 2 trang lịch là 01/03/2024.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Muốn ghi ngày lập phiếu cố định, không đổi khi mở file vào hôm sau, nên làm gì?',
          options: ['Gõ =TODAY()', 'Gõ =NOW()', 'Nhấn Ctrl + ;', 'Gõ =DATE()'],
          answer: 2,
          explain: 'Ctrl + ; nhập ngày hôm nay dạng giá trị cố định. TODAY và NOW luôn tự cập nhật theo ngày mở file.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'A2, B2, C2 lần lượt là 15, 3, 2024 (ngày, tháng, năm). Công thức nào ra ngày 15/03/2024?',
          options: ['=DATE(A2,B2,C2)', '=DATE(C2,B2,A2)', '=DATE(B2,A2,C2)', '=A2&B2&C2'],
          answer: 1,
          explain: 'DATE luôn nhận theo thứ tự năm, tháng, ngày. Năm nằm ở C2 nên C2 phải đứng đầu.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Phần mềm kho xuất năm, tháng, ngày ở 3 cột riêng. Dùng hàm <b>DATE</b> ghép lại thành <b>Ngày nhập kho</b> ở ô <code>D2</code>, rồi sao chép xuống D3:D5.',
          data: [
            ['Năm', 'Tháng', 'Ngày', 'Ngày nhập kho'],
            [2024, 1, 8],
            [2024, 2, 29],
            [2024, 7, 15],
            [2024, 11, 3]
          ],
          fill: { range: 'D2:D5', solution: '=DATE(A2,B2,C2)' },
          mustUse: ['DATE'],
          fmt: { D: 'date' },
          hint: 'Thứ tự đối số là <b>năm, tháng, ngày</b>, đúng bằng thứ tự 3 cột A, B, C: <code>=DATE(A2,B2,C2)</code>.',
          explain: 'DATE biến 3 con số thành một ngày thật (số seri). Nhờ vậy các cột sau có thể cộng trừ, lọc, sắp xếp theo ngày.'
        },
        {
          id: 'ex2',
          task: 'Công ty cho khách nợ một số ngày, ghi ở <b>ô F2</b>. Tính <b>Hạn thanh toán</b> = Ngày hoá đơn + số ngày nợ. Viết ở ô <code>C2</code> sao cho khi sao chép xuống C3:C6 vẫn luôn cộng với ô F2.',
          data: [
            ['Số HĐ', 'Ngày hoá đơn', 'Hạn thanh toán'],
            ['HD0101', '05/01/2024', '', '', 'Số ngày nợ', 45],
            ['HD0102', '20/01/2024'],
            ['HD0215', '14/02/2024'],
            ['HD0330', '30/03/2024'],
            ['HD1120', '25/11/2024']
          ],
          fill: { range: 'C2:C6', solution: '=B2+$F$2' },
          fmt: { C: 'date' },
          hint: 'Ngày là số nên cộng thẳng được. Nhớ thêm dấu $ để khoá ô F2: <code>=B2+$F$2</code>.',
          explain: 'Hoá đơn 25/11/2024 cộng 45 ngày ra 09/01/2025. Đổi số ở F2 thành 30 hay 60, cả cột tự tính lại.'
        },
        {
          id: 'ex3',
          task: 'Tính <b>Ngày giao dự kiến</b> ở cột E: ghép ngày đặt từ 3 cột Năm, Tháng, Ngày, rồi cộng thêm <b>Số ngày vận chuyển</b> ở cột D. Viết một công thức ở ô <code>E2</code> rồi sao chép xuống E3:E5.',
          data: [
            ['Năm', 'Tháng', 'Ngày', 'Số ngày VC', 'Ngày giao dự kiến'],
            [2024, 4, 26, 6],
            [2024, 6, 28, 3],
            [2024, 8, 30, 5],
            [2024, 12, 27, 7]
          ],
          fill: { range: 'E2:E5', solution: '=DATE(A2,B2,C2)+D2' },
          fmt: { E: 'date' },
          hint: 'Làm giống phần "Excel tính từng bước" ở trên: ghép ngày bằng DATE rồi cộng số ngày. <code>=DATE(A2,B2,C2)+D2</code>.',
          explain: 'Có thể đặt DATE ngay trong phép cộng, không cần cột trung gian. Đơn cuối: 27/12/2024 + 7 ngày = 03/01/2025.'
        }
      ]
    },

    /* ---------------- Bài 2 ---------------- */
    {
      id: 'tach-ngay',
      title: 'Tách ngày: DAY, MONTH, YEAR, WEEKDAY, WEEKNUM',
      minutes: 14,
      funcs: ['DAY', 'MONTH', 'YEAR', 'WEEKDAY', 'WEEKNUM'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Sếp cần <b>doanh thu theo từng tháng</b>. Phòng nhân sự cần biết ngày nào là <b>Thứ 7, Chủ nhật</b> để tính công cuối tuần. Nhưng bảng chỉ có một cột ngày.</p><p>Nhóm hàm này <b>tách</b> một ngày ra từng phần: ngày, tháng, năm, thứ mấy, tuần thứ mấy. Có cột Tháng, cột Thứ rồi thì cộng, đếm, lọc đều dễ.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> giống nhìn vào một tờ lịch bóc. Trên tờ lịch có sẵn ngày, tháng, năm và thứ mấy. Mỗi hàm chỉ việc <b>đọc một dòng</b> trên tờ lịch đó.' },
        { t: 'h', text: 'DAY, MONTH, YEAR: lấy ngày, tháng, năm' },
        { t: 'p', html: '<code>=DAY(A2)</code> lấy ngày trong tháng (1 đến 31). <code>=MONTH(A2)</code> lấy tháng (1 đến 12). <code>=YEAR(A2)</code> lấy năm. Cả ba chỉ cần một đối số là ô chứa ngày.' },
        {
          t: 'example',
          title: 'Tách ngày, tháng, năm của ngày đơn hàng',
          data: [
            ['Ngày đơn hàng', 'Ngày', 'Tháng', 'Năm'],
            ['15/03/2024', '=DAY(A2)', '=MONTH(A2)', '=YEAR(A2)'],
            ['02/11/2024', '=DAY(A3)', '=MONTH(A3)', '=YEAR(A3)']
          ],
          fmt: { D: 'raw' },
          note: 'Kết quả là số bình thường (15, 3, 2024), dùng được trong SUMIF, COUNTIF, IF… như mọi con số khác.'
        },
        { t: 'h', text: 'WEEKDAY: ngày đó là thứ mấy' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem ý nghĩa',
          data: [
            ['Ngày', 'Thứ'],
            ['05/04/2024', ''],
            ['06/04/2024', ''],
            ['07/04/2024', '']
          ],
          cell: 'B2',
          formula: '=WEEKDAY(A2,2)',
          parts: [
            { label: 'Ngày nào', desc: 'Ô chứa ngày cần xem thứ. Ở đây là ô A2, ngày 05/04/2024.' },
            { label: 'Đánh số thứ kiểu gì', desc: 'Ghi <b>2</b> để đánh số theo thói quen người Việt: Thứ 2 = 1, Thứ 3 = 2 … Thứ 7 = 6, Chủ nhật = 7. Bỏ trống thì Excel dùng kiểu Mỹ: Chủ nhật = 1.', range: 'B2' }
          ],
          note: 'Ngày 05/04/2024 là Thứ 6 nên kết quả là 5.'
        },
        {
          t: 'table',
          head: ['Thứ', 'Kiểu 2 (nên dùng)', 'Kiểu 1 (bỏ trống)'],
          rows: [
            ['Thứ 2', '1', '2'],
            ['Thứ 3', '2', '3'],
            ['Thứ 4', '3', '4'],
            ['Thứ 5', '4', '5'],
            ['Thứ 6', '5', '6'],
            ['Thứ 7', '6', '7'],
            ['Chủ nhật', '7', '1']
          ]
        },
        { t: 'h', text: 'Excel đánh dấu ngày cuối tuần như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Ngày', 'Loại ngày'],
            ['06/04/2024', ''],
            ['08/04/2024']
          ],
          cell: 'B2',
          formula: '=IF(WEEKDAY(A2,2)>5,"Cuối tuần","Ngày thường")',
          steps: [
            { html: 'Excel đọc ô <b>A2</b>: ngày 06/04/2024.', hl: [['A2', 0]], select: 'A2' },
            { html: '<code>WEEKDAY(A2,2)</code> xem tờ lịch: hôm đó là <b>Thứ 7</b>, theo kiểu 2 ra số <b>6</b>.', hl: [['A2', 0]], select: 'A2' },
            { html: 'So sánh 6 &gt; 5: <b>đúng</b>. Với kiểu 2, chỉ Thứ 7 (6) và Chủ nhật (7) lớn hơn 5.', hl: [['A2', 0]], select: 'A2' },
            { html: 'Điều kiện đúng nên IF trả về chữ <b>"Cuối tuần"</b>, hiện ở ô B2.', hl: [['B2', 2]], select: 'B2' },
            { html: 'Kéo xuống B3: ngày 08/04/2024 là Thứ 2, WEEKDAY ra 1, 1 &gt; 5 sai, nên ra <b>"Ngày thường"</b>.', hl: [['A3', 0], ['B3', 2]], select: 'B3' }
          ]
        },
        { t: 'tip', html: 'Luôn dùng <b>kiểu 2</b>. Ngày cuối tuần khi đó luôn là 6 và 7, chỉ cần kiểm tra <code>WEEKDAY(A2,2)&gt;5</code>.' },
        { t: 'h', text: 'WEEKNUM: tuần thứ mấy trong năm' },
        { t: 'p', html: '<code>=WEEKNUM(A2,2)</code> cho biết ngày A2 thuộc tuần thứ mấy của năm, tuần bắt đầu từ Thứ 2 (số 2 ở cuối). Dùng để làm báo cáo tuần. Cột Tên thứ bên dưới dùng thêm CHOOSE để đổi số thành chữ.' },
        {
          t: 'example',
          title: 'Bảng chấm công: thứ, tuần và loại ngày',
          data: [
            ['Ngày', 'Thứ (kiểu 2)', 'Tên thứ', 'Tuần', 'Loại ngày'],
            ['15/03/2024', '=WEEKDAY(A2,2)', '=CHOOSE(WEEKDAY(A2),"CN","T2","T3","T4","T5","T6","T7")', '=WEEKNUM(A2,2)', '=IF(B2>5,"Cuối tuần","Ngày thường")'],
            ['16/03/2024', '=WEEKDAY(A3,2)', '=CHOOSE(WEEKDAY(A3),"CN","T2","T3","T4","T5","T6","T7")', '=WEEKNUM(A3,2)', '=IF(B3>5,"Cuối tuần","Ngày thường")'],
            ['17/03/2024', '=WEEKDAY(A4,2)', '=CHOOSE(WEEKDAY(A4),"CN","T2","T3","T4","T5","T6","T7")', '=WEEKNUM(A4,2)', '=IF(B4>5,"Cuối tuần","Ngày thường")'],
            ['18/03/2024', '=WEEKDAY(A5,2)', '=CHOOSE(WEEKDAY(A5),"CN","T2","T3","T4","T5","T6","T7")', '=WEEKNUM(A5,2)', '=IF(B5>5,"Cuối tuần","Ngày thường")']
          ],
          note: '15/03/2024 là Thứ 6 (kiểu 2 ra 5). Ngày 18/03 là Thứ 2 nên sang tuần 12. Cột Tên thứ dùng WEEKDAY kiểu 1 (CN = 1) để khớp với thứ tự "CN","T2"… trong CHOOSE.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'ChamCong.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Bấm tab <b>Formulas</b>.' },
            { id: 'formulas.datetime', n: 2, text: 'Nút <b>Date &amp; Time</b> chứa tất cả hàm ngày giờ: DAY, MONTH, YEAR, WEEKDAY, WEEKNUM…' }
          ],
          caption: 'Gõ thẳng công thức vào ô vẫn nhanh hơn. Khi gõ <code>=WEEKDAY(A2,</code> Excel hiện danh sách các kiểu đánh số để bạn chọn.'
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Lỗi', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Quên số kiểu trong WEEKDAY', '<code>=WEEKDAY(A2)&gt;5</code> đánh dấu nhầm Thứ 6 là cuối tuần và bỏ sót Chủ nhật (vì CN = 1)', 'Luôn ghi <code>WEEKDAY(A2,2)</code>'],
            ['Kết quả hiện thành ngày lạ', 'MONTH ra 3 nhưng ô hiện 03/01/1900', 'Ô đang định dạng ngày. Đổi định dạng ô về <b>General</b>'],
            ['Ra <code>#VALUE!</code>', 'Ô A2 là chữ "15/03/2024" chứ không phải ngày thật', 'Nhập lại ngày, hoặc ghép bằng DATE'],
            ['Báo cáo tháng lẫn nhiều năm', 'Tháng 1/2024 và tháng 1/2025 bị cộng chung', 'Thêm cột Năm và dùng SUMIFS theo cả tháng lẫn năm']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Ngày 21/04/2024 là Chủ nhật. =WEEKDAY("21/04/2024",2) cho kết quả bao nhiêu?',
          options: ['1', '0', '7', '6'],
          answer: 2,
          explain: 'Kiểu 2 đánh số Thứ 2 = 1 đến Chủ nhật = 7. Nếu bỏ trống kiểu (kiểu 1) thì Chủ nhật = 1.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Cột A chứa ngày bán hàng. Muốn thêm cột Tháng để làm báo cáo bằng SUMIF, ở B2 viết gì?',
          options: ['=DAY(A2)', '=MONTH(A2)', '=WEEKNUM(A2)', '=DATE(A2)'],
          answer: 1,
          explain: 'MONTH trả về số tháng 1 đến 12. Sau đó dùng SUMIF theo cột Tháng để cộng doanh thu từng tháng.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Công thức =WEEKDAY(A2)>5 dùng để đánh dấu cuối tuần sai ở đâu?',
          options: ['Không sai gì', 'Thiếu số 2 nên Thứ 6 bị tính là cuối tuần, Chủ nhật bị bỏ sót', 'Phải dùng WEEKNUM', 'Phải so sánh >7'],
          answer: 1,
          explain: 'Bỏ trống kiểu thì Excel dùng kiểu 1: Thứ 6 = 6, Thứ 7 = 7, Chủ nhật = 1. Ghi WEEKDAY(A2,2) thì mới đúng.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tách <b>Tháng</b> (cột C) và <b>Năm</b> (cột D) từ ngày đặt ở cột B. Viết công thức ở ô <code>C2</code> và <code>D2</code>, rồi sao chép xuống đến hàng 6.',
          data: [
            ['Đơn hàng', 'Ngày đặt', 'Tháng', 'Năm'],
            ['DH001', '08/01/2024'],
            ['DH002', '29/02/2024'],
            ['DH003', '17/06/2024'],
            ['DH004', '31/12/2024'],
            ['DH005', '03/01/2025']
          ],
          fill: [
            { range: 'C2:C6', solution: '=MONTH(B2)' },
            { range: 'D2:D6', solution: '=YEAR(B2)' }
          ],
          fmt: { D: 'raw' },
          strict: false,
          hint: 'Mỗi hàm chỉ cần ô ngày: <code>=MONTH(B2)</code> ở C2 và <code>=YEAR(B2)</code> ở D2.',
          explain: 'Có cột Tháng và Năm rồi, bạn dùng SUMIFS hoặc PivotTable để tổng hợp doanh thu theo từng tháng của từng năm.'
        },
        {
          id: 'ex2',
          task: 'Bảng chấm công: cột B tính <b>Thứ</b> theo kiểu 2 (Thứ 2 = 1 … CN = 7). Cột C tính <b>Tuần</b> trong năm (tuần bắt đầu Thứ 2). Cột D ghi <b>"Cuối tuần"</b> nếu là Thứ 7 hoặc Chủ nhật, ngược lại ghi <b>"Ngày thường"</b>. Viết ở hàng 2 rồi sao chép xuống đến hàng 6.',
          data: [
            ['Ngày', 'Thứ', 'Tuần', 'Loại ngày'],
            ['05/04/2024'],
            ['06/04/2024'],
            ['07/04/2024'],
            ['08/04/2024'],
            ['30/04/2024']
          ],
          fill: [
            { range: 'B2:B6', solution: '=WEEKDAY(A2,2)' },
            { range: 'C2:C6', solution: '=WEEKNUM(A2,2)' },
            { range: 'D2:D6', solution: '=IF(WEEKDAY(A2,2)>5,"Cuối tuần","Ngày thường")' }
          ],
          strict: false,
          hint: 'B2: <code>=WEEKDAY(A2,2)</code>. C2: <code>=WEEKNUM(A2,2)</code>. D2 dùng luôn kết quả ở B2: <code>=IF(B2&gt;5,"Cuối tuần","Ngày thường")</code>.',
          explain: '06/04 và 07/04/2024 là Thứ 7 và Chủ nhật nên ra 6 và 7. Ngày 08/04 là Thứ 2 nên sang tuần mới (tuần 15).'
        },
        {
          id: 'ex3',
          task: 'Làm báo cáo doanh thu theo tháng. Bước 1: ở cột C tính <b>Tháng</b> của ngày bán (viết ở ô <code>C2</code>, sao chép xuống C3:C9). Bước 2: ở ô <code>G2</code> tính <b>tổng doanh thu của tháng ghi ở ô F2</b>.',
          data: [
            ['Ngày bán', 'Doanh thu', 'Tháng', '', '', 'Tháng cần xem', 'Tổng doanh thu'],
            ['05/01/2024', 12500000, '', '', '', 2],
            ['18/01/2024', 8400000],
            ['02/02/2024', 15600000],
            ['14/02/2024', 9800000],
            ['27/02/2024', 11200000],
            ['08/03/2024', 13700000],
            ['21/03/2024', 7600000],
            ['30/03/2024', 10400000]
          ],
          fill: { range: 'C2:C9', solution: '=MONTH(A2)' },
          answers: [{ cell: 'G2', solution: '=SUMIF(C2:C9,F2,B2:B9)' }],
          fmt: { B: 'int', G: 'int' },
          hint: 'C2: <code>=MONTH(A2)</code>. G2: cộng doanh thu của những dòng có Tháng bằng F2: <code>=SUMIF(C2:C9,F2,B2:B9)</code>.',
          explain: 'Tháng 2 có 3 đơn: 15.600.000 + 9.800.000 + 11.200.000 = 36.600.000. Đổi F2 thành 1 hoặc 3 để xem tháng khác. Cột phụ Tháng là cách đơn giản và chắc chắn nhất để báo cáo theo tháng.'
        }
      ]
    },

    /* ---------------- Bài 3 ---------------- */
    {
      id: 'khoang-cach',
      title: 'Khoảng cách giữa hai ngày: DATEDIF, DAYS',
      minutes: 14,
      funcs: ['DATEDIF', 'DAYS'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Cuối năm, phòng nhân sự cần <b>tuổi</b> và <b>thâm niên</b> của từng người để xét thưởng: "anh Khoa đã làm được 3 năm 3 tháng". Lấy số ngày chia 365 thì dễ lệch, vì có năm nhuận, tháng dài tháng ngắn.</p><p>Hàm <b>DATEDIF</b> đếm đúng số năm tròn, tháng tròn giữa hai ngày, giống như bạn ngồi đếm trên lịch.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> ngày là số thứ tự trang lịch, nên ngày sau trừ ngày trước ra <b>số ngày</b>. DATEDIF làm thêm một việc: đếm xem giữa hai trang lịch đó có bao nhiêu <b>lần sinh nhật</b> (năm tròn) hoặc bao nhiêu <b>lần qua cùng ngày của tháng sau</b> (tháng tròn).' },
        { t: 'h', text: 'Công thức DATEDIF gồm 3 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu',
          data: [
            ['Nhân viên', 'Ngày sinh', 'Tuổi', '', 'Ngày chốt', '31/12/2024'],
            ['Nguyễn Thu Hà', '20/08/1990', ''],
            ['Trần Minh Khoa', '05/01/1998', ''],
            ['Lê Văn Phúc', '15/12/1985', '']
          ],
          cell: 'C2',
          formula: '=DATEDIF(B2,$F$1,"Y")',
          parts: [
            { label: 'Từ ngày', desc: 'Ngày bắt đầu đếm: ngày sinh, ngày vào làm, ngày ký hợp đồng. Phải là ngày <b>sớm hơn</b>.' },
            { label: 'Đến ngày', desc: 'Ngày kết thúc: ngày chốt báo cáo. Dấu $ giữ ô F1 đứng yên khi kéo công thức xuống.' },
            { label: 'Đếm theo đơn vị gì', desc: '<b>"Y"</b> là đếm số năm tròn. <b>"M"</b> là số tháng tròn, <b>"D"</b> là số ngày. Luôn đặt trong ngoặc kép.', range: 'C2' }
          ],
          note: 'Chị Hà sinh 20/08/1990. Đến 31/12/2024 đã qua sinh nhật năm nay nên tròn <b>34</b> tuổi.'
        },
        {
          t: 'table',
          head: ['Đơn vị', 'Đếm gì', 'Dùng khi'],
          rows: [
            ['"Y"', 'Số năm tròn', 'Tuổi, số năm thâm niên'],
            ['"M"', 'Số tháng tròn', 'Số tháng làm việc, số tháng thuê'],
            ['"D"', 'Số ngày', 'Giống phép trừ hai ngày'],
            ['"YM"', 'Số tháng lẻ, sau khi bỏ các năm tròn', 'Thâm niên dạng "x năm y tháng"'],
            ['"MD"', 'Số ngày lẻ, sau khi bỏ các tháng tròn', 'Ít dùng, có thể lệch ở vài trường hợp cuối tháng']
          ]
        },
        { t: 'h', text: 'Excel đếm tuổi như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Nhân viên', 'Ngày sinh', 'Tuổi', '', 'Ngày chốt', '31/12/2024'],
            ['Nguyễn Thu Hà', '20/08/1990', ''],
            ['Lê Văn Phúc', '15/12/1985']
          ],
          cell: 'C2',
          formula: '=DATEDIF(B2,$F$1,"Y")',
          steps: [
            { html: 'Excel đọc ô <b>B2</b>: bắt đầu đếm từ ngày <b>20/08/1990</b>.', hl: [['B2', 0]], select: 'B2' },
            { html: 'Đọc ô <b>F1</b>: đếm đến ngày <b>31/12/2024</b>.', hl: [['B2', 0], ['F1', 1]], select: 'F1' },
            { html: 'Đơn vị <b>"Y"</b>: đếm số lần qua ngày sinh nhật 20/08. Lần 1 là 20/08/1991, lần 2 là 20/08/1992…', hl: [['B2', 0], ['F1', 1]], select: 'B2' },
            { html: 'Lần thứ 34 là <b>20/08/2024</b>, vẫn trước ngày chốt 31/12/2024 nên được tính.', hl: [['B2', 0], ['F1', 1]], select: 'F1' },
            { html: 'Lần thứ 35 là 20/08/2025, đã vượt ngày chốt nên dừng. Kết quả <b>34</b> hiện ở ô C2.', hl: [['C2', 2]], select: 'C2' },
            { html: 'Kéo xuống C3: anh Phúc sinh 15/12/1985, sinh nhật 15/12/2024 vừa qua trước ngày chốt, nên ra <b>39</b> tuổi.', hl: [['B3', 0], ['F1', 1], ['C3', 2]], select: 'C3' }
          ]
        },
        { t: 'h', text: 'Thâm niên dạng "x năm y tháng"' },
        { t: 'p', html: 'Dùng hai lần DATEDIF: lần đầu đơn vị "Y" lấy số năm, lần sau đơn vị "YM" lấy số tháng lẻ, rồi nối lại bằng dấu <code>&amp;</code>.' },
        {
          t: 'example',
          title: 'Tuổi và thâm niên tính đến ngày chốt 31/12/2024 (ô G1)',
          data: [
            ['Nhân viên', 'Ngày sinh', 'Ngày vào làm', 'Tuổi', 'Thâm niên', 'Ngày chốt', '31/12/2024'],
            ['Nguyễn Thu Hà', '20/08/1990', '15/03/2016', '=DATEDIF(B2,$G$1,"Y")', '=DATEDIF(C2,$G$1,"Y")&" năm "&DATEDIF(C2,$G$1,"YM")&" tháng"'],
            ['Trần Minh Khoa', '05/01/1998', '01/09/2021', '=DATEDIF(B3,$G$1,"Y")', '=DATEDIF(C3,$G$1,"Y")&" năm "&DATEDIF(C3,$G$1,"YM")&" tháng"']
          ],
          note: 'Anh Khoa vào làm 01/09/2021, đến ngày chốt được 3 năm 3 tháng.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          title: 'Gõ công thức tính tuổi',
          items: [
            'Bấm vào ô <b>C2</b>, gõ <code>=DATEDIF(</code>. Excel sẽ <b>không hiện gợi ý</b>, cứ gõ tiếp bình thường.',
            'Bấm ô <b>B2</b> (ngày sinh), gõ dấu phẩy.',
            'Bấm ô <b>F1</b> (ngày chốt), nhấn <kbd>F4</kbd> để thành <code>$F$1</code>, gõ dấu phẩy.',
            'Gõ <code>"Y")</code> rồi nhấn <kbd>Enter</kbd>.',
            'Nhấp đúp vào chấm vuông nhỏ ở góc ô C2 để chép xuống cả cột.'
          ]
        },
        { t: 'warn', html: 'DATEDIF là hàm "ẩn": Excel <b>không gợi ý</b> khi bạn gõ và không có trong nút Formulas › Date &amp; Time, nhưng vẫn tính bình thường. Hãy gõ đủ tên hàm. Đơn vị viết hoa hay thường đều được (<code>"Y"</code> hay <code>"y"</code>), miễn là nằm trong ngoặc kép.' },
        { t: 'tip', html: 'Muốn tính đến hôm nay, thay ô ngày chốt bằng <code>TODAY()</code>: <code>=DATEDIF(B2,TODAY(),"Y")</code>. Trong báo cáo chính thức nên dùng một ô ngày chốt cố định để số liệu không đổi khi mở lại file.' },
        { t: 'h', text: 'DAYS: số ngày giữa hai ngày' },
        { t: 'p', html: '<code>=DAYS(ngày kết thúc, ngày bắt đầu)</code> cho ra số ngày chênh lệch, giống phép trừ. Chú ý: <b>ngày kết thúc đứng trước</b>. Kết hợp với MAX(0, …) để biến số âm (trả sớm) thành 0.' },
        {
          t: 'example',
          title: 'Số ngày trễ hạn thanh toán',
          data: [
            ['Số HĐ', 'Hạn thanh toán', 'Ngày thanh toán', 'Số ngày trễ'],
            ['HD101', '25/04/2024', '10/05/2024', '=MAX(0,DAYS(C2,B2))'],
            ['HD102', '30/04/2024', '28/04/2024', '=MAX(0,DAYS(C3,B3))']
          ],
          note: 'HD101 trả trễ 15 ngày. HD102 trả sớm nên DAYS ra số âm (−2), MAX(0, …) đổi số âm thành 0.'
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Lỗi', 'Nguyên nhân', 'Cách sửa'],
          rows: [
            ['<code>#NUM!</code>', '"Từ ngày" muộn hơn "Đến ngày", ví dụ đảo ngày sinh và ngày chốt', 'Đặt ngày sớm hơn ở đối số thứ nhất'],
            ['<code>#NAME?</code>', 'Quên ngoặc kép ở đơn vị: <code>DATEDIF(B2,F1,Y)</code>', 'Viết <code>"Y"</code>'],
            ['Tuổi lệch 1', 'Tính bằng <code>(F1-B2)/365</code>, bị năm nhuận làm sai', 'Dùng <code>DATEDIF(…,"Y")</code>'],
            ['DAYS ra số âm', 'Đảo thứ tự: <code>DAYS(ngày đầu, ngày cuối)</code>', 'Ngày kết thúc đứng trước: <code>DAYS(C2,B2)</code>'],
            ['Kéo xuống bị sai', 'Quên khoá ô ngày chốt', 'Viết <code>$F$1</code>']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Nhân viên vào làm 01/09/2021. Ngày chốt 31/12/2024. =DATEDIF(B2,C2,"YM") cho kết quả bao nhiêu?',
          options: ['3', '39', '4', '0'],
          answer: 0,
          explain: 'Từ 01/09/2021 đến 31/12/2024 là 3 năm và 3 tháng lẻ (tổng 39 tháng). "YM" chỉ lấy phần tháng lẻ sau khi bỏ các năm tròn, nên ra 3.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Công thức =DAYS("25/04/2024","10/05/2024") cho kết quả gì?',
          options: ['15', '-15', '#NUM!', '0'],
          answer: 1,
          explain: 'DAYS lấy đối số thứ nhất trừ đối số thứ hai. Ở đây ngày đứng trước sớm hơn nên ra −15. Nhớ: DAYS(ngày kết thúc, ngày bắt đầu).'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Muốn tính số tháng tròn đã thuê kho từ B2 đến C2, công thức nào đúng?',
          options: ['=DATEDIF(B2,C2,"M")', '=DATEDIF(C2,B2,"M")', '=DATEDIF(B2,C2,M)', '=(C2-B2)/12'],
          answer: 0,
          explain: 'Từ ngày (sớm hơn) đứng trước, đến ngày đứng sau, đơn vị "M" trong ngoặc kép. Đảo ngày sẽ ra #NUM!, thiếu ngoặc kép ra #NAME?.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tính <b>Tuổi</b> (số năm tròn) của từng nhân viên tính đến <b>ngày chốt ở ô F1</b>. Viết ở ô <code>C2</code> rồi sao chép xuống C3:C6.',
          data: [
            ['Nhân viên', 'Ngày sinh', 'Tuổi', '', 'Ngày chốt', '31/12/2024'],
            ['Lê Thị Mai', '12/05/1995'],
            ['Phạm Văn Tuấn', '30/12/1988'],
            ['Hoàng Thu Trang', '01/01/2000'],
            ['Đỗ Quang Huy', '15/07/1979'],
            ['Vũ Ngọc Lan', '29/02/1996']
          ],
          fill: { range: 'C2:C6', solution: '=DATEDIF(B2,$F$1,"Y")' },
          mustUse: ['DATEDIF'],
          strict: false,
          hint: 'Từ ngày là ngày sinh, đến ngày là ô F1 (nhớ khoá $), đơn vị "Y": <code>=DATEDIF(B2,$F$1,"Y")</code>.',
          explain: 'Anh Tuấn sinh 30/12/1988 nên đến 31/12/2024 vừa tròn 36 tuổi. Nếu chia số ngày cho 365 sẽ dễ lệch 1 tuổi ở những người sắp đến sinh nhật.'
        },
        {
          id: 'ex2',
          task: 'Tính thâm niên đến <b>ngày chốt ở ô G1</b>: cột C là <b>Số năm</b> tròn, cột D là <b>Số tháng lẻ</b> (sau khi bỏ các năm tròn). Viết ở ô <code>C2</code>, <code>D2</code> rồi sao chép xuống đến hàng 5.',
          data: [
            ['Nhân viên', 'Ngày vào làm', 'Số năm', 'Số tháng lẻ', '', 'Ngày chốt', '30/06/2024'],
            ['Nguyễn Văn Bình', '10/03/2015'],
            ['Trần Thị Hồng', '01/07/2019'],
            ['Lý Minh Đức', '20/11/2022'],
            ['Phan Thanh Tâm', '05/06/2010']
          ],
          fill: [
            { range: 'C2:C5', solution: '=DATEDIF(B2,$G$1,"Y")' },
            { range: 'D2:D5', solution: '=DATEDIF(B2,$G$1,"YM")' }
          ],
          strict: false,
          hint: 'Hai công thức chỉ khác đơn vị. C2: <code>=DATEDIF(B2,$G$1,"Y")</code>. D2: <code>=DATEDIF(B2,$G$1,"YM")</code>.',
          explain: 'Chị Hồng vào làm 01/07/2019, đến 30/06/2024 còn thiếu 1 ngày mới tròn 5 năm, nên ra 4 năm 11 tháng. Đây là con số dùng để xét phép năm, thưởng thâm niên.'
        },
        {
          id: 'ex3',
          task: 'Theo dõi công nợ: ở cột E tính <b>Số ngày trễ</b> = ngày thanh toán trừ hạn thanh toán (trả sớm hoặc đúng hạn thì ghi 0). Ở cột F tính <b>Tiền phạt</b> = Giá trị × Số ngày trễ × <b>mức phạt mỗi ngày ở ô H1</b>. Viết ở hàng 2 rồi sao chép xuống đến hàng 5.',
          data: [
            ['Số HĐ', 'Giá trị', 'Hạn TT', 'Ngày TT', 'Số ngày trễ', 'Tiền phạt', 'Phạt/ngày', 0.0005],
            ['HD201', 120000000, '15/05/2024', '27/05/2024'],
            ['HD202', 85000000, '20/05/2024', '18/05/2024'],
            ['HD203', 240000000, '31/05/2024', '20/06/2024'],
            ['HD204', 56000000, '10/06/2024', '10/06/2024']
          ],
          fill: [
            { range: 'E2:E5', solution: '=MAX(0,DAYS(D2,C2))' },
            { range: 'F2:F5', solution: '=B2*E2*$H$1' }
          ],
          fmt: { B: 'int', F: 'int', H: 'pct' },
          hint: 'E2: ngày thanh toán đứng trước, bọc MAX(0, …) để bỏ số âm: <code>=MAX(0,DAYS(D2,C2))</code> (hoặc <code>=MAX(0,D2-C2)</code>). F2: <code>=B2*E2*$H$1</code>.',
          explain: 'HD203 trễ 20 ngày nên phạt 240.000.000 × 20 × 0,05% = 2.400.000 đ. HD202 trả sớm nên số ngày trễ là 0 và không bị phạt.'
        }
      ]
    },

    /* ---------------- Bài 4 ---------------- */
    {
      id: 'edate',
      title: 'Cộng tháng và cuối tháng: EDATE, EOMONTH',
      minutes: 12,
      funcs: ['EDATE', 'EOMONTH'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Hợp đồng lao động 12 tháng, bảo hành 6 tháng, thử việc 2 tháng. Nhiều người lấy ngày ký cộng 30 ngày cho mỗi tháng. Nhưng tháng có 28, 29, 30 hoặc 31 ngày, nên ngày hết hạn bị lệch.</p><p>Hàm <b>EDATE</b> cộng đúng theo <b>tháng lịch</b>: ký ngày 15 thì sau N tháng vẫn là ngày 15. Hàm <b>EOMONTH</b> tìm ngày cuối tháng, rất tiện cho hạn thanh toán và chốt sổ.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> cộng ngày là lật từng trang lịch. Còn EDATE là <b>lật cả tờ tháng</b>: đang ở ngày 15 tháng 3, lật 12 tờ thì đến ngày 15 tháng 3 năm sau, không cần biết mỗi tháng dài bao nhiêu.' },
        {
          t: 'example',
          title: 'Cộng 30 ngày khác với cộng 1 tháng',
          data: [
            ['Ngày ký', 'Cộng 30 ngày', 'Cộng 1 tháng (EDATE)'],
            ['15/01/2024', '=A2+30', '=EDATE(A2,1)'],
            ['31/01/2024', '=A3+30', '=EDATE(A3,1)'],
            ['15/03/2024', '=A4+30', '=EDATE(A4,1)']
          ],
          note: 'Cộng 30 ngày cho ra ngày 14 hoặc 01/03, còn EDATE giữ đúng ngày 15. Ngày 31/01 cộng 1 tháng ra 29/02/2024 vì tháng 2 không có ngày 31, EDATE lấy ngày cuối tháng.'
        },
        { t: 'h', text: 'Công thức EDATE gồm 2 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu',
          data: [
            ['Hợp đồng', 'Ngày ký', 'Số tháng', 'Cùng ngày sau N tháng'],
            ['HĐLĐ-01', '15/03/2024', 12, ''],
            ['HĐ thuê kho', '01/07/2024', 6, ''],
            ['Thử việc', '31/08/2024', 1, '']
          ],
          cell: 'D2',
          formula: '=EDATE(B2,C2)',
          parts: [
            { label: 'Từ ngày nào', desc: 'Ngày gốc, ở đây là ngày ký hợp đồng ở ô B2.' },
            { label: 'Cộng bao nhiêu tháng', desc: 'Số tháng cần cộng. Ghi số âm để lùi về trước, ví dụ −3 là 3 tháng trước.' }
          ],
          note: 'Dòng cuối: 31/08 cộng 1 tháng ra 30/09/2024, vì tháng 9 không có ngày 31.'
        },
        { t: 'h', text: 'Excel tính ngày hết hạn như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Hợp đồng', 'Ngày ký', 'Số tháng', 'Ngày hết hạn'],
            ['HĐLĐ-01', '15/03/2024', 12, ''],
            ['HĐ-XE-11', '31/10/2024', 4]
          ],
          cell: 'D2',
          formula: '=EDATE(B2,C2)-1',
          steps: [
            { html: 'Excel đọc ô <b>B2</b>: ngày ký <b>15/03/2024</b>.', hl: [['B2', 0]], select: 'B2' },
            { html: 'Đọc ô <b>C2</b>: thời hạn <b>12</b> tháng.', hl: [['B2', 0], ['C2', 1]], select: 'C2' },
            { html: 'EDATE lật 12 tờ tháng, giữ nguyên ngày 15: được <b>15/03/2025</b>.', hl: [['B2', 0], ['C2', 1]], select: 'C2' },
            { html: 'Trừ 1 ngày, vì ngày ký đã là ngày đầu tiên của hợp đồng: <b>14/03/2025</b>. Kết quả hiện ở ô D2.', hl: [['D2', 2]], select: 'D2' },
            { html: 'Kéo xuống D3: 31/10/2024 + 4 tháng. Tháng 2/2025 không có ngày 31 nên EDATE lấy ngày cuối là 28/02/2025, trừ 1 ngày ra <b>27/02/2025</b>.', hl: [['B3', 0], ['C3', 1], ['D3', 2]], select: 'D3' }
          ]
        },
        { t: 'h', text: 'EOMONTH: ngày cuối tháng' },
        { t: 'p', html: '<code>=EOMONTH(ngày, số tháng)</code> trả về <b>ngày cuối cùng</b> của tháng. Số tháng là 0 thì lấy cuối tháng này, 1 là cuối tháng sau, −1 là cuối tháng trước.' },
        {
          t: 'table',
          head: ['Công thức (A2 = 15/03/2024)', 'Kết quả', 'Dùng để'],
          rows: [
            ['=EOMONTH(A2,0)', '31/03/2024', 'Ngày cuối tháng này, hạn chốt sổ'],
            ['=EOMONTH(A2,1)', '30/04/2024', 'Hạn thanh toán "cuối tháng sau"'],
            ['=EOMONTH(A2,-1)+1', '01/03/2024', 'Ngày đầu tháng này'],
            ['=DAY(EOMONTH(A2,0))', '31', 'Số ngày trong tháng']
          ]
        },
        {
          t: 'example',
          title: 'Hạn thanh toán: cuối tháng kế tiếp tháng xuất hoá đơn',
          data: [
            ['Số HĐ', 'Ngày hoá đơn', 'Hạn thanh toán'],
            ['HD301', '05/01/2024', '=EOMONTH(B2,1)'],
            ['HD302', '28/01/2024', '=EOMONTH(B3,1)'],
            ['HD303', '12/12/2024', '=EOMONTH(B4,1)']
          ],
          note: 'Hoá đơn tháng 1 đều có hạn 29/02/2024 (năm nhuận), dù xuất đầu hay cuối tháng. Hoá đơn tháng 12/2024 có hạn 31/01/2025.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          title: 'Gõ công thức ngày hết hạn',
          items: [
            'Bấm vào ô <b>D2</b>, gõ <code>=EDATE(</code>',
            'Bấm ô <b>B2</b> (ngày ký), gõ dấu phẩy, bấm ô <b>C2</b> (số tháng), gõ <code>)</code>.',
            'Gõ <code>-1</code> rồi nhấn <kbd>Enter</kbd>.',
            'Nếu ô hiện số như 45730, vào <b>Home › Number Format › Short Date</b> (hoặc <kbd>Ctrl</kbd> + <kbd>1</kbd> › Date) để hiện thành ngày.',
            'Nhấp đúp vào chấm vuông nhỏ ở góc ô D2 để chép xuống cả cột.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Lỗi', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Cộng tháng bằng 30 ngày', '<code>=B2+12*30</code> ra 08/03/2025 thay vì 15/03/2025', 'Dùng <code>EDATE(B2,12)</code>'],
            ['Kết quả hiện số lạ', 'EDATE ra 45730', 'Đổi định dạng ô thành <b>Short Date</b>'],
            ['Ngày hết hạn dư 1 ngày', 'Hợp đồng 12 tháng ký 15/03/2024 ghi hết hạn 15/03/2025', 'Trừ 1: <code>EDATE(B2,C2)-1</code>'],
            ['Nhầm EDATE với EOMONTH', 'Cần "cùng ngày tháng sau" lại dùng EOMONTH ra ngày cuối tháng', 'Cùng ngày: EDATE. Cuối tháng: EOMONTH']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'A2 là 31/08/2024. =EDATE(A2,1) cho kết quả gì?',
          options: ['31/09/2024', '30/09/2024', '01/10/2024', '#NUM!'],
          answer: 1,
          explain: 'Tháng 9 chỉ có 30 ngày nên EDATE trả về ngày cuối cùng hợp lệ là 30/09/2024.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Muốn lấy ngày đầu tiên của tháng chứa ngày ở A2, công thức nào đúng?',
          options: ['=EOMONTH(A2,0)', '=EOMONTH(A2,-1)+1', '=EDATE(A2,-1)', '=EOMONTH(A2,1)-1'],
          answer: 1,
          explain: 'EOMONTH(A2,-1) là cuối tháng trước, cộng thêm 1 ngày là ngày đầu tháng này. Cách khác: =DATE(YEAR(A2),MONTH(A2),1).'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Hàng bảo hành 6 tháng kể từ ngày bán ở B2. Hạn bảo hành (cùng ngày sau 6 tháng) tính bằng công thức nào?',
          options: ['=B2+6', '=B2+180', '=EDATE(B2,6)', '=EOMONTH(B2,6)'],
          answer: 2,
          explain: 'EDATE cộng đúng 6 tháng lịch. B2+180 có thể lệch vài ngày, EOMONTH lại ra ngày cuối tháng.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tính <b>Ngày hết hạn</b> hợp đồng ở cột D = ngày ký cộng số tháng ở cột C, rồi <b>trừ 1 ngày</b>. Viết ở ô <code>D2</code> rồi sao chép xuống D3:D5.',
          data: [
            ['Hợp đồng', 'Ngày ký', 'Số tháng', 'Ngày hết hạn'],
            ['HĐ-NV-021', '01/04/2024', 12],
            ['HĐ-KHO-07', '15/01/2024', 6],
            ['HĐ-XE-11', '31/10/2024', 4],
            ['HĐ-TV-03', '20/05/2024', 2]
          ],
          fill: { range: 'D2:D5', solution: '=EDATE(B2,C2)-1' },
          mustUse: ['EDATE'],
          fmt: { D: 'date' },
          hint: 'Giống phần "Excel tính từng bước" ở trên: EDATE cộng tháng, rồi trừ 1. <code>=EDATE(B2,C2)-1</code>.',
          explain: 'Hợp đồng ký 31/10/2024 thời hạn 4 tháng: EDATE ra 28/02/2025 (tháng 2/2025 có 28 ngày), trừ 1 ngày thành 27/02/2025.'
        },
        {
          id: 'ex2',
          task: 'Điều khoản: khách thanh toán vào <b>ngày cuối của tháng thứ N</b> sau tháng xuất hoá đơn, N ghi ở <b>ô G2</b>. Tính <b>Hạn thanh toán</b> ở ô <code>D2</code> rồi sao chép xuống D3:D6.',
          data: [
            ['Số HĐ', 'Ngày hoá đơn', 'Số tiền', 'Hạn thanh toán'],
            ['HD401', '03/01/2024', 45000000, '', '', 'Số tháng gối đầu', 1],
            ['HD402', '25/02/2024', 18500000],
            ['HD403', '10/05/2024', 72000000],
            ['HD404', '30/08/2024', 33000000],
            ['HD405', '15/11/2024', 26500000]
          ],
          fill: { range: 'D2:D6', solution: '=EOMONTH(B2,$G$2)' },
          mustUse: ['EOMONTH'],
          fmt: { C: 'int', D: 'date' },
          hint: 'Cần ngày cuối tháng nên dùng EOMONTH, số tháng lấy ở G2 (nhớ khoá $): <code>=EOMONTH(B2,$G$2)</code>.',
          explain: 'Với G2 = 1, hoá đơn 25/02/2024 có hạn 31/03/2024. Đổi G2 thành 2 thì mọi hạn lùi thêm một tháng.'
        },
        {
          id: 'ex3',
          task: 'Tính tiền thuê kho theo ngày. Với mỗi ngày phát sinh ở cột A: cột C là <b>Ngày đầu tháng</b>, cột D là <b>Số ngày trong tháng</b>, cột E là <b>Tiền thuê một ngày</b> = Tiền thuê tháng ÷ số ngày trong tháng. Viết ở hàng 2 rồi sao chép xuống đến hàng 5.',
          data: [
            ['Ngày phát sinh', 'Tiền thuê tháng', 'Ngày đầu tháng', 'Số ngày trong tháng', 'Tiền thuê/ngày'],
            ['12/02/2024', 58000000],
            ['20/04/2024', 60000000],
            ['05/07/2024', 62000000],
            ['18/02/2025', 56000000]
          ],
          fill: [
            { range: 'C2:C5', solution: '=EOMONTH(A2,-1)+1' },
            { range: 'D2:D5', solution: '=DAY(EOMONTH(A2,0))' },
            { range: 'E2:E5', solution: '=B2/D2' }
          ],
          fmt: { B: 'int', C: 'date', D: 'int', E: 'int' },
          hint: 'Xem lại bảng EOMONTH ở trên. C2: cuối tháng trước cộng 1, <code>=EOMONTH(A2,-1)+1</code>. D2: ngày của cuối tháng này, <code>=DAY(EOMONTH(A2,0))</code>. E2: <code>=B2/D2</code>.',
          explain: 'Tháng 2/2024 có 29 ngày nên giá thuê một ngày là 58.000.000 ÷ 29 = 2.000.000 đ. Tháng 2/2025 chỉ có 28 ngày: 56.000.000 ÷ 28 = 2.000.000 đ.'
        }
      ]
    },

    /* ---------------- Bài 5 ---------------- */
    {
      id: 'ngay-lam-viec',
      title: 'Ngày làm việc: NETWORKDAYS, WORKDAY',
      minutes: 14,
      funcs: ['NETWORKDAYS', 'WORKDAY'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Phòng nhân sự cần biết <b>tháng này có bao nhiêu ngày công chuẩn</b>. Phòng kho vận cần biết <b>giao hàng sau 5 ngày làm việc là ngày nào</b>. Cả hai đều phải bỏ Thứ 7, Chủ nhật và ngày lễ, ngồi đếm lịch rất dễ sót.</p><p><b>NETWORKDAYS</b> đếm số ngày làm việc giữa hai ngày. <b>WORKDAY</b> tìm ngày làm việc thứ N kể từ một ngày. Cả hai tự bỏ cuối tuần và ngày lễ bạn liệt kê.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> giống cầm cuốn lịch, lật từng trang từ ngày đầu đến ngày cuối, <b>gạch bỏ</b> các trang Thứ 7, Chủ nhật và các trang ngày lễ, rồi đếm số trang còn lại.' },
        { t: 'h', text: 'Công thức NETWORKDAYS gồm 3 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu',
          data: [
            ['Tháng', 'Từ ngày', 'Đến ngày', 'Ngày công', '', 'Ngày lễ'],
            ['Tháng 4/2024', '01/04/2024', '30/04/2024', '', '', '30/04/2024'],
            ['Tháng 5/2024', '01/05/2024', '31/05/2024', '', '', '01/05/2024'],
            ['Tháng 9/2024', '01/09/2024', '30/09/2024', '', '', '02/09/2024']
          ],
          cell: 'D2',
          formula: '=NETWORKDAYS(B2,C2,$F$2:$F$4)',
          parts: [
            { label: 'Từ ngày', desc: 'Ngày bắt đầu đếm. Nếu là ngày làm việc thì <b>được tính</b>.' },
            { label: 'Đến ngày', desc: 'Ngày kết thúc. Cũng được tính nếu là ngày làm việc.' },
            { label: 'Ngày lễ', desc: 'Vùng chứa danh sách ngày nghỉ lễ cần trừ thêm. Phần này <b>có thể bỏ trống</b>. Nhớ khoá $ để kéo công thức không bị trượt.' }
          ],
          note: 'Tháng 4/2024 có 22 ngày từ Thứ 2 đến Thứ 6. Lễ 30/04 rơi vào Thứ 3 nên còn <b>21</b> ngày công.'
        },
        { t: 'h', text: 'Excel đếm ngày làm việc như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Lịch', 'Thứ', '', 'Ngày lễ', '', 'Từ ngày', 'Đến ngày', 'Ngày làm việc'],
            ['26/04/2024', 'Thứ 6', '', '30/04/2024', '', '26/04/2024', '03/05/2024', ''],
            ['27/04/2024', 'Thứ 7', '', '01/05/2024'],
            ['28/04/2024', 'Chủ nhật'],
            ['29/04/2024', 'Thứ 2'],
            ['30/04/2024', 'Thứ 3'],
            ['01/05/2024', 'Thứ 4'],
            ['02/05/2024', 'Thứ 5'],
            ['03/05/2024', 'Thứ 6']
          ],
          cell: 'H2',
          formula: '=NETWORKDAYS(F2,G2,D2:D3)',
          steps: [
            { html: 'Excel đọc <b>F2</b> và <b>G2</b>: đếm từ 26/04/2024 đến 03/05/2024.', hl: [['F2', 0], ['G2', 1]], select: 'F2' },
            { html: 'Excel lật lịch từng ngày trong khoảng đó. Cột A liệt kê ra cho bạn dễ thấy: có <b>8 ngày</b>.', hl: [['F2', 0], ['G2', 1], ['A2:B9', 5]], select: 'A2' },
            { html: 'Gạch bỏ <b>Thứ 7 và Chủ nhật</b>: 27/04 và 28/04.', hl: [['A2:B9', 5], ['A3:B4', 4]], select: 'A3' },
            { html: 'So với danh sách <b>ngày lễ D2:D3</b>: gạch bỏ thêm 30/04 và 01/05.', hl: [['A3:B4', 4], ['A6:B7', 4], ['D2:D3', 2]], select: 'D2' },
            { html: 'Còn lại 26/04, 29/04, 02/05 và 03/05: <b>4 ngày làm việc</b>.', hl: [['A2:B2', 1], ['A5:B5', 1], ['A8:B9', 1]], select: 'A5' },
            { html: 'Kết quả <b>4</b> hiện ở ô H2. Để ý: ngày đầu 26/04 và ngày cuối 03/05 đều được tính.', hl: [['H2', 2]], select: 'H2' }
          ]
        },
        { t: 'h', text: 'WORKDAY: ngày làm việc thứ N' },
        { t: 'p', html: '<code>=WORKDAY(ngày bắt đầu, số ngày làm việc, ngày lễ)</code> trả về ngày làm việc thứ N <b>sau</b> ngày bắt đầu. Bản thân ngày bắt đầu không được đếm. Ghi số âm để lùi về trước.' },
        {
          t: 'example',
          title: 'Ngày giao hàng sau N ngày làm việc',
          data: [
            ['Đơn hàng', 'Ngày đặt', 'Số ngày xử lý', 'Ngày giao', '', 'Ngày lễ'],
            ['DH501', '15/03/2024', 10, '=WORKDAY(B2,C2,$F$2:$F$3)', '', '30/04/2024'],
            ['DH502', '26/04/2024', 3, '=WORKDAY(B3,C3,$F$2:$F$3)', '', '01/05/2024']
          ],
          fmt: { D: 'date' },
          note: 'DH502 đặt Thứ 6 26/04/2024. Bỏ Thứ 7, Chủ nhật và hai ngày lễ 30/04, 01/05, ba ngày làm việc tiếp theo là 29/04, 02/05, 03/05. Vậy giao ngày 03/05/2024.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          title: 'Gõ công thức ngày công',
          items: [
            'Gõ danh sách ngày lễ vào một cột riêng (ví dụ F2:F4). Mỗi ô là một <b>ngày thật</b>, căn phải.',
            'Bấm ô <b>D2</b>, gõ <code>=NETWORKDAYS(</code>, bấm ô <b>B2</b>, gõ dấu phẩy, bấm ô <b>C2</b>, gõ dấu phẩy.',
            'Kéo chọn vùng ngày lễ <b>F2:F4</b>, nhấn <kbd>F4</kbd> để thành <code>$F$2:$F$4</code>, gõ <code>)</code> rồi nhấn <kbd>Enter</kbd>.',
            'Nhấp đúp vào chấm vuông nhỏ ở góc ô D2 để chép xuống cả cột.',
            'Với WORKDAY, nếu ô kết quả hiện số như 45415, đổi định dạng ô thành <b>Short Date</b>.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Lỗi', 'Nguyên nhân', 'Cách sửa'],
          rows: [
            ['Ngày lễ không bị trừ', 'Danh sách ngày lễ là <b>chữ</b> (căn trái), không phải ngày thật', 'Nhập lại thành ngày, hoặc dùng DATE'],
            ['Kéo xuống thì sai dần', 'Quên khoá vùng ngày lễ, vùng bị trượt xuống', 'Viết <code>$F$2:$F$4</code>'],
            ['WORKDAY ra số lạ', 'Kết quả là số seri, ô chưa định dạng ngày', 'Đổi định dạng ô thành <b>Short Date</b>'],
            ['Lệch 1 ngày', 'Nhầm cách đếm: NETWORKDAYS tính cả ngày đầu, WORKDAY không đếm ngày bắt đầu', 'Xem lại ví dụ ở trên'],
            ['Công ty làm cả Thứ 7', 'NETWORKDAYS mặc định nghỉ cả Thứ 7 và Chủ nhật', 'Dùng NETWORKDAYS.INTL (xem mẹo bên dưới)']
          ]
        },
        { t: 'tip', html: 'Công ty làm cả <b>Thứ 7</b>, chỉ nghỉ Chủ nhật? Dùng bản mở rộng <code>NETWORKDAYS.INTL</code> và <code>WORKDAY.INTL</code> với mã ngày nghỉ <code>11</code> (chỉ nghỉ Chủ nhật). Ví dụ <code>=NETWORKDAYS.INTL("01/04/2024","30/04/2024",11)</code> ra 26 ngày.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Ngày 15/03/2024 là Thứ 6. =WORKDAY("15/03/2024",1) cho kết quả gì?',
          options: ['16/03/2024', '17/03/2024', '18/03/2024', '15/03/2024'],
          answer: 2,
          explain: 'WORKDAY không đếm ngày bắt đầu và bỏ qua Thứ 7, Chủ nhật. Ngày làm việc kế tiếp sau Thứ 6 là Thứ 2, 18/03/2024.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Tháng 4/2024 có 22 ngày từ Thứ 2 đến Thứ 6 và một ngày lễ 30/04 (Thứ 3). NETWORKDAYS cả tháng có trừ lễ ra bao nhiêu?',
          options: ['22', '21', '20', '30'],
          answer: 1,
          explain: 'Ngày lễ rơi vào ngày thường nên bị trừ: 22 − 1 = 21 ngày công.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Ngày lễ 01/09/2024 rơi vào Chủ nhật. Khi đếm ngày công tháng 9, có cần đưa ngày này vào danh sách ngày lễ không?',
          options: ['Bắt buộc, nếu không sẽ sai', 'Không cần, Chủ nhật vốn đã bị bỏ, kết quả như nhau', 'Có, vì sẽ bị trừ 2 lần', 'Phải đổi sang WORKDAY'],
          answer: 1,
          explain: 'NETWORKDAYS chỉ trừ ngày lễ rơi vào Thứ 2 đến Thứ 6. Ngày lễ trùng cuối tuần không bị trừ thêm lần nữa.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tính <b>Số ngày công chuẩn</b> của từng tháng ở cột D, trừ Thứ 7, Chủ nhật và các <b>ngày lễ ở F2:F6</b>. Viết ở ô <code>D2</code> rồi sao chép xuống D3:D5.',
          data: [
            ['Tháng', 'Từ ngày', 'Đến ngày', 'Ngày công', '', 'Ngày lễ'],
            ['Tháng 4/2024', '01/04/2024', '30/04/2024', '', '', '30/04/2024'],
            ['Tháng 5/2024', '01/05/2024', '31/05/2024', '', '', '01/05/2024'],
            ['Tháng 9/2024', '01/09/2024', '30/09/2024', '', '', '02/09/2024'],
            ['Tháng 1/2025', '01/01/2025', '31/01/2025', '', '', '03/09/2024'],
            ['', '', '', '', '', '01/01/2025']
          ],
          fill: { range: 'D2:D5', solution: '=NETWORKDAYS(B2,C2,$F$2:$F$6)' },
          mustUse: ['NETWORKDAYS'],
          strict: false,
          hint: 'Từ ngày, đến ngày, rồi vùng ngày lễ có khoá $: <code>=NETWORKDAYS(B2,C2,$F$2:$F$6)</code>.',
          explain: 'Tháng 9/2024 có 21 ngày từ Thứ 2 đến Thứ 6, trừ hai ngày lễ 02/09 và 03/09 còn 19 ngày công. Hàm tự bỏ qua các ngày lễ không nằm trong khoảng đang tính.'
        },
        {
          id: 'ex2',
          task: 'Tính <b>Ngày giao hàng</b> ở cột D: sau ngày đặt bao nhiêu <b>ngày làm việc</b> (cột C), bỏ Thứ 7, Chủ nhật và <b>ngày lễ ở F2:F4</b>. Viết ở ô <code>D2</code> rồi sao chép xuống D3:D6.',
          data: [
            ['Đơn hàng', 'Ngày đặt', 'Số ngày xử lý', 'Ngày giao', '', 'Ngày lễ'],
            ['DH601', '22/04/2024', 5, '', '', '30/04/2024'],
            ['DH602', '26/04/2024', 2, '', '', '01/05/2024'],
            ['DH603', '29/08/2024', 3, '', '', '02/09/2024'],
            ['DH604', '06/09/2024', 7],
            ['DH605', '13/12/2024', 10]
          ],
          fill: { range: 'D2:D6', solution: '=WORKDAY(B2,C2,$F$2:$F$4)' },
          mustUse: ['WORKDAY'],
          fmt: { D: 'date' },
          hint: 'Cần tìm một ngày nên dùng WORKDAY: <code>=WORKDAY(B2,C2,$F$2:$F$4)</code>. Cột D đã được định dạng sẵn thành ngày.',
          explain: 'DH601 đặt Thứ 2 22/04/2024, 5 ngày làm việc tiếp theo là 23, 24, 25, 26 và 29/04, chưa chạm ngày lễ. DH602 đặt 26/04, ngày làm việc thứ nhất là 29/04, rồi bỏ qua lễ 30/04 và 01/05 nên ngày thứ hai là 02/05/2024.'
        },
        {
          id: 'ex3',
          task: 'Nhân viên mới vào làm trong tháng 4/2024. Cột D tính <b>Ngày công thực tế</b> từ ngày vào làm đến <b>cuối tháng ở ô H1</b>, trừ <b>ngày lễ ở ô H2</b>. Cột E tính <b>Lương tháng 4</b> = Lương × Ngày công thực tế ÷ <b>công chuẩn ở ô H3</b>. Viết ở hàng 2 rồi sao chép xuống đến hàng 5.',
          data: [
            ['Nhân viên', 'Ngày vào làm', 'Lương', 'Ngày công', 'Lương tháng 4', '', 'Cuối tháng', '30/04/2024'],
            ['Ngô Thị Thảo', '01/04/2024', 9000000, '', '', '', 'Ngày lễ', '30/04/2024'],
            ['Bùi Văn Long', '08/04/2024', 10500000, '', '', '', 'Công chuẩn', 21],
            ['Đặng Thu Hiền', '15/04/2024', 12600000],
            ['Mạc Đình Nam', '22/04/2024', 8400000]
          ],
          fill: [
            { range: 'D2:D5', solution: '=NETWORKDAYS(B2,$H$1,$H$2)' },
            { range: 'E2:E5', solution: '=C2*D2/$H$3' }
          ],
          fmt: { C: 'int', E: 'int' },
          hint: 'D2: từ ngày vào làm đến H1, ngày lễ là H2, nhớ khoá $: <code>=NETWORKDAYS(B2,$H$1,$H$2)</code>. E2: <code>=C2*D2/$H$3</code>.',
          explain: 'Chị Hiền vào làm 15/04/2024 (Thứ 2), đến 30/04 có 12 ngày thường, trừ lễ 30/04 còn 11 ngày công: 12.600.000 × 11 ÷ 21 = 6.600.000 đ.'
        }
      ]
    },

    /* ---------------- Bài 6 ---------------- */
    {
      id: 'gio',
      title: 'Giờ và số giờ làm: HOUR, MINUTE, TIME',
      minutes: 14,
      funcs: ['HOUR', 'MINUTE', 'TIME'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Máy chấm công xuất ra giờ vào, giờ ra của từng người. Kế toán cần <b>số giờ làm</b> để nhân với đơn giá, <b>giờ tăng ca</b> và <b>số phút đi muộn</b> để trừ lương.</p><p>Lấy 17:30 trừ 08:00 thì ra 09:30, nhưng nhân với đơn giá lại ra số rất nhỏ. Hiểu giờ trong Excel là gì, bạn sẽ biết vì sao và sửa trong một nốt nhạc.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> nếu ngày là số trang lịch, thì giờ là <b>một phần của trang lịch</b> đó. Một ngày là số 1, nên 12:00 là 0,5 ngày, 06:00 là 0,25 ngày, 18:00 là 0,75 ngày. Muốn đổi ra số giờ thì <b>nhân 24</b>, ra số phút thì nhân 24 × 60.' },
        {
          t: 'example',
          title: 'Giờ thực chất là phần lẻ của ngày',
          data: [
            ['Giờ', 'Giá trị thật', 'Đổi ra số giờ (× 24)'],
            ['06:00', '=A2*1', '=A2*24'],
            ['12:00', '=A3*1', '=A3*24'],
            ['17:30', '=A4*1', '=A4*24']
          ],
          fmt: { B: 'dec2', C: 'dec2' },
          note: '17:30 là 0,73 ngày. Nhân với 24 (số giờ trong một ngày) mới ra 17,5 giờ.'
        },
        { t: 'h', text: 'Hàm TIME: ghép giờ, phút, giây thành giờ thật' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu',
          data: [
            ['Ca', 'Giờ', 'Phút', 'Giờ bắt đầu'],
            ['Ca sáng kho', 6, 0, ''],
            ['Ca chiều', 13, 30, ''],
            ['Ca giao hàng', 9, 15, '']
          ],
          fmt: { D: 'time' },
          cell: 'D2',
          formula: '=TIME(B2,C2,0)',
          parts: [
            { label: 'Giờ mấy', desc: 'Ô chứa số giờ (0 đến 23). Ở đây là ô B2.' },
            { label: 'Phút mấy', desc: 'Ô chứa số phút. Ghi quá 59 thì Excel tự quy ra giờ: 90 phút thành 1 giờ 30 phút.' },
            { label: 'Giây mấy', desc: 'Số giây. Chấm công thường không cần nên ghi 0.', range: 'D2' }
          ],
          note: 'Ngược lại, <code>HOUR</code> tách lấy phần giờ và <code>MINUTE</code> tách lấy phần phút của một giờ có sẵn.'
        },
        { t: 'h', text: 'Excel tính số giờ làm như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Nhân viên', 'Giờ vào', 'Giờ ra', 'Số giờ làm', '', 'Nghỉ trưa (giờ)', 1],
            ['Hà', '08:00', '17:30', ''],
            ['Khoa', '07:45', '19:15']
          ],
          fmt: { D: 'dec2' },
          cell: 'D2',
          formula: '=(C2-B2)*24-$G$1',
          steps: [
            { html: 'Excel đọc ô <b>C2</b>: giờ ra 17:30, bên trong là <b>0,729</b> ngày.', hl: [['C2', 1]], select: 'C2' },
            { html: 'Đọc ô <b>B2</b>: giờ vào 08:00, bên trong là <b>0,333</b> ngày.', hl: [['C2', 1], ['B2', 0]], select: 'B2' },
            { html: 'Trừ hai số: 0,729 − 0,333 = <b>0,396</b> ngày. Nếu để định dạng giờ, ô sẽ hiện 09:30.', hl: [['B2:C2', 0]], select: 'C2' },
            { html: 'Nhân 24 để đổi ra số giờ: 0,396 × 24 = <b>9,5</b> giờ.', hl: [['B2:C2', 0]], select: 'C2' },
            { html: 'Trừ thời gian nghỉ trưa ở ô <b>G1</b> (1 giờ): còn <b>8,5</b> giờ, hiện ở ô D2.', hl: [['G1', 2], ['D2', 2]], select: 'D2' },
            { html: 'Kéo xuống D3: anh Khoa làm 07:45 đến 19:15 là 11,5 giờ, trừ nghỉ trưa còn <b>10,5</b> giờ.', hl: [['B3:C3', 0], ['D3', 2]], select: 'D3' }
          ]
        },
        { t: 'warn', html: 'Nhân 24 xong mà ô vẫn hiện kiểu <code>12:00</code> là do Excel giữ định dạng giờ. Hãy đổi định dạng ô về <b>General</b> hoặc <b>Number</b> để thấy 9,5. Đây là lỗi gặp rất nhiều khi làm bảng lương theo giờ.' },
        { t: 'h', text: 'Tăng ca: phần vượt giờ chuẩn' },
        { t: 'p', html: 'Có số giờ làm rồi, tăng ca là phần vượt quá 8 giờ: <code>=MAX(0,E2-8)</code>. MAX(0, …) biến số âm thành 0 cho người làm chưa đủ giờ.' },
        {
          t: 'example',
          title: 'Bảng chấm công: số giờ làm (trừ 1 giờ nghỉ trưa) và giờ tăng ca',
          data: [
            ['Nhân viên', 'Giờ vào', 'Giờ ra', 'Thời gian', 'Số giờ làm', 'Tăng ca'],
            ['Hà', '08:00', '17:30', '=C2-B2', '=(C2-B2)*24-1', '=MAX(0,E2-8)'],
            ['Khoa', '07:45', '19:15', '=C3-B3', '=(C3-B3)*24-1', '=MAX(0,E3-8)'],
            ['Lan', '08:30', '16:00', '=C4-B4', '=(C4-B4)*24-1', '=MAX(0,E4-8)']
          ],
          fmt: { D: 'time', E: 'dec2', F: 'dec2' },
          note: 'Anh Khoa làm 10,5 giờ, vượt chuẩn 8 giờ nên tăng ca 2,5 giờ. Chị Lan làm 6,5 giờ nên tăng ca bằng 0.'
        },
        { t: 'h', text: 'HOUR, MINUTE: tách giờ và phút' },
        { t: 'p', html: '<code>=HOUR(B2)</code> lấy phần giờ (0 đến 23), <code>=MINUTE(B2)</code> lấy phần phút (0 đến 59). Dùng để quy giờ vào ra số phút, ví dụ tính số phút đi muộn.' },
        {
          t: 'example',
          title: 'Số phút đi muộn so với giờ vào ca 08:00',
          data: [
            ['Nhân viên', 'Giờ vào', 'Đi muộn (phút)', 'Kiểm tra bằng HOUR, MINUTE'],
            ['Hà', '08:12', '=MAX(0,(B2-TIME(8,0,0))*24*60)', '=MAX(0,HOUR(B2)*60+MINUTE(B2)-480)'],
            ['Khoa', '07:55', '=MAX(0,(B3-TIME(8,0,0))*24*60)', '=MAX(0,HOUR(B3)*60+MINUTE(B3)-480)'],
            ['Lan', '09:05', '=MAX(0,(B4-TIME(8,0,0))*24*60)', '=MAX(0,HOUR(B4)*60+MINUTE(B4)-480)']
          ],
          fmt: { C: 'int', D: 'int' },
          note: 'Hai cách cho cùng kết quả: chị Lan vào 09:05, muộn 65 phút. Cách 1 nhân 24 × 60 để đổi phần lẻ của ngày ra phút. Cách 2 quy giờ vào ra phút (9 × 60 + 5 = 545) rồi trừ 480 phút (8 giờ).'
        },
        { t: 'tip', html: '<b>Ca đêm qua 0 giờ</b> (vào 22:00, ra 06:00): giờ ra nhỏ hơn giờ vào nên phép trừ ra số âm. Cộng thêm 1 ngày khi giờ ra nhỏ hơn: <code>=IF(C2&lt;B2,C2+1-B2,C2-B2)*24</code> ra 8 giờ.' },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'home',
          file: 'ChamCong.xlsx',
          groups: ['Number'],
          marks: [
            { id: 'tab.home', n: 1, text: 'Bấm tab <b>Home</b>.' },
            { id: 'home.numfmt', n: 2, text: 'Ô <b>Number Format</b>. Cột số giờ làm chọn <b>Number</b> để thấy 8,5. Cột giờ vào, giờ ra chọn <b>Time</b>.' }
          ],
          caption: 'Sau khi gõ công thức số giờ làm, nhớ kiểm tra định dạng ô ở đây.'
        },
        {
          t: 'steps',
          title: 'Gõ công thức số giờ làm',
          items: [
            'Gõ giờ vào, giờ ra dạng <code>08:00</code> (có dấu hai chấm). Ô căn phải là Excel đã hiểu đó là giờ.',
            'Bấm ô <b>D2</b>, gõ <code>=(C2-B2)*24-$G$1</code> rồi nhấn <kbd>Enter</kbd>.',
            'Nếu ô hiện kiểu 08:30, vào <b>Home › Number Format › Number</b>.',
            'Nhấp đúp vào chấm vuông nhỏ ở góc ô D2 để chép xuống cả cột.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Hiện tượng', 'Nguyên nhân', 'Cách sửa'],
          rows: [
            ['Tiền lương theo giờ ra số rất nhỏ', 'Quên nhân 24, đang nhân đơn giá với 0,396 ngày', 'Viết <code>(C2-B2)*24</code>'],
            ['Nhân 24 rồi vẫn hiện 09:30', 'Ô còn giữ định dạng giờ', 'Đổi định dạng ô về <b>Number</b>'],
            ['Số giờ ra âm hoặc <code>#######</code>', 'Ca đêm qua 0 giờ, giờ ra nhỏ hơn giờ vào', 'Dùng <code>IF(C2&lt;B2,C2+1-B2,C2-B2)</code>'],
            ['Trừ giờ nghỉ bị sai', 'Trừ 1 trước khi nhân 24: <code>(C2-B2-1)*24</code> là trừ cả 1 ngày', 'Nhân 24 trước rồi mới trừ: <code>(C2-B2)*24-1</code>'],
            ['Giờ gõ vào bị căn trái', 'Gõ 8h00 hoặc 8.00, Excel hiểu là chữ hoặc số', 'Gõ <code>8:00</code>, hoặc ghép bằng TIME']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'B2 = 08:00, C2 = 17:00. Muốn ra số 9 (giờ) để nhân với đơn giá theo giờ, công thức nào đúng?',
          options: ['=C2-B2', '=(C2-B2)*24', '=HOUR(C2)-B2', '=(C2-B2)/24'],
          answer: 1,
          explain: 'C2 − B2 ra 0,375 ngày (hiển thị 09:00). Nhân 24 mới ra 9 giờ dạng số thập phân.'
        },
        {
          t: 'quiz', id: 'q2',
          q: '=TIME(17,90,0) cho kết quả gì?',
          options: ['17:90', '#NUM!', '18:30', '17:09'],
          answer: 2,
          explain: '90 phút = 1 giờ 30 phút, TIME tự quy đổi nên ra 18:30.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Ô B2 là 09:05. =HOUR(B2)*60+MINUTE(B2) cho kết quả bao nhiêu?',
          options: ['905', '545', '65', '9,05'],
          answer: 1,
          explain: 'HOUR lấy 9, MINUTE lấy 5: 9 × 60 + 5 = 545 phút tính từ 0 giờ.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Bảng phân ca lưu giờ bắt đầu ở hai cột số (Giờ, Phút) và độ dài ca ở cột D. Dùng <b>TIME</b> tính <b>Giờ bắt đầu</b> ở cột E và <b>Giờ kết thúc</b> (cộng thêm số giờ của ca) ở cột F. Viết ở hàng 2 rồi sao chép xuống đến hàng 5.',
          data: [
            ['Ca', 'Giờ', 'Phút', 'Số giờ ca', 'Giờ bắt đầu', 'Giờ kết thúc'],
            ['Ca sáng kho', 6, 0, 8],
            ['Ca hành chính', 8, 0, 9],
            ['Ca chiều', 13, 30, 8],
            ['Ca giao hàng', 9, 15, 6]
          ],
          fill: [
            { range: 'E2:E5', solution: '=TIME(B2,C2,0)' },
            { range: 'F2:F5', solution: '=TIME(B2+D2,C2,0)' }
          ],
          mustUse: ['TIME'],
          fmt: { E: 'time', F: 'time' },
          hint: 'E2: giờ, phút, giây: <code>=TIME(B2,C2,0)</code>. F2: cộng số giờ của ca vào phần giờ: <code>=TIME(B2+D2,C2,0)</code>.',
          explain: 'Ca chiều bắt đầu 13:30, dài 8 giờ nên kết thúc 21:30. Cách khác cho F2: <code>=E2+TIME(D2,0,0)</code> cũng đúng.'
        },
        {
          id: 'ex2',
          task: 'Tính <b>Số giờ làm</b> ở cột D = (giờ ra − giờ vào) đổi ra giờ, trừ <b>thời gian nghỉ trưa ở ô G1</b>. Tính <b>Tăng ca</b> ở cột E = phần vượt quá <b>giờ chuẩn ở ô G2</b> (không vượt thì 0). Viết ở hàng 2 rồi sao chép xuống đến hàng 6.',
          data: [
            ['Nhân viên', 'Giờ vào', 'Giờ ra', 'Số giờ làm', 'Tăng ca', 'Nghỉ trưa (giờ)', 1],
            ['Nguyễn An', '08:00', '17:00', '', '', 'Giờ chuẩn', 8],
            ['Trần Bình', '07:30', '19:00'],
            ['Lê Cường', '08:15', '17:45'],
            ['Phạm Dung', '09:00', '16:30'],
            ['Võ Em', '07:00', '20:15']
          ],
          fill: [
            { range: 'D2:D6', solution: '=(C2-B2)*24-$G$1' },
            { range: 'E2:E6', solution: '=MAX(0,D2-$G$2)' }
          ],
          fmt: { D: 'dec2', E: 'dec2' },
          hint: 'Làm giống phần "Excel tính từng bước" ở trên. D2: <code>=(C2-B2)*24-$G$1</code>. E2: <code>=MAX(0,D2-$G$2)</code>.',
          explain: 'Võ Em làm 07:00 đến 20:15 là 13,25 giờ, trừ 1 giờ nghỉ còn 12,25 giờ, tăng ca 4,25 giờ. Nhớ nhân 24 trước rồi mới trừ giờ nghỉ, vì giờ nghỉ ở G1 đang là số giờ.'
        },
        {
          id: 'ex3',
          task: 'Tính <b>Số phút đi muộn</b> ở cột C so với <b>giờ vào ca ở ô G1</b> (đến sớm hoặc đúng giờ thì 0), rồi tính <b>Tiền phạt</b> ở cột D = số phút muộn × <b>mức phạt mỗi phút ở ô G2</b>. Viết ở hàng 2 rồi sao chép xuống đến hàng 6.',
          data: [
            ['Nhân viên', 'Giờ vào', 'Đi muộn (phút)', 'Tiền phạt', '', 'Giờ vào ca', '08:00'],
            ['Nguyễn An', '08:10', '', '', '', 'Phạt/phút', 2000],
            ['Trần Bình', '07:52'],
            ['Lê Cường', '08:35'],
            ['Phạm Dung', '08:00'],
            ['Võ Em', '09:20']
          ],
          fill: [
            { range: 'C2:C6', solution: '=MAX(0,(B2-$G$1)*24*60)' },
            { range: 'D2:D6', solution: '=C2*$G$2' }
          ],
          fmt: { C: 'int', D: 'int' },
          hint: 'Lấy giờ vào trừ giờ vào ca, nhân 24 × 60 để ra phút, bọc MAX(0, …): <code>=MAX(0,(B2-$G$1)*24*60)</code>. Hoặc dùng HOUR, MINUTE: <code>=MAX(0,HOUR(B2)*60+MINUTE(B2)-HOUR($G$1)*60-MINUTE($G$1))</code>. D2: <code>=C2*$G$2</code>.',
          explain: 'Võ Em vào 09:20, muộn 80 phút, bị phạt 80 × 2.000 = 160.000 đ. Nhân 24 × 60 để đổi chênh lệch giờ (phần lẻ của ngày) ra số phút.'
        }
      ]
    }
  ],

  /* ---------------- Bài kiểm tra Phần 6 ---------------- */
  test: {
    mcq: [
      { q: 'Vì sao lấy ngày 20/03/2024 trừ 05/03/2024 lại ra 15?', options: ['Excel đếm ký tự', 'Ngày được lưu dưới dạng số seri (số thứ tự của ngày)', 'Excel chỉ trừ phần ngày', 'Do định dạng General'], answer: 1, explain: 'Mỗi ngày là một số thứ tự, giống số trang lịch, nên phép trừ cho ra số ngày chênh lệch.' },
      { q: 'Công thức =DATE(2024,14,1) cho kết quả gì?', options: ['#NUM!', '01/12/2024', '01/02/2025', '14/01/2024'], answer: 2, explain: 'Tháng 14 vượt 12 nên DATE tự chuyển sang năm sau: tháng 2/2025.' },
      { q: 'Hàm nào luôn cho ra ngày hôm nay và tự cập nhật mỗi khi mở file?', options: ['=NOW()', '=TODAY()', '=DATE()', '=DAY()'], answer: 1, explain: 'TODAY() trả về ngày hôm nay. NOW() trả về cả ngày lẫn giờ.' },
      { q: 'Ngày 16/03/2024 là Thứ 7. =WEEKDAY("16/03/2024",2) cho kết quả bao nhiêu?', options: ['7', '6', '1', '5'], answer: 1, explain: 'Kiểu 2: Thứ 2 = 1 … Thứ 7 = 6, Chủ nhật = 7.' },
      { q: 'Muốn kiểm tra ngày ở A2 có phải Thứ 7 hoặc Chủ nhật không, công thức nào đúng?', options: ['=WEEKDAY(A2)>5', '=WEEKDAY(A2,2)>5', '=WEEKNUM(A2)>5', '=DAY(A2)>5'], answer: 1, explain: 'Với kiểu 2, Thứ 7 = 6 và Chủ nhật = 7 nên chỉ cần >5. Kiểu 1 thì Chủ nhật = 1, so sánh >5 sẽ sai.' },
      { q: 'Nhân viên sinh 15/09/1992. Ngày chốt 31/08/2024. =DATEDIF(B2,C2,"Y") ra bao nhiêu?', options: ['32', '31', '33', '#NUM!'], answer: 1, explain: 'Đến 31/08/2024 chưa tới sinh nhật 15/09 nên mới tròn 31 tuổi.' },
      { q: 'Vì sao =DATEDIF("31/12/2024","01/01/2024","D") báo lỗi #NUM!?', options: ['Sai tên hàm', 'Từ ngày (ngày bắt đầu) muộn hơn đến ngày (ngày kết thúc)', 'Thiếu dấu $', 'Đơn vị "D" không tồn tại'], answer: 1, explain: 'DATEDIF yêu cầu ngày bắt đầu sớm hơn hoặc bằng ngày kết thúc.' },
      { q: 'Hợp đồng ký 15/03/2024, thời hạn 24 tháng. Công thức tính ngày hết hạn (trừ 1 ngày) là gì?', options: ['=B2+24', '=EDATE(B2,24)-1', '=EOMONTH(B2,24)', '=B2+24*30'], answer: 1, explain: 'EDATE cộng đúng 24 tháng ra 15/03/2026, trừ 1 ngày ra 14/03/2026.' },
      { q: 'A2 = 10/05/2024. =EOMONTH(A2,1) cho kết quả gì?', options: ['10/06/2024', '31/05/2024', '30/06/2024', '01/06/2024'], answer: 2, explain: 'Số tháng là 1 nghĩa là cuối tháng kế tiếp: 30/06/2024.' },
      { q: 'NETWORKDAYS khác phép trừ hai ngày ở điểm nào?', options: ['Không tính ngày cuối', 'Bỏ Thứ 7, Chủ nhật và ngày lễ (nếu khai báo)', 'Chỉ đếm Chủ nhật', 'Trả về số tuần'], answer: 1, explain: 'NETWORKDAYS chỉ đếm ngày từ Thứ 2 đến Thứ 6, tính cả ngày đầu và ngày cuối, và trừ các ngày lễ được liệt kê.' },
      { q: 'B2 = 08:30, C2 = 17:00. =(C2-B2)*24 cho kết quả bao nhiêu?', options: ['8.3', '8.5', '0.354', '8:30'], answer: 1, explain: 'Từ 08:30 đến 17:00 là 8 giờ 30 phút, nhân 24 ra 8,5 giờ.' },
      { q: 'Ca đêm vào 22:00 (B2), ra 06:00 sáng hôm sau (C2). Công thức nào ra đúng 8 giờ?', options: ['=(C2-B2)*24', '=IF(C2<B2,C2+1-B2,C2-B2)*24', '=HOUR(C2)-HOUR(B2)', '=(B2-C2)*24'], answer: 1, explain: 'Giờ ra nhỏ hơn giờ vào nghĩa là đã qua ngày mới, cần cộng thêm 1 ngày trước khi trừ.' }
    ],
    practice: [
      {
        id: 't1',
        task: 'Quản lý hợp đồng thuê xe: cột D tính <b>Ngày hết hạn</b> = ngày ký cộng số tháng ở cột C, trừ 1 ngày. Cột E tính <b>Số ngày còn lại</b> từ <b>ngày kiểm tra ở ô H1</b> đến ngày hết hạn (dùng DAYS). Viết ở hàng 2 rồi sao chép xuống đến hàng 5.',
        data: [
          ['Hợp đồng', 'Ngày ký', 'Số tháng', 'Ngày hết hạn', 'Còn lại (ngày)', '', 'Ngày kiểm tra', '01/10/2024'],
          ['XE-001', '15/01/2024', 12],
          ['XE-002', '01/06/2024', 6],
          ['XE-003', '20/04/2024', 9],
          ['XE-004', '10/10/2023', 18]
        ],
        fill: [
          { range: 'D2:D5', solution: '=EDATE(B2,C2)-1' },
          { range: 'E2:E5', solution: '=DAYS(D2,$H$1)' }
        ],
        fmt: { D: 'date', E: 'int' }
      },
      {
        id: 't2',
        task: 'Bảng chấm công một tuần: cột D tính <b>Thứ</b> theo kiểu 2 (Thứ 2 = 1 … CN = 7). Cột E tính <b>Số giờ làm</b> = (giờ ra − giờ vào) × 24. Cột F tính <b>Giờ tăng ca</b>: nếu là Thứ 7 hoặc Chủ nhật thì toàn bộ số giờ làm là tăng ca, ngày thường thì là phần vượt <b>giờ chuẩn ở ô H2</b> (không vượt thì 0). Viết ở hàng 2 rồi sao chép xuống đến hàng 6.',
        data: [
          ['Ngày', 'Giờ vào', 'Giờ ra', 'Thứ', 'Số giờ làm', 'Tăng ca'],
          ['14/03/2024', '08:00', '17:30', '', '', '', 'Giờ chuẩn', 8],
          ['15/03/2024', '08:00', '16:00'],
          ['16/03/2024', '08:00', '12:30'],
          ['17/03/2024', '13:00', '17:00'],
          ['18/03/2024', '07:30', '18:00']
        ],
        fill: [
          { range: 'D2:D6', solution: '=WEEKDAY(A2,2)' },
          { range: 'E2:E6', solution: '=(C2-B2)*24' },
          { range: 'F2:F6', solution: '=IF(D2>5,E2,MAX(0,E2-$H$2))' }
        ],
        fmt: { E: 'dec2', F: 'dec2' }
      },
      {
        id: 't3',
        task: 'Đơn hàng xuất khẩu: cột D tính <b>Ngày giao</b> sau số ngày làm việc ở cột C (bỏ Thứ 7, Chủ nhật và <b>ngày lễ ở H2:H3</b>). Cột E tính <b>Hạn thu tiền</b> là ngày cuối của tháng kế tiếp tháng giao. Cột F ghi <b>Tháng giao</b> (số tháng của ngày giao). Viết ở hàng 2 rồi sao chép xuống đến hàng 5.',
        data: [
          ['Đơn hàng', 'Ngày đặt', 'Ngày xử lý', 'Ngày giao', 'Hạn thu tiền', 'Tháng giao', '', 'Ngày lễ'],
          ['XK-101', '24/04/2024', 4, '', '', '', '', '30/04/2024'],
          ['XK-102', '10/05/2024', 6, '', '', '', '', '01/05/2024'],
          ['XK-103', '25/06/2024', 5],
          ['XK-104', '16/12/2024', 9]
        ],
        fill: [
          { range: 'D2:D5', solution: '=WORKDAY(B2,C2,$H$2:$H$3)' },
          { range: 'E2:E5', solution: '=EOMONTH(D2,1)' },
          { range: 'F2:F5', solution: '=MONTH(D2)' }
        ],
        fmt: { D: 'date', E: 'date' }
      }
    ]
  }
});
