ECC.addPart({
  id: 'p5',
  no: 5,
  title: 'Hàm xử lý văn bản',
  short: 'Văn bản',
  desc: 'Cắt, làm sạch, ghép, tìm và thay thế chuỗi chữ; định dạng số và ngày thành câu chữ. Đây là bộ công cụ để xử lý dữ liệu xuất từ phần mềm hoặc do nhiều người nhập lộn xộn.',
  lessons: [
    /* ---------------- Bài 1 ---------------- */
    {
      id: 'cat-chuoi',
      title: 'LEFT, RIGHT, MID, LEN: cắt chuỗi và đếm ký tự',
      minutes: 12,
      funcs: ['LEFT', 'RIGHT', 'MID', 'LEN'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Phần mềm vận chuyển xuất ra cột <b>mã đơn</b> dạng <code>HN-2024-0153</code>. Trong mã có đủ thông tin: 2 chữ đầu là <b>tỉnh</b>, 4 số giữa là <b>năm</b>, 4 số cuối là <b>số thứ tự</b>. Sếp cần báo cáo số đơn theo tỉnh, mà bảng lại không có cột tỉnh riêng.</p><p>Gõ tay từng dòng thì lâu và dễ sai. Các hàm LEFT, RIGHT, MID <b>cắt đúng phần cần lấy</b> trong một công thức, kéo xuống là xong cả nghìn dòng.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> LEFT là "cắt lấy mấy ký tự bên trái". RIGHT là "cắt lấy mấy ký tự bên phải". MID là "cắt một khúc ở giữa", giống cắt khúc bánh mì: bắt đầu từ đâu và dài bao nhiêu. LEN là "đếm xem chuỗi có bao nhiêu ký tự".' },
        {
          t: 'table',
          head: ['Hàm', 'Làm gì', 'Ví dụ', 'Kết quả'],
          rows: [
            ['LEFT', 'Lấy n ký tự từ bên trái', '=LEFT("HN-2024-0153",2)', 'HN'],
            ['RIGHT', 'Lấy n ký tự từ bên phải', '=RIGHT("HN-2024-0153",4)', '0153'],
            ['MID', 'Lấy n ký tự, bắt đầu từ vị trí bất kỳ', '=MID("HN-2024-0153",4,4)', '2024'],
            ['LEN', 'Đếm tổng số ký tự (kể cả dấu cách, dấu gạch)', '=LEN("HN-2024-0153")', '12']
          ]
        },
        { t: 'h', text: 'Công thức MID gồm 3 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu',
          data: [
            ['Mã đơn', 'Tỉnh', 'Năm', 'Số TT'],
            ['HN-2024-0153', '=LEFT(A2,2)', '', '=RIGHT(A2,4)'],
            ['DN-2023-0087', '=LEFT(A3,2)', '=MID(A3,4,4)', '=RIGHT(A3,4)'],
            ['SG-2024-1120', '=LEFT(A4,2)', '=MID(A4,4,4)', '=RIGHT(A4,4)']
          ],
          cell: 'C2',
          formula: '=MID(A2,4,4)',
          parts: [
            { label: 'Lấy từ chuỗi nào', desc: 'Ô chứa chuỗi cần cắt. Ở đây là ô A2, đang chứa mã <b>HN-2024-0153</b>.' },
            { label: 'Bắt đầu từ ký tự thứ mấy', desc: 'Đếm từ trái sang, ký tự đầu tiên là 1. H là 1, N là 2, dấu gạch là 3, số 2 là 4. Năm bắt đầu ở ký tự thứ <b>4</b>.', range: 'A2' },
            { label: 'Lấy mấy ký tự', desc: 'Năm có 4 chữ số nên lấy <b>4</b> ký tự, tính cả ký tự bắt đầu.', range: 'A2' }
          ],
          note: 'LEFT và RIGHT chỉ có 2 phần: lấy từ chuỗi nào, lấy mấy ký tự. Chúng luôn cắt từ một đầu nên không cần vị trí bắt đầu.'
        },
        { t: 'h', text: 'Excel đếm ký tự như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Mã đơn', 'Tỉnh', 'Năm', 'Số TT'],
            ['HN-2024-0153', '=LEFT(A2,2)', '', '=RIGHT(A2,4)'],
            ['DN-2023-0087', '=LEFT(A3,2)', '=MID(A3,4,4)', '=RIGHT(A3,4)'],
            ['SG-2024-1120', '=LEFT(A4,2)', '=MID(A4,4,4)', '=RIGHT(A4,4)']
          ],
          cell: 'C2',
          formula: '=MID(A2,4,4)',
          steps: [
            { html: 'Excel đọc ô <b>A2</b> và tách thành từng ký tự: <code>H|N|-|2|0|2|4|-|0|1|5|3</code>. Tổng cộng 12 ký tự.', hl: [['A2', 0]], select: 'A2' },
            { html: 'Đánh số từ trái sang: H là 1, N là 2, dấu <code>-</code> là 3, số <code>2</code> là 4. Dấu gạch cũng được đếm như một ký tự.', hl: [['A2', 0]], select: 'A2' },
            { html: 'Phần thứ hai của công thức là <b>4</b>: Excel bắt đầu ở ký tự thứ 4: <code>H|N|-|<b>2</b>|0|2|4|-|0|1|5|3</code>.', hl: [['A2', 1]], select: 'A2' },
            { html: 'Phần thứ ba là <b>4</b>: lấy 4 ký tự tính từ đó, tức các ký tự thứ 4, 5, 6, 7: <code>H|N|-|<b>2|0|2|4</b>|-|0|1|5|3</code>.', hl: [['A2', 2]], select: 'A2' },
            { html: 'Phần còn lại <code>-0153</code> bị bỏ qua. Kết quả <b>2024</b> hiện ở ô C2.', hl: [['C2', 2]], select: 'C2' },
            { html: 'Kéo công thức xuống, A2 tự đổi thành A3, A4. Các mã cùng kiểu nên năm luôn nằm ở ký tự 4 đến 7: ra 2023, 2024.', hl: [['C2:C4', 2]], select: 'C4' }
          ]
        },
        { t: 'h', text: 'LEFT và RIGHT: cắt ở hai đầu chuỗi' },
        { t: 'p', html: 'Phần cần lấy nằm sát đầu chuỗi thì dùng LEFT, sát cuối chuỗi thì dùng RIGHT. Chỉ cần cho biết lấy mấy ký tự. Bỏ trống số ký tự thì Excel lấy 1 ký tự.' },
        {
          t: 'example',
          title: 'Lấy mã tỉnh (2 ký tự đầu) và số thứ tự (4 ký tự cuối)',
          data: [
            ['Mã đơn', 'Mã tỉnh', 'Số TT'],
            ['HP-2024-0029', '=LEFT(A2,2)', '=RIGHT(A2,4)'],
            ['CT-2023-1105', '=LEFT(A3,2)', '=RIGHT(A3,4)']
          ],
          note: '<code>HP-2024-0029</code>: LEFT lấy <code><b>H|P</b>|-|…</code>, RIGHT lấy <code>…|-|<b>0|0|2|9</b></code>. Số 0 ở đầu vẫn giữ nguyên vì kết quả là chữ.'
        },
        { t: 'h', text: 'LEN: đếm số ký tự' },
        { t: 'p', html: 'LEN chỉ có một phần: chuỗi cần đếm. Chữ, số, dấu cách, dấu gạch, chữ có dấu như "ễ" đều tính là 1 ký tự. LEN rất hay dùng để kiểm tra dữ liệu nhập đủ độ dài chưa.' },
        {
          t: 'example',
          title: 'Kiểm tra số điện thoại có đủ 10 chữ số không',
          data: [
            ['Khách hàng', 'Điện thoại', 'Số ký tự'],
            ['Trần Minh Đức', '\'0901234567', '=LEN(B2)'],
            ['Phạm Thu Hà', '\'098765432', '=LEN(B3)']
          ],
          note: 'Số của chị Hà chỉ có 9 ký tự, tức là nhập thiếu một chữ số.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'formulas',
          file: 'DonHang.xlsx',
          groups: ['Function Library'],
          marks: [
            { id: 'tab.formulas', n: 1, text: 'Cách 1: bấm tab <b>Formulas</b>.' },
            { id: 'formulas.text', n: 2, text: 'Bấm <b>Text</b> (nhóm hàm văn bản), chọn <b>MID</b>. Excel mở hộp thoại có 3 ô đúng như 3 phần ở trên.' }
          ],
          caption: 'Cách 2 nhanh hơn: gõ thẳng công thức vào ô, như các bước dưới đây.'
        },
        {
          t: 'steps',
          title: 'Cách 2: gõ công thức trực tiếp',
          items: [
            'Bấm vào ô <b>C2</b>, gõ <code>=MID(</code>. Excel hiện dòng gợi ý các phần cần điền.',
            'Bấm chuột vào ô <b>A2</b>, rồi gõ dấu phẩy <code>,</code>',
            'Gõ <code>4,4)</code> và nhấn <kbd>Enter</kbd>.',
            'Bấm lại ô C2, <b>nhấp đúp vào chấm vuông nhỏ</b> ở góc dưới bên phải ô để chép công thức xuống hết bảng.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Quên đếm dấu gạch, dấu cách', 'Viết <code>=MID(A2,3,4)</code> nên ra "-202"', 'Viết chuỗi ra giấy, đánh số từng ký tự kể cả dấu gạch'],
            ['Kết quả là chữ, không cộng được', '"2024" căn trái, SUM ra 0', 'Bọc thêm VALUE: <code>=VALUE(MID(A2,4,4))</code> (Bài 5)'],
            ['Các mã dài ngắn khác nhau', '"HN-153" và "HCM-2024" không cắt cố định được', 'Tìm vị trí dấu gạch bằng FIND rồi mới cắt (Bài 4)'],
            ['Dấu cách thừa ở đầu ô', '" HN-2024-0153" thì LEFT(A2,2) ra " H"', 'Làm sạch bằng TRIM trước (Bài 2)']
          ]
        },
        { t: 'warn', html: 'Kết quả của LEFT, RIGHT, MID luôn là <b>chữ</b>, kể cả khi trông giống số. "2024" lấy ra bằng MID sẽ căn trái và không cộng trừ đúng được. Muốn dùng như số, bọc thêm hàm VALUE: <code>=VALUE(MID(A2,4,4))</code>.' },
        { t: 'tip', html: 'Dùng LEN để kiểm tra dữ liệu nhập: số di động Việt Nam phải đủ 10 ký tự, mã số thuế doanh nghiệp 10 ký tự. <code>=IF(LEN(B2)=10,"Đủ","Sai")</code> giúp lọc nhanh dòng nhập sai.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Ô A2 chứa "NV2019005". Công thức nào lấy ra năm vào làm "2019"?',
          options: ['=LEFT(A2,4)', '=MID(A2,3,4)', '=RIGHT(A2,4)', '=MID(A2,4,3)'],
          answer: 1,
          explain: 'N là 1, V là 2, năm bắt đầu ở ký tự thứ 3 và dài 4 ký tự: MID(A2,3,4).'
        },
        {
          t: 'quiz', id: 'q2',
          q: '=LEN("Hà Nội 2") cho kết quả bao nhiêu?',
          options: ['6', '7', '8', '9'],
          answer: 2,
          explain: 'H, à, dấu cách, N, ộ, i, dấu cách, 2 là 8 ký tự. Dấu cách cũng được đếm.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Ô A2 chứa "DH-00125". =RIGHT(A2,3) cho kết quả gì?',
          options: ['125', 'DH-', '001', '00125'],
          answer: 0,
          explain: 'RIGHT lấy 3 ký tự cuối: <code>D|H|-|0|0|<b>1|2|5</b></code>, ra "125" (dạng chữ).'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Mã đơn có dạng <code>HN-2024-0153</code>. <b>2 ký tự đầu</b> là mã tỉnh. Viết công thức ở <code>B2</code> để lấy mã tỉnh, rồi sao chép xuống B3:B6.',
          data: [
            ['Mã đơn', 'Mã tỉnh'],
            ['HN-2024-0153'],
            ['SG-2024-0871'],
            ['DN-2023-0412'],
            ['HP-2024-0029'],
            ['CT-2023-1105']
          ],
          fill: { range: 'B2:B6', solution: '=LEFT(A2,2)' },
          mustUse: ['LEFT'],
          strict: false,
          hint: 'Mã tỉnh nằm sát bên trái, dài 2 ký tự. Dùng LEFT: <code>=LEFT(A2,2)</code>.',
          explain: 'LEFT cắt từ đầu chuỗi. Có cột mã tỉnh rồi, bạn đếm số đơn theo tỉnh bằng COUNTIF rất dễ.'
        },
        {
          id: 'ex2',
          task: 'Mã nhân viên dạng <code>NV2019005</code>. Sau chữ NV là <b>năm vào làm</b> (4 ký tự). <b>3 ký tự cuối</b> là số thứ tự. Ở <code>B2</code> lấy năm vào làm, ở <code>C2</code> lấy số thứ tự, rồi sao chép xuống đến hàng 6.',
          data: [
            ['Mã NV', 'Năm vào làm', 'Số TT'],
            ['NV2019005'],
            ['NV2021118'],
            ['NV2015002'],
            ['NV2023240'],
            ['NV2020067']
          ],
          fill: [
            { range: 'B2:B6', solution: '=MID(A2,3,4)' },
            { range: 'C2:C6', solution: '=RIGHT(A2,3)' }
          ],
          strict: false,
          hint: 'Đếm: <code>N|V|2|0|1|9|0|0|5</code>, năm bắt đầu ở ký tự thứ 3. B2: <code>=MID(A2,3,4)</code>. C2: <code>=RIGHT(A2,3)</code>.',
          explain: 'Phần cần lấy nằm ở giữa thì dùng MID, nằm ở cuối thì dùng RIGHT. Nhớ đếm vị trí bắt đầu từ 1.'
        },
        {
          id: 'ex3',
          task: 'Kiểm tra cột số điện thoại khách hàng. Ở <code>C2</code> đếm số ký tự của số điện thoại. Ở <code>D2</code> ghi <b>"Đủ"</b> nếu đúng 10 ký tự, ngược lại ghi <b>"Sai"</b>. Sao chép xuống đến hàng 6.',
          data: [
            ['Khách hàng', 'Điện thoại', 'Số ký tự', 'Kiểm tra'],
            ['Trần Minh Đức', '\'0901234567'],
            ['Phạm Thu Hà', '\'098765432'],
            ['Lê Quốc Bảo', '\'0912345678'],
            ['Võ Thị Lan', '\'09356789012'],
            ['Đỗ Văn Hùng', '\'0868123456']
          ],
          fill: [
            { range: 'C2:C6', solution: '=LEN(B2)' },
            { range: 'D2:D6', solution: '=IF(LEN(B2)=10,"Đủ","Sai")' }
          ],
          mustUse: ['LEN'],
          strict: false,
          hint: 'C2: <code>=LEN(B2)</code>. D2 dùng IF để so sánh với 10: <code>=IF(LEN(B2)=10,"Đủ","Sai")</code>, hoặc <code>=IF(C2=10,"Đủ","Sai")</code>.',
          explain: 'Số điện thoại lưu dạng chữ để giữ số 0 đầu. LEN đếm cả số 0 đó, nên phát hiện được số thiếu hoặc thừa chữ số.'
        }
      ]
    },

    /* ---------------- Bài 2 ---------------- */
    {
      id: 'chuan-hoa',
      title: 'TRIM, UPPER, LOWER, PROPER: làm sạch dữ liệu',
      minutes: 10,
      funcs: ['TRIM', 'UPPER', 'LOWER', 'PROPER'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Danh sách khách hàng do nhiều người nhập: người gõ <code>  nguyễn   văn  an </code> thừa dấu cách, người gõ <code>TRẦN THỊ BÌNH</code> viết hoa hết. Hậu quả là VLOOKUP báo <code>#N/A</code>, COUNTIF đếm sai, báo cáo trông thiếu chuyên nghiệp.</p><p>Sửa tay từng ô thì mất thời gian. Bốn hàm TRIM, UPPER, LOWER, PROPER <b>chuẩn hoá cả cột</b> chỉ bằng một công thức.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> TRIM giống "là phẳng" chuỗi chữ: bỏ hết dấu cách thừa, giữa hai từ chỉ còn một dấu cách. UPPER giống bật <kbd>Caps Lock</kbd>: viết hoa tất cả. LOWER thì ngược lại. PROPER viết hoa chữ đầu mỗi từ, giống cách viết tên người.' },
        {
          t: 'table',
          head: ['Hàm', 'Làm gì', 'Ví dụ', 'Kết quả'],
          rows: [
            ['TRIM', 'Xoá dấu cách thừa ở đầu, cuối và giữa (chỉ giữ 1 dấu cách giữa các từ)', '=TRIM("  Lê   Thị  Lan ")', 'Lê Thị Lan'],
            ['UPPER', 'Đổi tất cả thành chữ HOA', '=UPPER("sp01")', 'SP01'],
            ['LOWER', 'Đổi tất cả thành chữ thường', '=LOWER("AN.LE@CONGTY.VN")', 'an.le@congty.vn'],
            ['PROPER', 'Viết hoa chữ cái đầu mỗi từ', '=PROPER("nguyễn văn an")', 'Nguyễn Văn An']
          ]
        },
        { t: 'h', text: 'Công thức làm sạch họ tên: lồng hai hàm' },
        {
          t: 'anatomy',
          title: 'Bấm vào phần có màu để xem nó lấy dữ liệu ở đâu',
          data: [
            ['Họ tên gốc', 'Họ tên chuẩn', 'Số ký tự gốc', 'Số ký tự sau'],
            ['  nguyễn   văn  an ', '', '=LEN(A2)', '=LEN(B2)'],
            ['TRẦN THỊ   BÌNH', '=PROPER(TRIM(A3))', '=LEN(A3)', '=LEN(B3)'],
            ['lê hoàng CƯỜNG  ', '=PROPER(TRIM(A4))', '=LEN(A4)', '=LEN(B4)']
          ],
          cell: 'B2',
          formula: '=PROPER(TRIM(A2))',
          parts: [
            { label: 'Viết hoa chữ đầu cho chuỗi nào', desc: 'PROPER chỉ có một phần. Ở đây phần đó là <b>kết quả của TRIM(A2)</b>: chuỗi trong ô A2 sau khi đã bỏ dấu cách thừa.' }
          ],
          note: 'Công thức lồng nhau được tính <b>từ trong ra ngoài</b>: Excel làm TRIM(A2) trước, rồi đưa kết quả cho PROPER. TRIM, UPPER, LOWER cũng chỉ có một phần: chuỗi cần xử lý.'
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước. Dấu · thay cho dấu cách để dễ nhìn',
          data: [
            ['Họ tên gốc', 'Họ tên chuẩn', 'Số ký tự gốc', 'Số ký tự sau'],
            ['  nguyễn   văn  an ', '', '=LEN(A2)', '=LEN(B2)'],
            ['TRẦN THỊ   BÌNH', '=PROPER(TRIM(A3))', '=LEN(A3)', '=LEN(B3)'],
            ['lê hoàng CƯỜNG  ', '=PROPER(TRIM(A4))', '=LEN(A4)', '=LEN(B4)']
          ],
          cell: 'B2',
          formula: '=PROPER(TRIM(A2))',
          steps: [
            { html: 'Excel đọc ô <b>A2</b>: <code>··nguyễn···văn··an·</code>. Cả chữ lẫn dấu cách là <b>19</b> ký tự (xem ô C2).', hl: [['A2', 0], ['C2', 1]], select: 'A2' },
            { html: 'TRIM chạy trước. Nó xoá 2 dấu cách ở đầu: <code>nguyễn···văn··an·</code>.', hl: [['A2', 0]], select: 'A2' },
            { html: 'Giữa các từ, TRIM chỉ giữ lại <b>1</b> dấu cách: <code>nguyễn·văn·an·</code>.', hl: [['A2', 0]], select: 'A2' },
            { html: 'TRIM xoá nốt dấu cách ở cuối: <code>nguyễn·văn·an</code>, còn 13 ký tự.', hl: [['A2', 0]], select: 'A2' },
            { html: 'PROPER nhận chuỗi đã sạch và viết hoa chữ đầu mỗi từ: <code><b>N</b>guyễn·<b>V</b>ăn·<b>A</b>n</code>.', hl: [['B2', 2]], select: 'B2' },
            { html: 'Kết quả <b>Nguyễn Văn An</b> hiện ở ô B2. Ô D2 đếm lại chỉ còn 13 ký tự: đã bớt 6 dấu cách thừa.', hl: [['B2', 2], ['D2', 1]], select: 'B2' }
          ]
        },
        { t: 'h', text: 'UPPER và LOWER: đổi cả chuỗi sang chữ hoa hoặc chữ thường' },
        { t: 'p', html: 'Mã hàng, mã khách thường quy ước viết hoa, dùng UPPER. Email luôn viết thường, dùng LOWER. Nên lồng thêm TRIM để bỏ luôn dấu cách thừa.' },
        {
          t: 'example',
          title: 'Chuẩn hoá mã khách và email',
          data: [
            ['Mã khách', 'Email', 'Mã chuẩn', 'Email chuẩn'],
            [' kh015', 'Mai.Tran@Gmail.COM', '=UPPER(TRIM(A2))', '=LOWER(TRIM(B2))'],
            ['Kh027 ', ' BAO.LE@CONGTY.VN', '=UPPER(TRIM(A3))', '=LOWER(TRIM(B3))']
          ],
          note: 'Bấm vào ô C2, D2 để xem công thức. Mọi mã đều thành dạng KH015, mọi email đều viết thường.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          title: 'Làm sạch một cột rồi thay hẳn dữ liệu gốc',
          items: [
            'Chèn một cột trống ngay cạnh cột cần làm sạch, ví dụ cột B.',
            'Bấm ô <b>B2</b>, gõ <code>=PROPER(TRIM(A2))</code> rồi nhấn <kbd>Enter</kbd>.',
            'Nhấp đúp vào chấm vuông nhỏ ở góc ô B2 để chép công thức xuống hết cột.',
            'Chọn cả cột B, nhấn <kbd>Ctrl</kbd> + <kbd>C</kbd>.',
            'Bấm ô A2, vào <b>Home › Paste › Values</b> (hoặc nhấn <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>V</kbd>, chọn Values) để dán đè giá trị đã sạch lên cột gốc.',
            'Xoá cột B (cột công thức phụ).'
          ]
        },
        {
          t: 'excelui',
          tab: 'home',
          file: 'KhachHang.xlsx',
          groups: ['Clipboard'],
          marks: [
            { id: 'tab.home', n: 1, text: 'Bấm tab <b>Home</b>.' },
            { id: 'home.paste', n: 2, text: 'Bấm mũi tên dưới nút <b>Paste</b>, chọn <b>Values</b> (biểu tượng có số 123). Chỉ giá trị được dán, công thức bị bỏ đi.' }
          ]
        },
        { t: 'warn', html: 'Nếu xoá cột gốc mà <b>chưa dán Values</b>, cột công thức sẽ báo lỗi <code>#REF!</code> vì mất ô nó tham chiếu tới.' },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Chỉ dùng PROPER, quên TRIM', '<code>=PROPER(A2)</code> vẫn còn dấu cách thừa', 'Lồng cả hai: <code>=PROPER(TRIM(A2))</code>'],
            ['PROPER viết hoa cả chữ viết tắt', '"công ty tnhh an phát" thành "Công Ty Tnhh An Phát"', 'Với tên công ty, kiểm tra lại bằng mắt và sửa tay chữ viết tắt'],
            ['Dấu cách lạ khi dán từ web', 'TRIM chạy xong vẫn còn khoảng trắng', 'Dùng <code>=TRIM(SUBSTITUTE(A2,CHAR(160)," "))</code>'],
            ['Xoá cột gốc trước khi dán Values', 'Cột kết quả báo <code>#REF!</code>', 'Luôn Paste › Values trước, xoá cột phụ sau']
          ]
        },
        { t: 'tip', html: 'Muốn biết một ô có dấu cách thừa không: <code>=LEN(A2)-LEN(TRIM(A2))</code>. Kết quả 0 là ô đã sạch.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Ô A2 chứa "  PHẠM  minh   tuấn ". Công thức nào cho ra "Phạm Minh Tuấn"?',
          options: ['=PROPER(A2)', '=TRIM(A2)', '=PROPER(TRIM(A2))', '=UPPER(TRIM(A2))'],
          answer: 2,
          explain: 'Cần cả hai việc: TRIM xoá dấu cách thừa, PROPER viết hoa chữ đầu mỗi từ. Chỉ dùng PROPER thì vẫn còn dấu cách thừa.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'VLOOKUP tìm mã "SP01" nhưng báo #N/A, dù nhìn bảng thấy có "SP01 ". Nguyên nhân và cách sửa?',
          options: ['Sai số cột cần lấy, sửa lại số cột', 'Ô trong bảng có dấu cách thừa ở cuối, dùng TRIM để làm sạch', 'Phải viết thường "sp01"', 'VLOOKUP không tìm được chữ'],
          answer: 1,
          explain: '"SP01 " có thêm dấu cách nên khác "SP01". Làm sạch bằng TRIM là cách sửa chuẩn.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Ô A2 chứa "  Lê   An " (2 dấu cách đầu, 3 dấu cách giữa, 1 dấu cách cuối). =LEN(TRIM(A2)) cho kết quả bao nhiêu?',
          options: ['5', '10', '6', '4'],
          answer: 0,
          explain: 'TRIM cho ra "Lê An": L, ê, dấu cách, A, n là 5 ký tự. Chuỗi gốc có 10 ký tự.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Danh sách họ tên do nhiều người nhập, chỗ hoa chỗ thường, thừa dấu cách. Viết công thức ở <code>B2</code> để chuẩn hoá thành dạng <b>Nguyễn Văn An</b>: không thừa dấu cách, viết hoa chữ đầu mỗi từ. Sao chép xuống B3:B6.',
          data: [
            ['Họ tên nhập', 'Họ tên chuẩn'],
            ['  nguyễn   thị mai'],
            ['TRẦN QUỐC  TOÀN '],
            ['lê   văn hùng'],
            [' phạm THU hà  '],
            ['võ minh   KHOA']
          ],
          fill: { range: 'B2:B6', solution: '=PROPER(TRIM(A2))' },
          mustUse: ['TRIM', 'PROPER'],
          strict: false,
          hint: 'Bỏ dấu cách thừa bằng TRIM, rồi đưa kết quả cho PROPER: <code>=PROPER(TRIM(A2))</code>.',
          explain: 'TRIM làm sạch dấu cách, PROPER chuẩn hoá chữ hoa. Ở bài này đổi thứ tự lồng cũng ra cùng kết quả, nhưng nên tập thói quen TRIM trước.'
        },
        {
          id: 'ex2',
          task: 'Chuẩn hoá bảng khách hàng. Ở <code>C2</code> đổi <b>mã khách</b> thành chữ HOA và bỏ dấu cách thừa. Ở <code>D2</code> đổi <b>email</b> thành chữ thường và bỏ dấu cách thừa. Sao chép xuống đến hàng 5.',
          data: [
            ['Mã khách', 'Email', 'Mã chuẩn', 'Email chuẩn'],
            [' kh001', 'An.Nguyen@Gmail.com '],
            ['Kh002 ', '  LAN.TRAN@CONGTY.VN'],
            ['kH003', 'Hoang.Le@Yahoo.com'],
            ['  KH004', ' minh.vo@Outlook.COM ']
          ],
          fill: [
            { range: 'C2:C5', solution: '=UPPER(TRIM(A2))' },
            { range: 'D2:D5', solution: '=LOWER(TRIM(B2))' }
          ],
          strict: false,
          hint: 'Mã thì viết hoa: C2 là <code>=UPPER(TRIM(A2))</code>. Email thì viết thường: D2 là <code>=LOWER(TRIM(B2))</code>.',
          explain: 'Mã thường được quy ước viết hoa, email luôn viết thường. Chuẩn hoá trước khi tra cứu giúp tránh lỗi #N/A.'
        },
        {
          id: 'ex3',
          task: 'Đếm xem mỗi tên đang có <b>bao nhiêu dấu cách thừa</b>. Ở <code>B2</code> lấy số ký tự gốc trừ đi số ký tự sau khi TRIM, rồi sao chép xuống B3:B5.',
          data: [
            ['Họ tên nhập', 'Số dấu cách thừa'],
            ['  Đặng Văn  Lâm'],
            ['Bùi Thị Ngọc'],
            [' Hồ   Quang  Huy  '],
            ['Ngô Thanh Tâm ']
          ],
          fill: { range: 'B2:B5', solution: '=LEN(A2)-LEN(TRIM(A2))' },
          mustUse: ['TRIM', 'LEN'],
          strict: false,
          hint: 'Số ký tự gốc là <code>LEN(A2)</code>. Số ký tự sau khi làm sạch là <code>LEN(TRIM(A2))</code>. Lấy cái trước trừ cái sau: <code>=LEN(A2)-LEN(TRIM(A2))</code>.',
          explain: 'Kết quả 0 nghĩa là dòng đó đã sạch. Dùng cách này để kiểm tra nhanh chất lượng dữ liệu trước khi làm báo cáo.'
        }
      ]
    },

    /* ---------------- Bài 3 ---------------- */
    {
      id: 'noi-chuoi',
      title: 'Nối chuỗi: &, CONCATENATE, CONCAT, TEXTJOIN',
      minutes: 12,
      funcs: ['CONCATENATE', 'CONCAT', 'TEXTJOIN'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Bảng nhân sự để họ, tên đệm, tên ở ba cột riêng. Bảng giao hàng để số nhà, đường, phường, quận, tỉnh ở năm cột riêng. Khi in phiếu giao hay gửi danh sách cho đối tác, bạn cần <b>một ô</b> chứa họ tên đầy đủ, <b>một ô</b> chứa địa chỉ đầy đủ.</p><p>Ngược với cắt chuỗi, bài này học <b>ghép chuỗi</b>: dấu <code>&amp;</code> và các hàm CONCATENATE, CONCAT, TEXTJOIN.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> dấu <code>&amp;</code> giống băng keo, dán các mẩu chữ nối đuôi nhau theo thứ tự bạn viết. TEXTJOIN giống xâu chuỗi hạt có sẵn dấu ngăn cách giữa các hạt, gặp hạt trống thì tự bỏ qua.' },
        {
          t: 'table',
          head: ['Cách', 'Ví dụ', 'Ghi chú'],
          rows: [
            ['Dấu &amp;', '=A2&amp;"-"&amp;B2', 'Đơn giản nhất, dùng được ở mọi phiên bản'],
            ['CONCATENATE', '=CONCATENATE(A2,"-",B2)', 'Hàm cũ, chỉ nhận từng ô riêng lẻ'],
            ['CONCAT', '=CONCAT(A2:D2)', 'Excel 2019/365. Nhận được cả vùng'],
            ['TEXTJOIN', '=TEXTJOIN(", ",TRUE,A2:D2)', 'Excel 2019/365. Tự chèn dấu ngăn cách, bỏ qua ô trống']
          ]
        },
        { t: 'h', text: 'Ghép bằng dấu &: Excel làm từng bước' },
        { t: 'p', html: 'Muốn ghép thêm chữ cố định như dấu cách, dấu gạch, chữ "Đơn ", hãy đặt nó trong ngoặc kép: <code>" "</code>, <code>"-"</code>. Ô thì viết địa chỉ ô, không cần ngoặc kép.' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Họ', 'Tên đệm', 'Tên', 'Họ tên'],
            ['Nguyễn', 'Văn', 'An', ''],
            ['Trần', 'Thị', 'Bình', '=A3&" "&B3&" "&C3'],
            ['Lê', 'Hoàng', 'Cường', '=A4&" "&B4&" "&C4']
          ],
          cell: 'D2',
          formula: '=A2&" "&B2&" "&C2',
          steps: [
            { html: 'Excel lấy mẩu đầu tiên: ô <b>A2</b> là <code>Nguyễn</code>.', hl: [['A2', 0]], select: 'A2' },
            { html: 'Dán thêm <code>" "</code> (một dấu cách trong ngoặc kép): <code>Nguyễn·</code>. Dấu · thay cho dấu cách để dễ nhìn.', hl: [['A2', 0]], select: 'A2' },
            { html: 'Dán thêm ô <b>B2</b>: <code>Nguyễn·Văn</code>.', hl: [['A2:B2', 0]], select: 'B2' },
            { html: 'Dán thêm một dấu cách nữa: <code>Nguyễn·Văn·</code>.', hl: [['A2:B2', 0]], select: 'B2' },
            { html: 'Dán thêm ô <b>C2</b>: <code>Nguyễn·Văn·An</code>.', hl: [['A2:C2', 0]], select: 'C2' },
            { html: 'Kết quả <b>Nguyễn Văn An</b> hiện ở ô D2. Nếu quên <code>" "</code>, các phần sẽ dính liền thành "NguyễnVănAn".', hl: [['D2', 2]], select: 'D2' }
          ]
        },
        { t: 'h', text: 'TEXTJOIN gồm 3 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu',
          data: [
            ['Số nhà', 'Đường', 'Phường', 'Quận', 'Tỉnh/TP', 'Địa chỉ đầy đủ'],
            ['25', 'Lê Lợi', 'Bến Nghé', 'Quận 1', 'TP.HCM', ''],
            ['8', 'Trần Phú', '', 'Hải Châu', 'Đà Nẵng', '=TEXTJOIN(", ",TRUE,A3:E3)']
          ],
          cell: 'F2',
          formula: '=TEXTJOIN(", ",TRUE,A2:E2)',
          parts: [
            { label: 'Ngăn cách bằng gì', desc: 'Chữ chèn vào giữa hai phần liền nhau. Ở đây là dấu phẩy và một dấu cách, đặt trong ngoặc kép.' },
            { label: 'Có bỏ qua ô trống không', desc: '<b>TRUE</b> là bỏ qua ô trống, không sinh ra dấu phẩy thừa. Hàng 3 thiếu phường (ô C3 trống) nên rất cần TRUE.', range: 'C3' },
            { label: 'Ghép những ô nào', desc: 'Cả vùng A2:E2. TEXTJOIN ghép lần lượt từ trái sang phải.' }
          ],
          note: 'Ô F3 dùng cùng công thức cho hàng 3. Kết quả không có ", ," thừa dù ô phường trống.'
        },
        { t: 'h', text: 'CONCATENATE và CONCAT' },
        { t: 'p', html: 'CONCATENATE làm đúng việc của dấu <code>&amp;</code>, chỉ khác là viết các mẩu trong ngoặc, ngăn bằng dấu phẩy. CONCAT là bản mới, nhận được cả vùng như <code>A2:B2</code> nhưng không tự chèn dấu ngăn cách.' },
        {
          t: 'example',
          title: 'Ba cách ghép mã lô hàng',
          data: [
            ['Kho', 'Mã hàng', 'Dùng &', 'CONCATENATE', 'CONCAT cả vùng'],
            ['HCM', 'SP015', '=A2&"-"&B2', '=CONCATENATE(A2,"-",B2)', '=CONCAT(A2:B2)'],
            ['HN', 'SP102', '=A3&"-"&B3', '=CONCATENATE(A3,"-",B3)', '=CONCAT(A3:B3)']
          ],
          note: 'Cột C và D giống hệt nhau. Cột E dính liền "HCMSP015" vì CONCAT không chèn dấu gạch.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          items: [
            'Bấm vào ô <b>D2</b>, gõ dấu <code>=</code>.',
            'Bấm ô <b>A2</b>, gõ <code>&amp;" "&amp;</code>. Dấu &amp; gõ bằng <kbd>Shift</kbd> + <kbd>7</kbd>.',
            'Bấm ô <b>B2</b>, gõ tiếp <code>&amp;" "&amp;</code>, rồi bấm ô <b>C2</b>.',
            'Nhấn <kbd>Enter</kbd>, rồi nhấp đúp vào chấm vuông nhỏ ở góc ô để chép xuống.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Quên dấu cách', '<code>=A2&amp;B2</code> ra "NguyễnAn"', 'Ghép thêm <code>" "</code> ở giữa'],
            ['Chữ cố định không có ngoặc kép', '<code>=A2&amp;-&amp;B2</code> báo lỗi', 'Viết <code>"-"</code> trong ngoặc kép'],
            ['Dùng dấu + thay cho &amp;', '<code>=A2+B2</code> với hai ô chữ báo <code>#VALUE!</code>', 'Dấu + chỉ để cộng số. Ghép chữ thì dùng &amp;'],
            ['Ghép ngày ra số lạ', '<code>="Ngày "&amp;B2</code> ra "Ngày 45356"', 'Bọc ngày bằng TEXT (Bài 5)']
          ]
        },
        { t: 'tip', html: 'Muốn xuống dòng ngay trong ô kết quả, ghép thêm <code>CHAR(10)</code>: <code>=A2&amp;CHAR(10)&amp;B2</code>, rồi bật <b>Home › Wrap Text</b> cho ô đó.' },
        {
          t: 'quiz', id: 'q1',
          q: 'A2 = "HN", B2 = "0153". Công thức nào ra "HN/0153"?',
          options: ['=A2+"/"+B2', '=A2&"/"&B2', '=CONCAT(A2:B2)', '=A2&/&B2'],
          answer: 1,
          explain: 'Dùng & để nối, ký tự "/" phải nằm trong ngoặc kép. CONCAT(A2:B2) ra "HN0153", thiếu dấu "/".'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'A2:C2 chứa "Hà Nội", (trống), "Việt Nam". =TEXTJOIN(" - ",TRUE,A2:C2) cho kết quả gì?',
          options: ['Hà Nội -  - Việt Nam', 'Hà Nội - Việt Nam', 'Hà NộiViệt Nam', '#VALUE!'],
          answer: 1,
          explain: 'Phần thứ hai là TRUE nên ô trống bị bỏ qua, chỉ còn một dấu " - " giữa hai phần.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'A2 = "Nguyễn", B2 = "An". =A2&B2 cho kết quả gì?',
          options: ['Nguyễn An', 'NguyễnAn', 'Nguyễn&An', '#VALUE!'],
          answer: 1,
          explain: 'Dấu & chỉ dán liền hai mẩu. Muốn có dấu cách phải viết <code>=A2&amp;" "&amp;B2</code>.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tạo <b>mã lô hàng</b> ở cột D theo mẫu <code>Kho-Mã hàng-Tháng</code>, ví dụ <code>HCM-SP015-T3</code>. Cột C là số tháng, phía trước thêm chữ T. Viết ở <code>D2</code> rồi sao chép xuống D3:D5.',
          data: [
            ['Kho', 'Mã hàng', 'Tháng', 'Mã lô'],
            ['HCM', 'SP015', 3],
            ['HN', 'SP102', 4],
            ['DN', 'SP047', 11],
            ['CT', 'SP210', 7]
          ],
          fill: { range: 'D2:D5', solution: '=A2&"-"&B2&"-T"&C2' },
          hint: 'Ghép lần lượt: ô A2, chữ "-", ô B2, chữ "-T", ô C2. Chữ cố định để trong ngoặc kép: <code>=A2&amp;"-"&amp;B2&amp;"-T"&amp;C2</code>.',
          explain: 'Viết bằng CONCATENATE(A2,"-",B2,"-T",C2) cũng ra kết quả như nhau. Số tháng tự chuyển thành chữ khi ghép.'
        },
        {
          id: 'ex2',
          task: 'Ghép <b>địa chỉ giao hàng đầy đủ</b> ở cột F từ các cột A:E. Các phần ngăn cách bằng dấu phẩy và một dấu cách <code>", "</code>. Một số dòng thiếu thông tin, không được để dấu phẩy thừa. Viết ở <code>F2</code> rồi sao chép xuống F3:F5.',
          data: [
            ['Số nhà', 'Đường', 'Phường/Xã', 'Quận/Huyện', 'Tỉnh/TP', 'Địa chỉ'],
            ['25', 'Lê Lợi', 'Bến Nghé', 'Quận 1', 'TP.HCM'],
            ['112', 'Nguyễn Trãi', '', 'Thanh Xuân', 'Hà Nội'],
            ['', 'KCN Tân Tạo', 'Tân Tạo A', 'Bình Tân', 'TP.HCM'],
            ['8', 'Trần Phú', 'Thạch Thang', 'Hải Châu', 'Đà Nẵng']
          ],
          fill: { range: 'F2:F5', solution: '=TEXTJOIN(", ",TRUE,A2:E2)' },
          mustUse: ['TEXTJOIN'],
          strict: false,
          hint: 'Dùng TEXTJOIN: ngăn cách là <code>", "</code>, phần thứ hai là TRUE để bỏ ô trống, phần cuối là cả vùng: <code>=TEXTJOIN(", ",TRUE,A2:E2)</code>.',
          explain: 'Đây là lúc TEXTJOIN hơn hẳn dấu &: một công thức ngắn mà xử lý được cả dòng thiếu dữ liệu.'
        },
        {
          id: 'ex3',
          task: 'Viết <b>tin nhắn cho tài xế</b> ở cột D theo mẫu: <code>Đơn DH001: 12 kiện, giao Quận 7</code>. Viết ở <code>D2</code> rồi sao chép xuống D3:D5.',
          data: [
            ['Mã đơn', 'Số kiện', 'Khu vực', 'Tin nhắn'],
            ['DH001', 12, 'Quận 7'],
            ['DH002', 5, 'Thủ Đức'],
            ['DH003', 30, 'Bình Dương'],
            ['DH004', 8, 'Gò Vấp']
          ],
          fill: { range: 'D2:D5', solution: '="Đơn "&A2&": "&B2&" kiện, giao "&C2' },
          hint: 'Chia câu thành các mẩu: "Đơn ", A2, ": ", B2, " kiện, giao ", C2. Chú ý dấu cách nằm trong ngoặc kép: <code>="Đơn "&amp;A2&amp;": "&amp;B2&amp;" kiện, giao "&amp;C2</code>.',
          explain: 'Ghép câu tự động giúp tạo hàng loạt tin nhắn, nội dung email chỉ bằng một lần kéo công thức.'
        }
      ]
    },

    /* ---------------- Bài 4 ---------------- */
    {
      id: 'tim-thay-the',
      title: 'FIND, SEARCH, SUBSTITUTE, REPLACE: tìm và thay thế',
      minutes: 15,
      funcs: ['FIND', 'SEARCH', 'SUBSTITUTE', 'REPLACE'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Cột họ tên có người 2 chữ như "Lê Minh", có người 4 chữ như "Trần Thị Bích Ngọc". Muốn tách riêng <b>họ</b> thì không thể dùng LEFT với một con số cố định, vì họ dài ngắn khác nhau.</p><p>Cách làm là <b>tìm vị trí dấu cách đầu tiên</b> bằng FIND, rồi mới cắt. Bài này cũng học SUBSTITUTE và REPLACE để thay ký tự, ví dụ bỏ dấu chấm trong số điện thoại <code>0901.234.567</code>.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> FIND giống dò ngón tay trên dòng chữ, đếm từng ký tự cho đến khi gặp thứ cần tìm, rồi báo "nó ở vị trí thứ mấy". SUBSTITUTE giống lệnh Tìm và thay (<kbd>Ctrl</kbd> + <kbd>H</kbd>) nhưng nằm trong công thức. REPLACE giống cầm kéo cắt bỏ đúng một khúc ở vị trí biết trước, rồi dán khúc mới vào.' },
        { t: 'h', text: 'Công thức FIND gồm 2 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu',
          data: [
            ['Họ tên', 'Vị trí dấu cách', 'Họ', 'Phần còn lại'],
            ['Nguyễn Văn An', '', '=LEFT(A2,FIND(" ",A2)-1)', '=MID(A2,FIND(" ",A2)+1,100)'],
            ['Lê Thị Hồng Nhung', '=FIND(" ",A3)', '=LEFT(A3,FIND(" ",A3)-1)', '=MID(A3,FIND(" ",A3)+1,100)'],
            ['Đỗ Hùng', '=FIND(" ",A4)', '=LEFT(A4,FIND(" ",A4)-1)', '=MID(A4,FIND(" ",A4)+1,100)']
          ],
          cell: 'B2',
          formula: '=FIND(" ",A2)',
          parts: [
            { label: 'Tìm ký tự nào', desc: 'Ở đây là <b>một dấu cách</b> đặt trong ngoặc kép <code>" "</code>. Có thể tìm cả một đoạn chữ, ví dụ <code>"-"</code> hay <code>"HN"</code>.' },
            { label: 'Tìm trong chuỗi nào', desc: 'Ô chứa chuỗi cần dò. Ở đây là ô A2, đang chứa <b>Nguyễn Văn An</b>.' }
          ],
          note: 'FIND trả về một <b>con số</b>: vị trí của lần xuất hiện đầu tiên. Có thể thêm phần thứ ba (tuỳ chọn) để bắt đầu dò từ ký tự thứ mấy. Không tìm thấy thì báo lỗi <code>#VALUE!</code>.'
        },
        { t: 'h', text: 'Tách họ: Excel tính từng bước' },
        { t: 'p', html: 'Kết hợp FIND với LEFT: <code>=LEFT(A2,FIND(" ",A2)-1)</code>. FIND cho biết dấu cách ở đâu, LEFT cắt phần bên trái nó.' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Họ tên', 'Vị trí dấu cách', 'Họ', 'Phần còn lại'],
            ['Nguyễn Văn An', '=FIND(" ",A2)', '', '=MID(A2,FIND(" ",A2)+1,100)'],
            ['Lê Thị Hồng Nhung', '=FIND(" ",A3)', '=LEFT(A3,FIND(" ",A3)-1)', '=MID(A3,FIND(" ",A3)+1,100)'],
            ['Đỗ Hùng', '=FIND(" ",A4)', '=LEFT(A4,FIND(" ",A4)-1)', '=MID(A4,FIND(" ",A4)+1,100)']
          ],
          cell: 'C2',
          formula: '=LEFT(A2,FIND(" ",A2)-1)',
          steps: [
            { html: 'Excel làm phần trong cùng trước: <code>FIND(" ",A2)</code>. Ô <b>A2</b> tách từng ký tự là <code>N|g|u|y|ễ|n| |V|ă|n| |A|n</code>.', hl: [['A2', 0]], select: 'A2' },
            { html: 'Dò từ trái sang: N là 1, g là 2, u là 3, y là 4, ễ là 5, n là 6. Chưa gặp dấu cách.', hl: [['A2', 0]], select: 'A2' },
            { html: 'Ký tự thứ <b>7</b> là dấu cách: <code>N|g|u|y|ễ|n|<b>␣</b>|V|ă|n| |A|n</code>. FIND trả về <b>7</b> (đúng như ô B2).', hl: [['A2', 0], ['B2', 1]], select: 'B2' },
            { html: 'Tính tiếp <code>7-1</code> được <b>6</b>. Trừ 1 để không lấy luôn dấu cách vào họ.', hl: [['B2', 1]], select: 'B2' },
            { html: 'LEFT(A2,6) cắt 6 ký tự bên trái: <code><b>N|g|u|y|ễ|n</b>| |V|ă|n| |A|n</code>.', hl: [['A2', 0]], select: 'A2' },
            { html: 'Kết quả <b>Nguyễn</b> hiện ở ô C2.', hl: [['C2', 2]], select: 'C2' },
            { html: 'Kéo xuống: "Lê Thị Hồng Nhung" có dấu cách ở vị trí 3 nên LEFT lấy 2 ký tự, ra "Lê". Mỗi dòng tự tìm vị trí riêng.', hl: [['A3', 0], ['B3', 1], ['C3', 2]], select: 'C3' }
          ]
        },
        { t: 'p', html: 'Cột D lấy <b>phần còn lại</b> sau họ: <code>=MID(A2,FIND(" ",A2)+1,100)</code>. Bắt đầu từ ký tự ngay sau dấu cách (7 + 1 = 8), lấy 100 ký tự. Số 100 chỉ là "lấy thật nhiều" cho chắc đủ.' },
        { t: 'h', text: 'SEARCH: giống FIND nhưng không phân biệt hoa thường' },
        { t: 'p', html: 'SEARCH viết giống hệt FIND. Khác ở hai điểm: SEARCH <b>không phân biệt hoa thường</b>, và cho phép ký tự đại diện <code>*</code>, <code>?</code>. FIND thì phân biệt chữ "A" với chữ "a".' },
        {
          t: 'example',
          title: 'Tìm chữ "an" trong "Lan Anh"',
          data: [
            ['Chuỗi', 'FIND("A",…)', 'SEARCH("A",…)'],
            ['Lan Anh', '=FIND("A",A2)', '=SEARCH("A",A2)']
          ],
          note: 'FIND bỏ qua chữ "a" thường ở vị trí 2, chỉ nhận chữ "A" hoa ở vị trí 5. SEARCH coi hai chữ như nhau nên ra 2.'
        },
        { t: 'h', text: 'SUBSTITUTE và REPLACE: thay ký tự' },
        {
          t: 'syntax',
          code: '=SUBSTITUTE(text, old_text, new_text, [instance_num])',
          args: [
            ['text', 'Bắt buộc. Chuỗi gốc.', 'Trong chuỗi nào'],
            ['old_text', 'Bắt buộc. Đoạn chữ cần thay.', 'Thay chữ gì'],
            ['new_text', 'Bắt buộc. Đoạn chữ thay vào. Để "" nghĩa là xoá.', 'Bằng chữ gì'],
            ['instance_num', 'Tuỳ chọn. Chỉ thay lần xuất hiện thứ mấy. Bỏ trống thì thay tất cả.', 'Thay lần thứ mấy']
          ]
        },
        {
          t: 'syntax',
          code: '=REPLACE(old_text, start_num, num_chars, new_text)',
          args: [
            ['old_text', 'Bắt buộc. Chuỗi gốc.', 'Trong chuỗi nào'],
            ['start_num', 'Bắt buộc. Vị trí bắt đầu thay.', 'Từ ký tự thứ mấy'],
            ['num_chars', 'Bắt buộc. Số ký tự bị thay.', 'Thay mấy ký tự'],
            ['new_text', 'Bắt buộc. Chuỗi thay vào.', 'Bằng chữ gì']
          ]
        },
        {
          t: 'example',
          title: 'SUBSTITUTE thay theo nội dung, REPLACE thay theo vị trí',
          data: [
            ['Dữ liệu gốc', 'Việc cần làm', 'Kết quả'],
            ['0901.234.567', 'Bỏ dấu chấm', '=SUBSTITUTE(A2,".","")'],
            ['KH-HN-001', 'Đổi HN thành HCM', '=REPLACE(A3,4,2,"HCM")'],
            ['\'0901234567', 'Đổi số 0 đầu thành +84', '=REPLACE(A4,1,1,"+84")'],
            ['2024-03-05', 'Chỉ thay dấu - thứ 2', '=SUBSTITUTE(A5,"-","/",2)']
          ],
          note: '<code>K|H|-|<b>H|N</b>|-|0|0|1</code>: HN bắt đầu ở ký tự 4, dài 2 ký tự, nên REPLACE(A3,4,2,"HCM"). Biết <b>chữ</b> cần thay thì dùng SUBSTITUTE. Biết <b>vị trí</b> cần thay thì dùng REPLACE.'
        },
        { t: 'h', text: 'Kỹ thuật lấy tên (chữ cuối cùng)' },
        { t: 'p', html: 'Họ tên Việt Nam có thể 2, 3, 4 chữ, nên khó tìm dấu cách <i>cuối cùng</i>. Mẹo kinh điển là:' },
        {
          t: 'syntax',
          code: '=TRIM(RIGHT(SUBSTITUTE(A2," ",REPT(" ",50)),50))',
          args: [
            ['SUBSTITUTE(A2," ",REPT(" ",50))', 'Thay mỗi dấu cách bằng 50 dấu cách. Các chữ bị đẩy cách xa nhau.', 'Bước 1'],
            ['RIGHT(…,50)', 'Lấy 50 ký tự cuối: chắc chắn chỉ chứa chữ cuối cùng cùng một đống dấu cách.', 'Bước 2'],
            ['TRIM(…)', 'Xoá hết dấu cách thừa, còn lại đúng tên.', 'Bước 3']
          ]
        },
        {
          t: 'example',
          title: 'Lấy tên cho mọi độ dài họ tên',
          data: [
            ['Họ tên', 'Tên'],
            ['Nguyễn Văn An', '=TRIM(RIGHT(SUBSTITUTE(A2," ",REPT(" ",50)),50))'],
            ['Lê Thị Hồng Nhung', '=TRIM(RIGHT(SUBSTITUTE(A3," ",REPT(" ",50)),50))'],
            ['Đỗ Hùng', '=TRIM(RIGHT(SUBSTITUTE(A4," ",REPT(" ",50)),50))']
          ],
          note: 'Số 50 chỉ cần lớn hơn độ dài một chữ. Công thức hơi dài nhưng chỉ cần chép lại và đổi A2.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'excelui',
          tab: 'data',
          file: 'NhanSu.xlsx',
          groups: ['Data Tools'],
          marks: [
            { id: 'tab.data', n: 1, text: 'Ngoài công thức, tab <b>Data</b> có công cụ tách cột.' },
            { id: 'data.textcols', n: 2, text: '<b>Text to Columns</b> (tách cột): tách một cột thành nhiều cột theo dấu cách hoặc dấu phẩy.' },
            { id: 'data.flashfill', n: 3, text: '<b>Flash Fill</b> (tự điền nhanh): gõ mẫu 1 đến 2 dòng, Excel tự đoán phần còn lại. Phím tắt <kbd>Ctrl</kbd> + <kbd>E</kbd>.' }
          ],
          caption: 'Hai công cụ này làm một lần là xong, nhưng dữ liệu gốc đổi thì kết quả không tự cập nhật. Công thức FIND thì tự cập nhật.'
        },
        {
          t: 'steps',
          title: 'Gõ công thức tách họ',
          items: [
            'Bấm ô <b>C2</b>, gõ <code>=LEFT(A2,</code>',
            'Gõ tiếp <code>FIND(" ",A2)-1)</code>. Chú ý giữa hai ngoặc kép có <b>một dấu cách</b>.',
            'Nhấn <kbd>Enter</kbd>, rồi nhấp đúp vào chấm vuông nhỏ ở góc ô để chép xuống.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Ô chỉ có một chữ, không có dấu cách', 'FIND(" ","Hùng") báo <code>#VALUE!</code>', 'Bọc IFERROR: <code>=IFERROR(LEFT(A2,FIND(" ",A2)-1),A2)</code>'],
            ['Quên trừ 1', '<code>=LEFT(A2,FIND(" ",A2))</code> ra "Nguyễn " có dấu cách cuối', 'Viết <code>FIND(" ",A2)-1</code>'],
            ['Dấu cách thừa ở đầu ô', '" Nguyễn Văn An" thì FIND ra 1, LEFT ra rỗng', 'Làm sạch trước: dùng TRIM(A2) thay cho A2'],
            ['FIND phân biệt hoa thường', 'FIND("an","Văn An") không thấy "An"', 'Dùng SEARCH nếu không cần phân biệt'],
            ['Dùng SUBSTITUTE để đổi số 0 đầu', 'SUBSTITUTE(A2,"0","+84") thay cả số 0 ở giữa', 'Dùng REPLACE(A2,1,1,"+84")']
          ]
        },
        { t: 'tip', html: 'Đếm số chữ trong ô: <code>=LEN(TRIM(A2))-LEN(SUBSTITUTE(A2," ",""))+1</code>. Số dấu cách bị xoá chính là số chữ trừ 1 (dữ liệu cần sạch dấu cách thừa trước).' },
        {
          t: 'quiz', id: 'q1',
          q: '=FIND("A","Lan Anh") cho kết quả gì?',
          options: ['2', '5', '#VALUE!', '1'],
          answer: 1,
          explain: 'FIND phân biệt hoa thường nên bỏ qua chữ "a" thường ở vị trí 2. Chữ "A" hoa nằm ở vị trí 5 (L, a, n, dấu cách, A). Nếu dùng SEARCH thì kết quả là 2.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Muốn đổi "0901.234.567" thành "0901234567", dùng công thức nào?',
          options: ['=REPLACE(A2,".","")', '=SUBSTITUTE(A2,".","")', '=TRIM(A2)', '=FIND(".",A2)'],
          answer: 1,
          explain: 'SUBSTITUTE thay mọi dấu "." bằng chuỗi rỗng, tức là xoá. REPLACE cần vị trí và số ký tự, không nhận nội dung cần thay.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Điểm khác nhau giữa FIND và SEARCH là gì?',
          options: ['FIND trả về chữ, SEARCH trả về số', 'SEARCH không phân biệt hoa thường, FIND có phân biệt', 'FIND chỉ tìm được dấu cách', 'Không khác gì'],
          answer: 1,
          explain: 'SEARCH("an","Văn An") tìm thấy "An", còn FIND("an",…) thì không vì phân biệt hoa thường.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tách <b>Họ</b> (chữ đầu tiên) ra cột B. Dùng FIND để tìm vị trí dấu cách đầu tiên. Viết ở <code>B2</code> rồi sao chép xuống B3:B6.',
          data: [
            ['Họ tên', 'Họ'],
            ['Nguyễn Văn An'],
            ['Trần Thị Bích Ngọc'],
            ['Lê Minh'],
            ['Phạm Quốc Việt'],
            ['Hoàng Thị Thu Trang']
          ],
          fill: { range: 'B2:B6', solution: '=LEFT(A2,FIND(" ",A2)-1)' },
          mustUse: ['FIND'],
          strict: false,
          hint: 'Họ là phần bên trái dấu cách đầu tiên. Độ dài họ bằng vị trí dấu cách trừ 1: <code>=LEFT(A2,FIND(" ",A2)-1)</code>.',
          explain: 'FIND tìm vị trí riêng cho từng dòng, LEFT cắt theo vị trí đó. Đây là kỹ thuật nền tảng của xử lý chuỗi.'
        },
        {
          id: 'ex2',
          task: 'Tách <b>Tên</b> (chữ cuối cùng) ra cột B để sắp xếp danh sách theo tên. Họ tên có độ dài khác nhau. Viết ở <code>B2</code> rồi sao chép xuống B3:B6.',
          data: [
            ['Họ tên', 'Tên'],
            ['Nguyễn Văn An'],
            ['Trần Thị Bích Ngọc'],
            ['Lê Minh'],
            ['Phạm Quốc Việt'],
            ['Hoàng Thị Thu Trang']
          ],
          fill: { range: 'B2:B6', solution: '=TRIM(RIGHT(SUBSTITUTE(A2," ",REPT(" ",50)),50))' },
          mustUse: ['SUBSTITUTE'],
          strict: false,
          hint: 'Dùng kỹ thuật 3 bước trong bài: <code>=TRIM(RIGHT(SUBSTITUTE(A2," ",REPT(" ",50)),50))</code>.',
          explain: 'Thay mỗi dấu cách bằng 50 dấu cách, lấy 50 ký tự cuối, TRIM xong là ra chữ cuối cùng. Kỹ thuật này dùng được cho mọi chuỗi có ngăn cách, chỉ cần đổi " " thành ký tự ngăn cách khác.'
        },
        {
          id: 'ex3',
          task: 'Chuẩn hoá số điện thoại sang dạng quốc tế. Ở <code>B2</code> <b>bỏ hết dấu chấm</b>. Ở <code>C2</code> đổi <b>số 0 đầu tiên</b> của kết quả cột B thành <code>+84</code>. Sao chép xuống đến hàng 5.',
          data: [
            ['Điện thoại gốc', 'Bỏ dấu chấm', 'Quốc tế'],
            ['0901.234.567'],
            ['0912.888.456'],
            ['0868.135.790'],
            ['0377.246.810']
          ],
          fill: [
            { range: 'B2:B5', solution: '=SUBSTITUTE(A2,".","")' },
            { range: 'C2:C5', solution: '=REPLACE(B2,1,1,"+84")' }
          ],
          strict: false,
          hint: 'B2 thay mọi dấu chấm bằng chuỗi rỗng: <code>=SUBSTITUTE(A2,".","")</code>. C2 thay 1 ký tự ở vị trí 1: <code>=REPLACE(B2,1,1,"+84")</code>.',
          explain: 'SUBSTITUTE thay theo nội dung (mọi dấu chấm), REPLACE thay theo vị trí (ký tự đầu). Dùng SUBSTITUTE để đổi số 0 sẽ sai vì nó thay cả các số 0 ở giữa.'
        }
      ]
    },

    /* ---------------- Bài 5 ---------------- */
    {
      id: 'text-value',
      title: 'TEXT, VALUE, REPT: chuyển đổi số và chữ',
      minutes: 12,
      funcs: ['TEXT', 'VALUE', 'REPT'],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Bạn ghép câu <code>="Đơn DH001 giao ngày "&amp;B2</code> để gửi khách, nhưng kết quả lại là "Đơn DH001 giao ngày <b>45356</b>". Ngày đẹp đẽ trong ô biến thành một con số lạ.</p><p>Chiều ngược lại cũng hay gặp: cột số lượng xuất từ phần mềm kho ở dạng chữ, SUM cộng ra 0. Hàm <b>TEXT</b> đổi số thành chữ theo kiểu bạn muốn. Hàm <b>VALUE</b> đổi chữ trở lại thành số.</p>'
        },
        { t: 'p', html: '<b>Hiểu nôm na:</b> TEXT giống <b>chụp ảnh</b> con số theo kiểu trình bày bạn chọn: ảnh đẹp, ghép vào câu được, nhưng không cộng trừ được nữa. VALUE làm ngược lại: biến chữ trông giống số thành số thật. REPT giống con dấu: đóng lặp lại một ký tự nhiều lần.' },
        { t: 'p', html: 'Vì sao ngày lại thành 45356? Vì Excel lưu ngày dưới dạng <b>số thứ tự ngày</b> tính từ 01/01/1900. Ô chỉ <i>hiển thị</i> 05/03/2024, còn bên trong là 45356. Khi ghép, Excel lấy con số bên trong.' },
        { t: 'h', text: 'Công thức TEXT gồm 2 phần' },
        {
          t: 'anatomy',
          title: 'Bấm vào từng phần có màu để xem nó lấy dữ liệu ở đâu',
          data: [
            ['Mã đơn', 'Ngày giao', 'Ghép thẳng', 'Ngày dạng chữ'],
            ['DH001', '05/03/2024', '="Giao ngày "&B2', ''],
            ['DH002', '18/03/2024', '="Giao ngày "&B3', '=TEXT(B3,"dd/mm/yyyy")']
          ],
          cell: 'D2',
          formula: '=TEXT(B2,"dd/mm/yyyy")',
          parts: [
            { label: 'Đổi giá trị nào', desc: 'Ô chứa số hoặc ngày cần đổi. Ở đây là ô B2, ngày 05/03/2024.' },
            { label: 'Theo mẫu nào', desc: 'Mã định dạng đặt trong ngoặc kép. <code>dd</code> là ngày 2 chữ số, <code>mm</code> là tháng 2 chữ số, <code>yyyy</code> là năm 4 chữ số.', range: 'B2' }
          ],
          note: 'So sánh cột C (ghép thẳng, ra số 45356) với cột D (dùng TEXT, ra đúng 05/03/2024).'
        },
        {
          t: 'table',
          head: ['Mã định dạng', 'Giá trị', 'Kết quả', 'Dùng khi'],
          rows: [
            ['"dd/mm/yyyy"', '05/03/2024', '05/03/2024', 'Ngày đầy đủ'],
            ['"mm/yyyy"', '05/03/2024', '03/2024', 'Kỳ lương, kỳ báo cáo'],
            ['"yyyy"', '05/03/2024', '2024', 'Lấy năm dạng chữ'],
            ['"000"', '7', '007', 'Thêm số 0 cho đủ độ dài mã'],
            ['"0.00"', '3.14159', '3.14', 'Làm tròn 2 chữ số khi hiển thị'],
            ['"#,##0"', '1250000', '1,250,000', 'Số tiền có dấu phân cách hàng nghìn (chỉ trên Excel thật)']
          ]
        },
        { t: 'h', text: 'Excel tính như thế nào?' },
        {
          t: 'walk',
          title: 'Bấm Tiếp để xem từng bước, hoặc bấm Tự chạy',
          data: [
            ['Nhân viên', 'Ngày chốt lương', 'Ghép thẳng', 'Dùng TEXT'],
            ['Lê Thu Hà', '31/03/2024', '=A2&" - kỳ "&B2', ''],
            ['Trần Văn Tuấn', '30/04/2024', '=A3&" - kỳ "&B3', '=A3&" - kỳ "&TEXT(B3,"mm/yyyy")']
          ],
          cell: 'D2',
          formula: '=A2&" - kỳ "&TEXT(B2,"mm/yyyy")',
          steps: [
            { html: 'Ô <b>B2</b> hiển thị 31/03/2024, nhưng bên trong Excel lưu số <b>45382</b>.', hl: [['B2', 0]], select: 'B2' },
            { html: 'Nếu ghép thẳng như ô C2, Excel lấy con số bên trong: "Lê Thu Hà - kỳ 45382". Không ai đọc hiểu được.', hl: [['C2', 4]], select: 'C2' },
            { html: 'Dùng <code>TEXT(B2,"mm/yyyy")</code>: Excel xem mẫu, <code>mm</code> lấy tháng là <b>03</b>, <code>yyyy</code> lấy năm là <b>2024</b>, giữ dấu <code>/</code> ở giữa.', hl: [['B2', 1]], select: 'B2' },
            { html: 'TEXT trả về chữ <code>03/2024</code>. Phần ngày 31 không có trong mẫu nên bị bỏ đi.', hl: [['B2', 1]], select: 'B2' },
            { html: 'Ghép các mẩu: <code>Lê Thu Hà</code> + <code> - kỳ </code> + <code>03/2024</code>.', hl: [['A2', 0], ['B2', 1]], select: 'A2' },
            { html: 'Kết quả <b>Lê Thu Hà - kỳ 03/2024</b> hiện ở ô D2.', hl: [['D2', 2]], select: 'D2' }
          ]
        },
        { t: 'h', text: 'VALUE: đổi chữ trông giống số thành số thật' },
        { t: 'p', html: 'VALUE chỉ có một phần: chuỗi cần đổi. Dùng khi số bị lưu dạng chữ (căn trái, góc ô có tam giác xanh), hoặc khi lấy số ra bằng LEFT, MID, RIGHT mà muốn tính toán tiếp.' },
        {
          t: 'example',
          title: 'Lấy năm vào làm từ mã nhân viên rồi tính thâm niên',
          data: [
            ['Mã NV', 'Năm (chữ)', 'Năm (số)', 'Thâm niên đến 2024'],
            ['NV2019005', '=MID(A2,3,4)', '=VALUE(MID(A2,3,4))', '=2024-C2'],
            ['NV2021118', '=MID(A3,3,4)', '=VALUE(MID(A3,3,4))', '=2024-C3']
          ],
          note: 'Cột B căn trái vì là chữ. Cột C căn phải vì VALUE đã đổi thành số, nên cột D tính được thâm niên.'
        },
        { t: 'h', text: 'REPT: lặp một ký tự nhiều lần' },
        { t: 'p', html: 'REPT có 2 phần: lặp chữ gì, và lặp mấy lần. Hay dùng để vẽ "thanh mức độ" ngay trong ô, hoặc thêm số 0 phía trước cho đủ độ dài.' },
        {
          t: 'example',
          title: 'Vẽ thanh sao theo điểm đánh giá',
          data: [
            ['Nhân viên', 'Điểm', 'Thanh sao'],
            ['Lê Thu Hà', 4, '=REPT("★",B2)'],
            ['Trần Văn Tuấn', 2, '=REPT("★",B3)']
          ],
          note: 'Điểm 4 thì lặp ký tự ★ 4 lần. Đổi điểm, thanh sao tự đổi theo.'
        },
        { t: 'h', text: 'Làm trong Excel thật' },
        {
          t: 'steps',
          items: [
            'Bấm ô <b>D2</b>, gõ <code>=A2&amp;" - kỳ "&amp;TEXT(B2,"mm/yyyy")</code>. Mã định dạng phải nằm trong ngoặc kép.',
            'Nhấn <kbd>Enter</kbd>, rồi nhấp đúp vào chấm vuông nhỏ ở góc ô để chép xuống.',
            'Gặp cột số dạng chữ: Excel thật thường hiện tam giác xanh ở góc ô. Bấm vào ô, chọn biểu tượng cảnh báo, chọn <b>Convert to Number</b> (đổi thành số). Hoặc dùng VALUE trong công thức.'
          ]
        },
        { t: 'h', text: 'Lỗi hay gặp' },
        {
          t: 'table',
          head: ['Nguyên nhân', 'Ví dụ', 'Cách sửa'],
          rows: [
            ['Ghép ngày mà không dùng TEXT', '="Ngày "&amp;B2 ra "Ngày 45356"', 'Viết <code>="Ngày "&amp;TEXT(B2,"dd/mm/yyyy")</code>'],
            ['Quên ngoặc kép quanh mã định dạng', '<code>TEXT(B2,dd/mm/yyyy)</code> báo lỗi', 'Viết <code>"dd/mm/yyyy"</code>'],
            ['Dùng kết quả TEXT để tính tiếp', 'Cột TEXT căn trái, SUM ra 0', 'Tính bằng ô số gốc, TEXT chỉ dùng để hiển thị'],
            ['VALUE gặp chữ không phải số', '=VALUE("12 kiện") báo <code>#VALUE!</code>', 'Cắt bỏ phần chữ trước, chỉ để lại chữ số'],
            ['Máy cài kiểu Việt Nam', '"#,##0" ra sai dấu phân cách', 'Thử <code>"#.##0"</code> theo cài đặt vùng của máy']
          ]
        },
        { t: 'tip', html: 'Thêm số 0 ở đầu cho đủ độ dài mã: <code>="NV"&amp;TEXT(A2,"000")</code> biến 7 thành NV007, 25 thành NV025. Cách khác: <code>=REPT("0",3-LEN(A2))&amp;A2</code>.' },
        { t: 'warn', html: 'Bảng tính mini trên web này chưa hỗ trợ mã có dấu phân cách hàng nghìn và mã phần trăm. Các bài tập chỉ dùng mã ngày và mã số 0.' },
        {
          t: 'quiz', id: 'q1',
          q: 'B2 chứa ngày 15/08/2024. ="Kỳ lương "&TEXT(B2,"mm/yyyy") cho kết quả gì?',
          options: ['Kỳ lương 15/08/2024', 'Kỳ lương 08/2024', 'Kỳ lương 45519', 'Kỳ lương 2024'],
          answer: 1,
          explain: 'Mã "mm/yyyy" chỉ lấy tháng 2 chữ số và năm 4 chữ số.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Cột số lượng nhập từ phần mềm bị căn trái và SUM ra 0. Dùng hàm nào để chuyển về số?',
          options: ['TEXT', 'VALUE', 'REPT', 'TRIM'],
          answer: 1,
          explain: 'VALUE chuyển chuỗi trông giống số thành số thật, khi đó SUM mới cộng được.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'A2 chứa số 5. ="P"&TEXT(A2,"00") cho kết quả gì?',
          options: ['P5', 'P05', 'P50', 'P00'],
          answer: 1,
          explain: 'Mã "00" luôn hiển thị đủ 2 chữ số, thiếu thì thêm số 0 phía trước.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tạo <b>câu thông báo</b> ở cột C theo mẫu: <code>Đơn DH001 giao ngày 05/03/2024</code>. Ngày phải hiện đúng dạng dd/mm/yyyy, không được ra số lạ. Viết ở <code>C2</code> rồi sao chép xuống C3:C5.',
          data: [
            ['Mã đơn', 'Ngày giao', 'Thông báo'],
            ['DH001', '05/03/2024'],
            ['DH002', '12/03/2024'],
            ['DH003', '28/03/2024'],
            ['DH004', '02/04/2024']
          ],
          fill: { range: 'C2:C5', solution: '="Đơn "&A2&" giao ngày "&TEXT(B2,"dd/mm/yyyy")' },
          mustUse: ['TEXT'],
          strict: false,
          hint: 'Bọc ngày bằng TEXT trước khi ghép: <code>="Đơn "&amp;A2&amp;" giao ngày "&amp;TEXT(B2,"dd/mm/yyyy")</code>.',
          explain: 'Không có TEXT, ngày sẽ hiện thành số 45356. Hãy nhớ: ghép ngày vào câu luôn cần TEXT.'
        },
        {
          id: 'ex2',
          task: 'Cột <b>Số lượng</b> xuất từ phần mềm kho đang ở dạng chữ. Ở cột D tính <b>Thành tiền = Số lượng × Đơn giá</b>, dùng VALUE để đổi số lượng thành số. Viết ở <code>D2</code> rồi sao chép xuống D3:D5. Cuối cùng tính tổng thành tiền ở <code>D6</code>.',
          data: [
            ['Mặt hàng', 'Số lượng (chữ)', 'Đơn giá', 'Thành tiền'],
            ['Thùng carton', '\'120', 15000],
            ['Băng keo', '\'45', 22000],
            ['Màng PE', '\'18', 185000],
            ['Pallet gỗ', '\'30', 250000],
            ['Tổng']
          ],
          fill: { range: 'D2:D5', solution: '=VALUE(B2)*C2' },
          answers: [{ cell: 'D6', solution: '=SUM(D2:D5)' }],
          fmt: { C: 'int', D: 'int' },
          hint: 'D2: <code>=VALUE(B2)*C2</code>. D6: <code>=SUM(D2:D5)</code>.',
          explain: 'Số dạng chữ có dấu nháy đơn phía trước nên căn trái. VALUE đổi về số thật nên tính toán chắc chắn đúng.'
        },
        {
          id: 'ex3',
          task: 'Ở cột C tạo <b>mã nhân viên</b> đủ 3 chữ số từ số thứ tự ở cột A, theo mẫu <code>NV007</code>. Ở cột D vẽ <b>thanh sao</b>: lặp ký tự <code>★</code> theo điểm ở cột B. Viết ở <code>C2</code>, <code>D2</code> rồi sao chép xuống đến hàng 5.',
          data: [
            ['Số TT', 'Điểm KPI', 'Mã NV', 'Thanh sao'],
            [7, 4],
            [25, 5],
            [3, 2],
            [118, 3]
          ],
          fill: [
            { range: 'C2:C5', solution: '="NV"&TEXT(A2,"000")' },
            { range: 'D2:D5', solution: '=REPT("★",B2)' }
          ],
          hint: 'C2: <code>="NV"&amp;TEXT(A2,"000")</code>. D2: <code>=REPT("★",B2)</code>. Có thể sao chép ký tự ★ từ đề bài.',
          explain: 'Mã "000" luôn hiển thị đủ 3 chữ số, tự thêm số 0 phía trước. REPT tạo thanh mức độ ngay trong ô mà không cần chèn biểu đồ.'
        }
      ]
    }
  ],

  /* ---------------- Bài kiểm tra Phần 5 ---------------- */
  test: {
    mcq: [
      { q: 'A2 = "SG-2024-0871". =LEFT(A2,2) cho kết quả gì?', options: ['SG', 'SG-', '08', '71'], answer: 0, explain: 'LEFT lấy 2 ký tự đầu bên trái: SG.' },
      { q: 'A2 = "SG-2024-0871". Công thức nào lấy ra "2024"?', options: ['=MID(A2,3,4)', '=MID(A2,4,4)', '=RIGHT(A2,4)', '=LEFT(A2,7)'], answer: 1, explain: 'Năm bắt đầu ở ký tự thứ 4 (sau S, G, dấu gạch), dài 4 ký tự.' },
      { q: '=LEN(" An ") cho kết quả bao nhiêu?', options: ['2', '3', '4', '5'], answer: 2, explain: 'Dấu cách ở đầu và cuối cũng được đếm: 1 + 2 + 1 = 4.' },
      { q: 'Hàm nào xoá dấu cách thừa nhưng vẫn giữ 1 dấu cách giữa các từ?', options: ['CLEAN', 'TRIM', 'SUBSTITUTE(A2," ","")', 'PROPER'], answer: 1, explain: 'TRIM giữ đúng một dấu cách giữa các từ. SUBSTITUTE(A2," ","") xoá sạch mọi dấu cách, các từ dính vào nhau.' },
      { q: '=PROPER("TRẦN văn NAM") cho kết quả gì?', options: ['TRẦN VĂN NAM', 'trần văn nam', 'Trần Văn Nam', 'Trần văn nam'], answer: 2, explain: 'PROPER viết hoa chữ đầu mỗi từ và viết thường các chữ còn lại.' },
      { q: 'A2:D2 chứa "12", "Lê Lợi", (trống), "Huế". Công thức nào ra "12, Lê Lợi, Huế"?', options: ['=CONCAT(A2:D2)', '=A2&", "&B2&", "&C2&", "&D2', '=TEXTJOIN(", ",TRUE,A2:D2)', '=TEXTJOIN(", ",FALSE,A2:D2)'], answer: 2, explain: 'TEXTJOIN với TRUE bỏ qua ô trống. Cách dùng & và cách dùng FALSE đều sinh ra ", ," thừa.' },
      { q: 'B2 chứa ngày 05/03/2024. ="Ngày "&B2 hiển thị gì?', options: ['Ngày 05/03/2024', 'Ngày 45356', 'Ngày B2', '#VALUE!'], answer: 1, explain: 'Ngày bản chất là số, ghép trực tiếp sẽ mất định dạng. Cần dùng TEXT(B2,"dd/mm/yyyy").' },
      { q: '=FIND(" ","Lê Thị Hoa") cho kết quả bao nhiêu?', options: ['2', '3', '4', '7'], answer: 1, explain: 'L là 1, ê là 2, dấu cách ở vị trí 3.' },
      { q: 'Công thức nào lấy được tên cuối cùng cho mọi độ dài họ tên ở A2?', options: ['=RIGHT(A2,FIND(" ",A2))', '=MID(A2,FIND(" ",A2)+1,100)', '=TRIM(RIGHT(SUBSTITUTE(A2," ",REPT(" ",50)),50))', '=LEFT(A2,FIND(" ",A2)-1)'], answer: 2, explain: 'Thay dấu cách bằng 50 dấu cách, lấy 50 ký tự cuối rồi TRIM. Cách dùng MID chỉ bỏ được họ, còn lại cả tên đệm.' },
      { q: 'Muốn đổi "KH-HN-001" thành "KH-DN-001" theo vị trí (ký tự 4 và 5), dùng công thức nào?', options: ['=REPLACE(A2,4,2,"DN")', '=SUBSTITUTE(A2,4,2,"DN")', '=REPLACE(A2,"HN","DN")', '=FIND("HN",A2)'], answer: 0, explain: 'REPLACE: trong chuỗi A2, bắt đầu ở ký tự 4, thay 2 ký tự bằng "DN".' },
      { q: 'A2 chứa số 9. ="SP"&TEXT(A2,"000") cho kết quả gì?', options: ['SP9', 'SP009', 'SP900', 'SP000'], answer: 1, explain: 'Mã "000" luôn hiển thị đủ 3 chữ số, thêm 0 phía trước.' },
      { q: 'B2 chứa chữ "350" (dạng Text). Công thức nào tính đúng B2 × 1000 và chắc chắn trả về số?', options: ['=TEXT(B2,"0")*1000', '=VALUE(B2)*1000', '=REPT(B2,1000)', '=TRIM(B2)&1000'], answer: 1, explain: 'VALUE chuyển chữ thành số thật rồi mới nhân. REPT lặp chuỗi 1000 lần, còn & chỉ ghép chữ.' }
    ],
    practice: [
      {
        id: 't1',
        task: 'Mã vận đơn có dạng <code>HN-2024-0153</code>. Ở <code>B2</code> lấy <b>mã tỉnh</b> (2 ký tự đầu). Ở <code>C2</code> lấy <b>số thứ tự</b> (4 ký tự cuối) và đổi thành số bằng VALUE. Sao chép xuống đến hàng 5.',
        data: [
          ['Mã vận đơn', 'Mã tỉnh', 'Số TT'],
          ['HN-2024-0153'],
          ['SG-2023-1207'],
          ['DN-2024-0045'],
          ['HP-2024-0388']
        ],
        fill: [
          { range: 'B2:B5', solution: '=LEFT(A2,2)' },
          { range: 'C2:C5', solution: '=VALUE(RIGHT(A2,4))' }
        ],
        fmt: { C: 'int' },
        strict: false
      },
      {
        id: 't2',
        task: 'Danh sách nhân viên nhập lộn xộn. Ở <code>B2</code> chuẩn hoá họ tên: bỏ dấu cách thừa, viết hoa chữ đầu mỗi từ. Ở <code>C2</code> lấy <b>tên</b> (chữ cuối cùng) từ kết quả cột B. Sao chép xuống đến hàng 6.',
        data: [
          ['Họ tên nhập', 'Họ tên chuẩn', 'Tên'],
          ['  nguyễn  văn TOÀN'],
          ['TRẦN THỊ  thu   hà '],
          [' lê   minh'],
          ['phạm QUỐC bảo  '],
          ['đỗ thị kim   oanh']
        ],
        fill: [
          { range: 'B2:B6', solution: '=PROPER(TRIM(A2))' },
          { range: 'C2:C6', solution: '=TRIM(RIGHT(SUBSTITUTE(B2," ",REPT(" ",50)),50))' }
        ],
        strict: false
      },
      {
        id: 't3',
        task: 'Ở cột D tạo <b>mã nhân viên</b> theo mẫu <code>NV007</code> (số thứ tự ở cột A, đủ 3 chữ số). Ở cột E tạo <b>câu thông báo</b> theo mẫu <code>NV007 - Lê An nhận việc ngày 05/03/2024</code>. Viết ở <code>D2</code>, <code>E2</code> rồi sao chép xuống đến hàng 4.',
        data: [
          ['Số TT', 'Họ tên', 'Ngày nhận việc', 'Mã NV', 'Thông báo'],
          [7, 'Lê An', '05/03/2024'],
          [42, 'Vũ Thị Hạnh', '18/03/2024'],
          [115, 'Ngô Đức Thắng', '01/04/2024']
        ],
        fill: [
          { range: 'D2:D4', solution: '="NV"&TEXT(A2,"000")' },
          { range: 'E2:E4', solution: '=D2&" - "&B2&" nhận việc ngày "&TEXT(C2,"dd/mm/yyyy")' }
        ]
      }
    ]
  }
});
