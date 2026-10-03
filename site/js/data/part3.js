ECC.addPart({
  id: 'p3',
  no: 3,
  title: 'Hàm logic',
  short: 'Logic',
  desc: 'Dạy Excel tự ra quyết định: so sánh, IF, IF lồng nhau, AND/OR/NOT, IFS, SWITCH và cách bắt lỗi bằng IFERROR, ISBLANK, ISNUMBER. Dùng để xếp loại, tính thưởng, tính phí theo điều kiện.',
  lessons: [
    /* ---------------- Bài 1 ---------------- */
    {
      id: 'if',
      title: 'Toán tử so sánh và hàm IF',
      minutes: 12,
      funcs: ['IF'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Phòng nhân sự vừa tổ chức thi nghiệp vụ cho 80 nhân viên. Ai từ <b>5 điểm</b> trở lên thì ghi "Đạt", dưới 5 thì ghi "Không đạt".</p><p>Ngồi đọc từng điểm rồi gõ tay thì vừa lâu vừa dễ ghi nhầm. Với hàm <b>IF</b>, bạn viết <b>một công thức</b>, Excel tự xét từng người và ghi kết quả cho cả 80 dòng.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> IF chính là câu nói hằng ngày <b>"nếu… thì…, không thì…"</b>. Ví dụ: <i>nếu</i> điểm từ 5 trở lên <i>thì</i> Đạt, <i>không thì</i> Không đạt. Bạn chỉ cần nói câu đó cho Excel theo đúng thứ tự.' },
        { t: 'h', text: 'Bước 1: Điều kiện là một phép so sánh' },
        { t: 'p', html: 'Phần "nếu…" là một phép so sánh. Phép so sánh luôn cho ra một trong hai đáp án: <b>TRUE</b> (đúng) hoặc <b>FALSE</b> (sai).' },
        {
          t: 'table',
          head: ['Toán tử', 'Ý nghĩa', 'Ví dụ', 'Kết quả (B2 = 8)'],
          rows: [
            ['=', 'Bằng', '=B2=8', 'TRUE'],
            ['&lt;&gt;', 'Khác', '=B2&lt;&gt;8', 'FALSE'],
            ['&gt;', 'Lớn hơn', '=B2&gt;5', 'TRUE'],
            ['&lt;', 'Nhỏ hơn', '=B2&lt;5', 'FALSE'],
            ['&gt;=', 'Lớn hơn hoặc bằng ("từ… trở lên")', '=B2&gt;=8', 'TRUE'],
            ['&lt;=', 'Nhỏ hơn hoặc bằng ("tối đa…")', '=B2&lt;=7', 'FALSE']
          ]
        },
        {
          t: 'example',
          title: 'Mỗi phép so sánh trả về TRUE hoặc FALSE',
          data: [
            ['Nhân viên', 'Ngày công', 'Đủ 26 công?', 'Nghỉ quá 3 ngày?'],
            ['Lan', 26, '=B2>=26', '=26-B2>3'],
            ['Hùng', 21, '=B3>=26', '=26-B3>3']
          ],
          note: 'Bấm vào C2, D2 để xem công thức. TRUE/FALSE chưa đẹp để đưa vào báo cáo. Hàm IF sẽ đổi chúng thành chữ hoặc số dễ hiểu.'
        },
        { t: 'h', text: 'Bước 2: Công thức IF gồm 3 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó làm gì',
          data: [
            ['Nhân viên', 'Điểm thi', 'Kết quả'],
            ['Nguyễn Lan', 7.5, ''],
            ['Trần Hùng', 4, '=IF(B3>=5,"Đạt","Không đạt")'],
            ['Lê Minh', 6, '=IF(B4>=5,"Đạt","Không đạt")']
          ],
          cell: 'C2',
          formula: '=IF(B2>=5,"Đạt","Không đạt")',
          parts: [
            { label: 'Điều kiện', desc: 'Câu hỏi "nếu…": điểm ở ô B2 có từ 5 trở lên không? Excel trả lời TRUE (đúng) hoặc FALSE (sai).' },
            { label: 'Nếu đúng thì', desc: 'Kết quả khi điều kiện ĐÚNG. Đây là chữ nên phải đặt trong ngoặc kép: <code>"Đạt"</code>.', range: 'C2' },
            { label: 'Nếu sai thì', desc: 'Kết quả khi điều kiện SAI ("không thì…"). Bỏ trống phần này thì Excel ghi FALSE, trông rất xấu.', range: 'C2' }
          ],
          note: 'Ba phần ngăn cách nhau bằng dấu phẩy. Đọc to lên: "Nếu B2 từ 5 trở lên thì Đạt, không thì Không đạt".'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Nhân viên', 'Điểm thi', 'Kết quả'],
            ['Nguyễn Lan', 7.5, ''],
            ['Trần Hùng', 4, '=IF(B3>=5,"Đạt","Không đạt")'],
            ['Lê Minh', 6, '=IF(B4>=5,"Đạt","Không đạt")']
          ],
          cell: 'C2',
          formula: '=IF(B2>=5,"Đạt","Không đạt")',
          steps: [
            { html: 'Excel đọc ô <b>B2</b>: Nguyễn Lan được <b>7,5</b> điểm.', hl: [['B2', 0]], select: 'B2' },
            { html: 'Kiểm tra điều kiện: <b>7,5 &gt;= 5</b>? Đúng, kết quả là <b>TRUE</b>.', hl: [['B2', 0]], select: 'B2' },
            { html: 'Điều kiện ĐÚNG nên Excel chọn phần thứ hai (<b>nếu đúng thì</b>): <b>"Đạt"</b>. Phần thứ ba bị bỏ qua.', hl: [['B2', 0], ['C2', 1]], select: 'C2' },
            { html: 'Chép công thức xuống hàng 3: Trần Hùng có <b>4</b> điểm. <b>4 &gt;= 5</b>? Sai, kết quả là <b>FALSE</b>.', hl: [['B3', 0]], select: 'B3' },
            { html: 'Điều kiện SAI nên Excel chọn phần thứ ba (<b>nếu sai thì</b>): <b>"Không đạt"</b>.', hl: [['B3', 0], ['C3', 2]], select: 'C3' },
            { html: 'Mỗi dòng Excel tự xét lại từ đầu. Kết quả hiện ở cột C: Đạt, Không đạt, Đạt.', hl: [['C2:C4', 1]], select: 'C2' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'KetQuaThi.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Cách 1: bấm tab <b>Formulas</b> (Công thức).' },
            { id: 'formulas.logical', n: 2, text: 'Bấm <b>Logical</b> (nhóm hàm logic), chọn <b>IF</b>. Excel mở hộp thoại có 3 ô đúng bằng 3 phần ở trên: Logical_test, Value_if_true, Value_if_false.' }
          ],
          caption: 'Cách 2 nhanh hơn và hay dùng: gõ thẳng công thức vào ô.'
        },
        {
          t: 'steps',
          title: 'Cách 2: gõ công thức trực tiếp',
          items: [
            'Bấm vào ô <b>C2</b>, gõ <code>=IF(</code>. Excel hiện dòng gợi ý 3 phần cần điền.',
            'Bấm chuột vào ô <b>B2</b>, gõ tiếp <code>&gt;=5,</code> (đây là điều kiện).',
            'Gõ <code>"Đạt",</code> (nhớ ngoặc kép), rồi gõ <code>"Không đạt")</code>.',
            'Nhấn <kbd>Enter</kbd>. Bấm lại ô C2, <b>nhấp đúp vào chấm vuông nhỏ</b> ở góc dưới bên phải ô để chép xuống cả cột.'
          ]
        },
        { t: 'h', text: 'Kết quả có thể là số hoặc một phép tính' },
        {
          t: 'example',
          title: 'Kết quả thi nghiệp vụ và thưởng doanh số',
          data: [
            ['Nhân viên', 'Điểm thi', 'Kết quả', 'Doanh số', 'Chỉ tiêu', 'Thưởng'],
            ['Nguyễn Lan', 7.5, '=IF(B2>=5,"Đạt","Không đạt")', 320000000, 300000000, '=IF(D2>=E2,D2*2%,0)'],
            ['Trần Hùng', 4, '=IF(B3>=5,"Đạt","Không đạt")', 250000000, 300000000, '=IF(D3>=E3,D3*2%,0)'],
            ['Lê Minh', 6, '=IF(B4>=5,"Đạt","Không đạt")', 410000000, 350000000, '=IF(D4>=E4,D4*2%,0)']
          ],
          fmt: { D: 'int', E: 'int', F: 'int' },
          note: 'Cột F: nếu doanh số đạt chỉ tiêu thì thưởng 2% doanh số, không thì 0. Số không cần ngoặc kép. Kết quả có thể là phép tính như <code>D2*2%</code>.'
        },
        { t: 'tip', html: 'Đừng gõ cứng ngưỡng vào công thức nếu ngưỡng có thể thay đổi. Đặt ngưỡng vào một ô riêng (ví dụ <code>G1</code>) rồi viết <code>=IF(B2>=$G$1,"Đạt","Không đạt")</code>. Dấu $ giữ ô G1 đứng yên khi chép công thức. Năm sau đổi ngưỡng chỉ cần sửa một ô.' },
        { t: 'h', text: 'Lỗi hay gặp với IF' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Quên ngoặc kép quanh chữ', '<code>=IF(B2>=5,Đạt,Không đạt)</code> báo lỗi #NAME?', 'Viết <code>"Đạt"</code>, <code>"Không đạt"</code>'],
            ['Nhầm &gt; với &gt;=', 'Đề nói "từ 5 trở lên" mà viết <code>B2>5</code>: người được đúng 5 điểm bị Không đạt', '"Từ… trở lên" là <code>&gt;=</code>'],
            ['Thừa dấu cách trong chữ', '<code>C2="VIP "</code> khác <code>C2="VIP"</code>', 'Gõ đúng chữ, không thừa dấu cách'],
            ['Gõ số có dấu chấm', '<code>B2>=500.000</code>', 'Trong công thức chỉ gõ <code>500000</code>'],
            ['Bỏ trống phần "nếu sai thì"', '<code>=IF(B2>=5,"Đạt")</code> ra FALSE', 'Luôn ghi đủ 3 phần, muốn để trống thì ghi <code>""</code>']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Ô B2 chứa 450000. Công thức =IF(B2>500000,0,30000) trả về gì?',
          options: ['0', '30000', 'TRUE', 'FALSE'],
          answer: 1,
          explain: '450000 > 500000 là SAI nên IF chọn phần thứ ba (nếu sai thì): 30000.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Muốn kiểm tra ô C2 KHÁC chữ "Đã thanh toán", ta viết điều kiện nào?',
          options: ['C2!="Đã thanh toán"', 'C2<>"Đã thanh toán"', 'C2><"Đã thanh toán"', 'NOT C2="Đã thanh toán"'],
          answer: 1,
          explain: 'Trong Excel, "khác" viết là <>. Các cách viết còn lại không đúng cú pháp.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Đề: "Đơn từ 1 triệu trở lên được giảm 5%". Điều kiện nào đúng nếu giá trị đơn ở B2?',
          options: ['B2>1000000', 'B2>=1000000', 'B2=>1000000', 'B2>=1.000.000'],
          answer: 1,
          explain: '"Từ… trở lên" là >=. Excel không hiểu cách viết => và không chấp nhận dấu chấm ngăn cách trong số.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Ghi <b>Kết quả</b> khoá đào tạo ở cột C. Nếu điểm từ <b>điểm đạt ở ô G1</b> trở lên thì ghi "Đạt", không thì ghi "Không đạt". Viết công thức ở <code>C2</code> rồi sao chép xuống C3:C7.',
          data: [
            ['Nhân viên', 'Điểm', 'Kết quả', '', '', 'Điểm đạt', 7],
            ['Phạm Thu', 8.5],
            ['Đỗ Quang', 6],
            ['Vũ Hà', 7],
            ['Bùi Nam', 4.5],
            ['Hoàng Yến', 9],
            ['Ngô Tài', 6.5]
          ],
          fill: { range: 'C2:C7', solution: '=IF(B2>=$G$1,"Đạt","Không đạt")' },
          mustUse: ['IF'],
          hint: 'Điều kiện: <code>B2>=$G$1</code> ("từ… trở lên" là >=, khoá ô G1 bằng $). Công thức: <code>=IF(B2>=$G$1,"Đạt","Không đạt")</code>.',
          explain: 'Vũ Hà được đúng 7 điểm vẫn Đạt vì dùng >=. Nếu viết > thì Vũ Hà bị Không đạt. Đọc kỹ đề: "từ… trở lên" là >=.'
        },
        {
          id: 'ex2',
          task: 'Tính <b>Thưởng</b> ở cột D. Nếu doanh số đạt hoặc vượt chỉ tiêu thì thưởng = doanh số × <b>tỉ lệ thưởng ở ô G1</b>, không thì thưởng 0. Viết ở <code>D2</code> rồi sao chép xuống D3:D6.',
          data: [
            ['Nhân viên', 'Doanh số', 'Chỉ tiêu', 'Thưởng', '', 'Tỉ lệ thưởng', 0.03],
            ['Nguyễn Lan', 520000000, 500000000],
            ['Trần Hùng', 380000000, 400000000],
            ['Lê Minh', 450000000, 450000000],
            ['Đinh Hoa', 610000000, 550000000],
            ['Mai Phúc', 290000000, 350000000]
          ],
          fill: { range: 'D2:D6', solution: '=IF(B2>=C2,B2*$G$1,0)' },
          mustUse: ['IF'],
          fmt: { B: 'int', C: 'int', D: 'int', G: 'pct0' },
          hint: 'Điều kiện là <code>B2>=C2</code>. Nếu đúng thì tính <code>B2*$G$1</code>, nếu sai thì 0: <code>=IF(B2>=C2,B2*$G$1,0)</code>.',
          explain: 'Phần "nếu đúng thì" của IF có thể là một phép tính. Lê Minh đạt đúng bằng chỉ tiêu nên vẫn được thưởng.'
        },
        {
          id: 'ex3',
          task: 'Tính <b>Phí giao hàng</b> ở cột C: đơn từ <b>ngưỡng miễn phí ở ô G1</b> trở lên thì phí bằng 0, không thì phí bằng <b>phí chuẩn ở ô G2</b>. Sau đó tính <b>Khách trả</b> ở cột D = giá trị đơn + phí giao. Làm cho cả hàng 2 đến hàng 6.',
          data: [
            ['Mã đơn', 'Giá trị đơn', 'Phí giao', 'Khách trả', '', 'Ngưỡng miễn phí', 500000],
            ['DH101', 650000, '', '', '', 'Phí chuẩn', 30000],
            ['DH102', 320000],
            ['DH103', 500000],
            ['DH104', 145000],
            ['DH105', 890000]
          ],
          fill: [
            { range: 'C2:C6', solution: '=IF(B2>=$G$1,0,$G$2)' },
            { range: 'D2:D6', solution: '=B2+C2' }
          ],
          mustUse: [],
          fmt: { B: 'int', C: 'int', D: 'int', G: 'int' },
          hint: 'Ở C2: <code>=IF(B2>=$G$1,0,$G$2)</code>. Ở D2: <code>=B2+C2</code>. Chép cả hai xuống đến hàng 6.',
          explain: 'Tách phí giao ra một cột riêng giúp bảng dễ kiểm tra hơn so với nhồi tất cả vào một công thức dài.'
        }
      ]
    },

    /* ---------------- Bài 2 ---------------- */
    {
      id: 'if-long',
      title: 'IF lồng nhau: nhiều mức điều kiện',
      minutes: 14,
      funcs: ['IF'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Cuối năm, sếp muốn xếp loại nhân viên theo điểm KPI thành <b>4 mức</b>: từ 90 là Giỏi, từ 75 là Khá, từ 50 là Trung bình, dưới 50 là Yếu.</p><p>Một hàm IF chỉ chia được 2 ngả: đúng hoặc sai. Muốn chia 4 mức, ta đặt thêm IF vào phần <b>"nếu sai thì"</b> của IF trước. Cách này gọi là <b>IF lồng nhau</b>.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> giống đi qua một dãy cửa kiểm tra. Cửa 1 hỏi "từ 90 trở lên không?". Có thì ra Giỏi, xong. Không thì đi tiếp sang cửa 2 hỏi "từ 75 trở lên không?"… Ai không qua cửa nào thì nhận mức cuối cùng.' },
        { t: 'h', text: 'Công thức IF lồng nhau vẫn có 3 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu. Phần thứ ba chứa cả một IF khác',
          data: [
            ['Nhân viên', 'Điểm KPI', 'Xếp loại'],
            ['Nguyễn Lan', 93, ''],
            ['Trần Hùng', 78, '=IF(B3>=90,"Giỏi",IF(B3>=75,"Khá",IF(B3>=50,"Trung bình","Yếu")))'],
            ['Lê Minh', 61, '=IF(B4>=90,"Giỏi",IF(B4>=75,"Khá",IF(B4>=50,"Trung bình","Yếu")))'],
            ['Đinh Hoa', 42, '=IF(B5>=90,"Giỏi",IF(B5>=75,"Khá",IF(B5>=50,"Trung bình","Yếu")))']
          ],
          cell: 'C2',
          formula: '=IF(B2>=90,"Giỏi",IF(B2>=75,"Khá",IF(B2>=50,"Trung bình","Yếu")))',
          parts: [
            { label: 'Điều kiện (cửa 1)', desc: 'Điểm ở B2 có từ 90 trở lên không?' },
            { label: 'Nếu đúng thì', desc: 'Ra <code>"Giỏi"</code> và dừng luôn, không xét các cửa sau.', range: 'C2' },
            { label: 'Nếu sai thì xét tiếp', desc: 'Thay vì ghi một kết quả, ta đặt nguyên một hàm IF mới: hỏi tiếp "từ 75 trở lên?", rồi "từ 50 trở lên?". Không qua cửa nào thì ra <code>"Yếu"</code>.' }
          ],
          note: 'Quy tắc nhẩm: <b>n mức thì cần n − 1 hàm IF</b>. Xếp 4 loại cần 3 IF, và cuối công thức có đúng 3 dấu ngoặc đóng <code>)))</code>.'
        },
        { t: 'h', text: 'Excel đi qua từng tầng IF như thế nào?' },
        {
          t: 'walk',
          title: 'Xem Excel xếp loại Lê Minh (61 điểm). Bấm Tiếp hoặc Tự chạy',
          data: [
            ['Nhân viên', 'Điểm KPI', 'Xếp loại'],
            ['Nguyễn Lan', 93, '=IF(B2>=90,"Giỏi",IF(B2>=75,"Khá",IF(B2>=50,"Trung bình","Yếu")))'],
            ['Trần Hùng', 78, '=IF(B3>=90,"Giỏi",IF(B3>=75,"Khá",IF(B3>=50,"Trung bình","Yếu")))'],
            ['Lê Minh', 61, ''],
            ['Đinh Hoa', 42, '=IF(B5>=90,"Giỏi",IF(B5>=75,"Khá",IF(B5>=50,"Trung bình","Yếu")))']
          ],
          cell: 'C4',
          formula: '=IF(B4>=90,"Giỏi",IF(B4>=75,"Khá",IF(B4>=50,"Trung bình","Yếu")))',
          steps: [
            { html: 'Excel đọc ô <b>B4</b>: Lê Minh được <b>61</b> điểm.', hl: [['B4', 0]], select: 'B4' },
            { html: '<b>Tầng 1</b>: 61 &gt;= 90? <b>Sai</b>. Bỏ qua "Giỏi", đi vào phần "nếu sai thì", tức là IF thứ hai.', hl: [['B4', 0]], select: 'B4' },
            { html: '<b>Tầng 2</b>: 61 &gt;= 75? <b>Sai</b>. Bỏ qua "Khá", đi vào IF thứ ba.', hl: [['B4', 3]], select: 'B4' },
            { html: '<b>Tầng 3</b>: 61 &gt;= 50? <b>Đúng</b>. Excel lấy <b>"Trung bình"</b> và dừng lại.', hl: [['B4', 1], ['C4', 1]], select: 'C4' },
            { html: 'So sánh với Nguyễn Lan (93 điểm): đúng ngay ở tầng 1 nên ra "Giỏi", Excel không cần xét tầng 2 và 3.', hl: [['B2', 1], ['C2', 1]], select: 'C2' },
            { html: 'Đinh Hoa (42 điểm) sai ở cả 3 tầng, nên rơi vào phần cuối cùng: <b>"Yếu"</b>. Kết quả của cả bảng hiện ở cột C.', hl: [['B5', 2], ['C5', 2]], select: 'C5' }
          ]
        },
        { t: 'p', html: 'Để ý tầng 2 chỉ cần viết <code>B4>=75</code>, không cần viết <code>AND(B4>=75,B4<90)</code>. Lý do: ai từ 90 trở lên đã "ra cửa" ở tầng 1 rồi.' },
        { t: 'h', text: 'Thứ tự điều kiện rất quan trọng' },
        { t: 'p', html: 'Khi dùng <code>&gt;=</code>, hãy xét <b>từ mức cao xuống mức thấp</b>. Khi dùng <code>&lt;</code>, xét <b>từ thấp lên cao</b>. Đảo thứ tự là sai ngay mà Excel không báo lỗi.' },
        {
          t: 'example',
          title: 'Sai thứ tự: xét ≥ 50 trước nên ai trên 50 điểm cũng ra "Trung bình"',
          data: [
            ['Nhân viên', 'Điểm KPI', 'Công thức sai', 'Công thức đúng'],
            ['Nguyễn Lan', 93, '=IF(B2>=50,"Trung bình",IF(B2>=75,"Khá",IF(B2>=90,"Giỏi","Yếu")))', '=IF(B2>=90,"Giỏi",IF(B2>=75,"Khá",IF(B2>=50,"Trung bình","Yếu")))']
          ],
          note: '93 ≥ 50 là đúng ngay ở cửa đầu, nên công thức sai dừng luôn ở "Trung bình". Hai IF phía sau không bao giờ được xét tới.'
        },
        {
          t: 'example',
          title: 'Hoa hồng theo bậc: ≥ 500 triệu 5%, ≥ 200 triệu 3%, còn lại 1%',
          data: [
            ['Nhân viên', 'Doanh số', 'Tỉ lệ', 'Hoa hồng'],
            ['Phạm Thu', 620000000, '=IF(B2>=500000000,5%,IF(B2>=200000000,3%,1%))', '=B2*C2'],
            ['Đỗ Quang', 310000000, '=IF(B3>=500000000,5%,IF(B3>=200000000,3%,1%))', '=B3*C3'],
            ['Vũ Hà', 150000000, '=IF(B4>=500000000,5%,IF(B4>=200000000,3%,1%))', '=B4*C4']
          ],
          fmt: { B: 'int', C: 'pct0', D: 'int' },
          note: '3 bậc nên cần 2 IF. Tách cột Tỉ lệ ra riêng giúp người đọc báo cáo kiểm tra nhanh nhân viên nằm ở bậc nào.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          title: 'Gõ IF lồng nhau từng tầng',
          items: [
            'Viết ra giấy các mức từ cao xuống thấp trước: 90 Giỏi, 75 Khá, 50 Trung bình, còn lại Yếu.',
            'Bấm ô <b>C2</b>, gõ tầng 1: <code>=IF(B2&gt;=90,"Giỏi",</code>',
            'Gõ tiếp tầng 2 ngay sau dấu phẩy: <code>IF(B2&gt;=75,"Khá",</code>',
            'Gõ tầng cuối: <code>IF(B2&gt;=50,"Trung bình","Yếu"</code>',
            'Đóng đủ ngoặc: 3 IF thì gõ <code>)))</code>. Excel tô mỗi cặp ngoặc một màu để bạn dễ đếm. Nhấn <kbd>Enter</kbd>.',
            'Nhấp đúp vào chấm vuông nhỏ ở góc ô C2 để chép xuống, rồi kiểm tra vài dòng nằm <b>đúng ranh giới</b> (ví dụ đúng 75 điểm).'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp với IF lồng' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Thiếu hoặc thừa ngoặc đóng', '3 IF nhưng cuối chỉ có <code>))</code>, Excel báo lỗi công thức', 'Đếm: bao nhiêu IF thì bấy nhiêu dấu <code>)</code>'],
            ['Sai thứ tự điều kiện', 'Xét <code>&gt;=50</code> trước <code>&gt;=90</code>, ai cũng ra Trung bình', 'Dùng &gt;= thì xét từ cao xuống thấp'],
            ['Gõ số có dấu chấm', '<code>B2&gt;=500.000.000</code>', 'Chỉ gõ <code>500000000</code>'],
            ['Thiếu mức cuối', '<code>IF(B2&gt;=50,"Trung bình")</code>: người dưới 50 ra FALSE', 'IF trong cùng luôn có phần "nếu sai thì"']
          ]
        },
        { t: 'tip', html: 'Từ 4 mức trở lên, công thức IF lồng rất khó đọc. Nếu dùng Excel 2019 hoặc 365, hãy cân nhắc hàm <b>IFS</b> ở bài 4. Nếu số mức nhiều và hay thay đổi, dùng bảng tra cứu với VLOOKUP/XLOOKUP.' },
        {
          t: 'quiz', id: 'q1',
          q: 'B2 = 80. Công thức =IF(B2>=90,"A",IF(B2>=70,"B",IF(B2>=50,"C","D"))) trả về gì?',
          options: ['A', 'B', 'C', 'D'],
          answer: 1,
          explain: 'Tầng 1: 80 ≥ 90 sai, đi tiếp. Tầng 2: 80 ≥ 70 đúng, nên trả về "B" và dừng lại.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Muốn chia nhân viên thành 5 mức xếp loại bằng IF lồng nhau, cần tối thiểu bao nhiêu hàm IF?',
          options: ['3', '4', '5', '6'],
          answer: 1,
          explain: 'n mức cần n − 1 hàm IF. Mức cuối cùng là phần "nếu sai thì" của IF trong cùng.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'B2 = 30. Công thức =IF(B2>=90,"Giỏi",IF(B2>=75,"Khá",IF(B2>=50,"Trung bình","Yếu"))) phải xét bao nhiêu điều kiện trước khi ra kết quả?',
          options: ['1', '2', '3', '4'],
          answer: 2,
          explain: '30 sai ở cả 3 điều kiện (≥ 90, ≥ 75, ≥ 50), sau đó mới rơi vào kết quả cuối "Yếu".'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Xếp loại nhân viên ở cột C theo điểm KPI: từ 90 trở lên "Giỏi", từ 75 "Khá", từ 50 "Trung bình", dưới 50 "Yếu". Viết ở <code>C2</code> rồi sao chép xuống C3:C8.',
          data: [
            ['Nhân viên', 'Điểm KPI', 'Xếp loại'],
            ['Nguyễn Lan', 92],
            ['Trần Hùng', 74],
            ['Lê Minh', 75],
            ['Đinh Hoa', 48],
            ['Mai Phúc', 63],
            ['Hoàng Yến', 88],
            ['Ngô Tài', 30]
          ],
          fill: { range: 'C2:C8', solution: '=IF(B2>=90,"Giỏi",IF(B2>=75,"Khá",IF(B2>=50,"Trung bình","Yếu")))' },
          mustUse: ['IF'],
          hint: '4 mức cần 3 IF, xét từ cao xuống thấp: <code>=IF(B2>=90,"Giỏi",IF(B2>=75,"Khá",IF(B2>=50,"Trung bình","Yếu")))</code>.',
          explain: 'Trần Hùng 74 điểm chỉ thiếu 1 điểm nên là "Trung bình", còn Lê Minh đúng 75 là "Khá". Kiểm tra các giá trị ngay ranh giới là cách tốt để phát hiện công thức sai.'
        },
        {
          id: 'ex2',
          task: 'Tính <b>Hoa hồng</b> ở cột C theo bậc doanh số trong bảng tham số G1:H3. Doanh số từ G1 trở lên hưởng tỉ lệ H1, từ G2 trở lên hưởng H2, còn lại hưởng H3. Hoa hồng = doanh số × tỉ lệ. Viết ở <code>C2</code> rồi sao chép xuống C3:C7.',
          data: [
            ['Nhân viên', 'Doanh số', 'Hoa hồng', '', '', '', 500000000, 0.05],
            ['Phạm Thu', 620000000, '', '', '', '', 200000000, 0.03],
            ['Đỗ Quang', 310000000, '', '', '', 'Còn lại', '', 0.01],
            ['Vũ Hà', 150000000],
            ['Bùi Nam', 500000000],
            ['Hoàng Yến', 199000000],
            ['Ngô Tài', 845000000]
          ],
          fill: { range: 'C2:C7', solution: '=B2*IF(B2>=$G$1,$H$1,IF(B2>=$G$2,$H$2,$H$3))' },
          mustUse: ['IF'],
          fmt: { B: 'int', C: 'int', G: 'int', H: 'pct0' },
          hint: 'Dùng IF lồng để tìm tỉ lệ, rồi nhân với doanh số: <code>=B2*IF(B2>=$G$1,$H$1,IF(B2>=$G$2,$H$2,$H$3))</code>. Viết <code>=IF(B2>=$G$1,B2*$H$1,IF(...))</code> cũng đúng.',
          explain: 'Đặt các ngưỡng và tỉ lệ vào ô riêng. Khi công ty đổi chính sách, chỉ cần sửa bảng tham số, không phải sửa công thức.'
        },
        {
          id: 'ex3',
          task: 'Tính <b>Phụ cấp chức vụ</b> ở cột C theo bảng F2:G4: "Trưởng phòng" hưởng G2, "Phó phòng" hưởng G3, các chức vụ khác hưởng G4. Viết ở <code>C2</code> rồi sao chép xuống C3:C7.',
          data: [
            ['Nhân viên', 'Chức vụ', 'Phụ cấp', '', '', 'Chức vụ', 'Phụ cấp'],
            ['Nguyễn Lan', 'Trưởng phòng', '', '', '', 'Trưởng phòng', 3000000],
            ['Trần Hùng', 'Nhân viên', '', '', '', 'Phó phòng', 2000000],
            ['Lê Minh', 'Phó phòng', '', '', '', 'Khác', 500000],
            ['Đinh Hoa', 'Nhân viên'],
            ['Mai Phúc', 'Trưởng phòng'],
            ['Hoàng Yến', 'Thực tập']
          ],
          fill: { range: 'C2:C7', solution: '=IF(B2=$F$2,$G$2,IF(B2=$F$3,$G$3,$G$4))' },
          mustUse: ['IF'],
          fmt: { C: 'int', G: 'int' },
          hint: 'So sánh chữ bằng dấu =: <code>=IF(B2="Trưởng phòng",$G$2,IF(B2="Phó phòng",$G$3,$G$4))</code>. Dùng ô F2, F3 thay cho chữ cũng được: <code>=IF(B2=$F$2,$G$2,IF(B2=$F$3,$G$3,$G$4))</code>.',
          explain: 'So sánh chữ trong Excel không phân biệt hoa thường, nhưng phải đúng chính tả và không thừa dấu cách.'
        }
      ]
    },

    /* ---------------- Bài 3 ---------------- */
    {
      id: 'and-or-not',
      title: 'AND, OR, NOT: kết hợp nhiều điều kiện',
      minutes: 14,
      funcs: ['AND', 'OR', 'NOT'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Quy chế công ty: nhân viên được <b>thưởng chuyên cần 1 triệu</b> khi đủ từ 24 ngày công <b>VÀ</b> KPI từ 80% trở lên. Thiếu một trong hai là không có thưởng.</p><p>Một IF chỉ hỏi được một câu. Hàm <b>AND</b>, <b>OR</b>, <b>NOT</b> gộp nhiều câu hỏi thành một đáp án TRUE/FALSE duy nhất, rồi đưa vào phần điều kiện của IF.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> <b>AND</b> giống cánh cửa có 2 ổ khoá, phải mở được <b>cả hai</b> mới vào được. <b>OR</b> giống căn phòng có 2 lối vào, đi <b>lối nào cũng được</b>. <b>NOT</b> là nói ngược lại: đúng thành sai, sai thành đúng.' },
        {
          t: 'table',
          head: ['Hàm', 'Trả về TRUE khi', 'Ví dụ'],
          rows: [
            ['AND (và)', '<b>Tất cả</b> điều kiện đều đúng', '=AND(B2>=24, C2>=80%)'],
            ['OR (hoặc)', '<b>Ít nhất một</b> điều kiện đúng', '=OR(B2>=1000000, C2="VIP")'],
            ['NOT (không phải)', 'Điều kiện bên trong <b>sai</b> (đảo ngược)', '=NOT(D2="Ngừng kinh doanh")']
          ]
        },
        { t: 'h', text: 'IF kết hợp AND: vẫn là 3 phần quen thuộc' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu. Cả cụm AND(...) là phần Điều kiện',
          data: [
            ['Nhân viên', 'Ngày công', 'KPI', 'Thưởng'],
            ['Nguyễn Lan', 26, 0.92, ''],
            ['Trần Hùng', 25, 0.71, '=IF(AND(B3>=24,C3>=80%),1000000,0)'],
            ['Lê Minh', 22, 0.95, '=IF(AND(B4>=24,C4>=80%),1000000,0)']
          ],
          fmt: { C: 'pct0', D: 'int' },
          cell: 'D2',
          formula: '=IF(AND(B2>=24,C2>=80%),1000000,0)',
          parts: [
            { label: 'Điều kiện', desc: 'Hàm AND hỏi 2 câu cùng lúc: ngày công ở B2 từ 24 trở lên? KPI ở C2 từ 80% trở lên? Chỉ khi <b>cả hai</b> đúng thì AND mới trả về TRUE.' },
            { label: 'Nếu đúng thì', desc: 'Thưởng <code>1000000</code> đồng. Số nên không cần ngoặc kép, và không gõ dấu chấm ngăn cách.', range: 'D2' },
            { label: 'Nếu sai thì', desc: 'Không đủ điều kiện thì thưởng <code>0</code>.', range: 'D2' }
          ],
          note: 'AND nằm bên trong IF. Cấu trúc vẫn là "nếu (điều kiện) thì… không thì…", chỉ có điều kiện là gồm 2 câu hỏi.'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Xem Excel xét Trần Hùng. Bấm Tiếp hoặc Tự chạy',
          data: [
            ['Nhân viên', 'Ngày công', 'KPI', 'Thưởng'],
            ['Nguyễn Lan', 26, 0.92, '=IF(AND(B2>=24,C2>=80%),1000000,0)'],
            ['Trần Hùng', 25, 0.71, ''],
            ['Lê Minh', 22, 0.95, '=IF(AND(B4>=24,C4>=80%),1000000,0)']
          ],
          fmt: { C: 'pct0', D: 'int' },
          cell: 'D3',
          formula: '=IF(AND(B3>=24,C3>=80%),1000000,0)',
          steps: [
            { html: 'Câu hỏi thứ nhất của AND: ngày công ở <b>B3</b> là 25. 25 &gt;= 24? <b>Đúng</b>.', hl: [['B3', 1]], select: 'B3' },
            { html: 'Câu hỏi thứ hai: KPI ở <b>C3</b> là 71%. 71% &gt;= 80%? <b>Sai</b>.', hl: [['B3', 1], ['C3', 4]], select: 'C3' },
            { html: 'AND cần <b>tất cả</b> đều đúng. Có một câu sai nên AND trả về <b>FALSE</b>.', hl: [['B3:C3', 0]], select: 'C3' },
            { html: 'Điều kiện của IF là FALSE, nên Excel chọn phần <b>nếu sai thì</b>: <b>0</b>. Kết quả hiện ở D3.', hl: [['B3:C3', 0], ['D3', 2]], select: 'D3' },
            { html: 'Nguyễn Lan (26 công, 92%) đúng cả hai câu nên AND ra TRUE, D2 nhận <b>1.000.000</b>. Lê Minh KPI cao nhưng thiếu công nên cũng chỉ được 0.', hl: [['B2:C2', 1], ['D2', 1], ['B4', 4]], select: 'D2' }
          ]
        },
        { t: 'h', text: 'Hàm OR: chỉ cần một điều kiện đúng' },
        { t: 'p', html: 'OR viết giống hệt AND, nhưng chỉ cần <b>một</b> điều kiện đúng là cả cụm ra TRUE.' },
        {
          t: 'example',
          title: 'Miễn phí giao hàng nếu đơn từ 1 triệu HOẶC khách VIP',
          data: [
            ['Mã đơn', 'Giá trị', 'Hạng khách', 'Phí giao'],
            ['DH201', 1250000, 'Thường', '=IF(OR(B2>=1000000,C2="VIP"),0,25000)'],
            ['DH202', 430000, 'VIP', '=IF(OR(B3>=1000000,C3="VIP"),0,25000)'],
            ['DH203', 560000, 'Thường', '=IF(OR(B4>=1000000,C4="VIP"),0,25000)']
          ],
          fmt: { B: 'int', D: 'int' },
          note: 'DH201 đủ giá trị, DH202 là khách VIP, nên đều miễn phí. Chỉ DH203 phải trả phí vì không thoả điều kiện nào.'
        },
        { t: 'h', text: 'Hàm NOT: đảo ngược điều kiện' },
        { t: 'p', html: 'NOT chỉ nhận <b>một</b> điều kiện và đổi đúng thành sai, sai thành đúng. Hay dùng để nói "không phải…".' },
        {
          t: 'example',
          title: 'Chỉ nhắc đặt hàng cho mặt hàng KHÔNG ngừng kinh doanh',
          data: [
            ['Mã hàng', 'Trạng thái', 'Còn bán?', 'Ghi chú'],
            ['GA4', 'Đang bán', '=NOT(B2="Ngừng KD")', '=IF(NOT(B2="Ngừng KD"),"Theo dõi tồn kho","Bỏ qua")'],
            ['MI02', 'Ngừng KD', '=NOT(B3="Ngừng KD")', '=IF(NOT(B3="Ngừng KD"),"Theo dõi tồn kho","Bỏ qua")']
          ],
          note: '<code>NOT(B2="Ngừng KD")</code> cho kết quả giống <code>B2&lt;&gt;"Ngừng KD"</code>. NOT có ích hơn khi cần đảo cả một cụm, ví dụ <code>NOT(OR(…))</code>.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'ThuongChuyenCan.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Bấm tab <b>Formulas</b>.' },
            { id: 'formulas.logical', n: 2, text: 'Bấm <b>Logical</b>: AND, OR, NOT, IF đều nằm trong danh sách này.' }
          ],
          caption: 'Khi lồng AND vào IF, gõ trực tiếp vào ô sẽ nhanh và dễ kiểm soát hơn dùng hộp thoại.'
        },
        {
          t: 'steps',
          title: 'Gõ IF kết hợp AND',
          items: [
            'Bấm ô <b>D2</b>, gõ <code>=IF(AND(</code>',
            'Gõ các câu hỏi, ngăn cách bằng dấu phẩy: <code>B2&gt;=24,C2&gt;=80%</code>',
            'Gõ <code>)</code> để <b>đóng AND</b>, rồi gõ dấu phẩy. Đây là chỗ hay quên nhất.',
            'Gõ phần nếu đúng và nếu sai: <code>1000000,0)</code> rồi nhấn <kbd>Enter</kbd>.',
            'Chép công thức xuống các dòng còn lại bằng cách nhấp đúp vào chấm vuông nhỏ ở góc ô.'
          ]
        },
        { t: 'warn', html: 'Không viết điều kiện kép kiểu toán học như <code>=IF(50&lt;=B2&lt;=80, …)</code>. Excel không hiểu cách viết đó và cho kết quả sai mà <b>không báo lỗi</b>. Phải viết <code>=IF(AND(B2&gt;=50,B2&lt;=80), …)</code>.' },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Viết khoảng kiểu toán học', '<code>50&lt;=B2&lt;=80</code>', '<code>AND(B2&gt;=50,B2&lt;=80)</code>'],
            ['Nhầm AND với OR', '"Nằm trong khoảng" mà dùng OR: số nào cũng thoả', 'Phải thoả tất cả: dùng AND. Chỉ cần một: dùng OR'],
            ['Quên đóng ngoặc AND', '<code>=IF(AND(B2&gt;=24,C2&gt;=80%,1000000,0)</code>', 'Đóng AND trước: <code>…80%),1000000,0)</code>'],
            ['Viết thiếu vế so sánh', '<code>AND(B2&gt;=5000000,&lt;=10000000)</code>', 'Mỗi điều kiện phải đủ ô và số: <code>B2&lt;=10000000</code>']
          ]
        },
        { t: 'tip', html: 'Muốn hiểu vì sao IF ra kết quả lạ, tạm gõ riêng phần AND/OR vào một cột trống (ví dụ <code>=AND(B2&gt;=24,C2&gt;=80%)</code>) để xem TRUE/FALSE của từng dòng. Kiểm tra xong thì xoá cột đó đi.' },
        {
          t: 'quiz', id: 'q1',
          q: 'B2 = 23, C2 = 90%. Công thức =IF(AND(B2>=24,C2>=80%),"Thưởng","Không") trả về gì?',
          options: ['Thưởng', 'Không', 'TRUE', '#VALUE!'],
          answer: 1,
          explain: 'B2>=24 sai nên AND trả về FALSE, dù C2 đạt. IF chọn phần nếu sai thì: "Không".'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Kiểm tra số tiền ở B2 nằm trong khoảng từ 5 triệu đến 10 triệu, công thức nào đúng?',
          options: ['=5000000<=B2<=10000000', '=OR(B2>=5000000,B2<=10000000)', '=AND(B2>=5000000,B2<=10000000)', '=AND(B2>=5000000;<=10000000)'],
          answer: 2,
          explain: 'Nằm trong khoảng nghĩa là thoả cả hai điều kiện, nên dùng AND với hai so sánh đầy đủ. OR ở đây luôn đúng với mọi số.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'B2 = 430000, C2 = "VIP". Công thức =IF(OR(B2>=1000000,C2="VIP"),0,25000) trả về gì?',
          options: ['0', '25000', 'TRUE', 'FALSE'],
          answer: 0,
          explain: 'Giá trị đơn chưa đủ 1 triệu nhưng khách là VIP. OR chỉ cần một điều kiện đúng nên ra TRUE, IF trả về 0.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tính <b>Thưởng chuyên cần</b> ở cột D. Nhân viên có ngày công từ <b>G1</b> trở lên VÀ KPI từ <b>G2</b> trở lên thì được thưởng số tiền ở <b>G3</b>, không thì 0. Viết ở <code>D2</code> rồi sao chép xuống D3:D7.',
          data: [
            ['Nhân viên', 'Ngày công', 'KPI', 'Thưởng', '', 'Công tối thiểu', 24],
            ['Nguyễn Lan', 26, 0.92, '', '', 'KPI tối thiểu', 0.8],
            ['Trần Hùng', 25, 0.71, '', '', 'Mức thưởng', 1000000],
            ['Lê Minh', 22, 0.95],
            ['Đinh Hoa', 24, 0.8],
            ['Mai Phúc', 20, 0.6],
            ['Hoàng Yến', 26, 0.85]
          ],
          fill: { range: 'D2:D7', solution: '=IF(AND(B2>=$G$1,C2>=$G$2),$G$3,0)' },
          mustUse: ['AND'],
          fmt: { C: 'pct0', D: 'int', G: 'raw' },
          hint: 'Điều kiện là cụm <code>AND(B2>=$G$1,C2>=$G$2)</code>. Công thức: <code>=IF(AND(B2>=$G$1,C2>=$G$2),$G$3,0)</code>. Nhớ khoá các ô tham số bằng $.',
          explain: 'Đinh Hoa vừa đúng ngưỡng ở cả hai tiêu chí nên vẫn được thưởng, vì dùng >=.'
        },
        {
          id: 'ex2',
          task: 'Tính <b>Phí giao</b> ở cột D. Miễn phí (ghi 0) nếu giá trị đơn từ <b>G1</b> trở lên HOẶC hạng khách là "VIP", không thì tính phí ở <b>G2</b>. Viết ở <code>D2</code> rồi sao chép xuống D3:D7.',
          data: [
            ['Mã đơn', 'Giá trị', 'Hạng khách', 'Phí giao', '', 'Ngưỡng miễn phí', 1000000],
            ['DH201', 1250000, 'Thường', '', '', 'Phí giao', 25000],
            ['DH202', 430000, 'VIP'],
            ['DH203', 560000, 'Thường'],
            ['DH204', 1000000, 'Thường'],
            ['DH205', 2100000, 'VIP'],
            ['DH206', 99000, 'Thường']
          ],
          fill: { range: 'D2:D7', solution: '=IF(OR(B2>=$G$1,C2="VIP"),0,$G$2)' },
          mustUse: ['OR'],
          fmt: { B: 'int', D: 'int', G: 'int' },
          hint: 'Chỉ cần một điều kiện đúng nên dùng OR: <code>=IF(OR(B2>=$G$1,C2="VIP"),0,$G$2)</code>.',
          explain: 'DH205 thoả cả hai điều kiện, OR vẫn chỉ trả về một TRUE nên phí vẫn là 0.'
        },
        {
          id: 'ex3',
          task: 'Tính <b>Số lượng cần đặt thêm</b> ở cột E. Nếu tồn kho <b>nhỏ hơn</b> mức tối thiểu VÀ mặt hàng <b>không phải</b> "Ngừng KD" thì đặt thêm = mức tối thiểu × 2 − tồn kho, không thì 0. Dùng hàm NOT cho điều kiện thứ hai. Viết ở <code>E2</code> rồi sao chép xuống E3:E7.',
          data: [
            ['Mã hàng', 'Tồn kho', 'Tối thiểu', 'Trạng thái', 'Cần đặt'],
            ['GA4', 35, 50, 'Đang bán'],
            ['BB01', 120, 100, 'Đang bán'],
            ['MI02', 4, 10, 'Ngừng KD'],
            ['KG05', 18, 40, 'Đang bán'],
            ['SO03', 60, 60, 'Đang bán'],
            ['BH07', 2, 20, 'Ngừng KD']
          ],
          fill: { range: 'E2:E7', solution: '=IF(AND(B2<C2,NOT(D2="Ngừng KD")),C2*2-B2,0)' },
          mustUse: ['NOT'],
          fmt: { E: 'int' },
          hint: 'Lồng NOT vào trong AND: điều kiện là <code>AND(B2<C2,NOT(D2="Ngừng KD"))</code>. Công thức: <code>=IF(AND(B2<C2,NOT(D2="Ngừng KD")),C2*2-B2,0)</code>.',
          explain: '<code>NOT(D2="Ngừng KD")</code> cho kết quả giống <code>D2<>"Ngừng KD"</code>. SO03 tồn đúng bằng mức tối thiểu, không "nhỏ hơn", nên không cần đặt.'
        }
      ]
    },

    /* ---------------- Bài 4 ---------------- */
    {
      id: 'ifs-switch',
      title: 'IFS và SWITCH: thay thế IF lồng nhau',
      minutes: 12,
      funcs: ['IFS', 'SWITCH'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Công thức xếp loại 4 mức bằng IF lồng có 3 chữ IF và 3 dấu ngoặc đóng ở cuối. Đồng nghiệp mở file ra nhìn mà hoa mắt, sửa một chỗ là dễ hỏng cả công thức.</p><p>Từ Excel 2019 và Microsoft 365 có hai hàm giúp viết gọn hơn: <b>IFS</b> cho điều kiện theo khoảng (từ 90, từ 75…) và <b>SWITCH</b> cho việc so khớp đúng một giá trị (mã vùng, mã ca, chức vụ).</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> <b>IFS</b> giống một danh sách câu hỏi xếp hàng. Excel đọc từ trên xuống, gặp câu trả lời "đúng" đầu tiên thì lấy kết quả đi kèm và dừng. <b>SWITCH</b> giống bảng giá dán ở quầy: nhìn mã "HN" thì đọc giá 30.000, không có mã trong bảng thì lấy giá mặc định.' },
        { t: 'warn', html: 'Excel 2016 trở về trước không có IFS và SWITCH, file mở ra sẽ báo lỗi <code>#NAME?</code>. Nếu gửi file cho đối tác dùng Excel cũ, hãy dùng IF lồng nhau.' },
        { t: 'h', text: 'Hàm IFS: các cặp "điều kiện, kết quả"' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu. IFS gồm các cặp điều kiện và kết quả nối tiếp nhau',
          data: [
            ['Nhân viên', 'Điểm KPI', 'Xếp loại'],
            ['Nguyễn Lan', 93, ''],
            ['Trần Hùng', 68, '=IFS(B3>=90,"Giỏi",B3>=75,"Khá",B3>=50,"Trung bình",TRUE,"Yếu")'],
            ['Lê Minh', 35, '=IFS(B4>=90,"Giỏi",B4>=75,"Khá",B4>=50,"Trung bình",TRUE,"Yếu")']
          ],
          cell: 'C2',
          formula: '=IFS(B2>=90,"Giỏi",B2>=75,"Khá",B2>=50,"Trung bình",TRUE,"Yếu")',
          parts: [
            { label: 'Điều kiện 1', desc: 'Câu hỏi đầu tiên: điểm ở B2 từ 90 trở lên?' },
            { label: 'Kết quả 1', desc: 'Nếu điều kiện 1 đúng thì ra "Giỏi" và dừng.', range: 'C2' },
            { label: 'Điều kiện 2', desc: 'Câu hỏi thứ hai: từ 75 trở lên?' },
            { label: 'Kết quả 2', desc: 'Nếu điều kiện 2 đúng thì ra "Khá".', range: 'C2' },
            { label: 'Điều kiện 3', desc: 'Câu hỏi thứ ba: từ 50 trở lên?' },
            { label: 'Kết quả 3', desc: 'Nếu điều kiện 3 đúng thì ra "Trung bình".', range: 'C2' },
            { label: 'Còn lại', desc: '<code>TRUE</code> luôn đúng, nên mọi trường hợp chưa khớp câu nào sẽ rơi vào đây. Đây là cách tạo phần "không thì" cho IFS.' },
            { label: 'Kết quả còn lại', desc: 'Không qua câu hỏi nào thì ra "Yếu".', range: 'C2' }
          ],
          note: 'So với IF lồng: không cần lặp chữ IF, không có chuỗi ngoặc đóng <code>)))</code> ở cuối. Thiếu cặp <code>TRUE,"Yếu"</code> thì dòng không khớp điều kiện nào sẽ báo lỗi <code>#N/A</code>.'
        },
        { t: 'h', text: 'Excel tính IFS như thế nào?' },
        {
          t: 'walk',
          title: 'Xem Excel xếp loại Trần Hùng (68 điểm). Bấm Tiếp hoặc Tự chạy',
          data: [
            ['Nhân viên', 'Điểm KPI', 'Xếp loại'],
            ['Nguyễn Lan', 93, '=IFS(B2>=90,"Giỏi",B2>=75,"Khá",B2>=50,"Trung bình",TRUE,"Yếu")'],
            ['Trần Hùng', 68, ''],
            ['Lê Minh', 35, '=IFS(B4>=90,"Giỏi",B4>=75,"Khá",B4>=50,"Trung bình",TRUE,"Yếu")']
          ],
          cell: 'C3',
          formula: '=IFS(B3>=90,"Giỏi",B3>=75,"Khá",B3>=50,"Trung bình",TRUE,"Yếu")',
          steps: [
            { html: 'Excel đọc ô <b>B3</b>: Trần Hùng được <b>68</b> điểm.', hl: [['B3', 0]], select: 'B3' },
            { html: 'Cặp 1: 68 &gt;= 90? <b>Sai</b>. Bỏ qua "Giỏi", xét cặp tiếp theo.', hl: [['B3', 0]], select: 'B3' },
            { html: 'Cặp 2: 68 &gt;= 75? <b>Sai</b>. Bỏ qua "Khá".', hl: [['B3', 2]], select: 'B3' },
            { html: 'Cặp 3: 68 &gt;= 50? <b>Đúng</b>. Excel lấy <b>"Trung bình"</b> và dừng, không xét cặp TRUE nữa.', hl: [['B3', 4], ['C3', 5]], select: 'C3' },
            { html: 'Lê Minh (35 điểm) sai cả 3 cặp đầu, nên rơi vào cặp <code>TRUE,"Yếu"</code>. Kết quả cả bảng hiện ở cột C.', hl: [['B4', 0], ['C2:C4', 1]], select: 'C4' }
          ]
        },
        { t: 'p', html: 'IFS cũng dừng ở điều kiện <b>đúng đầu tiên</b>, nên vẫn phải xếp các mức từ cao xuống thấp như IF lồng.' },
        { t: 'h', text: 'Hàm SWITCH: so khớp đúng một giá trị' },
        { t: 'p', html: 'SWITCH nhìn vào <b>một ô</b>, so với từng giá trị trong danh sách. Khớp giá trị nào thì lấy kết quả đi kèm. Không khớp giá trị nào thì lấy <b>giá trị mặc định</b> ở cuối.' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem SWITCH đọc bảng giá ra sao',
          data: [
            ['Mã đơn', 'Vùng', 'Số kiện', 'Đơn giá/kiện'],
            ['VC01', 'HN', 3, ''],
            ['VC02', 'HCM', 5, '=SWITCH(B3,"HN",30000,"DN",45000,"HCM",25000,60000)'],
            ['VC03', 'CT', 2, '=SWITCH(B4,"HN",30000,"DN",45000,"HCM",25000,60000)']
          ],
          fmt: { D: 'int' },
          cell: 'D2',
          formula: '=SWITCH(B2,"HN",30000,"DN",45000,"HCM",25000,60000)',
          parts: [
            { label: 'Xét ô nào', desc: 'Ô cần so khớp. Ở đây là ô B2, đang chứa mã vùng "HN".' },
            { label: 'Nếu bằng', desc: 'Giá trị thứ nhất để so: "HN".' },
            { label: 'Thì lấy', desc: 'Khớp "HN" thì đơn giá là 30000.', range: 'D2' },
            { label: 'Nếu bằng', desc: 'Giá trị thứ hai: "DN".' },
            { label: 'Thì lấy', desc: 'Khớp "DN" thì đơn giá 45000.', range: 'D2' },
            { label: 'Nếu bằng', desc: 'Giá trị thứ ba: "HCM".' },
            { label: 'Thì lấy', desc: 'Khớp "HCM" thì đơn giá 25000.', range: 'D2' },
            { label: 'Mặc định', desc: 'Đối số lẻ cuối cùng, không đi theo cặp. Vùng không có trong danh sách (như "CT") lấy 60000. Bỏ trống thì báo #N/A.', range: 'D4' }
          ]
        },
        {
          t: 'example',
          title: 'Đơn giá vận chuyển mỗi kiện theo mã vùng',
          data: [
            ['Mã đơn', 'Vùng', 'Số kiện', 'Đơn giá/kiện', 'Thành tiền'],
            ['VC01', 'HN', 3, '=SWITCH(B2,"HN",30000,"DN",45000,"HCM",25000,60000)', '=C2*D2'],
            ['VC02', 'HCM', 5, '=SWITCH(B3,"HN",30000,"DN",45000,"HCM",25000,60000)', '=C3*D3'],
            ['VC03', 'CT', 2, '=SWITCH(B4,"HN",30000,"DN",45000,"HCM",25000,60000)', '=C4*D4']
          ],
          fmt: { D: 'int', E: 'int' },
          note: 'Viết bằng IF lồng sẽ cần 3 hàm IF và lặp lại B2 ba lần. SWITCH chỉ ghi B2 một lần.'
        },
        {
          t: 'table',
          head: ['', 'IF lồng nhau', 'IFS', 'SWITCH'],
          rows: [
            ['Phiên bản', 'Mọi phiên bản', 'Excel 2019, 365', 'Excel 2019, 365'],
            ['Kiểu điều kiện', 'Bất kỳ', 'Bất kỳ (khoảng, so sánh)', 'Chỉ so khớp bằng nhau'],
            ['Trường hợp còn lại', 'Phần "nếu sai thì" của IF trong cùng', 'Thêm cặp TRUE, kết quả', 'Đối số lẻ cuối cùng'],
            ['Dễ đọc', 'Kém khi nhiều mức', 'Tốt', 'Rất tốt']
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'XepLoai.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Bấm tab <b>Formulas</b>.' },
            { id: 'formulas.logical', n: 2, text: 'Bấm <b>Logical</b>, chọn <b>IFS</b> hoặc <b>SWITCH</b>. Không thấy hai hàm này nghĩa là Excel của bạn là bản cũ.' }
          ]
        },
        {
          t: 'steps',
          title: 'Gõ IFS trực tiếp',
          items: [
            'Bấm ô <b>C2</b>, gõ <code>=IFS(</code>',
            'Gõ từng cặp, mỗi cặp là "điều kiện, kết quả": <code>B2&gt;=90,"Giỏi",</code> rồi <code>B2&gt;=75,"Khá",</code> rồi <code>B2&gt;=50,"Trung bình",</code>',
            'Gõ cặp còn lại: <code>TRUE,"Yếu")</code>',
            'Nhấn <kbd>Enter</kbd>, rồi nhấp đúp vào chấm vuông nhỏ ở góc ô để chép xuống.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['IFS thiếu cặp còn lại', '<code>=IFS(B2&gt;=90,"Giỏi",B2&gt;=50,"TB")</code>: điểm 40 báo #N/A', 'Thêm <code>TRUE,"Yếu"</code> ở cuối'],
            ['Thêm giá trị lẻ cuối IFS', '<code>=IFS(B2&gt;=90,"Giỏi","Yếu")</code> báo lỗi', 'Giá trị lẻ mặc định là cách của SWITCH, IFS phải dùng cặp TRUE'],
            ['SWITCH dùng so sánh &gt;=', '<code>=SWITCH(B2,&gt;=90,"Giỏi")</code> không hợp lệ', 'Xét khoảng thì dùng IFS'],
            ['Mở file trên Excel cũ', 'Excel 2016 hiện #NAME?', 'Dùng IF lồng nhau']
          ]
        },
        { t: 'tip', html: 'SWITCH chỉ so sánh "bằng". Muốn xét khoảng bằng SWITCH có mẹo <code>=SWITCH(TRUE,B2&gt;=90,"Giỏi",B2&gt;=75,"Khá","Yếu")</code>, nhưng trường hợp đó dùng IFS sẽ dễ hiểu hơn.' },
        {
          t: 'quiz', id: 'q1',
          q: 'B2 = "DN". Công thức =SWITCH(B2,"HN",30000,"HCM",25000,60000) trả về gì?',
          options: ['30000', '25000', '60000', '#N/A'],
          answer: 2,
          explain: '"DN" không khớp "HN" hay "HCM" nên SWITCH trả về giá trị mặc định ở cuối: 60000.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'B2 = 40. Công thức =IFS(B2>=90,"Giỏi",B2>=75,"Khá",B2>=50,"TB") trả về gì?',
          options: ['TB', 'Yếu', 'FALSE', '#N/A'],
          answer: 3,
          explain: 'Không điều kiện nào đúng và không có cặp TRUE ở cuối, nên IFS báo lỗi #N/A.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Tính phụ cấp ca theo mã ca ở B2: "S" 50.000, "C" 70.000, "D" 120.000. Hàm nào gọn nhất?',
          options: ['IFS', 'SWITCH', 'AND', 'NOT'],
          answer: 1,
          explain: 'Đây là so khớp đúng một giá trị (mã ca), đúng sở trường của SWITCH: <code>=SWITCH(B2,"S",50000,"C",70000,"D",120000)</code>.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Dùng hàm <b>IFS</b> tính <b>Thưởng Tết</b> ở cột D = lương × hệ số theo thâm niên: từ 10 năm hệ số 3, từ 5 năm hệ số 2, từ 1 năm hệ số 1, dưới 1 năm hệ số 0,5. Viết ở <code>D2</code> rồi sao chép xuống D3:D7.',
          data: [
            ['Nhân viên', 'Lương', 'Thâm niên (năm)', 'Thưởng Tết'],
            ['Nguyễn Lan', 18000000, 12],
            ['Trần Hùng', 12000000, 6],
            ['Lê Minh', 9500000, 1],
            ['Đinh Hoa', 8000000, 0.5],
            ['Mai Phúc', 15000000, 5],
            ['Hoàng Yến', 11000000, 3]
          ],
          fill: { range: 'D2:D7', solution: '=B2*IFS(C2>=10,3,C2>=5,2,C2>=1,1,TRUE,0.5)' },
          mustUse: ['IFS'],
          fmt: { B: 'int', D: 'int' },
          hint: 'Dùng IFS tìm hệ số, rồi nhân với lương. Nhớ cặp cuối <code>TRUE,0.5</code> cho người dưới 1 năm: <code>=B2*IFS(C2>=10,3,C2>=5,2,C2>=1,1,TRUE,0.5)</code>.',
          explain: 'IFS xét từ trái sang phải và dừng ở điều kiện đúng đầu tiên, nên vẫn phải xếp từ mức cao xuống mức thấp.'
        },
        {
          id: 'ex2',
          task: 'Dùng hàm <b>SWITCH</b> tính <b>Cước</b> ở cột D = số kiện × đơn giá theo vùng: "HN" lấy <b>H1</b>, "DN" lấy <b>H2</b>, "HCM" lấy <b>H3</b>, vùng khác lấy <b>H4</b>. Viết ở <code>D2</code> rồi sao chép xuống D3:D7.',
          data: [
            ['Mã đơn', 'Vùng', 'Số kiện', 'Cước', '', '', 'HN', 30000],
            ['VC01', 'HN', 3, '', '', '', 'DN', 45000],
            ['VC02', 'HCM', 5, '', '', '', 'HCM', 25000],
            ['VC03', 'CT', 2, '', '', '', 'Khác', 60000],
            ['VC04', 'DN', 4],
            ['VC05', 'HN', 10],
            ['VC06', 'HP', 1]
          ],
          fill: { range: 'D2:D7', solution: '=C2*SWITCH(B2,"HN",$H$1,"DN",$H$2,"HCM",$H$3,$H$4)' },
          mustUse: ['SWITCH'],
          fmt: { D: 'int', H: 'int' },
          hint: 'SWITCH tìm đơn giá, rồi nhân với số kiện: <code>=C2*SWITCH(B2,"HN",$H$1,"DN",$H$2,"HCM",$H$3,$H$4)</code>. Có thể dùng <code>$G$1</code> thay cho <code>"HN"</code>.',
          explain: 'Đối số cuối cùng không đi theo cặp ($H$4) là giá trị mặc định, áp dụng cho các vùng CT, HP.'
        },
        {
          id: 'ex3',
          task: 'Dùng <b>IFS</b> đánh giá giao hàng ở cột D. Số ngày trễ = ngày giao − hạn giao. Nếu số ngày trễ từ 0 trở xuống: "Đúng hạn"; từ 1 đến 2: "Trễ nhẹ"; còn lại: "Trễ nặng". Viết ở <code>D2</code> rồi sao chép xuống D3:D6.',
          data: [
            ['Mã đơn', 'Hạn giao', 'Ngày giao', 'Đánh giá'],
            ['DH301', '10/06/2024', '09/06/2024'],
            ['DH302', '12/06/2024', '14/06/2024'],
            ['DH303', '15/06/2024', '15/06/2024'],
            ['DH304', '18/06/2024', '23/06/2024'],
            ['DH305', '20/06/2024', '21/06/2024']
          ],
          fill: { range: 'D2:D6', solution: '=IFS(C2-B2<=0,"Đúng hạn",C2-B2<=2,"Trễ nhẹ",TRUE,"Trễ nặng")' },
          mustUse: ['IFS'],
          strict: false,
          fmt: { B: 'date', C: 'date' },
          hint: 'Lấy <code>C2-B2</code> làm số ngày trễ: <code>=IFS(C2-B2<=0,"Đúng hạn",C2-B2<=2,"Trễ nhẹ",TRUE,"Trễ nặng")</code>.',
          explain: 'Ngày trong Excel là số nên trừ trực tiếp được. Ở đây dùng <= nên xét từ mức nhỏ lên mức lớn.'
        }
      ]
    },

    /* ---------------- Bài 5 ---------------- */
    {
      id: 'iferror',
      title: 'IFERROR, IFNA và các hàm kiểm tra IS',
      minutes: 14,
      funcs: ['IFERROR', 'IFNA', 'ISBLANK', 'ISNUMBER', 'ISTEXT'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Bạn gửi sếp báo cáo tỉ lệ hoàn thành kế hoạch của các chi nhánh. Chi nhánh mới chưa có kế hoạch, ô đó hiện <code>#DIV/0!</code>. Tệ hơn, ô tổng cộng ở cuối cột cũng báo lỗi theo.</p><p>Hàm <b>IFERROR</b> bắt lỗi và thay bằng giá trị bạn chọn (0, "", "Chưa có KH"). Các hàm <b>IS…</b> giúp kiểm tra dữ liệu trước khi tính, để lỗi không xảy ra ngay từ đầu.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> IFERROR giống "phương án dự phòng". Excel cứ <b>thử tính</b> như bình thường. Tính được thì hiện kết quả. Nếu hỏng (ra lỗi) thì hiện câu thay thế bạn đã chuẩn bị sẵn.' },
        {
          t: 'table',
          head: ['Lỗi', 'Nguyên nhân thường gặp'],
          rows: [
            ['#DIV/0!', 'Chia cho 0 hoặc cho ô trống (kế hoạch chưa nhập)'],
            ['#N/A', 'Hàm tra cứu không tìm thấy giá trị (VLOOKUP, MATCH, XLOOKUP)'],
            ['#VALUE!', 'Tính toán với chữ, ví dụ số lượng gõ thành "mười"'],
            ['#NAME?', 'Gõ sai tên hàm hoặc quên ngoặc kép quanh chữ']
          ]
        },
        { t: 'h', text: 'Công thức IFERROR gồm 2 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó làm gì',
          data: [
            ['Chi nhánh', 'Kế hoạch', 'Thực hiện', 'Tỉ lệ'],
            ['Hà Nội', 500, 540, '=IFERROR(C2/B2,0)'],
            ['Đà Nẵng', 0, 120, ''],
            ['Cần Thơ', 200, 150, '=IFERROR(C4/B4,0)']
          ],
          fmt: { D: 'pct0' },
          cell: 'D3',
          formula: '=IFERROR(C3/B3,0)',
          parts: [
            { label: 'Thử tính gì', desc: 'Công thức gốc: thực hiện chia kế hoạch. Đà Nẵng có kế hoạch bằng 0 nên phép chia này sẽ lỗi #DIV/0!.' },
            { label: 'Nếu lỗi thì hiện gì', desc: 'Giá trị thay thế khi phần thứ nhất bị lỗi. Ở đây là 0. Có thể ghi <code>""</code> (để trống) hoặc chữ như <code>"Chưa có KH"</code>.', range: 'D3' }
          ],
          note: 'Thực chất IFERROR cũng là "nếu… thì… không thì…": nếu có lỗi thì hiện phần 2, không lỗi thì giữ kết quả phần 1.'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Chi nhánh', 'Kế hoạch', 'Thực hiện', 'Tỉ lệ'],
            ['Hà Nội', 500, 540, '=IFERROR(C2/B2,0)'],
            ['Đà Nẵng', 0, 120, ''],
            ['Cần Thơ', 200, 150, '=IFERROR(C4/B4,0)']
          ],
          fmt: { D: 'pct0' },
          cell: 'D3',
          formula: '=IFERROR(C3/B3,0)',
          steps: [
            { html: 'Excel thử tính phần thứ nhất: <b>C3/B3</b> = 120 / 0.', hl: [['C3', 0], ['B3', 0]], select: 'B3' },
            { html: 'Chia cho 0 là không được, kết quả là lỗi <b>#DIV/0!</b>.', hl: [['B3', 4]], select: 'B3' },
            { html: 'IFERROR kiểm tra: kết quả có phải lỗi không? <b>Có</b>. Vậy bỏ kết quả lỗi, lấy phần thứ hai: <b>0</b>.', hl: [['B3', 4], ['D3', 1]], select: 'D3' },
            { html: 'Ô D3 hiện <b>0%</b> thay vì #DIV/0!. Ô tổng cộng phía dưới (nếu có) cũng không bị lỗi theo.', hl: [['D3', 1]], select: 'D3' },
            { html: 'Với Hà Nội: 540 / 500 tính được, <b>không lỗi</b>. IFERROR giữ nguyên kết quả <b>108%</b> ở D2.', hl: [['B2:C2', 0], ['D2', 0]], select: 'D2' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'BaoCaoKeHoach.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Bấm tab <b>Formulas</b>.' },
            { id: 'formulas.logical', n: 2, text: 'Bấm <b>Logical</b>, chọn <b>IFERROR</b> (hoặc <b>IFNA</b>).' }
          ],
          caption: 'Các hàm ISBLANK, ISNUMBER, ISTEXT nằm ở More Functions › Information. Gõ thẳng vào ô thì nhanh hơn.'
        },
        {
          t: 'steps',
          title: 'Bọc IFERROR quanh công thức có sẵn',
          items: [
            'Viết công thức gốc trước và kiểm tra nó đúng: ô D2 gõ <code>=C2/B2</code>.',
            'Bấm vào ô, nhấn <kbd>F2</kbd> để sửa. Đưa con trỏ ra sau dấu <code>=</code> và gõ <code>IFERROR(</code>',
            'Đưa con trỏ về cuối công thức, gõ <code>,0)</code>. Công thức thành <code>=IFERROR(C2/B2,0)</code>.',
            'Nhấn <kbd>Enter</kbd> rồi chép xuống các dòng còn lại.'
          ]
        },
        { t: 'warn', html: 'IFERROR che <b>mọi</b> lỗi, kể cả lỗi do bạn viết sai công thức. Đừng bọc IFERROR ngay từ đầu. Hãy viết công thức, kiểm tra đúng rồi mới bọc. Với hàm tra cứu, ưu tiên IFNA để vẫn nhìn thấy các lỗi khác.' },
        { t: 'h', text: 'Hàm IFNA: chỉ bắt lỗi "không tìm thấy"' },
        { t: 'p', html: 'IFNA viết giống IFERROR, nhưng chỉ thay lỗi <code>#N/A</code>. Các lỗi khác vẫn hiện ra để bạn sửa.' },
        {
          t: 'example',
          title: 'Tra đơn giá theo mã hàng, mã không có thì báo "Không có mã"',
          data: [
            ['Mã cần tra', 'Đơn giá', '', 'Mã hàng', 'Đơn giá'],
            ['GA4', '=IFNA(VLOOKUP(A2,$D$2:$E$4,2,FALSE),"Không có mã")', '', 'GA4', 68000],
            ['XY9', '=IFNA(VLOOKUP(A3,$D$2:$E$4,2,FALSE),"Không có mã")', '', 'BB01', 45000],
            ['', '', '', 'MI02', 250000]
          ],
          fmt: { B: 'int', E: 'int' },
          note: 'Hàm VLOOKUP sẽ học kỹ ở phần Tra cứu. Ở đây chỉ cần biết: không tìm thấy mã thì nó trả về #N/A, và IFNA thay lỗi đó bằng chữ dễ hiểu.'
        },
        { t: 'h', text: 'Các hàm kiểm tra IS…' },
        { t: 'p', html: 'Thay vì đợi lỗi rồi mới bắt, các hàm IS… hỏi trước "ô này có đúng kiểu không?" và trả về TRUE/FALSE. Đặt chúng vào phần điều kiện của IF.' },
        {
          t: 'table',
          head: ['Hàm', 'Trả về TRUE khi', 'Dùng ở văn phòng'],
          rows: [
            ['ISBLANK(ô)', 'Ô hoàn toàn trống', 'Chưa chấm công, chưa nhập ngày giao'],
            ['ISNUMBER(ô)', 'Ô chứa số (kể cả ngày)', 'Kiểm tra số lượng nhập đúng kiểu số'],
            ['ISTEXT(ô)', 'Ô chứa chữ', 'Phát hiện số bị lưu dạng chữ, ghi chú gõ nhầm vào cột số']
          ]
        },
        {
          t: 'example',
          title: 'Kiểm tra dữ liệu trước khi tính lương',
          data: [
            ['Nhân viên', 'Ngày công', 'Trống?', 'Là số?', 'Là chữ?', 'Ghi chú'],
            ['Nguyễn Lan', 24, '=ISBLANK(B2)', '=ISNUMBER(B2)', '=ISTEXT(B2)', '=IF(ISBLANK(B2),"Chưa chấm công",IF(ISTEXT(B2),"Sai kiểu dữ liệu","OK"))'],
            ['Trần Hùng', '', '=ISBLANK(B3)', '=ISNUMBER(B3)', '=ISTEXT(B3)', '=IF(ISBLANK(B3),"Chưa chấm công",IF(ISTEXT(B3),"Sai kiểu dữ liệu","OK"))'],
            ['Lê Minh', 'hai mươi', '=ISBLANK(B4)', '=ISNUMBER(B4)', '=ISTEXT(B4)', '=IF(ISBLANK(B4),"Chưa chấm công",IF(ISTEXT(B4),"Sai kiểu dữ liệu","OK"))']
          ],
          note: 'Cột F kết hợp hàm IS với IF lồng để ghi cảnh báo rõ ràng trước khi đưa dữ liệu vào tính toán.'
        },
        { t: 'tip', html: 'Ô có công thức trả về chuỗi rỗng <code>""</code> nhìn thì trống nhưng ISBLANK vẫn trả về FALSE. Khi đó kiểm tra bằng <code>B2=""</code> sẽ an toàn hơn.' },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Bọc IFERROR quá sớm', 'Gõ sai tên vùng nhưng ô chỉ hiện 0, không ai phát hiện', 'Kiểm tra công thức gốc đúng rồi mới bọc'],
            ['Thay lỗi bằng 0 làm sai trung bình', 'AVERAGE tính cả các số 0 thay thế', 'Thay bằng <code>""</code> để AVERAGE bỏ qua'],
            ['Quên phần thứ hai', '<code>=IFERROR(C2/B2)</code> báo lỗi công thức', 'IFERROR luôn cần đủ 2 phần'],
            ['Dùng ISBLANK với ô chứa <code>""</code>', 'Ô nhìn trống nhưng ISBLANK ra FALSE', 'Dùng <code>B2=""</code>']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'B2 = 0, C2 = 150. Công thức =IFERROR(C2/B2,"Chưa có KH") trả về gì?',
          options: ['0', '#DIV/0!', 'Chưa có KH', '150'],
          answer: 2,
          explain: 'C2/B2 chia cho 0 gây lỗi #DIV/0!, nên IFERROR trả về giá trị thay thế "Chưa có KH".'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Ô A2 chứa "125" (số bị lưu dạng chữ). =ISNUMBER(A2) trả về gì?',
          options: ['TRUE', 'FALSE', '125', '#VALUE!'],
          answer: 1,
          explain: 'Dù nhìn giống số, A2 đang là chữ nên ISNUMBER trả về FALSE, còn ISTEXT sẽ trả về TRUE.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'B2 = 400, C2 = 300. Công thức =IFERROR(C2/B2,0) trả về gì?',
          options: ['0', '75%', '#DIV/0!', 'TRUE'],
          answer: 1,
          explain: 'Phép chia 300/400 không lỗi nên IFERROR giữ nguyên kết quả 0,75 (75%). Phần thay thế chỉ dùng khi có lỗi.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tính <b>Tỉ lệ hoàn thành</b> ở cột D = thực hiện ÷ kế hoạch. Chi nhánh có kế hoạch bằng 0 hoặc để trống thì hiện 0 thay vì báo lỗi. Viết ở <code>D2</code> rồi sao chép xuống D3:D7.',
          data: [
            ['Chi nhánh', 'Kế hoạch', 'Thực hiện', 'Tỉ lệ'],
            ['Hà Nội', 500, 540],
            ['Hải Phòng', 0, 85],
            ['Đà Nẵng', 300, 255],
            ['Nha Trang', '', 40],
            ['TP.HCM', 800, 920],
            ['Cần Thơ', 200, 150]
          ],
          fill: { range: 'D2:D7', solution: '=IFERROR(C2/B2,0)' },
          mustUse: ['IFERROR'],
          fmt: { D: 'pct0' },
          hint: 'Thử tính <code>C2/B2</code>, nếu lỗi thì hiện 0: <code>=IFERROR(C2/B2,0)</code>.',
          explain: 'Chia cho ô trống cũng gây #DIV/0! giống chia cho 0. IFERROR xử lý được cả hai.'
        },
        {
          id: 'ex2',
          task: 'Tính <b>Lương theo công</b> ở cột D = lương cơ bản ÷ 26 × ngày công. Nếu ô ngày công <b>trống</b> thì ghi "Chưa chấm công". Dùng hàm ISBLANK. Viết ở <code>D2</code> rồi sao chép xuống D3:D7.',
          data: [
            ['Nhân viên', 'Lương cơ bản', 'Ngày công', 'Lương theo công'],
            ['Nguyễn Lan', 13000000, 26],
            ['Trần Hùng', 10400000, ''],
            ['Lê Minh', 9100000, 24],
            ['Đinh Hoa', 15600000, 22],
            ['Mai Phúc', 7800000, ''],
            ['Hoàng Yến', 11700000, 25]
          ],
          fill: { range: 'D2:D7', solution: '=IF(ISBLANK(C2),"Chưa chấm công",B2/26*C2)' },
          mustUse: ['ISBLANK'],
          fmt: { B: 'int', D: 'int' },
          hint: 'Điều kiện là <code>ISBLANK(C2)</code>: nếu trống thì ghi chữ, không thì tính lương. <code>=IF(ISBLANK(C2),"Chưa chấm công",B2/26*C2)</code>.',
          explain: 'Nếu không kiểm tra, ô trống được tính như 0 và nhân viên ra lương 0 đồng mà không ai để ý. Ghi chú rõ ràng giúp kế toán biết cần bổ sung dữ liệu.'
        },
        {
          id: 'ex3',
          task: 'Tính <b>Thành tiền</b> ở cột D = số lượng × đơn giá. Một số dòng số lượng bị gõ nhầm thành chữ. Dùng hàm ISNUMBER: nếu số lượng là số thì tính thành tiền, không thì ghi "Kiểm tra lại". Viết ở <code>D2</code> rồi sao chép xuống D3:D7.',
          data: [
            ['Mặt hàng', 'Số lượng', 'Đơn giá', 'Thành tiền'],
            ['Giấy A4 (ram)', 20, 68000],
            ['Bút bi (hộp)', 'năm', 45000],
            ['Mực in', 3, 250000],
            ['Kẹp tài liệu', '12 hộp', 15000],
            ['Sổ tay', 8, 32000],
            ['Bìa hồ sơ', 50, 4500]
          ],
          fill: { range: 'D2:D7', solution: '=IF(ISNUMBER(B2),B2*C2,"Kiểm tra lại")' },
          mustUse: ['ISNUMBER'],
          fmt: { C: 'int', D: 'int' },
          hint: 'Điều kiện là <code>ISNUMBER(B2)</code>: <code>=IF(ISNUMBER(B2),B2*C2,"Kiểm tra lại")</code>. Cách khác: <code>=IF(ISTEXT(B2),"Kiểm tra lại",B2*C2)</code>.',
          explain: 'Viết <code>=B2*C2</code> trực tiếp sẽ ra lỗi #VALUE! ở dòng có chữ. Kiểm tra trước bằng ISNUMBER cho thông báo rõ ràng hơn lỗi.'
        }
      ]
    }
  ],

  /* ---------------- Bài kiểm tra Phần 3 ---------------- */
  test: {
    mcq: [
      { q: 'Công thức =5<>5 trả về gì?', options: ['TRUE', 'FALSE', '0', '#VALUE!'], answer: 1, explain: '<> nghĩa là "khác". 5 khác 5 là sai nên trả về FALSE.' },
      { q: 'B2 = 7. Công thức =IF(B2>=7,"Đạt","Không đạt") trả về gì?', options: ['Đạt', 'Không đạt', 'TRUE', '7'], answer: 0, explain: '7 >= 7 là đúng nên trả về "Đạt".' },
      { q: 'Công thức nào bị lỗi #NAME?', options: ['=IF(B2>5,"Có","Không")', '=IF(B2>5,Có,Không)', '=IF(B2>5,1,0)', '=IF(B2>5,B2*2,0)'], answer: 1, explain: 'Chữ không đặt trong ngoặc kép nên Excel hiểu Có, Không là tên hàm hoặc tên vùng không tồn tại.' },
      { q: 'B2 = 95. Công thức =IF(B2>=50,"TB",IF(B2>=75,"Khá","Giỏi")) trả về gì?', options: ['Giỏi', 'Khá', 'TB', '#N/A'], answer: 2, explain: 'Điều kiện đầu B2>=50 đã đúng nên dừng ở "TB". Công thức này sai thứ tự điều kiện.' },
      { q: 'Xếp 6 mức bằng IF lồng nhau cần tối thiểu bao nhiêu hàm IF?', options: ['4', '5', '6', '7'], answer: 1, explain: 'n mức cần n − 1 hàm IF: 6 − 1 = 5.' },
      { q: 'B2 = 26 ngày công, C2 = 75% KPI. =IF(OR(B2>=24,C2>=80%),"Thưởng","Không") trả về gì?', options: ['Thưởng', 'Không', 'TRUE', 'FALSE'], answer: 0, explain: 'OR chỉ cần một điều kiện đúng. B2>=24 đúng nên trả về "Thưởng".' },
      { q: 'Kiểm tra C2 nằm trong khoảng 1 đến 3 (kể cả hai đầu), công thức nào đúng?', options: ['=1<=C2<=3', '=AND(C2>=1,C2<=3)', '=OR(C2>=1,C2<=3)', '=AND(C2>1,C2<3)'], answer: 1, explain: 'Cần thoả cả hai điều kiện nên dùng AND, và "kể cả hai đầu" nên dùng >= và <=.' },
      { q: '=NOT(B2="Đã duyệt") cho kết quả giống công thức nào?', options: ['=B2="Đã duyệt"', '=B2<>"Đã duyệt"', '=ISTEXT(B2)', '=B2>"Đã duyệt"'], answer: 1, explain: 'NOT đảo ngược điều kiện "bằng" thành "khác".' },
      { q: 'B2 = "HP". =SWITCH(B2,"HN",30000,"HCM",25000) trả về gì?', options: ['30000', '25000', '0', '#N/A'], answer: 3, explain: 'Không khớp giá trị nào và không có giá trị mặc định ở cuối, SWITCH báo #N/A.' },
      { q: 'Trong IFS, cách nào tạo trường hợp "còn lại"?', options: ['Thêm một giá trị lẻ ở cuối', 'Thêm cặp TRUE, kết quả ở cuối', 'Thêm cặp FALSE, kết quả ở cuối', 'IFS tự trả về 0'], answer: 1, explain: 'TRUE luôn đúng nên mọi trường hợp chưa khớp sẽ rơi vào cặp này. Giá trị lẻ ở cuối là cách của SWITCH.' },
      { q: 'B2 = 0, C2 = 50. =IFERROR(C2/B2,"-") trả về gì?', options: ['0', '50', '-', '#DIV/0!'], answer: 2, explain: 'Chia cho 0 gây lỗi #DIV/0!, IFERROR thay bằng "-".' },
      { q: 'Vì sao nên dùng IFNA thay vì IFERROR khi bọc hàm VLOOKUP?', options: ['IFNA chạy nhanh hơn rất nhiều', 'IFNA chỉ bắt lỗi #N/A, các lỗi khác do viết sai công thức vẫn hiện ra để sửa', 'IFERROR không dùng được với VLOOKUP', 'IFNA tự tìm giá trị gần đúng'], answer: 1, explain: 'IFERROR che mọi lỗi nên có thể giấu luôn lỗi viết sai công thức. IFNA chỉ xử lý trường hợp không tìm thấy.' }
    ],
    practice: [
      {
        id: 't1',
        task: 'Tính <b>Thưởng quý</b> ở cột E: nhân viên có ngày công từ <b>H1</b> trở lên VÀ không bị vi phạm (cột D khác "Có") thì được thưởng = doanh số × tỉ lệ theo bậc: doanh số từ <b>H2</b> trở lên hưởng 5%, còn lại hưởng 2%. Không đủ điều kiện thì thưởng 0. Viết ở <code>E2</code> rồi sao chép xuống E3:E7.',
        data: [
          ['Nhân viên', 'Ngày công', 'Doanh số', 'Vi phạm', 'Thưởng', '', 'Công tối thiểu', 70],
          ['Nguyễn Lan', 75, 820000000, 'Không', '', '', 'Ngưỡng bậc cao', 600000000],
          ['Trần Hùng', 72, 450000000, 'Không'],
          ['Lê Minh', 68, 900000000, 'Không'],
          ['Đinh Hoa', 76, 700000000, 'Có'],
          ['Mai Phúc', 70, 600000000, 'Không'],
          ['Hoàng Yến', 74, 380000000, 'Không']
        ],
        fill: { range: 'E2:E7', solution: '=IF(AND(B2>=$H$1,D2<>"Có"),C2*IF(C2>=$H$2,5%,2%),0)' },
        fmt: { C: 'int', E: 'int', H: 'int' }
      },
      {
        id: 't2',
        task: 'Tính <b>Cước vận chuyển</b> ở cột D. Nếu ô số kiện <b>không phải số</b> (trống hoặc gõ chữ) thì ghi "Thiếu dữ liệu". Ngược lại cước = số kiện × đơn giá theo vùng: "Bắc" lấy <b>H1</b>, "Trung" lấy <b>H2</b>, "Nam" lấy <b>H3</b>. Viết ở <code>D2</code> rồi sao chép xuống D3:D7.',
        data: [
          ['Mã đơn', 'Vùng', 'Số kiện', 'Cước', '', '', 'Bắc', 32000],
          ['VC11', 'Bắc', 4, '', '', '', 'Trung', 41000],
          ['VC12', 'Nam', 7, '', '', '', 'Nam', 27000],
          ['VC13', 'Trung', ''],
          ['VC14', 'Nam', 2],
          ['VC15', 'Bắc', 'ba'],
          ['VC16', 'Trung', 5]
        ],
        fill: { range: 'D2:D7', solution: '=IF(ISNUMBER(C2),C2*SWITCH(B2,"Bắc",$H$1,"Trung",$H$2,"Nam",$H$3),"Thiếu dữ liệu")' },
        fmt: { D: 'int', H: 'int' }
      },
      {
        id: 't3',
        task: 'Tính <b>Tỉ lệ đạt KPI</b> ở cột D = thực tế ÷ mục tiêu (mục tiêu bằng 0 hoặc trống thì trả về 0). Sau đó xếp loại ở cột E: tỉ lệ từ 100% trở lên "Vượt", từ 80% "Đạt", còn lại "Chưa đạt".',
        data: [
          ['Nhân viên', 'Mục tiêu', 'Thực tế', 'Tỉ lệ', 'Xếp loại'],
          ['Phạm Thu', 120, 132],
          ['Đỗ Quang', 100, 85],
          ['Vũ Hà', 0, 40],
          ['Bùi Nam', 150, 110],
          ['Ngô Tài', 80, 80]
        ],
        fill: [
          { range: 'D2:D6', solution: '=IFERROR(C2/B2,0)' },
          { range: 'E2:E6', solution: '=IF(D2>=1,"Vượt",IF(D2>=0.8,"Đạt","Chưa đạt"))' }
        ],
        fmt: { D: 'pct0' }
      }
    ]
  }
});
