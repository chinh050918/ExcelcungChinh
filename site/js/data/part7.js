ECC.addPart({
  id: 'p7',
  no: 7,
  title: 'Hàm tìm kiếm và tham chiếu',
  short: 'Tra cứu',
  desc: 'Tra tên hàng, đơn giá, lương, cước phí từ bảng danh mục bằng VLOOKUP, HLOOKUP, INDEX + MATCH và XLOOKUP. Đây là nhóm hàm dân văn phòng dùng nhiều nhất sau SUM và IF.',
  lessons: [
    /* ---------------- Bài 1 ---------------- */
    {
      id: 'vlookup',
      title: 'VLOOKUP: tra thông tin theo mã',
      minutes: 15,
      funcs: ['VLOOKUP'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Bạn có bảng <b>đơn hàng</b> chỉ ghi mã hàng: SP03, SP01, SP04… Còn <b>tên hàng</b> nằm ở bảng danh mục bên cạnh.</p><p>Gõ tay từng dòng thì 200 đơn mất cả buổi và rất dễ nhầm. Với VLOOKUP, bạn viết <b>một công thức</b> rồi kéo xuống là xong.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> VLOOKUP giống tra danh bạ điện thoại. Bạn biết <b>tên người</b> (mã hàng), dò danh bạ từ trên xuống, thấy đúng tên thì nhìn sang bên phải để đọc <b>số điện thoại</b> (tên hàng, đơn giá).' },
        { t: 'h', text: 'Công thức VLOOKUP gồm 4 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Mã hàng', 'Số lượng', 'Tên hàng', '', 'Mã', 'Tên hàng', 'Đơn giá'],
            ['SP03', 10, '', '', 'SP01', 'Giấy A4 (ram)', 68000],
            ['SP01', 25, '', '', 'SP02', 'Bút bi (hộp)', 45000],
            ['SP04', 4, '', '', 'SP03', 'Mực in', 250000],
            ['SP02', 12, '', '', 'SP04', 'Bìa hồ sơ', 15000]
          ],
          fmt: { G: 'int' },
          cell: 'C2',
          formula: '=VLOOKUP(A2,$E$2:$G$5,2,FALSE)',
          parts: [
            { label: 'Tìm cái gì', desc: 'Ô chứa mã cần tra. Ở đây là ô A2, đang chứa mã SP03.' },
            { label: 'Tìm trong bảng nào', desc: 'Bảng danh mục. <b>Cột đầu tiên của bảng phải là cột mã.</b> Dấu $ giữ bảng đứng yên khi kéo công thức xuống.' },
            { label: 'Lấy cột thứ mấy', desc: 'Đếm từ cột đầu của bảng danh mục: Mã là cột 1, Tên hàng là cột 2, Đơn giá là cột 3. Muốn lấy tên hàng nên ghi 2.', range: 'F2:F5' },
            { label: 'Tìm chính xác', desc: 'Ghi <b>FALSE</b> (hoặc số 0) để chỉ lấy khi khớp đúng mã. Tra theo mã thì luôn ghi FALSE.' }
          ],
          note: 'Trong Excel thật, khi bạn sửa công thức, các vùng tham chiếu cũng được tô màu y như vậy.'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Mã hàng', 'Số lượng', 'Tên hàng', '', 'Mã', 'Tên hàng', 'Đơn giá'],
            ['SP03', 10, '', '', 'SP01', 'Giấy A4 (ram)', 68000],
            ['SP01', 25, '', '', 'SP02', 'Bút bi (hộp)', 45000],
            ['SP04', 4, '', '', 'SP03', 'Mực in', 250000],
            ['SP02', 12, '', '', 'SP04', 'Bìa hồ sơ', 15000]
          ],
          fmt: { G: 'int' },
          cell: 'C2',
          formula: '=VLOOKUP(A2,$E$2:$G$5,2,FALSE)',
          steps: [
            { html: 'Excel đọc ô <b>A2</b>: cần tìm mã <b>SP03</b>.', hl: [['A2', 0]], select: 'A2' },
            { html: 'Sang bảng danh mục, dò <b>cột đầu tiên</b> (cột E) từ trên xuống. Ô E2 là <b>SP01</b>: chưa khớp.', hl: [['A2', 0], ['E2', 1]], select: 'E2' },
            { html: 'Ô E3 là <b>SP02</b>: vẫn chưa khớp, dò tiếp.', hl: [['A2', 0], ['E3', 1]], select: 'E3' },
            { html: 'Ô E4 là <b>SP03</b>: khớp! Excel dừng lại ở hàng này.', hl: [['A2', 0], ['E4:G4', 1]], select: 'E4' },
            { html: 'Lấy giá trị ở <b>cột thứ 2</b> của bảng (cột F), cùng hàng vừa tìm được: <b>Mực in</b>.', hl: [['E4', 1], ['F4', 2]], select: 'F4' },
            { html: 'Kết quả <b>Mực in</b> hiện ở ô C2. Khi kéo công thức xuống, A2 tự đổi thành A3, A4… còn bảng <code>$E$2:$G$5</code> đứng yên nhờ dấu $.', hl: [['C2', 2]], select: 'C2' }
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
            { id: 'formulas.lookup', n: 2, text: 'Bấm <b>Lookup &amp; Reference</b>, chọn <b>VLOOKUP</b>. Excel mở hộp thoại có 4 ô để bạn điền 4 phần ở trên.' }
          ],
          caption: 'Cách 2 nhanh hơn và dân văn phòng hay dùng: gõ thẳng công thức vào ô, như các bước dưới đây.'
        },
        {
          t: 'steps',
          title: 'Cách 2: gõ công thức trực tiếp',
          items: [
            'Bấm vào ô <b>C2</b>, gõ <code>=VLOOKUP(</code>. Excel hiện dòng gợi ý các phần cần điền.',
            'Bấm chuột vào ô <b>A2</b> (mã cần tìm), rồi gõ dấu phẩy <code>,</code>',
            'Kéo chuột chọn bảng danh mục <b>E2:G5</b>, nhấn <kbd>F4</kbd> để thêm $ thành <code>$E$2:$G$5</code>, rồi gõ dấu phẩy.',
            'Gõ <code>2,FALSE)</code> và nhấn <kbd>Enter</kbd>.',
            'Bấm lại ô C2, <b>nhấp đúp vào chấm vuông nhỏ</b> ở góc dưới bên phải ô để chép công thức xuống hết bảng.'
          ]
        },
        { t: 'tip', html: 'Gõ dấu phẩy mà Excel báo lỗi? Hãy dùng dấu chấm phẩy: <code>=VLOOKUP(A2;$E$2:$G$5;2;FALSE)</code>. Đó là do cài đặt vùng của Windows, ý nghĩa công thức không đổi. Trên web này gõ kiểu nào cũng được.' },
        { t: 'h', text: 'Khi VLOOKUP báo lỗi #N/A' },
        { t: 'p', html: '<code>#N/A</code> nghĩa là Excel <b>không tìm thấy</b> mã. Các nguyên nhân hay gặp:' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Mã không có trong danh mục', 'Gõ nhầm SP05, danh mục chỉ đến SP04', 'Kiểm tra lại mã hoặc bổ sung vào danh mục'],
            ['Dư dấu cách', '"SP01 " (thừa dấu cách cuối) khác "SP01"', 'Làm sạch bằng hàm TRIM'],
            ['Số và chữ lẫn lộn', 'Mã 1001 là số, danh mục lưu "1001" là chữ', 'Đưa cả hai về cùng một kiểu'],
            ['Quên dấu $', 'Kéo xuống thì bảng trượt thành E4:G7, mất SP01, SP02', 'Khoá bảng: <code>$E$2:$G$5</code>']
          ]
        },
        { t: 'warn', html: 'Quên ghi <code>FALSE</code> ở cuối là lỗi nguy hiểm nhất: Excel có thể trả về <b>kết quả sai mà không báo lỗi</b>. Tra theo mã thì luôn kết thúc bằng <code>,FALSE)</code> hoặc <code>,0)</code>.' },
        { t: 'p', html: '<b>Giới hạn của VLOOKUP:</b> chỉ dò ở cột đầu tiên của bảng và chỉ lấy được các cột nằm <b>bên phải</b> cột đó. Muốn lấy cột bên trái thì dùng INDEX + MATCH hoặc XLOOKUP (bài 4 và bài 5).' },
        {
          t: 'quiz', id: 'q1',
          q: 'Bảng danh mục ở F2:I20 (F: Mã, G: Tên, H: ĐVT, I: Đơn giá). Muốn lấy Đơn giá thì phần "lấy cột thứ mấy" ghi bao nhiêu?',
          options: ['3', '4', '9', 'I'],
          answer: 1,
          explain: 'Đếm từ cột đầu của bảng: F là 1, G là 2, H là 3, I là 4. Không đếm từ cột A của sheet.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'C2 có =VLOOKUP(A2,F2:H5,2,FALSE) cho kết quả đúng, nhưng kéo xuống C5 thì báo #N/A dù mã có trong danh mục. Vì sao?',
          options: ['Thiếu FALSE', 'Bảng không có dấu $, nên bị trượt xuống F5:H8', 'Số cột sai', 'Phải dùng HLOOKUP'],
          answer: 1,
          explain: 'Không có $ thì bảng dịch theo khi kéo công thức. Viết $F$2:$H$5 để bảng đứng yên.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'VLOOKUP báo lỗi #N/A nghĩa là gì?',
          options: ['Chia cho 0', 'Gõ sai tên hàm', 'Không tìm thấy giá trị cần tra', 'Số cột lớn hơn bảng'],
          answer: 2,
          explain: '#N/A = không tìm thấy. Nếu số cột vượt quá bảng thì báo #REF!.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Điền <b>Tên hàng</b> (cột C) và <b>Đơn giá</b> (cột D) theo mã hàng, dò trong bảng danh mục <code>F2:H5</code>. Viết công thức ở <code>C2</code> và <code>D2</code> rồi sao chép xuống đến hàng 6.',
          data: [
            ['Mã hàng', 'Số lượng', 'Tên hàng', 'Đơn giá', '', 'Mã', 'Tên hàng', 'Đơn giá'],
            ['VP02', 15, '', '', '', 'VP01', 'Ghim bấm', 12000],
            ['VP04', 3, '', '', '', 'VP02', 'Giấy A4 (ram)', 68000],
            ['VP01', 40, '', '', '', 'VP03', 'Băng keo', 9000],
            ['VP03', 20, '', '', '', 'VP04', 'Mực in', 250000],
            ['VP02', 8]
          ],
          fill: [
            { range: 'C2:C6', solution: '=VLOOKUP(A2,$F$2:$H$5,2,FALSE)' },
            { range: 'D2:D6', solution: '=VLOOKUP(A2,$F$2:$H$5,3,FALSE)' }
          ],
          mustUse: ['VLOOKUP'],
          fmt: { D: 'int', H: 'int' },
          hint: 'Tên hàng ở cột thứ 2 của danh mục, đơn giá ở cột thứ 3. Nhớ khoá bảng. C2: <code>=VLOOKUP(A2,$F$2:$H$5,2,FALSE)</code>, D2: <code>=VLOOKUP(A2,$F$2:$H$5,3,FALSE)</code>.',
          explain: 'Hai công thức chỉ khác nhau ở số cột. Bảng danh mục được khoá $ nên sao chép xuống không bị trượt.'
        },
        {
          id: 'ex2',
          task: 'Bảng chấm công chỉ ghi mã nhân viên. Ở <code>C2</code> tra <b>Họ tên</b>, ở <code>D2</code> tính <b>Lương = Ngày công × Lương/ngày</b> (lương/ngày lấy từ danh mục <code>F2:H6</code>). Sao chép xuống đến hàng 5.',
          data: [
            ['Mã NV', 'Ngày công', 'Họ tên', 'Lương', '', 'Mã NV', 'Họ tên', 'Lương/ngày'],
            ['NV03', 24, '', '', '', 'NV01', 'Nguyễn Thị Mai', 350000],
            ['NV01', 26, '', '', '', 'NV02', 'Trần Văn Tuấn', 420000],
            ['NV05', 22, '', '', '', 'NV03', 'Lê Thu Hà', 380000],
            ['NV02', 25, '', '', '', 'NV04', 'Phạm Quốc Phong', 500000],
            ['', '', '', '', '', 'NV05', 'Đỗ Minh Khoa', 330000]
          ],
          fill: [
            { range: 'C2:C5', solution: '=VLOOKUP(A2,$F$2:$H$6,2,FALSE)' },
            { range: 'D2:D5', solution: '=B2*VLOOKUP(A2,$F$2:$H$6,3,FALSE)' }
          ],
          mustUse: ['VLOOKUP'],
          fmt: { D: 'int', H: 'int' },
          hint: 'VLOOKUP trả về một con số nên có thể nhân trực tiếp. D2: <code>=B2*VLOOKUP(A2,$F$2:$H$6,3,FALSE)</code>.',
          explain: 'Kết quả của VLOOKUP dùng được như một ô bình thường trong phép tính. Đây là mẫu tính lương, thành tiền rất hay gặp.'
        },
        {
          id: 'ex3',
          task: 'Làm ô <b>tra cứu nhanh khách hàng</b>: gõ mã khách ở <code>G1</code>, các ô <code>G2</code> (Tên khách), <code>G3</code> (Tỉnh) và <code>G4</code> (Công nợ) tự hiện thông tin từ bảng <code>A2:D7</code>.',
          data: [
            ['Mã KH', 'Tên khách', 'Tỉnh', 'Công nợ', '', 'Mã cần tra', 'KH04'],
            ['KH01', 'Cty Minh Phát', 'Hà Nội', 125000000, '', 'Tên khách'],
            ['KH02', 'Cty An Khang', 'Hải Phòng', 48000000, '', 'Tỉnh'],
            ['KH03', 'Cty Sao Việt', 'Đà Nẵng', 0, '', 'Công nợ'],
            ['KH04', 'Cty Hưng Thịnh', 'Bình Dương', 87500000],
            ['KH05', 'Cty Phúc Long', 'Cần Thơ', 32000000],
            ['KH06', 'Cty Đại Dương', 'TP.HCM', 210000000]
          ],
          answers: [
            { cell: 'G2', solution: '=VLOOKUP(G1,A2:D7,2,FALSE)' },
            { cell: 'G3', solution: '=VLOOKUP(G1,A2:D7,3,FALSE)' },
            { cell: 'G4', solution: '=VLOOKUP(G1,A2:D7,4,FALSE)' }
          ],
          mustUse: ['VLOOKUP'],
          fmt: { D: 'int', G: 'raw' },
          hint: 'Giá trị cần tìm là ô G1. G2: <code>=VLOOKUP(G1,A2:D7,2,FALSE)</code>; G3, G4 đổi số cột thành 3 và 4.',
          explain: 'Thử đổi G1 thành KH01 hay KH06: cả ba ô tự cập nhật. Đây là cách làm "phiếu tra cứu" trên một sheet riêng.'
        }
      ]
    },

    /* ---------------- Bài 2 ---------------- */
    {
      id: 'vlookup-gan-dung',
      title: 'VLOOKUP dò gần đúng với bảng bậc thang',
      minutes: 14,
      funcs: ['VLOOKUP'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Cuối kỳ, phòng nhân sự cần <b>xếp loại</b> cho 80 học viên theo quy định: dưới 5 điểm là Yếu, từ 5 là Trung bình, từ 6.5 là Khá, từ 8 là Giỏi, từ 9 là Xuất sắc. Không có mã nào để dò chính xác cả.</p><p>Lồng 4, 5 hàm IF thì rất dài và dễ sai. Với VLOOKUP <b>dò gần đúng</b>, bạn ghi quy định thành một bảng bậc thang nhỏ, rồi viết <b>một công thức</b> ngắn là xếp loại được cả danh sách.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> giống đi lên cầu thang. Bạn bước lên từng bậc, bậc nào còn thấp hơn hoặc bằng chiều cao của mình thì bước tiếp. Gặp bậc cao hơn thì dừng, và bạn đang đứng ở <b>bậc ngay trước đó</b>.' },
        { t: 'h', text: 'Công thức VLOOKUP dò gần đúng gồm 4 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Học viên', 'Điểm', 'Xếp loại', '', 'Từ điểm', 'Xếp loại'],
            ['Mai', 7.2, '', '', 0, 'Yếu'],
            ['Tuấn', 9.1, '', '', 5, 'Trung bình'],
            ['Hà', 4.5, '', '', 6.5, 'Khá'],
            ['Phong', 8, '', '', 8, 'Giỏi'],
            ['Khoa', 6.4, '', '', 9, 'Xuất sắc']
          ],
          cell: 'C2',
          formula: '=VLOOKUP(B2,$E$2:$F$6,2,TRUE)',
          parts: [
            { label: 'Xếp bậc cho số nào', desc: 'Con số cần xếp bậc. Ở đây là ô B2, điểm 7.2 của Mai.' },
            { label: 'Bảng bậc thang', desc: 'Cột đầu là các <b>mốc dưới</b> ("từ … trở lên"), <b>sắp xếp tăng dần</b>. Dấu $ giữ bảng đứng yên khi kéo công thức xuống.' },
            { label: 'Lấy cột thứ mấy', desc: 'Cột chứa kết quả, đếm từ cột mốc: Từ điểm là cột 1, Xếp loại là cột 2.', range: 'F2:F6' },
            { label: 'Dò gần đúng', desc: 'Ghi <b>TRUE</b> (hoặc số 1) để dò theo bậc. Đây là điểm khác duy nhất so với VLOOKUP tra mã ở bài trước.', range: 'E2:E6' }
          ],
          note: 'Cùng một hàm VLOOKUP: đối số cuối FALSE là tra mã chính xác, TRUE là dò theo bậc thang.'
        },
        { t: 'h', text: 'Excel dò bảng bậc thang như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Học viên', 'Điểm', 'Xếp loại', '', 'Từ điểm', 'Xếp loại'],
            ['Mai', 7.2, '', '', 0, 'Yếu'],
            ['Tuấn', 9.1, '', '', 5, 'Trung bình'],
            ['Hà', 4.5, '', '', 6.5, 'Khá'],
            ['Phong', 8, '', '', 8, 'Giỏi'],
            ['Khoa', 6.4, '', '', 9, 'Xuất sắc']
          ],
          cell: 'C2',
          formula: '=VLOOKUP(B2,$E$2:$F$6,2,TRUE)',
          steps: [
            { html: 'Excel đọc ô <b>B2</b>: cần xếp bậc cho điểm <b>7.2</b>.', hl: [['B2', 0]], select: 'B2' },
            { html: 'Dò cột mốc từ trên xuống. Ô E2 là <b>0</b>: nhỏ hơn 7.2, đi tiếp.', hl: [['B2', 0], ['E2', 1]], select: 'E2' },
            { html: 'Ô E3 là <b>5</b>: vẫn nhỏ hơn 7.2, đi tiếp.', hl: [['B2', 0], ['E3', 1]], select: 'E3' },
            { html: 'Ô E4 là <b>6.5</b>: vẫn chưa vượt 7.2, đi tiếp.', hl: [['B2', 0], ['E4', 1]], select: 'E4' },
            { html: 'Ô E5 là <b>8</b>: <b>lớn hơn</b> 7.2 rồi. Excel dừng lại và <b>lùi về một hàng</b>, tức hàng của mốc 6.5.', hl: [['B2', 0], ['E5', 4], ['E4:F4', 1]], select: 'E4' },
            { html: 'Lấy giá trị ở <b>cột thứ 2</b> của bảng, cùng hàng vừa lùi về: <b>Khá</b>.', hl: [['E4', 1], ['F4', 2]], select: 'F4' },
            { html: 'Kết quả <b>Khá</b> hiện ở ô C2. Nếu điểm trùng đúng một mốc, ví dụ 8, Excel lấy luôn hàng đó và ra Giỏi.', hl: [['C2', 2]], select: 'C2' }
          ]
        },
        { t: 'h', text: 'Chuyển quy định thành bảng bậc thang' },
        {
          t: 'table',
          head: ['Quy định viết bằng lời', 'Ghi vào cột mốc'],
          rows: [
            ['Dưới 5 điểm: Yếu', '0'],
            ['Từ 5 đến dưới 6.5: Trung bình', '5'],
            ['Từ 6.5 đến dưới 8: Khá', '6.5'],
            ['Từ 8 đến dưới 9: Giỏi', '8'],
            ['Từ 9 trở lên: Xuất sắc', '9']
          ]
        },
        { t: 'tip', html: 'Cột mốc luôn ghi <b>mức thấp nhất</b> của mỗi bậc. Bậc đầu tiên nên bắt đầu từ 0 để giá trị nào cũng có chỗ rơi vào.' },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          title: 'Gõ công thức trực tiếp',
          items: [
            'Gõ bảng bậc thang ở một góc trống: cột mốc ghi mức thấp nhất của từng bậc, <b>xếp từ nhỏ đến lớn</b>.',
            'Bấm vào ô <b>C2</b>, gõ <code>=VLOOKUP(</code> rồi bấm ô <b>B2</b> (điểm), gõ dấu phẩy <code>,</code>',
            'Kéo chọn bảng bậc thang <b>E2:F6</b>, nhấn <kbd>F4</kbd> để thành <code>$E$2:$F$6</code>, gõ dấu phẩy.',
            'Gõ <code>2,TRUE)</code> và nhấn <kbd>Enter</kbd>.',
            'Bấm lại ô C2, nhấp đúp vào chấm vuông nhỏ ở góc dưới bên phải ô để chép xuống cả danh sách.'
          ]
        },
        {
          t: 'example',
          title: 'Một ví dụ nữa: hoa hồng theo doanh số, tra tỉ lệ rồi nhân với doanh số',
          data: [
            ['Nhân viên', 'Doanh số', 'Tỉ lệ', 'Hoa hồng', '', 'Từ doanh số', 'Tỉ lệ'],
            ['Lan', 85000000, '=VLOOKUP(B2,$F$2:$G$5,2,TRUE)', '=B2*C2', '', 0, 0.01],
            ['Hùng', 160000000, '=VLOOKUP(B3,$F$2:$G$5,2,TRUE)', '=B3*C3', '', 50000000, 0.03],
            ['Ngọc', 32000000, '=VLOOKUP(B4,$F$2:$G$5,2,TRUE)', '=B4*C4', '', 100000000, 0.05],
            ['', '', '', '', '', 200000000, 0.07]
          ],
          fmt: { B: 'int', C: 'pct0', D: 'int', F: 'int', G: 'pct0' },
          note: 'Hùng 160 triệu: gặp mốc 200 triệu là vượt, lùi về mốc 100 triệu nên được 5%.'
        },
        { t: 'h', text: 'Lỗi hay gặp khi dò gần đúng' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Cột mốc không xếp tăng dần', 'Mốc ghi 0, 8, 5, 6.5, 9', 'Sắp lại cột mốc từ nhỏ đến lớn (Data › Sort A→Z)'],
            ['Giá trị nhỏ hơn mốc đầu tiên', 'Bảng cước bắt đầu từ 1 kg, kiện nặng 0.5 kg ra <code>#N/A</code>', 'Cho bậc đầu tiên bắt đầu từ 0'],
            ['Ghi mốc trên thay vì mốc dưới', 'Ghi 5 cho bậc "dưới 5 điểm"', 'Cột mốc luôn ghi mức "từ … trở lên"'],
            ['Ghi FALSE thay vì TRUE', 'Điểm 7.2 không trùng mốc nào nên ra <code>#N/A</code>', 'Dò theo bậc thì ghi TRUE hoặc 1']
          ]
        },
        { t: 'warn', html: 'Bảng mốc lộn xộn là lỗi nguy hiểm nhất: VLOOKUP vẫn trả về kết quả nhưng <b>sai mà không báo lỗi</b>. Mỗi lần sửa bảng bậc thang, hãy nhìn lại xem cột mốc còn tăng dần không.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Bảng mốc doanh số: 0 → 1%, 50 triệu → 3%, 100 triệu → 5%. Doanh số 99 triệu, VLOOKUP(…,TRUE) trả về tỉ lệ nào?',
          options: ['1%', '3%', '5%', '#N/A'],
          answer: 1,
          explain: 'Dò xuống gặp mốc 100 triệu là vượt 99 triệu, lùi về mốc 50 triệu nên ra 3%.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Điều kiện bắt buộc của bảng dò khi dùng VLOOKUP gần đúng là gì?',
          options: ['Cột mốc sắp xếp giảm dần', 'Cột mốc sắp xếp tăng dần', 'Bảng phải nằm ở sheet khác', 'Cột mốc phải là chữ'],
          answer: 1,
          explain: 'Excel dò từ trên xuống và dừng khi gặp mốc lớn hơn, nên cột mốc phải tăng dần. Sai thứ tự thì kết quả sai.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Quy định: "Từ 20 kg trở lên tính 8.500 đ/kg". Trong cột mốc của bảng cước, bậc này ghi số nào?',
          options: ['19', '20', '21', '8500'],
          answer: 1,
          explain: 'Cột mốc ghi mức thấp nhất của bậc, tức 20. Kiện đúng 20 kg trùng mốc nên được tính giá của bậc này.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Xếp loại <b>đánh giá KPI</b> cho từng nhân viên ở cột C, dựa vào bảng bậc thang <code>F2:G5</code>. Viết công thức ở <code>C2</code> rồi sao chép xuống C3:C7.',
          data: [
            ['Nhân viên', 'Điểm KPI', 'Đánh giá', '', '', 'Từ điểm', 'Đánh giá'],
            ['Nguyễn Mai', 92, '', '', '', 0, 'Chưa đạt'],
            ['Trần Tuấn', 68, '', '', '', 60, 'Đạt'],
            ['Lê Hà', 55, '', '', '', 75, 'Tốt'],
            ['Phạm Phong', 75, '', '', '', 90, 'Xuất sắc'],
            ['Đỗ Khoa', 81],
            ['Vũ Lan', 60]
          ],
          fill: { range: 'C2:C7', solution: '=VLOOKUP(B2,$F$2:$G$5,2,TRUE)' },
          mustUse: ['VLOOKUP'],
          strict: false,
          hint: 'Giá trị cần xếp bậc là B2, bảng bậc thang khoá $, kết quả ở cột 2, đối số cuối là TRUE: <code>=VLOOKUP(B2,$F$2:$G$5,2,TRUE)</code>.',
          explain: 'Điểm 75 trùng mốc nên ra "Tốt", điểm 60 trùng mốc nên ra "Đạt". Điểm 81 gặp mốc 90 là vượt, lùi về mốc 75: "Tốt".'
        },
        {
          id: 'ex2',
          task: 'Ở cột C tra <b>tỉ lệ hoa hồng</b> theo bảng bậc thang <code>F2:G5</code>. Ở cột D tính <b>Hoa hồng = Doanh số × Tỉ lệ</b>. Viết ở <code>C2</code> và <code>D2</code> rồi sao chép xuống đến hàng 6.',
          data: [
            ['Nhân viên', 'Doanh số', 'Tỉ lệ', 'Hoa hồng', '', 'Từ doanh số', 'Tỉ lệ'],
            ['Lan', 145000000, '', '', '', 0, 0.01],
            ['Hùng', 48000000, '', '', '', 50000000, 0.025],
            ['Ngọc', 230000000, '', '', '', 100000000, 0.04],
            ['Bình', 100000000, '', '', '', 200000000, 0.06],
            ['Thảo', 76500000]
          ],
          fill: [
            { range: 'C2:C6', solution: '=VLOOKUP(B2,$F$2:$G$5,2,TRUE)' },
            { range: 'D2:D6', solution: '=B2*C2' }
          ],
          fmt: { B: 'int', C: 'pct', D: 'int', F: 'int', G: 'pct' },
          hint: 'C2: <code>=VLOOKUP(B2,$F$2:$G$5,2,TRUE)</code>. D2: <code>=B2*C2</code>. Muốn gộp một ô cũng được: <code>=B2*VLOOKUP(B2,$F$2:$G$5,2,TRUE)</code>.',
          explain: 'Bình đạt đúng 100 triệu, trùng mốc nên được 4%. Thảo 76,5 triệu gặp mốc 100 triệu là vượt, lùi về mốc 50 triệu: 2,5%.'
        },
        {
          id: 'ex3',
          task: 'Tính <b>cước vận chuyển</b> cho từng kiện: <b>Cước = Số kg × Đơn giá/kg</b>. Đơn giá/kg tra theo bảng bậc thang <code>F2:G6</code> (hàng càng nặng, đơn giá càng rẻ). Viết ở <code>C2</code> rồi sao chép xuống C3:C7.',
          data: [
            ['Kiện hàng', 'Số kg', 'Cước (VNĐ)', '', '', 'Từ kg', 'Đơn giá/kg'],
            ['K001', 3.5, '', '', '', 0, 12000],
            ['K002', 18, '', '', '', 5, 10000],
            ['K003', 52, '', '', '', 20, 8500],
            ['K004', 20, '', '', '', 50, 7000],
            ['K005', 120, '', '', '', 100, 6000],
            ['K006', 7.2]
          ],
          fill: { range: 'C2:C7', solution: '=B2*VLOOKUP(B2,$F$2:$G$6,2,TRUE)' },
          mustUse: ['VLOOKUP'],
          fmt: { C: 'int', G: 'int' },
          hint: 'Tra đơn giá bằng VLOOKUP gần đúng, rồi nhân với số kg ở B2: <code>=B2*VLOOKUP(B2,$F$2:$G$6,2,TRUE)</code>.',
          explain: 'Kiện 20 kg trùng mốc 20 nên tính 8.500 đ/kg. Bảng cước của các hãng vận chuyển thường tính đúng theo kiểu bậc thang này.'
        }
      ]
    },

    /* ---------------- Bài 3 ---------------- */
    {
      id: 'hlookup',
      title: 'HLOOKUP: dò bảng danh mục nằm ngang',
      minutes: 10,
      funcs: ['HLOOKUP'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Bên vận chuyển gửi cho bạn bảng <b>phí giao hàng</b> xếp <b>nằm ngang</b>: hàng trên cùng là mã khu vực HN, DN, HCM, CT; hàng dưới là phí giao. Bảng đơn hàng của bạn chỉ ghi mã khu vực.</p><p>VLOOKUP dò theo cột dọc nên không dùng được. <b>HLOOKUP</b> làm đúng việc đó cho bảng ngang: dò mã ở hàng đầu, rồi đi xuống lấy phí.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> HLOOKUP giống đọc lịch tháng treo tường. Bạn dò hàng tiêu đề từ trái sang phải tìm đúng ngày, rồi nhìn <b>xuống dưới</b> để đọc việc cần làm. Chữ H là <b>Horizontal</b> (nằm ngang).' },
        { t: 'h', text: 'Công thức HLOOKUP gồm 4 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Mã khu vực', 'HN', 'DN', 'HCM', 'CT'],
            ['Tên', 'Hà Nội', 'Đà Nẵng', 'TP.HCM', 'Cần Thơ'],
            ['Phí giao', 35000, 28000, 30000, 40000],
            [],
            ['Đơn hàng', 'Khu vực', 'Phí giao'],
            ['DH101', 'DN', ''],
            ['DH102', 'HN', ''],
            ['DH103', 'CT', '']
          ],
          fmt: { B: 'int', C: 'int', D: 'int', E: 'int' },
          cell: 'C6',
          formula: '=HLOOKUP(B6,$B$1:$E$3,3,FALSE)',
          parts: [
            { label: 'Tìm cái gì', desc: 'Ô chứa mã cần tra. Ở đây là ô B6, mã khu vực DN.' },
            { label: 'Tìm trong bảng nào', desc: 'Bảng danh mục nằm ngang. <b>Hàng đầu tiên của bảng phải là hàng mã.</b> Không đưa cột nhãn A vào bảng. Dấu $ giữ bảng đứng yên khi kéo công thức.' },
            { label: 'Lấy hàng thứ mấy', desc: 'Đếm từ hàng đầu của bảng: Mã là hàng 1, Tên là hàng 2, Phí giao là hàng 3. Không đếm theo số hàng của sheet.', range: 'B3:E3' },
            { label: 'Tìm chính xác', desc: 'Ghi <b>FALSE</b> (hoặc 0) để chỉ lấy khi khớp đúng mã, giống hệt VLOOKUP.' }
          ],
          note: 'HLOOKUP và VLOOKUP có cùng 4 phần. Khác nhau duy nhất: một bên dò hàng ngang và đếm hàng, một bên dò cột dọc và đếm cột.'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Mã khu vực', 'HN', 'DN', 'HCM', 'CT'],
            ['Tên', 'Hà Nội', 'Đà Nẵng', 'TP.HCM', 'Cần Thơ'],
            ['Phí giao', 35000, 28000, 30000, 40000],
            [],
            ['Đơn hàng', 'Khu vực', 'Phí giao'],
            ['DH101', 'DN', ''],
            ['DH102', 'HN', ''],
            ['DH103', 'CT', '']
          ],
          fmt: { B: 'int', C: 'int', D: 'int', E: 'int' },
          cell: 'C6',
          formula: '=HLOOKUP(B6,$B$1:$E$3,3,FALSE)',
          steps: [
            { html: 'Excel đọc ô <b>B6</b>: cần tìm mã <b>DN</b>.', hl: [['B6', 0]], select: 'B6' },
            { html: 'Sang bảng ngang, dò <b>hàng đầu tiên</b> từ trái sang phải. Ô B1 là <b>HN</b>: chưa khớp.', hl: [['B6', 0], ['B1', 1]], select: 'B1' },
            { html: 'Ô C1 là <b>DN</b>: khớp! Excel dừng lại ở cột C.', hl: [['B6', 0], ['C1:C3', 1]], select: 'C1' },
            { html: 'Đi <b>xuống</b> hàng thứ 3 của bảng, cùng cột vừa tìm được: ô C3 là <b>28.000</b>.', hl: [['C1', 1], ['C3', 2]], select: 'C3' },
            { html: 'Kết quả <b>28.000</b> hiện ở ô C6. Kéo công thức xuống, B6 tự đổi thành B7, B8 còn bảng <code>$B$1:$E$3</code> đứng yên.', hl: [['C6', 2]], select: 'C6' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'PhiGiao.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Bấm tab <b>Formulas</b>.' },
            { id: 'formulas.lookup', n: 2, text: 'Bấm <b>Lookup &amp; Reference</b>, chọn <b>HLOOKUP</b>. Hộp thoại có 4 ô cho 4 phần ở trên.' }
          ],
          caption: 'Hoặc gõ thẳng công thức vào ô như các bước dưới đây.'
        },
        {
          t: 'steps',
          title: 'Gõ công thức trực tiếp',
          items: [
            'Bấm vào ô <b>C6</b>, gõ <code>=HLOOKUP(</code> rồi bấm ô <b>B6</b> (mã khu vực), gõ dấu phẩy <code>,</code>',
            'Kéo chọn bảng ngang <b>B1:E3</b> (bỏ cột nhãn A), nhấn <kbd>F4</kbd> để thành <code>$B$1:$E$3</code>, gõ dấu phẩy.',
            'Gõ <code>3,FALSE)</code> và nhấn <kbd>Enter</kbd>.',
            'Bấm lại ô C6, nhấp đúp vào chấm vuông nhỏ ở góc ô để chép công thức xuống.'
          ]
        },
        { t: 'p', html: '<b>Dò gần đúng cũng được:</b> ghi <code>TRUE</code> ở cuối thì HLOOKUP dò bậc thang giống VLOOKUP ở bài trước, chỉ khác là các mốc xếp <b>từ trái sang phải, tăng dần</b>.' },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Đếm hàng theo số hàng của sheet', 'Bảng B8:E10, phí ở hàng 10 của sheet nhưng ghi số 10', 'Đếm từ hàng đầu của bảng: hàng 10 của sheet là hàng thứ 3 của bảng'],
            ['Đưa cột nhãn vào bảng', 'Chọn A1:E3, hàng đầu có thêm chữ "Mã khu vực"', 'Chỉ chọn phần có dữ liệu: B1:E3'],
            ['Quên dấu $', 'Kéo xuống thì bảng trượt thành B2:E4, mất hàng mã', 'Khoá bảng: <code>$B$1:$E$3</code>'],
            ['Dùng nhầm VLOOKUP cho bảng ngang', 'Mã nằm ở hàng đầu nhưng viết VLOOKUP', 'Bảng ngang dùng HLOOKUP']
          ]
        },
        { t: 'tip', html: 'Thực tế bảng ngang ít gặp hơn bảng dọc. Nếu được tự thiết kế, hãy làm danh mục dạng dọc cho dễ thêm dòng và dễ lọc. HLOOKUP dùng khi nhận file có sẵn bảng ngang, ví dụ bảng giá theo tháng hoặc theo khu vực xếp thành cột.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Bảng danh mục có mã nằm ở hàng 1, đơn giá ở hàng 3, các mã xếp từ trái sang phải. Nên dùng công thức nào?',
          options: ['VLOOKUP(…, 3, FALSE)', 'HLOOKUP(…, 3, FALSE)', 'HLOOKUP(…, 1, FALSE)', 'VLOOKUP(…, 1, TRUE)'],
          answer: 1,
          explain: 'Bảng ngang dùng HLOOKUP, đơn giá ở hàng thứ 3 của bảng.'
        },
        {
          t: 'quiz', id: 'q2',
          q: '=HLOOKUP("T3",$B$1:$M$4,4,FALSE) lấy giá trị ở đâu?',
          options: ['Cột thứ 4 của bảng', 'Hàng thứ 4 của bảng, ở cột có tiêu đề T3', 'Ô T3', 'Hàng 3 cột 4'],
          answer: 1,
          explain: 'HLOOKUP tìm "T3" ở hàng đầu tiên của bảng, rồi đi xuống hàng thứ 4.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Bảng phí nằm ở B8:E10 (hàng 8 là mã, hàng 10 là phí). Phần "lấy hàng thứ mấy" ghi bao nhiêu?',
          options: ['10', '3', '2', '8'],
          answer: 1,
          explain: 'Đếm từ hàng đầu của bảng: hàng 8 là 1, hàng 9 là 2, hàng 10 là 3.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tính <b>phí giao hàng</b> cho từng đơn ở cột C, tra theo khu vực trong bảng ngang <code>B8:E9</code>. Viết ở <code>C2</code> rồi sao chép xuống C3:C6.',
          data: [
            ['Đơn hàng', 'Khu vực', 'Phí giao'],
            ['DH201', 'HCM'],
            ['DH202', 'HN'],
            ['DH203', 'CT'],
            ['DH204', 'DN'],
            ['DH205', 'HCM'],
            [],
            ['Khu vực', 'HN', 'DN', 'HCM', 'CT'],
            ['Phí giao', 35000, 28000, 30000, 40000]
          ],
          fill: { range: 'C2:C6', solution: '=HLOOKUP(B2,$B$8:$E$9,2,FALSE)' },
          mustUse: ['HLOOKUP'],
          fmt: { C: 'int', B: 'int', D: 'int', E: 'int' },
          hint: 'Bảng là B8:E9 (không lấy cột nhãn A). Phí giao nằm ở hàng thứ 2 của bảng: <code>=HLOOKUP(B2,$B$8:$E$9,2,FALSE)</code>.',
          explain: 'Bảng B8:E9 được khoá $ nên sao chép xuống không bị trượt, giống hệt VLOOKUP.'
        },
        {
          id: 'ex2',
          task: 'Tính <b>thưởng thâm niên</b> theo số năm làm việc. Bảng bậc thang nằm ngang ở <code>B8:E9</code> (hàng 8 là mốc số năm, tăng dần từ trái sang phải). Ở <code>C2</code> tra mức thưởng bằng HLOOKUP dò gần đúng, rồi sao chép xuống C3:C6.',
          data: [
            ['Nhân viên', 'Số năm', 'Thưởng'],
            ['Mai', 0.5],
            ['Tuấn', 4],
            ['Hà', 7.5],
            ['Phong', 1],
            ['Khoa', 12],
            [],
            ['Từ năm', 0, 1, 3, 5],
            ['Thưởng', 0, 1000000, 2500000, 4000000]
          ],
          fill: { range: 'C2:C6', solution: '=HLOOKUP(B2,$B$8:$E$9,2,TRUE)' },
          mustUse: ['HLOOKUP'],
          fmt: { C: 'int', B: 'int', D: 'int', E: 'int' },
          hint: 'Dò gần đúng nên đối số cuối là TRUE: <code>=HLOOKUP(B2,$B$8:$E$9,2,TRUE)</code>.',
          explain: 'Tuấn 4 năm: dò sang phải gặp mốc 5 là vượt, lùi về mốc 3, được 2.500.000 đ. Cách dò bậc thang của HLOOKUP giống hệt VLOOKUP, chỉ là dò theo hàng ngang.'
        }
      ]
    },

    /* ---------------- Bài 4 ---------------- */
    {
      id: 'index-match',
      title: 'INDEX, MATCH và bộ đôi INDEX + MATCH',
      minutes: 16,
      funcs: ['INDEX', 'MATCH'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Danh mục kho có cột <b>Tên hàng</b> nằm <b>bên trái</b> cột Mã hàng. Bạn cần tra tên hàng theo mã, nhưng VLOOKUP chỉ lấy được cột bên phải cột mã nên chịu thua. Sửa lại danh mục thì sợ hỏng file của người khác.</p><p>Bộ đôi <b>INDEX + MATCH</b> tra được cả bên trái lẫn bên phải, không cần đếm số cột, lại tra được bảng hai chiều (hàng × cột).</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> giống tìm khách trong hàng người xếp hàng. <b>MATCH</b> hỏi: "Anh SP03 đứng thứ mấy?" và được câu trả lời "thứ 3". <b>INDEX</b> nói: "Đến người thứ 3 ở hàng bên cạnh, lấy cho tôi tên của họ".' },
        { t: 'h', text: 'Hai hàm, mỗi hàm một việc' },
        {
          t: 'table',
          head: ['Hàm', 'Biết gì', 'Trả về gì', 'Ví dụ'],
          rows: [
            ['<code>MATCH</code>', 'Biết giá trị', '<b>Vị trí</b> (số thứ tự)', '<code>=MATCH("NV04",A2:A5,0)</code> ra 4'],
            ['<code>INDEX</code>', 'Biết vị trí', '<b>Giá trị</b> ở vị trí đó', '<code>=INDEX(B2:B5,3)</code> ra người thứ 3 trong B2:B5']
          ]
        },
        {
          t: 'example',
          title: 'INDEX và MATCH khi dùng riêng. Bấm vào ô ở cột F để xem công thức',
          data: [
            ['Mã NV', 'Họ tên', 'Phòng', '', 'Công thức', 'Kết quả'],
            ['NV01', 'Nguyễn Mai', 'Kế toán', '', 'INDEX(B2:B5,3)', '=INDEX(B2:B5,3)'],
            ['NV02', 'Trần Tuấn', 'Kho', '', 'INDEX(A2:C5,2,3)', '=INDEX(A2:C5,2,3)'],
            ['NV03', 'Lê Hà', 'Nhân sự', '', 'MATCH("NV04",A2:A5,0)', '=MATCH("NV04",A2:A5,0)'],
            ['NV04', 'Phạm Phong', 'Kinh doanh', '', 'MATCH("Kho",C2:C5,0)', '=MATCH("Kho",C2:C5,0)']
          ],
          note: '<code>INDEX(A2:C5,2,3)</code>: vùng nhiều cột thì ghi thêm số cột, ở đây là hàng 2, cột 3 của vùng: "Kho".'
        },
        { t: 'h', text: 'Ghép lại: INDEX(…, MATCH(…))' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Mã hàng', 'Tên hàng', '', 'Tên hàng', 'Mã hàng', 'Tồn kho'],
            ['H03', '', '', 'Thùng carton', 'H01', 520],
            ['H01', '', '', 'Băng keo', 'H02', 1350],
            ['H04', '', '', 'Màng PE', 'H03', 86],
            ['', '', '', 'Pallet gỗ', 'H04', 40]
          ],
          fmt: { F: 'int' },
          cell: 'B2',
          formula: '=INDEX($D$2:$D$5,MATCH(A2,$E$2:$E$5,0))',
          parts: [
            { label: 'Lấy kết quả ở cột nào', desc: 'Cột chứa thứ bạn cần, ở đây là cột Tên hàng. Cột này nằm bên trái hay bên phải cột mã đều được.' },
            { label: 'Lấy ở vị trí thứ mấy', desc: 'Cả cụm <code>MATCH(…)</code> là một phần. MATCH tìm mã H03 trong cột Mã hàng và tính ra <b>số 3</b>. INDEX nhận số 3 này để lấy tên hàng thứ 3.' }
          ],
          note: 'Nhìn kỹ: INDEX chỉ có 2 phần. Phần thứ 2 là một hàm MATCH nằm bên trong. Excel tính MATCH trước, rồi mới tính INDEX.'
        },
        { t: 'p', html: 'Mổ xẻ tiếp cụm MATCH bên trong:' },
        {
          t: 'anatomy',
          title: 'Riêng hàm MATCH: tìm xem mã nằm ở vị trí thứ mấy',
          data: [
            ['Mã hàng', 'Vị trí', '', 'Tên hàng', 'Mã hàng', 'Tồn kho'],
            ['H03', '', '', 'Thùng carton', 'H01', 520],
            ['H01', '', '', 'Băng keo', 'H02', 1350],
            ['H04', '', '', 'Màng PE', 'H03', 86],
            ['', '', '', 'Pallet gỗ', 'H04', 40]
          ],
          fmt: { F: 'int' },
          cell: 'B2',
          formula: '=MATCH(A2,$E$2:$E$5,0)',
          parts: [
            { label: 'Tìm cái gì', desc: 'Ô chứa mã cần tra. Ở đây là ô A2, mã H03.' },
            { label: 'Tìm trong cột nào', desc: 'Cột chứa mã. Phải bắt đầu <b>cùng hàng</b> và dài bằng cột kết quả của INDEX (cùng từ hàng 2 đến hàng 5).' },
            { label: 'Kiểu tìm', desc: 'Ghi <b>0</b> để tìm chính xác. Tra theo mã thì luôn ghi 0. Ghi 1 là dò gần đúng (bảng bậc thang tăng dần).', range: 'E2:E5' }
          ],
          note: 'Kết quả của MATCH là <b>3</b>: H03 là phần tử thứ 3 của vùng E2:E5, dù nó nằm ở hàng 4 của sheet.'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Mã hàng', 'Tên hàng', '', 'Tên hàng', 'Mã hàng', 'Tồn kho'],
            ['H03', '', '', 'Thùng carton', 'H01', 520],
            ['H01', '', '', 'Băng keo', 'H02', 1350],
            ['H04', '', '', 'Màng PE', 'H03', 86],
            ['', '', '', 'Pallet gỗ', 'H04', 40]
          ],
          fmt: { F: 'int' },
          cell: 'B2',
          formula: '=INDEX($D$2:$D$5,MATCH(A2,$E$2:$E$5,0))',
          steps: [
            { html: 'Excel tính phần bên trong trước: <b>MATCH</b> đọc ô A2, cần tìm mã <b>H03</b>.', hl: [['A2', 1]], select: 'A2' },
            { html: 'MATCH dò cột Mã hàng từ trên xuống. E2 là <b>H01</b> (vị trí 1), E3 là <b>H02</b> (vị trí 2): chưa khớp.', hl: [['A2', 1], ['E2:E3', 1]], select: 'E3' },
            { html: 'E4 là <b>H03</b>: khớp ở <b>vị trí 3</b>. MATCH trả về con số <b>3</b>.', hl: [['A2', 1], ['E4', 2]], select: 'E4' },
            { html: 'Đến lượt <b>INDEX</b>: nhận số 3, đếm trong cột Tên hàng D2:D5. D2 là thứ 1, D3 là thứ 2…', hl: [['D2:D5', 0]], select: 'D2' },
            { html: '…D4 là <b>thứ 3</b>: <b>Màng PE</b>. INDEX lấy giá trị này.', hl: [['D2:D5', 0], ['D4', 2], ['E4', 2]], select: 'D4' },
            { html: 'Kết quả <b>Màng PE</b> hiện ở ô B2. Cột Tên hàng nằm bên trái cột mã mà vẫn tra được, điều VLOOKUP không làm được.', hl: [['B2', 2]], select: 'B2' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'Kho.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Bấm tab <b>Formulas</b>.' },
            { id: 'formulas.lookup', n: 2, text: 'INDEX và MATCH đều nằm trong <b>Lookup &amp; Reference</b>.' }
          ],
          caption: 'Công thức lồng nhau thì gõ trực tiếp sẽ nhanh và dễ kiểm soát hơn hộp thoại.'
        },
        {
          t: 'steps',
          title: 'Gõ công thức trực tiếp',
          items: [
            'Bấm vào ô <b>B2</b>, gõ <code>=INDEX(</code> rồi kéo chọn cột kết quả <b>D2:D5</b>, nhấn <kbd>F4</kbd> để khoá, gõ dấu phẩy <code>,</code>',
            'Gõ <code>MATCH(</code>, bấm ô <b>A2</b> (mã cần tìm), gõ dấu phẩy.',
            'Kéo chọn cột mã <b>E2:E5</b>, nhấn <kbd>F4</kbd>, gõ <code>,0)</code> để đóng MATCH.',
            'Gõ thêm <code>)</code> để đóng INDEX, nhấn <kbd>Enter</kbd>. Công thức đủ là <code>=INDEX($D$2:$D$5,MATCH(A2,$E$2:$E$5,0))</code>.',
            'Nhấp đúp vào chấm vuông nhỏ ở góc ô B2 để chép xuống.'
          ]
        },
        { t: 'tip', html: 'Mẹo kiểm tra: gõ thử riêng <code>=MATCH(A2,$E$2:$E$5,0)</code> vào một ô trống. Ra đúng con số vị trí thì mới ghép vào INDEX. Sai ở đâu thấy ngay ở đó.' },
        { t: 'h', text: 'Tra hai chiều: hàng × cột' },
        { t: 'p', html: 'Với bảng có tiêu đề cả hàng lẫn cột (bảng cước theo tuyến và loại xe, bảng giá theo sản phẩm và tháng), INDEX nhận thêm số cột. Dùng <b>hai MATCH</b>: một tìm số hàng, một tìm số cột.' },
        {
          t: 'example',
          title: 'Bảng cước xe tải: tuyến ở cột A, loại xe ở hàng 1. Bấm ô G3 để xem công thức',
          data: [
            ['Tuyến \\ Xe', '1.5 tấn', '3.5 tấn', '8 tấn', '', 'Tuyến', 'HN - Hải Phòng'],
            ['HN - Bắc Ninh', 900000, 1400000, 2300000, '', 'Loại xe', '8 tấn'],
            ['HN - Hải Phòng', 1800000, 2600000, 4200000, '', 'Cước', '=INDEX(B2:D4,MATCH(G1,A2:A4,0),MATCH(G2,B1:D1,0))'],
            ['HN - Nam Định', 1500000, 2200000, 3600000]
          ],
          fmt: { B: 'int', C: 'int', D: 'int', G: 'int' },
          note: 'MATCH(G1,A2:A4,0) ra 2 (hàng thứ 2). MATCH(G2,B1:D1,0) ra 3 (cột thứ 3). INDEX lấy ô ở hàng 2, cột 3 của B2:D4 là 4.200.000.'
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Hai vùng lệch nhau', '<code>INDEX(D2:D5, MATCH(A2, E1:E5, 0))</code>: lệch một dòng, lấy nhầm tên mà không báo lỗi', 'Hai vùng phải bắt đầu cùng hàng và dài bằng nhau'],
            ['Quên số 0 trong MATCH', '<code>MATCH(A2,$E$2:$E$5)</code> thành dò gần đúng, mã không xếp thứ tự thì ra sai', 'Tra theo mã luôn ghi <code>,0)</code>'],
            ['Không tìm thấy mã', 'Mã H09 không có trong danh mục: <code>#N/A</code>', 'Kiểm tra mã, hoặc bọc IFERROR (bài 6)'],
            ['Quên dấu $', 'Kéo xuống thì hai vùng trượt theo', 'Khoá cả hai vùng bằng <kbd>F4</kbd>']
          ]
        },
        { t: 'tip', html: 'Thêm một ưu điểm: chèn cột vào giữa bảng danh mục không làm hỏng INDEX + MATCH, vì không có số cột nào gõ cứng. VLOOKUP với số cột gõ cứng sẽ lấy nhầm cột.' },
        {
          t: 'quiz', id: 'q1',
          q: 'A2:A6 chứa NV01, NV02, NV03, NV04, NV05. =MATCH("NV04",A2:A6,0) trả về gì?',
          options: ['NV04', '4', '5', 'A5'],
          answer: 1,
          explain: 'MATCH trả về vị trí trong vùng. NV04 là phần tử thứ 4 của A2:A6, dù nằm ở hàng 5 của sheet.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Cột C là Họ tên, cột E là Mã NV. Công thức nào lấy Họ tên theo mã ở H2?',
          options: ['=VLOOKUP(H2,C:E,1,FALSE)', '=INDEX(C:C,MATCH(H2,E:E,0))', '=MATCH(H2,C:C,0)', '=INDEX(E:E,MATCH(H2,C:C,0))'],
          answer: 1,
          explain: 'MATCH tìm mã trong cột E, INDEX lấy tên ở cột C. VLOOKUP không tra sang trái được.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Trong =INDEX(B2:B9,MATCH(F1,A2:A9,0)), Excel tính phần nào trước?',
          options: ['INDEX trước, MATCH sau', 'MATCH trước, ra số vị trí, rồi INDEX dùng số đó', 'Cả hai cùng lúc, không liên quan nhau', 'Chỉ tính MATCH'],
          answer: 1,
          explain: 'Hàm nằm bên trong luôn được tính trước. MATCH ra số vị trí, INDEX dùng số đó để lấy giá trị.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Danh mục ở <code>F1:H6</code> có cột <b>Lương CB</b> nằm <b>bên trái</b> cột Mã NV. Ở <code>C2</code> dùng INDEX + MATCH tra Lương CB theo mã. Ở <code>D2</code> tính <b>Thực lĩnh = Lương CB × Ngày công ÷ 26</b>. Sao chép xuống đến hàng 5.',
          data: [
            ['Mã NV', 'Ngày công', 'Lương CB', 'Thực lĩnh', '', 'Lương CB', 'Mã NV', 'Phòng'],
            ['NV04', 26, '', '', '', 9000000, 'NV01', 'Kế toán'],
            ['NV02', 23, '', '', '', 12500000, 'NV02', 'Kinh doanh'],
            ['NV05', 25, '', '', '', 8000000, 'NV03', 'Kho'],
            ['NV01', 24, '', '', '', 15000000, 'NV04', 'Nhân sự'],
            ['', '', '', '', '', 10500000, 'NV05', 'Kho']
          ],
          fill: [
            { range: 'C2:C5', solution: '=INDEX($F$2:$F$6,MATCH(A2,$G$2:$G$6,0))' },
            { range: 'D2:D5', solution: '=C2*B2/26' }
          ],
          fmt: { C: 'int', D: 'int', F: 'int' },
          hint: 'MATCH tìm mã A2 trong cột G, INDEX lấy kết quả ở cột F: <code>=INDEX($F$2:$F$6,MATCH(A2,$G$2:$G$6,0))</code>. D2: <code>=C2*B2/26</code>.',
          explain: 'Cột kết quả nằm bên trái cột tìm. VLOOKUP không làm được, còn INDEX + MATCH không quan tâm thứ tự cột.'
        },
        {
          id: 'ex2',
          task: 'Bảng giá theo <b>sản phẩm</b> (cột A) và <b>tháng</b> (hàng 1). Ở <code>G3</code> viết công thức trả về giá của sản phẩm ghi ở <code>G1</code>, trong tháng ghi ở <code>G2</code>.',
          data: [
            ['Sản phẩm', 'Tháng 1', 'Tháng 2', 'Tháng 3', '', 'Sản phẩm', 'Xi măng (bao)'],
            ['Thép (kg)', 15800, 16200, 16500, '', 'Tháng', 'Tháng 2'],
            ['Xi măng (bao)', 89000, 92000, 91000, '', 'Đơn giá'],
            ['Cát (m3)', 320000, 335000, 340000],
            ['Gạch (viên)', 1250, 1250, 1300]
          ],
          answers: [{ cell: 'G3', solution: '=INDEX(B2:D5,MATCH(G1,A2:A5,0),MATCH(G2,B1:D1,0))' }],
          mustUse: ['INDEX', 'MATCH'],
          fmt: { B: 'int', C: 'int', D: 'int', G: 'int' },
          hint: 'Một MATCH tìm số hàng (G1 trong A2:A5), một MATCH tìm số cột (G2 trong B1:D1), INDEX lấy ô giao nhau trong B2:D5: <code>=INDEX(B2:D5,MATCH(G1,A2:A5,0),MATCH(G2,B1:D1,0))</code>.',
          explain: 'Đổi G1, G2 sang sản phẩm và tháng khác, kết quả tự cập nhật. Đây là cách làm bảng tra giá hai chiều.'
        },
        {
          id: 'ex3',
          task: 'Tính <b>cước</b> cho từng chuyến xe ở <code>D8:D11</code>, tra theo <b>Tuyến</b> và <b>Loại xe</b> trong bảng cước <code>A1:D4</code>. Viết ở <code>D8</code> rồi sao chép xuống.',
          data: [
            ['Tuyến \\ Xe', '1.5 tấn', '3.5 tấn', '8 tấn'],
            ['HN - Bắc Ninh', 900000, 1400000, 2300000],
            ['HN - Hải Phòng', 1800000, 2600000, 4200000],
            ['HN - Nam Định', 1500000, 2200000, 3600000],
            [],
            [],
            ['Chuyến', 'Tuyến', 'Loại xe', 'Cước'],
            ['C01', 'HN - Nam Định', '3.5 tấn'],
            ['C02', 'HN - Bắc Ninh', '8 tấn'],
            ['C03', 'HN - Hải Phòng', '1.5 tấn'],
            ['C04', 'HN - Hải Phòng', '8 tấn']
          ],
          fill: { range: 'D8:D11', solution: '=INDEX($B$2:$D$4,MATCH(B8,$A$2:$A$4,0),MATCH(C8,$B$1:$D$1,0))' },
          mustUse: ['INDEX', 'MATCH'],
          fmt: { B: 'int', C: 'int', D: 'int' },
          hint: 'Giống bài trước, nhưng giá trị tìm là B8 và C8, còn ba vùng phải khoá $: <code>=INDEX($B$2:$D$4,MATCH(B8,$A$2:$A$4,0),MATCH(C8,$B$1:$D$1,0))</code>.',
          explain: 'Ba vùng đều khoá $, còn B8 và C8 để tương đối. Sao chép xuống thì mỗi chuyến tra theo tuyến và loại xe của chính nó.'
        }
      ]
    },

    /* ---------------- Bài 5 ---------------- */
    {
      id: 'xlookup',
      title: 'XLOOKUP: hàm tra cứu thế hệ mới',
      minutes: 14,
      funcs: ['XLOOKUP'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Dùng VLOOKUP lâu, bạn hay gặp ba chuyện bực mình: phải <b>đếm số cột</b>, không tra được <b>sang trái</b>, và mã sai thì cả cột hiện <b>#N/A</b> xấu xí.</p><p><b>XLOOKUP</b> (có trong Excel 365 và Excel 2021 trở lên) giải quyết cả ba: chỉ ra cột để tìm, cột để lấy, và ghi luôn chữ muốn hiện khi không tìm thấy.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> XLOOKUP giống nói với đồng nghiệp: "Tìm mã này <b>ở cột này</b>, rồi đọc cho tôi số <b>ở cột kia</b>, cùng hàng. Không có thì bảo tôi là Không có mã". Không cần đếm cột thứ mấy.' },
        { t: 'h', text: 'Công thức XLOOKUP cơ bản gồm 3 phần, thêm 1 phần tuỳ chọn' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Mã hàng', 'Đơn giá', '', '', 'Mã', 'Tên hàng', 'Đơn giá'],
            ['SP02', '', '', '', 'SP01', 'Giấy A4 (ram)', 68000],
            ['SP09', '', '', '', 'SP02', 'Bút bi (hộp)', 45000],
            ['SP03', '', '', '', 'SP03', 'Mực in', 250000]
          ],
          fmt: { B: 'int', G: 'int' },
          cell: 'B2',
          formula: '=XLOOKUP(A2,$E$2:$E$4,$G$2:$G$4,"Không có mã")',
          parts: [
            { label: 'Tìm cái gì', desc: 'Ô chứa mã cần tra. Ở đây là ô A2, mã SP02.' },
            { label: 'Tìm ở cột nào', desc: 'Chỉ chọn <b>cột chứa mã</b>, không cần chọn cả bảng.' },
            { label: 'Lấy kết quả ở cột nào', desc: 'Chọn thẳng cột chứa kết quả (Đơn giá). Phải <b>dài bằng</b> cột tìm. Nằm bên trái hay bên phải cột mã đều được.' },
            { label: 'Không thấy thì hiện gì', desc: 'Tuỳ chọn. Chữ hoặc số trả về khi không tìm thấy, ví dụ mã SP09 ở ô A3. Bỏ trống phần này thì ra #N/A.', range: 'A3' }
          ],
          note: 'XLOOKUP mặc định tìm chính xác, không cần ghi FALSE như VLOOKUP.'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Mã hàng', 'Đơn giá', '', '', 'Mã', 'Tên hàng', 'Đơn giá'],
            ['SP02', '', '', '', 'SP01', 'Giấy A4 (ram)', 68000],
            ['SP09', '', '', '', 'SP02', 'Bút bi (hộp)', 45000],
            ['SP03', '', '', '', 'SP03', 'Mực in', 250000]
          ],
          fmt: { B: 'int', G: 'int' },
          cell: 'B2',
          formula: '=XLOOKUP(A2,$E$2:$E$4,$G$2:$G$4,"Không có mã")',
          steps: [
            { html: 'Excel đọc ô <b>A2</b>: cần tìm mã <b>SP02</b>.', hl: [['A2', 0]], select: 'A2' },
            { html: 'Dò cột tìm E2:E4 từ trên xuống. E2 là <b>SP01</b>: chưa khớp.', hl: [['A2', 0], ['E2', 1]], select: 'E2' },
            { html: 'E3 là <b>SP02</b>: khớp ở vị trí thứ 2 của cột tìm.', hl: [['A2', 0], ['E3', 1]], select: 'E3' },
            { html: 'Sang cột kết quả G2:G4, lấy ô ở <b>cùng vị trí thứ 2</b>: G3 là <b>45.000</b>.', hl: [['E3', 1], ['G2:G4', 2], ['G3', 2]], select: 'G3' },
            { html: 'Kết quả <b>45.000</b> hiện ở ô B2. Nếu chép xuống B3, mã SP09 không có trong cột E nên ô đó hiện <b>Không có mã</b> thay vì #N/A.', hl: [['B2', 2], ['A3', 3]], select: 'B2' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          title: 'Gõ công thức trực tiếp',
          items: [
            'Bấm vào ô <b>B2</b>, gõ <code>=XLOOKUP(</code> rồi bấm ô <b>A2</b>, gõ dấu phẩy <code>,</code>',
            'Kéo chọn cột mã <b>E2:E4</b>, nhấn <kbd>F4</kbd> để khoá, gõ dấu phẩy.',
            'Kéo chọn cột đơn giá <b>G2:G4</b>, nhấn <kbd>F4</kbd>, gõ dấu phẩy.',
            'Gõ <code>"Không có mã")</code> và nhấn <kbd>Enter</kbd>. Không cần phần này thì gõ luôn <code>)</code> sau G2:G4.',
            'Nhấp đúp vào chấm vuông nhỏ ở góc ô B2 để chép xuống.'
          ]
        },
        {
          t: 'table',
          head: ['Việc cần làm', 'VLOOKUP', 'XLOOKUP'],
          rows: [
            ['Tra theo mã', '=VLOOKUP(A2,$E$2:$G$4,3,FALSE)', '=XLOOKUP(A2,$E$2:$E$4,$G$2:$G$4)'],
            ['Tra sang trái', 'Không làm được', 'Được, chỉ cần chọn cột kết quả bên trái'],
            ['Không tìm thấy', 'Phải bọc IFERROR', 'Ghi luôn ở phần thứ 4'],
            ['Chèn cột vào danh mục', 'Số cột gõ cứng bị sai', 'Không ảnh hưởng'],
            ['Mặc định', 'Gần đúng (nếu quên FALSE)', 'Chính xác']
          ]
        },
        { t: 'h', text: 'Hai phần tuỳ chọn còn lại' },
        { t: 'p', html: 'Đầy đủ, XLOOKUP có 6 phần: <code>=XLOOKUP(tìm gì, cột tìm, cột lấy, [không thấy thì], [kiểu khớp], [chiều tìm])</code>. Phần 5 và 6 chỉ cần khi gặp hai tình huống dưới đây.' },
        {
          t: 'table',
          head: ['Phần', 'Ghi số', 'Ý nghĩa'],
          rows: [
            ['5. Kiểu khớp (match_mode)', '<code>0</code>', 'Chính xác (mặc định)'],
            ['', '<code>-1</code>', 'Không có đúng giá trị thì lấy mốc <b>nhỏ hơn liền kề</b> (dò bậc thang)'],
            ['', '<code>1</code>', 'Không có đúng giá trị thì lấy mốc <b>lớn hơn liền kề</b>'],
            ['6. Chiều tìm (search_mode)', '<code>1</code>', 'Tìm từ trên xuống (mặc định)'],
            ['', '<code>-1</code>', 'Tìm <b>từ dưới lên</b>, lấy lần xuất hiện cuối cùng']
          ]
        },
        {
          t: 'example',
          title: 'Dò bậc thang không cần sắp xếp: kiểu khớp -1. Phụ cấp theo số năm công tác',
          data: [
            ['Nhân viên', 'Số năm', 'Phụ cấp', '', 'Từ năm', 'Phụ cấp'],
            ['Mai', 6, '=XLOOKUP(B2,$E$2:$E$5,$F$2:$F$5,0,-1)', '', 0, 0],
            ['Tuấn', 2, '=XLOOKUP(B3,$E$2:$E$5,$F$2:$F$5,0,-1)', '', 3, 500000],
            ['Hà', 10, '=XLOOKUP(B4,$E$2:$E$5,$F$2:$F$5,0,-1)', '', 5, 1000000],
            ['', '', '', '', 10, 1500000]
          ],
          fmt: { C: 'int', F: 'int' },
          note: 'Không có đúng 6 năm thì lấy mốc nhỏ hơn liền kề là 5. Kết quả giống VLOOKUP gần đúng, nhưng XLOOKUP không đòi bảng phải sắp xếp.'
        },
        {
          t: 'example',
          title: 'Lấy lần xuất hiện cuối cùng: chiều tìm -1. Tra giá nhập gần nhất của một mặt hàng',
          data: [
            ['Ngày nhập', 'Mã hàng', 'Giá nhập', '', 'Mã cần tra', 'H02'],
            ['03/06/2024', 'H01', 52000, '', 'Giá lần đầu', '=XLOOKUP(F1,B2:B6,C2:C6)'],
            ['10/06/2024', 'H02', 118000, '', 'Giá gần nhất', '=XLOOKUP(F1,B2:B6,C2:C6,"",0,-1)'],
            ['18/06/2024', 'H01', 54000],
            ['25/06/2024', 'H02', 121500],
            ['02/07/2024', 'H02', 124000]
          ],
          fmt: { A: 'date', C: 'int', F: 'int' },
          note: 'Tìm từ trên xuống gặp H02 đầu tiên ngày 10/06 (118.000). Tìm từ dưới lên gặp ngày 02/07 (124.000). Nhật ký ghi theo thời gian nên dòng cuối là lần gần nhất. Muốn ghi phần 6 thì phải ghi đủ phần 4 và 5 trước nó.'
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Excel bản cũ không có XLOOKUP', 'Mở file bằng Excel 2016, 2019: <code>#NAME?</code>', 'Gửi cho người dùng bản cũ thì dùng VLOOKUP hoặc INDEX + MATCH'],
            ['Cột tìm và cột lấy dài khác nhau', '<code>XLOOKUP(A2,E2:E4,G2:G5)</code>: <code>#VALUE!</code>', 'Chọn hai cột cùng hàng bắt đầu, cùng hàng kết thúc'],
            ['Bỏ sót phần 4, 5 khi cần phần 6', '<code>XLOOKUP(F1,B2:B6,C2:C6,-1)</code>: -1 bị hiểu là "không thấy thì hiện -1"', 'Ghi đủ: <code>XLOOKUP(F1,B2:B6,C2:C6,"",0,-1)</code>'],
            ['Quên dấu $', 'Kéo xuống thì cột tìm và cột lấy trượt theo', 'Khoá cả hai cột bằng <kbd>F4</kbd>']
          ]
        },
        { t: 'tip', html: 'Trong Excel 365, cột lấy có thể là <b>nhiều cột</b>, ví dụ <code>=XLOOKUP(A2,E2:E4,F2:G4)</code> trả về cả tên hàng lẫn đơn giá, tràn sang hai ô cạnh nhau. Bảng tính mini trên web này chỉ hiển thị giá trị đầu tiên, nên các bài tập chỉ dùng một cột lấy.' },
        {
          t: 'quiz', id: 'q1',
          q: '=XLOOKUP("NV09",A2:A10,C2:C10,"Chưa có") khi NV09 không có trong A2:A10 sẽ trả về gì?',
          options: ['#N/A', '0', 'Chưa có', 'Ô trống'],
          answer: 2,
          explain: 'Phần thứ 4 (không thấy thì hiện gì) được trả về khi không tìm thấy.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Cột B là Tên, cột D là Mã. Công thức XLOOKUP nào lấy Tên theo mã ở G2?',
          options: ['=XLOOKUP(G2,B:B,D:D)', '=XLOOKUP(G2,D:D,B:B)', '=XLOOKUP(D:D,G2,B:B)', '=XLOOKUP(G2,B:D,1)'],
          answer: 1,
          explain: 'Thứ tự: tìm gì (G2), tìm ở cột nào (Mã ở D), lấy ở cột nào (Tên ở B). Tra sang trái không vấn đề gì.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Muốn XLOOKUP lấy dòng cuối cùng khớp với mã (giao dịch gần nhất) thì đặt phần nào?',
          options: ['match_mode = -1', 'match_mode = 2', 'search_mode = -1', 'if_not_found = -1'],
          answer: 2,
          explain: 'search_mode (chiều tìm) = -1 tìm từ dưới lên, nên gặp lần xuất hiện cuối cùng trước.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Ở cột C tra <b>đơn giá</b> theo mã hàng bằng XLOOKUP, dò trong danh mục <code>F2:H5</code>. Mã nào không có trong danh mục thì trả về <b>0</b>. Ở cột D tính <b>Thành tiền = Số lượng × Đơn giá</b>. Viết ở <code>C2</code>, <code>D2</code> rồi sao chép xuống đến hàng 6.',
          data: [
            ['Mã hàng', 'Số lượng', 'Đơn giá', 'Thành tiền', '', 'Mã', 'Tên hàng', 'Đơn giá'],
            ['TB01', 2, '', '', '', 'TB01', 'Máy in', 3500000],
            ['TB03', 5, '', '', '', 'TB02', 'Màn hình', 4200000],
            ['TB07', 1, '', '', '', 'TB03', 'Bàn phím', 650000],
            ['TB04', 10, '', '', '', 'TB04', 'Chuột', 320000],
            ['TB02', 3]
          ],
          fill: [
            { range: 'C2:C6', solution: '=XLOOKUP(A2,$F$2:$F$5,$H$2:$H$5,0)' },
            { range: 'D2:D6', solution: '=B2*C2' }
          ],
          fmt: { C: 'int', D: 'int', H: 'int' },
          hint: 'Tìm ở cột F, lấy ở cột H, không thấy thì ra 0: <code>=XLOOKUP(A2,$F$2:$F$5,$H$2:$H$5,0)</code>. D2: <code>=B2*C2</code>.',
          explain: 'Mã TB07 không có nên đơn giá ra 0 và thành tiền cũng 0. Bảng không bị #N/A làm hỏng phép cộng tổng phía sau.'
        },
        {
          id: 'ex2',
          task: 'Tính <b>phí lưu kho</b> theo số ngày lưu. Ở <code>C2</code> dùng XLOOKUP với <b>kiểu khớp -1</b> (match_mode) để tra đơn giá/ngày theo bảng mốc <code>F2:G5</code>, rồi nhân với số ngày. Sao chép xuống C3:C6.',
          data: [
            ['Lô hàng', 'Số ngày', 'Phí lưu kho', '', '', 'Từ ngày', 'Đơn giá/ngày'],
            ['L01', 4, '', '', '', 0, 150000],
            ['L02', 15, '', '', '', 7, 120000],
            ['L03', 7, '', '', '', 14, 100000],
            ['L04', 45, '', '', '', 30, 80000],
            ['L05', 21]
          ],
          fill: { range: 'C2:C6', solution: '=B2*XLOOKUP(B2,$F$2:$F$5,$G$2:$G$5,0,-1)' },
          mustUse: ['XLOOKUP'],
          fmt: { C: 'int', G: 'int' },
          hint: 'Phần 4 (không thấy thì) để 0, phần 5 (kiểu khớp) là -1: <code>=B2*XLOOKUP(B2,$F$2:$F$5,$G$2:$G$5,0,-1)</code>.',
          explain: 'Lô L02 lưu 15 ngày: không có mốc 15, XLOOKUP lấy mốc nhỏ hơn liền kề là 14, đơn giá 100.000 đ/ngày.'
        },
        {
          id: 'ex3',
          task: 'Nhật ký giao hàng ghi theo thời gian. Ở <code>G2</code> tìm <b>tài xế của chuyến gần nhất</b>, ở <code>G3</code> tìm <b>số kg của chuyến gần nhất</b> giao cho khách ghi ở <code>G1</code>.',
          data: [
            ['Ngày', 'Khách hàng', 'Tài xế', 'Số kg', '', 'Khách hàng', 'Minh Phát'],
            ['02/09/2024', 'Minh Phát', 'Văn Hùng', 850, '', 'Tài xế gần nhất'],
            ['04/09/2024', 'An Khang', 'Quốc Bảo', 1200, '', 'Số kg gần nhất'],
            ['06/09/2024', 'Minh Phát', 'Đức Anh', 640],
            ['09/09/2024', 'Sao Việt', 'Văn Hùng', 300],
            ['11/09/2024', 'Minh Phát', 'Quốc Bảo', 975],
            ['13/09/2024', 'An Khang', 'Đức Anh', 410]
          ],
          answers: [
            { cell: 'G2', solution: '=XLOOKUP(G1,B2:B7,C2:C7,"",0,-1)' },
            { cell: 'G3', solution: '=XLOOKUP(G1,B2:B7,D2:D7,0,0,-1)' }
          ],
          mustUse: ['XLOOKUP'],
          fmt: { A: 'date', D: 'int', G: 'raw' },
          hint: 'Đặt phần 6 (chiều tìm) = -1 để tìm từ dưới lên. Phải ghi đủ phần 4 và 5 trước đó. G2: <code>=XLOOKUP(G1,B2:B7,C2:C7,"",0,-1)</code>. G3 đổi cột lấy thành D2:D7.',
          explain: 'Khách Minh Phát có 3 chuyến, chuyến cuối ngày 11/09 do Quốc Bảo giao 975 kg. Không có chiều tìm -1 thì sẽ ra chuyến đầu tiên ngày 02/09.'
        }
      ]
    },

    /* ---------------- Bài 6 ---------------- */
    {
      id: 'ket-hop',
      title: 'Kết hợp: IFERROR, VLOOKUP + MATCH và CHOOSE',
      minutes: 14,
      funcs: ['CHOOSE'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Bảng đơn hàng do nhiều người nhập, thỉnh thoảng có mã gõ sai. Cột tên khách hiện lên vài ô <b>#N/A</b>, sếp nhìn vào tưởng file hỏng. Cuối tháng, sếp lại muốn xem doanh số <b>theo tháng tự chọn</b> mà không phải sửa công thức.</p><p>Các hàm tra cứu mạnh hơn nhiều khi ghép với hàm khác. Bài này dạy ba cách ghép hay dùng nhất: <b>IFERROR</b> để thay lỗi bằng chữ dễ hiểu, <b>VLOOKUP + MATCH</b> để chọn cột theo tiêu đề, và <b>CHOOSE</b> để đổi mã số thành chữ.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> IFERROR giống người trực tổng đài. "Thử tra giúp tôi. Tra được thì đọc kết quả, <b>không tra được thì nói câu này</b>: Sai mã".' },
        { t: 'h', text: '1. IFERROR + VLOOKUP: công thức gồm 2 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu trên bảng',
          data: [
            ['Mã KH', 'Tên khách', '', '', 'Mã KH', 'Tên khách'],
            ['KH02', '', '', '', 'KH01', 'Cty Minh Phát'],
            ['KH99', '', '', '', 'KH02', 'Cty An Khang'],
            ['KH03', '', '', '', 'KH03', 'Cty Sao Việt']
          ],
          cell: 'B3',
          formula: '=IFERROR(VLOOKUP(A3,$E$2:$F$4,2,FALSE),"Sai mã")',
          parts: [
            { label: 'Thử tính cái gì', desc: 'Cả cụm <code>VLOOKUP(…)</code> là một phần: tra tên khách theo mã ở A3, giống bài 1.' },
            { label: 'Nếu lỗi thì hiện gì', desc: 'Chữ (hoặc số) hiện ra khi phần thứ nhất bị lỗi. Ở đây mã KH99 không có trong danh mục nên ô hiện "Sai mã".', range: 'A3' }
          ],
          note: 'Muốn hiện ô trống thì ghi <code>""</code>, muốn ra số 0 để còn cộng tổng thì ghi <code>0</code>.'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Mã KH', 'Tên khách', '', '', 'Mã KH', 'Tên khách'],
            ['KH02', '', '', '', 'KH01', 'Cty Minh Phát'],
            ['KH99', '', '', '', 'KH02', 'Cty An Khang'],
            ['KH03', '', '', '', 'KH03', 'Cty Sao Việt']
          ],
          cell: 'B3',
          formula: '=IFERROR(VLOOKUP(A3,$E$2:$F$4,2,FALSE),"Sai mã")',
          steps: [
            { html: 'IFERROR cho chạy phần bên trong trước: VLOOKUP đọc ô <b>A3</b>, cần tìm mã <b>KH99</b>.', hl: [['A3', 0]], select: 'A3' },
            { html: 'VLOOKUP dò cột mã E2:E4: KH01, KH02, KH03. Không có KH99.', hl: [['A3', 0], ['E2:E4', 0]], select: 'E4' },
            { html: 'Dò hết bảng mà không thấy, VLOOKUP trả về lỗi <b>#N/A</b>.', hl: [['A3', 4], ['E2:E4', 4]], select: 'A3' },
            { html: 'IFERROR thấy phần thứ nhất bị lỗi, nên bỏ lỗi đó đi và lấy phần thứ hai: <b>Sai mã</b>.', hl: [['A3', 1]], select: 'A3' },
            { html: 'Kết quả <b>Sai mã</b> hiện ở ô B3. Với mã đúng như KH02, VLOOKUP không lỗi nên IFERROR trả về luôn tên khách.', hl: [['B3', 2]], select: 'B3' }
          ]
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'KhachHang.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Bấm tab <b>Formulas</b>.' },
            { id: 'formulas.logical', n: 2, text: 'IFERROR nằm trong nhóm <b>Logical</b>, cùng chỗ với IF.' },
            { id: 'formulas.lookup', n: 3, text: 'VLOOKUP, MATCH, CHOOSE nằm trong <b>Lookup &amp; Reference</b>.' }
          ],
          caption: 'Với công thức lồng nhau, cách nhanh nhất là gõ trực tiếp như các bước dưới đây.'
        },
        {
          t: 'steps',
          title: 'Bọc IFERROR cho một VLOOKUP đã có sẵn',
          items: [
            'Viết VLOOKUP trước và kiểm tra nó chạy đúng với mã đúng: <code>=VLOOKUP(A2,$E$2:$F$4,2,FALSE)</code>.',
            'Bấm vào ô, nhấn <kbd>F2</kbd> để sửa. Đưa con trỏ ra ngay sau dấu <code>=</code>, gõ <code>IFERROR(</code>',
            'Nhấn <kbd>End</kbd> để về cuối công thức, gõ <code>,"Sai mã")</code> rồi nhấn <kbd>Enter</kbd>.',
            'Nhấp đúp vào chấm vuông nhỏ ở góc ô để chép xuống.'
          ]
        },
        { t: 'h', text: '2. VLOOKUP + MATCH: chọn cột theo tiêu đề' },
        { t: 'p', html: 'Thay vì gõ cứng số cột 2, 3, 4, dùng <b>MATCH</b> tìm vị trí của tiêu đề cột trong hàng tiêu đề. Đổi tiêu đề cần xem là kết quả tự đổi, chèn thêm cột cũng không sai.' },
        {
          t: 'anatomy',
          title: 'Xem doanh số của nhân viên ở G1 trong tháng chọn ở G2',
          data: [
            ['Mã NV', 'Tháng 1', 'Tháng 2', 'Tháng 3', '', 'Mã NV', 'NV02'],
            ['NV01', 120000000, 135000000, 98000000, '', 'Tháng', 'Tháng 3'],
            ['NV02', 86000000, 92000000, 110000000, '', 'Doanh số', ''],
            ['NV03', 150000000, 141000000, 162000000]
          ],
          fmt: { B: 'int', C: 'int', D: 'int', G: 'int' },
          cell: 'G3',
          formula: '=VLOOKUP(G1,$A$1:$D$4,MATCH(G2,$A$1:$D$1,0),FALSE)',
          parts: [
            { label: 'Tìm cái gì', desc: 'Mã nhân viên cần xem, ở ô G1.' },
            { label: 'Tìm trong bảng nào', desc: 'Cả bảng doanh số, tính từ cột A.' },
            { label: 'Lấy cột thứ mấy', desc: 'Không gõ số. Cụm <code>MATCH(G2,$A$1:$D$1,0)</code> tìm "Tháng 3" trong hàng tiêu đề, ra <b>4</b>. VLOOKUP lấy cột thứ 4.' },
            { label: 'Tìm chính xác', desc: 'Tra theo mã nên ghi FALSE.' }
          ],
          note: 'Hàng tiêu đề của MATCH phải bắt đầu <b>cùng cột</b> với bảng của VLOOKUP (cùng từ cột A), thì vị trí MATCH tìm ra mới khớp đúng số cột.'
        },
        { t: 'h', text: '3. CHOOSE: chọn giá trị theo số thứ tự' },
        { t: 'p', html: '<code>=CHOOSE(số thứ tự, giá trị 1, giá trị 2, …)</code>: số thứ tự là 1 thì lấy giá trị 1, là 2 thì lấy giá trị 2. Hợp với các mã số ngắn, cố định như hình thức thanh toán, ca làm việc, quý.' },
        {
          t: 'example',
          title: 'Đổi mã thanh toán 1, 2, 3 thành chữ và tính phí giao dịch',
          data: [
            ['Hoá đơn', 'Số tiền', 'Mã TT', 'Hình thức', 'Phí'],
            ['HD01', 5000000, 2, '=CHOOSE(C2,"Tiền mặt","Chuyển khoản","Thẻ")', '=B2*CHOOSE(C2,0,0.001,0.015)'],
            ['HD02', 1200000, 3, '=CHOOSE(C3,"Tiền mặt","Chuyển khoản","Thẻ")', '=B3*CHOOSE(C3,0,0.001,0.015)'],
            ['HD03', 800000, 1, '=CHOOSE(C4,"Tiền mặt","Chuyển khoản","Thẻ")', '=B4*CHOOSE(C4,0,0.001,0.015)']
          ],
          fmt: { B: 'int', E: 'int' },
          note: 'Danh sách dài hoặc hay thay đổi thì nên làm bảng danh mục và dùng VLOOKUP thay cho CHOOSE.'
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['IFERROR che mất lỗi do viết sai', 'Lấy cột 5 trong bảng chỉ có 3 cột, lỗi #REF! bị che thành "Sai mã" ở mọi dòng', 'Kiểm tra công thức chạy đúng rồi mới bọc IFERROR'],
            ['Hàng tiêu đề MATCH lệch cột với bảng', 'Bảng A1:D4 nhưng MATCH tìm trong B1:D1: lấy nhầm cột bên trái một cột', 'Cho hàng tiêu đề bắt đầu cùng cột với bảng'],
            ['Số thứ tự của CHOOSE vượt danh sách', 'Mã ca là 4 nhưng chỉ có 3 giá trị: <code>#VALUE!</code>', 'Bổ sung giá trị hoặc kiểm tra lại mã'],
            ['IFERROR trả về chữ rồi đem nhân', '<code>=B2*IFERROR(VLOOKUP(…),"Sai mã")</code>: <code>#VALUE!</code>', 'Cột dùng để tính thì cho IFERROR trả về 0']
          ]
        },
        { t: 'warn', html: 'IFERROR che <b>mọi</b> lỗi, kể cả lỗi do bạn viết sai công thức. Nếu chỉ muốn bắt lỗi không tìm thấy (#N/A), dùng <code>IFNA</code> thay cho IFERROR, cách viết y hệt.' },
        { t: 'tip', html: 'Trên mạng có mẹo <code>VLOOKUP(…, CHOOSE({1,2}, cột_kết_quả, cột_tìm), 2, 0)</code> để VLOOKUP tra sang trái. Mẹo này khó đọc và bảng tính mini trên web không hỗ trợ. Hãy dùng INDEX + MATCH hoặc XLOOKUP cho rõ ràng.' },
        {
          t: 'quiz', id: 'q1',
          q: '=CHOOSE(3,"Quý 1","Quý 2","Quý 3","Quý 4") trả về gì?',
          options: ['Quý 1', 'Quý 3', '3', 'Quý 4'],
          answer: 1,
          explain: 'Số thứ tự là 3 nên lấy giá trị thứ 3 trong danh sách.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Vì sao nên dùng MATCH thay cho số cột gõ cứng trong VLOOKUP?',
          options: ['Để công thức chạy nhanh hơn', 'Để chọn cột theo tiêu đề, chèn thêm cột không làm sai kết quả', 'Vì VLOOKUP bắt buộc phải có MATCH', 'Để dò gần đúng'],
          answer: 1,
          explain: 'MATCH tìm vị trí của tiêu đề, nên cột di chuyển thì số cột cũng tự cập nhật.'
        },
        {
          t: 'quiz', id: 'q3',
          q: '=IFERROR(VLOOKUP(A2,$E$2:$F$9,2,FALSE),"Không có") với mã ở A2 có trong danh mục. Kết quả là gì?',
          options: ['"Không có"', 'Tên tương ứng với mã A2', '#N/A', 'Ô trống'],
          answer: 1,
          explain: 'VLOOKUP không lỗi nên IFERROR trả về luôn kết quả của VLOOKUP. Chữ "Không có" chỉ hiện khi có lỗi.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Ở cột C tra <b>Tên hàng</b> theo mã từ danh mục <code>F2:H5</code>. Mã nào không có thì hiện chữ <b>Sai mã</b>. Viết ở <code>C2</code> bằng IFERROR + VLOOKUP, sao chép xuống C3:C6. Ở cột D tính <b>Thành tiền = Số lượng × Đơn giá</b>, mã sai thì ra 0.',
          data: [
            ['Mã hàng', 'Số lượng', 'Tên hàng', 'Thành tiền', '', 'Mã', 'Tên hàng', 'Đơn giá'],
            ['VT01', 12, '', '', '', 'VT01', 'Thùng carton', 8500],
            ['VT05', 6, '', '', '', 'VT02', 'Băng keo', 12000],
            ['VT03', 30, '', '', '', 'VT03', 'Màng PE', 95000],
            ['VT02', 48, '', '', '', 'VT04', 'Xốp chèn', 22000],
            ['VT4', 10]
          ],
          fill: [
            { range: 'C2:C6', solution: '=IFERROR(VLOOKUP(A2,$F$2:$H$5,2,FALSE),"Sai mã")' },
            { range: 'D2:D6', solution: '=IFERROR(B2*VLOOKUP(A2,$F$2:$H$5,3,FALSE),0)' }
          ],
          mustUse: ['IFERROR', 'VLOOKUP'],
          fmt: { D: 'int', H: 'int' },
          hint: 'Viết VLOOKUP trước, rồi bọc IFERROR bên ngoài. C2: <code>=IFERROR(VLOOKUP(A2,$F$2:$H$5,2,FALSE),"Sai mã")</code>. D2: <code>=IFERROR(B2*VLOOKUP(A2,$F$2:$H$5,3,FALSE),0)</code>.',
          explain: 'VT05 và VT4 (thiếu số 0) không có trong danh mục nên hiện "Sai mã" và thành tiền 0. Người nhập liệu nhìn vào biết ngay dòng nào cần sửa.'
        },
        {
          id: 'ex2',
          task: 'Báo cáo nhanh: chọn tháng ở <code>G1</code>, các ô <code>B9:B11</code> hiện <b>doanh số tháng đó</b> của từng nhân viên. Dùng VLOOKUP với MATCH để chọn cột theo tiêu đề tháng. Viết ở <code>B9</code> rồi sao chép xuống.',
          data: [
            ['Mã NV', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', '', 'Tháng 3'],
            ['NV01', 120000000, 135000000, 98000000, 142000000],
            ['NV02', 86000000, 92000000, 110000000, 105000000],
            ['NV03', 150000000, 141000000, 162000000, 158000000],
            ['NV04', 64000000, 71000000, 69000000, 80000000],
            ['NV05', 102000000, 99000000, 118000000, 121000000],
            [],
            ['Mã NV', 'Doanh số'],
            ['NV03'],
            ['NV05'],
            ['NV01']
          ],
          fill: { range: 'B9:B11', solution: '=VLOOKUP(A9,$A$2:$E$6,MATCH($G$1,$A$1:$E$1,0),FALSE)' },
          mustUse: ['VLOOKUP', 'MATCH'],
          fmt: { B: 'int', C: 'int', D: 'int', E: 'int' },
          hint: 'MATCH tìm vị trí của G1 trong hàng tiêu đề A1:E1, nhớ khoá <code>$G$1</code> để kéo xuống không trượt: <code>=VLOOKUP(A9,$A$2:$E$6,MATCH($G$1,$A$1:$E$1,0),FALSE)</code>.',
          explain: 'Đổi G1 thành "Tháng 1" hay "Tháng 4", cả báo cáo đổi theo. Hàng tiêu đề của MATCH bắt đầu từ cột A giống bảng VLOOKUP nên vị trí khớp đúng số cột.'
        },
        {
          id: 'ex3',
          task: 'Cột C ghi <b>mã ca làm</b> (1 = Ca sáng, 2 = Ca chiều, 3 = Ca đêm). Ở <code>D2</code> dùng CHOOSE đổi mã thành tên ca. Ở <code>E2</code> tính <b>Phụ cấp = Số giờ × đơn giá theo ca</b>, đơn giá lần lượt là 20000, 25000, 40000 đồng/giờ. Sao chép xuống đến hàng 6.',
          data: [
            ['Nhân viên', 'Số giờ', 'Mã ca', 'Tên ca', 'Phụ cấp'],
            ['Văn Hùng', 48, 3],
            ['Quốc Bảo', 52, 1],
            ['Đức Anh', 40, 2],
            ['Thu Trang', 44, 1],
            ['Minh Khoa', 36, 3]
          ],
          fill: [
            { range: 'D2:D6', solution: '=CHOOSE(C2,"Ca sáng","Ca chiều","Ca đêm")' },
            { range: 'E2:E6', solution: '=B2*CHOOSE(C2,20000,25000,40000)' }
          ],
          mustUse: ['CHOOSE'],
          fmt: { E: 'int' },
          hint: 'Số thứ tự là mã ca ở C2. D2: <code>=CHOOSE(C2,"Ca sáng","Ca chiều","Ca đêm")</code>. E2: <code>=B2*CHOOSE(C2,20000,25000,40000)</code>.',
          explain: 'CHOOSE gọn hơn nhiều so với lồng 3 hàm IF khi mã là số thứ tự 1, 2, 3.'
        }
      ]
    }
  ],

  /* ---------------- Bài kiểm tra Phần 7 ---------------- */
  test: {
    mcq: [
      { q: 'Tra đơn giá theo mã hàng bằng VLOOKUP, đối số cuối nên là gì?', options: ['TRUE', 'FALSE', '1', 'Bỏ trống'], answer: 1, explain: 'Tra theo mã phải dò chính xác: FALSE (hoặc 0). TRUE, 1 hay bỏ trống đều là dò gần đúng.' },
      { q: 'Danh mục ở D2:G50, cột G là Đơn giá. =VLOOKUP(A2,$D$2:$G$50,?,FALSE): dấu ? là bao nhiêu?', options: ['3', '4', '7', 'G'], answer: 1, explain: 'Đếm từ cột D: D=1, E=2, F=3, G=4.' },
      { q: 'VLOOKUP trả về #N/A dù nhìn bằng mắt thấy mã có trong danh mục. Nguyên nhân KHÔNG thể là gì?', options: ['Mã có dấu cách thừa', 'Một bên lưu số, một bên lưu chữ', 'Bảng dò không khoá $ nên bị trượt', 'Mã viết chữ thường còn danh mục viết chữ hoa'], answer: 3, explain: 'VLOOKUP không phân biệt chữ hoa chữ thường. Ba nguyên nhân còn lại đều gây #N/A.' },
      { q: 'Bảng mốc: 0 → Yếu, 5 → Trung bình, 6.5 → Khá, 8 → Giỏi. =VLOOKUP(7.9,bảng,2,TRUE) trả về gì?', options: ['Trung bình', 'Khá', 'Giỏi', '#N/A'], answer: 1, explain: 'Mốc lớn nhất không vượt quá 7.9 là 6.5 nên ra Khá.' },
      { q: 'Khi dùng VLOOKUP dò gần đúng, cột đầu của bảng dò phải thế nào?', options: ['Sắp xếp tăng dần', 'Sắp xếp giảm dần', 'Không trùng lặp và là chữ', 'Không có yêu cầu gì'], answer: 0, explain: 'Dò gần đúng yêu cầu cột mốc tăng dần, nếu không kết quả sẽ sai.' },
      { q: 'Bảng danh mục có mã ở hàng đầu, các mã xếp ngang từ trái sang phải. Dùng hàm nào?', options: ['VLOOKUP', 'HLOOKUP', 'MATCH', 'CHOOSE'], answer: 1, explain: 'Bảng ngang dùng HLOOKUP.' },
      { q: '=INDEX(B2:B10,MATCH("H05",A2:A10,0)) làm gì?', options: ['Trả về vị trí của H05', 'Tìm H05 trong cột A rồi lấy giá trị cùng hàng ở cột B', 'Đếm số lần H05 xuất hiện', 'Trả về ô B5'], answer: 1, explain: 'MATCH tìm vị trí của H05 trong A2:A10, INDEX lấy phần tử ở vị trí đó trong B2:B10.' },
      { q: 'Cột A là Tên hàng, cột C là Mã hàng. Cần lấy Tên theo mã. Cách nào KHÔNG làm được?', options: ['=INDEX(A:A,MATCH(F2,C:C,0))', '=XLOOKUP(F2,C:C,A:A)', '=VLOOKUP(F2,A:C,1,FALSE)', 'Cả hai cách đầu đều làm được'], answer: 2, explain: 'VLOOKUP luôn dò ở cột đầu của vùng (cột A là Tên), không tra sang trái được.' },
      { q: 'Muốn XLOOKUP trả về 0 khi không tìm thấy, công thức nào đúng?', options: ['=XLOOKUP(A2,E:E,G:G,0)', '=XLOOKUP(A2,E:E,G:G,,0)', '=XLOOKUP(A2,E:E,G:G,FALSE)', '=XLOOKUP(0,A2,E:E,G:G)'], answer: 0, explain: 'Đối số thứ 4 là if_not_found. Đối số thứ 5 là match_mode.' },
      { q: 'File dùng XLOOKUP gửi cho đồng nghiệp dùng Excel 2016, họ sẽ thấy gì?', options: ['Kết quả bình thường', 'Lỗi #NAME?', 'Lỗi #N/A', 'Lỗi #REF!'], answer: 1, explain: 'Excel 2016 không có hàm XLOOKUP nên không nhận ra tên hàm: #NAME?.' },
      { q: '=IFERROR(VLOOKUP(A2,$F$2:$H$9,5,FALSE),"Không có") trả về "Không có" cho mọi dòng, dù mã đều có trong danh mục. Vì sao?', options: ['Thiếu $ ở A2', 'Bảng chỉ có 3 cột nhưng lấy cột thứ 5, lỗi #REF! bị IFERROR che mất', 'Phải dùng TRUE', 'IFERROR không dùng được với VLOOKUP'], answer: 1, explain: 'F:H chỉ có 3 cột. Lỗi #REF! do sai số cột bị IFERROR che đi. Vì vậy hãy kiểm tra công thức trước khi bọc IFERROR.' },
      { q: '=CHOOSE(WEEKDAY(A2,2),"T2","T3","T4","T5","T6","T7","CN") với A2 là ngày thứ Tư. Kết quả?', options: ['T2', 'T3', 'T4', '4'], answer: 2, explain: 'WEEKDAY(…,2) cho thứ Tư = 3, CHOOSE lấy giá trị thứ 3 là "T4".' }
    ],
    practice: [
      {
        id: 't1',
        task: 'Bảng bán hàng: ở <code>C2</code> tra <b>Tên hàng</b> từ danh mục <code>F2:H6</code>, mã không có thì hiện <b>Sai mã</b>. Ở <code>D2</code> tính <b>Thành tiền = Số lượng × Đơn giá</b>, mã sai thì ra 0. Sao chép xuống đến hàng 7.',
        data: [
          ['Mã hàng', 'Số lượng', 'Tên hàng', 'Thành tiền', '', 'Mã', 'Tên hàng', 'Đơn giá'],
          ['MH03', 6, '', '', '', 'MH01', 'Nước suối (thùng)', 95000],
          ['MH01', 20, '', '', '', 'MH02', 'Cà phê (gói)', 145000],
          ['MH06', 4, '', '', '', 'MH03', 'Trà xanh (hộp)', 68000],
          ['MH05', 15, '', '', '', 'MH04', 'Bánh quy (hộp)', 52000],
          ['MH02', 3, '', '', '', 'MH05', 'Đường (kg)', 24000],
          ['MH04', 10]
        ],
        fill: [
          { range: 'C2:C7', solution: '=IFERROR(VLOOKUP(A2,$F$2:$H$6,2,FALSE),"Sai mã")' },
          { range: 'D2:D7', solution: '=IFERROR(B2*VLOOKUP(A2,$F$2:$H$6,3,FALSE),0)' }
        ],
        fmt: { D: 'int', H: 'int' }
      },
      {
        id: 't2',
        task: 'Tính <b>cước giao hàng</b> ở <code>D2</code>: tra trong bảng <code>F1:H5</code>, dò <b>gần đúng</b> theo số kg (cột F là mốc kg) và chọn cột theo <b>khu vực</b> (Nội thành / Ngoại thành) bằng MATCH. Sao chép xuống D3:D7.',
        data: [
          ['Đơn hàng', 'Khu vực', 'Số kg', 'Cước', '', 'Từ kg', 'Nội thành', 'Ngoại thành'],
          ['DH01', 'Nội thành', 3, '', '', 0, 25000, 35000],
          ['DH02', 'Ngoại thành', 12, '', '', 5, 40000, 55000],
          ['DH03', 'Nội thành', 25, '', '', 20, 70000, 95000],
          ['DH04', 'Ngoại thành', 60, '', '', 50, 120000, 160000],
          ['DH05', 'Nội thành', 5],
          ['DH06', 'Ngoại thành', 2.5]
        ],
        fill: { range: 'D2:D7', solution: '=VLOOKUP(C2,$F$2:$H$5,MATCH(B2,$F$1:$H$1,0),TRUE)' },
        fmt: { D: 'int', G: 'int', H: 'int' }
      },
      {
        id: 't3',
        task: 'Ở <code>D2</code> dùng XLOOKUP tra <b>phụ cấp chức vụ</b> từ bảng <code>G2:H5</code>; chức vụ không có trong bảng thì phụ cấp là 0. Ở <code>E2</code> tính <b>Tổng lương = Lương CB + Phụ cấp</b>. Sao chép xuống đến hàng 6.',
        data: [
          ['Nhân viên', 'Chức vụ', 'Lương CB', 'Phụ cấp', 'Tổng lương', '', 'Chức vụ', 'Phụ cấp'],
          ['Nguyễn Mai', 'Trưởng phòng', 18000000, '', '', '', 'Giám đốc', 8000000],
          ['Trần Tuấn', 'Nhân viên', 9500000, '', '', '', 'Trưởng phòng', 5000000],
          ['Lê Hà', 'Tổ trưởng', 11000000, '', '', '', 'Tổ trưởng', 2000000],
          ['Phạm Phong', 'Giám đốc', 30000000, '', '', '', 'Kế toán trưởng', 3500000],
          ['Đỗ Khoa', 'Kế toán trưởng', 16000000]
        ],
        fill: [
          { range: 'D2:D6', solution: '=XLOOKUP(B2,$G$2:$G$5,$H$2:$H$5,0)' },
          { range: 'E2:E6', solution: '=C2+D2' }
        ],
        fmt: { C: 'int', D: 'int', E: 'int', H: 'int' }
      }
    ]
  }
});
