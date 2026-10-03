ECC.addPart({
  id: 'p4',
  no: 4,
  title: 'Hàm điều kiện',
  short: 'Điều kiện',
  desc: 'Đếm, cộng, tính trung bình, tìm lớn nhất và nhỏ nhất theo một hoặc nhiều điều kiện với COUNTIF, SUMIF, AVERAGEIF, các hàm …IFS và MAXIFS, MINIFS. Cuối phần là cách làm báo cáo tổng hợp chỉ bằng công thức.',
  lessons: [
    /* ---------------- Bài 1 ---------------- */
    {
      id: 'countif',
      title: 'Hàm COUNTIF: đếm theo điều kiện',
      minutes: 12,
      funcs: ['COUNTIF'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Sếp hỏi: <b>"Tuần này có bao nhiêu đơn giao đi Hà Nội?"</b>. Bảng đơn hàng có vài trăm dòng, khu vực nằm lẫn lộn.</p><p>Lọc rồi đếm bằng tay thì lâu, sửa dữ liệu lại phải đếm lại. Với <b>COUNTIF</b>, bạn viết một công thức ngắn, Excel tự đếm và tự cập nhật khi bảng thay đổi.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> COUNTIF giống <b>đếm phiếu bầu</b>. Bạn lật từng phiếu, phiếu nào ghi đúng tên cần đếm thì gạch thêm một vạch. Lật hết xấp phiếu, số vạch chính là kết quả.' },
        { t: 'h', text: 'Công thức COUNTIF gồm 2 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó chỉ vào đâu trên bảng',
          data: [
            ['Mã đơn', 'Khu vực', 'Số lượng', '', 'Số đơn đi Hà Nội'],
            ['DH001', 'Hà Nội', 120],
            ['DH002', 'Đà Nẵng', 45],
            ['DH003', 'Hà Nội', 300],
            ['DH004', 'TP.HCM', 80],
            ['DH005', 'Hà Nội', 150]
          ],
          cell: 'E2',
          formula: '=COUNTIF(B2:B6,"Hà Nội")',
          parts: [
            { label: 'Xét vùng nào', desc: 'Vùng Excel sẽ dò từng ô để kiểm tra. Ở đây là cột Khu vực, từ B2 đến B6.' },
            { label: 'Điều kiện là gì', desc: 'Ô nào thoả điều kiện này thì được đếm. Chữ phải đặt trong ngoặc kép. Các ô tô màu là những ô khớp "Hà Nội".', range: ['B2', 'B4', 'B6'] }
          ],
          note: 'COUNTIF chỉ đếm, không cộng số. Nên chỉ cần 2 phần: xét ở đâu và điều kiện gì.'
        },
        { t: 'h', text: 'Excel đếm như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Mã đơn', 'Khu vực', 'Số lượng', '', 'Số đơn đi Hà Nội'],
            ['DH001', 'Hà Nội', 120],
            ['DH002', 'Đà Nẵng', 45],
            ['DH003', 'Hà Nội', 300],
            ['DH004', 'TP.HCM', 80],
            ['DH005', 'Hà Nội', 150]
          ],
          cell: 'E2',
          formula: '=COUNTIF(B2:B6,"Hà Nội")',
          steps: [
            { html: 'Excel đọc công thức: dò vùng <b>B2:B6</b>, đếm ô bằng <b>"Hà Nội"</b>. Bộ đếm bắt đầu từ <b>0</b>.', hl: [['B2:B6', 0]], select: 'B2' },
            { html: 'Ô <b>B2</b> là Hà Nội: khớp, tô xanh. Bộ đếm: <b>1</b>.', hl: [['B2:B6', 0], ['B2', 1]], select: 'B2' },
            { html: 'Ô <b>B3</b> là Đà Nẵng: không khớp, bỏ qua. Bộ đếm vẫn là <b>1</b>.', hl: [['B2', 1], ['B3', 4]], select: 'B3' },
            { html: 'Ô <b>B4</b> là Hà Nội: khớp. Bộ đếm: <b>2</b>.', hl: [['B2', 1], ['B4', 1]], select: 'B4' },
            { html: 'Ô <b>B5</b> là TP.HCM: bỏ qua. Ô <b>B6</b> là Hà Nội: khớp. Bộ đếm: <b>3</b>.', hl: [['B2', 1], ['B4', 1], ['B5', 4], ['B6', 1]], select: 'B6' },
            { html: 'Dò hết vùng. Kết quả <b>3</b> hiện ở ô <b>E2</b>. Sửa B3 thành Hà Nội, E2 tự đổi thành 4.', hl: [['B2', 1], ['B4', 1], ['B6', 1], ['E2', 2]], select: 'E2' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'DonHang.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Cách 1: bấm tab <b>Formulas</b>.' },
            { id: 'formulas.insertfn', n: 2, text: 'Bấm <b>Insert Function</b> (chèn hàm), gõ COUNTIF vào ô tìm kiếm, bấm <b>Go</b> rồi <b>OK</b>. Excel mở hộp thoại có 2 ô Range và Criteria đúng như 2 phần ở trên.' }
          ],
          caption: 'COUNTIF nằm trong nút More Functions › Statistical, khá sâu. Dân văn phòng thường gõ thẳng công thức như các bước dưới đây.'
        },
        {
          t: 'steps',
          title: 'Cách 2: gõ công thức trực tiếp',
          items: [
            'Bấm vào ô <b>E2</b>, gõ <code>=COUNTIF(</code>',
            'Kéo chuột chọn vùng Khu vực <b>B2:B6</b>, rồi gõ dấu phẩy <code>,</code>',
            'Gõ điều kiện trong ngoặc kép <code>"Hà Nội"</code>, đóng ngoặc <code>)</code> và nhấn <kbd>Enter</kbd>.'
          ]
        },
        { t: 'h', text: 'Cách viết điều kiện' },
        {
          t: 'table',
          head: ['Muốn đếm', 'Viết điều kiện', 'Ghi chú'],
          rows: [
            ['Bằng một chữ', '"Hà Nội"', 'Không phân biệt hoa thường'],
            ['Bằng một số', '100 hoặc "100"', ''],
            ['Lớn hơn hoặc bằng', '"&gt;=100"', 'Phép so sánh luôn nằm trong ngoặc kép'],
            ['Nhỏ hơn', '"&lt;50"', ''],
            ['Khác một giá trị', '"&lt;&gt;Hà Nội"', 'Dấu &lt;&gt; nghĩa là khác'],
            ['Bằng giá trị trong ô', 'F1', 'Không cần ngoặc kép'],
            ['So sánh với giá trị trong ô', '"&gt;="&amp;F1', 'Nối phép so sánh với ô bằng dấu &amp;'],
            ['Ô có dữ liệu / ô trống', '"&lt;&gt;" / ""', 'Rà soát dữ liệu còn thiếu']
          ]
        },
        {
          t: 'example',
          title: 'Một bảng, bốn câu hỏi khác nhau',
          data: [
            ['Mã đơn', 'Khu vực', 'Số lượng', 'Trạng thái', '', 'Chỉ tiêu', 'Kết quả'],
            ['DH001', 'Hà Nội', 120, 'Đã giao', '', 'Đơn đi Hà Nội', '=COUNTIF(B2:B9,"Hà Nội")'],
            ['DH002', 'Đà Nẵng', 45, 'Đang giao', '', 'Đơn từ 100 sản phẩm', '=COUNTIF(C2:C9,">=100")'],
            ['DH003', 'TP.HCM', 300, 'Đã giao', '', 'Đơn ngoài Hà Nội', '=COUNTIF(B2:B9,"<>Hà Nội")'],
            ['DH004', 'Hà Nội', 80, 'Đã huỷ', '', 'Đơn đã giao', '=COUNTIF(D2:D9,"Đã giao")'],
            ['DH005', 'Cần Thơ', 150, 'Đã giao'],
            ['DH006', 'Hà Nội', 210, 'Đang giao'],
            ['DH007', 'TP.HCM', 60, 'Đã giao'],
            ['DH008', 'Đà Nẵng', 95, 'Đã giao']
          ],
          note: 'Bấm vào các ô cột G để xem công thức. Có 3 đơn đi Hà Nội, 4 đơn từ 100 sản phẩm, 5 đơn ngoài Hà Nội và 5 đơn đã giao.'
        },
        { t: 'h', text: 'Đặt điều kiện trong ô' },
        { t: 'p', html: 'Thay vì gõ cứng <code>"Hà Nội"</code> vào công thức, hãy gõ chữ Hà Nội vào một ô (ví dụ <code>G1</code>) rồi viết <code>=COUNTIF(B2:B9,G1)</code>. Muốn đếm khu vực khác, chỉ cần sửa ô G1.' },
        { t: 'p', html: 'Với phép so sánh, để dấu so sánh trong ngoặc kép rồi <b>nối</b> với ô bằng dấu <code>&amp;</code>: <code>=COUNTIF(C2:C9,"&gt;="&amp;G2)</code>. Đọc là: "lớn hơn hoặc bằng" ghép với giá trị trong G2.' },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Viết sai', 'Cách sửa'],
          rows: [
            ['Quên ngoặc kép quanh phép so sánh', '=COUNTIF(C2:C9,&gt;=100)', 'Excel báo lỗi công thức. Viết <code>"&gt;=100"</code>'],
            ['Để tên ô bên trong ngoặc kép', '=COUNTIF(C2:C9,"&gt;=G2")', 'Excel so sánh với chữ "G2", ra 0. Viết <code>"&gt;="&amp;G2</code>'],
            ['Gõ dấu chấm ngăn nghìn', '"&gt;500.000"', 'Gõ số liền: <code>"&gt;500000"</code>'],
            ['Thừa dấu cách trong dữ liệu', '"Hà Nội " khác "Hà Nội"', 'Làm sạch dữ liệu bằng hàm TRIM'],
            ['Đảo thứ tự hai phần', '=COUNTIF("Hà Nội",B2:B9)', 'Vùng đứng trước, điều kiện đứng sau']
          ]
        },
        { t: 'warn', html: 'Lỗi số 2 rất khó thấy vì Excel <b>không báo lỗi</b>, chỉ lặng lẽ trả về 0. Thấy kết quả 0 bất thường, hãy kiểm tra xem có tên ô nào bị kẹt trong ngoặc kép không.' },
        { t: 'tip', html: 'Muốn đếm ô <b>có dữ liệu</b> dùng <code>"&lt;&gt;"</code>, muốn đếm ô <b>trống</b> dùng <code>""</code>. Ví dụ đếm đơn chưa nhập ngày giao: <code>=COUNTIF(E2:E50,"")</code>.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Công thức nào đếm số đơn có số lượng lớn hơn 50 trong vùng C2:C20?',
          options: ['=COUNTIF(C2:C20,>50)', '=COUNTIF(C2:C20,">50")', '=COUNTIF(">50",C2:C20)', '=COUNT(C2:C20,">50")'],
          answer: 1,
          explain: 'Vùng đứng trước, điều kiện đứng sau. Phép so sánh phải đặt trong ngoặc kép: ">50".'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Ô F1 chứa số 100. Công thức nào đếm đúng các ô trong C2:C20 nhỏ hơn giá trị ở F1?',
          options: ['=COUNTIF(C2:C20,"<F1")', '=COUNTIF(C2:C20,<F1)', '=COUNTIF(C2:C20,"<"&F1)', '=COUNTIF(C2:C20,"<"F1)'],
          answer: 2,
          explain: 'Phép so sánh để trong ngoặc kép rồi nối với ô bằng dấu &: "<"&F1. Viết "<F1" thì Excel so sánh với chữ F1.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Cột B có 5 ô: Hà Nội, Đà Nẵng, Hà Nội, TP.HCM, Hà Nội. =COUNTIF(B2:B6,"<>Hà Nội") cho kết quả bao nhiêu?',
          options: ['3', '2', '5', '0'],
          answer: 1,
          explain: 'Dấu <> nghĩa là khác. Chỉ Đà Nẵng và TP.HCM khác Hà Nội, nên kết quả là 2.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Danh sách đơn hàng tuần này. Ở <code>G2</code> đếm số đơn của <b>khu vực ghi ở ô G1</b>. Ở <code>G3</code> đếm số đơn có <b>số lượng từ 100 trở lên</b>.',
          data: [
            ['Mã đơn', 'Khu vực', 'Số lượng', 'Trạng thái', '', 'Khu vực', 'Đà Nẵng'],
            ['DH101', 'Hà Nội', 150, 'Đã giao', '', 'Số đơn của khu vực'],
            ['DH102', 'Đà Nẵng', 80, 'Đã giao', '', 'Số đơn từ 100 SP'],
            ['DH103', 'TP.HCM', 220, 'Đang giao'],
            ['DH104', 'Đà Nẵng', 130, 'Đã giao'],
            ['DH105', 'Hà Nội', 40, 'Đã huỷ'],
            ['DH106', 'TP.HCM', 95, 'Đã giao'],
            ['DH107', 'Đà Nẵng', 310, 'Đang giao'],
            ['DH108', 'Cần Thơ', 100, 'Đã giao'],
            ['DH109', 'Hà Nội', 75, 'Đã giao']
          ],
          answers: [
            { cell: 'G2', solution: '=COUNTIF(B2:B10,G1)' },
            { cell: 'G3', solution: '=COUNTIF(C2:C10,">=100")' }
          ],
          mustUse: ['COUNTIF'],
          hint: 'G2: xét cột Khu vực, điều kiện là ô G1 (không cần ngoặc kép): <code>=COUNTIF(B2:B10,G1)</code>. G3: xét cột Số lượng, phép so sánh để trong ngoặc kép: <code>=COUNTIF(C2:C10,"&gt;=100")</code>.',
          explain: 'Đà Nẵng có 3 đơn. Thử sửa G1 thành Hà Nội, G2 tự đếm lại. Đơn DH108 có đúng 100 sản phẩm vẫn được đếm vì điều kiện là lớn hơn <b>hoặc bằng</b>.'
        },
        {
          id: 'ex2',
          task: 'Bảng chấm công tháng 3. <b>Ngưỡng đủ công ở ô G1</b>. Ở <code>G2</code> đếm số nhân viên có ngày công <b>từ ngưỡng trở lên</b>. Ở <code>G3</code> đếm số nhân viên <b>dưới ngưỡng</b>. Cả hai công thức phải lấy ngưỡng từ ô G1, không gõ cứng số 24.',
          data: [
            ['Nhân viên', 'Phòng ban', 'Ngày công', '', '', 'Ngưỡng đủ công', 24],
            ['Nguyễn Văn An', 'Kế toán', 26, '', '', 'Số NV đủ công'],
            ['Trần Thị Bình', 'Kinh doanh', 22, '', '', 'Số NV thiếu công'],
            ['Lê Hoàng Cường', 'Kho', 25],
            ['Phạm Thu Dung', 'Kinh doanh', 24],
            ['Hoàng Minh Đức', 'Kho', 20],
            ['Vũ Thị Hà', 'Nhân sự', 26],
            ['Đặng Quốc Huy', 'Kho', 23],
            ['Bùi Lan Hương', 'Kế toán', 25]
          ],
          answers: [
            { cell: 'G2', solution: '=COUNTIF(C2:C9,">="&G1)' },
            { cell: 'G3', solution: '=COUNTIF(C2:C9,"<"&G1)' }
          ],
          mustUse: ['COUNTIF'],
          hint: 'Dấu so sánh để trong ngoặc kép, rồi nối với ô G1 bằng dấu &amp;. G2: <code>=COUNTIF(C2:C9,"&gt;="&amp;G1)</code>. G3: <code>=COUNTIF(C2:C9,"&lt;"&amp;G1)</code>.',
          explain: '5 người đủ công, 3 người thiếu công. Hai kết quả cộng lại luôn bằng tổng số nhân viên. Khi công ty đổi ngưỡng, chỉ cần sửa ô G1.'
        },
        {
          id: 'ex3',
          task: 'Danh sách phiếu giao hàng. Ở <code>G1</code> đếm số phiếu <b>chưa giao xong</b> (trạng thái khác "Đã giao"). Ở <code>G2</code> đếm số phiếu có <b>cước trên 500.000đ</b>. Ở <code>G3</code> đếm số phiếu <b>chưa có tài xế</b> (ô tài xế trống).',
          data: [
            ['Phiếu', 'Tài xế', 'Cước (đ)', 'Trạng thái', '', 'Chưa giao xong'],
            ['PG01', 'Tuấn', 450000, 'Đã giao', '', 'Cước trên 500.000đ'],
            ['PG02', 'Hải', 720000, 'Đang giao', '', 'Chưa có tài xế'],
            ['PG03', '', 380000, 'Chờ xếp xe'],
            ['PG04', 'Tuấn', 950000, 'Đã giao'],
            ['PG05', 'Long', 510000, 'Đã giao'],
            ['PG06', '', 640000, 'Chờ xếp xe'],
            ['PG07', 'Hải', 300000, 'Đang giao'],
            ['PG08', 'Long', 820000, 'Đã giao']
          ],
          answers: [
            { cell: 'G1', solution: '=COUNTIF(D2:D9,"<>Đã giao")' },
            { cell: 'G2', solution: '=COUNTIF(C2:C9,">500000")' },
            { cell: 'G3', solution: '=COUNTIF(B2:B9,"")' }
          ],
          fmt: { C: 'int' },
          mustUse: ['COUNTIF'],
          hint: 'G1 dùng dấu khác &lt;&gt;: <code>=COUNTIF(D2:D9,"&lt;&gt;Đã giao")</code>. G2 gõ số liền, không có dấu chấm: <code>=COUNTIF(C2:C9,"&gt;500000")</code>. G3 đếm ô trống bằng hai dấu ngoặc kép liền nhau: <code>=COUNTIF(B2:B9,"")</code>.',
          explain: 'Dấu &lt;&gt; nghĩa là khác. Điều kiện "" dùng để đếm ô trống, rất tiện khi rà soát dữ liệu còn thiếu.'
        }
      ]
    },

    /* ---------------- Bài 2 ---------------- */
    {
      id: 'sumif',
      title: 'Hàm SUMIF: cộng theo điều kiện',
      minutes: 12,
      funcs: ['SUMIF'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Cuối tháng, kế toán cần báo cáo <b>tổng doanh thu của từng nhân viên</b>. Sổ bán hàng ghi theo ngày, tên các bạn nằm xen kẽ nhau.</p><p>Dùng SUM thì phải chọn từng ô của Lan, dễ sót, dễ nhầm. <b>SUMIF</b> tự tìm các dòng của Lan và cộng doanh thu của đúng các dòng đó.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> SUMIF giống <b>cộng hoá đơn của riêng một người</b>. Bạn lật từng hoá đơn, thấy tên Lan thì bấm số tiền vào máy tính, tên người khác thì gạt sang bên.' },
        { t: 'h', text: 'Công thức SUMIF gồm 3 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Nhân viên', 'Khu vực', 'Doanh thu', '', 'Doanh thu của Lan'],
            ['Lan', 'Miền Bắc', 45000000],
            ['Minh', 'Miền Nam', 62000000],
            ['Lan', 'Miền Bắc', 38000000],
            ['Quân', 'Miền Trung', 27000000],
            ['Lan', 'Miền Nam', 70000000]
          ],
          fmt: { C: 'int', E: 'int' },
          cell: 'E2',
          formula: '=SUMIF(A2:A6,"Lan",C2:C6)',
          parts: [
            { label: 'Xét vùng nào', desc: 'Cột để kiểm tra điều kiện. Ở đây là cột Nhân viên A2:A6.' },
            { label: 'Điều kiện là gì', desc: 'Dòng nào có tên <b>Lan</b> thì được cộng. Các ô tô màu là những dòng khớp.', range: ['A2', 'A4', 'A6'] },
            { label: 'Cộng vùng nào', desc: 'Cột chứa số tiền cần cộng: Doanh thu C2:C6. Vùng này phải bắt đầu và kết thúc cùng hàng với vùng xét.' }
          ],
          note: 'Thứ tự dễ nhớ: <b>xét ở đâu, điều kiện gì, cộng cái gì</b>.'
        },
        { t: 'h', text: 'Excel cộng như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Nhân viên', 'Khu vực', 'Doanh thu', '', 'Doanh thu của Lan'],
            ['Lan', 'Miền Bắc', 45000000],
            ['Minh', 'Miền Nam', 62000000],
            ['Lan', 'Miền Bắc', 38000000],
            ['Quân', 'Miền Trung', 27000000],
            ['Lan', 'Miền Nam', 70000000]
          ],
          fmt: { C: 'int', E: 'int' },
          cell: 'E2',
          formula: '=SUMIF(A2:A6,"Lan",C2:C6)',
          steps: [
            { html: 'Excel đọc công thức: xét cột <b>A</b>, tìm tên <b>"Lan"</b>, cộng số ở cột <b>C</b>. Tổng ban đầu: <b>0</b>.', hl: [['A2:A6', 0], ['C2:C6', 2]], select: 'A2' },
            { html: 'Dòng 2: <b>A2</b> là Lan, khớp. Lấy <b>C2</b> = 45 triệu cộng vào. Tổng: <b>45 triệu</b>.', hl: [['A2', 1], ['C2', 1]], select: 'C2' },
            { html: 'Dòng 3: <b>A3</b> là Minh, không khớp. Bỏ qua C3. Tổng vẫn: <b>45 triệu</b>.', hl: [['A2', 1], ['C2', 1], ['A3', 4]], select: 'A3' },
            { html: 'Dòng 4: <b>A4</b> là Lan, khớp. Cộng thêm <b>C4</b> = 38 triệu. Tổng: <b>83 triệu</b>.', hl: [['A2', 1], ['C2', 1], ['A4', 1], ['C4', 1]], select: 'C4' },
            { html: 'Dòng 5 là Quân: bỏ qua. Dòng 6 là Lan: cộng thêm <b>C6</b> = 70 triệu. Tổng: <b>153 triệu</b>.', hl: [['A2', 1], ['C2', 1], ['A4', 1], ['C4', 1], ['A5', 4], ['A6', 1], ['C6', 1]], select: 'C6' },
            { html: 'Hết bảng. Kết quả <b>153.000.000</b> hiện ở ô <b>E2</b>. Chỉ 3 ô xanh ở cột C được cộng.', hl: [['C2', 1], ['C4', 1], ['C6', 1], ['E2', 2]], select: 'E2' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'DoanhThu.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Cách 1: bấm tab <b>Formulas</b>.' },
            { id: 'formulas.math', n: 2, text: 'Bấm <b>Math &amp; Trig</b> (toán học), chọn <b>SUMIF</b>. Hộp thoại có 3 ô Range, Criteria, Sum_range đúng như 3 phần ở trên.' }
          ],
          caption: 'Cách 2 nhanh hơn: gõ thẳng công thức vào ô.'
        },
        {
          t: 'steps',
          title: 'Cách 2: gõ công thức trực tiếp',
          items: [
            'Bấm vào ô <b>E2</b>, gõ <code>=SUMIF(</code>',
            'Kéo chọn cột Nhân viên <b>A2:A6</b>, gõ dấu phẩy <code>,</code>',
            'Gõ điều kiện <code>"Lan"</code> và dấu phẩy.',
            'Kéo chọn cột Doanh thu <b>C2:C6</b>, gõ <code>)</code> rồi nhấn <kbd>Enter</kbd>.'
          ]
        },
        { t: 'h', text: 'Khi nào bỏ được phần "Cộng vùng nào"?' },
        { t: 'p', html: 'Khi cột kiểm tra cũng chính là cột cần cộng. Ví dụ "cộng các đơn từ 50 triệu trở lên": xét cột Doanh thu và cộng luôn cột Doanh thu, nên chỉ cần 2 phần: <code>=SUMIF(C2:C9,"&gt;=50000000")</code>.' },
        {
          t: 'example',
          title: 'Có và không có phần thứ ba',
          data: [
            ['Nhân viên', 'Khu vực', 'Doanh thu', '', 'Chỉ tiêu', 'Kết quả'],
            ['Lan', 'Miền Bắc', 45000000, '', 'Doanh thu của Lan', '=SUMIF(A2:A9,"Lan",C2:C9)'],
            ['Minh', 'Miền Nam', 62000000, '', 'Doanh thu Miền Nam', '=SUMIF(B2:B9,"Miền Nam",C2:C9)'],
            ['Lan', 'Miền Bắc', 38000000, '', 'Tổng các đơn từ 50 triệu', '=SUMIF(C2:C9,">=50000000")'],
            ['Quân', 'Miền Trung', 27000000],
            ['Minh', 'Miền Nam', 51000000],
            ['Quân', 'Miền Trung', 33000000],
            ['Lan', 'Miền Nam', 70000000],
            ['Minh', 'Miền Bắc', 24000000]
          ],
          fmt: { C: 'int', F: 'int' },
          note: 'Hai công thức đầu xét cột A hoặc B nhưng cộng cột C, nên phải có phần thứ ba. Công thức thứ ba xét và cộng cùng cột C, nên bỏ được.'
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Viết sai', 'Cách sửa'],
          rows: [
            ['Hai vùng lệch hàng', '=SUMIF(A2:A9,"Lan",C3:C10)', 'Excel không báo lỗi nhưng cộng nhầm dòng. Cho hai vùng cùng bắt đầu ở hàng 2: <code>C2:C9</code>'],
            ['Đảo vùng xét và vùng cộng', '=SUMIF(C2:C9,"Lan",A2:A9)', 'Kết quả ra 0. Vùng xét (tên) đứng đầu, vùng cộng (tiền) đứng cuối'],
            ['Quên ngoặc kép quanh phép so sánh', '=SUMIF(C2:C9,&gt;=50000000)', 'Viết <code>"&gt;=50000000"</code>'],
            ['Quên dấu $ khi kéo công thức', 'Kéo xuống, vùng trượt thành A3:A10', 'Khoá vùng: <code>$A$2:$A$9</code>, <code>$C$2:$C$9</code>']
          ]
        },
        { t: 'tip', html: 'Khi làm bảng tổng hợp cho nhiều nhân viên, gõ tên nhân viên ở một cột riêng (ví dụ cột F) rồi viết <code>=SUMIF($A$2:$A$9,F2,$C$2:$C$9)</code>. Khoá <code>$</code> hai vùng dữ liệu, để F2 tự do, kéo xuống là có tổng của từng người.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Cột A là Phòng ban, cột D là Chi phí (dòng 2 đến 50). Công thức nào tính tổng chi phí của phòng Kinh doanh?',
          options: ['=SUMIF(D2:D50,"Kinh doanh",A2:A50)', '=SUMIF(A2:A50,"Kinh doanh",D2:D50)', '=SUMIF("Kinh doanh",A2:A50,D2:D50)', '=SUM(A2:A50,"Kinh doanh")'],
          answer: 1,
          explain: 'Thứ tự của SUMIF: xét vùng nào (A), điều kiện gì ("Kinh doanh"), cộng vùng nào (D).'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Khi nào có thể bỏ phần thứ ba (vùng cần cộng) trong SUMIF?',
          options: ['Khi điều kiện là chữ', 'Khi vùng kiểm tra cũng chính là vùng cần cộng', 'Khi có nhiều điều kiện', 'Không bao giờ được bỏ'],
          answer: 1,
          explain: 'Ví dụ =SUMIF(C2:C9,">=50000000") vừa kiểm tra vừa cộng trên cột C.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'A2:A5 là Lan, Minh, Lan, Quân. C2:C5 là 10, 20, 30, 40. =SUMIF(A2:A5,"Lan",C2:C5) bằng bao nhiêu?',
          options: ['100', '40', '2', '30'],
          answer: 1,
          explain: 'Chỉ dòng 2 và dòng 4 là Lan, nên cộng C2 + C4 = 10 + 30 = 40.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Làm bảng tổng hợp doanh thu theo nhân viên. Viết công thức ở <code>G2</code> lấy tên ở <code>F2</code>, rồi sao chép xuống <code>G3:G4</code>. Nhớ khoá vùng dữ liệu.',
          data: [
            ['Ngày', 'Nhân viên', 'Doanh thu', '', '', 'Nhân viên', 'Tổng doanh thu'],
            ['01/03/2024', 'Hương', 18500000, '', '', 'Hương'],
            ['01/03/2024', 'Tùng', 22000000, '', '', 'Tùng'],
            ['02/03/2024', 'Ngọc', 9500000, '', '', 'Ngọc'],
            ['02/03/2024', 'Hương', 31000000],
            ['03/03/2024', 'Tùng', 12500000],
            ['03/03/2024', 'Ngọc', 27000000],
            ['04/03/2024', 'Hương', 14000000],
            ['04/03/2024', 'Tùng', 40500000],
            ['05/03/2024', 'Ngọc', 16000000]
          ],
          fill: { range: 'G2:G4', solution: '=SUMIF($B$2:$B$10,F2,$C$2:$C$10)' },
          fmt: { A: 'date', C: 'int', G: 'int' },
          mustUse: ['SUMIF'],
          hint: 'Xét cột Nhân viên, điều kiện là ô F2 (để tự do, kéo xuống thành F3, F4), cộng cột Doanh thu. Hai vùng dữ liệu khoá $: <code>=SUMIF($B$2:$B$10,F2,$C$2:$C$10)</code>.',
          explain: 'Một công thức cho cả bảng tổng hợp. Thêm tên nhân viên mới ở F5 rồi kéo công thức xuống là xong.'
        },
        {
          id: 'ex2',
          task: 'Bảng chi phí vận chuyển. Ở <code>G2</code> tính tổng cước của <b>tuyến ghi ở ô G1</b>. Ở <code>G4</code> tính tổng cước của các chuyến có <b>cước từ mức ở ô G3</b> trở lên.',
          data: [
            ['Chuyến', 'Tuyến', 'Cước (đ)', '', '', 'Tuyến', 'HN - HP'],
            ['C01', 'HN - HP', 2800000, '', '', 'Tổng cước tuyến'],
            ['C02', 'HN - ĐN', 9500000, '', '', 'Mức cước', 5000000],
            ['C03', 'HN - HP', 3100000, '', '', 'Tổng chuyến từ mức'],
            ['C04', 'HCM - CT', 4200000],
            ['C05', 'HN - ĐN', 10200000],
            ['C06', 'HN - HP', 2600000],
            ['C07', 'HCM - CT', 3900000],
            ['C08', 'HCM - ĐN', 8700000]
          ],
          answers: [
            { cell: 'G2', solution: '=SUMIF(B2:B9,G1,C2:C9)' },
            { cell: 'G4', solution: '=SUMIF(C2:C9,">="&G3)' }
          ],
          fmt: { C: 'int', G: 'int' },
          mustUse: ['SUMIF'],
          hint: 'G2: xét cột Tuyến, cộng cột Cước: <code>=SUMIF(B2:B9,G1,C2:C9)</code>. G4: xét và cộng cùng cột Cước, nối dấu so sánh với ô G3: <code>=SUMIF(C2:C9,"&gt;="&amp;G3)</code>.',
          explain: 'G2 cần đủ 3 phần vì cột xét khác cột cộng. G4 xét và cộng cùng một cột nên chỉ cần 2 phần.'
        },
        {
          id: 'ex3',
          task: 'Thẻ kho của mặt hàng Giấy A4. <b>Tồn đầu kỳ ở ô G1</b>. Tính tổng nhập ở <code>G2</code>, tổng xuất ở <code>G3</code> và tồn cuối kỳ (tồn đầu + nhập − xuất) ở <code>G4</code>.',
          data: [
            ['Phiếu', 'Loại', 'Số lượng (ram)', '', '', 'Tồn đầu kỳ', 150],
            ['PN01', 'Nhập', 500, '', '', 'Tổng nhập'],
            ['PX01', 'Xuất', 120, '', '', 'Tổng xuất'],
            ['PX02', 'Xuất', 95, '', '', 'Tồn cuối kỳ'],
            ['PN02', 'Nhập', 200],
            ['PX03', 'Xuất', 150],
            ['PX04', 'Xuất', 80],
            ['PN03', 'Nhập', 300],
            ['PX05', 'Xuất', 210]
          ],
          answers: [
            { cell: 'G2', solution: '=SUMIF(B2:B9,"Nhập",C2:C9)' },
            { cell: 'G3', solution: '=SUMIF(B2:B9,"Xuất",C2:C9)' },
            { cell: 'G4', solution: '=G1+G2-G3' }
          ],
          hint: 'G2: <code>=SUMIF(B2:B9,"Nhập",C2:C9)</code>. G3 giống hệt nhưng đổi thành "Xuất". G4 là phép tính thường: <code>=G1+G2-G3</code>.',
          explain: 'Tồn cuối = 150 + 1.000 − 655 = 495 ram. Nếu sổ kho có nhiều mã hàng, bạn cần thêm điều kiện mã hàng. Đó là lúc dùng SUMIFS ở bài 4.'
        }
      ]
    },

    /* ---------------- Bài 3 ---------------- */
    {
      id: 'averageif',
      title: 'Hàm AVERAGEIF: trung bình theo điều kiện',
      minutes: 10,
      funcs: ['AVERAGEIF'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Phòng nhân sự cần biết <b>lương trung bình của phòng Kinh doanh</b> để so với thị trường. Danh sách lương có đủ các phòng trộn lẫn.</p><p>Muốn tính tay phải lọc ra từng người, cộng lại rồi chia. <b>AVERAGEIF</b> làm cả ba việc trong một công thức.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> AVERAGEIF giống <b>tính điểm trung bình riêng một lớp</b> trong cả xấp bài thi của toàn trường. Chỉ nhặt bài của lớp đó, cộng điểm, rồi chia cho số bài vừa nhặt.' },
        { t: 'h', text: 'Công thức AVERAGEIF gồm 3 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Nhân viên', 'Phòng ban', 'Lương', '', 'TB lương Kinh doanh'],
            ['An', 'Kế toán', 12000000],
            ['Bình', 'Kinh doanh', 15000000],
            ['Cường', 'Kế toán', 10000000],
            ['Dung', 'Kinh doanh', 18000000],
            ['Hà', 'Kinh doanh', 12000000]
          ],
          fmt: { C: 'int', E: 'int' },
          cell: 'E2',
          formula: '=AVERAGEIF(B2:B6,"Kinh doanh",C2:C6)',
          parts: [
            { label: 'Xét vùng nào', desc: 'Cột để kiểm tra điều kiện: Phòng ban B2:B6.' },
            { label: 'Điều kiện là gì', desc: 'Chỉ lấy những người thuộc phòng <b>Kinh doanh</b>. Các ô tô màu là những dòng khớp.', range: ['B3', 'B5', 'B6'] },
            { label: 'Tính trung bình vùng nào', desc: 'Cột chứa số cần tính trung bình: Lương C2:C6. Thứ tự giống hệt SUMIF.' }
          ],
          note: 'AVERAGEIF = (tổng các dòng thoả điều kiện) chia (số dòng thoả điều kiện).'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Nhân viên', 'Phòng ban', 'Lương', '', 'TB lương Kinh doanh'],
            ['An', 'Kế toán', 12000000],
            ['Bình', 'Kinh doanh', 15000000],
            ['Cường', 'Kế toán', 10000000],
            ['Dung', 'Kinh doanh', 18000000],
            ['Hà', 'Kinh doanh', 12000000]
          ],
          fmt: { C: 'int', E: 'int' },
          cell: 'E2',
          formula: '=AVERAGEIF(B2:B6,"Kinh doanh",C2:C6)',
          steps: [
            { html: 'Excel xét cột <b>B</b>, tìm <b>"Kinh doanh"</b>. Tổng: <b>0</b>, số người: <b>0</b>.', hl: [['B2:B6', 0], ['C2:C6', 2]], select: 'B2' },
            { html: 'Dòng 2: An thuộc Kế toán, bỏ qua. Dòng 3: Bình thuộc Kinh doanh, lấy 15 triệu. Tổng: <b>15 triệu</b>, số người: <b>1</b>.', hl: [['B2', 4], ['B3', 1], ['C3', 1]], select: 'C3' },
            { html: 'Dòng 4: Cường thuộc Kế toán, bỏ qua. Tổng vẫn <b>15 triệu</b>, số người <b>1</b>.', hl: [['B3', 1], ['C3', 1], ['B4', 4]], select: 'B4' },
            { html: 'Dòng 5: Dung thuộc Kinh doanh, lấy 18 triệu. Tổng: <b>33 triệu</b>, số người: <b>2</b>.', hl: [['B3', 1], ['C3', 1], ['B5', 1], ['C5', 1]], select: 'C5' },
            { html: 'Dòng 6: Hà thuộc Kinh doanh, lấy 12 triệu. Tổng: <b>45 triệu</b>, số người: <b>3</b>.', hl: [['B3', 1], ['C3', 1], ['B5', 1], ['C5', 1], ['B6', 1], ['C6', 1]], select: 'C6' },
            { html: 'Chia: 45 triệu / 3 người = <b>15.000.000</b>. Kết quả hiện ở ô <b>E2</b>. Lương của An và Cường không ảnh hưởng.', hl: [['C3', 1], ['C5', 1], ['C6', 1], ['E2', 2]], select: 'E2' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          items: [
            'Bấm vào ô <b>E2</b>, gõ <code>=AVERAGEIF(</code>',
            'Kéo chọn cột Phòng ban <b>B2:B6</b>, gõ dấu phẩy.',
            'Gõ <code>"Kinh doanh"</code> và dấu phẩy.',
            'Kéo chọn cột Lương <b>C2:C6</b>, gõ <code>)</code> rồi nhấn <kbd>Enter</kbd>.'
          ]
        },
        { t: 'p', html: 'Nếu thích dùng menu: AVERAGEIF nằm ở <b>Formulas › More Functions › Statistical</b>.' },
        {
          t: 'example',
          title: 'Lương trung bình theo phòng ban',
          data: [
            ['Nhân viên', 'Phòng ban', 'Lương', '', 'Chỉ tiêu', 'Kết quả'],
            ['An', 'Kế toán', 12000000, '', 'TB phòng Kế toán', '=AVERAGEIF(B2:B8,"Kế toán",C2:C8)'],
            ['Bình', 'Kinh doanh', 15000000, '', 'TB phòng Kinh doanh', '=AVERAGEIF(B2:B8,"Kinh doanh",C2:C8)'],
            ['Cường', 'Kế toán', 10000000, '', 'TB lương từ 12 triệu', '=AVERAGEIF(C2:C8,">=12000000")'],
            ['Dung', 'Kinh doanh', 18000000],
            ['Đức', 'Kho', 9000000],
            ['Hà', 'Kinh doanh', 12000000],
            ['Huy', 'Kho', 8500000]
          ],
          fmt: { C: 'int', F: 'int' },
          note: 'Kế toán: (12 + 10) / 2 = 11 triệu. Kinh doanh: (15 + 18 + 12) / 3 = 15 triệu. Công thức thứ ba xét và tính cùng cột C nên chỉ có 2 phần.'
        },
        { t: 'tip', html: 'AVERAGEIF với điều kiện <code>"&gt;0"</code> giúp tính trung bình mà <b>bỏ qua các ô bằng 0</b>, ví dụ những ngày cửa hàng đóng cửa. Hàm AVERAGE thường sẽ tính cả số 0 và kéo trung bình xuống.' },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Hiện tượng', 'Nguyên nhân', 'Cách sửa'],
          rows: [
            ['Báo <code>#DIV/0!</code>', 'Không dòng nào thoả điều kiện, Excel phải chia cho 0. Thường do gõ sai chính tả, ví dụ "Kinh  doanh" thừa dấu cách', 'Kiểm tra lại chữ trong điều kiện, hoặc đặt điều kiện trong ô và chọn từ danh sách'],
            ['Trung bình thấp bất thường', 'Dùng AVERAGE thường, các ngày bằng 0 bị tính vào', 'Dùng <code>=AVERAGEIF(C2:C11,"&gt;0")</code>'],
            ['Kết quả sai dòng', 'Vùng xét và vùng tính lệch hàng, ví dụ B2:B6 với C3:C7', 'Cho hai vùng cùng bắt đầu một hàng']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Doanh số 5 ngày là 10, 0, 20, 0, 30 (triệu) nằm ở B2:B6. =AVERAGEIF(B2:B6,">0") cho kết quả bao nhiêu?',
          options: ['12', '20', '60', '15'],
          answer: 1,
          explain: 'Chỉ tính trung bình 3 ô lớn hơn 0: (10 + 20 + 30) / 3 = 20. Còn AVERAGE thường sẽ ra 60 / 5 = 12.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'AVERAGEIF trả về #DIV/0!. Nguyên nhân có khả năng nhất?',
          options: ['Vùng tính trung bình có chữ', 'Không có ô nào thoả điều kiện', 'Thiếu phần vùng tính trung bình', 'Dữ liệu quá nhiều dòng'],
          answer: 1,
          explain: 'Không có ô nào thoả điều kiện thì số ô bằng 0, phép chia cho 0 gây lỗi #DIV/0!.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tính <b>lương trung bình của phòng ghi ở ô G1</b>, đặt kết quả ở <code>G2</code>.',
          data: [
            ['Nhân viên', 'Phòng ban', 'Lương', '', '', 'Phòng ban', 'Kinh doanh'],
            ['Nguyễn Văn An', 'Kế toán', 13500000, '', '', 'Lương trung bình'],
            ['Trần Thị Bình', 'Kinh doanh', 16000000],
            ['Lê Hoàng Cường', 'Kho', 9500000],
            ['Phạm Thu Dung', 'Kinh doanh', 21000000],
            ['Hoàng Minh Đức', 'Kho', 8800000],
            ['Vũ Thị Hà', 'Kế toán', 11000000],
            ['Đặng Quốc Huy', 'Kinh doanh', 14500000],
            ['Bùi Lan Hương', 'Nhân sự', 12000000]
          ],
          answers: [{ cell: 'G2', solution: '=AVERAGEIF(B2:B9,G1,C2:C9)' }],
          fmt: { C: 'int', G: 'int' },
          mustUse: ['AVERAGEIF'],
          hint: 'Xét cột Phòng ban, điều kiện là ô G1, tính trung bình cột Lương: <code>=AVERAGEIF(B2:B9,G1,C2:C9)</code>.',
          explain: 'Phòng Kinh doanh có 3 người, trung bình (16 + 21 + 14,5) / 3 ≈ 17,17 triệu. Đổi G1 thành Kho để xem lương trung bình của kho.'
        },
        {
          id: 'ex2',
          task: 'Đánh giá nhà xe: tính <b>số giờ giao hàng trung bình</b> của từng nhà xe. Viết ở <code>G2</code> theo tên ở <code>F2</code>, rồi sao chép xuống <code>G3:G4</code>.',
          data: [
            ['Đơn', 'Nhà xe', 'Số giờ giao', '', '', 'Nhà xe', 'TB số giờ'],
            ['VD01', 'Phương Nam', 18, '', '', 'Phương Nam'],
            ['VD02', 'Bắc Việt', 26, '', '', 'Bắc Việt'],
            ['VD03', 'Sao Mai', 22, '', '', 'Sao Mai'],
            ['VD04', 'Phương Nam', 20],
            ['VD05', 'Bắc Việt', 30],
            ['VD06', 'Sao Mai', 16],
            ['VD07', 'Phương Nam', 25],
            ['VD08', 'Bắc Việt', 28],
            ['VD09', 'Sao Mai', 19]
          ],
          fill: { range: 'G2:G4', solution: '=AVERAGEIF($B$2:$B$10,F2,$C$2:$C$10)' },
          fmt: { G: 'dec1' },
          mustUse: ['AVERAGEIF'],
          hint: 'Khoá hai vùng dữ liệu bằng $, để F2 tự do để kéo xuống: <code>=AVERAGEIF($B$2:$B$10,F2,$C$2:$C$10)</code>.',
          explain: 'Sao Mai giao nhanh nhất (trung bình 19 giờ), Bắc Việt chậm nhất (28 giờ). Đây là dạng báo cáo KPI nhà vận chuyển rất hay gặp.'
        },
        {
          id: 'ex3',
          task: 'Doanh số 10 ngày của cửa hàng, ngày đóng cửa ghi 0. Ở <code>E1</code> tính trung bình <b>chỉ các ngày có bán</b> (lớn hơn 0). Ở <code>E2</code> tính trung bình doanh số của các <b>ngày Chủ nhật</b> (CN).',
          data: [
            ['Ngày', 'Thứ', 'Doanh số', 'TB ngày có bán'],
            ['01/09/2024', 'CN', 25000000, 'TB ngày Chủ nhật'],
            ['02/09/2024', 'T2', 0],
            ['03/09/2024', 'T3', 12500000],
            ['04/09/2024', 'T4', 14000000],
            ['05/09/2024', 'T5', 11000000],
            ['06/09/2024', 'T6', 16500000],
            ['07/09/2024', 'T7', 21000000],
            ['08/09/2024', 'CN', 28000000],
            ['09/09/2024', 'T2', 0],
            ['10/09/2024', 'T3', 13000000]
          ],
          answers: [
            { cell: 'E1', solution: '=AVERAGEIF(C2:C11,">0")' },
            { cell: 'E2', solution: '=AVERAGEIF(B2:B11,"CN",C2:C11)' }
          ],
          fmt: { A: 'date', C: 'int', E: 'int' },
          mustUse: ['AVERAGEIF'],
          hint: 'E1: xét và tính cùng cột Doanh số nên chỉ cần 2 phần: <code>=AVERAGEIF(C2:C11,"&gt;0")</code>. E2: xét cột Thứ, tính cột Doanh số: <code>=AVERAGEIF(B2:B11,"CN",C2:C11)</code>.',
          explain: 'Ngày 02/09 là ngày lễ đóng cửa. Nếu dùng AVERAGE thường, hai ngày bằng 0 sẽ kéo doanh số trung bình xuống thấp hơn thực tế.'
        }
      ]
    },

    /* ---------------- Bài 4 ---------------- */
    {
      id: 'nhieu-dieu-kien',
      title: 'COUNTIFS, SUMIFS, AVERAGEIFS: nhiều điều kiện',
      minutes: 15,
      funcs: ['COUNTIFS', 'SUMIFS', 'AVERAGEIFS'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Sếp hỏi: <b>"Lan bán được bao nhiêu tiền Laptop?"</b>. Câu hỏi có <b>hai</b> điều kiện cùng lúc: đúng người là Lan, và đúng sản phẩm là Laptop.</p><p>SUMIF chỉ nhận một điều kiện. Các hàm có đuôi <b>S</b> như <b>SUMIFS, COUNTIFS, AVERAGEIFS</b> nhận bao nhiêu điều kiện cũng được.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> giống <b>soát vé qua hai cửa</b>. Khách phải có vé đúng chuyến <b>và</b> đúng ngày mới được lên xe. Một dòng dữ liệu phải qua <b>tất cả</b> các cửa điều kiện thì mới được cộng.' },
        { t: 'h', text: 'Công thức SUMIFS: vùng cộng đứng đầu, sau đó từng cặp điều kiện' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Nhân viên', 'Sản phẩm', 'Doanh thu', '', 'Lan bán Laptop'],
            ['Lan', 'Laptop', 42000000],
            ['Minh', 'Laptop', 51000000],
            ['Lan', 'Máy in', 15000000],
            ['Lan', 'Laptop', 45000000],
            ['Quân', 'Laptop', 38000000]
          ],
          fmt: { C: 'int', E: 'int' },
          cell: 'E2',
          formula: '=SUMIFS(C2:C6,A2:A6,"Lan",B2:B6,"Laptop")',
          parts: [
            { label: 'Cộng vùng nào', desc: 'Cột số cần cộng: Doanh thu. Với SUMIFS, phần này <b>đứng đầu tiên</b>, ngược với SUMIF.' },
            { label: 'Xét vùng thứ nhất', desc: 'Cột kiểm tra điều kiện 1: Nhân viên.' },
            { label: 'Điều kiện 1', desc: 'Tên phải là <b>Lan</b>. Các ô tô màu là những dòng qua được cửa thứ nhất.', range: ['A2', 'A4', 'A5'] },
            { label: 'Xét vùng thứ hai', desc: 'Cột kiểm tra điều kiện 2: Sản phẩm.' },
            { label: 'Điều kiện 2', desc: 'Sản phẩm phải là <b>Laptop</b>. Chỉ dòng nào tô màu ở <b>cả hai</b> điều kiện mới được cộng: dòng 2 và dòng 5.', range: ['B2', 'B3', 'B5', 'B6'] }
          ],
          note: 'Mỗi điều kiện luôn đi thành cặp: <b>xét vùng nào</b>, rồi <b>điều kiện gì</b>. Muốn thêm điều kiện thứ ba, viết thêm một cặp nữa ở cuối.'
        },
        { t: 'h', text: 'Excel cộng như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước. Xanh là đúng điều kiện, đỏ là sai',
          data: [
            ['Nhân viên', 'Sản phẩm', 'Doanh thu', '', 'Lan bán Laptop'],
            ['Lan', 'Laptop', 42000000],
            ['Minh', 'Laptop', 51000000],
            ['Lan', 'Máy in', 15000000],
            ['Lan', 'Laptop', 45000000],
            ['Quân', 'Laptop', 38000000]
          ],
          fmt: { C: 'int', E: 'int' },
          cell: 'E2',
          formula: '=SUMIFS(C2:C6,A2:A6,"Lan",B2:B6,"Laptop")',
          steps: [
            { html: 'Excel đọc công thức: cộng cột <b>C</b>, nhưng chỉ ở dòng có A là <b>Lan</b> và B là <b>Laptop</b>. Tổng ban đầu: <b>0</b>.', hl: [['C2:C6', 0], ['A2:A6', 1], ['B2:B6', 3]], select: 'A2' },
            { html: 'Dòng 2: Lan đúng, Laptop đúng. Qua cả hai cửa, cộng 42 triệu. Tổng: <b>42 triệu</b>.', hl: [['A2:C2', 1]], select: 'C2' },
            { html: 'Dòng 3: Laptop đúng, nhưng tên là Minh, sai. Chỉ đúng một điều kiện thì <b>bị loại</b>. Tổng vẫn <b>42 triệu</b>.', hl: [['A2:C2', 1], ['A3', 4], ['B3', 1]], select: 'A3' },
            { html: 'Dòng 4: tên Lan đúng, nhưng sản phẩm là Máy in, sai. Bị loại. Tổng vẫn <b>42 triệu</b>.', hl: [['A2:C2', 1], ['A4', 1], ['B4', 4]], select: 'B4' },
            { html: 'Dòng 5: Lan đúng, Laptop đúng. Cộng 45 triệu. Tổng: <b>87 triệu</b>.', hl: [['A2:C2', 1], ['A5:C5', 1]], select: 'C5' },
            { html: 'Dòng 6: Laptop đúng nhưng tên là Quân, sai. Bị loại. Tổng vẫn <b>87 triệu</b>.', hl: [['A2:C2', 1], ['A5:C5', 1], ['A6', 4], ['B6', 1]], select: 'A6' },
            { html: 'Hết bảng. Kết quả <b>87.000.000</b> hiện ở ô <b>E2</b>. Chỉ 2 dòng qua được cả hai cửa.', hl: [['C2', 1], ['C5', 1], ['E2', 2]], select: 'E2' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          items: [
            'Bấm ô <b>E2</b>, gõ <code>=SUMIFS(</code>. SUMIFS nằm ở <b>Formulas › Math &amp; Trig</b> nếu bạn thích dùng menu.',
            'Chọn <b>vùng cần cộng trước</b>: C2:C6, gõ dấu phẩy.',
            'Chọn cột Nhân viên A2:A6, dấu phẩy, gõ <code>"Lan"</code>, dấu phẩy.',
            'Chọn cột Sản phẩm B2:B6, dấu phẩy, gõ <code>"Laptop"</code>, đóng <code>)</code> và nhấn <kbd>Enter</kbd>.'
          ]
        },
        { t: 'h', text: 'COUNTIFS: đếm theo nhiều điều kiện' },
        { t: 'p', html: 'COUNTIFS chỉ đếm nên <b>không có</b> vùng cộng, chỉ gồm các cặp (xét vùng nào, điều kiện gì). Ví dụ đếm đơn Miền Bắc từ 20 triệu trở lên: <code>=COUNTIFS(B2:B9,"Miền Bắc",D2:D9,"&gt;=20000000")</code>.' },
        { t: 'h', text: 'AVERAGEIFS: trung bình theo nhiều điều kiện' },
        { t: 'p', html: 'AVERAGEIFS viết giống SUMIFS: vùng tính trung bình đứng đầu, sau đó các cặp điều kiện. Ví dụ trung bình đơn Laptop ở Miền Nam: <code>=AVERAGEIFS(D2:D9,C2:C9,"Laptop",B2:B9,"Miền Nam")</code>.' },
        {
          t: 'example',
          title: 'Ba hàm …IFS trên cùng một bảng',
          data: [
            ['Nhân viên', 'Khu vực', 'Sản phẩm', 'Doanh thu', '', 'Chỉ tiêu', 'Kết quả'],
            ['Lan', 'Miền Bắc', 'Laptop', 42000000, '', 'Lan bán Laptop', '=SUMIFS(D2:D9,A2:A9,"Lan",C2:C9,"Laptop")'],
            ['Minh', 'Miền Nam', 'Máy in', 18000000, '', 'Số đơn Miền Bắc từ 20 triệu', '=COUNTIFS(B2:B9,"Miền Bắc",D2:D9,">=20000000")'],
            ['Lan', 'Miền Bắc', 'Máy in', 15000000, '', 'TB đơn Laptop Miền Nam', '=AVERAGEIFS(D2:D9,C2:C9,"Laptop",B2:B9,"Miền Nam")'],
            ['Quân', 'Miền Bắc', 'Laptop', 38000000],
            ['Minh', 'Miền Nam', 'Laptop', 51000000],
            ['Lan', 'Miền Nam', 'Laptop', 45000000],
            ['Quân', 'Miền Bắc', 'Màn hình', 12000000],
            ['Minh', 'Miền Bắc', 'Laptop', 40000000]
          ],
          fmt: { D: 'int', G: 'int' },
          note: 'Lan bán Laptop: 42 + 45 = 87 triệu (cả hai khu vực). Miền Bắc có 3 đơn từ 20 triệu. Laptop Miền Nam có 2 đơn, trung bình 48 triệu.'
        },
        { t: 'h', text: 'Chú ý thứ tự: hàm có S đặt vùng tính lên đầu' },
        {
          t: 'table',
          head: ['Hàm', 'Vùng cần tính nằm ở', 'Ví dụ'],
          rows: [
            ['SUMIF', 'Cuối cùng (phần thứ 3)', '=SUMIF(A2:A9,"Lan",D2:D9)'],
            ['SUMIFS', 'Đầu tiên', '=SUMIFS(D2:D9,A2:A9,"Lan")'],
            ['AVERAGEIF', 'Cuối cùng', '=AVERAGEIF(A2:A9,"Lan",D2:D9)'],
            ['AVERAGEIFS', 'Đầu tiên', '=AVERAGEIFS(D2:D9,A2:A9,"Lan")'],
            ['COUNTIFS', 'Không có (chỉ đếm)', '=COUNTIFS(A2:A9,"Lan",C2:C9,"Laptop")']
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Viết sai', 'Cách sửa'],
          rows: [
            ['Viết SUMIFS theo thứ tự của SUMIF', '=SUMIFS(A2:A9,"Lan",D2:D9)', 'Vùng cộng lên đầu: <code>=SUMIFS(D2:D9,A2:A9,"Lan")</code>'],
            ['Các vùng khác kích thước', '=SUMIFS(D2:D9,A2:A10,"Lan")', 'Báo <code>#VALUE!</code>. Cho mọi vùng cùng từ hàng 2 đến hàng 9'],
            ['Quên ngoặc kép quanh phép so sánh', '=COUNTIFS(D2:D9,&gt;=20000000)', 'Viết <code>"&gt;=20000000"</code>'],
            ['So sánh với ô mà để ô trong ngoặc kép', '"&gt;=H2"', 'Nối bằng &amp;: <code>"&gt;="&amp;H2</code>'],
            ['Muốn HOẶC nhưng viết thành VÀ', '=COUNTIFS(B2:B9,"Hà Nội",B2:B9,"Hải Phòng")', 'Ra 0. Cộng hai hàm: <code>=COUNTIF(B2:B9,"Hà Nội")+COUNTIF(B2:B9,"Hải Phòng")</code>']
          ]
        },
        { t: 'tip', html: 'SUMIFS dùng được cả khi chỉ có <b>một</b> điều kiện. Nhiều người luôn dùng SUMIFS thay cho SUMIF để khỏi phải nhớ hai kiểu thứ tự.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Cột B là Khu vực, C là Sản phẩm, D là Doanh thu (dòng 2 đến 100). Công thức nào đúng để tính doanh thu Máy in ở Miền Nam?',
          options: ['=SUMIFS(B2:B100,"Miền Nam",C2:C100,"Máy in",D2:D100)', '=SUMIFS(D2:D100,B2:B100,"Miền Nam",C2:C100,"Máy in")', '=SUMIF(D2:D100,B2:B100,"Miền Nam",C2:C100,"Máy in")', '=SUMIFS(D2:D100,"Miền Nam",B2:B100,"Máy in",C2:C100)'],
          answer: 1,
          explain: 'SUMIFS: vùng cần cộng đứng đầu, sau đó là từng cặp (xét vùng nào, điều kiện gì).'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Muốn đếm đơn đi Hà Nội HOẶC Hải Phòng ở cột B, cách nào đúng?',
          options: ['=COUNTIFS(B2:B50,"Hà Nội",B2:B50,"Hải Phòng")', '=COUNTIF(B2:B50,"Hà Nội")+COUNTIF(B2:B50,"Hải Phòng")', '=COUNTIF(B2:B50,"Hà Nội, Hải Phòng")', '=COUNTIF(B2:B50,"Hà Nội"&"Hải Phòng")'],
          answer: 1,
          explain: 'Các điều kiện trong COUNTIFS là quan hệ VÀ, một ô không thể vừa là Hà Nội vừa là Hải Phòng nên ra 0. Quan hệ HOẶC thì cộng hai lần đếm.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Một dòng có Nhân viên là Lan nhưng Sản phẩm là Máy in. =SUMIFS(C2:C9,A2:A9,"Lan",B2:B9,"Laptop") có cộng dòng đó không?',
          options: ['Có, vì đúng tên Lan', 'Không, vì phải đúng cả hai điều kiện', 'Có, nhưng chỉ cộng một nửa', 'Báo lỗi #VALUE!'],
          answer: 1,
          explain: 'Các hàm …IFS chỉ tính dòng thoả tất cả điều kiện. Dòng này sai điều kiện Laptop nên bị loại.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Theo dõi đơn hàng. Ở <code>H3</code> đếm số đơn thuộc <b>khu vực ở ô H1</b> và có <b>trạng thái ở ô H2</b>.',
          data: [
            ['Mã đơn', 'Khu vực', 'Trạng thái', 'Giá trị', '', '', 'Khu vực', 'Hà Nội'],
            ['DH201', 'Hà Nội', 'Đã giao', 4500000, '', '', 'Trạng thái', 'Đã giao'],
            ['DH202', 'TP.HCM', 'Đã giao', 7200000, '', '', 'Số đơn'],
            ['DH203', 'Hà Nội', 'Đang giao', 3100000],
            ['DH204', 'Hà Nội', 'Đã giao', 9800000],
            ['DH205', 'Đà Nẵng', 'Đã huỷ', 2500000],
            ['DH206', 'TP.HCM', 'Đang giao', 6400000],
            ['DH207', 'Hà Nội', 'Đã giao', 5300000],
            ['DH208', 'Hà Nội', 'Đã huỷ', 1900000],
            ['DH209', 'TP.HCM', 'Đã giao', 8100000]
          ],
          answers: [{ cell: 'H3', solution: '=COUNTIFS(B2:B10,H1,C2:C10,H2)' }],
          fmt: { D: 'int' },
          mustUse: ['COUNTIFS'],
          strict: false,
          hint: 'Hai cặp (xét vùng nào, điều kiện gì): cột Khu vực với H1, cột Trạng thái với H2. <code>=COUNTIFS(B2:B10,H1,C2:C10,H2)</code>.',
          explain: 'Hà Nội có 5 đơn nhưng chỉ 3 đơn vừa Hà Nội vừa Đã giao. Đổi H2 thành "Đã huỷ" để xem ngay số đơn huỷ của Hà Nội.'
        },
        {
          id: 'ex2',
          task: 'Bảng bán hàng. Ở <code>H3</code> tính tổng doanh thu của <b>nhân viên ở ô H1</b> bán <b>sản phẩm ở ô H2</b>. Ở <code>H4</code> đếm số đơn tương ứng.',
          data: [
            ['Ngày', 'Nhân viên', 'Sản phẩm', 'Doanh thu', '', '', 'Nhân viên', 'Hương'],
            ['02/04/2024', 'Hương', 'Điều hoà', 12500000, '', '', 'Sản phẩm', 'Tủ lạnh'],
            ['02/04/2024', 'Tùng', 'Tủ lạnh', 9800000, '', '', 'Doanh thu'],
            ['03/04/2024', 'Hương', 'Tủ lạnh', 11200000, '', '', 'Số đơn'],
            ['03/04/2024', 'Ngọc', 'Máy giặt', 8700000],
            ['04/04/2024', 'Hương', 'Tủ lạnh', 13400000],
            ['04/04/2024', 'Tùng', 'Điều hoà', 15600000],
            ['05/04/2024', 'Hương', 'Máy giặt', 7900000],
            ['05/04/2024', 'Ngọc', 'Tủ lạnh', 10300000],
            ['06/04/2024', 'Hương', 'Tủ lạnh', 9600000]
          ],
          answers: [
            { cell: 'H3', solution: '=SUMIFS(D2:D10,B2:B10,H1,C2:C10,H2)' },
            { cell: 'H4', solution: '=COUNTIFS(B2:B10,H1,C2:C10,H2)' }
          ],
          fmt: { A: 'date', D: 'int', H: 'int' },
          hint: 'H3: vùng cộng (Doanh thu) đứng đầu: <code>=SUMIFS(D2:D10,B2:B10,H1,C2:C10,H2)</code>. H4: bỏ vùng cộng đi là thành COUNTIFS: <code>=COUNTIFS(B2:B10,H1,C2:C10,H2)</code>.',
          explain: 'Hương bán 3 đơn tủ lạnh, tổng 34,2 triệu. Đặt điều kiện trong ô giúp bảng này thành một "công cụ tra cứu" cho cả phòng.'
        },
        {
          id: 'ex3',
          task: 'Cước vận chuyển theo tuyến. Ở <code>H3</code> tính <b>cước trung bình</b> của các chuyến thuộc <b>tuyến ở ô H1</b> và có <b>trọng lượng từ mức ở ô H2</b> trở lên.',
          data: [
            ['Chuyến', 'Tuyến', 'Trọng lượng (tấn)', 'Cước (đ)', '', '', 'Tuyến', 'HCM - HN'],
            ['V01', 'HCM - HN', 5, 18000000, '', '', 'Từ (tấn)', 8],
            ['V02', 'HCM - HN', 10, 32000000, '', '', 'Cước TB'],
            ['V03', 'HCM - ĐN', 8, 16500000],
            ['V04', 'HCM - HN', 15, 41000000],
            ['V05', 'HCM - ĐN', 3, 7200000],
            ['V06', 'HCM - HN', 8, 27500000],
            ['V07', 'HCM - HN', 2, 9000000],
            ['V08', 'HCM - ĐN', 12, 23800000]
          ],
          answers: [{ cell: 'H3', solution: '=AVERAGEIFS(D2:D9,B2:B9,H1,C2:C9,">="&H2)' }],
          fmt: { D: 'int', H: 'int' },
          mustUse: ['AVERAGEIFS'],
          hint: 'Vùng tính trung bình (Cước) đứng đầu. Điều kiện thứ hai nối dấu so sánh với ô H2 bằng &amp;: <code>=AVERAGEIFS(D2:D9,B2:B9,H1,C2:C9,"&gt;="&amp;H2)</code>.',
          explain: 'Tuyến HCM - HN có 3 chuyến từ 8 tấn (V02, V04, V06), cước trung bình 33,5 triệu. Dùng số này để báo giá cho khách hàng đặt xe lớn.'
        }
      ]
    },

    /* ---------------- Bài 5 ---------------- */
    {
      id: 'maxifs',
      title: 'MAXIFS và MINIFS: lớn nhất, nhỏ nhất theo điều kiện',
      minutes: 10,
      funcs: ['MAXIFS', 'MINIFS'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Phòng kinh doanh muốn biết <b>đơn lớn nhất mà khách Hoà Phát từng đặt</b>. Hàm MAX thường chỉ cho đơn lớn nhất của <b>tất cả</b> khách, có thể là của khách khác.</p><p><b>MAXIFS</b> chỉ xét các dòng của Hoà Phát rồi tìm số lớn nhất. <b>MINIFS</b> làm điều ngược lại: tìm số nhỏ nhất.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> giống <b>tìm bạn cao điểm nhất riêng lớp 10A</b>. Bạn chỉ nhìn bài của lớp 10A, bài lớp khác dù điểm cao hơn cũng không tính.' },
        { t: 'h', text: 'Công thức MAXIFS gồm 3 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Mã đơn', 'Khách hàng', 'Giá trị', '', 'Đơn lớn nhất Hoà Phát'],
            ['DH01', 'Hoà Phát', 85000000],
            ['DH02', 'Vinamilk', 150000000],
            ['DH03', 'Hoà Phát', 120000000],
            ['DH04', 'Thiên Long', 18000000],
            ['DH05', 'Hoà Phát', 35000000]
          ],
          fmt: { C: 'int', E: 'int' },
          cell: 'E2',
          formula: '=MAXIFS(C2:C6,B2:B6,"Hoà Phát")',
          parts: [
            { label: 'Tìm lớn nhất trong vùng nào', desc: 'Cột số cần so sánh: Giá trị. Phần này <b>đứng đầu</b>, giống SUMIFS.' },
            { label: 'Xét vùng nào', desc: 'Cột kiểm tra điều kiện: Khách hàng.' },
            { label: 'Điều kiện là gì', desc: 'Chỉ xét các dòng của <b>Hoà Phát</b>. Các ô tô màu là những dòng khớp.', range: ['B2', 'B4', 'B6'] }
          ],
          note: 'Muốn thêm điều kiện, viết thêm cặp (xét vùng nào, điều kiện gì) ở cuối, như SUMIFS.'
        },
        { t: 'h', text: 'Excel tìm như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Mã đơn', 'Khách hàng', 'Giá trị', '', 'Đơn lớn nhất Hoà Phát'],
            ['DH01', 'Hoà Phát', 85000000],
            ['DH02', 'Vinamilk', 150000000],
            ['DH03', 'Hoà Phát', 120000000],
            ['DH04', 'Thiên Long', 18000000],
            ['DH05', 'Hoà Phát', 35000000]
          ],
          fmt: { C: 'int', E: 'int' },
          cell: 'E2',
          formula: '=MAXIFS(C2:C6,B2:B6,"Hoà Phát")',
          steps: [
            { html: 'Excel xét cột <b>B</b>, chỉ lấy dòng của <b>Hoà Phát</b>, rồi so sánh số ở cột <b>C</b>. Chưa có số lớn nhất nào.', hl: [['C2:C6', 0], ['B2:B6', 1]], select: 'B2' },
            { html: 'Dòng 2: Hoà Phát, đơn 85 triệu. Lớn nhất tạm thời: <b>85 triệu</b>.', hl: [['B2', 1], ['C2', 1]], select: 'C2' },
            { html: 'Dòng 3: đơn 150 triệu lớn hơn, nhưng là của Vinamilk. <b>Bỏ qua</b>. Lớn nhất vẫn <b>85 triệu</b>.', hl: [['B2', 1], ['C2', 1], ['B3', 4]], select: 'B3' },
            { html: 'Dòng 4: Hoà Phát, 120 triệu lớn hơn 85 triệu. Lớn nhất mới: <b>120 triệu</b>.', hl: [['B2', 1], ['B4', 1], ['C4', 1]], select: 'C4' },
            { html: 'Dòng 5: Thiên Long, bỏ qua. Dòng 6: Hoà Phát, 35 triệu nhỏ hơn 120 triệu nên giữ nguyên <b>120 triệu</b>.', hl: [['B2', 1], ['B4', 1], ['C4', 1], ['B5', 4], ['B6', 1]], select: 'C6' },
            { html: 'Kết quả <b>120.000.000</b> hiện ở ô <b>E2</b>. Nếu dùng MAX thường, bạn sẽ nhận nhầm 150 triệu của Vinamilk.', hl: [['C4', 1], ['E2', 2]], select: 'E2' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          items: [
            'Bấm ô <b>E2</b>, gõ <code>=MAXIFS(</code>. Nếu dùng menu: <b>Formulas › More Functions › Statistical</b>.',
            'Chọn vùng số <b>C2:C6</b> trước, gõ dấu phẩy.',
            'Chọn cột Khách hàng <b>B2:B6</b>, dấu phẩy, gõ <code>"Hoà Phát"</code>, đóng <code>)</code> rồi nhấn <kbd>Enter</kbd>.'
          ]
        },
        { t: 'h', text: 'MINIFS: nhỏ nhất theo điều kiện' },
        { t: 'p', html: 'MINIFS viết y hệt MAXIFS, chỉ đổi tên hàm. Ví dụ đơn nhỏ nhất của Hoà Phát: <code>=MINIFS(C2:C9,B2:B9,"Hoà Phát")</code>.' },
        {
          t: 'example',
          title: 'Đơn hàng lớn nhất và nhỏ nhất theo khách hàng',
          data: [
            ['Mã đơn', 'Khách hàng', 'Giá trị', '', 'Chỉ tiêu', 'Kết quả'],
            ['DH01', 'Hoà Phát', 85000000, '', 'Đơn lớn nhất của Hoà Phát', '=MAXIFS(C2:C9,B2:B9,"Hoà Phát")'],
            ['DH02', 'Vinamilk', 42000000, '', 'Đơn nhỏ nhất của Hoà Phát', '=MINIFS(C2:C9,B2:B9,"Hoà Phát")'],
            ['DH03', 'Hoà Phát', 120000000, '', 'Đơn lớn nhất của Vinamilk', '=MAXIFS(C2:C9,B2:B9,"Vinamilk")'],
            ['DH04', 'Thiên Long', 18000000],
            ['DH05', 'Vinamilk', 67000000],
            ['DH06', 'Hoà Phát', 35000000],
            ['DH07', 'Thiên Long', 26000000],
            ['DH08', 'Vinamilk', 51000000]
          ],
          fmt: { C: 'int', F: 'int' },
          note: 'Hoà Phát có 3 đơn: 85, 120 và 35 triệu. Đơn lớn nhất 120 triệu, nhỏ nhất 35 triệu.'
        },
        { t: 'tip', html: 'MAXIFS và MINIFS cũng dùng được với cột ngày, vì ngày bản chất là số. <code>=MAXIFS(NgàyGiao,Tuyến,"HN - HP")</code> cho ngày giao gần nhất của tuyến đó (nhớ định dạng ô kết quả là ngày).' },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Hiện tượng', 'Nguyên nhân', 'Cách sửa'],
          rows: [
            ['Kết quả bằng 0', 'Không dòng nào thoả điều kiện (sai chính tả, thừa dấu cách). MAXIFS trả về 0 chứ không báo lỗi', 'Kiểm tra lại chữ trong điều kiện'],
            ['Ra tên khách hoặc 0 lạ', 'Đặt vùng số ở cuối như SUMIF: <code>=MAXIFS(B2:B9,"Hoà Phát",C2:C9)</code>', 'Vùng số lên đầu: <code>=MAXIFS(C2:C9,B2:B9,"Hoà Phát")</code>'],
            ['Báo <code>#NAME?</code>', 'Excel 2016 trở về trước chưa có MAXIFS, MINIFS', 'Dùng Excel 2019 hoặc Microsoft 365']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Công thức nào tìm đơn hàng nhỏ nhất của khách hàng ghi ở ô F1 (cột B là Khách hàng, cột C là Giá trị)?',
          options: ['=MINIFS(B2:B20,C2:C20,F1)', '=MIN(C2:C20,B2:B20,F1)', '=MINIFS(C2:C20,B2:B20,F1)', '=MINIFS(F1,B2:B20,C2:C20)'],
          answer: 2,
          explain: 'MINIFS: vùng cần tìm nhỏ nhất (C) đứng đầu, sau đó là vùng điều kiện (B) và điều kiện (F1).'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'MAXIFS trả về 0 trong khi bạn chắc chắn có dữ liệu. Nguyên nhân có khả năng nhất?',
          options: ['Điều kiện gõ sai nên không dòng nào khớp', 'Excel bị lỗi', 'Vùng dữ liệu có số âm', 'Phải dùng MAX thay thế'],
          answer: 0,
          explain: 'MAXIFS trả về 0 khi không có dòng nào thoả điều kiện, thường do sai chính tả hoặc thừa dấu cách.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Làm bảng biên độ đơn hàng theo khách. Ở <code>G2</code> tìm giá trị <b>đơn lớn nhất</b> của khách ở <code>F2</code>, ở <code>H2</code> tìm giá trị <b>đơn nhỏ nhất</b>. Sao chép cả hai xuống đến hàng 4.',
          data: [
            ['Mã đơn', 'Khách hàng', 'Giá trị', '', '', 'Khách hàng', 'Lớn nhất', 'Nhỏ nhất'],
            ['DH301', 'Minh Long', 45000000, '', '', 'Minh Long'],
            ['DH302', 'Đại Phát', 120000000, '', '', 'Đại Phát'],
            ['DH303', 'An Khang', 32000000, '', '', 'An Khang'],
            ['DH304', 'Minh Long', 78000000],
            ['DH305', 'An Khang', 56000000],
            ['DH306', 'Đại Phát', 64000000],
            ['DH307', 'Minh Long', 21000000],
            ['DH308', 'An Khang', 89000000],
            ['DH309', 'Đại Phát', 97000000]
          ],
          fill: [
            { range: 'G2:G4', solution: '=MAXIFS($C$2:$C$10,$B$2:$B$10,F2)' },
            { range: 'H2:H4', solution: '=MINIFS($C$2:$C$10,$B$2:$B$10,F2)' }
          ],
          fmt: { C: 'int', G: 'int', H: 'int' },
          hint: 'Vùng số đứng đầu, khoá $ hai vùng dữ liệu. G2: <code>=MAXIFS($C$2:$C$10,$B$2:$B$10,F2)</code>. H2: <code>=MINIFS($C$2:$C$10,$B$2:$B$10,F2)</code>. Ở H2 vẫn lấy tên ở cột F, nên viết F2 chứ không phải G2.',
          explain: 'Bảng này cho sếp thấy ngay biên độ giá trị đơn của từng khách: Đại Phát đặt đơn lớn và đều, Minh Long dao động từ 21 đến 78 triệu.'
        },
        {
          id: 'ex2',
          task: 'Bảng báo giá của các nhà cung cấp. Ở <code>G2</code> tìm <b>giá thấp nhất</b> được báo cho <b>mặt hàng ở ô G1</b>. Ở <code>G3</code> tìm giá cao nhất của mặt hàng đó.',
          data: [
            ['Nhà cung cấp', 'Mặt hàng', 'Đơn giá (đ)', '', '', 'Mặt hàng', 'Giấy A4'],
            ['Hồng Hà', 'Giấy A4', 68000, '', '', 'Giá thấp nhất'],
            ['Thiên Long', 'Bút bi', 4500, '', '', 'Giá cao nhất'],
            ['Double A VN', 'Giấy A4', 72000],
            ['Hồng Hà', 'Bút bi', 4200],
            ['Văn phòng phẩm Phú Thịnh', 'Giấy A4', 65500],
            ['Thiên Long', 'Kẹp giấy', 12000],
            ['Phú Thịnh', 'Bút bi', 3900],
            ['Hải Tiến', 'Giấy A4', 69000]
          ],
          answers: [
            { cell: 'G2', solution: '=MINIFS(C2:C9,B2:B9,G1)' },
            { cell: 'G3', solution: '=MAXIFS(C2:C9,B2:B9,G1)' }
          ],
          fmt: { C: 'int', G: 'int' },
          hint: 'Tìm trong cột Đơn giá, xét cột Mặt hàng, điều kiện là ô G1. G2: <code>=MINIFS(C2:C9,B2:B9,G1)</code>. G3: <code>=MAXIFS(C2:C9,B2:B9,G1)</code>.',
          explain: 'Giấy A4 có giá thấp nhất 65.500đ. Bút bi 3.900đ rẻ hơn nhưng không được tính vì khác mặt hàng. Muốn biết tên nhà cung cấp rẻ nhất, bạn sẽ học hàm tra cứu ở phần sau.'
        },
        {
          id: 'ex3',
          task: 'Nhật ký giao hàng. Ở <code>H3</code> tìm <b>số km dài nhất</b> mà <b>tài xế ở ô H1</b> chạy trong các chuyến có <b>trạng thái ở ô H2</b>. Ở <code>H4</code> tìm số km ngắn nhất với cùng điều kiện.',
          data: [
            ['Chuyến', 'Tài xế', 'Trạng thái', 'Số km', '', '', 'Tài xế', 'Tuấn'],
            ['T01', 'Tuấn', 'Hoàn thành', 120, '', '', 'Trạng thái', 'Hoàn thành'],
            ['T02', 'Hải', 'Hoàn thành', 340, '', '', 'Km dài nhất'],
            ['T03', 'Tuấn', 'Huỷ', 560, '', '', 'Km ngắn nhất'],
            ['T04', 'Tuấn', 'Hoàn thành', 285],
            ['T05', 'Long', 'Hoàn thành', 410],
            ['T06', 'Tuấn', 'Hoàn thành', 75],
            ['T07', 'Hải', 'Huỷ', 150],
            ['T08', 'Tuấn', 'Hoàn thành', 230]
          ],
          answers: [
            { cell: 'H3', solution: '=MAXIFS(D2:D9,B2:B9,H1,C2:C9,H2)' },
            { cell: 'H4', solution: '=MINIFS(D2:D9,B2:B9,H1,C2:C9,H2)' }
          ],
          hint: 'Vùng Số km đứng đầu, sau đó hai cặp điều kiện: <code>=MAXIFS(D2:D9,B2:B9,H1,C2:C9,H2)</code>. H4 thay MAXIFS bằng MINIFS.',
          explain: 'Chuyến T03 dài 560 km nhưng bị huỷ nên không qua được điều kiện thứ hai. Chuyến dài nhất đã hoàn thành của Tuấn là 285 km, ngắn nhất là 75 km.'
        }
      ]
    },

    /* ---------------- Bài 6 ---------------- */
    {
      id: 'dieu-kien-nang-cao',
      title: 'Điều kiện nâng cao và báo cáo tổng hợp',
      minutes: 16,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Mã hàng của công ty có dạng <b>LAP-001, LAP-002, MIN-002…</b>. Sếp cần tổng doanh thu của cả <b>nhóm Laptop</b> (mọi mã bắt đầu bằng LAP), doanh thu <b>riêng tháng 3</b>, và một bảng tổng hợp <b>nhân viên × khu vực</b>.</p><p>Không cần hàm mới. Chỉ cần viết điều kiện khéo hơn: dùng <b>ký tự đại diện</b>, điều kiện theo <b>ngày</b>, và <b>tham chiếu hỗn hợp</b> để một công thức điền cả bảng.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> dấu <code>*</code> giống chỗ trống <b>"điền gì cũng được"</b>. Điều kiện <code>"LAP*"</code> đọc là: bắt đầu bằng LAP, phía sau là gì cũng được.' },
        { t: 'h', text: 'Ký tự đại diện * và ?' },
        {
          t: 'table',
          head: ['Điều kiện', 'Ý nghĩa', 'Khớp với'],
          rows: [
            ['"Hoà*"', 'Bắt đầu bằng "Hoà"', 'Hoà Phát, Hoà Bình'],
            ['"*Long"', 'Kết thúc bằng "Long"', 'Thiên Long, Minh Long'],
            ['"*nhựa*"', 'Có chứa chữ "nhựa"', 'Ống nhựa PVC, Ghế nhựa'],
            ['"SP??"', 'SP và đúng 2 ký tự bất kỳ', 'SP01, SP12 (không khớp SP101)'],
            ['"*"&amp;F1&amp;"*"', 'Chứa nội dung ở ô F1', 'Dùng làm ô tìm kiếm']
          ]
        },
        { t: 'p', html: 'Dấu <code>*</code> thay cho <b>bất kỳ số ký tự nào</b> (kể cả không có ký tự nào). Dấu <code>?</code> thay cho <b>đúng một ký tự</b>. Ký tự đại diện chỉ dùng với dữ liệu dạng chữ.' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu: SUMIF với ký tự đại diện',
          data: [
            ['Mã hàng', 'Khách hàng', 'Doanh thu', '', 'Doanh thu nhóm LAP'],
            ['LAP-001', 'Công ty Hoà Phát', 42000000],
            ['MIN-002', 'Siêu thị Minh Long', 8500000],
            ['LAP-003', 'Công ty Đại Phát', 38000000],
            ['MAN-001', 'Siêu thị Minh Long', 12000000],
            ['LAP-002', 'Cửa hàng An Khang', 45000000]
          ],
          fmt: { C: 'int', E: 'int' },
          cell: 'E2',
          formula: '=SUMIF(A2:A6,"LAP*",C2:C6)',
          parts: [
            { label: 'Xét vùng nào', desc: 'Cột Mã hàng A2:A6.' },
            { label: 'Điều kiện là gì', desc: 'Mã <b>bắt đầu bằng LAP</b>, phía sau là gì cũng được. Các ô tô màu là những mã khớp.', range: ['A2', 'A4', 'A6'] },
            { label: 'Cộng vùng nào', desc: 'Cột Doanh thu C2:C6.' }
          ]
        },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem Excel so từng mã với "LAP*"',
          data: [
            ['Mã hàng', 'Khách hàng', 'Doanh thu', '', 'Doanh thu nhóm LAP'],
            ['LAP-001', 'Công ty Hoà Phát', 42000000],
            ['MIN-002', 'Siêu thị Minh Long', 8500000],
            ['LAP-003', 'Công ty Đại Phát', 38000000],
            ['MAN-001', 'Siêu thị Minh Long', 12000000],
            ['LAP-002', 'Cửa hàng An Khang', 45000000]
          ],
          fmt: { C: 'int', E: 'int' },
          cell: 'E2',
          formula: '=SUMIF(A2:A6,"LAP*",C2:C6)',
          steps: [
            { html: 'Điều kiện <b>"LAP*"</b>: ba chữ đầu phải là LAP. Tổng ban đầu: <b>0</b>.', hl: [['A2:A6', 0], ['C2:C6', 2]], select: 'A2' },
            { html: '<b>LAP</b>-001 bắt đầu bằng LAP: khớp. Cộng 42 triệu. Tổng: <b>42 triệu</b>.', hl: [['A2', 1], ['C2', 1]], select: 'A2' },
            { html: '<b>MIN</b>-002 bắt đầu bằng MIN: không khớp, bỏ qua. Tổng vẫn <b>42 triệu</b>.', hl: [['A2', 1], ['C2', 1], ['A3', 4]], select: 'A3' },
            { html: '<b>LAP</b>-003: khớp. Cộng 38 triệu. Tổng: <b>80 triệu</b>.', hl: [['A2', 1], ['C2', 1], ['A4', 1], ['C4', 1]], select: 'A4' },
            { html: 'MAN-001: bỏ qua. <b>LAP</b>-002: khớp, cộng 45 triệu. Tổng: <b>125 triệu</b>.', hl: [['A2', 1], ['C2', 1], ['A4', 1], ['C4', 1], ['A5', 4], ['A6', 1], ['C6', 1]], select: 'A6' },
            { html: 'Kết quả <b>125.000.000</b> hiện ở ô <b>E2</b>. Thêm mã LAP-005 vào bảng, tổng tự cộng thêm.', hl: [['C2', 1], ['C4', 1], ['C6', 1], ['E2', 2]], select: 'E2' }
          ]
        },
        {
          t: 'example',
          title: 'Thêm ví dụ: nhóm mã hàng, tên khách, độ dài mã',
          data: [
            ['Mã hàng', 'Khách hàng', 'Doanh thu', '', 'Chỉ tiêu', 'Kết quả'],
            ['LAP-001', 'Công ty Hoà Phát', 42000000, '', 'Doanh thu nhóm LAP', '=SUMIF(A2:A9,"LAP*",C2:C9)'],
            ['MIN-002', 'Siêu thị Minh Long', 8500000, '', 'Số đơn của các "Công ty"', '=COUNTIF(B2:B9,"Công ty*")'],
            ['LAP-003', 'Công ty Đại Phát', 38000000, '', 'Mã có đúng 3 số', '=COUNTIF(A2:A9,"???-???")'],
            ['MAN-001', 'Siêu thị Minh Long', 12000000],
            ['LAP-002', 'Cửa hàng An Khang', 45000000],
            ['MIN-01', 'Công ty Hoà Phát', 6000000],
            ['MAN-003', 'Công ty Đại Phát', 15500000],
            ['LAP-004', 'Cửa hàng An Khang', 40000000]
          ],
          fmt: { C: 'int', F: 'int' },
          note: 'Nhóm LAP có 4 đơn, tổng 165 triệu. Mã MIN-01 chỉ có 2 số nên không khớp "???-???".'
        },
        { t: 'h', text: 'Điều kiện lấy từ ô và điều kiện theo ngày' },
        { t: 'p', html: 'Nhắc lại: phép so sánh nằm trong ngoặc kép, nối với ô hoặc hàm bằng <code>&amp;</code>. Với ngày tháng, cách an toàn nhất là gõ ngày vào ô (ví dụ <code>E1</code>) rồi viết <code>"&gt;="&amp;E1</code>, hoặc dùng hàm DATE: <code>"&gt;="&amp;DATE(2024,3,1)</code>.' },
        { t: 'p', html: 'Muốn lấy một <b>khoảng</b> ngày thì dùng SUMIFS với <b>hai điều kiện trên cùng cột ngày</b>: từ ngày đầu, và đến ngày cuối.' },
        {
          t: 'example',
          title: 'Doanh thu tháng 3/2024 (từ 01/03 đến hết 31/03)',
          data: [
            ['Ngày', 'Doanh thu', '', 'Từ ngày', '01/03/2024'],
            ['26/02/2024', 15000000, '', 'Đến ngày', '31/03/2024'],
            ['04/03/2024', 22000000, '', 'Theo ô', '=SUMIFS(B2:B8,A2:A8,">="&E1,A2:A8,"<="&E2)'],
            ['12/03/2024', 18000000, '', 'Theo DATE', '=SUMIFS(B2:B8,A2:A8,">="&DATE(2024,3,1),A2:A8,"<"&DATE(2024,4,1))'],
            ['20/03/2024', 30000000],
            ['31/03/2024', 12000000],
            ['02/04/2024', 25000000],
            ['15/04/2024', 9000000]
          ],
          fmt: { A: 'date', B: 'int', E: 'date' },
          note: 'Cả hai cách đều ra 82 triệu. Cách dùng <code>"&lt;"&amp;DATE(2024,4,1)</code> (nhỏ hơn ngày đầu tháng sau) không cần biết tháng có 30 hay 31 ngày.'
        },
        { t: 'warn', html: 'Không viết <code>"&gt;=01/03/2024"</code> trực tiếp trong điều kiện. Tuỳ cài đặt máy tính, Excel có thể hiểu là ngày 3 tháng 1 (kiểu Mỹ). Dùng ô chứa ngày hoặc hàm DATE để chắc chắn.' },
        { t: 'h', text: 'Báo cáo chéo: một công thức cho cả bảng' },
        { t: 'p', html: 'Báo cáo chéo có tên nhân viên ở cột E, khu vực ở hàng 1. Mỗi ô là một SUMIFS với hai điều kiện. Điểm mấu chốt là dấu <code>$</code> đặt đúng chỗ, để kéo sang phải và kéo xuống đều đúng.' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem công thức ở ô F2',
          data: [
            ['Nhân viên', 'Khu vực', 'Doanh thu', '', 'NV \\ KV', 'Bắc', 'Nam'],
            ['Lan', 'Bắc', 45, '', 'Lan', '', '=SUMIFS($C$2:$C$7,$A$2:$A$7,$E2,$B$2:$B$7,G$1)'],
            ['Minh', 'Nam', 62, '', 'Minh', '=SUMIFS($C$2:$C$7,$A$2:$A$7,$E3,$B$2:$B$7,F$1)', '=SUMIFS($C$2:$C$7,$A$2:$A$7,$E3,$B$2:$B$7,G$1)'],
            ['Lan', 'Nam', 38],
            ['Minh', 'Bắc', 27],
            ['Lan', 'Bắc', 51],
            ['Minh', 'Nam', 33]
          ],
          cell: 'F2',
          formula: '=SUMIFS($C$2:$C$7,$A$2:$A$7,$E2,$B$2:$B$7,F$1)',
          parts: [
            { label: 'Cộng vùng nào', desc: 'Cột Doanh thu, khoá hoàn toàn <code>$C$2:$C$7</code> để kéo đi đâu cũng không trượt.' },
            { label: 'Xét vùng thứ nhất', desc: 'Cột Nhân viên, cũng khoá hoàn toàn.' },
            { label: 'Nhân viên là ai', desc: '<code>$E2</code>: khoá <b>cột E</b>, để hàng tự do. Kéo xuống thành $E3 (Minh), kéo sang phải vẫn là cột E.' },
            { label: 'Xét vùng thứ hai', desc: 'Cột Khu vực, khoá hoàn toàn.' },
            { label: 'Khu vực nào', desc: '<code>F$1</code>: khoá <b>hàng 1</b>, để cột tự do. Kéo sang phải thành G$1 (Nam), kéo xuống vẫn là hàng 1.' }
          ],
          note: 'Lan ở Bắc: 45 + 51 = 96. Bấm vào các ô G2, F3, G3 để thấy công thức đã được kéo sang.'
        },
        { t: 'tip', html: 'Đây chính là cách làm "Pivot bằng công thức". Ưu điểm so với PivotTable: báo cáo tự cập nhật ngay khi dữ liệu thay đổi và giữ nguyên mẫu biểu công ty.' },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Viết sai', 'Cách sửa'],
          rows: [
            ['Để tên ô trong ngoặc kép cùng dấu *', '"*G1*"', 'Tìm đúng chữ "G1". Viết <code>"*"&amp;G1&amp;"*"</code>'],
            ['Gõ ngày thẳng vào điều kiện', '"&gt;=01/03/2024"', 'Dùng ô chứa ngày hoặc <code>"&gt;="&amp;DATE(2024,3,1)</code>'],
            ['Dùng &gt; thay cho &gt;= với ngày đầu', '"&gt;"&amp;E1', 'Mất ngày đầu kỳ. Dùng <code>"&gt;="&amp;E1</code>'],
            ['Đặt $ sai trong báo cáo chéo', '$E$2 và $F$1', 'Kéo đi đâu cũng ra cùng một số. Dùng <code>$E2</code> và <code>F$1</code>'],
            ['Dùng * với cột số', '"1*" cho cột số lượng', 'Ký tự đại diện chỉ áp dụng cho chữ. Với số hãy dùng &gt;, &lt;']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Điều kiện "SP?" khớp với mã nào?',
          options: ['SP', 'SP1', 'SP12', 'ASP1'],
          answer: 1,
          explain: 'Dấu ? thay cho đúng một ký tự, nên chỉ SP1 khớp.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Ô G1 chứa từ khoá "nhựa". Công thức nào đếm các tên hàng ở A2:A50 có chứa từ khoá đó?',
          options: ['=COUNTIF(A2:A50,"*G1*")', '=COUNTIF(A2:A50,"*"&G1&"*")', '=COUNTIF(A2:A50,*G1*)', '=COUNTIF(A2:A50,"*"G1"*")'],
          answer: 1,
          explain: 'Dấu * là chữ nên để trong ngoặc kép, rồi nối với ô G1 bằng &: "*"&G1&"*".'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Trong báo cáo chéo, tên nhân viên ở cột E, tên khu vực ở hàng 1. Điều kiện nhân viên và khu vực trong ô F2 nên viết thế nào để kéo được cho cả bảng?',
          options: ['E2 và F1', '$E$2 và $F$1', '$E2 và F$1', 'E$2 và $F1'],
          answer: 2,
          explain: 'Nhân viên luôn ở cột E nên khoá cột ($E2). Khu vực luôn ở hàng 1 nên khoá hàng (F$1).'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Danh mục hàng tồn kho. Ở <code>G2</code> tính <b>tổng tồn</b> của các mặt hàng có tên <b>chứa từ khoá ở ô G1</b>. Ở <code>G3</code> đếm số mã hàng thuộc <b>nhóm VP</b> (mã bắt đầu bằng "VP").',
          data: [
            ['Mã hàng', 'Tên hàng', 'Tồn kho', '', '', 'Từ khoá', 'nhựa'],
            ['VP-01', 'Bìa nhựa A4', 350, '', '', 'Tổng tồn chứa từ khoá'],
            ['VP-02', 'Giấy A4 Double A', 120, '', '', 'Số mã nhóm VP'],
            ['GD-01', 'Ghế nhựa Duy Tân', 80],
            ['GD-02', 'Bàn gỗ gấp', 25],
            ['VP-03', 'Kẹp nhựa văn phòng', 500],
            ['XD-01', 'Ống nhựa PVC 21', 260],
            ['XD-02', 'Xi măng Hà Tiên', 140],
            ['VP-04', 'Bút bi Thiên Long', 900]
          ],
          answers: [
            { cell: 'G2', solution: '=SUMIF(B2:B9,"*"&G1&"*",C2:C9)' },
            { cell: 'G3', solution: '=COUNTIF(A2:A9,"VP*")' }
          ],
          hint: 'G2: bọc ô G1 bằng hai dấu * trong ngoặc kép, nối bằng &amp;: <code>=SUMIF(B2:B9,"*"&amp;G1&amp;"*",C2:C9)</code>. G3: bắt đầu bằng VP: <code>=COUNTIF(A2:A9,"VP*")</code>.',
          explain: 'Có 4 mặt hàng chứa chữ "nhựa", tổng tồn 1.190. Đổi từ khoá thành "A4" để xem ngay tồn kho các mặt hàng khổ A4.'
        },
        {
          id: 'ex2',
          task: 'Nhật ký bán hàng. Ở <code>G3</code> tính <b>tổng doanh thu từ ngày ở ô G1 đến ngày ở ô G2</b> (tính cả hai ngày). Ở <code>G4</code> đếm số đơn trong khoảng đó.',
          data: [
            ['Ngày', 'Mã đơn', 'Doanh thu', '', '', 'Từ ngày', '05/06/2024'],
            ['01/06/2024', 'DH01', 12000000, '', '', 'Đến ngày', '10/06/2024'],
            ['04/06/2024', 'DH02', 8500000, '', '', 'Doanh thu'],
            ['05/06/2024', 'DH03', 15000000, '', '', 'Số đơn'],
            ['07/06/2024', 'DH04', 9200000],
            ['08/06/2024', 'DH05', 21000000],
            ['10/06/2024', 'DH06', 6800000],
            ['11/06/2024', 'DH07', 13500000],
            ['14/06/2024', 'DH08', 17000000],
            ['15/06/2024', 'DH09', 11000000]
          ],
          answers: [
            { cell: 'G3', solution: '=SUMIFS(C2:C10,A2:A10,">="&G1,A2:A10,"<="&G2)' },
            { cell: 'G4', solution: '=COUNTIFS(A2:A10,">="&G1,A2:A10,"<="&G2)' }
          ],
          fmt: { A: 'date', C: 'int', G: 'int' },
          hint: 'Hai điều kiện trên cùng cột ngày A: từ G1 trở đi, và đến G2. <code>=SUMIFS(C2:C10,A2:A10,"&gt;="&amp;G1,A2:A10,"&lt;="&amp;G2)</code>. G4 dùng COUNTIFS với đúng hai cặp điều kiện đó.',
          explain: 'Từ 05/06 đến 10/06 có 4 đơn (DH03 đến DH06), tổng 52 triệu. Dùng dấu &gt;= và &lt;= để tính cả ngày đầu và ngày cuối.'
        },
        {
          id: 'ex3',
          task: 'Làm <b>báo cáo chéo</b> sản lượng giao (tấn) theo nhà xe × tháng. Viết <b>một</b> công thức SUMIFS ở <code>F2</code> dùng tham chiếu hỗn hợp, rồi sao chép cho cả vùng <code>F2:H4</code>.',
          data: [
            ['Nhà xe', 'Tháng', 'Sản lượng', '', 'Nhà xe \\ Tháng', 'T1', 'T2', 'T3'],
            ['Phương Nam', 'T1', 120, '', 'Phương Nam'],
            ['Bắc Việt', 'T1', 95, '', 'Bắc Việt'],
            ['Sao Mai', 'T2', 80, '', 'Sao Mai'],
            ['Phương Nam', 'T2', 140],
            ['Bắc Việt', 'T3', 110],
            ['Phương Nam', 'T1', 60],
            ['Sao Mai', 'T3', 75],
            ['Bắc Việt', 'T2', 130],
            ['Sao Mai', 'T1', 90],
            ['Phương Nam', 'T3', 100]
          ],
          fill: { range: 'F2:H4', solution: '=SUMIFS($C$2:$C$11,$A$2:$A$11,$E2,$B$2:$B$11,F$1)' },
          mustUse: ['SUMIFS'],
          hint: 'Khoá hoàn toàn ba vùng dữ liệu. Nhà xe luôn ở cột E: <code>$E2</code>. Tháng luôn ở hàng 1: <code>F$1</code>. Công thức: <code>=SUMIFS($C$2:$C$11,$A$2:$A$11,$E2,$B$2:$B$11,F$1)</code>.',
          explain: 'Phương Nam tháng 1 có hai chuyến 120 + 60 = 180 tấn. Nếu một nhà xe không chạy tháng nào, ô đó tự ra 0. Một công thức thay cho cả một PivotTable.'
        }
      ]
    }
  ],

  /* ---------------- Bài kiểm tra Phần 4 ---------------- */
  test: {
    mcq: [
      { q: 'Công thức =COUNTIF(B2:B20,"<>Hà Nội") đếm gì?', options: ['Các ô bằng Hà Nội', 'Các ô khác Hà Nội', 'Các ô trống', 'Các ô chứa chữ Hà'], answer: 1, explain: 'Dấu <> nghĩa là khác, nên hàm đếm các ô không phải Hà Nội (kể cả ô trống).' },
      { q: 'Ô H1 chứa số 500. Điều kiện nào đúng để lấy các giá trị lớn hơn H1?', options: ['">H1"', '>H1', '">"&H1', '"&>"H1'], answer: 2, explain: 'Phép so sánh trong ngoặc kép, nối với ô bằng &: ">"&H1.' },
      { q: 'Đâu là cú pháp đúng của SUMIF?', options: ['=SUMIF(sum_range, range, criteria)', '=SUMIF(range, criteria, [sum_range])', '=SUMIF(criteria, range, sum_range)', '=SUMIF(range, sum_range, criteria)'], answer: 1, explain: 'SUMIF: xét vùng nào, điều kiện gì, rồi cộng vùng nào (tuỳ chọn).' },
      { q: 'Điểm khác biệt về thứ tự đối số giữa SUMIF và SUMIFS là gì?', options: ['Không có khác biệt', 'SUMIFS đặt vùng cần cộng ở đầu, SUMIF đặt ở cuối', 'SUMIFS đặt điều kiện ở đầu', 'SUMIF không có vùng cần cộng'], answer: 1, explain: 'SUMIFS(sum_range, criteria_range1, criteria1, …) còn SUMIF(range, criteria, sum_range).' },
      { q: 'Doanh số 4 ngày ở B2:B5 là 20, 0, 40, 0. =AVERAGEIF(B2:B5,">0") bằng bao nhiêu?', options: ['15', '30', '60', '20'], answer: 1, explain: 'Chỉ tính hai ô lớn hơn 0: (20 + 40) / 2 = 30.' },
      { q: 'COUNTIFS(B2:B50,"Hà Nội",C2:C50,"Đã giao") đếm gì?', options: ['Đơn đi Hà Nội hoặc đã giao', 'Đơn đi Hà Nội và đã giao', 'Tổng số đơn', 'Đơn không đi Hà Nội'], answer: 1, explain: 'Các điều kiện trong COUNTIFS kết hợp theo kiểu VÀ: dòng phải thoả cả hai.' },
      { q: 'Điều kiện "*Long" khớp với giá trị nào?', options: ['Long An', 'Thiên Long', 'Longvan', 'Long Biên'], answer: 1, explain: '"*Long" là kết thúc bằng Long, chỉ Thiên Long thoả.' },
      { q: 'Điều kiện "KH???" khớp với mã nào?', options: ['KH01', 'KH001', 'KH0001', 'KH'], answer: 1, explain: 'Mỗi dấu ? là đúng một ký tự, nên cần KH và đúng 3 ký tự nữa.' },
      { q: 'Công thức nào tính doanh thu tháng 5/2024 (cột A là ngày, C là doanh thu)?', options: ['=SUMIFS(C:C,A:A,">=01/05/2024")', '=SUMIFS(C:C,A:A,">="&DATE(2024,5,1),A:A,"<"&DATE(2024,6,1))', '=SUMIF(A:A,"5/2024",C:C)', '=SUMIFS(A:A,C:C,">="&DATE(2024,5,1))'], answer: 1, explain: 'Cần hai điều kiện: từ ngày 01/05 và trước ngày 01/06. Dùng DATE để Excel hiểu đúng ngày.' },
      { q: 'MAXIFS trả về gì khi không có dòng nào thoả điều kiện?', options: ['#N/A', '#DIV/0!', '0', 'Ô trống'], answer: 2, explain: 'MAXIFS và MINIFS trả về 0, còn AVERAGEIF(S) mới báo #DIV/0!.' },
      { q: 'Báo cáo chéo: ô F2 có =SUMIFS($C$2:$C$50,$A$2:$A$50,$E2,$B$2:$B$50,F$1). Sao chép sang G3, điều kiện thành gì?', options: ['$E3 và G$1', '$E2 và G$1', '$F3 và G$2', '$E3 và F$1'], answer: 0, explain: '$E2 giữ cột E, hàng đổi thành 3. F$1 giữ hàng 1, cột đổi thành G.' },
      { q: '=SUMIF(A2:A10,"Lan",C3:C11) có vấn đề gì?', options: ['Sai cú pháp, Excel báo lỗi', 'Hai vùng lệch một hàng nên cộng sai dòng', 'Thiếu dấu $', 'Không có vấn đề gì'], answer: 1, explain: 'Vùng điều kiện bắt đầu ở hàng 2 còn vùng cộng bắt đầu ở hàng 3. Excel không báo lỗi nhưng cộng nhầm dòng.' }
    ],
    practice: [
      {
        id: 't1',
        task: 'Báo cáo bán hàng. Với <b>nhân viên ở ô H1</b> và <b>khu vực ở ô H2</b>: tính tổng doanh thu ở <code>H3</code>, số đơn ở <code>H4</code>, doanh thu trung bình mỗi đơn ở <code>H5</code> và đơn lớn nhất ở <code>H6</code>.',
        data: [
          ['Mã đơn', 'Nhân viên', 'Khu vực', 'Doanh thu', '', '', 'Nhân viên', 'Tùng'],
          ['DH01', 'Tùng', 'Miền Bắc', 25000000, '', '', 'Khu vực', 'Miền Bắc'],
          ['DH02', 'Hương', 'Miền Nam', 18000000, '', '', 'Doanh thu'],
          ['DH03', 'Tùng', 'Miền Nam', 32000000, '', '', 'Số đơn'],
          ['DH04', 'Tùng', 'Miền Bắc', 41000000, '', '', 'TB mỗi đơn'],
          ['DH05', 'Ngọc', 'Miền Bắc', 15000000, '', '', 'Đơn lớn nhất'],
          ['DH06', 'Tùng', 'Miền Bắc', 12000000],
          ['DH07', 'Hương', 'Miền Bắc', 27000000],
          ['DH08', 'Tùng', 'Miền Nam', 36000000],
          ['DH09', 'Ngọc', 'Miền Nam', 22000000]
        ],
        answers: [
          { cell: 'H3', solution: '=SUMIFS(D2:D10,B2:B10,H1,C2:C10,H2)' },
          { cell: 'H4', solution: '=COUNTIFS(B2:B10,H1,C2:C10,H2)' },
          { cell: 'H5', solution: '=AVERAGEIFS(D2:D10,B2:B10,H1,C2:C10,H2)' },
          { cell: 'H6', solution: '=MAXIFS(D2:D10,B2:B10,H1,C2:C10,H2)' }
        ],
        fmt: { D: 'int', H: 'int' }
      },
      {
        id: 't2',
        task: 'Theo dõi phiếu xuất kho. Ở <code>G3</code> tính tổng số lượng xuất của các mã hàng <b>bắt đầu bằng nội dung ở ô G1</b> (ví dụ "SON" là nhóm sơn) trong các phiếu <b>từ ngày ở ô G2</b> trở đi. Ở <code>G4</code> đếm số phiếu có số lượng <b>dưới 50</b> (không xét nhóm và ngày).',
        data: [
          ['Ngày', 'Mã hàng', 'Số lượng', '', '', 'Nhóm mã', 'SON'],
          ['02/05/2024', 'SON-TRANG', 120, '', '', 'Từ ngày', '10/05/2024'],
          ['06/05/2024', 'THEP-D10', 45, '', '', 'Tổng xuất'],
          ['10/05/2024', 'SON-XAM', 80, '', '', 'Phiếu dưới 50'],
          ['12/05/2024', 'SON-TRANG', 35],
          ['15/05/2024', 'THEP-D12', 200],
          ['18/05/2024', 'SON-DO', 60],
          ['21/05/2024', 'XIMANG-PCB40', 150],
          ['25/05/2024', 'SON-XAM', 40],
          ['28/05/2024', 'THEP-D10', 90]
        ],
        answers: [
          { cell: 'G3', solution: '=SUMIFS(C2:C10,B2:B10,G1&"*",A2:A10,">="&G2)' },
          { cell: 'G4', solution: '=COUNTIF(C2:C10,"<50")' }
        ],
        fmt: { A: 'date' }
      },
      {
        id: 't3',
        task: 'Báo cáo chéo chi phí theo phòng ban × loại chi phí. Viết <b>một</b> công thức ở <code>F2</code> rồi sao chép cho cả vùng F2:G4.',
        data: [
          ['Phòng ban', 'Loại chi phí', 'Số tiền', '', 'Phòng \\ Loại', 'Công tác', 'Tiếp khách'],
          ['Kinh doanh', 'Công tác', 8500000, '', 'Kinh doanh'],
          ['Kế toán', 'Tiếp khách', 2000000, '', 'Kế toán'],
          ['Kinh doanh', 'Tiếp khách', 6200000, '', 'Kho vận'],
          ['Kho vận', 'Công tác', 4300000],
          ['Kinh doanh', 'Công tác', 5100000],
          ['Kế toán', 'Công tác', 1800000],
          ['Kho vận', 'Tiếp khách', 1500000],
          ['Kinh doanh', 'Tiếp khách', 3900000],
          ['Kho vận', 'Công tác', 2700000]
        ],
        fill: { range: 'F2:G4', solution: '=SUMIFS($C$2:$C$10,$A$2:$A$10,$E2,$B$2:$B$10,F$1)' },
        mustUse: ['SUMIFS'],
        fmt: { C: 'int', F: 'int', G: 'int' }
      }
    ]
  }
});
