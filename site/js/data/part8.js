ECC.addPart({
  id: 'p8',
  no: 8,
  title: 'Công cụ có sẵn trong Excel',
  short: 'Công cụ',
  desc: 'Không cần hàm: định dạng, sắp xếp lọc, Table, tô màu có điều kiện, kiểm soát nhập liệu, làm sạch dữ liệu, PivotTable, biểu đồ và in ấn. Những công cụ dân văn phòng dùng hằng ngày.',
  lessons: [
    /* ---------------- Bài 1 ---------------- */
    {
      id: 'dinh-dang',
      title: 'Định dạng ô: số, tiền, ngày và trình bày',
      minutes: 10,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Chị kế toán gửi sếp bảng giá. Cột đơn giá hiện <b>48500000</b>, cột chiết khấu hiện <b>0.05</b>. Sếp phải đếm số 0 mới biết là 48 triệu, và không rõ 0.05 là bao nhiêu phần trăm.</p><p><b>Định dạng số</b> (Number Format) sửa chuyện này mà không đụng tới giá trị: ô vẫn là 48500000 để tính toán, chỉ <b>hiện ra</b> thành <code>48,500,000 ₫</code> và <code>5%</code>.</p>'
        },
        { t: 'h', text: 'Các nút định dạng nằm ở đâu?' },
        {
          t: 'excelui',
          tab: 'home',
          file: 'BangGia.xlsx',
          groups: ['Clipboard', 'Alignment', 'Number'],
          marks: [
            { id: 'tab.home', n: 1, text: 'Bấm tab <b>Home</b> (Trang chủ). Mọi nút định dạng hay dùng đều ở đây.' },
            { id: 'home.numfmt', n: 2, text: 'Ô <b>Number Format</b>: đang ghi <b>General</b> (chung, chưa định dạng). Bấm mũi tên ▾ để chọn Currency, Percentage, Short Date…' },
            { id: 'home.currency', n: 3, text: 'Nút <b>$</b> (Accounting Number Format): định dạng kiểu kế toán, có ký hiệu tiền.' },
            { id: 'home.percent', n: 4, text: 'Nút <b>%</b> (Percent Style): đổi 0.05 thành 5%.' },
            { id: 'home.comma', n: 5, text: 'Nút <b>,</b> (Comma Style): thêm dấu phân cách hàng nghìn.' },
            { id: 'home.decdec', n: 6, text: '<b>Decrease Decimal</b>: bớt số lẻ sau dấu thập phân. Nút bên trái là <b>Increase Decimal</b> (thêm số lẻ).' },
            { id: 'home.painter', n: 7, text: '<b>Format Painter</b> (cây chổi): chép định dạng từ ô này sang ô khác.' }
          ],
          caption: 'Muốn xem đủ mọi kiểu định dạng, nhấn Ctrl + 1 để mở hộp thoại Format Cells.'
        },
        { t: 'h', text: 'Thực hành 1: Hiện đơn giá dạng tiền' },
        { t: 'p', html: 'Làm theo từng bước trên cửa sổ Excel mô phỏng. Để ý cột <b>Đơn giá</b> thay đổi ngay khi bạn chọn xong.' },
        {
          t: 'sim', id: 'fmt1',
          task: 'Yêu cầu: cột Đơn giá hiện dạng tiền tệ (Currency).',
          file: 'BangGia.xlsx',
          tab: 'home',
          data: [
            ['Mã hàng', 'Tên hàng', 'Đơn giá', 'Chiết khấu'],
            ['MT01', 'Máy tính xách tay', 18500000, 0.05],
            ['MI02', 'Máy in laser', 4250000, 0.08],
            ['MH03', 'Màn hình 24 inch', 3150000, 0.1],
            ['BP04', 'Bàn phím không dây', 650000, 0.12],
            ['CH05', 'Chuột quang', 180000, 0.15],
            ['LT06', 'Loa vi tính', 920000, 0.07]
          ],
          steps: [
            { do: 'cell', text: 'Bấm vào một ô trong cột <b>Đơn giá</b>. Trên Excel thật bạn sẽ bôi đen cả vùng C2:C7.' },
            { do: 'button', target: 'home.numfmt', text: 'Tab Home đang mở. Bấm ô <b>General ▾</b> trong nhóm Number.' },
            {
              do: 'menu', at: 'home.numfmt',
              items: ['General', 'Number', 'Currency', 'Accounting', 'Short Date', 'Long Date', 'Time', 'Percentage', 'Fraction', 'Scientific', 'Text', '-', 'More Number Formats...'],
              answer: 'Currency',
              text: 'Chọn <b>Currency</b> (Tiền tệ).',
              effect: { type: 'numfmt', col: 'Đơn giá', fmt: 'vnd' }
            }
          ],
          doneText: 'Đơn giá đã có dấu phân cách và ký hiệu ₫. Bấm vào ô sẽ thấy thanh công thức vẫn là số trần, nên cộng, nhân vẫn đúng.'
        },
        {
          t: 'table',
          head: ['Mục trong menu', 'Nghĩa', 'Ví dụ hiển thị', 'Dùng khi'],
          rows: [
            ['<b>General</b>', 'Chung, chưa định dạng', '1250000', 'Mặc định khi mới gõ'],
            ['<b>Number</b>', 'Số, có 2 số lẻ', '1250000.00', 'Số liệu cần số lẻ (bấm thêm nút , để có phân cách)'],
            ['<b>Currency</b>', 'Tiền tệ, ký hiệu nằm sát số', '1,250,000 ₫', 'Đơn giá, bảng giá'],
            ['<b>Accounting</b>', 'Kế toán, ký hiệu thẳng cột, số 0 hiện dấu -', '1,250,000 ₫', 'Sổ quỹ, báo cáo tài chính'],
            ['<b>Short Date</b> / <b>Long Date</b>', 'Ngày ngắn / ngày dài', '05/03/2024', 'Ngày đặt hàng, ngày công'],
            ['<b>Percentage</b>', 'Phần trăm (nhân 100 khi hiện)', '10%', 'Thuế suất, tỉ lệ hoàn thành'],
            ['<b>Text</b>', 'Coi nội dung là chữ', '00125', 'Mã nhân viên, số điện thoại có số 0 đầu'],
            ['<b>More Number Formats...</b>', 'Mở hộp thoại Format Cells', '', 'Khi cần kiểu Custom tự viết']
          ]
        },
        { t: 'h', text: 'Thực hành 2: Hiện chiết khấu dạng phần trăm' },
        {
          t: 'sim', id: 'fmt2',
          task: 'Yêu cầu: cột Chiết khấu đang hiện 0.05, 0.08… Hãy cho hiện dạng phần trăm.',
          file: 'BangGia.xlsx',
          tab: 'data',
          data: [
            ['Mã hàng', 'Tên hàng', 'Đơn giá', 'Chiết khấu'],
            ['MT01', 'Máy tính xách tay', 18500000, 0.05],
            ['MI02', 'Máy in laser', 4250000, 0.08],
            ['MH03', 'Màn hình 24 inch', 3150000, 0.1],
            ['BP04', 'Bàn phím không dây', 650000, 0.12],
            ['CH05', 'Chuột quang', 180000, 0.15],
            ['LT06', 'Loa vi tính', 920000, 0.07]
          ],
          fmt: { C: 'int' },
          steps: [
            { do: 'cell', text: 'Bấm vào một ô trong cột <b>Chiết khấu</b>.' },
            { do: 'tab', target: 'home', text: 'Cửa sổ đang mở tab Data. Bấm tab <b>Home</b>.' },
            { do: 'button', target: 'home.numfmt', text: 'Bấm ô <b>General ▾</b> trong nhóm Number.' },
            {
              do: 'menu', at: 'home.numfmt',
              items: ['General', 'Number', 'Currency', 'Accounting', 'Short Date', 'Long Date', 'Time', 'Percentage', 'Fraction', 'Scientific', 'Text', '-', 'More Number Formats...'],
              answer: 'Percentage',
              text: 'Chọn <b>Percentage</b> (Phần trăm).',
              effect: { type: 'numfmt', col: 'Chiết khấu', fmt: 'pct' }
            }
          ],
          doneText: '0.05 hiện thành 5%. Giá trị thật vẫn là 0.05, nên công thức <code>=C2*(1-D2)</code> vẫn tính đúng giá sau chiết khấu. Nút <b>%</b> trên Ribbon (hoặc <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>5</kbd>) cho kết quả tương tự.'
        },
        { t: 'warn', html: 'Gõ <b>10</b> vào ô rồi mới chọn Percentage sẽ thành <b>1000%</b>. Với tỉ lệ, gõ <code>0.1</code> hoặc gõ thẳng <code>10%</code>. Ngược lại, đừng gõ chữ "đ" hay "VNĐ" vào ô số: ô biến thành chữ và không cộng được nữa.' },
        { t: 'h', text: 'Định dạng Custom: tự viết kiểu hiển thị' },
        { t: 'p', html: 'Nhấn <kbd>Ctrl</kbd> + <kbd>1</kbd> (hoặc chọn <b>More Number Formats...</b>) để mở hộp thoại <b>Format Cells</b>. Ở tab <b>Number</b>, chọn <b>Custom</b> trong danh sách Category, rồi gõ mã vào ô <b>Type</b>. Chữ muốn hiện kèm số thì đặt trong ngoặc kép.' },
        {
          t: 'table',
          head: ['Mã Type', 'Giá trị trong ô', 'Hiển thị'],
          rows: [
            ['<code>#,##0</code>', '1250000', '1,250,000'],
            ['<code>#,##0 "đ"</code>', '1250000', '1,250,000 đ'],
            ['<code>#,##0,, "tr"</code>', '1250000000', '1,250 tr'],
            ['<code>0.0%</code>', '0.125', '12.5%'],
            ['<code>dd/mm/yyyy</code>', 'ngày 5/3/2024', '05/03/2024'],
            ['<code>00000</code>', '125', '00125'],
            ['<code>#,##0 "kg"</code>', '350', '350 kg']
          ]
        },
        { t: 'tip', html: 'Muốn cột tiền hiện "1,250,000 đ" mà vẫn cộng được, dùng Custom <code>#,##0 "đ"</code>. Chữ "đ" chỉ là lớp vỏ hiển thị.' },
        { t: 'h', text: 'Wrap Text, Merge và Format Painter' },
        {
          t: 'table',
          head: ['Nút (tab Home)', 'Tác dụng', 'Lưu ý'],
          rows: [
            ['<b>Wrap Text</b> (Ngắt dòng)', 'Chữ dài tự xuống dòng trong ô, hàng tự cao lên', 'Muốn xuống dòng đúng chỗ mình chọn: nhấn <kbd>Alt</kbd> + <kbd>Enter</kbd> khi gõ'],
            ['<b>Merge &amp; Center</b> (Gộp và căn giữa)', 'Gộp nhiều ô thành một, chữ ở giữa', 'Gây khó khi sắp xếp, lọc, sao chép. Chỉ nên dùng cho tiêu đề báo cáo in ra'],
            ['<b>Center Across Selection</b>', 'Chữ hiện ở giữa vùng như Merge nhưng các ô vẫn độc lập', 'Vào <kbd>Ctrl</kbd> + <kbd>1</kbd> › tab <b>Alignment</b> › <b>Horizontal</b>'],
            ['<b>Format Painter</b> (cây chổi)', 'Chép định dạng của ô mẫu sang vùng khác, nội dung giữ nguyên', 'Nhấp đúp vào cây chổi để quét nhiều vùng, xong nhấn <kbd>Esc</kbd>']
          ]
        },
        { t: 'tip', html: 'Bảng dữ liệu cần lọc, sắp xếp hay làm Pivot thì dùng <b>Center Across Selection</b> thay cho Merge &amp; Center.' },
        {
          t: 'keys',
          items: [
            ['Ctrl + 1', 'Mở Format Cells'],
            ['Ctrl + Shift + 1', 'Định dạng số có phân cách hàng nghìn, 2 số lẻ'],
            ['Ctrl + Shift + 5', 'Định dạng phần trăm'],
            ['Ctrl + Shift + 3', 'Định dạng ngày'],
            ['Alt + Enter', 'Xuống dòng trong ô']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Muốn cột đơn giá hiện dạng "1,250,000 đ" mà vẫn cộng được, bạn làm gì?',
          options: ['Gõ thêm chữ đ sau mỗi số', 'Dùng Format Cells › Custom với mã #,##0 "đ"', 'Đổi font chữ sang VNI', 'Dùng Wrap Text'],
          answer: 1,
          explain: 'Định dạng Custom chỉ thêm chữ "đ" khi hiển thị. Giá trị trong ô vẫn là số nên vẫn tính toán được.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Ô đang có số 15. Bạn chọn Home › Number Format › Percentage. Ô sẽ hiện gì?',
          options: ['15%', '0.15%', '1500%', '#VALUE!'],
          answer: 2,
          explain: 'Percentage nhân giá trị với 100 khi hiện. Muốn hiện 15% thì ô phải chứa 0.15, hoặc gõ thẳng 15%.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Bạn muốn áp định dạng của ô A1 cho 5 vùng rời nhau. Cách nhanh nhất?',
          options: ['Bấm Format Painter một lần cho mỗi vùng', 'Nhấp đúp Format Painter rồi quét lần lượt 5 vùng, xong nhấn Esc', 'Sao chép A1 rồi Ctrl + V vào 5 vùng', 'Mở Ctrl + 1 cho từng vùng'],
          answer: 1,
          explain: 'Nhấp đúp giữ Format Painter luôn bật cho đến khi nhấn Esc. Ctrl + V sẽ chép cả nội dung, không chỉ định dạng.'
        }
      ],
      exercises: []
    },

    /* ---------------- Bài 2 ---------------- */
    {
      id: 'sap-xep-loc',
      title: 'Sắp xếp (Sort) và lọc (Filter) dữ liệu',
      minutes: 15,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Sếp hỏi: <b>"Đơn nào doanh thu cao nhất?"</b> và <b>"Gửi anh riêng các đơn của miền Bắc."</b></p><p>Bảng có hàng trăm dòng, dò bằng mắt thì lâu và dễ sót. <b>Sort</b> (sắp xếp) và <b>Filter</b> (lọc) trả lời hai câu này trong vài giây.</p>'
        },
        { t: 'h', text: 'Sort và Filter nằm ở đâu?' },
        {
          t: 'excelui',
          tab: 'data',
          file: 'DonHang_T3.xlsx',
          groups: ['Queries & Connections', 'Sort & Filter', 'Data Tools'],
          marks: [
            { id: 'tab.data', n: 1, text: 'Bấm tab <b>Data</b> (Dữ liệu).' },
            { id: 'data.sortaz', n: 2, text: 'Sắp <b>tăng dần</b> theo cột đang chọn: A→Z, nhỏ→lớn, cũ→mới.' },
            { id: 'data.sortza', n: 3, text: 'Sắp <b>giảm dần</b>: Z→A, lớn→nhỏ, mới→cũ.' },
            { id: 'data.sort', n: 4, text: '<b>Sort</b>: mở hộp thoại để chọn cột, chiều sắp xếp và sắp nhiều cấp.' },
            { id: 'data.filter', n: 5, text: '<b>Filter</b>: bật nút lọc ▾ trên từng tiêu đề cột.' }
          ],
          caption: 'Hai lệnh này cũng có ở tab Home, nút Sort & Filter ở góc phải.'
        },
        { t: 'h', text: 'Thực hành 1: Sắp doanh thu từ cao xuống thấp' },
        { t: 'p', html: 'Làm theo từng bước trên cửa sổ Excel mô phỏng bên dưới. Bấm nhầm chỗ, web sẽ nhắc. Nhầm 2 lần, chỗ cần bấm sẽ được tô sáng.' },
        {
          t: 'sim', id: 'sort1',
          task: 'Yêu cầu: sắp xếp bảng theo Doanh thu, từ lớn đến nhỏ.',
          file: 'DonHang_T3.xlsx',
          tab: 'home',
          data: [
            ['Mã đơn', 'Khách hàng', 'Khu vực', 'Doanh thu'],
            ['DH101', 'Cty Minh Phát', 'Miền Bắc', 48500000],
            ['DH102', 'Cty An Khang', 'Miền Nam', 125000000],
            ['DH103', 'Cty Sao Việt', 'Miền Trung', 36200000],
            ['DH104', 'Cty Hưng Thịnh', 'Miền Bắc', 92800000],
            ['DH105', 'Cty Phúc Long', 'Miền Nam', 57400000],
            ['DH106', 'Cty Đại Dương', 'Miền Bắc', 15900000],
            ['DH107', 'Cty Kim Ngân', 'Miền Trung', 103600000],
            ['DH108', 'Cty Thành Đạt', 'Miền Nam', 71300000]
          ],
          steps: [
            { do: 'cell', text: 'Bấm vào <b>một ô bất kỳ</b> trong bảng dữ liệu.' },
            { do: 'tab', target: 'data', text: 'Bấm tab <b>Data</b> trên thanh Ribbon.' },
            { do: 'button', target: 'data.sort', text: 'Bấm nút <b>Sort</b>.' },
            { do: 'sortDialog', levels: [{ col: 'Doanh thu', order: 'desc' }], text: 'Trong hộp thoại: ô <b>Sort by</b> chọn <b>Doanh thu</b>, ô <b>Order</b> chọn <b>Largest to Smallest</b>, rồi bấm <b>OK</b>.' }
          ],
          doneText: 'Đơn doanh thu cao nhất đã lên đầu. Để ý: cả dòng đi cùng nhau, tên khách và số tiền không bị lệch.'
        },
        { t: 'warn', html: 'Đừng bôi đen <b>riêng một cột</b> rồi bấm Sort. Nếu Excel hỏi <b>Expand the selection</b> hay <b>Continue with the current selection</b>, hãy chọn <b>Expand the selection</b>. Chọn nhầm cái thứ hai thì chỉ cột đó bị xáo, tên khách và số tiền bị lệch nhau.' },
        { t: 'h', text: 'Thực hành 2: Lọc chỉ các đơn miền Bắc' },
        {
          t: 'sim', id: 'filter1',
          task: 'Yêu cầu: chỉ hiện các đơn hàng của Miền Bắc.',
          file: 'DonHang_T3.xlsx',
          tab: 'home',
          data: [
            ['Mã đơn', 'Khách hàng', 'Khu vực', 'Doanh thu'],
            ['DH101', 'Cty Minh Phát', 'Miền Bắc', 48500000],
            ['DH102', 'Cty An Khang', 'Miền Nam', 125000000],
            ['DH103', 'Cty Sao Việt', 'Miền Trung', 36200000],
            ['DH104', 'Cty Hưng Thịnh', 'Miền Bắc', 92800000],
            ['DH105', 'Cty Phúc Long', 'Miền Nam', 57400000],
            ['DH106', 'Cty Đại Dương', 'Miền Bắc', 15900000],
            ['DH107', 'Cty Kim Ngân', 'Miền Trung', 103600000],
            ['DH108', 'Cty Thành Đạt', 'Miền Nam', 71300000]
          ],
          steps: [
            { do: 'cell', text: 'Bấm vào <b>một ô bất kỳ</b> trong bảng dữ liệu.' },
            { do: 'tab', target: 'data', text: 'Bấm tab <b>Data</b>.' },
            { do: 'button', target: 'data.filter', text: 'Bấm nút <b>Filter</b>. Mỗi tiêu đề cột sẽ hiện một nút mũi tên ▾.' },
            { do: 'filterArrow', col: 'Khu vực', text: 'Bấm nút ▾ ở tiêu đề cột <b>Khu vực</b>.' },
            { do: 'filterPick', keep: ['Miền Bắc'], text: 'Bỏ chọn <b>(Select All)</b>, đánh dấu <b>Miền Bắc</b>, rồi bấm <b>OK</b>.' }
          ],
          doneText: 'Các dòng khác chỉ bị <b>ẩn</b>, không bị xoá. Số thứ tự hàng chuyển màu xanh, nút lọc đổi thành hình phễu để báo bảng đang được lọc.'
        },
        { t: 'p', html: '<b>Bỏ lọc:</b> bấm nút phễu ở cột đang lọc, chọn <b>Clear Filter From…</b> Muốn bỏ lọc tất cả các cột thì bấm <b>Data › Clear</b>. Bấm lại <b>Data › Filter</b> để tắt hẳn các nút ▾.' },
        {
          t: 'table',
          head: ['Loại cột', 'Menu lọc có thêm', 'Ví dụ'],
          rows: [
            ['Chữ', '<b>Text Filters</b>: Contains (chứa), Begins With (bắt đầu bằng)…', 'Tên hàng chứa chữ "giấy"'],
            ['Số', '<b>Number Filters</b>: Greater Than (lớn hơn), Between (trong khoảng), Top 10…', 'Doanh thu từ 10 đến 50 triệu'],
            ['Ngày', '<b>Date Filters</b>: This Month (tháng này), Last Week (tuần trước)…', 'Đơn trong tháng trước'],
            ['Có tô màu', '<b>Filter by Color</b>', 'Chỉ các dòng tô vàng']
          ]
        },
        { t: 'h', text: 'Thực hành 3: Sắp xếp nhiều cấp' },
        { t: 'p', html: 'Sắp nhiều cấp nghĩa là: sắp theo cột thứ nhất, những dòng <b>trùng nhau</b> ở cột đó thì sắp tiếp theo cột thứ hai.' },
        {
          t: 'sim', id: 'sort2',
          task: 'Yêu cầu: sắp theo Khu vực từ A đến Z. Trong cùng một khu vực, đơn doanh thu lớn đứng trước.',
          file: 'DonHang_T3.xlsx',
          tab: 'data',
          data: [
            ['Mã đơn', 'Khách hàng', 'Khu vực', 'Doanh thu'],
            ['DH101', 'Cty Minh Phát', 'Miền Bắc', 48500000],
            ['DH102', 'Cty An Khang', 'Miền Nam', 125000000],
            ['DH103', 'Cty Sao Việt', 'Miền Trung', 36200000],
            ['DH104', 'Cty Hưng Thịnh', 'Miền Bắc', 92800000],
            ['DH105', 'Cty Phúc Long', 'Miền Nam', 57400000],
            ['DH106', 'Cty Đại Dương', 'Miền Bắc', 15900000],
            ['DH107', 'Cty Kim Ngân', 'Miền Trung', 103600000],
            ['DH108', 'Cty Thành Đạt', 'Miền Nam', 71300000]
          ],
          steps: [
            { do: 'cell', text: 'Bấm vào một ô trong bảng.' },
            { do: 'button', target: 'data.sort', text: 'Tab Data đang mở sẵn. Bấm nút <b>Sort</b>.' },
            { do: 'sortDialog', levels: [{ col: 'Khu vực', order: 'asc' }, { col: 'Doanh thu', order: 'desc' }], text: 'Dòng 1: <b>Sort by</b> = Khu vực, <b>A to Z</b>. Bấm <b>Add Level</b>. Dòng 2: <b>Then by</b> = Doanh thu, <b>Largest to Smallest</b>. Bấm <b>OK</b>.' }
          ],
          doneText: 'Các đơn được gom theo khu vực, trong mỗi khu vực đơn lớn nhất đứng đầu.'
        },
        { t: 'tip', html: 'Sau khi lọc, chọn cột số và nhìn thanh trạng thái phía dưới để xem tổng của các dòng đang hiện. Muốn công thức chỉ cộng các dòng đang hiện, dùng <code>=SUBTOTAL(9,D2:D500)</code> thay cho SUM.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Muốn danh sách nhân viên sắp theo Phòng ban, trong cùng phòng thì theo Lương giảm dần. Dùng gì?',
          options: ['Data › Sort A to Z hai lần', 'Data › Sort, thêm cấp bằng Add Level', 'Data › Filter', 'Home › Format Painter'],
          answer: 1,
          explain: 'Hộp thoại Sort với Add Level cho phép sắp nhiều cấp: cấp 1 Phòng ban, cấp 2 Lương.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Bạn bôi đen riêng cột Doanh thu rồi bấm Sort, Excel hỏi có mở rộng vùng không. Nên chọn gì?',
          options: ['Continue with the current selection', 'Expand the selection', 'Cancel rồi xoá cột', 'Chọn gì cũng như nhau'],
          answer: 1,
          explain: 'Expand the selection để cả bảng được sắp cùng nhau. Chỉ sắp một cột sẽ làm lệch dữ liệu các dòng.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Sau khi lọc, các dòng không thoả điều kiện đi đâu?',
          options: ['Bị xoá vĩnh viễn', 'Bị ẩn đi, bỏ lọc sẽ hiện lại', 'Chuyển sang sheet khác', 'Chuyển xuống cuối bảng'],
          answer: 1,
          explain: 'Filter chỉ ẩn dòng. Bỏ lọc (Clear) là các dòng hiện lại đầy đủ.'
        }
      ],
      exercises: []
    },

    /* ---------------- Bài 3 ---------------- */
    {
      id: 'table',
      title: 'Excel Table (Ctrl + T): bảng thông minh',
      minutes: 9,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Mỗi sáng bạn thêm đơn hàng mới vào cuối bảng. Rồi lại phải sửa công thức tổng từ <code>D2:D50</code> thành <code>D2:D58</code>, kéo lại vùng biểu đồ, chép công thức xuống dòng mới. Quên một chỗ là báo cáo sai.</p><p>Biến vùng dữ liệu thành <b>Table</b> (bảng thông minh) thì Excel tự làm hết: bảng tự nhận dòng mới, công thức tự chép xuống, tự kẻ sọc, tự bật nút lọc.</p>'
        },
        { t: 'h', text: 'Nút Table nằm ở đâu?' },
        {
          t: 'excelui',
          tab: 'insert',
          file: 'DonHang.xlsx',
          groups: ['Tables', 'Charts', 'Filters'],
          marks: [
            { id: 'tab.insert', n: 1, text: 'Bấm tab <b>Insert</b> (Chèn).' },
            { id: 'insert.table', n: 2, text: 'Nút <b>Table</b>: biến vùng đang chọn thành bảng thông minh. Phím tắt <kbd>Ctrl</kbd> + <kbd>T</kbd>.' },
            { id: 'insert.pivot', n: 3, text: '<b>PivotTable</b>: tạo báo cáo tổng hợp. Làm Pivot từ Table thì Pivot tự nhận dòng mới (bài 7).' },
            { id: 'insert.slicer', n: 4, text: '<b>Slicer</b>: tạo các nút bấm để lọc Table thật trực quan.' }
          ],
          caption: 'Cách khác: Home › Format as Table vừa tạo Table vừa chọn luôn kiểu màu.'
        },
        { t: 'h', text: 'Thực hành 1: Tạo Table bằng Insert › Table' },
        {
          t: 'sim', id: 'tbl1',
          task: 'Yêu cầu: biến bảng đơn hàng thành Table.',
          file: 'DonHang.xlsx',
          tab: 'home',
          data: [
            ['Mã đơn', 'Khách hàng', 'Số lượng', 'Đơn giá', 'Thành tiền'],
            ['DH201', 'Cty Minh Phát', 20, 450000, 9000000],
            ['DH202', 'Cửa hàng Hoa Mai', 5, 1200000, 6000000],
            ['DH203', 'Cty Tân Việt', 12, 850000, 10200000],
            ['DH204', 'Siêu thị An Bình', 40, 95000, 3800000],
            ['DH205', 'Cty Sao Mai', 8, 2300000, 18400000],
            ['DH206', 'Cty Hưng Thịnh', 15, 640000, 9600000]
          ],
          fmt: { D: 'int', E: 'int' },
          steps: [
            { do: 'cell', text: 'Bấm vào <b>một ô bất kỳ</b> trong bảng. Không cần bôi đen, Excel tự nhận cả vùng.' },
            { do: 'tab', target: 'insert', text: 'Bấm tab <b>Insert</b>.' },
            {
              do: 'button', target: 'insert.table',
              text: 'Bấm nút <b>Table</b>. Trên Excel thật, hộp thoại <b>Create Table</b> hiện ra: kiểm tra vùng, đánh dấu <b>My table has headers</b> rồi bấm <b>OK</b>.',
              effect: { type: 'fill', col: 'Mã đơn', op: 'contains', value: 'DH', bg: '#dde7f5', ink: '#1f2937', row: true }
            }
          ],
          doneText: 'Bảng đã thành Table và có màu nền. Trên Excel thật bạn còn thấy dòng kẻ sọc, nút lọc ▾ ở mỗi tiêu đề và tab mới <b>Table Design</b> trên Ribbon.'
        },
        {
          t: 'steps',
          title: 'Ngay sau khi tạo: đặt tên cho Table',
          items: [
            'Bấm vào một ô trong Table. Trên Ribbon hiện thêm tab <b>Table Design</b> (Thiết kế bảng).',
            'Ở góc trái tab này có ô <b>Table Name</b>, Excel đặt sẵn là <code>Table1</code>.',
            'Gõ tên dễ nhớ, viết liền không dấu, ví dụ <code>tblDonHang</code>, rồi nhấn <kbd>Enter</kbd>.'
          ]
        },
        { t: 'h', text: 'Thực hành 2: Tạo Table bằng Format as Table' },
        {
          t: 'sim', id: 'tbl2',
          task: 'Yêu cầu: tạo Table kèm kiểu màu xanh lá bằng Home › Format as Table.',
          file: 'DonHang.xlsx',
          tab: 'insert',
          data: [
            ['Mã đơn', 'Khách hàng', 'Số lượng', 'Đơn giá', 'Thành tiền'],
            ['DH201', 'Cty Minh Phát', 20, 450000, 9000000],
            ['DH202', 'Cửa hàng Hoa Mai', 5, 1200000, 6000000],
            ['DH203', 'Cty Tân Việt', 12, 850000, 10200000],
            ['DH204', 'Siêu thị An Bình', 40, 95000, 3800000],
            ['DH205', 'Cty Sao Mai', 8, 2300000, 18400000],
            ['DH206', 'Cty Hưng Thịnh', 15, 640000, 9600000]
          ],
          fmt: { D: 'int', E: 'int' },
          steps: [
            { do: 'cell', text: 'Bấm vào một ô trong bảng.' },
            { do: 'tab', target: 'home', text: 'Bấm tab <b>Home</b>.' },
            { do: 'button', target: 'home.fmttable', text: 'Bấm nút <b>Format as Table</b> trong nhóm Styles.' },
            {
              do: 'menu', at: 'home.fmttable',
              items: ['Light ›', 'Medium ›', 'Dark ›', '-', 'New Table Style...', 'New PivotTable Style...'],
              answer: 'Medium',
              text: 'Excel chia kiểu màu thành 3 nhóm: Light (nhạt), Medium (vừa), Dark (đậm). Chọn <b>Medium</b>.'
            },
            {
              do: 'menu', at: 'home.fmttable',
              items: ['Blue, Table Style Medium 2', 'Orange, Table Style Medium 3', 'Gray, Table Style Medium 4', 'Gold, Table Style Medium 5', 'Green, Table Style Medium 7'],
              answer: 'Green, Table Style Medium 7',
              text: 'Chọn kiểu <b>Green, Table Style Medium 7</b> (xanh lá). Excel hỏi vùng dữ liệu, bấm <b>OK</b>.',
              effect: { type: 'fill', col: 'Mã đơn', op: 'contains', value: 'DH', bg: '#e2efda', ink: '#1f2937', row: true }
            }
          ],
          doneText: 'Kết quả giống hệt Insert › Table, chỉ khác là bạn chọn luôn kiểu màu. Muốn đổi màu sau này: <b>Table Design › Table Styles</b>.'
        },
        { t: 'h', text: 'Table làm được gì cho bạn?' },
        {
          t: 'table',
          head: ['Lợi ích', 'Giải thích'],
          rows: [
            ['Tự mở rộng', 'Gõ thêm dòng ngay dưới bảng, Table tự nhận dòng mới. Pivot, biểu đồ, Data Validation dựa trên Table cũng tự cập nhật vùng.'],
            ['Công thức tự điền', 'Viết công thức ở ô đầu của cột, Excel tự chép cho cả cột (gọi là Calculated Column).'],
            ['Tiêu đề luôn hiện', 'Cuộn xuống dưới, tên cột thay cho chữ A, B, C trên đầu.'],
            ['Lọc sẵn', 'Nút lọc ▾ tự bật ở mỗi tiêu đề.'],
            ['Total Row (dòng tổng)', 'Vào <b>Table Design</b>, đánh dấu <b>Total Row</b>. Bấm ô tổng của cột, chọn Sum, Average, Count… Khi lọc, tổng chỉ tính dòng đang hiện.']
          ]
        },
        { t: 'h', text: 'Công thức dùng tên cột (Structured Reference)' },
        { t: 'p', html: 'Trong Table, công thức dùng <b>tên cột</b> thay cho địa chỉ ô. Bạn không cần gõ tay: khi viết công thức, bấm chuột vào ô trong Table, Excel tự điền tên cột.' },
        {
          t: 'table',
          head: ['Viết', 'Nghĩa'],
          rows: [
            ['<code>=[@SoLuong]*[@DonGia]</code>', 'Số lượng × Đơn giá của <b>dòng hiện tại</b> (@ nghĩa là "ở dòng này")'],
            ['<code>=SUM(tblDonHang[ThanhTien])</code>', 'Tổng cả cột Thành tiền của bảng tblDonHang'],
            ['<code>=SUMIFS(tblDonHang[ThanhTien], tblDonHang[KhuVuc], "Miền Bắc")</code>', 'Tổng thành tiền của Miền Bắc'],
            ['<code>=COUNTA(tblDonHang[MaDon])</code>', 'Đếm số đơn hàng']
          ]
        },
        { t: 'tip', html: 'Ưu điểm lớn nhất: khi bảng thêm dòng, <code>tblDonHang[ThanhTien]</code> tự bao luôn dòng mới. Bạn không phải sửa vùng <code>E2:E500</code> nữa.' },
        { t: 'h', text: 'Slicer: nút lọc cho sếp' },
        {
          t: 'steps',
          items: [
            'Bấm vào Table, vào <b>Insert › Slicer</b> (hoặc <b>Table Design › Insert Slicer</b>).',
            'Đánh dấu cột muốn lọc, ví dụ Khu vực, Nhân viên. Bấm <b>OK</b>.',
            'Mỗi cột thành một khung nút bấm. Bấm một nút để lọc, giữ <kbd>Ctrl</kbd> để chọn nhiều nút, bấm biểu tượng phễu có dấu X để bỏ lọc.'
          ]
        },
        { t: 'warn', html: 'Table không cho <b>Merge</b> ô bên trong và tên cột không được trùng nhau. Muốn trả Table về vùng thường: <b>Table Design › Convert to Range</b>. Dữ liệu và màu vẫn giữ, chỉ mất tính năng "thông minh".' },
        {
          t: 'quiz', id: 'q1',
          q: 'Hằng ngày bạn thêm đơn hàng mới vào cuối bảng và muốn công thức tổng, biểu đồ tự cập nhật. Nên làm gì?',
          options: ['Sửa lại vùng công thức mỗi ngày', 'Chuyển dữ liệu thành Table bằng Ctrl + T', 'Dùng Merge &amp; Center', 'Freeze Panes dòng tiêu đề'],
          answer: 1,
          explain: 'Table tự mở rộng khi thêm dòng. Mọi công thức và biểu đồ tham chiếu tới Table cũng tự nhận dòng mới.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Trong Table, công thức <code>=[@SoLuong]*[@DonGia]</code> có nghĩa là gì?',
          options: ['Tổng cả cột Số lượng nhân tổng cột Đơn giá', 'Số lượng nhân Đơn giá của dòng hiện tại', 'Lỗi cú pháp', 'Chỉ tính dòng đầu tiên của bảng'],
          answer: 1,
          explain: 'Ký hiệu @ nghĩa là "ở dòng này". Công thức tính cho từng dòng và tự điền cả cột.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Muốn sếp bấm nút để xem nhanh doanh số theo từng khu vực mà không cần dùng mũi tên lọc. Dùng gì?',
          options: ['Slicer', 'Total Row', 'Format Painter', 'Text to Columns'],
          answer: 0,
          explain: 'Slicer tạo các nút bấm lọc trực quan, rất hợp cho báo cáo gửi sếp.'
        }
      ],
      exercises: []
    },

    /* ---------------- Bài 4 ---------------- */
    {
      id: 'conditional',
      title: 'Conditional Formatting: tô màu theo điều kiện',
      minutes: 11,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Trưởng phòng kinh doanh muốn nhìn bảng là thấy ngay: <b>ai vượt 100 triệu</b>, <b>mã khách nào bị nhập trùng</b>, <b>3 người bán giỏi nhất</b> là ai. Tô màu bằng tay thì mỗi lần số liệu đổi lại phải tô lại.</p><p><b>Conditional Formatting</b> (định dạng có điều kiện) tự tô màu ô thỏa điều kiện. Số liệu đổi, màu tự đổi theo.</p>'
        },
        { t: 'h', text: 'Conditional Formatting nằm ở đâu?' },
        {
          t: 'excelui',
          tab: 'home',
          file: 'DoanhSo_Q3.xlsx',
          groups: ['Number', 'Styles', 'Cells'],
          marks: [
            { id: 'tab.home', n: 1, text: 'Bấm tab <b>Home</b>.' },
            { id: 'home.condfmt', n: 2, text: 'Nút <b>Conditional Formatting</b> trong nhóm Styles. Bấm vào sẽ hiện menu các nhóm quy tắc.' },
            { id: 'home.fmttable', n: 3, text: '<b>Format as Table</b> nằm ngay cạnh, đừng nhầm. Nút này tô cả bảng theo kiểu cố định, không theo điều kiện.' }
          ],
          caption: 'Trước khi bấm, nhớ chọn vùng cần tô (thường là một cột số, không chọn tiêu đề).'
        },
        {
          t: 'table',
          head: ['Mục trong menu', 'Làm gì', 'Ví dụ văn phòng'],
          rows: [
            ['<b>Highlight Cells Rules</b> (tô ô theo quy tắc)', 'Greater Than (lớn hơn), Less Than (nhỏ hơn), Between (trong khoảng), Equal To (bằng), Text that Contains (chứa chữ), A Date Occurring (ngày rơi vào), Duplicate Values (giá trị trùng)', 'Đơn quá 50 triệu, mã khách bị trùng, ngày giao là hôm nay'],
            ['<b>Top/Bottom Rules</b> (cao nhất/thấp nhất)', 'Top 10 Items, Top 10%, Bottom 10 Items, Above Average (trên trung bình), Below Average', 'Top 3 nhân viên, chi nhánh dưới trung bình'],
            ['<b>Data Bars</b> (thanh dữ liệu)', 'Vẽ thanh màu dài ngắn trong ô theo độ lớn', 'So sánh doanh thu các tháng ngay trong bảng'],
            ['<b>Color Scales</b> (thang màu)', 'Tô dải màu từ xanh tới đỏ', 'Bản đồ nhiệt tỉ lệ hoàn thành KPI'],
            ['<b>Icon Sets</b> (bộ biểu tượng)', 'Thêm mũi tên, đèn giao thông, cờ', 'Mũi tên lên xuống so với tháng trước']
          ]
        },
        { t: 'h', text: 'Thực hành 1: Tô đỏ doanh số trên 100 triệu' },
        {
          t: 'sim', id: 'cf1',
          task: 'Yêu cầu: tô nền đỏ nhạt các ô Doanh số lớn hơn 100 triệu.',
          file: 'DoanhSo_Q3.xlsx',
          tab: 'home',
          data: [
            ['Nhân viên', 'Chi nhánh', 'Doanh số'],
            ['Nguyễn Văn An', 'Hà Nội', 86500000],
            ['Trần Thị Bình', 'TP.HCM', 132000000],
            ['Lê Hoàng Cường', 'Đà Nẵng', 74800000],
            ['Phạm Thu Dung', 'Hà Nội', 118400000],
            ['Võ Minh Em', 'TP.HCM', 101200000],
            ['Đỗ Thị Hoa', 'Cần Thơ', 104700000],
            ['Bùi Quang Huy', 'Đà Nẵng', 61300000]
          ],
          fmt: { C: 'int' },
          steps: [
            { do: 'cell', text: 'Bấm vào cột <b>Doanh số</b>. Trên Excel thật bạn bôi đen vùng C2:C8.' },
            { do: 'button', target: 'home.condfmt', text: 'Bấm nút <b>Conditional Formatting</b>.' },
            {
              do: 'menu', at: 'home.condfmt',
              items: ['Highlight Cells Rules ›', 'Top/Bottom Rules ›', '-', 'Data Bars ›', 'Color Scales ›', 'Icon Sets ›', '-', 'New Rule...', 'Clear Rules ›', 'Manage Rules...'],
              answer: 'Highlight Cells Rules',
              text: 'Chọn <b>Highlight Cells Rules</b> (tô ô theo quy tắc).'
            },
            {
              do: 'menu', at: 'home.condfmt',
              items: ['Greater Than...', 'Less Than...', 'Between...', 'Equal To...', 'Text that Contains...', 'A Date Occurring...', 'Duplicate Values...', '-', 'More Rules...'],
              answer: 'Greater Than...',
              text: 'Chọn <b>Greater Than...</b> (lớn hơn). Trong hộp thoại, gõ <code>100000000</code>, giữ kiểu <b>Light Red Fill with Dark Red Text</b>, bấm <b>OK</b>.',
              effect: { type: 'fill', col: 'Doanh số', op: '>', value: 100000000, bg: '#ffc7ce', ink: '#9c0006' }
            }
          ],
          doneText: 'Bốn ô trên 100 triệu được tô đỏ nhạt, chữ đỏ đậm. Nếu sau này sửa doanh số của An thành 120 triệu, ô đó cũng tự đỏ lên.'
        },
        { t: 'h', text: 'Thực hành 2: Tìm mã khách bị nhập trùng' },
        {
          t: 'sim', id: 'cf2',
          task: 'Yêu cầu: tô vàng các Mã KH xuất hiện nhiều hơn một lần.',
          file: 'KhachHang.xlsx',
          tab: 'home',
          data: [
            ['Mã KH', 'Tên khách hàng', 'Tỉnh'],
            ['KH001', 'Cty Minh Phát', 'Hà Nội'],
            ['KH002', 'Cửa hàng Hoa Mai', 'Hải Phòng'],
            ['KH003', 'Cty Tân Việt', 'Bắc Ninh'],
            ['KH002', 'CH Hoa Mai', 'Hải Phòng'],
            ['KH004', 'Siêu thị An Bình', 'Hà Nội'],
            ['KH005', 'Cty Sao Mai', 'Nam Định'],
            ['KH001', 'Công ty Minh Phát', 'Hà Nội']
          ],
          steps: [
            { do: 'cell', text: 'Bấm vào cột <b>Mã KH</b>.' },
            { do: 'button', target: 'home.condfmt', text: 'Bấm <b>Conditional Formatting</b>.' },
            {
              do: 'menu', at: 'home.condfmt',
              items: ['Highlight Cells Rules ›', 'Top/Bottom Rules ›', '-', 'Data Bars ›', 'Color Scales ›', 'Icon Sets ›', '-', 'New Rule...', 'Clear Rules ›', 'Manage Rules...'],
              answer: 'Highlight Cells Rules',
              text: 'Chọn <b>Highlight Cells Rules</b>.'
            },
            {
              do: 'menu', at: 'home.condfmt',
              items: ['Greater Than...', 'Less Than...', 'Between...', 'Equal To...', 'Text that Contains...', 'A Date Occurring...', 'Duplicate Values...', '-', 'More Rules...'],
              answer: 'Duplicate Values...',
              text: 'Chọn <b>Duplicate Values...</b> (giá trị trùng). Trong hộp thoại, chọn kiểu <b>Yellow Fill with Dark Yellow Text</b>, bấm <b>OK</b>.',
              effect: { type: 'fill', col: 'Mã KH', op: 'dup', bg: '#ffeb9c', ink: '#9c5700' }
            }
          ],
          doneText: 'KH001 và KH002 được tô vàng vì mỗi mã xuất hiện 2 lần. Công cụ này chỉ <b>đánh dấu</b>, không xoá gì. Muốn xoá dòng trùng thì dùng Remove Duplicates (bài 6).'
        },
        { t: 'h', text: 'Thực hành 3: Tô xanh Top 3 doanh số' },
        {
          t: 'sim', id: 'cf3',
          task: 'Yêu cầu: tô xanh 3 nhân viên có doanh số cao nhất.',
          file: 'DoanhSo_Q3.xlsx',
          tab: 'home',
          data: [
            ['Nhân viên', 'Chi nhánh', 'Doanh số'],
            ['Nguyễn Văn An', 'Hà Nội', 86500000],
            ['Trần Thị Bình', 'TP.HCM', 132000000],
            ['Lê Hoàng Cường', 'Đà Nẵng', 74800000],
            ['Phạm Thu Dung', 'Hà Nội', 118400000],
            ['Võ Minh Em', 'TP.HCM', 101200000],
            ['Đỗ Thị Hoa', 'Cần Thơ', 104700000],
            ['Bùi Quang Huy', 'Đà Nẵng', 61300000]
          ],
          fmt: { C: 'int' },
          steps: [
            { do: 'cell', text: 'Bấm vào cột <b>Doanh số</b>.' },
            { do: 'button', target: 'home.condfmt', text: 'Bấm <b>Conditional Formatting</b>.' },
            {
              do: 'menu', at: 'home.condfmt',
              items: ['Highlight Cells Rules ›', 'Top/Bottom Rules ›', '-', 'Data Bars ›', 'Color Scales ›', 'Icon Sets ›', '-', 'New Rule...', 'Clear Rules ›', 'Manage Rules...'],
              answer: 'Top/Bottom Rules',
              text: 'Lần này chọn <b>Top/Bottom Rules</b> (cao nhất/thấp nhất).'
            },
            {
              do: 'menu', at: 'home.condfmt',
              items: ['Top 10 Items...', 'Top 10%...', 'Bottom 10 Items...', 'Bottom 10%...', 'Above Average...', 'Below Average...', '-', 'More Rules...'],
              answer: 'Top 10 Items...',
              text: 'Chọn <b>Top 10 Items...</b> Trong hộp thoại, sửa số <b>10</b> thành <b>3</b>, chọn kiểu <b>Green Fill with Dark Green Text</b>, bấm <b>OK</b>.',
              effect: { type: 'fill', col: 'Doanh số', op: 'top', value: 3, bg: '#c6efce', ink: '#006100' }
            }
          ],
          doneText: 'Bình, Dung và Hoa được tô xanh. Em cũng trên 100 triệu nhưng xếp thứ 4 nên không được tô. Tên mục là "Top 10" nhưng bạn đổi được thành Top 3, Top 5 tùy ý.'
        },
        { t: 'h', text: 'Tô cả dòng bằng công thức' },
        { t: 'p', html: 'Các quy tắc có sẵn chỉ tô đúng ô thỏa điều kiện. Muốn tô <b>cả dòng</b> (ví dụ cả dòng đơn hàng có trạng thái "Trễ"), phải dùng công thức qua mục <b>New Rule...</b>' },
        {
          t: 'steps',
          title: 'Tô vàng cả dòng có cột E (Trạng thái) là "Trễ", bảng từ A2:F100',
          items: [
            'Chọn toàn bộ vùng dữ liệu <b>A2:F100</b>, bắt đầu từ ô A2.',
            'Vào <b>Home › Conditional Formatting › New Rule...</b>',
            'Chọn <b>Use a formula to determine which cells to format</b> (dùng công thức để chọn ô cần tô).',
            'Gõ công thức <code>=$E2="Trễ"</code>.',
            'Bấm <b>Format...</b>, sang tab <b>Fill</b> chọn màu vàng, bấm <b>OK</b> hai lần.'
          ]
        },
        { t: 'warn', html: 'Bí quyết nằm ở dấu <code>$</code>: <code>$E2</code> khoá cột E (mọi ô trong dòng đều nhìn về cột E) nhưng để hàng tự đổi theo từng dòng. Viết <code>=E2="Trễ"</code> thì chỉ cột E được tô. Viết <code>=$E$2="Trễ"</code> thì cả bảng tô theo đúng một ô E2. Công thức luôn viết cho <b>ô đầu tiên</b> của vùng đã chọn.' },
        {
          t: 'table',
          head: ['Mục đích', 'Công thức (vùng bắt đầu từ dòng 2)'],
          rows: [
            ['Tô dòng có doanh thu (cột D) trên 50 triệu', '<code>=$D2&gt;50000000</code>'],
            ['Tô dòng đơn quá hạn chưa giao (C là hạn, E trống)', '<code>=AND($C2&lt;TODAY(), $E2="")</code>'],
            ['Tô dòng xen kẽ', '<code>=MOD(ROW(),2)=0</code>'],
            ['Tô mã bị trùng ở cột A', '<code>=COUNTIF($A$2:$A$100,$A2)&gt;1</code>']
          ]
        },
        { t: 'tip', html: '<b>Sửa, xoá quy tắc:</b> vào <b>Conditional Formatting › Manage Rules...</b>, ô <b>Show formatting rules for</b> chọn <b>This Worksheet</b> để xem mọi quy tắc trong sheet. Xoá nhanh tất cả: <b>Clear Rules › Clear Rules from Entire Sheet</b>.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Muốn tô màu các mã khách hàng bị nhập trùng trong cột A, nhưng chưa muốn xoá. Nhanh nhất là?',
          options: ['Highlight Cells Rules › Duplicate Values', 'Data Bars', 'Top/Bottom Rules › Top 10 Items', 'Data › Remove Duplicates'],
          answer: 0,
          explain: 'Duplicate Values tô màu mọi giá trị lặp lại mà không xoá gì. Remove Duplicates thì xoá luôn.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Chọn vùng A2:F50 và muốn tô cả dòng khi cột F là "Hủy". Công thức đúng là?',
          options: ['=F2="Hủy"', '=$F$2="Hủy"', '=$F2="Hủy"', '=F$2="Hủy"'],
          answer: 2,
          explain: '$F2 khoá cột F để mọi ô trong dòng đều xét cột F. Hàng không khoá nên tự đổi theo từng dòng.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Bạn muốn trong mỗi ô doanh thu có một thanh màu dài ngắn theo độ lớn. Dùng gì?',
          options: ['Color Scales', 'Icon Sets', 'Data Bars', 'Sparklines'],
          answer: 2,
          explain: 'Data Bars vẽ thanh ngang trong ô, giá trị càng lớn thanh càng dài.'
        }
      ],
      exercises: []
    },

    /* ---------------- Bài 5 ---------------- */
    {
      id: 'validation',
      title: 'Data Validation: kiểm soát dữ liệu nhập',
      minutes: 9,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Năm chi nhánh cùng nhập một file chấm công. Cuối tháng mở ra: chỗ ghi "HN", chỗ ghi "Hà Nội", chỗ ghi "ha noi". Có người gõ 35 ngày công cho tháng 30 ngày. Báo cáo tổng hợp sai hết.</p><p><b>Data Validation</b> (kiểm soát dữ liệu nhập) chỉ cho nhập đúng loại giá trị bạn quy định: chọn từ danh sách, số trong khoảng cho phép, ngày hợp lệ. Nhập sai là Excel chặn ngay.</p>'
        },
        { t: 'h', text: 'Data Validation nằm ở đâu?' },
        {
          t: 'excelui',
          tab: 'data',
          file: 'ChamCong_T5.xlsx',
          groups: ['Sort & Filter', 'Data Tools'],
          marks: [
            { id: 'tab.data', n: 1, text: 'Bấm tab <b>Data</b>.' },
            { id: 'data.validation', n: 2, text: 'Nút <b>Data Validation</b> (biểu tượng ô có dấu tích xanh và vòng đỏ). Bấm vào phần chữ có mũi tên ▾ sẽ hiện menu 3 mục.' }
          ],
          caption: 'Nhóm Data Tools còn có Text to Columns, Flash Fill, Remove Duplicates: bạn sẽ gặp lại ở bài Làm sạch dữ liệu.'
        },
        {
          t: 'table',
          head: ['Mục trong menu', 'Nghĩa'],
          rows: [
            ['<b>Data Validation...</b>', 'Mở hộp thoại để đặt quy tắc nhập cho vùng đang chọn.'],
            ['<b>Circle Invalid Data</b>', 'Khoanh tròn đỏ các ô đang vi phạm quy tắc (kể cả dữ liệu đã có từ trước).'],
            ['<b>Clear Validation Circles</b>', 'Xoá các vòng tròn đỏ sau khi đã sửa xong.']
          ]
        },
        { t: 'h', text: 'Thực hành 1: Mở hộp thoại Data Validation' },
        {
          t: 'sim', id: 'dv1',
          task: 'Yêu cầu: mở hộp thoại Data Validation cho cột Chi nhánh để tạo danh sách thả xuống.',
          file: 'ChamCong_T5.xlsx',
          tab: 'home',
          data: [
            ['Mã NV', 'Họ tên', 'Chi nhánh', 'Ngày công'],
            ['NV01', 'Nguyễn Văn An', 'Hà Nội', 26],
            ['NV02', 'Trần Thị Bình', 'TP.HCM', 24],
            ['NV03', 'Lê Hoàng Cường', 'Đà Nẵng', 25],
            ['NV04', 'Phạm Thu Dung', 'Hà Nội', 22],
            ['NV05', 'Võ Minh Em', 'TP.HCM', 26],
            ['NV06', 'Đỗ Thị Hoa', 'Đà Nẵng', 23]
          ],
          steps: [
            { do: 'cell', text: 'Bấm vào cột <b>Chi nhánh</b>. Trên Excel thật bạn bôi đen cả vùng cần nhập, ví dụ C2:C200.' },
            { do: 'tab', target: 'data', text: 'Bấm tab <b>Data</b>.' },
            { do: 'button', target: 'data.validation', text: 'Bấm nút <b>Data Validation</b>.' },
            {
              do: 'menu', at: 'data.validation',
              items: ['Data Validation...', 'Circle Invalid Data', 'Clear Validation Circles'],
              answer: 'Data Validation...',
              text: 'Chọn <b>Data Validation...</b> để mở hộp thoại.'
            }
          ],
          doneText: 'Hộp thoại Data Validation đã mở. Phần tiếp theo hướng dẫn điền từng ô trong hộp thoại.'
        },
        {
          t: 'steps',
          title: 'Trong hộp thoại: tạo danh sách thả xuống Chi nhánh',
          items: [
            'Hộp thoại có 3 tab: <b>Settings</b> (quy tắc), <b>Input Message</b> (lời nhắc), <b>Error Alert</b> (báo lỗi). Đang ở tab <b>Settings</b>.',
            'Ô <b>Allow</b> (cho phép) chọn <b>List</b> (danh sách).',
            'Ô <b>Source</b> (nguồn) gõ <code>Hà Nội,Đà Nẵng,TP.HCM</code>, các mục ngăn cách bằng dấu phẩy. Hoặc bấm chọn vùng chứa danh sách, ví dụ <code>=$H$2:$H$4</code>.',
            'Giữ đánh dấu <b>In-cell dropdown</b> (hiện mũi tên trong ô).',
            'Bấm <b>OK</b>. Bấm vào ô trong cột Chi nhánh sẽ thấy mũi tên ▾ để chọn.'
          ]
        },
        { t: 'tip', html: 'Nên để danh sách nguồn ở một sheet riêng (ví dụ sheet <code>DanhMuc</code>) và biến nó thành <b>Table</b>. Khi thêm chi nhánh mới, danh sách thả xuống tự có thêm lựa chọn.' },
        { t: 'h', text: 'Các kiểu quy tắc khác trong ô Allow' },
        {
          t: 'table',
          head: ['Allow', 'Ví dụ thiết lập (ô Data và các ô bên dưới)', 'Tác dụng'],
          rows: [
            ['<b>Whole number</b> (số nguyên)', 'between 0 and 31', 'Số ngày công chỉ từ 0 đến 31'],
            ['<b>Decimal</b> (số thập phân)', 'between 0 and 1', 'Tỉ lệ chiết khấu từ 0% đến 100%'],
            ['<b>Date</b> (ngày)', 'between 01/01/2024 and 31/12/2024', 'Chỉ nhận ngày trong năm 2024'],
            ['<b>Date</b>', 'less than or equal to <code>=TODAY()</code>', 'Ngày nhập kho không được ở tương lai'],
            ['<b>Text length</b> (độ dài chữ)', 'equal to 10', 'Số điện thoại đúng 10 ký tự'],
            ['<b>Custom</b> (công thức)', '<code>=COUNTIF($A$2:$A$500,A2)=1</code>', 'Không cho nhập mã trùng']
          ]
        },
        {
          t: 'table',
          head: ['Tab', 'Dùng để', 'Ví dụ'],
          rows: [
            ['<b>Input Message</b>', 'Lời nhắc hiện ra khi bấm vào ô', '"Nhập số ngày công từ 0 đến 31"'],
            ['<b>Error Alert</b>, Style <b>Stop</b>', 'Chặn hẳn, bắt nhập lại', 'Ngày công, mã kho'],
            ['<b>Error Alert</b>, Style <b>Warning</b>', 'Cảnh báo, hỏi có muốn giữ không (Yes/No)', 'Đơn giá cao bất thường'],
            ['<b>Error Alert</b>, Style <b>Information</b>', 'Chỉ thông báo, vẫn cho nhập', 'Ghi chú nhắc nhở']
          ]
        },
        { t: 'warn', html: 'Data Validation <b>không chặn dữ liệu dán vào</b> (Ctrl + V) và không kiểm tra dữ liệu đã có từ trước. Dán từ nơi khác còn ghi đè mất quy tắc. Vì vậy sau khi thiết lập, hãy kiểm tra lại bằng <b>Circle Invalid Data</b>.' },
        { t: 'h', text: 'Thực hành 2: Khoanh dữ liệu sai' },
        { t: 'p', html: 'Cột Ngày công đã có quy tắc <b>Whole number between 0 and 31</b>, nhưng một số ô được dán vào từ trước. Hãy tìm các ô sai.' },
        {
          t: 'sim', id: 'dv2',
          task: 'Yêu cầu: đánh dấu các ô Ngày công vi phạm quy tắc (lớn hơn 31).',
          file: 'ChamCong_T5.xlsx',
          tab: 'data',
          data: [
            ['Mã NV', 'Họ tên', 'Chi nhánh', 'Ngày công'],
            ['NV01', 'Nguyễn Văn An', 'Hà Nội', 26],
            ['NV02', 'Trần Thị Bình', 'TP.HCM', 42],
            ['NV03', 'Lê Hoàng Cường', 'Đà Nẵng', 25],
            ['NV04', 'Phạm Thu Dung', 'Hà Nội', 22],
            ['NV05', 'Võ Minh Em', 'TP.HCM', 35],
            ['NV06', 'Đỗ Thị Hoa', 'Đà Nẵng', 23]
          ],
          steps: [
            { do: 'button', target: 'data.validation', text: 'Tab Data đang mở. Bấm nút <b>Data Validation</b>.' },
            {
              do: 'menu', at: 'data.validation',
              items: ['Data Validation...', 'Circle Invalid Data', 'Clear Validation Circles'],
              answer: 'Circle Invalid Data',
              text: 'Chọn <b>Circle Invalid Data</b> (khoanh dữ liệu không hợp lệ).',
              effect: { type: 'fill', col: 'Ngày công', op: '>', value: 31, bg: '#ffc7ce', ink: '#9c0006' }
            }
          ],
          doneText: 'Hai ô 42 và 35 bị đánh dấu (trên Excel thật là vòng tròn đỏ quanh ô). Sửa xong, vào <b>Data Validation › Clear Validation Circles</b> để xoá vòng.'
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Muốn người nhập chỉ được chọn trạng thái "Đã giao", "Đang giao", "Hủy". Dùng thiết lập nào?',
          options: ['Allow: Text length', 'Allow: List, Source: Đã giao,Đang giao,Hủy', 'Conditional Formatting', 'Data › Filter'],
          answer: 1,
          explain: 'Allow = List tạo danh sách thả xuống. Người nhập chỉ chọn được giá trị trong danh sách.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Bạn muốn khi nhập sai thì Excel chỉ cảnh báo nhưng vẫn cho giữ nếu người nhập chắc chắn. Chọn Style nào?',
          options: ['Stop', 'Warning', 'Information', 'Input Message'],
          answer: 1,
          explain: 'Warning hiện cảnh báo và hỏi Yes/No. Stop chặn hẳn. Information chỉ thông báo nhẹ.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Bảng đã có sẵn dữ liệu trước khi đặt quy tắc. Làm sao tìm nhanh các ô đang vi phạm?',
          options: ['Data › Data Validation › Circle Invalid Data', 'Home › Find &amp; Select › Go To', 'Data › Remove Duplicates', 'Review › Spelling'],
          answer: 0,
          explain: 'Circle Invalid Data khoanh đỏ các ô không thỏa quy tắc, kể cả dữ liệu nhập trước khi đặt quy tắc.'
        }
      ],
      exercises: []
    },

    /* ---------------- Bài 6 ---------------- */
    {
      id: 'lam-sach',
      title: 'Làm sạch dữ liệu',
      minutes: 12,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Bạn xuất danh sách đơn hàng từ phần mềm quản lý vận tải. Có đơn bị xuất 2, 3 lần. Cột "Tuyến,Biển số" dính chung một ô. Tên khách chỗ viết hoa, chỗ viết thường, thừa dấu cách. Đem tổng hợp ngay thì con số nào cũng sai.</p><p>Bài này giới thiệu bộ công cụ <b>làm sạch dữ liệu</b> có sẵn: <b>Remove Duplicates</b> (xoá dòng trùng), <b>Text to Columns</b> (tách cột), <b>Flash Fill</b> (điền theo mẫu), <b>Find &amp; Replace</b> (tìm và thay) và <b>Go To Special</b> (chọn ô trống).</p>'
        },
        { t: 'h', text: 'Các công cụ làm sạch nằm ở đâu?' },
        {
          t: 'excelui',
          tab: 'data',
          file: 'XuatTuPhanMem.xlsx',
          groups: ['Sort & Filter', 'Data Tools'],
          marks: [
            { id: 'tab.data', n: 1, text: 'Bấm tab <b>Data</b>.' },
            { id: 'data.textcols', n: 2, text: '<b>Text to Columns</b>: tách một cột thành nhiều cột theo dấu ngăn cách.' },
            { id: 'data.flashfill', n: 3, text: '<b>Flash Fill</b>: gõ một ví dụ, Excel đoán quy luật và điền cả cột. Phím tắt <kbd>Ctrl</kbd> + <kbd>E</kbd>.' },
            { id: 'data.removedup', n: 4, text: '<b>Remove Duplicates</b>: xoá các dòng trùng, giữ lại dòng đầu tiên.' }
          ],
          caption: 'Find & Replace và Go To Special nằm ở tab Home, nút Find & Select ở góc phải.'
        },
        { t: 'h', text: 'Thực hành 1: Xoá đơn hàng bị trùng' },
        { t: 'warn', html: '<b>Sao lưu dữ liệu trước</b> (chép sang sheet khác). Remove Duplicates xoá thật, chỉ còn cách <kbd>Ctrl</kbd> + <kbd>Z</kbd> ngay sau đó.' },
        {
          t: 'sim', id: 'clean1',
          task: 'Yêu cầu: xoá các dòng trùng Mã đơn, mỗi mã chỉ giữ một dòng.',
          file: 'XuatTuPhanMem.xlsx',
          tab: 'home',
          data: [
            ['Mã đơn', 'Khách hàng', 'Tuyến', 'Cước'],
            ['VD301', 'Cty Minh Phát', 'HCM-Cần Thơ', 3200000],
            ['VD302', 'Cty Hoa Mai', 'HCM-Đà Lạt', 4500000],
            ['VD303', 'Cty Tân Việt', 'HCM-Vũng Tàu', 2100000],
            ['VD302', 'Cty Hoa Mai', 'HCM-Đà Lạt', 4500000],
            ['VD304', 'Cty An Bình', 'HCM-Cần Thơ', 3200000],
            ['VD305', 'Cty Sao Mai', 'HCM-Nha Trang', 6800000],
            ['VD301', 'Cty Minh Phát', 'HCM-Cần Thơ', 3200000],
            ['VD302', 'Cty Hoa Mai', 'HCM-Đà Lạt', 4500000]
          ],
          fmt: { D: 'int' },
          steps: [
            { do: 'cell', text: 'Bấm vào một ô trong bảng.' },
            { do: 'tab', target: 'data', text: 'Bấm tab <b>Data</b>.' },
            {
              do: 'button', target: 'data.removedup',
              text: 'Bấm <b>Remove Duplicates</b>. Trên Excel thật, hộp thoại hiện danh sách cột: bấm <b>Unselect All</b>, chỉ đánh dấu <b>Mã đơn</b>, rồi bấm <b>OK</b>.',
              effect: { type: 'dedupe', cols: ['Mã đơn'] }
            }
          ],
          doneText: 'Bảng còn 5 dòng. Excel báo "3 duplicate values found and removed; 5 unique values remain" (đã xoá 3 dòng trùng, còn 5 dòng). Dòng xuất hiện <b>đầu tiên</b> của mỗi mã được giữ lại.'
        },
        {
          t: 'table',
          head: ['Trong hộp thoại Remove Duplicates', 'Nghĩa'],
          rows: [
            ['<b>Select All</b> / <b>Unselect All</b>', 'Đánh dấu hết / bỏ hết các cột'],
            ['<b>My data has headers</b>', 'Dòng 1 là tiêu đề, không xét trùng dòng này'],
            ['Danh sách cột có ô đánh dấu', 'Cột nào được đánh dấu thì dùng để so trùng. Đánh dấu mỗi <b>Mã đơn</b>: hai dòng cùng mã là trùng. Đánh dấu tất cả: chỉ khi giống nhau ở mọi cột mới là trùng.']
          ]
        },
        { t: 'tip', html: 'Muốn <b>xem trước</b> dòng nào trùng rồi mới xoá: tô màu bằng <b>Conditional Formatting › Duplicate Values</b> (bài 4), hoặc dùng công thức <code>=COUNTIF($A$2:$A$100,A2)</code> như bài tập bên dưới.' },
        { t: 'h', text: 'Thực hành 2: Mở Text to Columns để tách cột' },
        {
          t: 'sim', id: 'clean2',
          task: 'Yêu cầu: mở công cụ tách cột cho cột "Tuyến,Biển số" (tuyến và biển số ngăn cách bằng dấu phẩy).',
          file: 'XuatTuPhanMem.xlsx',
          tab: 'home',
          data: [
            ['Mã đơn', 'Tuyến,Biển số', '', ''],
            ['VD301', 'Cần Thơ,51C12345', '', ''],
            ['VD302', 'Đà Lạt,51D67890', '', ''],
            ['VD303', 'Vũng Tàu,72C11223', '', ''],
            ['VD304', 'Cần Thơ,51C44556', '', ''],
            ['VD305', 'Nha Trang,79C77889', '', '']
          ],
          steps: [
            { do: 'cell', text: 'Bấm vào cột <b>Tuyến,Biển số</b>. Trên Excel thật bạn chọn cả cột B. Bên phải đã có sẵn cột trống để chứa kết quả.' },
            { do: 'tab', target: 'data', text: 'Bấm tab <b>Data</b>.' },
            { do: 'button', target: 'data.textcols', text: 'Bấm <b>Text to Columns</b>. Hộp thoại 3 bước hiện ra.' }
          ],
          doneText: 'Hộp thoại <b>Convert Text to Columns Wizard</b> đã mở. Làm tiếp 3 bước như bảng bên dưới.'
        },
        {
          t: 'steps',
          title: 'Ba bước trong hộp thoại Text to Columns',
          items: [
            '<b>Step 1 of 3</b>: chọn <b>Delimited</b> (có ký tự ngăn cách) › <b>Next</b>. Kiểu <b>Fixed width</b> (độ rộng cố định) chỉ dùng khi mọi ô có cùng số ký tự.',
            '<b>Step 2 of 3</b>: đánh dấu ký tự ngăn cách: <b>Tab</b>, <b>Semicolon</b> (chấm phẩy), <b>Comma</b> (dấu phẩy), <b>Space</b> (dấu cách) hoặc <b>Other</b> rồi gõ ký tự. Ví dụ này đánh dấu <b>Comma</b>. Xem trước ở khung <b>Data preview</b> › <b>Next</b>.',
            '<b>Step 3 of 3</b>: chọn định dạng cho từng cột (cột mã có số 0 ở đầu thì chọn <b>Text</b>), chọn ô đích ở <b>Destination</b> › <b>Finish</b>.'
          ]
        },
        { t: 'warn', html: 'Bên phải cột cần tách phải có <b>đủ cột trống</b>. Nếu không, kết quả tách sẽ ghi đè lên dữ liệu bên cạnh.' },
        { t: 'tip', html: 'Text to Columns còn sửa được <b>số bị lưu dạng chữ</b> và <b>ngày bị lưu dạng chữ</b> (thường gặp khi xuất từ phần mềm). Chọn cột, mở Text to Columns rồi bấm <b>Finish</b> luôn. Excel sẽ chuyển lại thành số, ngày.' },
        { t: 'h', text: 'Flash Fill (Ctrl + E): điền theo mẫu' },
        {
          t: 'steps',
          items: [
            'Cạnh cột gốc, gõ <b>một ví dụ</b> kết quả mong muốn ở dòng đầu. Ví dụ cột A là "nguyễn văn an", ở B2 gõ "Nguyễn Văn An".',
            'Chọn ô ngay dưới (B3), nhấn <kbd>Ctrl</kbd> + <kbd>E</kbd> hoặc bấm <b>Data › Flash Fill</b>.',
            'Excel đoán quy luật và điền cả cột. Kiểm tra vài dòng. Nếu sai, gõ thêm một ví dụ rồi nhấn lại <kbd>Ctrl</kbd> + <kbd>E</kbd>.'
          ]
        },
        {
          t: 'table',
          head: ['Cột gốc', 'Gõ ví dụ', 'Flash Fill điền tiếp'],
          rows: [
            ['nguyễn văn an', 'Nguyễn Văn An', 'Viết hoa chữ đầu mọi tên'],
            ['Cần Thơ,51C12345', '51C12345', 'Lấy riêng biển số'],
            ['0901234567', '090 123 4567', 'Tách số điện thoại cho dễ đọc'],
            ['Trần Thị Bình', 'Bình', 'Lấy tên (chữ cuối)']
          ]
        },
        { t: 'warn', html: 'Flash Fill cho ra <b>giá trị tĩnh</b>, không phải công thức. Dữ liệu gốc đổi thì kết quả không tự cập nhật. Dữ liệu thay đổi thường xuyên thì dùng hàm (LEFT, MID, PROPER, TRIM…).' },
        { t: 'h', text: 'Find &amp; Replace (Ctrl + H): tìm và thay hàng loạt' },
        {
          t: 'table',
          head: ['Ký tự đại diện', 'Nghĩa', 'Ví dụ Find what', 'Tìm được'],
          rows: [
            ['<code>*</code>', 'Một chuỗi ký tự bất kỳ (kể cả rỗng)', '<code>Công ty*</code>', 'Công ty ABC, Công ty TNHH Minh Phát…'],
            ['<code>?</code>', 'Đúng một ký tự bất kỳ', '<code>SP0?</code>', 'SP01, SP02… (không có SP010)'],
            ['<code>~</code>', 'Tìm chính dấu * hoặc ? (ký tự thoát)', '<code>~*</code>', 'Dấu * thật trong ô']
          ]
        },
        {
          t: 'list',
          items: [
            'Xoá chữ "đ" thừa trong cột tiền: Find what <code>đ</code>, Replace with để trống › <b>Replace All</b>.',
            'Xoá phần ghi chú trong ngoặc: Find what <code>(*)</code>, Replace with để trống.',
            'Bấm <b>Options &gt;&gt;</b> để chọn <b>Match entire cell contents</b> (khớp toàn bộ ô), <b>Match case</b> (phân biệt hoa thường), <b>Within: Workbook</b> (thay cả file).'
          ]
        },
        { t: 'warn', html: 'Trước khi bấm <b>Replace All</b>, hãy chọn đúng vùng cần thay. Nếu chỉ chọn một ô, Excel thay trên <b>cả sheet</b>.' },
        { t: 'h', text: 'Go To Special › Blanks: điền ô trống' },
        {
          t: 'steps',
          title: 'Cột Chi nhánh chỉ ghi ở dòng đầu mỗi nhóm, các dòng dưới để trống',
          items: [
            'Chọn vùng cột có ô trống.',
            'Nhấn <kbd>F5</kbd> › <b>Special...</b> (hoặc <b>Home › Find &amp; Select › Go To Special...</b>) › chọn <b>Blanks</b> › <b>OK</b>. Chỉ các ô trống được chọn.',
            'Gõ <code>=</code> rồi nhấn mũi tên lên (ví dụ thành <code>=A2</code>), sau đó nhấn <kbd>Ctrl</kbd> + <kbd>Enter</kbd> để điền cho mọi ô trống cùng lúc.',
            'Chép cả cột và dán lại dạng <b>Values</b> (<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>V</kbd>) để bỏ công thức.'
          ]
        },
        {
          t: 'keys',
          items: [
            ['Ctrl + E', 'Flash Fill'],
            ['Ctrl + H', 'Find &amp; Replace'],
            ['Ctrl + F', 'Find (tìm)'],
            ['F5 / Ctrl + G', 'Go To, bấm Special để mở Go To Special'],
            ['Ctrl + Enter', 'Điền cùng nội dung cho mọi ô đang chọn']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Cột A chứa "Nguyễn Văn An - Kế toán". Muốn tách tên và phòng ban sang 2 cột riêng. Dùng gì?',
          options: ['Remove Duplicates', 'Data › Text to Columns với ký tự ngăn cách - ', 'Conditional Formatting', 'Go To Special › Blanks'],
          answer: 1,
          explain: 'Text to Columns tách một cột thành nhiều cột theo ký tự ngăn cách (Other: -). Flash Fill cũng làm được.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Remove Duplicates với cột Mã đơn được đánh dấu. Mã DH102 xuất hiện ở dòng 3, 5 và 9. Dòng nào được giữ lại?',
          options: ['Dòng 3', 'Dòng 5', 'Dòng 9', 'Xoá cả ba dòng'],
          answer: 0,
          explain: 'Remove Duplicates giữ dòng xuất hiện đầu tiên (dòng 3) và xoá các dòng trùng phía sau.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Bảng xuất từ phần mềm có cột Chi nhánh chỉ ghi ở dòng đầu mỗi nhóm, các dòng dưới để trống. Cách điền nhanh nhất?',
          options: ['Gõ tay từng ô', 'Go To Special › Blanks, gõ = rồi mũi tên lên, nhấn Ctrl + Enter', 'Remove Duplicates', 'Sort A to Z'],
          answer: 1,
          explain: 'Chọn hết ô trống bằng Go To Special, gõ công thức tham chiếu ô phía trên rồi Ctrl + Enter để điền một lần cho tất cả.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Trước khi Remove Duplicates, hãy <b>đếm số lần xuất hiện</b> của từng mã đơn. Ở <code>C2</code> viết công thức đếm mã ở A2 xuất hiện bao nhiêu lần trong cả cột A2:A9, rồi sao chép xuống C3:C9. Kết quả lớn hơn 1 là đơn bị trùng.',
          data: [
            ['Mã đơn', 'Khách hàng', 'Số lần'],
            ['DH101', 'Công ty Minh Phát'],
            ['DH102', 'Cửa hàng Hoa Mai'],
            ['DH103', 'Công ty Tân Việt'],
            ['DH102', 'Cửa hàng Hoa Mai'],
            ['DH104', 'Siêu thị An Bình'],
            ['DH105', 'Công ty Minh Phát'],
            ['DH101', 'Công ty Minh Phát'],
            ['DH102', 'Cửa hàng Hoa Mai']
          ],
          fill: { range: 'C2:C9', solution: '=COUNTIF($A$2:$A$9,A2)' },
          mustUse: ['COUNTIF'],
          fmt: { C: 'int' },
          strict: false,
          hint: 'Vùng đếm phải khoá bằng $ để không trôi khi sao chép: <code>=COUNTIF($A$2:$A$9,A2)</code>.',
          explain: 'DH102 xuất hiện 3 lần, DH101 xuất hiện 2 lần. Lọc cột C lớn hơn 1 để xem các đơn trùng trước khi xoá.'
        },
        {
          id: 'ex2',
          task: 'Đánh dấu <b>lần xuất hiện thứ mấy</b> của mỗi mã đơn để biết dòng nào là bản sao (dòng sẽ bị Remove Duplicates xoá). Ở <code>C2</code> đếm mã A2 xuất hiện bao nhiêu lần <b>từ A2 đến dòng hiện tại</b>, rồi sao chép xuống C3:C9.',
          data: [
            ['Mã đơn', 'Khách hàng', 'Lần thứ'],
            ['DH101', 'Công ty Minh Phát'],
            ['DH102', 'Cửa hàng Hoa Mai'],
            ['DH103', 'Công ty Tân Việt'],
            ['DH102', 'Cửa hàng Hoa Mai'],
            ['DH104', 'Siêu thị An Bình'],
            ['DH105', 'Công ty Minh Phát'],
            ['DH101', 'Công ty Minh Phát'],
            ['DH102', 'Cửa hàng Hoa Mai']
          ],
          fill: { range: 'C2:C9', solution: '=COUNTIF($A$2:A2,A2)' },
          mustUse: ['COUNTIF'],
          fmt: { C: 'int' },
          strict: false,
          hint: 'Chỉ khoá ô đầu của vùng: <code>$A$2:A2</code>. Khi kéo xuống, vùng tự dài ra: <code>=COUNTIF($A$2:A2,A2)</code>.',
          explain: 'Dòng có kết quả 1 là lần đầu (được giữ lại), dòng có kết quả 2, 3 là bản sao. Đây chính là cách Remove Duplicates quyết định giữ dòng nào.'
        },
        {
          id: 'ex3',
          task: 'Tên hàng xuất từ phần mềm kho bị <b>thừa dấu cách</b> ở đầu, cuối và giữa các từ. Ở <code>B2</code> dùng hàm làm sạch dấu cách cho tên ở A2, rồi sao chép xuống B3:B6.',
          data: [
            ['Tên hàng (gốc)', 'Tên hàng (sạch)'],
            ['  Giấy A4   Double A'],
            ['Bút bi   Thiên Long  '],
            ['   Mực in Canon 337'],
            ['Kẹp  giấy  số 2'],
            [' Băng keo trong ']
          ],
          fill: { range: 'B2:B6', solution: '=TRIM(A2)' },
          mustUse: ['TRIM'],
          strict: false,
          hint: 'Hàm TRIM xoá dấu cách ở đầu, cuối và rút các dấu cách liên tiếp ở giữa còn một: <code>=TRIM(A2)</code>.',
          explain: 'Dấu cách thừa làm "Giấy A4" và "Giấy A4 " bị coi là hai mặt hàng khác nhau, khiến VLOOKUP, COUNTIF, Pivot sai. Sau khi TRIM, chép cột B và dán Values đè lên cột gốc.'
        }
      ]
    },

    /* ---------------- Bài 7 ---------------- */
    {
      id: 'pivot',
      title: 'PivotTable: tổng hợp báo cáo trong vài cú kéo thả',
      minutes: 14,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Bạn có bảng 5.000 dòng đơn hàng. Sếp hỏi: <b>"Doanh thu từng khu vực theo từng tháng là bao nhiêu?"</b> Viết SUMIFS cho từng ô thì mất cả buổi, sếp hỏi thêm một câu là làm lại.</p><p><b>PivotTable</b> (bảng tổng hợp) cho ra báo cáo đó trong chưa tới một phút, chỉ bằng <b>kéo thả</b> tên cột. Muốn xem theo nhân viên thay vì khu vực? Kéo lại là xong.</p>'
        },
        { t: 'h', text: 'Chuẩn bị dữ liệu trước khi làm Pivot' },
        {
          t: 'list',
          items: [
            'Mỗi cột có <b>một tiêu đề</b> duy nhất, không để trống tiêu đề.',
            'Không có dòng trống, cột trống, ô gộp (Merge) trong bảng.',
            'Mỗi dòng là một bản ghi (một đơn hàng, một lần xuất kho). Không chèn dòng tổng cộng giữa bảng.',
            'Nên biến dữ liệu thành <b>Table</b> (<kbd>Ctrl</kbd> + <kbd>T</kbd>) để Pivot tự nhận dòng mới.'
          ]
        },
        { t: 'h', text: 'PivotTable nằm ở đâu?' },
        {
          t: 'excelui',
          tab: 'insert',
          file: 'DonHang_2024.xlsx',
          groups: ['Tables', 'Charts'],
          marks: [
            { id: 'tab.insert', n: 1, text: 'Bấm tab <b>Insert</b>.' },
            { id: 'insert.pivot', n: 2, text: 'Nút <b>PivotTable</b>. Bấm phần mũi tên ▾ để chọn nguồn dữ liệu.' },
            { id: 'insert.recpivot', n: 3, text: '<b>Recommended PivotTables</b>: Excel gợi ý sẵn vài mẫu báo cáo, hợp khi mới làm quen.' },
            { id: 'insert.pivotchart', n: 4, text: '<b>PivotChart</b>: biểu đồ đi kèm Pivot, lọc Pivot thì biểu đồ đổi theo.' }
          ]
        },
        { t: 'h', text: 'Thực hành: Tạo PivotTable từ bảng đơn hàng' },
        {
          t: 'sim', id: 'pv1',
          task: 'Yêu cầu: tạo PivotTable từ bảng dữ liệu đơn hàng.',
          file: 'DonHang_2024.xlsx',
          tab: 'home',
          data: [
            ['Ngày', 'Khu vực', 'Nhân viên', 'Doanh thu'],
            ['03/01/2024', 'Miền Bắc', 'Lan', 12000000],
            ['05/01/2024', 'Miền Nam', 'Hùng', 18000000],
            ['08/01/2024', 'Miền Trung', 'Quân', 6500000],
            ['12/01/2024', 'Miền Bắc', 'Minh', 9500000],
            ['02/02/2024', 'Miền Nam', 'Thảo', 7000000],
            ['06/02/2024', 'Miền Trung', 'Quân', 8800000],
            ['15/02/2024', 'Miền Bắc', 'Lan', 15500000],
            ['20/02/2024', 'Miền Nam', 'Hùng', 11000000]
          ],
          fmt: { D: 'int' },
          steps: [
            { do: 'cell', text: 'Bấm vào <b>một ô bất kỳ</b> trong bảng dữ liệu.' },
            { do: 'tab', target: 'insert', text: 'Bấm tab <b>Insert</b>.' },
            { do: 'button', target: 'insert.pivot', text: 'Bấm nút <b>PivotTable</b>.' },
            {
              do: 'menu', at: 'insert.pivot',
              items: ['From Table/Range', 'From External Data Source', 'From Data Model'],
              answer: 'From Table/Range',
              text: 'Dữ liệu nằm ngay trong sheet, nên chọn <b>From Table/Range</b> (từ bảng/vùng).'
            }
          ],
          doneText: 'Hộp thoại <b>PivotTable from table or range</b> mở ra. Kiểm tra ô <b>Table/Range</b> đúng vùng A1:D9, chọn <b>New Worksheet</b> (đặt Pivot ở sheet mới) rồi bấm <b>OK</b>.'
        },
        {
          t: 'table',
          head: ['Mục trong menu PivotTable', 'Dùng khi'],
          rows: [
            ['<b>From Table/Range</b>', 'Dữ liệu nằm trong file đang mở. 9 trên 10 lần bạn chọn mục này.'],
            ['<b>From External Data Source</b>', 'Lấy dữ liệu từ nguồn bên ngoài (cơ sở dữ liệu, file khác) qua kết nối.'],
            ['<b>From Data Model</b>', 'Gộp nhiều bảng có liên kết với nhau (Power Pivot). Dành cho người dùng nâng cao.']
          ]
        },
        { t: 'h', text: 'Khung PivotTable Fields: kéo thả để ra báo cáo' },
        { t: 'p', html: 'Bấm OK xong, Excel mở sheet mới. Bên trái là vùng Pivot còn trống, bên phải là khung <b>PivotTable Fields</b>. Phía trên khung là danh sách tên cột (Ngày, Khu vực, Nhân viên, Doanh thu). Phía dưới là <b>4 ô</b> để kéo tên cột vào.' },
        {
          t: 'table',
          head: ['Ô', 'Nghĩa', 'Ví dụ kéo vào'],
          rows: [
            ['<b>Filters</b> (bộ lọc)', 'Lọc cả báo cáo, nằm trên đầu Pivot', 'Năm, Kênh bán'],
            ['<b>Columns</b> (cột)', 'Các nhãn trải ngang', 'Tháng, Loại hàng'],
            ['<b>Rows</b> (hàng)', 'Các nhãn đi dọc xuống', 'Khu vực, Nhân viên'],
            ['<b>Values</b> (giá trị)', 'Con số cần tính (tổng, đếm, trung bình)', 'Doanh thu, Số lượng']
          ]
        },
        {
          t: 'steps',
          title: 'Ra báo cáo "Doanh thu theo khu vực"',
          items: [
            'Trong danh sách tên cột, kéo <b>Khu vực</b> thả vào ô <b>Rows</b>. Pivot hiện 3 dòng: Miền Bắc, Miền Nam, Miền Trung.',
            'Kéo <b>Doanh thu</b> thả vào ô <b>Values</b>. Cạnh mỗi khu vực hiện tổng doanh thu, kèm dòng <b>Grand Total</b> (tổng chung).',
            'Muốn thêm chiều tháng: kéo <b>Ngày</b> vào ô <b>Columns</b>. Excel thường tự nhóm theo tháng.',
            'Muốn bỏ một trường: kéo nó ra khỏi ô, hoặc bỏ dấu tích ở danh sách phía trên.'
          ]
        },
        {
          t: 'example',
          title: 'Dữ liệu gốc và kết quả mà Pivot sẽ cho ra (ở đây kiểm chứng bằng SUMIFS, COUNTIFS)',
          data: [
            ['Khu vực', 'Nhân viên', 'Doanh thu', '', 'Khu vực', 'Tổng DT', 'Số đơn'],
            ['Miền Bắc', 'Lan', 12000000, '', 'Miền Bắc', '=SUMIFS($C$2:$C$7,$A$2:$A$7,E2)', '=COUNTIFS($A$2:$A$7,E2)'],
            ['Miền Nam', 'Hùng', 18000000, '', 'Miền Nam', '=SUMIFS($C$2:$C$7,$A$2:$A$7,E3)', '=COUNTIFS($A$2:$A$7,E3)'],
            ['Miền Bắc', 'Lan', 9500000, '', 'Tổng', '=SUM(F2:F3)', '=SUM(G2:G3)'],
            ['Miền Nam', 'Thảo', 7000000],
            ['Miền Bắc', 'Minh', 15500000],
            ['Miền Nam', 'Hùng', 11000000]
          ],
          fmt: { C: 'int', F: 'int', G: 'int' },
          note: 'Kéo <b>Khu vực</b> vào Rows, <b>Doanh thu</b> vào Values hai lần (một lần để Sum, một lần đổi sang Count), Pivot cho ra đúng bảng E1:G4. Viết SUMIFS song song là cách tốt để tự kiểm tra Pivot.'
        },
        { t: 'h', text: 'Đổi Sum sang Count, Average' },
        {
          t: 'steps',
          items: [
            'Chuột phải vào một số trong Pivot › <b>Summarize Values By</b> (tóm tắt theo) › chọn <b>Sum</b> (tổng), <b>Count</b> (đếm), <b>Average</b> (trung bình), <b>Max</b>, <b>Min</b>.',
            'Hoặc bấm vào trường trong ô Values › <b>Value Field Settings...</b> Tại đây đổi luôn tên cột ở <b>Custom Name</b> và bấm <b>Number Format</b> để định dạng #,##0.'
          ]
        },
        { t: 'warn', html: 'Cột số mà Pivot tự để <b>Count</b> thay vì Sum là dấu hiệu cột có ô trống hoặc ô chứa chữ (số lưu dạng text). Hãy làm sạch dữ liệu gốc rồi Refresh.' },
        {
          t: 'table',
          head: ['Việc cần làm', 'Cách làm'],
          rows: [
            ['Gom ngày thành tháng, quý, năm', 'Chuột phải vào một ngày trong Pivot › <b>Group...</b> › chọn <b>Months</b> và <b>Years</b> (chọn cả Years để tháng 1/2023 và tháng 1/2024 không bị cộng chung) › <b>OK</b>.'],
            ['Cập nhật khi dữ liệu gốc thay đổi', 'Pivot <b>không tự cập nhật</b>. Chuột phải vào Pivot › <b>Refresh</b>, hoặc <b>PivotTable Analyze › Refresh All</b> (<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>F5</kbd>).'],
            ['Thêm dòng mà dữ liệu gốc không phải Table', '<b>PivotTable Analyze › Change Data Source</b> để mở rộng vùng.'],
            ['Hiện tỉ trọng phần trăm', 'Chuột phải vào một số › <b>Show Values As</b> › <b>% of Grand Total</b> (so với tổng chung), <b>% of Column Total</b>, <b>% of Row Total</b>.'],
            ['Cộng dồn, chênh lệch', '<b>Show Values As</b> › <b>Running Total In</b> (cộng dồn) hoặc <b>Difference From</b> (chênh lệch so với tháng trước).']
          ]
        },
        { t: 'tip', html: 'Mẹo hay: kéo Doanh thu vào Values <b>hai lần</b>. Cột thứ nhất để số tiền, cột thứ hai đổi sang <b>Show Values As › % of Grand Total</b>. Một bảng thấy cả số tiền lẫn tỉ trọng.' },
        {
          t: 'quiz', id: 'q1',
          q: 'Muốn báo cáo doanh thu với Khu vực theo hàng dọc, Tháng trải theo cột ngang. Kéo thả thế nào?',
          options: ['Khu vực vào Columns, Tháng vào Rows, Doanh thu vào Filters', 'Khu vực vào Rows, Tháng vào Columns, Doanh thu vào Values', 'Cả ba vào Values', 'Khu vực vào Filters, Tháng vào Values'],
          answer: 1,
          explain: 'Rows là nhãn đi dọc, Columns là nhãn trải ngang, Values là con số cần tính.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Bạn sửa số liệu ở sheet dữ liệu gốc nhưng Pivot vẫn hiện số cũ. Cần làm gì?',
          options: ['Tạo lại Pivot mới', 'Chuột phải vào Pivot › Refresh', 'Nhấn Ctrl + Z', 'Lưu file rồi mở lại'],
          answer: 1,
          explain: 'Pivot lưu một bản sao dữ liệu riêng (cache), phải Refresh để lấy số mới.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Cột Ngày trong Pivot đang hiện từng ngày lẻ. Muốn tổng hợp theo tháng thì làm gì?',
          options: ['Chuột phải vào ngày › Group › chọn Months và Years', 'Đổi định dạng ngày thành mm/yyyy', 'Kéo Ngày vào Values', 'Dùng Show Values As › Running Total'],
          answer: 0,
          explain: 'Group gom các ngày thành tháng, quý, năm. Chỉ đổi định dạng thì vẫn là từng ngày riêng.'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          task: 'Tự kiểm chứng Pivot: tính <b>tổng doanh thu theo khu vực</b> ở G2:G4 (khu vực ghi ở F2:F4). Viết công thức ở <code>G2</code> rồi sao chép xuống G3:G4.',
          data: [
            ['Ngày', 'Khu vực', 'Nhân viên', 'Doanh thu', '', 'Khu vực', 'Tổng DT'],
            ['03/01/2024', 'Miền Bắc', 'Lan', 12000000, '', 'Miền Bắc'],
            ['05/01/2024', 'Miền Nam', 'Hùng', 18000000, '', 'Miền Trung'],
            ['08/01/2024', 'Miền Trung', 'Quân', 6500000, '', 'Miền Nam'],
            ['12/01/2024', 'Miền Bắc', 'Minh', 9500000],
            ['02/02/2024', 'Miền Nam', 'Thảo', 7000000],
            ['06/02/2024', 'Miền Trung', 'Quân', 8800000],
            ['15/02/2024', 'Miền Bắc', 'Lan', 15500000],
            ['20/02/2024', 'Miền Nam', 'Hùng', 11000000]
          ],
          fill: { range: 'G2:G4', solution: '=SUMIFS($D$2:$D$9,$B$2:$B$9,F2)' },
          fmt: { D: 'int', G: 'int' },
          hint: 'Tổng cột D với điều kiện cột B bằng khu vực ở F2. Khoá vùng bằng $: <code>=SUMIFS($D$2:$D$9,$B$2:$B$9,F2)</code>.',
          explain: 'Đây chính là con số Pivot cho ra khi kéo Khu vực vào Rows và Doanh thu vào Values (Sum).'
        },
        {
          id: 'ex2',
          task: 'Tiếp tục kiểm chứng: đếm <b>số đơn</b> của từng nhân viên ở G2:G5 (tên ở F2:F5), giống khi Pivot để Values là <b>Count</b>. Viết ở <code>G2</code> rồi sao chép xuống.',
          data: [
            ['Ngày', 'Khu vực', 'Nhân viên', 'Doanh thu', '', 'Nhân viên', 'Số đơn'],
            ['03/01/2024', 'Miền Bắc', 'Lan', 12000000, '', 'Lan'],
            ['05/01/2024', 'Miền Nam', 'Hùng', 18000000, '', 'Hùng'],
            ['08/01/2024', 'Miền Trung', 'Quân', 6500000, '', 'Quân'],
            ['12/01/2024', 'Miền Bắc', 'Lan', 9500000, '', 'Thảo'],
            ['02/02/2024', 'Miền Nam', 'Thảo', 7000000],
            ['06/02/2024', 'Miền Trung', 'Quân', 8800000],
            ['15/02/2024', 'Miền Bắc', 'Lan', 15500000],
            ['20/02/2024', 'Miền Nam', 'Hùng', 11000000]
          ],
          fill: { range: 'G2:G5', solution: '=COUNTIFS($C$2:$C$9,F2)' },
          fmt: { D: 'int', G: 'int' },
          strict: false,
          hint: 'Đếm số dòng có cột C bằng tên ở F2: <code>=COUNTIFS($C$2:$C$9,F2)</code> (COUNTIF cũng được).',
          explain: 'Lan có 3 đơn, Hùng 2, Quân 2, Thảo 1. Tổng 8 đơn bằng số dòng dữ liệu, đúng như dòng Grand Total của Pivot.'
        },
        {
          id: 'ex3',
          task: 'Làm giống <b>Show Values As › % of Grand Total</b>: ở G2:G4 tính tỉ trọng doanh thu từng khu vực trên <b>tổng doanh thu cả bảng</b>. Viết ở <code>G2</code> rồi sao chép xuống.',
          data: [
            ['Ngày', 'Khu vực', 'Nhân viên', 'Doanh thu', '', 'Khu vực', 'Tỉ trọng'],
            ['03/01/2024', 'Miền Bắc', 'Lan', 12000000, '', 'Miền Bắc'],
            ['05/01/2024', 'Miền Nam', 'Hùng', 18000000, '', 'Miền Trung'],
            ['08/01/2024', 'Miền Trung', 'Quân', 6500000, '', 'Miền Nam'],
            ['12/01/2024', 'Miền Bắc', 'Minh', 9500000],
            ['02/02/2024', 'Miền Nam', 'Thảo', 7000000],
            ['06/02/2024', 'Miền Trung', 'Quân', 8800000],
            ['15/02/2024', 'Miền Bắc', 'Lan', 15500000],
            ['20/02/2024', 'Miền Nam', 'Hùng', 11000000]
          ],
          fill: { range: 'G2:G4', solution: '=SUMIFS($D$2:$D$9,$B$2:$B$9,F2)/SUM($D$2:$D$9)' },
          fmt: { D: 'int', G: 'pct' },
          hint: 'Tỉ trọng = tổng của khu vực ÷ tổng chung: <code>=SUMIFS($D$2:$D$9,$B$2:$B$9,F2)/SUM($D$2:$D$9)</code>.',
          explain: 'Ba tỉ trọng cộng lại bằng 100%, đúng như cột % of Grand Total trong Pivot.'
        }
      ]
    },

    /* ---------------- Bài 8 ---------------- */
    {
      id: 'bieu-do',
      title: 'Biểu đồ: chọn đúng loại, trình bày rõ ràng',
      minutes: 11,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Cuộc họp giao ban chỉ có 5 phút. Bạn đưa sếp bảng số 5 chi nhánh, sếp nhíu mày dò từng dòng. Đồng nghiệp đưa một biểu đồ cột đã sắp từ cao xuống thấp, sếp nhìn 2 giây là biết chi nhánh nào dẫn đầu.</p><p>Điều quan trọng nhất không phải màu sắc mà là <b>chọn đúng loại biểu đồ</b> cho câu hỏi cần trả lời: so sánh thì dùng cột, xu hướng thì dùng đường, cơ cấu thì dùng tròn.</p>'
        },
        { t: 'h', text: 'Các nút biểu đồ nằm ở đâu?' },
        {
          t: 'excelui',
          tab: 'insert',
          file: 'DoanhThu_ChiNhanh.xlsx',
          groups: ['Tables', 'Charts', 'Sparklines'],
          marks: [
            { id: 'tab.insert', n: 1, text: 'Bấm tab <b>Insert</b>.' },
            { id: 'insert.reccharts', n: 2, text: '<b>Recommended Charts</b>: Excel xem dữ liệu và gợi ý vài loại biểu đồ phù hợp. Rất hợp khi chưa biết chọn gì.' },
            { id: 'insert.colchart', n: 3, text: 'Biểu đồ <b>cột</b> và <b>thanh ngang</b> (Column/Bar): so sánh giữa các nhóm.' },
            { id: 'insert.linechart', n: 4, text: 'Biểu đồ <b>đường</b> (Line): xu hướng theo thời gian.' },
            { id: 'insert.piechart', n: 5, text: 'Biểu đồ <b>tròn</b> (Pie, Doughnut): cơ cấu, tỉ trọng của một tổng.' },
            { id: 'insert.spline', n: 6, text: '<b>Sparklines</b>: biểu đồ mini nằm gọn trong một ô.' }
          ],
          caption: 'Phím tắt: Alt + F1 tạo nhanh biểu đồ cột ngay trong sheet, F11 tạo biểu đồ ở sheet riêng.'
        },
        {
          t: 'table',
          head: ['Muốn thể hiện', 'Loại biểu đồ', 'Ví dụ'],
          rows: [
            ['So sánh giữa các nhóm', '<b>Column</b> (cột đứng) hoặc <b>Bar</b> (thanh ngang, hợp khi tên dài)', 'Doanh thu 5 chi nhánh'],
            ['Xu hướng theo thời gian', '<b>Line</b> (đường)', 'Doanh thu 12 tháng, giá xăng theo tuần'],
            ['Cơ cấu, tỉ trọng của một tổng', '<b>Pie</b> (tròn) hoặc <b>Doughnut</b> (vành khuyên), chỉ nên tối đa 5 phần', 'Cơ cấu chi phí: lương, thuê kho, nhiên liệu'],
            ['Hai đại lượng khác đơn vị', '<b>Combo</b> (kết hợp cột và đường, trục phụ)', 'Doanh thu (tỷ đồng) và tỉ lệ đạt KPI (%)'],
            ['Thành phần qua thời gian', '<b>Stacked Column</b> (cột chồng)', 'Doanh thu từng sản phẩm qua các quý'],
            ['Quan hệ giữa hai biến', '<b>Scatter</b> (phân tán)', 'Quãng đường và chi phí vận chuyển']
          ]
        },
        { t: 'h', text: 'Thực hành 1: Biểu đồ cột so sánh chi nhánh' },
        { t: 'p', html: 'Mẹo của người làm báo cáo giỏi: <b>sắp dữ liệu từ lớn đến nhỏ trước</b>, rồi mới vẽ. Cột sẽ xếp bậc thang, nhìn là thấy ai dẫn đầu.' },
        {
          t: 'sim', id: 'chart1',
          task: 'Yêu cầu: sắp Doanh thu giảm dần, rồi chèn biểu đồ cột Clustered Column.',
          file: 'DoanhThu_ChiNhanh.xlsx',
          tab: 'home',
          data: [
            ['Chi nhánh', 'Doanh thu'],
            ['Hà Nội', 4850000000],
            ['Hải Phòng', 2120000000],
            ['Đà Nẵng', 2760000000],
            ['TP.HCM', 6340000000],
            ['Cần Thơ', 1580000000]
          ],
          fmt: { B: 'int' },
          steps: [
            { do: 'cell', text: 'Bấm vào một ô trong cột <b>Doanh thu</b>.' },
            { do: 'tab', target: 'data', text: 'Bấm tab <b>Data</b>.' },
            {
              do: 'button', target: 'data.sortza',
              text: 'Bấm nút <b>Z→A</b> (Sort Largest to Smallest) để sắp giảm dần.',
              effect: { type: 'sort', col: 'Doanh thu', order: 'desc' }
            },
            { do: 'tab', target: 'insert', text: 'Bấm tab <b>Insert</b>.' },
            { do: 'button', target: 'insert.colchart', text: 'Bấm nút biểu đồ <b>cột</b> (biểu tượng 3 cột xanh, có mũi tên ▾).' },
            {
              do: 'menu', at: 'insert.colchart',
              items: ['Clustered Column', 'Stacked Column', '100% Stacked Column', '-', 'Clustered Bar', 'Stacked Bar', '100% Stacked Bar', '-', 'More Column Charts...'],
              answer: 'Clustered Column',
              text: 'Chọn <b>Clustered Column</b> (cột nhóm, kiểu cơ bản nhất trong nhóm 2-D Column).'
            }
          ],
          doneText: 'Bảng đã sắp từ TP.HCM xuống Cần Thơ và biểu đồ cột được chèn vào sheet. Trên Excel thật, biểu đồ hiện ở giữa màn hình và Ribbon có thêm 2 tab <b>Chart Design</b>, <b>Format</b>.'
        },
        { t: 'h', text: 'Thực hành 2: Biểu đồ tròn cơ cấu chi phí' },
        {
          t: 'sim', id: 'chart2',
          task: 'Yêu cầu: vẽ biểu đồ tròn thể hiện cơ cấu chi phí vận hành.',
          file: 'ChiPhi_Q3.xlsx',
          tab: 'home',
          data: [
            ['Khoản chi', 'Số tiền'],
            ['Lương tài xế', 820000000],
            ['Nhiên liệu', 610000000],
            ['Thuê kho bãi', 340000000],
            ['Sửa chữa xe', 150000000],
            ['Khác', 80000000]
          ],
          fmt: { B: 'int' },
          steps: [
            { do: 'cell', text: 'Bấm vào một ô trong bảng. Trên Excel thật nên bôi đen A1:B6, gồm cả tiêu đề.' },
            { do: 'tab', target: 'insert', text: 'Bấm tab <b>Insert</b>.' },
            { do: 'button', target: 'insert.piechart', text: 'Bấm nút biểu đồ <b>tròn</b>.' },
            {
              do: 'menu', at: 'insert.piechart',
              items: ['Pie', '3-D Pie', 'Pie of Pie', 'Bar of Pie', '-', 'Doughnut', '-', 'More Pie Charts...'],
              answer: 'Pie',
              text: 'Chọn <b>Pie</b> (tròn 2-D). Tránh 3-D Pie vì hình nghiêng làm sai lệch độ lớn các lát.'
            }
          ],
          doneText: 'Biểu đồ tròn có 5 lát. Bấm dấu <b>+</b> cạnh biểu đồ, đánh dấu <b>Data Labels</b> rồi chọn kiểu hiện phần trăm để người xem biết ngay lương tài xế chiếm 41%.'
        },
        { t: 'warn', html: 'Tránh biểu đồ tròn có quá nhiều lát hoặc các lát gần bằng nhau: mắt người rất khó so sánh góc. Tránh biểu đồ 3D: nhìn đẹp nhưng làm sai lệch độ lớn. Dữ liệu theo thời gian thì đừng dùng biểu đồ tròn.' },
        { t: 'h', text: 'Chart Elements: các thành phần biểu đồ' },
        { t: 'p', html: 'Bấm vào biểu đồ sẽ thấy 3 nút nhỏ ở góc trên bên phải. Nút <b>dấu +</b> (Chart Elements) bật tắt từng thành phần. Nút <b>cây cọ</b> (Chart Styles) đổi kiểu và màu. Nút <b>phễu</b> (Chart Filters) lọc bớt dữ liệu hiển thị.' },
        {
          t: 'table',
          head: ['Thành phần', 'Nghĩa', 'Lời khuyên'],
          rows: [
            ['Chart Title', 'Tiêu đề biểu đồ', 'Viết thông điệp, ví dụ "Doanh thu Q3 tăng 15%"'],
            ['Axis Titles', 'Tên trục', 'Ghi đơn vị: triệu đồng, tấn, chuyến'],
            ['Data Labels', 'Nhãn số trên cột, lát', 'Bật khi ít cột, tắt bớt Gridlines cho gọn'],
            ['Legend', 'Chú thích màu', 'Tắt nếu chỉ có một chuỗi số liệu'],
            ['Gridlines', 'Đường lưới', 'Để mờ hoặc bỏ'],
            ['Trendline', 'Đường xu hướng', 'Dùng với Line, Scatter để thấy xu hướng tăng giảm']
          ]
        },
        {
          t: 'table',
          head: ['Lệnh trên tab Chart Design', 'Dùng để'],
          rows: [
            ['<b>Select Data</b>', 'Thêm (Add), sửa (Edit), xoá (Remove) chuỗi số liệu, sửa nhãn trục ngang'],
            ['<b>Switch Row/Column</b>', 'Đảo chiều: "mỗi nhóm cột là một tháng" thành "mỗi nhóm cột là một chi nhánh"'],
            ['<b>Change Chart Type</b>', 'Đổi loại biểu đồ mà không phải vẽ lại. Chọn <b>Combo</b> để kết hợp cột và đường, đánh dấu <b>Secondary Axis</b> cho chuỗi phần trăm'],
            ['<b>Quick Layout</b>', 'Chọn nhanh bố cục có sẵn tiêu đề, chú thích, nhãn']
          ]
        },
        { t: 'tip', html: 'Vẽ biểu đồ từ <b>Table</b> thì khi thêm tháng mới, biểu đồ tự kéo dài. Vẽ từ <b>PivotTable</b> (<b>Insert › PivotChart</b>) thì biểu đồ đổi theo khi lọc Pivot.' },
        { t: 'h', text: 'Sparklines: biểu đồ mini trong ô' },
        {
          t: 'steps',
          items: [
            'Chọn ô trống cuối mỗi dòng, ví dụ <b>N2:N10</b> (dữ liệu 12 tháng nằm ở B2:M10).',
            'Vào <b>Insert › Sparklines</b>, chọn <b>Line</b>, <b>Column</b> hoặc <b>Win/Loss</b>.',
            'Ô <b>Data Range</b> chọn <b>B2:M10</b> › <b>OK</b>. Mỗi ô hiện một biểu đồ nhỏ cho dòng đó.',
            'Tab <b>Sparkline</b>: đánh dấu <b>High Point</b>, <b>Low Point</b> để làm nổi điểm cao nhất, thấp nhất.'
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Muốn thể hiện doanh thu 12 tháng để thấy xu hướng tăng giảm. Loại nào phù hợp nhất?',
          options: ['Pie', 'Line', 'Doughnut', 'Scatter'],
          answer: 1,
          explain: 'Biểu đồ đường thể hiện xu hướng theo thời gian rõ nhất.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'Cần vẽ doanh thu (hàng tỷ đồng) và tỉ lệ đạt KPI (%) trên cùng một biểu đồ. Dùng gì?',
          options: ['Hai biểu đồ tròn', 'Combo chart: cột cho doanh thu, đường trên trục phụ cho tỉ lệ', 'Stacked Column', 'Biểu đồ cột 3D'],
          answer: 1,
          explain: 'Hai đại lượng khác đơn vị cần Combo chart với Secondary Axis. Nếu không, đường tỉ lệ sẽ nằm sát đáy.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Muốn mỗi dòng nhân viên có một biểu đồ nhỏ xíu nằm gọn trong một ô. Dùng gì?',
          options: ['Data Bars', 'Sparklines', 'PivotChart', 'Icon Sets'],
          answer: 1,
          explain: 'Sparklines là biểu đồ mini đặt trong ô, thể hiện xu hướng của cả dòng số liệu.'
        }
      ],
      exercises: []
    },

    /* ---------------- Bài 9 ---------------- */
    {
      id: 'in-an',
      title: 'Cố định dòng, in ấn và bảo vệ sheet',
      minutes: 11,
      funcs: [],
      blocks: [
        {
          t: 'scenario',
          html: '<p>Bảng lương 200 dòng: cuộn xuống dòng 50 là mất tiêu đề, không biết cột nào là lương cơ bản, cột nào là phụ cấp. In ra thì 2 cột cuối tràn sang trang riêng, từ trang 2 trở đi không có dòng tiêu đề. Gửi chi nhánh thì có người lỡ tay xoá công thức.</p><p>Bài này giải quyết cả ba chuyện: <b>Freeze Panes</b> (cố định dòng tiêu đề), <b>Page Layout</b> (thiết lập trang in) và <b>Protect Sheet</b> (khoá công thức).</p>'
        },
        { t: 'h', text: 'Freeze Panes nằm ở đâu?' },
        {
          t: 'excelui',
          tab: 'view',
          file: 'BangLuong_T6.xlsx',
          marks: [
            { id: 'tab.view', n: 1, text: 'Bấm tab <b>View</b> (Xem).' },
            { id: 'view.freeze', n: 2, text: 'Nút <b>Freeze Panes</b> (cố định vùng) trong nhóm Window. Bấm vào sẽ hiện 3 lựa chọn.' },
            { id: 'view.pagebreak', n: 3, text: '<b>Page Break Preview</b>: xem bảng được chia thành các trang in thế nào.' },
            { id: 'view.normal', n: 4, text: '<b>Normal</b>: trở về chế độ xem bình thường.' }
          ]
        },
        { t: 'h', text: 'Thực hành 1: Giữ dòng tiêu đề khi cuộn' },
        {
          t: 'sim', id: 'print1',
          task: 'Yêu cầu: cố định dòng tiêu đề để luôn nhìn thấy khi cuộn xuống.',
          file: 'BangLuong_T6.xlsx',
          tab: 'home',
          data: [
            ['Mã NV', 'Họ tên', 'Phòng', 'Lương cơ bản', 'Phụ cấp'],
            ['NV01', 'Nguyễn Văn An', 'Kế toán', 9500000, 1200000],
            ['NV02', 'Trần Thị Bình', 'Kinh doanh', 8200000, 2500000],
            ['NV03', 'Lê Hoàng Cường', 'Kho vận', 7800000, 1800000],
            ['NV04', 'Phạm Thu Dung', 'Nhân sự', 8800000, 1000000],
            ['NV05', 'Võ Minh Em', 'Kinh doanh', 8000000, 2200000],
            ['NV06', 'Đỗ Thị Hoa', 'Kho vận', 7600000, 1600000],
            ['NV07', 'Bùi Quang Huy', 'Kế toán', 9100000, 1200000]
          ],
          fmt: { D: 'int', E: 'int' },
          steps: [
            { do: 'tab', target: 'view', text: 'Bấm tab <b>View</b>.' },
            { do: 'button', target: 'view.freeze', text: 'Bấm nút <b>Freeze Panes</b>.' },
            {
              do: 'menu', at: 'view.freeze',
              items: ['Freeze Panes', 'Freeze Top Row', 'Freeze First Column'],
              answer: 'Freeze Top Row',
              text: 'Tiêu đề nằm ở dòng 1, nên chọn <b>Freeze Top Row</b> (cố định dòng trên cùng).',
              effect: { type: 'freeze' }
            }
          ],
          doneText: 'Một vạch đậm hiện dưới dòng 1. Từ giờ cuộn xuống bao xa, dòng tiêu đề vẫn đứng yên. Muốn bỏ: <b>View › Freeze Panes › Unfreeze Panes</b>.'
        },
        {
          t: 'table',
          head: ['Mục trong menu Freeze Panes', 'Tác dụng'],
          rows: [
            ['<b>Freeze Panes</b>', 'Giữ mọi dòng <b>phía trên</b> và mọi cột <b>bên trái</b> ô đang chọn'],
            ['<b>Freeze Top Row</b>', 'Giữ dòng 1 luôn hiện khi cuộn xuống'],
            ['<b>Freeze First Column</b>', 'Giữ cột A luôn hiện khi cuộn sang phải'],
            ['<b>Unfreeze Panes</b>', 'Bỏ cố định. Mục này thay chỗ cho Freeze Panes khi sheet đang được cố định']
          ]
        },
        { t: 'tip', html: 'Muốn giữ cả dòng tiêu đề (dòng 1-2) và cột Mã, Tên (cột A-B): bấm vào ô <b>C3</b> rồi chọn <b>View › Freeze Panes › Freeze Panes</b>. Quy tắc: chọn ô ngay dưới và ngay bên phải vùng muốn giữ.' },
        { t: 'h', text: 'Thiết lập trang in nằm ở đâu?' },
        {
          t: 'excelui',
          tab: 'pagelayout',
          file: 'BangLuong_T6.xlsx',
          marks: [
            { id: 'tab.pagelayout', n: 1, text: 'Bấm tab <b>Page Layout</b> (Bố cục trang).' },
            { id: 'pagelayout.margins', n: 2, text: '<b>Margins</b>: lề giấy. Chọn <b>Narrow</b> (hẹp) để có thêm chỗ.' },
            { id: 'pagelayout.orientation', n: 3, text: '<b>Orientation</b>: hướng giấy, <b>Portrait</b> (dọc) hoặc <b>Landscape</b> (ngang).' },
            { id: 'pagelayout.size', n: 4, text: '<b>Size</b>: khổ giấy. Chọn <b>A4</b> (bản Excel Mỹ mặc định là Letter).' },
            { id: 'pagelayout.printarea', n: 5, text: '<b>Print Area</b>: chỉ in vùng đã chọn.' },
            { id: 'pagelayout.printtitles', n: 6, text: '<b>Print Titles</b>: lặp dòng tiêu đề trên mọi trang in.' },
            { id: 'pagelayout.width', n: 7, text: '<b>Width</b> trong nhóm Scale to Fit: ép bảng vừa bao nhiêu trang theo chiều ngang.' }
          ]
        },
        { t: 'h', text: 'Thực hành 2: In ngang, mọi cột vừa một trang' },
        {
          t: 'sim', id: 'print2',
          task: 'Yêu cầu: đổi giấy sang khổ ngang và ép mọi cột vừa 1 trang theo chiều rộng.',
          file: 'BangLuong_T6.xlsx',
          tab: 'home',
          data: [
            ['Mã NV', 'Họ tên', 'Phòng', 'Lương cơ bản', 'Phụ cấp'],
            ['NV01', 'Nguyễn Văn An', 'Kế toán', 9500000, 1200000],
            ['NV02', 'Trần Thị Bình', 'Kinh doanh', 8200000, 2500000],
            ['NV03', 'Lê Hoàng Cường', 'Kho vận', 7800000, 1800000],
            ['NV04', 'Phạm Thu Dung', 'Nhân sự', 8800000, 1000000],
            ['NV05', 'Võ Minh Em', 'Kinh doanh', 8000000, 2200000]
          ],
          fmt: { D: 'int', E: 'int' },
          steps: [
            { do: 'tab', target: 'pagelayout', text: 'Bấm tab <b>Page Layout</b>.' },
            { do: 'button', target: 'pagelayout.orientation', text: 'Bấm nút <b>Orientation</b>.' },
            {
              do: 'menu', at: 'pagelayout.orientation',
              items: ['Portrait', 'Landscape'],
              answer: 'Landscape',
              text: 'Bảng nhiều cột nên chọn <b>Landscape</b> (ngang).'
            },
            { do: 'button', target: 'pagelayout.width', text: 'Trong nhóm Scale to Fit, bấm ô <b>Width: Automatic ▾</b>.' },
            {
              do: 'menu', at: 'pagelayout.width',
              items: ['Automatic', '1 page', '2 pages', '3 pages', '4 pages', '5 pages', '-', 'More Pages...'],
              answer: '1 page',
              text: 'Chọn <b>1 page</b>. Ô <b>Height</b> giữ nguyên <b>Automatic</b>.'
            }
          ],
          doneText: 'Mọi cột nằm gọn trên một trang ngang, số trang dọc tùy độ dài bảng. Nhấn <kbd>Ctrl</kbd> + <kbd>P</kbd> để xem trước bản in.'
        },
        { t: 'warn', html: 'Đừng chọn <b>Fit Sheet on One Page</b> với bảng dài hàng trăm dòng: Excel thu nhỏ đến mức không đọc nổi. Chỉ ép <b>1 page</b> theo chiều rộng, chiều cao để <b>Automatic</b>. Trong <b>File › Print</b>, mục này tên là <b>Fit All Columns on One Page</b>.' },
        { t: 'h', text: 'Thực hành 3: Lặp dòng tiêu đề trên mọi trang in' },
        {
          t: 'sim', id: 'print3',
          task: 'Yêu cầu: mở hộp thoại Print Titles để trang 2, 3… cũng có dòng tiêu đề.',
          file: 'BangLuong_T6.xlsx',
          tab: 'view',
          data: [
            ['Mã NV', 'Họ tên', 'Phòng', 'Lương cơ bản', 'Phụ cấp'],
            ['NV01', 'Nguyễn Văn An', 'Kế toán', 9500000, 1200000],
            ['NV02', 'Trần Thị Bình', 'Kinh doanh', 8200000, 2500000],
            ['NV03', 'Lê Hoàng Cường', 'Kho vận', 7800000, 1800000],
            ['NV04', 'Phạm Thu Dung', 'Nhân sự', 8800000, 1000000]
          ],
          fmt: { D: 'int', E: 'int' },
          steps: [
            { do: 'tab', target: 'pagelayout', text: 'Bấm tab <b>Page Layout</b>.' },
            { do: 'button', target: 'pagelayout.printtitles', text: 'Bấm nút <b>Print Titles</b>.' }
          ],
          doneText: 'Hộp thoại <b>Page Setup</b> mở sẵn ở tab <b>Sheet</b>. Điền tiếp theo các bước bên dưới.'
        },
        {
          t: 'steps',
          title: 'Trong hộp thoại Page Setup, tab Sheet',
          items: [
            'Bấm vào ô <b>Rows to repeat at top</b> (dòng lặp lại ở đầu trang), rồi bấm vào số dòng 1 trên sheet. Ô sẽ hiện <code>$1:$1</code>. Tiêu đề 2 dòng thì quét dòng 1-2 thành <code>$1:$2</code>.',
            'Bảng rộng in nhiều trang ngang: ô <b>Columns to repeat at left</b> chọn <code>$A:$B</code> để trang nào cũng có Mã NV, Họ tên.',
            'Bấm <b>Print Preview</b> để kiểm tra trang 2, 3 đã có tiêu đề, rồi bấm <b>OK</b>.'
          ]
        },
        {
          t: 'table',
          head: ['Lệnh', 'Dùng khi'],
          rows: [
            ['<b>Page Layout › Print Area › Set Print Area</b>', 'Chỉ in vùng đã chọn, bỏ qua bảng nháp, ghi chú. Bỏ: <b>Clear Print Area</b>.'],
            ['<b>View › Page Break Preview</b>', 'Xem ngắt trang. Đường xanh liền là mép vùng in, đường xanh đứt là chỗ ngắt trang. Kéo các đường này để chỉnh.'],
            ['<b>Page Layout › Breaks › Insert Page Break</b>', 'Chèn ngắt trang thủ công tại dòng đang chọn.'],
            ['<b>Insert › Header &amp; Footer</b>', 'Thêm số trang "Page 1 of ?" để người nhận biết có đủ trang.']
          ]
        },
        { t: 'h', text: 'Protect Sheet: khoá công thức, chỉ cho nhập số liệu' },
        { t: 'p', html: 'Mặc định mọi ô đều ở trạng thái <b>Locked</b> (khoá), nhưng khoá chỉ có tác dụng khi bật Protect Sheet. Vì vậy phải <b>mở khoá các ô cho phép nhập trước</b>, rồi mới bảo vệ sheet.' },
        {
          t: 'steps',
          title: 'Cho nhập số liệu, khoá công thức',
          items: [
            'Chọn các ô được phép nhập (ví dụ cột Số lượng, Ngày công).',
            'Nhấn <kbd>Ctrl</kbd> + <kbd>1</kbd> › tab <b>Protection</b> › bỏ dấu <b>Locked</b> › <b>OK</b>.',
            'Vào <b>Review › Protect Sheet</b>.',
            'Đặt mật khẩu (tùy chọn), giữ đánh dấu <b>Select unlocked cells</b>. Có thể thêm <b>Use AutoFilter</b>, <b>Format columns</b> nếu muốn cho phép lọc, chỉnh độ rộng cột.',
            'Bấm <b>OK</b>, nhập lại mật khẩu. Bỏ bảo vệ: <b>Review › Unprotect Sheet</b>.'
          ]
        },
        { t: 'warn', html: 'Mật khẩu Protect Sheet chỉ để chống sửa nhầm, <b>không phải bảo mật</b> thật. Quên mật khẩu thì rất phiền, hãy ghi lại cẩn thận. Muốn chặn người khác mở file, dùng <b>File › Info › Protect Workbook › Encrypt with Password</b>.' },
        {
          t: 'keys',
          items: [
            ['Ctrl + P', 'Mở màn hình in (Print Preview)'],
            ['Alt + W, F, F', 'Freeze Panes'],
            ['Alt + P, S, P', 'Mở Page Setup'],
            ['Alt + R, P, S', 'Protect Sheet']
          ]
        },
        {
          t: 'quiz', id: 'q1',
          q: 'Muốn khi cuộn xuống vẫn thấy dòng tiêu đề 1-3 và cột A. Bấm vào ô nào rồi chọn Freeze Panes?',
          options: ['A3', 'B4', 'A4', 'B3'],
          answer: 1,
          explain: 'Freeze Panes giữ các dòng phía trên và các cột bên trái ô đang chọn. Ô B4 nằm dưới dòng 3 và bên phải cột A.'
        },
        {
          t: 'quiz', id: 'q2',
          q: 'In bảng lương 200 dòng, trang 2 trở đi không có dòng tiêu đề. Cần thiết lập gì?',
          options: ['Freeze Top Row', 'Page Layout › Print Titles › Rows to repeat at top', 'Set Print Area', 'Fit Sheet on One Page'],
          answer: 1,
          explain: 'Freeze Panes chỉ có tác dụng trên màn hình. Muốn tiêu đề lặp lại khi in phải dùng Print Titles.'
        },
        {
          t: 'quiz', id: 'q3',
          q: 'Bật Protect Sheet xong thì cả cột nhập số liệu cũng bị khoá, không gõ được. Nguyên nhân?',
          options: ['Máy tính bị lỗi', 'Chưa bỏ dấu Locked cho các ô nhập liệu trước khi Protect Sheet', 'Chưa lưu file', 'Thiếu Print Area'],
          answer: 1,
          explain: 'Mọi ô mặc định Locked. Phải mở khoá các ô cho phép nhập (Format Cells › Protection) trước khi bảo vệ sheet.'
        }
      ],
      exercises: []
    }
  ],

  /* ---------------- Bài kiểm tra Phần 8 ---------------- */
  test: {
    mcq: [
      { q: 'Kế toán muốn cột số tiền hiện "15,000,000 đ" mà vẫn cộng được. Dùng công cụ nào?', options: ['Gõ thêm " đ" vào từng ô', 'Format Cells › Custom: #,##0 "đ"', 'Wrap Text', 'Find &amp; Replace'], answer: 1, explain: 'Định dạng Custom chỉ đổi cách hiển thị, giá trị vẫn là số.' },
      { q: 'Muốn danh sách đơn hàng sắp theo Khách hàng A-Z, cùng khách thì Ngày giao mới nhất lên trên. Vào đâu?', options: ['Data › Filter', 'Data › Sort, dùng Add Level', 'Home › Format Painter', 'Insert › PivotTable'], answer: 1, explain: 'Sort nhiều cấp: cấp 1 Khách hàng (A to Z), cấp 2 Ngày giao (Newest to Oldest).' },
      { q: 'Hằng ngày thêm đơn mới vào cuối bảng, muốn Pivot và công thức tổng tự nhận dòng mới. Nên làm gì với dữ liệu gốc?', options: ['Merge &amp; Center tiêu đề', 'Biến thành Table bằng Ctrl + T', 'Freeze Top Row', 'Set Print Area'], answer: 1, explain: 'Table tự mở rộng khi thêm dòng, các công cụ tham chiếu tới Table cũng tự cập nhật.' },
      { q: 'Muốn cả dòng đơn hàng tự tô đỏ khi cột G (Trạng thái) là "Trễ hạn". Dùng gì?', options: ['Highlight Cells Rules › Text that Contains', 'Conditional Formatting › New Rule › Use a formula: =$G2="Trễ hạn"', 'Data Bars', 'Data Validation'], answer: 1, explain: 'Tô cả dòng cần quy tắc dạng công thức, khoá cột G bằng $G2.' },
      { q: 'Muốn nhân viên chỉ được chọn tên kho "Kho Bình Dương", "Kho Long An", "Kho Bắc Ninh", không gõ tự do. Dùng gì?', options: ['Data › Data Validation › Allow: List', 'Data › Filter', 'Conditional Formatting', 'Slicer'], answer: 0, explain: 'Data Validation kiểu List tạo danh sách thả xuống.' },
      { q: 'File xuất từ phần mềm có cột "Họ tên - Phòng ban" dính chung. Muốn tách ra hai cột, nhanh nhất là?', options: ['Remove Duplicates', 'Data › Text to Columns, ký tự ngăn cách -', 'Go To Special', 'Sort'], answer: 1, explain: 'Text to Columns tách theo ký tự ngăn cách. Flash Fill (Ctrl + E) cũng là lựa chọn tốt.' },
      { q: 'Danh sách khách hàng có nhiều dòng trùng mã, cần xoá dòng trùng chỉ giữ một. Dùng gì?', options: ['Data › Remove Duplicates', 'Conditional Formatting › Duplicate Values', 'Data › Filter', 'Find &amp; Replace'], answer: 0, explain: 'Remove Duplicates xoá các dòng trùng. Duplicate Values chỉ tô màu để xem chứ không xoá.' },
      { q: 'Sếp cần báo cáo tổng doanh thu theo Nhân viên (hàng) và Quý (cột) từ 10.000 dòng dữ liệu. Công cụ nhanh nhất?', options: ['Viết SUM từng ô', 'Insert › PivotTable', 'Data › Sort', 'Insert › Sparklines'], answer: 1, explain: 'PivotTable: kéo Nhân viên vào Rows, Ngày (Group theo Quarters) vào Columns, Doanh thu vào Values.' },
      { q: 'Đã sửa dữ liệu gốc nhưng Pivot vẫn hiện số cũ. Làm gì?', options: ['Tạo pivot mới', 'Chuột phải vào pivot › Refresh', 'Nhấn F9', 'Đóng mở lại Excel'], answer: 1, explain: 'Pivot cần Refresh (hoặc Refresh All) để lấy dữ liệu mới.' },
      { q: 'Muốn vẽ cơ cấu chi phí vận hành gồm 4 khoản (lương, thuê kho, nhiên liệu, khác) trên tổng chi phí. Loại biểu đồ hợp lý?', options: ['Line', 'Pie', 'Scatter', 'Sparklines Win/Loss'], answer: 1, explain: 'Biểu đồ tròn phù hợp thể hiện tỉ trọng các phần của một tổng khi số phần ít.' },
      { q: 'In bảng chấm công dài 5 trang, muốn trang nào cũng có dòng tiêu đề. Vào đâu?', options: ['View › Freeze Panes', 'Page Layout › Print Titles', 'Page Layout › Print Area', 'View › Page Break Preview'], answer: 1, explain: 'Print Titles › Rows to repeat at top lặp dòng tiêu đề trên mỗi trang in.' },
      { q: 'Gửi file đơn giá cho chi nhánh, muốn họ chỉ nhập cột Số lượng, không sửa được công thức. Làm thế nào?', options: ['Ẩn cột công thức', 'Bỏ Locked ở cột Số lượng (Ctrl + 1 › Protection), rồi Review › Protect Sheet', 'Data Validation cho cột công thức', 'Đổi công thức thành giá trị'], answer: 1, explain: 'Mở khoá ô cho phép nhập, rồi bật Protect Sheet để khoá phần còn lại.' }
    ],
    practice: [
      {
        id: 't1',
        task: 'Tổng hợp như PivotTable bằng công thức: tính <b>tổng số tấn hàng</b> theo <b>tuyến</b> (F2:F3) và <b>loại xe</b> (G1:H1). Viết một công thức ở <code>G2</code> rồi sao chép cho cả vùng G2:H3.',
        data: [
          ['Ngày', 'Tuyến', 'Loại xe', 'Số tấn', '', 'Tuyến / Loại xe', '5 tấn', '10 tấn'],
          ['02/04/2024', 'HCM-Cần Thơ', '5 tấn', 4.5, '', 'HCM-Cần Thơ'],
          ['02/04/2024', 'HCM-Đà Nẵng', '10 tấn', 9.2, '', 'HCM-Đà Nẵng'],
          ['03/04/2024', 'HCM-Cần Thơ', '10 tấn', 8.8],
          ['04/04/2024', 'HCM-Cần Thơ', '5 tấn', 3.9],
          ['05/04/2024', 'HCM-Đà Nẵng', '5 tấn', 4.8],
          ['05/04/2024', 'HCM-Đà Nẵng', '10 tấn', 9.6],
          ['06/04/2024', 'HCM-Cần Thơ', '10 tấn', 7.5]
        ],
        fill: { range: 'G2:H3', solution: '=SUMIFS($D$2:$D$8,$B$2:$B$8,$F2,$C$2:$C$8,G$1)' },
        fmt: { D: 'dec1', G: 'dec1', H: 'dec1' }
      },
      {
        id: 't2',
        task: 'Kiểm tra trùng trước khi làm sạch: ở <code>C2</code> ghi <b>"Trùng"</b> nếu số điện thoại ở B2 xuất hiện nhiều hơn 1 lần trong B2:B8, ngược lại ghi <b>"OK"</b>. Sao chép xuống C3:C8.',
        data: [
          ['Khách hàng', 'Số điện thoại', 'Kiểm tra'],
          ['Nguyễn Văn An', '0901234567'],
          ['Trần Thị Bình', '0912345678'],
          ['Lê Hoàng Cường', '0987654321'],
          ['Nguyễn V. An', '0901234567'],
          ['Phạm Thu Dung', '0934567890'],
          ['Trần T. Bình', '0912345678'],
          ['Võ Minh Em', '0978123456']
        ],
        fill: { range: 'C2:C8', solution: '=IF(COUNTIF($B$2:$B$8,B2)>1,"Trùng","OK")' },
        strict: false
      }
    ]
  }
});
