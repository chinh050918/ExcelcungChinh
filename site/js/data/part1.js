ECC.addPart({
  id: 'p1',
  no: 1,
  title: 'Làm quen với Excel',
  short: 'Làm quen',
  desc: 'Giao diện, ô và địa chỉ ô, nhập liệu, viết công thức đầu tiên và hiểu tham chiếu tương đối/tuyệt đối. Đây là nền móng cho mọi phần sau.',
  lessons: [
    /* ---------------- Bài 1 ---------------- */
    {
      id: 'giao-dien',
      title: 'Giao diện Excel và địa chỉ ô',
      minutes: 10,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Ngày đầu đi làm, chị kế toán nhắn: <b>"Em mở file KhoHang.xlsx, xem giúp chị số lượng ở ô C4, rồi in đậm dòng tiêu đề nhé."</b></p><p>Màn hình Excel đầy nút và ô vuông, bạn chưa biết C4 nằm đâu, nút in đậm ở chỗ nào. Bài này giúp bạn gọi đúng tên từng phần trên màn hình và tìm ô bất kỳ trong vài giây.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> một file Excel giống một <b>cuốn sổ</b>. Cuốn sổ gọi là <b>Workbook</b> (sổ tính). Mỗi trang trong sổ là một <b>Sheet</b> (trang tính). Mỗi trang kẻ sẵn ô vuông như giấy kẻ ô, mỗi ô ghi được một thông tin.' },
        { t: 'h', text: 'Màn hình Excel gồm những phần nào?' },
        {
          t: 'excelui',
          tab: 'home',
          file: 'KhoHang.xlsx',
          groups: ['Clipboard', 'Font', 'Alignment', 'Editing'],
          data: [
            ['Mã hàng', 'Tên hàng', 'Số lượng'],
            ['SP01', 'Bút bi', 120],
            ['SP02', 'Giấy A4', 45],
            ['SP03', 'Kẹp giấy', 300]
          ],
          sel: 'B3',
          fx: 'Giấy A4',
          marks: [
            { id: 'tab.home', n: 1, text: '<b>Các tab</b>: Home, Insert, Formulas, Data… Mỗi tab là một ngăn chứa một nhóm lệnh.' },
            { id: 'home.bold', n: 2, text: '<b>Ribbon</b> (dải lệnh): hàng nút bên dưới tab. Ví dụ nút <b>B</b> để in đậm. Bấm tab khác thì Ribbon đổi sang bộ nút khác.' },
            { id: 'ui.namebox', n: 3, text: '<b>Name Box</b> (hộp tên): cho biết ô đang chọn là ô nào. Gõ địa chỉ vào đây rồi nhấn <kbd>Enter</kbd> để nhảy tới ô đó.' },
            { id: 'ui.fx', n: 4, text: '<b>Thanh công thức</b>: hiện nội dung thật của ô đang chọn. Ô có công thức thì ở đây hiện công thức.' },
            { id: 'ui.colhead', n: 5, text: '<b>Tiêu đề cột</b>: các chữ cái A, B, C… ở trên cùng. Mỗi cột là một dải ô chạy dọc.' },
            { id: 'ui.rowhead', n: 6, text: '<b>Tiêu đề hàng</b>: các số 1, 2, 3… bên trái. Mỗi hàng là một dải ô chạy ngang.' },
            { id: 'ui.cell', n: 7, text: '<b>Ô đang chọn</b>: có viền xanh đậm. Ở đây là ô <b>B3</b>, chứa chữ "Giấy A4". Chữ B và số 3 ở tiêu đề cũng được tô đậm.' },
            { id: 'ui.sheettab', n: 8, text: '<b>Tab Sheet</b>: tên trang tính. Bấm để chuyển trang, nhấp đúp để đổi tên. Nút <b>+</b> bên cạnh thêm trang mới.' },
            { id: 'ui.status', n: 9, text: '<b>Thanh trạng thái</b>: dải dưới cùng. Khi chọn nhiều ô có số, Excel hiện sẵn tổng, trung bình, số ô ở đây.' }
          ],
          caption: 'Đây là màn hình Excel 365. Excel 2016, 2019, 2021 trông gần giống hệt, các nút nằm cùng chỗ.'
        },
        { t: 'h', text: 'Địa chỉ ô: cột trước, hàng sau' },
        { t: 'p', html: 'Mỗi ô có một <b>địa chỉ</b> riêng, giống số nhà. Địa chỉ = <b>chữ của cột + số của hàng</b>. Ô ở cột B, hàng 3 có địa chỉ <code>B3</code>. Luôn viết chữ cột trước, số hàng sau.' },
        { t: 'p', html: 'Nhiều ô liền nhau gọi là một <b>vùng</b> (range). Vùng viết bằng <b>ô đầu : ô cuối</b>, ở giữa là dấu hai chấm. Ví dụ <code>A1:C4</code> là khối chữ nhật từ ô A1 đến ô C4.' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem cách đọc địa chỉ ô và vùng',
          data: [
            ['Mã hàng', 'Tên hàng', 'Số lượng'],
            ['SP01', 'Bút bi', 120],
            ['SP02', 'Giấy A4', 45],
            ['SP03', 'Kẹp giấy', 300],
            ['', 'Tổng']
          ],
          cell: 'C5',
          formula: '=C2+C3+C4',
          steps: [
            { html: 'Đây là <b>cột B</b>: mọi ô nằm dưới chữ B ở tiêu đề cột.', hl: [['B1:B5', 0]] },
            { html: 'Đây là <b>hàng 3</b>: mọi ô nằm ngang bên phải số 3.', hl: [['A3:C3', 1]] },
            { html: 'Chỗ cột B gặp hàng 3 là ô <b>B3</b>, chứa chữ "Giấy A4".', hl: [['B1:B5', 0], ['A3:C3', 1], ['B3', 2]], select: 'B3' },
            { html: 'Tương tự, số <b>300</b> nằm ở cột C, hàng 4, nên địa chỉ là <b>C4</b>.', hl: [['C4', 2]], select: 'C4' },
            { html: 'Vùng <b>A1:C4</b> là khối từ A1 đến C4: 3 cột (A, B, C) nhân 4 hàng (1 đến 4) = <b>12 ô</b>.', hl: [['A1:C4', 3]], select: 'A1' },
            { html: 'Ô <b>C5</b> chứa công thức <code>=C2+C3+C4</code>: lấy 3 ô số lượng cộng lại, ra <b>465</b>. Công thức dùng địa chỉ ô để biết lấy số ở đâu.', hl: [['C2:C4', 0], ['C5', 2]], select: 'C5' }
          ]
        },
        { t: 'tip', html: 'Bảng có hàng nghìn dòng? Bấm vào <b>Name Box</b>, gõ <code>C2500</code> rồi nhấn <kbd>Enter</kbd>, Excel nhảy thẳng tới ô đó, không cần lăn chuột.' },
        { t: 'h', text: 'Thực hành: tìm nút trên Ribbon' },
        { t: 'p', html: 'Làm theo từng bước trên cửa sổ Excel mô phỏng bên dưới. Bấm nhầm chỗ, web sẽ nhắc. Nhầm 2 lần, chỗ cần bấm sẽ được tô sáng.' },
        {
          t: 'sim', id: 'timnut',
          task: 'Yêu cầu: chọn một ô, in đậm nó, rồi tìm nút vẽ biểu đồ cột và nút lọc dữ liệu.',
          file: 'KhoHang.xlsx',
          tab: 'home',
          data: [
            ['Mã hàng', 'Tên hàng', 'Số lượng'],
            ['SP01', 'Bút bi', 120],
            ['SP02', 'Giấy A4', 45],
            ['SP03', 'Kẹp giấy', 300],
            ['SP04', 'Bìa hồ sơ', 80]
          ],
          steps: [
            { do: 'cell', text: 'Bấm vào <b>một ô bất kỳ</b> trong bảng. Để ý Name Box ở góc trái đổi theo địa chỉ ô bạn bấm.' },
            { do: 'button', target: 'home.bold', text: 'Tab <b>Home</b> đang mở. Bấm nút <b>B</b> (Bold, in đậm) trong nhóm Font.' },
            { do: 'tab', target: 'insert', text: 'Bấm tab <b>Insert</b> (Chèn) để xem bộ nút khác.' },
            { do: 'button', target: 'insert.colchart', text: 'Tìm và bấm nút <b>biểu đồ cột</b> trong nhóm Charts.' },
            { do: 'tab', target: 'data', text: 'Bấm tab <b>Data</b> (Dữ liệu).' },
            { do: 'button', target: 'data.filter', text: 'Bấm nút <b>Filter</b> (lọc).' }
          ],
          doneText: 'Bạn vừa đi qua 3 tab. Mỗi tab mở ra một bộ nút riêng trên Ribbon: Home để định dạng, Insert để chèn biểu đồ, Data để sắp xếp và lọc. Nút lọc ▾ đã hiện trên các tiêu đề cột.'
        },
        {
          t: 'table',
          head: ['Thành phần', 'Vị trí', 'Dùng để'],
          rows: [
            ['Ribbon', 'Dải menu trên cùng (Home, Insert, Formulas, Data…)', 'Chứa toàn bộ lệnh của Excel'],
            ['Name Box', 'Ô nhỏ bên trái thanh công thức', 'Hiện địa chỉ ô đang chọn, gõ địa chỉ để nhảy tới ô đó'],
            ['Thanh công thức (fx)', 'Ngay dưới Ribbon', 'Xem và sửa nội dung thật của ô (kể cả công thức)'],
            ['Tab Sheet', 'Góc dưới bên trái', 'Chuyển, thêm, đổi tên trang tính'],
            ['Thanh trạng thái', 'Dưới cùng', 'Xem nhanh Sum, Average, Count khi chọn nhiều ô']
          ]
        },
        { t: 'tip', html: 'Kéo chuột chọn vài ô có số rồi nhìn thanh trạng thái phía dưới: Excel hiện sẵn <b>Sum</b> (tổng), <b>Average</b> (trung bình) và <b>Count</b> (số ô) mà không cần viết công thức.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Ô nằm ở cột D, hàng 7 có địa chỉ là gì?',
          options: ['7D', 'D7', 'D:7', 'R7C4'],
          answer: 1,
          explain: 'Địa chỉ ô luôn viết chữ cột trước, số hàng sau: D7.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Vùng B2:D5 gồm bao nhiêu ô?',
          options: ['8 ô', '9 ô', '12 ô', '15 ô'],
          answer: 2,
          explain: 'Từ cột B đến D là 3 cột, từ hàng 2 đến 5 là 4 hàng: 3 × 4 = 12 ô.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Bạn muốn biết ô đang chọn là ô nào. Nhìn vào đâu?',
          options: ['Thanh trạng thái', 'Name Box ở góc trái thanh công thức', 'Tab Sheet', 'Tab Home'],
          answer: 1,
          explain: 'Name Box luôn hiện địa chỉ ô đang chọn, ví dụ B3. Gõ địa chỉ vào đó còn giúp nhảy tới ô.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Viết công thức đầu tiên: bấm vào ô <code>D2</code>, gõ <code>=B2+C2</code> rồi nhấn <kbd>Enter</kbd>. Kết quả là tổng số lượng hàng của cửa hàng Quận 1 trong 2 tháng.',
          data: [
            ['Cửa hàng', 'Tháng 1', 'Tháng 2', 'Tổng'],
            ['Quận 1', 150, 175],
            ['Quận 3', 98, 120]
          ],
          answers: [{ cell: 'D2', solution: '=B2+C2' }],
          hint: 'Công thức luôn bắt đầu bằng dấu <code>=</code>. Gõ đúng <code>=B2+C2</code> rồi nhấn <kbd>Enter</kbd>.',
          explain: 'Ô D2 lấy số ở B2 cộng số ở C2, ra 325. Thử sửa số ở B2: D2 tự tính lại ngay. Đó là sức mạnh của công thức.'
        }
      ]
    },

    /* ---------------- Bài 2 ---------------- */
    {
      id: 'nhap-lieu',
      title: 'Nhập dữ liệu và các kiểu dữ liệu',
      minutes: 10,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Bạn nhập bảng lương 30 nhân viên, cuối bảng dùng hàm cộng tổng. Sếp cộng lại bằng máy tính thì <b>thấy lệch 12 triệu</b>.</p><p>Nguyên nhân: có một ô lương bị Excel hiểu là <b>chữ</b>, nên không được cộng vào. Bài này giúp bạn nhận ra Excel đang hiểu ô là số, chữ hay ngày, và nhập liệu nhanh hơn.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> Excel giống một thủ kho rất cẩn thận. Thứ gì đúng là <b>số</b> thì xếp sát lề <b>phải</b> và đem đi tính được. Thứ gì là <b>chữ</b> thì xếp sát lề <b>trái</b> và chỉ để đọc. Nhìn cách căn lề là biết Excel hiểu ô đó thế nào.' },
        { t: 'h', text: 'Ba kiểu dữ liệu chính' },
        {
          t: 'table',
          head: ['Kiểu', 'Ví dụ', 'Mặc định căn', 'Ghi chú'],
          rows: [
            ['Số (Number)', '1250, 3.5, 15%', 'Phải', 'Tính toán được'],
            ['Chữ (Text)', 'Nguyễn Văn A, SP01', 'Trái', 'Không cộng trừ được'],
            ['Ngày giờ (Date)', '05/03/2024, 08:30', 'Phải', 'Bản chất là số, nên trừ hai ngày ra số ngày']
          ]
        },
        { t: 'h', text: 'Nhận ra "số giả" trên màn hình' },
        {
          t: 'excelui',
          tab: 'home',
          file: 'BangLuong.xlsx',
          groups: ['Clipboard', 'Font', 'Number'],
          data: [
            ['Mã NV', 'Họ tên', 'Lương'],
            ['NV001', 'Nguyễn Thị Mai', 9000000],
            ['NV002', 'Trần Văn Tuấn', '12000000'],
            ['NV003', 'Lê Thu Hà', 8500000]
          ],
          fmt: { C: 'int' },
          sel: 'C3',
          fx: '12000000',
          marks: [
            { id: 'ui.cell', n: 1, text: 'Ô <b>C3</b> trông giống số nhưng nằm sát lề <b>trái</b>, cũng không có dấu phẩy ngăn hàng nghìn như hai ô kia. Excel đang hiểu nó là <b>chữ</b>.' },
            { id: 'ui.fx', n: 2, text: 'Thanh công thức cho thấy nội dung thật. Số kiểu này thường do dán từ phần mềm khác, hoặc có dấu cách thừa ở đầu, cuối.' },
            { id: 'ui.status', n: 3, text: 'Chọn cả cột Lương rồi nhìn thanh trạng thái: <b>Sum</b> chỉ ra 17,500,000 vì ô chữ bị bỏ qua.' }
          ],
          caption: 'Trong Excel thật, ô số dạng chữ thường có thêm tam giác xanh nhỏ ở góc trên bên trái. Bấm vào ô, chọn biểu tượng cảnh báo, chọn Convert to Number (đổi thành số) để sửa.'
        },
        { t: 'warn', html: 'Số mà bị căn <b>trái</b> thường là Excel đang hiểu nó là chữ. Khi đó hàm SUM bỏ qua ô đó và tổng bị sai mà <b>không báo lỗi</b>.' },
        { t: 'h', text: 'Ngày tháng thực chất là số' },
        { t: 'p', html: 'Excel lưu ngày dưới dạng <b>số thứ tự</b>, đếm từ ngày 01/01/1900. Ngày 01/01/2024 thực ra là số 45292. Vì vậy lấy ngày sau trừ ngày trước sẽ ra số ngày chênh lệch.' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem Excel trừ hai ngày như thế nào',
          data: [
            ['Đơn hàng', 'Ngày đặt', 'Ngày giao', 'Số ngày'],
            ['DH001', '02/03/2024', '07/03/2024']
          ],
          fmt: { D: 'int' },
          cell: 'D2',
          formula: '=C2-B2',
          steps: [
            { html: 'Ô <b>D2</b> có công thức <code>=C2-B2</code>: ngày giao trừ ngày đặt.', hl: [['D2', 2]], select: 'D2' },
            { html: 'Excel đọc ô <b>C2</b>: ngày 07/03/2024. Bên trong, nó là số <b>45358</b>.', hl: [['C2', 0]], select: 'C2' },
            { html: 'Excel đọc ô <b>B2</b>: ngày 02/03/2024, bên trong là số <b>45353</b>.', hl: [['C2', 0], ['B2', 1]], select: 'B2' },
            { html: 'Trừ hai số: 45358 − 45353 = <b>5</b>.', hl: [['C2', 0], ['B2', 1]] },
            { html: 'Kết quả <b>5 ngày</b> hiện ở ô D2. Excel tự tính đúng cả khi qua tháng, qua năm hay năm nhuận.', hl: [['D2', 2]], select: 'D2' }
          ]
        },
        { t: 'tip', html: 'Gõ ngày nên theo đúng kiểu ngày của máy, ví dụ <code>05/03/2024</code>. Gõ xong mà ngày nằm sát lề <b>trái</b> nghĩa là Excel không nhận ra đó là ngày, phép trừ sẽ báo lỗi.' },
        { t: 'h', text: 'Phím nên biết khi nhập liệu' },
        {
          t: 'keys',
          items: [
            ['F2', 'Sửa nội dung ô đang chọn (không phải gõ lại từ đầu)'],
            ['Enter / Tab', 'Xác nhận và nhảy xuống dưới / sang phải'],
            ['Esc', 'Huỷ nội dung đang gõ dở'],
            ['Alt + Enter', 'Xuống dòng ngay trong một ô'],
            ['Ctrl + Enter', 'Nhập cùng một nội dung cho tất cả ô đang chọn'],
            ['Ctrl + ;', 'Nhập ngày hôm nay']
          ]
        },
        { t: 'tip', html: 'Muốn giữ số 0 ở đầu (số điện thoại, mã nhân viên 00125), gõ dấu nháy đơn trước: <code>\'0901234567</code>. Excel lưu dạng chữ và giữ nguyên số 0. Dấu nháy không hiện trong ô.' },
        { t: 'h', text: 'AutoFill: kéo để điền nhanh' },
        { t: 'p', html: '<b>AutoFill</b> (tự điền) giúp bạn không phải gõ từng dòng những thứ có quy luật: số thứ tự, tháng, thứ trong tuần.' },
        {
          t: 'steps',
          title: 'Điền số thứ tự 1, 2, 3… cho 100 dòng',
          items: [
            'Gõ <code>1</code> vào ô A2, gõ <code>2</code> vào ô A3.',
            'Kéo chuột chọn cả hai ô A2:A3.',
            'Rê chuột vào <b>chấm vuông nhỏ ở góc dưới bên phải</b> vùng chọn (gọi là Fill Handle) đến khi con trỏ thành <b>dấu cộng đen mảnh</b>.',
            'Giữ chuột trái và kéo xuống. Excel điền tiếp 3, 4, 5…',
            'Cách nhanh hơn: nếu cột bên cạnh đã có dữ liệu, <b>nhấp đúp</b> vào chấm vuông, Excel tự điền xuống đến hết bảng.'
          ]
        },
        { t: 'p', html: 'AutoFill cũng nhận ra chuỗi chữ: <code>Tháng 1</code> → Tháng 2, Tháng 3…; <code>Thứ 2</code> → Thứ 3, Thứ 4…; ngày <code>01/03/2024</code> → 02/03/2024, 03/03/2024…' },
        {
          t: 'quiz', id: 'q1',
          q: 'Bạn gõ mã nhân viên 00125 nhưng Excel chỉ hiện 125. Cách nhanh nhất để giữ số 0 là gì?',
          options: ['Gõ \'00125 (có dấu nháy đơn phía trước)', 'Gõ 00125 hai lần', 'Đổi font chữ', 'Gõ =00125'],
          answer: 0,
          explain: 'Dấu nháy đơn báo Excel lưu nội dung dạng chữ, nên giữ nguyên số 0 ở đầu.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Một cột số tiền bị căn lề trái và hàm SUM trả về 0. Nguyên nhân có khả năng nhất?',
          options: ['Cột quá hẹp', 'Các số đang được lưu dạng chữ (Text)', 'Chưa lưu file', 'Font chữ không hỗ trợ số'],
          answer: 1,
          explain: 'Số dạng chữ luôn căn trái theo mặc định và bị các hàm tính toán bỏ qua.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Ô B2 là 25/03/2024, ô C2 là 02/04/2024. Công thức =C2-B2 cho kết quả gì?',
          options: ['Lỗi, vì không trừ được ngày', '8', '-23', '1 tháng'],
          answer: 1,
          explain: 'Ngày là số nên trừ được. Từ 25/03 đến 02/04 là 8 ngày (tháng 3 có 31 ngày).'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tính <b>số ngày giao hàng</b> cho từng đơn ở cột D: ngày giao trừ ngày đặt. Viết công thức ở <code>D2</code>, rồi bấm nút <b>Sao chép công thức</b> để áp dụng cho D3:D5.',
          data: [
            ['Đơn hàng', 'Ngày đặt', 'Ngày giao', 'Số ngày'],
            ['DH001', '02/03/2024', '07/03/2024'],
            ['DH002', '04/03/2024', '06/03/2024'],
            ['DH003', '05/03/2024', '15/03/2024'],
            ['DH004', '28/02/2024', '04/03/2024']
          ],
          fill: { range: 'D2:D5', solution: '=C2-B2' },
          fmt: { D: 'int' },
          hint: 'Lấy ô ngày giao trừ ô ngày đặt. Ở D2 gõ <code>=C2-B2</code>.',
          explain: 'Ngày là số nên phép trừ cho ra số ngày. Đơn DH004 đi qua cuối tháng 2 năm nhuận (có ngày 29/02) nên ra 5 ngày, Excel tự tính đúng.'
        }
      ]
    },

    /* ---------------- Bài 3 ---------------- */
    {
      id: 'cong-thuc',
      title: 'Công thức và các phép toán',
      minutes: 12,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Phòng mua hàng gửi báo giá: máy in 3.500.000 đồng một chiếc, mua 2 chiếc, được chiết khấu 10%. Bạn bấm máy tính ra số tiền, gõ vào Excel. Hôm sau nhà cung cấp đổi giá, bạn lại phải bấm lại từ đầu.</p><p>Nếu viết <b>công thức</b> thay vì gõ con số, Excel tự tính lại mỗi khi giá, số lượng hay chiết khấu thay đổi.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> công thức giống một chiếc <b>máy tính bỏ túi biết nhớ</b>. Thay vì bấm 2 × 3.500.000, bạn bảo Excel "lấy số ở ô B2 nhân số ở ô C2". Số trong ô đổi thì kết quả tự đổi theo.' },
        { t: 'h', text: 'Ô hiện kết quả, thanh công thức hiện công thức' },
        {
          t: 'excelui',
          tab: 'home',
          file: 'BaoGia.xlsx',
          groups: ['Clipboard', 'Font', 'Editing'],
          data: [
            ['Mặt hàng', 'Số lượng', 'Đơn giá', 'Chiết khấu', 'Thành tiền'],
            ['Máy in', 2, 3500000, 0.1, 6300000]
          ],
          fmt: { C: 'int', D: 'pct', E: 'int' },
          sel: 'E2',
          fx: '=B2*C2*(1-D2)',
          marks: [
            { id: 'ui.cell', n: 1, text: 'Trong ô chỉ thấy <b>kết quả</b>: 6,300,000.' },
            { id: 'ui.fx', n: 2, text: 'Thanh công thức hiện <b>công thức thật</b> đứng sau con số đó. Muốn biết một ô được tính thế nào, bấm vào ô rồi nhìn lên đây.' }
          ]
        },
        { t: 'p', html: 'Mọi công thức <b>bắt đầu bằng dấu</b> <code>=</code>. Sau dấu bằng là địa chỉ ô, con số, phép toán và hàm.' },
        { t: 'h', text: 'Excel tính công thức này như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Mặt hàng', 'Số lượng', 'Đơn giá', 'Chiết khấu', 'Thành tiền'],
            ['Máy in', 2, 3500000, 0.1]
          ],
          fmt: { C: 'int', D: 'pct', E: 'int' },
          cell: 'E2',
          formula: '=B2*C2*(1-D2)',
          steps: [
            { html: 'Ô <b>E2</b> có công thức <code>=B2*C2*(1-D2)</code>. Dấu <code>*</code> là phép nhân.', hl: [['E2', 2]], select: 'E2' },
            { html: 'Phần trong <b>ngoặc</b> được tính trước. Excel đọc ô <b>D2</b>: chiết khấu 10%.', hl: [['D2', 3]], select: 'D2' },
            { html: 'Tính <code>1-D2</code> = 1 − 10% = <b>90%</b>. Nghĩa là khách chỉ trả 90% giá.', hl: [['D2', 3]] },
            { html: 'Excel đọc ô <b>B2</b> (số lượng 2) và ô <b>C2</b> (đơn giá 3,500,000), nhân lại được <b>7,000,000</b>.', hl: [['B2', 0], ['C2', 1]], select: 'C2' },
            { html: 'Nhân tiếp với 90%: 7,000,000 × 90% = <b>6,300,000</b>.', hl: [['B2', 0], ['C2', 1], ['D2', 3]] },
            { html: 'Kết quả <b>6,300,000</b> hiện ở ô E2. Đổi đơn giá ở C2 thành số khác, E2 tự tính lại.', hl: [['E2', 2]], select: 'E2' }
          ]
        },
        { t: 'h', text: 'Các phép toán' },
        {
          t: 'table',
          head: ['Phép toán', 'Ký hiệu', 'Ví dụ', 'Kết quả'],
          rows: [
            ['Cộng', '+', '=10+5', '15'],
            ['Trừ', '-', '=10-5', '5'],
            ['Nhân', '*', '=10*5', '50'],
            ['Chia', '/', '=10/5', '2'],
            ['Luỹ thừa', '^', '=2^3', '8'],
            ['Phần trăm', '%', '=200*10%', '20'],
            ['Nối chữ', '&amp;', '="Mã "&amp;"SP01"', 'Mã SP01']
          ]
        },
        { t: 'p', html: 'Trên bàn phím: dấu nhân là <kbd>Shift</kbd> + <kbd>8</kbd> (hoặc phím <kbd>*</kbd> ở bàn phím số), dấu luỹ thừa là <kbd>Shift</kbd> + <kbd>6</kbd>, dấu nối là <kbd>Shift</kbd> + <kbd>7</kbd>.' },
        { t: 'h', text: 'Thứ tự ưu tiên: giống toán ở trường' },
        { t: 'p', html: 'Excel tính <b>ngoặc ( )</b> trước, rồi đến <b>^</b>, rồi <b>* /</b>, cuối cùng <b>+ -</b>. Vì vậy <code>=2+3*4</code> ra 14 (nhân trước), còn <code>=(2+3)*4</code> ra 20 (ngoặc trước).' },
        {
          t: 'example',
          title: 'Cùng số liệu, có ngoặc và không có ngoặc cho kết quả khác nhau. Bấm vào ô E2, E3 để xem công thức',
          data: [
            ['Mặt hàng', 'Số lượng', 'Đơn giá', 'Chiết khấu', 'Thành tiền'],
            ['Có ngoặc (đúng)', 2, 3500000, 0.1, '=B2*C2*(1-D2)'],
            ['Không ngoặc (sai)', 2, 3500000, 0.1, '=B3*C3*1-D3']
          ],
          fmt: { C: 'int', D: 'pct', E: 'dec2' },
          note: 'Bỏ ngoặc thì Excel nhân B3*C3*1 trước, được 7,000,000, rồi mới trừ 0.1. Kết quả 6,999,999.90 là sai hoàn toàn.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          title: 'Gõ công thức bằng cách bấm chuột vào ô',
          items: [
            'Bấm vào ô <b>E2</b> (ô muốn hiện kết quả), gõ dấu <code>=</code>',
            '<b>Bấm chuột vào ô B2</b>. Excel tự điền chữ B2 vào công thức, ô B2 có viền màu nhấp nháy.',
            'Gõ <code>*</code>, rồi bấm chuột vào ô <b>C2</b>.',
            'Gõ tiếp <code>*(1-</code>, bấm vào ô <b>D2</b>, gõ <code>)</code>',
            'Nhấn <kbd>Enter</kbd>. Ô E2 hiện kết quả. Muốn sửa lại, bấm ô E2 rồi nhấn <kbd>F2</kbd>.'
          ]
        },
        { t: 'tip', html: 'Bấm chuột vào ô thay vì gõ địa chỉ giúp tránh gõ nhầm. Bảng tính mini trên web này cũng làm được như vậy, kéo chuột còn chọn được cả vùng.' },
        { t: 'warn', html: 'Không gõ cứng con số vào công thức khi số đó đã nằm trong ô. Viết <code>=B2*C2</code>, đừng viết <code>=2*3500000</code>. Khi dữ liệu thay đổi, công thức dùng địa chỉ ô sẽ tự cập nhật, còn số gõ cứng thì không.' },
        { t: 'h', text: 'Lỗi hay gặp khi mới viết công thức' },
        {
          t: 'table',
          head: ['Hiện tượng', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Ô hiện nguyên chữ công thức', 'Gõ <code>B2*C2</code>, quên dấu =', 'Thêm dấu <code>=</code> ở đầu'],
            ['Kết quả sai mà không báo lỗi', '<code>=B2*C2*1-D2</code> thiếu ngoặc', 'Đặt ngoặc cho phần cần tính trước: <code>(1-D2)</code>'],
            ['<code>#VALUE!</code>', '<code>=A2*B2</code> khi A2 là chữ "Máy in"', 'Chỉ tính trên các ô chứa số'],
            ['<code>#DIV/0!</code>', '<code>=B2/C2</code> khi C2 trống hoặc bằng 0', 'Kiểm tra lại ô số chia'],
            ['<code>#####</code>', 'Số quá dài so với độ rộng cột', 'Nhấp đúp vào mép phải tiêu đề cột để nới rộng']
          ]
        },
        { t: 'h', text: 'Nối chữ bằng dấu &' },
        { t: 'p', html: 'Dấu <code>&amp;</code> ghép các đoạn chữ thành một. Chữ gõ thẳng trong công thức, kể cả dấu cách, phải đặt trong <b>ngoặc kép</b>.' },
        {
          t: 'example',
          title: 'Ghép mã và tên hàng',
          data: [
            ['Mã hàng', 'Tên hàng', 'Hiển thị'],
            ['SP01', 'Giấy A4', '=A2&" - "&B2']
          ],
          note: 'Kết quả: <b>SP01 - Giấy A4</b>. Đoạn <code>" - "</code> là chữ gõ thẳng nên nằm trong ngoặc kép.'
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Công thức =10+20/5 cho kết quả bao nhiêu?',
          options: ['6', '14', '30', '10'],
          answer: 1,
          explain: 'Phép chia làm trước: 20/5 = 4, rồi 10 + 4 = 14.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Bạn gõ B2+C2 vào ô D2 và nhấn Enter, ô hiện đúng chữ "B2+C2". Vì sao?',
          options: ['Cột D quá hẹp', 'Thiếu dấu = ở đầu', 'Phải dùng dấu chấm phẩy', 'B2 trống'],
          answer: 1,
          explain: 'Không có dấu = thì Excel coi đó là chữ bình thường. Gõ lại =B2+C2.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Đơn giá ở B2, giảm giá 15% ở C2. Công thức nào tính đúng giá sau giảm?',
          options: ['=B2*1-C2', '=B2*(1-C2)', '=B2-C2', '=(B2*1)-C2'],
          answer: 1,
          explain: 'Cần tính 1 − 15% = 85% trước, nên phải có ngoặc: =B2*(1-C2).'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tính <b>Thành tiền = Số lượng × Đơn giá</b> cho cột D. Viết công thức ở <code>D2</code> rồi sao chép xuống D3:D6.',
          data: [
            ['Mặt hàng', 'Số lượng', 'Đơn giá', 'Thành tiền'],
            ['Giấy A4 (ram)', 20, 68000],
            ['Bút bi (hộp)', 5, 45000],
            ['Mực in', 3, 250000],
            ['Kẹp tài liệu', 12, 15000],
            ['Sổ tay', 8, 32000]
          ],
          fill: { range: 'D2:D6', solution: '=B2*C2' },
          fmt: { C: 'int', D: 'int' },
          hint: 'Phép nhân dùng dấu <code>*</code>. Ở D2 gõ <code>=B2*C2</code>.',
          explain: 'Khi sao chép xuống, Excel tự đổi B2*C2 thành B3*C3, B4*C4… Đây gọi là tham chiếu tương đối, bạn sẽ học kỹ ở bài sau.'
        },
        {
          id: 'ex2',
          task: 'Tính <b>Giá sau giảm</b> ở cột D: giá gốc trừ đi phần trăm được giảm. Viết công thức ở <code>D2</code> rồi sao chép xuống.',
          data: [
            ['Sản phẩm', 'Giá gốc', 'Giảm', 'Giá sau giảm'],
            ['Laptop', 18500000, 0.08],
            ['Màn hình', 4200000, 0.15],
            ['Bàn phím', 650000, 0.2],
            ['Chuột', 320000, 0.05]
          ],
          fill: { range: 'D2:D5', solution: '=B2*(1-C2)' },
          fmt: { B: 'int', C: 'pct0', D: 'int' },
          hint: 'Giá sau giảm = Giá gốc × (1 − % giảm). Nhớ đặt ngoặc: <code>=B2*(1-C2)</code>. Cách khác cũng đúng: <code>=B2-B2*C2</code>.',
          explain: 'Có nhiều cách viết cho ra cùng kết quả. Web chấm theo kết quả nên cách nào đúng cũng được tính điểm.'
        },
        {
          id: 'ex3',
          task: 'Ghép <b>Họ và tên</b> ở cột C bằng dấu <code>&amp;</code>. Giữa họ và tên có một dấu cách.',
          data: [
            ['Họ', 'Tên', 'Họ và tên'],
            ['Nguyễn Văn', 'An'],
            ['Trần Thị', 'Bình'],
            ['Lê Hoàng', 'Cường']
          ],
          fill: { range: 'C2:C4', solution: '=A2&" "&B2' },
          hint: 'Dấu cách cũng là chữ nên phải để trong ngoặc kép: <code>=A2&amp;" "&amp;B2</code>.',
          explain: 'Dấu &amp; nối các đoạn chữ lại với nhau. Chữ gõ trực tiếp trong công thức, kể cả dấu cách, phải nằm trong ngoặc kép.'
        }
      ]
    },

    /* ---------------- Bài 4 ---------------- */
    {
      id: 'dia-chi',
      title: 'Tham chiếu tương đối và tuyệt đối ($)',
      minutes: 14,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Bạn tính tiền thuế VAT cho bảng mua hàng. Thuế suất 10% đặt ở một ô riêng là <b>F1</b>. Dòng đầu tính đúng. Bạn kéo công thức xuống cho các dòng dưới thì <b>tất cả đều ra 0</b>.</p><p>Thủ phạm là cách Excel tự dịch địa chỉ ô khi sao chép công thức. Chỉ cần thêm dấu <code>$</code> đúng chỗ là xong. Đây là bài quan trọng nhất của Phần 1.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> địa chỉ ô trong công thức giống lời chỉ đường <b>"lấy ô bên trái mình"</b>. Chép công thức xuống dòng dưới, "bên trái mình" cũng dời xuống theo. Dấu <code>$</code> biến lời chỉ đường thành <b>địa chỉ cố định</b>: "luôn lấy đúng ô F1", chép đi đâu cũng vậy.' },
        { t: 'h', text: 'Không có $: địa chỉ dịch theo khi kéo' },
        { t: 'p', html: 'Mặc định, khi sao chép công thức, mọi địa chỉ ô <b>dịch chuyển theo</b>. Kiểu này gọi là <b>tham chiếu tương đối</b>. Xem chuyện gì xảy ra với bảng VAT:' },
        {
          t: 'walk',
          title: 'Công thức =B2*F1 (không có $). Bấm Tiếp để xem từng bước',
          data: [
            ['Mặt hàng', 'Thành tiền', 'Tiền VAT', '', 'VAT', 0.1],
            ['Bàn làm việc', 2500000],
            ['Ghế xoay', 1200000, '=B3*F2'],
            ['Tủ hồ sơ', 3100000, '=B4*F3']
          ],
          fmt: { B: 'int', C: 'int', F: 'pct' },
          cell: 'C2',
          formula: '=B2*F1',
          steps: [
            { html: 'Ô <b>C2</b> có <code>=B2*F1</code>: thành tiền nhân thuế suất. Kết quả 250,000 là đúng.', hl: [['B2', 0], ['F1', 2]], select: 'C2' },
            { html: 'Kéo công thức xuống <b>C3</b>. Excel dời mọi địa chỉ xuống 1 hàng: B2 thành <b>B3</b>, F1 thành <b>F2</b>. Công thức thành <code>=B3*F2</code>.', hl: [['B3', 0], ['F2', 4]], select: 'C3' },
            { html: 'Ô <b>F2</b> trống, Excel coi là 0. Nên 1,200,000 × 0 = <b>0</b>. Sai!', hl: [['F2', 4], ['C3', 4]], select: 'C3' },
            { html: 'Ô <b>C4</b> thành <code>=B4*F3</code>. F3 cũng trống, lại ra <b>0</b>.', hl: [['B4', 0], ['F3', 4], ['C4', 4]], select: 'C4' },
            { html: 'Kết luận: B2 dịch xuống B3, B4 là <b>đúng ý</b>. Nhưng F1 cũng bị dịch xuống F2, F3 là <b>sai ý</b>. Ta cần giữ F1 đứng yên.', hl: [['B2:B4', 0], ['F1', 2], ['F2:F3', 4]] }
          ]
        },
        { t: 'h', text: 'Có $: ô được khoá đứng yên' },
        { t: 'p', html: 'Thêm dấu <code>$</code> trước chữ cột và trước số hàng: <code>$F$1</code>. Kiểu này gọi là <b>tham chiếu tuyệt đối</b>. Sao chép đi đâu nó vẫn là F1. Dùng cho các ô "hằng số" như thuế suất, tỉ giá, đơn giá chung.' },
        {
          t: 'walk',
          title: 'Công thức =B2*$F$1 (có $). Bấm Tiếp để xem từng bước',
          data: [
            ['Mặt hàng', 'Thành tiền', 'Tiền VAT', '', 'VAT', 0.1],
            ['Bàn làm việc', 2500000],
            ['Ghế xoay', 1200000, '=B3*$F$1'],
            ['Tủ hồ sơ', 3100000, '=B4*$F$1']
          ],
          fmt: { B: 'int', C: 'int', F: 'pct' },
          cell: 'C2',
          formula: '=B2*$F$1',
          steps: [
            { html: 'Ô <b>C2</b> có <code>=B2*$F$1</code>. Kết quả 250,000.', hl: [['B2', 0], ['F1', 2]], select: 'C2' },
            { html: 'Kéo xuống <b>C3</b>: B2 dịch thành <b>B3</b>, còn <b>$F$1</b> giữ nguyên. Công thức thành <code>=B3*$F$1</code>, ra 120,000.', hl: [['B3', 0], ['F1', 2]], select: 'C3' },
            { html: 'Kéo xuống <b>C4</b>: thành <code>=B4*$F$1</code>, ra 310,000.', hl: [['B4', 0], ['F1', 2]], select: 'C4' },
            { html: 'Ô màu xanh (B2, B3, B4) <b>dịch chuyển</b> theo từng dòng. Ô màu cam F1 <b>đứng yên</b> nhờ dấu $. Cả 3 dòng đều đúng.', hl: [['B2:B4', 0], ['F1', 2], ['C2:C4', 1]] }
          ]
        },
        { t: 'h', text: 'Gõ dấu $ nhanh bằng phím F4' },
        {
          t: 'steps',
          items: [
            'Bấm vào ô C2, gõ <code>=B2*F1</code> nhưng <b>chưa nhấn Enter</b>.',
            'Con trỏ đang đứng ngay sau chữ F1. Nhấn <kbd>F4</kbd> một lần: F1 thành <code>$F$1</code>.',
            'Nhấn <kbd>Enter</kbd>. Rồi kéo hoặc sao chép công thức xuống các dòng dưới.'
          ]
        },
        { t: 'tip', html: 'Nhấn <kbd>F4</kbd> nhiều lần để xoay vòng: F1 → $F$1 → F$1 → $F1 → F1. Trên laptop có thể phải nhấn <kbd>Fn</kbd> + <kbd>F4</kbd>.' },
        { t: 'h', text: 'Tham chiếu hỗn hợp: $A1 và A$1' },
        { t: 'p', html: 'Đôi khi chỉ cần khoá <b>một nửa</b>: khoá cột mà cho hàng đổi, hoặc ngược lại. Dấu $ đứng trước phần nào thì khoá phần đó.' },
        {
          t: 'table',
          head: ['Viết', 'Khi sao chép', 'Dùng khi'],
          rows: [
            ['A1', 'Cột và hàng đều đổi', 'Phần lớn trường hợp'],
            ['$A$1', 'Không đổi gì', 'Ô hằng số: tỉ giá, thuế suất'],
            ['$A1', 'Giữ cột A, hàng đổi', 'Bảng hai chiều, cố định cột tiêu đề'],
            ['A$1', 'Giữ hàng 1, cột đổi', 'Bảng hai chiều, cố định hàng tiêu đề']
          ]
        },
        {
          t: 'example',
          title: 'Bảng thành tiền theo số lượng: một công thức =$A2*B$1 phủ cả bảng. Bấm từng ô để xem công thức',
          data: [
            ['Đơn giá \\ SL', 10, 50],
            [12000, '=$A2*B$1', '=$A2*C$1'],
            [25000, '=$A3*B$1', '=$A3*C$1']
          ],
          fmt: { A: 'int', B: 'int', C: 'int' },
          note: '<code>$A2</code> khoá cột A nên luôn lấy đơn giá ở cột A. <code>B$1</code> khoá hàng 1 nên luôn lấy số lượng ở hàng 1. Bạn sẽ tự làm bảng này ở bài tập 3.'
        },
        {
          t: 'table',
          head: ['Lỗi hay gặp', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Kéo xuống thì các dòng dưới ra 0', '<code>=B2*F1</code>, xuống dòng dưới thành <code>=B3*F2</code> (F2 trống)', 'Khoá ô hằng số: <code>$F$1</code>'],
            ['Khoá cả ô cần dịch chuyển', '<code>=$B$2*$F$1</code>, mọi dòng đều ra cùng một số', 'Chỉ khoá ô hằng số, B2 để nguyên'],
            ['Kéo sang phải thì lệch cột', '<code>=A2*B1</code> sang phải thành <code>=B2*C1</code>', 'Khoá cột: <code>$A2</code>, hoặc khoá hàng: <code>B$1</code>']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Ô E2 có công thức =C2*$H$1. Sao chép E2 xuống E5, công thức ở E5 là gì?',
          options: ['=C5*$H$1', '=C5*$H$4', '=C2*$H$1', '=C5*H4'],
          answer: 0,
          explain: 'C2 không có $ nên dịch xuống thành C5. $H$1 có $ nên giữ nguyên.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Muốn khi kéo công thức sang phải thì cột thay đổi, nhưng luôn lấy ở hàng 1, ta viết thế nào?',
          options: ['$B1', 'B$1', '$B$1', 'B1'],
          answer: 1,
          explain: 'Dấu $ đứng trước số 1 khoá hàng 1. Cột B không có $ nên vẫn đổi khi kéo sang phải.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'C2 có =B2*G1 cho kết quả đúng, kéo xuống thì các dòng dưới đều ra 0. Sửa C2 thế nào?',
          options: ['=$B$2*G1', '=B2*$G$1', '=B2*G1*1', '=$B2*G1'],
          answer: 1,
          explain: 'G1 là ô hằng số nên phải khoá: $G$1. B2 cần dịch theo từng dòng nên để nguyên.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Quy đổi giá từ USD sang VNĐ theo <b>tỉ giá ở ô F1</b>. Viết công thức ở <code>C2</code> sao cho khi sao chép xuống C3:C6 vẫn luôn nhân với F1.',
          data: [
            ['Dịch vụ', 'Giá (USD)', 'Giá (VNĐ)', '', 'Tỉ giá', 25400],
            ['Phí vận chuyển', 120],
            ['Phí lưu kho', 85],
            ['Phí bốc xếp', 40],
            ['Phí bảo hiểm', 15.5],
            ['Phí hải quan', 60]
          ],
          fill: { range: 'C2:C6', solution: '=B2*$F$1' },
          fmt: { C: 'int', F: 'int' },
          hint: 'Ô tỉ giá phải đứng yên nên khoá bằng dấu $: <code>=B2*$F$1</code>. Thử viết <code>=B2*F1</code> rồi sao chép xem chuyện gì xảy ra.',
          explain: '$F$1 giữ nguyên khi sao chép, còn B2 dịch xuống B3, B4… Đây là cách làm chuẩn cho mọi ô hằng số.'
        },
        {
          id: 'ex2',
          task: 'Tính <b>tỉ trọng doanh thu</b> của từng chi nhánh: doanh thu chi nhánh chia cho <b>tổng ở ô B6</b>. Viết công thức ở <code>C2</code> rồi sao chép xuống C3:C5.',
          data: [
            ['Chi nhánh', 'Doanh thu', 'Tỉ trọng'],
            ['Hà Nội', 1250000000],
            ['Đà Nẵng', 480000000],
            ['TP.HCM', 1870000000],
            ['Cần Thơ', 400000000],
            ['Tổng', '=B2+B3+B4+B5']
          ],
          fill: { range: 'C2:C5', solution: '=B2/$B$6' },
          fmt: { B: 'int', C: 'pct' },
          hint: 'Ô tổng luôn là B6, nên phải khoá: <code>=B2/$B$6</code>. Cũng có thể viết <code>=B2/B$6</code> (chỉ khoá hàng).',
          explain: 'Cộng các tỉ trọng lại sẽ ra đúng 100%. Đây là mẫu báo cáo rất hay gặp ở văn phòng.'
        },
        {
          id: 'ex3',
          task: 'Bảng thành tiền theo số lượng: mỗi ô = <b>đơn giá ở cột A</b> × <b>số lượng ở hàng 1</b>. Viết <b>một</b> công thức ở <code>B2</code> dùng tham chiếu hỗn hợp, rồi sao chép cho cả vùng B2:D4.',
          data: [
            ['Đơn giá \\ SL', 10, 50, 100],
            [12000],
            [25000],
            [48000]
          ],
          fill: { range: 'B2:D4', solution: '=$A2*B$1' },
          fmt: { A: 'int', B: 'int', C: 'int', D: 'int' },
          hint: 'Đơn giá luôn ở cột A, nên khoá cột: <code>$A2</code>. Số lượng luôn ở hàng 1, nên khoá hàng: <code>B$1</code>. Công thức: <code>=$A2*B$1</code>.',
          explain: 'Một công thức duy nhất phủ cả bảng hai chiều. Đây là ứng dụng kinh điển của tham chiếu hỗn hợp.'
        }
      ]
    },

    /* ---------------- Bài 5 ---------------- */
    {
      id: 'phim-tat',
      title: 'Phím tắt và thao tác nhanh',
      minutes: 8,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Hai đồng nghiệp cùng làm báo cáo kho 3.000 dòng. Một người cầm chuột lăn tìm dòng cuối, rê lên Ribbon tìm nút sao chép, nút in đậm. Người kia <b>xong trước 15 phút</b> mà gần như không chạm chuột.</p><p>Bí quyết là <b>phím tắt</b>. Bạn không cần thuộc hết, chỉ khoảng 15 phím dưới đây là đủ dùng hằng ngày.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> phím tắt là <b>đường tắt</b> tới các nút trên Ribbon. Thay vì đưa chuột lên tìm nút, bạn giữ <kbd>Ctrl</kbd> rồi gõ một phím.' },
        { t: 'h', text: 'Những nút bạn bấm nhiều nhất đều có phím tắt' },
        {
          t: 'excelui',
          tab: 'home',
          file: 'BaoCaoKho.xlsx',
          groups: ['Clipboard', 'Font', 'Editing'],
          marks: [
            { id: 'home.copy', n: 1, text: '<b>Copy</b> (sao chép): <kbd>Ctrl</kbd> + <kbd>C</kbd>' },
            { id: 'home.cut', n: 2, text: '<b>Cut</b> (cắt): <kbd>Ctrl</kbd> + <kbd>X</kbd>' },
            { id: 'home.paste', n: 3, text: '<b>Paste</b> (dán): <kbd>Ctrl</kbd> + <kbd>V</kbd>' },
            { id: 'home.bold', n: 4, text: '<b>Bold</b> (in đậm): <kbd>Ctrl</kbd> + <kbd>B</kbd>' },
            { id: 'home.autosum', n: 5, text: '<b>AutoSum</b> (tự cộng tổng): <kbd>Alt</kbd> + <kbd>=</kbd>' },
            { id: 'home.find', n: 6, text: '<b>Find</b> (tìm kiếm): <kbd>Ctrl</kbd> + <kbd>F</kbd>' }
          ],
          caption: 'Rê chuột lên một nút trên Ribbon và chờ một giây, Excel hiện tên nút kèm phím tắt của nó (nếu có).'
        },
        { t: 'h', text: 'Di chuyển và chọn' },
        {
          t: 'keys',
          items: [
            ['Ctrl + ↑ ↓ ← →', 'Nhảy tới ô cuối cùng có dữ liệu theo hướng mũi tên'],
            ['Ctrl + Shift + ↓', 'Chọn từ ô hiện tại tới cuối cột dữ liệu'],
            ['Ctrl + A', 'Chọn toàn bộ bảng dữ liệu'],
            ['Ctrl + Home / End', 'Về ô A1 / tới ô cuối cùng có dữ liệu'],
            ['Ctrl + Page Up / Down', 'Chuyển sang sheet trước / sau']
          ]
        },
        {
          t: 'excelui',
          tab: 'home',
          file: 'BaoCaoKho.xlsx',
          groups: ['Clipboard', 'Font'],
          data: [
            ['Mã hàng', 'Tên hàng', 'Tồn kho'],
            ['SP01', 'Bút bi', 120],
            ['SP02', 'Giấy A4', 45],
            ['SP03', 'Kẹp giấy', 300],
            ['SP04', 'Bìa hồ sơ', 80],
            ['SP05', 'Băng keo', 64]
          ],
          sel: 'C6',
          fx: '64',
          marks: [
            { id: 'ui.cell', n: 1, text: 'Đang đứng ở ô C2, nhấn <kbd>Ctrl</kbd> + <kbd>↓</kbd>: Excel nhảy thẳng xuống <b>C6</b>, ô cuối cùng có dữ liệu. Bảng 3.000 dòng cũng chỉ mất một lần bấm.' },
            { id: 'ui.namebox', n: 2, text: 'Name Box báo bạn đang ở ô nào sau khi nhảy.' },
            { id: 'ui.status', n: 3, text: 'Nếu nhấn <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>↓</kbd> thay vì <kbd>Ctrl</kbd> + <kbd>↓</kbd>, Excel chọn luôn cả vùng C2:C6, và thanh trạng thái hiện Sum: 609.' }
          ]
        },
        { t: 'h', text: 'Chỉnh sửa' },
        {
          t: 'keys',
          items: [
            ['Ctrl + C / X / V', 'Sao chép / cắt / dán'],
            ['Ctrl + Alt + V', 'Dán đặc biệt (chỉ giá trị, chỉ định dạng…)'],
            ['Ctrl + Z / Y', 'Hoàn tác / làm lại'],
            ['Ctrl + D', 'Chép ô phía trên xuống các ô đang chọn'],
            ['Ctrl + R', 'Chép ô bên trái sang phải'],
            ['Ctrl + Space / Shift + Space', 'Chọn cả cột / cả hàng'],
            ['Ctrl + + / Ctrl + -', 'Chèn / xoá hàng, cột']
          ]
        },
        { t: 'h', text: 'Định dạng và tiện ích' },
        {
          t: 'keys',
          items: [
            ['Ctrl + 1', 'Mở hộp thoại Format Cells (định dạng ô)'],
            ['Ctrl + B / I / U', 'In đậm / in nghiêng / gạch chân'],
            ['Ctrl + Shift + L', 'Bật / tắt bộ lọc (Filter)'],
            ['Ctrl + T', 'Biến vùng dữ liệu thành Bảng (Table)'],
            ['Alt + =', 'Tự chèn hàm SUM cho vùng phía trên'],
            ['Ctrl + F / H', 'Tìm kiếm / tìm và thay thế'],
            ['F4', 'Khoá ô ($) khi đang sửa công thức, hoặc lặp lại thao tác vừa làm']
          ]
        },
        { t: 'tip', html: 'Nhấn phím <kbd>Alt</kbd> một lần: trên Ribbon hiện các chữ cái gợi ý. Gõ lần lượt theo chữ cái đó để chạy mọi lệnh mà không cần chuột. Ví dụ <kbd>Alt</kbd> → <kbd>H</kbd> → <kbd>O</kbd> → <kbd>I</kbd> để tự giãn độ rộng cột.' },
        { t: 'warn', html: 'Lỡ tay làm hỏng bảng? Đừng hoảng: nhấn <kbd>Ctrl</kbd> + <kbd>Z</kbd> để quay lại bước trước, nhấn nhiều lần để lùi nhiều bước. Nhưng sau khi đóng file thì không lùi được nữa.' },
        { t: 'p', html: '<b>Cách học nhanh:</b> mỗi tuần chọn 3 phím tắt, dán giấy nhớ cạnh màn hình và ép mình dùng thay chuột. Sau một tháng bạn sẽ dùng chúng theo phản xạ.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Phím tắt nào tự động chèn hàm SUM cho cột số phía trên?',
          options: ['Ctrl + S', 'Alt + =', 'Ctrl + Shift + S', 'F9'],
          answer: 1,
          explain: 'Alt + = là AutoSum: Excel tự đoán vùng cần cộng và chèn =SUM(...).'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Bạn muốn dán một bảng nhưng chỉ lấy giá trị, bỏ công thức. Dùng gì?',
          options: ['Ctrl + V', 'Ctrl + D', 'Ctrl + Alt + V rồi chọn Values', 'Ctrl + Shift + V'],
          answer: 2,
          explain: 'Paste Special (dán đặc biệt, Ctrl + Alt + V) cho phép chọn chỉ dán Values (giá trị), Formats (định dạng), Formulas (công thức)…'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Trong cột có 5.000 dòng dữ liệu, cách nhanh nhất để nhảy xuống dòng cuối cùng?',
          options: ['Lăn chuột', 'Ctrl + ↓', 'Page Down nhiều lần', 'Ctrl + End rồi lăn lên'],
          answer: 1,
          explain: 'Ctrl + mũi tên xuống nhảy thẳng tới ô cuối cùng có dữ liệu trong cột.'
        }
      ],
      exercises: []
    }
  ],

  /* ---------------- Bài kiểm tra Phần 1 ---------------- */
  test: {
    mcq: [
      { q: 'Một file Excel được gọi là gì?', options: ['Sheet', 'Workbook', 'Cell', 'Range'], answer: 1, explain: 'File Excel là Workbook (sổ tính), bên trong chứa nhiều Sheet (trang tính).' },
      { q: 'Địa chỉ ô ở cột F, hàng 12 là gì?', options: ['12F', 'F12', 'F:12', 'R12F'], answer: 1, explain: 'Chữ cột trước, số hàng sau: F12.' },
      { q: 'Vùng A1:B10 có bao nhiêu ô?', options: ['10', '11', '20', '12'], answer: 2, explain: '2 cột × 10 hàng = 20 ô.' },
      { q: 'Công thức =(4+6)*2^2 cho kết quả bao nhiêu?', options: ['40', '100', '28', '400'], answer: 0, explain: 'Ngoặc trước: 10. Luỹ thừa: 2^2 = 4. Rồi 10 × 4 = 40.' },
      { q: 'Công thức nào ghép "Nguyễn" ở A2 và "An" ở B2 thành "Nguyễn An"?', options: ['=A2+B2', '=A2&B2', '=A2&" "&B2', '=A2 B2'], answer: 2, explain: 'Dùng & để nối, và dấu cách phải nằm trong ngoặc kép.' },
      { q: 'Ô D2 có =B2*$G$2. Sao chép sang ô E3 (sang phải 1 cột, xuống 1 hàng), công thức thành gì?', options: ['=C3*$G$2', '=B3*$G$2', '=C3*$H$3', '=B2*$G$2'], answer: 0, explain: 'Sang phải 1 cột, xuống 1 hàng: B2 thành C3. $G$2 có $ nên giữ nguyên.' },
      { q: 'Phím nào dùng để sửa nội dung ô đang chọn?', options: ['F1', 'F2', 'F4', 'F9'], answer: 1, explain: 'F2 mở chế độ sửa ô, con trỏ đứng ở cuối nội dung.' },
      { q: 'Vì sao lấy ngày 10/03/2024 trừ ngày 01/03/2024 lại ra 9?', options: ['Excel đếm ký tự', 'Ngày được lưu dưới dạng số', 'Đó là lỗi của Excel', 'Excel chỉ trừ phần ngày'], answer: 1, explain: 'Excel lưu ngày là số thứ tự, nên phép trừ ra số ngày.' },
      { q: 'Viết $A2 nghĩa là gì?', options: ['Khoá cả cột và hàng', 'Khoá cột A, hàng thay đổi', 'Khoá hàng 2, cột thay đổi', 'Ô chứa tiền tệ'], answer: 1, explain: 'Dấu $ đứng trước A khoá cột. Số 2 không có $ nên hàng vẫn đổi.' },
      { q: 'Phím tắt mở hộp thoại Format Cells (định dạng ô) là gì?', options: ['Ctrl + F', 'Ctrl + 1', 'Ctrl + T', 'Alt + F1'], answer: 1, explain: 'Ctrl + 1 mở Format Cells.' }
    ],
    practice: [
      {
        id: 't1',
        task: 'Tính <b>Lương thực nhận = Lương cơ bản × Số ngày công ÷ 26</b> ở cột D. Viết công thức ở <code>D2</code> rồi sao chép xuống D3:D5.',
        data: [
          ['Nhân viên', 'Lương cơ bản', 'Ngày công', 'Thực nhận'],
          ['Mai', 9000000, 26],
          ['Tuấn', 12000000, 24],
          ['Hà', 8500000, 22],
          ['Phong', 15000000, 25]
        ],
        fill: { range: 'D2:D5', solution: '=B2*C2/26' },
        fmt: { B: 'int', D: 'int' }
      },
      {
        id: 't2',
        task: 'Tính <b>Phụ cấp xăng xe</b> = Số km đi công tác × <b>đơn giá mỗi km ở ô F1</b>. Viết công thức ở <code>C2</code> sao cho sao chép xuống C3:C5 vẫn đúng.',
        data: [
          ['Nhân viên', 'Số km', 'Phụ cấp', '', 'Đơn giá/km', 3500],
          ['Mai', 120],
          ['Tuấn', 340],
          ['Hà', 75],
          ['Phong', 210]
        ],
        fill: { range: 'C2:C5', solution: '=B2*$F$1' },
        fmt: { C: 'int', F: 'int' }
      }
    ]
  }
});
