/* Trang Tra cứu hàm. Mỗi phần tử là một hàm, nhóm theo group. */
ECC.addFuncs([
  /* ================= TÍNH TOÁN ================= */
  {
    name: 'SUM',
    group: 'Tính toán',
    short: 'Cộng tổng các số trong một hoặc nhiều vùng',
    syntax: 'SUM(number1, [number2], ...)',
    args: [
      ['number1', 'Bắt buộc. Số, ô hoặc vùng cần cộng, ví dụ <code>B2:B10</code>.', 'Số/vùng thứ nhất'],
      ['number2, ...', 'Tuỳ chọn. Thêm số, ô hoặc vùng khác, tối đa 255 đối số.', 'Các số/vùng khác']
    ],
    desc: 'Hàm <b>SUM</b> cộng tất cả các số trong vùng chọn. Đây là hàm dùng nhiều nhất ở văn phòng: tổng lương, tổng doanh thu, tổng chi phí. Ô chứa chữ hoặc ô trống được bỏ qua.',
    example: {
      data: [['Khoản chi', 'Số tiền'], ['Văn phòng phẩm', 1250000], ['Điện nước', 3400000], ['Tiếp khách', 2100000], ['Xăng xe', 1800000], ['Tổng']],
      cell: 'B6',
      formula: '=SUM(B2:B5)',
      note: 'Cộng 4 khoản chi từ B2 đến B5, ra 8.550.000 đ.'
    },
    tips: [
      'Chọn ô ngay dưới cột số rồi bấm <kbd>Alt</kbd> + <kbd>=</kbd>, Excel tự viết <code>=SUM(...)</code> cho bạn.',
      'Cộng nhiều vùng rời nhau: <code>=SUM(B2:B5,D2:D5)</code>.'
    ],
    errors: [['Kết quả bằng 0 hoặc thiếu', 'Số bị lưu dạng chữ (căn trái, có tam giác xanh). Chuyển về số bằng <b>Data › Text to Columns</b> hoặc hàm VALUE.']],
    lesson: 'p2/sum'
  },
  {
    name: 'ROUND',
    group: 'Tính toán',
    short: 'Làm tròn số đến số chữ số chỉ định',
    syntax: 'ROUND(number, num_digits)',
    args: [
      ['number', 'Bắt buộc. Số cần làm tròn.', 'Số cần làm tròn'],
      ['num_digits', 'Bắt buộc. Số chữ số thập phân giữ lại. Số âm để làm tròn sang trái dấu phẩy: -3 là tròn nghìn.', 'Giữ mấy chữ số']
    ],
    desc: 'Hàm <b>ROUND</b> làm tròn theo quy tắc thông thường (từ 5 trở lên thì tròn lên). Dùng khi tính lương, thuế, đơn giá để số tiền chẵn và tổng không bị lệch vài đồng.',
    example: {
      data: [['Nhân viên', 'Lương tính ra', 'Lương làm tròn nghìn'], ['Nguyễn Văn An', 8456789]],
      cell: 'C2',
      formula: '=ROUND(B2,-3)',
      note: 'num_digits = -3 làm tròn đến hàng nghìn: 8.456.789 thành 8.457.000.'
    },
    tips: ['Định dạng ô (Format Cells) chỉ làm số <i>trông</i> tròn, giá trị thật vẫn lẻ. Muốn tổng khớp từng đồng, hãy dùng ROUND.'],
    errors: [],
    lesson: 'p2/lam-tron'
  },
  {
    name: 'ROUNDUP',
    group: 'Tính toán',
    short: 'Luôn làm tròn lên (xa số 0)',
    syntax: 'ROUNDUP(number, num_digits)',
    args: [
      ['number', 'Bắt buộc. Số cần làm tròn.', 'Số cần làm tròn'],
      ['num_digits', 'Bắt buộc. Số chữ số giữ lại. 0 là tròn thành số nguyên.', 'Giữ mấy chữ số']
    ],
    desc: 'Hàm <b>ROUNDUP</b> luôn làm tròn lên, dù phần lẻ nhỏ đến đâu. Hay dùng để tính số thùng, số xe, số chuyến cần thiết: thiếu một chút cũng phải thêm một đơn vị.',
    example: {
      data: [['Đơn hàng', 'Số hộp', 'Hộp/thùng', 'Số thùng cần'], ['DH001', 130, 24]],
      cell: 'D2',
      formula: '=ROUNDUP(B2/C2,0)',
      note: '130 / 24 = 5,4 thùng. Phải chuẩn bị đủ 6 thùng nên dùng ROUNDUP.'
    },
    tips: ['Ngược lại với ROUNDUP là ROUNDDOWN (luôn bỏ phần lẻ).'],
    errors: [],
    lesson: 'p2/lam-tron'
  },
  {
    name: 'ROUNDDOWN',
    group: 'Tính toán',
    short: 'Luôn làm tròn xuống (về phía số 0)',
    syntax: 'ROUNDDOWN(number, num_digits)',
    args: [
      ['number', 'Bắt buộc. Số cần làm tròn.', 'Số cần làm tròn'],
      ['num_digits', 'Bắt buộc. Số chữ số giữ lại.', 'Giữ mấy chữ số']
    ],
    desc: 'Hàm <b>ROUNDDOWN</b> cắt bỏ phần lẻ, không bao giờ tròn lên. Dùng khi tính số bộ hàng đóng được đủ, số ngày phép được hưởng, hoặc khi quy định chỉ tính phần chẵn.',
    example: {
      data: [['Sản phẩm', 'Tồn kho (cái)', 'Cái/bộ', 'Số bộ đủ'], ['Cốc sứ', 125, 6]],
      cell: 'D2',
      formula: '=ROUNDDOWN(B2/C2,0)',
      note: '125 / 6 = 20,8. Chỉ đóng được 20 bộ đủ 6 cái.'
    },
    tips: ['Với số dương, <code>ROUNDDOWN(x,0)</code> cho kết quả giống <code>INT(x)</code>.'],
    errors: [],
    lesson: 'p2/lam-tron'
  },
  {
    name: 'INT',
    group: 'Tính toán',
    short: 'Lấy phần nguyên của số',
    syntax: 'INT(number)',
    args: [['number', 'Bắt buộc. Số cần lấy phần nguyên.', 'Số cần lấy phần nguyên']],
    desc: 'Hàm <b>INT</b> bỏ phần lẻ, chỉ giữ phần nguyên (làm tròn xuống). Hay dùng để đổi số ngày ra số tuần chẵn, số phút ra số giờ chẵn, hoặc bỏ phần giờ chỉ giữ lại ngày.',
    example: {
      data: [['Dự án', 'Số ngày', 'Số tuần chẵn'], ['Kiểm kê kho', 38]],
      cell: 'C2',
      formula: '=INT(B2/7)',
      note: '38 ngày chia 7 được 5,4. INT lấy phần nguyên là 5 tuần.'
    },
    tips: ['Với số âm, INT làm tròn xuống: <code>INT(-2.3)</code> ra -3, không phải -2.'],
    errors: [],
    lesson: 'p2/lam-tron'
  },
  {
    name: 'MOD',
    group: 'Tính toán',
    short: 'Lấy số dư của phép chia',
    syntax: 'MOD(number, divisor)',
    args: [
      ['number', 'Bắt buộc. Số bị chia.', 'Số bị chia'],
      ['divisor', 'Bắt buộc. Số chia, khác 0.', 'Chia cho mấy']
    ],
    desc: 'Hàm <b>MOD</b> trả về phần dư sau khi chia. Kết hợp với INT để tách "bao nhiêu thùng, còn lẻ bao nhiêu cái", hoặc kiểm tra số chẵn lẻ.',
    example: {
      data: [['Mặt hàng', 'Số chai', 'Chai/thùng', 'Thùng chẵn', 'Chai lẻ'], ['Nước suối', 100, 24, '=INT(B2/C2)']],
      cell: 'E2',
      formula: '=MOD(B2,C2)',
      note: '100 chai đóng được 4 thùng 24 chai, còn lẻ 4 chai.'
    },
    tips: ['<code>=MOD(A2,2)=0</code> trả về TRUE nếu A2 là số chẵn.'],
    errors: [['#DIV/0!', 'Số chia bằng 0 hoặc ô số chia đang trống.']],
    lesson: 'p2/lam-tron'
  },
  {
    name: 'ABS',
    group: 'Tính toán',
    short: 'Lấy giá trị tuyệt đối (bỏ dấu âm)',
    syntax: 'ABS(number)',
    args: [['number', 'Bắt buộc. Số cần lấy giá trị tuyệt đối.', 'Số cần bỏ dấu âm']],
    desc: 'Hàm <b>ABS</b> biến số âm thành số dương, số dương giữ nguyên. Dùng khi đối chiếu kho, đối chiếu công nợ: chỉ quan tâm lệch bao nhiêu, không quan tâm thừa hay thiếu.',
    example: {
      data: [['Mã hàng', 'Sổ sách', 'Thực tế', 'Chênh lệch', 'Mức lệch'], ['SP01', 500, 488, '=C2-B2']],
      cell: 'E2',
      formula: '=ABS(D2)',
      note: 'Chênh lệch là -12 (thiếu 12). ABS cho mức lệch là 12.'
    },
    tips: [],
    errors: [],
    lesson: 'p2/toan-khac'
  },
  {
    name: 'PRODUCT',
    group: 'Tính toán',
    short: 'Nhân tất cả các số với nhau',
    syntax: 'PRODUCT(number1, [number2], ...)',
    args: [
      ['number1', 'Bắt buộc. Số, ô hoặc vùng cần nhân.', 'Số/vùng thứ nhất'],
      ['number2, ...', 'Tuỳ chọn. Các số hoặc vùng khác.', 'Các số/vùng khác']
    ],
    desc: 'Hàm <b>PRODUCT</b> nhân các số trong danh sách. Tiện khi phải nhân nhiều số cùng lúc, như số lượng × đơn giá × tỉ lệ chiết khấu. Ô trống được bỏ qua, không bị tính là 0.',
    example: {
      data: [['Mặt hàng', 'Số lượng', 'Đơn giá', 'Hệ số giá', 'Thành tiền'], ['Giấy A4', 20, 68000, 0.95]],
      cell: 'E2',
      formula: '=PRODUCT(B2:D2)',
      note: 'Nhân 20 × 68.000 × 0,95 ra thành tiền sau chiết khấu 5%.'
    },
    tips: ['Chỉ nhân 2 số thì viết <code>=B2*C2</code> cho nhanh và dễ đọc hơn.'],
    errors: [],
    lesson: 'p2/toan-khac'
  },
  {
    name: 'POWER',
    group: 'Tính toán',
    short: 'Tính luỹ thừa của một số',
    syntax: 'POWER(number, power)',
    args: [
      ['number', 'Bắt buộc. Cơ số.', 'Số gốc (cơ số)'],
      ['power', 'Bắt buộc. Số mũ.', 'Mũ mấy']
    ],
    desc: 'Hàm <b>POWER</b> tính luỹ thừa (số mũ), giống dấu <code>^</code>. Ở văn phòng hay gặp khi tính lãi kép, tăng trưởng doanh thu qua nhiều năm.',
    example: {
      data: [['Khoản gửi', 'Lãi suất/năm', 'Số năm', 'Số tiền cuối kỳ'], [100000000, 0.06, 3]],
      cell: 'D2',
      formula: '=A2*POWER(1+B2,C2)',
      note: 'Gửi 100 triệu, lãi kép 6%/năm trong 3 năm.'
    },
    tips: ['<code>=POWER(2,3)</code> giống <code>=2^3</code>, đều ra 8.'],
    errors: [],
    lesson: 'p2/toan-khac'
  },
  {
    name: 'SQRT',
    group: 'Tính toán',
    short: 'Tính căn bậc hai',
    syntax: 'SQRT(number)',
    args: [['number', 'Bắt buộc. Số không âm cần lấy căn.', 'Số cần lấy căn']],
    desc: 'Hàm <b>SQRT</b> tính căn bậc hai. Ít gặp ở văn phòng, chủ yếu dùng khi tính cạnh hình vuông từ diện tích hoặc trong vài công thức thống kê.',
    example: {
      data: [['Kho', 'Diện tích (m²)', 'Cạnh nếu vuông (m)'], ['Kho Bình Dương', 400]],
      cell: 'C2',
      formula: '=SQRT(B2)',
      note: 'Kho vuông 400 m² có cạnh 20 m.'
    },
    tips: [],
    errors: [['#NUM!', 'Số đưa vào là số âm. Dùng <code>SQRT(ABS(x))</code> nếu cần.']],
    lesson: 'p2/toan-khac'
  },
  {
    name: 'SUMPRODUCT',
    group: 'Tính toán',
    short: 'Nhân từng cặp giá trị rồi cộng tổng',
    syntax: 'SUMPRODUCT(array1, [array2], ...)',
    args: [
      ['array1', 'Bắt buộc. Vùng thứ nhất.', 'Vùng thứ nhất'],
      ['array2, ...', 'Tuỳ chọn. Các vùng cùng kích thước để nhân tương ứng.', 'Các vùng nhân cùng']
    ],
    desc: 'Hàm <b>SUMPRODUCT</b> nhân các cột với nhau theo từng dòng rồi cộng hết lại. Ví dụ tính tổng tiền hoá đơn (số lượng × đơn giá) chỉ bằng một công thức, không cần thêm cột Thành tiền.',
    example: {
      data: [['Mặt hàng', 'Số lượng', 'Đơn giá'], ['Bút bi', 50, 5000], ['Giấy A4', 10, 68000], ['Bìa hồ sơ', 30, 12000], ['Tổng tiền']],
      cell: 'B5',
      formula: '=SUMPRODUCT(B2:B4,C2:C4)',
      note: 'Tính 50×5.000 + 10×68.000 + 30×12.000 trong một lần.'
    },
    tips: ['Các vùng phải dài bằng nhau (cùng số dòng, số cột), nếu không sẽ báo lỗi <code>#VALUE!</code>.'],
    errors: [['#VALUE!', 'Các vùng không cùng kích thước.']],
    lesson: 'p2/toan-khac'
  },

  /* ================= THỐNG KÊ ================= */
  {
    name: 'AVERAGE',
    group: 'Thống kê',
    short: 'Tính trung bình cộng',
    syntax: 'AVERAGE(number1, [number2], ...)',
    args: [
      ['number1', 'Bắt buộc. Số, ô hoặc vùng cần tính trung bình.', 'Số/vùng thứ nhất'],
      ['number2, ...', 'Tuỳ chọn. Các vùng khác.', 'Các số/vùng khác']
    ],
    desc: 'Hàm <b>AVERAGE</b> cộng các số rồi chia cho số lượng số. Dùng tính doanh số bình quân, điểm đánh giá trung bình, chi phí trung bình mỗi tháng. Ô trống không được tính vào mẫu số.',
    example: {
      data: [['Nhân viên', 'Doanh số'], ['Trần Thị Bình', 45000000], ['Lê Văn Cường', 38000000], ['Phạm Thu Dung', 52000000], ['Trung bình']],
      cell: 'B5',
      formula: '=AVERAGE(B2:B4)',
      note: 'Doanh số trung bình của 3 nhân viên là 45.000.000 đ.'
    },
    tips: ['Ô có số 0 vẫn được tính vào trung bình, còn ô trống thì không. Hãy để trống nếu chưa có số liệu.'],
    errors: [['#DIV/0!', 'Vùng không có số nào.']],
    lesson: 'p2/trung-binh'
  },
  {
    name: 'MIN',
    group: 'Thống kê',
    short: 'Tìm giá trị nhỏ nhất',
    syntax: 'MIN(number1, [number2], ...)',
    args: [
      ['number1', 'Bắt buộc. Vùng cần tìm.', 'Vùng cần tìm'],
      ['number2, ...', 'Tuỳ chọn. Các vùng khác.', 'Các vùng khác']
    ],
    desc: 'Hàm <b>MIN</b> trả về số nhỏ nhất trong vùng. Dùng tìm giá chào thấp nhất, ngày giao sớm nhất, tồn kho thấp nhất.',
    example: {
      data: [['Nhà cung cấp', 'Giá chào (đ/thùng)'], ['Công ty Hoà Phát', 245000], ['Công ty Minh Long', 238000], ['Công ty Đại Việt', 251000], ['Giá thấp nhất']],
      cell: 'B5',
      formula: '=MIN(B2:B4)',
      note: 'Giá chào thấp nhất là 238.000 đ của Minh Long.'
    },
    tips: ['Muốn tìm nhỏ nhất kèm điều kiện, dùng MINIFS.'],
    errors: [],
    lesson: 'p2/trung-binh'
  },
  {
    name: 'MAX',
    group: 'Thống kê',
    short: 'Tìm giá trị lớn nhất',
    syntax: 'MAX(number1, [number2], ...)',
    args: [
      ['number1', 'Bắt buộc. Vùng cần tìm.', 'Vùng cần tìm'],
      ['number2, ...', 'Tuỳ chọn. Các vùng khác.', 'Các vùng khác']
    ],
    desc: 'Hàm <b>MAX</b> trả về số lớn nhất. Dùng tìm doanh số cao nhất, đơn hàng lớn nhất, hoặc ngày gần nhất trong danh sách.',
    example: {
      data: [['Tháng', 'Doanh thu'], ['Tháng 1', 320000000], ['Tháng 2', 285000000], ['Tháng 3', 410000000], ['Cao nhất']],
      cell: 'B5',
      formula: '=MAX(B2:B4)',
      note: 'Tháng 3 có doanh thu cao nhất: 410.000.000 đ.'
    },
    tips: ['<code>=MAX(0,B2-C2)</code> là mẹo để không bao giờ ra số âm (ví dụ tiền thưởng vượt chỉ tiêu).'],
    errors: [],
    lesson: 'p2/trung-binh'
  },
  {
    name: 'COUNT',
    group: 'Thống kê',
    short: 'Đếm số ô chứa số',
    syntax: 'COUNT(value1, [value2], ...)',
    args: [
      ['value1', 'Bắt buộc. Vùng cần đếm.', 'Vùng cần đếm'],
      ['value2, ...', 'Tuỳ chọn. Các vùng khác.', 'Các vùng khác']
    ],
    desc: 'Hàm <b>COUNT</b> chỉ đếm các ô chứa <b>số</b> (kể cả ngày). Ô chữ, ô trống bị bỏ qua. Dùng đếm số đơn đã có số tiền, số nhân viên đã nhập điểm.',
    example: {
      data: [['Đơn hàng', 'Số tiền'], ['DH01', 1500000], ['DH02', 'Chưa báo giá'], ['DH03', 2300000], ['DH04'], ['Số đơn có tiền']],
      cell: 'B6',
      formula: '=COUNT(B2:B5)',
      note: 'Chỉ 2 ô chứa số. Ô chữ "Chưa báo giá" và ô trống không được đếm.'
    },
    tips: ['Muốn đếm mọi ô có dữ liệu (cả chữ), dùng COUNTA.'],
    errors: [],
    lesson: 'p2/dem'
  },
  {
    name: 'COUNTA',
    group: 'Thống kê',
    short: 'Đếm số ô không trống',
    syntax: 'COUNTA(value1, [value2], ...)',
    args: [
      ['value1', 'Bắt buộc. Vùng cần đếm.', 'Vùng cần đếm'],
      ['value2, ...', 'Tuỳ chọn. Các vùng khác.', 'Các vùng khác']
    ],
    desc: 'Hàm <b>COUNTA</b> đếm mọi ô có dữ liệu: số, chữ, ngày. Dùng đếm số nhân viên trong danh sách, số dòng đơn hàng đã nhập.',
    example: {
      data: [['STT', 'Họ tên'], [1, 'Nguyễn Văn An'], [2, 'Trần Thị Bình'], [3, 'Lê Văn Cường'], [4], ['Số người']],
      cell: 'B6',
      formula: '=COUNTA(B2:B5)',
      note: 'Có 3 ô có tên, ô B5 còn trống nên không được đếm.'
    },
    tips: ['Ô chỉ có dấu cách trông như trống nhưng vẫn được COUNTA đếm. Dùng TRIM để dọn dữ liệu.'],
    errors: [],
    lesson: 'p2/dem'
  },
  {
    name: 'COUNTBLANK',
    group: 'Thống kê',
    short: 'Đếm số ô trống',
    syntax: 'COUNTBLANK(range)',
    args: [['range', 'Bắt buộc. Vùng cần đếm ô trống.', 'Vùng cần đếm']],
    desc: 'Hàm <b>COUNTBLANK</b> đếm số ô trống trong vùng. Hữu ích để kiểm tra còn bao nhiêu ô chưa nhập: chưa chấm công, chưa có ngày giao, chưa ký nhận.',
    example: {
      data: [['Nhân viên', 'Ngày nộp báo cáo'], ['Nguyễn Văn An', '02/10/2024'], ['Trần Thị Bình'], ['Lê Văn Cường', '03/10/2024'], ['Phạm Thu Dung'], ['Chưa nộp']],
      cell: 'B6',
      formula: '=COUNTBLANK(B2:B5)',
      note: 'Có 2 người chưa nộp báo cáo (ô B3 và B5 trống).'
    },
    tips: [],
    errors: [],
    lesson: 'p2/dem'
  },
  {
    name: 'LARGE',
    group: 'Thống kê',
    short: 'Lấy giá trị lớn thứ k',
    syntax: 'LARGE(array, k)',
    args: [
      ['array', 'Bắt buộc. Vùng số.', 'Vùng chứa số'],
      ['k', 'Bắt buộc. Thứ hạng cần lấy: 1 là lớn nhất, 2 là lớn nhì…', 'Lớn thứ mấy']
    ],
    desc: 'Hàm <b>LARGE</b> trả về số lớn thứ k. Dùng lập bảng top 3 doanh số, top 5 khách hàng mua nhiều nhất.',
    example: {
      data: [['Nhân viên', 'Doanh số', '', 'Hạng', 'Doanh số'], ['An', 45000000, '', 2], ['Bình', 62000000], ['Cường', 38000000], ['Dung', 51000000]],
      cell: 'E2',
      formula: '=LARGE($B$2:$B$5,D2)',
      note: 'Doanh số cao thứ 2 là 51.000.000 đ.'
    },
    tips: ['<code>LARGE(vùng,1)</code> giống MAX.'],
    errors: [['#NUM!', 'k lớn hơn số lượng số trong vùng hoặc k ≤ 0.']],
    lesson: 'p2/xep-hang'
  },
  {
    name: 'SMALL',
    group: 'Thống kê',
    short: 'Lấy giá trị nhỏ thứ k',
    syntax: 'SMALL(array, k)',
    args: [
      ['array', 'Bắt buộc. Vùng số.', 'Vùng chứa số'],
      ['k', 'Bắt buộc. Thứ hạng: 1 là nhỏ nhất, 2 là nhỏ nhì…', 'Nhỏ thứ mấy']
    ],
    desc: 'Hàm <b>SMALL</b> trả về số nhỏ thứ k. Dùng tìm 3 mức giá chào thấp nhất, 3 tuyến vận chuyển có thời gian ngắn nhất.',
    example: {
      data: [['Tuyến', 'Thời gian (giờ)'], ['HCM - Cần Thơ', 4], ['HCM - Đà Lạt', 7], ['HCM - Vũng Tàu', 2.5], ['HCM - Nha Trang', 9], ['Ngắn thứ 2']],
      cell: 'B6',
      formula: '=SMALL(B2:B5,2)',
      note: 'Thời gian ngắn thứ 2 là 4 giờ (tuyến Cần Thơ).'
    },
    tips: ['<code>SMALL(vùng,1)</code> giống MIN.'],
    errors: [['#NUM!', 'k vượt quá số lượng số trong vùng.']],
    lesson: 'p2/xep-hang'
  },
  {
    name: 'RANK',
    group: 'Thống kê',
    short: 'Xếp hạng một số trong danh sách',
    syntax: 'RANK(number, ref, [order])',
    args: [
      ['number', 'Bắt buộc. Số cần xếp hạng.', 'Số cần xếp hạng'],
      ['ref', 'Bắt buộc. Vùng chứa cả danh sách, nên khoá bằng $.', 'Cả danh sách'],
      ['order', 'Tuỳ chọn. 0 hoặc bỏ trống: lớn nhất hạng 1. 1: nhỏ nhất hạng 1.', 'Lớn hay nhỏ đứng đầu']
    ],
    desc: 'Hàm <b>RANK</b> cho biết một số đứng thứ mấy trong danh sách. Dùng xếp hạng doanh số nhân viên, xếp hạng chi nhánh. Các số bằng nhau được cùng hạng.',
    example: {
      data: [['Nhân viên', 'Doanh số', 'Hạng'], ['An', 45000000], ['Bình', 62000000], ['Cường', 38000000], ['Dung', 51000000]],
      cell: 'C2',
      formula: '=RANK(B2,$B$2:$B$5)',
      note: 'An đứng hạng 3. Kéo công thức xuống để xếp hạng cả nhóm.'
    },
    tips: ['Excel mới có thêm <code>RANK.EQ</code>, cách dùng giống hệt RANK.', 'Nhớ khoá vùng bằng dấu $ (bấm <kbd>F4</kbd>), ví dụ <code>$B$2:$B$5</code>, trước khi kéo công thức xuống.'],
    errors: [['Hạng bị sai khi kéo xuống', 'Quên khoá $ nên vùng tham chiếu bị trượt.']],
    lesson: 'p2/xep-hang'
  },
  {
    name: 'MEDIAN',
    group: 'Thống kê',
    short: 'Lấy giá trị ở giữa (trung vị)',
    syntax: 'MEDIAN(number1, [number2], ...)',
    args: [
      ['number1', 'Bắt buộc. Vùng số.', 'Số/vùng thứ nhất'],
      ['number2, ...', 'Tuỳ chọn. Các vùng khác.', 'Các số/vùng khác']
    ],
    desc: 'Hàm <b>MEDIAN</b> trả về số nằm giữa khi sắp xếp danh sách. Khác với trung bình, số ở giữa không bị vài con số quá lớn kéo lệch, nên hợp để xem mức lương "phổ biến" của công ty.',
    example: {
      data: [['Nhân viên', 'Lương'], ['An', 9000000], ['Bình', 10000000], ['Cường', 11000000], ['Giám đốc', 60000000], ['Lương ở giữa']],
      cell: 'B6',
      formula: '=MEDIAN(B2:B5)',
      note: 'Trung vị là 10.500.000 đ, sát với mức lương phổ biến hơn trung bình (22.500.000 đ).'
    },
    tips: ['Số lượng chẵn thì MEDIAN lấy trung bình của 2 số ở giữa.'],
    errors: [],
    lesson: 'p2/xep-hang'
  },

  /* ================= LOGIC ================= */
  {
    name: 'IF',
    group: 'Logic',
    short: 'Trả về kết quả khác nhau theo điều kiện đúng/sai',
    syntax: 'IF(logical_test, [value_if_true], [value_if_false])',
    args: [
      ['logical_test', 'Bắt buộc. Điều kiện cần kiểm tra, ví dụ <code>B2>=50000000</code>.', 'Điều kiện kiểm tra'],
      ['value_if_true', 'Tuỳ chọn. Kết quả khi điều kiện đúng.', 'Kết quả nếu đúng'],
      ['value_if_false', 'Tuỳ chọn. Kết quả khi điều kiện sai.', 'Kết quả nếu sai']
    ],
    desc: 'Hàm <b>IF</b> kiểm tra một điều kiện rồi trả về một trong hai kết quả. Dùng xét đạt/không đạt chỉ tiêu, tính thưởng, phân loại đơn hàng. Đây là nền tảng của mọi công thức có điều kiện.',
    example: {
      data: [['Nhân viên', 'Doanh số', 'Chỉ tiêu', 'Đánh giá'], ['Trần Thị Bình', 52000000, 50000000]],
      cell: 'D2',
      formula: '=IF(B2>=C2,"Đạt","Chưa đạt")',
      note: 'Doanh số 52 triệu vượt chỉ tiêu 50 triệu nên ra "Đạt".'
    },
    tips: ['Chữ trong công thức phải đặt trong nháy kép: <code>"Đạt"</code>.', 'Nhiều mức điều kiện thì cân nhắc IFS cho dễ đọc thay vì lồng nhiều IF.'],
    errors: [['#NAME?', 'Quên nháy kép quanh chữ, ví dụ viết <code>Đạt</code> thay vì <code>"Đạt"</code>.']],
    lesson: 'p3/if'
  },
  {
    name: 'AND',
    group: 'Logic',
    short: 'Đúng khi tất cả điều kiện đều đúng',
    syntax: 'AND(logical1, [logical2], ...)',
    args: [
      ['logical1', 'Bắt buộc. Điều kiện thứ nhất.', 'Điều kiện thứ nhất'],
      ['logical2, ...', 'Tuỳ chọn. Các điều kiện khác.', 'Các điều kiện khác']
    ],
    desc: 'Hàm <b>AND</b> ra TRUE (đúng) khi <b>tất cả</b> điều kiện đều đúng. Thường đặt trong IF để xét nhiều tiêu chí cùng lúc: đủ công và không đi muộn mới được thưởng chuyên cần.',
    example: {
      data: [['Nhân viên', 'Ngày công', 'Số lần đi muộn', 'Thưởng chuyên cần'], ['Lê Văn Cường', 26, 0]],
      cell: 'D2',
      formula: '=IF(AND(B2>=26,C2=0),500000,0)',
      note: 'Đủ 26 công và không đi muộn nên được thưởng 500.000 đ.'
    },
    tips: [],
    errors: [],
    lesson: 'p3/and-or-not'
  },
  {
    name: 'OR',
    group: 'Logic',
    short: 'Đúng khi có ít nhất một điều kiện đúng',
    syntax: 'OR(logical1, [logical2], ...)',
    args: [
      ['logical1', 'Bắt buộc. Điều kiện thứ nhất.', 'Điều kiện thứ nhất'],
      ['logical2, ...', 'Tuỳ chọn. Các điều kiện khác.', 'Các điều kiện khác']
    ],
    desc: 'Hàm <b>OR</b> ra TRUE (đúng) khi <b>ít nhất một</b> điều kiện đúng. Dùng khi chỉ cần thoả một trong nhiều tiêu chí, ví dụ đơn hàng lớn hoặc khách VIP thì được miễn phí giao hàng.',
    example: {
      data: [['Đơn hàng', 'Giá trị', 'Loại khách', 'Phí giao'], ['DH015', 1200000, 'VIP']],
      cell: 'D2',
      formula: '=IF(OR(B2>=2000000,C2="VIP"),0,30000)',
      note: 'Đơn chưa đủ 2 triệu nhưng là khách VIP nên phí giao bằng 0.'
    },
    tips: [],
    errors: [],
    lesson: 'p3/and-or-not'
  },
  {
    name: 'NOT',
    group: 'Logic',
    short: 'Đảo ngược đúng thành sai và ngược lại',
    syntax: 'NOT(logical)',
    args: [['logical', 'Bắt buộc. Điều kiện cần đảo.', 'Điều kiện cần đảo']],
    desc: 'Hàm <b>NOT</b> đảo ngược kết quả: đúng (TRUE) thành sai (FALSE) và ngược lại. Dùng khi điều kiện dễ nói theo kiểu "không phải", ví dụ "không phải hàng thanh lý".',
    example: {
      data: [['Mặt hàng', 'Nhóm', 'Được giảm giá?'], ['Áo sơ mi', 'Hàng mới']],
      cell: 'C2',
      formula: '=NOT(B2="Thanh lý")',
      note: 'Không phải hàng thanh lý nên kết quả là TRUE.'
    },
    tips: ['<code>NOT(B2="Thanh lý")</code> cho kết quả giống <code>B2<>"Thanh lý"</code> (dấu <code><></code> nghĩa là "khác").'],
    errors: [],
    lesson: 'p3/and-or-not'
  },
  {
    name: 'IFS',
    group: 'Logic',
    short: 'Kiểm tra nhiều điều kiện, lấy kết quả đầu tiên đúng',
    syntax: 'IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], ...)',
    args: [
      ['logical_test1', 'Bắt buộc. Điều kiện thứ nhất.', 'Điều kiện thứ nhất'],
      ['value_if_true1', 'Bắt buộc. Kết quả khi điều kiện thứ nhất đúng.', 'Kết quả nếu đúng'],
      ['logical_test2, value_if_true2, ...', 'Tuỳ chọn. Các cặp điều kiện và kết quả tiếp theo.', 'Các cặp tiếp theo']
    ],
    desc: 'Hàm <b>IFS</b> xét lần lượt từng điều kiện, gặp điều kiện đúng đầu tiên thì lấy kết quả đi kèm. Dùng thay cho nhiều IF lồng nhau khi xếp loại nhiều mức: A, B, C, D.',
    example: {
      data: [['Nhân viên', 'Điểm KPI', 'Xếp loại'], ['Phạm Thu Dung', 82]],
      cell: 'C2',
      formula: '=IFS(B2>=90,"A",B2>=75,"B",B2>=60,"C",TRUE,"D")',
      note: '82 điểm không đạt mức 90 nhưng đạt mức 75 nên xếp loại B.'
    },
    tips: ['Đặt <code>TRUE</code> ở cặp cuối để làm trường hợp "còn lại".', 'Sắp điều kiện từ cao xuống thấp, vì IFS dừng ở điều kiện đúng đầu tiên.'],
    errors: [['#N/A', 'Không điều kiện nào đúng. Thêm cặp <code>TRUE,"..."</code> ở cuối.']],
    lesson: 'p3/ifs-switch',
    since: 'Excel 2019 / 365'
  },
  {
    name: 'SWITCH',
    group: 'Logic',
    short: 'So khớp một giá trị với danh sách, trả kết quả tương ứng',
    syntax: 'SWITCH(expression, value1, result1, [value2, result2], ..., [default])',
    args: [
      ['expression', 'Bắt buộc. Giá trị cần so khớp, thường là một mã.', 'Giá trị cần so'],
      ['value1, result1', 'Bắt buộc. Nếu bằng value1 thì trả result1.', 'Giá trị và kết quả'],
      ['value2, result2, ...', 'Tuỳ chọn. Các cặp tiếp theo.', 'Các cặp tiếp theo'],
      ['default', 'Tuỳ chọn. Kết quả khi không khớp giá trị nào.', 'Kết quả khi không khớp']
    ],
    desc: 'Hàm <b>SWITCH</b> đổi một mã sang tên hoặc giá trị tương ứng. Hợp khi danh sách mã ngắn và cố định: mã chi nhánh, mã ca làm việc, mã phương thức thanh toán.',
    example: {
      data: [['Nhân viên', 'Mã ca', 'Tên ca'], ['Nguyễn Văn An', 'C2']],
      cell: 'C2',
      formula: '=SWITCH(B2,"C1","Ca sáng","C2","Ca chiều","C3","Ca đêm","Không rõ")',
      note: 'Mã C2 được đổi thành "Ca chiều".'
    },
    tips: ['Danh sách mã dài hoặc hay thay đổi thì nên làm bảng riêng rồi dùng VLOOKUP/XLOOKUP.'],
    errors: [['#N/A', 'Không khớp giá trị nào và không có default.']],
    lesson: 'p3/ifs-switch',
    since: 'Excel 2019 / 365'
  },
  {
    name: 'IFERROR',
    group: 'Logic',
    short: 'Thay kết quả lỗi bằng giá trị khác',
    syntax: 'IFERROR(value, value_if_error)',
    args: [
      ['value', 'Bắt buộc. Công thức có thể bị lỗi.', 'Công thức cần kiểm tra'],
      ['value_if_error', 'Bắt buộc. Giá trị hiện ra khi công thức bị lỗi.', 'Hiện gì khi lỗi']
    ],
    desc: 'Hàm <b>IFERROR</b> thay mọi loại lỗi (#DIV/0!, #N/A, #VALUE!…) bằng giá trị bạn chọn, ví dụ số 0 hoặc ô trống. Giúp báo cáo gọn gàng, không lỗ chỗ mã lỗi khi chưa có dữ liệu.',
    example: {
      data: [['Chi nhánh', 'Doanh thu', 'Số đơn', 'Giá trị TB/đơn'], ['Cần Thơ', 0, 0]],
      cell: 'D2',
      formula: '=IFERROR(B2/C2,0)',
      note: 'Chưa có đơn nên phép chia bị #DIV/0!. IFERROR thay bằng 0.'
    },
    tips: ['Đừng thêm IFERROR quá sớm vì nó che luôn cả lỗi do viết sai công thức. Hãy chắc công thức chạy đúng rồi mới thêm.'],
    errors: [],
    lesson: 'p3/iferror'
  },
  {
    name: 'IFNA',
    group: 'Logic',
    short: 'Chỉ thay lỗi #N/A bằng giá trị khác',
    syntax: 'IFNA(value, value_if_na)',
    args: [
      ['value', 'Bắt buộc. Công thức có thể ra #N/A.', 'Công thức cần kiểm tra'],
      ['value_if_na', 'Bắt buộc. Giá trị hiện ra khi gặp #N/A.', 'Hiện gì khi không thấy']
    ],
    desc: 'Hàm <b>IFNA</b> chỉ thay lỗi <code>#N/A</code> (không tìm thấy), các lỗi khác vẫn hiện. Dùng với VLOOKUP, MATCH an toàn hơn IFERROR: nếu công thức viết sai, bạn vẫn nhìn thấy lỗi.',
    example: {
      data: [['Mã', 'Tên hàng', '', 'Mã cần tìm', 'Tên hàng'], ['SP01', 'Bút bi', '', 'SP09'], ['SP02', 'Giấy A4'], ['SP03', 'Kẹp giấy']],
      cell: 'E2',
      formula: '=IFNA(VLOOKUP(D2,$A$2:$B$4,2,0),"Không có mã")',
      note: 'SP09 không có trong danh mục nên hiện "Không có mã" thay vì #N/A.'
    },
    tips: [],
    errors: [],
    lesson: 'p3/iferror',
    since: 'Excel 2013'
  },

  /* ================= ĐIỀU KIỆN ================= */
  {
    name: 'COUNTIF',
    group: 'Điều kiện',
    short: 'Đếm số ô thoả một điều kiện',
    syntax: 'COUNTIF(range, criteria)',
    args: [
      ['range', 'Bắt buộc. Vùng cần kiểm tra.', 'Vùng cần kiểm tra'],
      ['criteria', 'Bắt buộc. Điều kiện, ví dụ <code>"Đã giao"</code>, <code>">=1000000"</code>, hoặc một ô.', 'Điều kiện']
    ],
    desc: 'Hàm <b>COUNTIF</b> đếm số ô thoả điều kiện. Dùng đếm số đơn đã giao, số nhân viên phòng Kế toán, số lần đi muộn. Không phân biệt chữ hoa, chữ thường.',
    example: {
      data: [['Đơn hàng', 'Trạng thái', '', 'Trạng thái', 'Số đơn'], ['DH01', 'Đã giao', '', 'Đã giao'], ['DH02', 'Đang giao'], ['DH03', 'Đã giao'], ['DH04', 'Huỷ'], ['DH05', 'Đã giao']],
      cell: 'E2',
      formula: '=COUNTIF(B2:B6,D2)',
      note: 'Có 3 đơn ở trạng thái "Đã giao".'
    },
    tips: ['Điều kiện so sánh phải để trong nháy kép: <code>">=1000000"</code>. Ghép với ô: <code>">="&F1</code>.', 'Dùng ký tự đại diện: <code>"*Hà Nội*"</code> đếm mọi ô có chứa "Hà Nội".'],
    errors: [['Kết quả 0 dù có dữ liệu', 'Dữ liệu có dấu cách thừa. Dọn bằng TRIM.']],
    lesson: 'p4/countif'
  },
  {
    name: 'SUMIF',
    group: 'Điều kiện',
    short: 'Cộng tổng các ô thoả một điều kiện',
    syntax: 'SUMIF(range, criteria, [sum_range])',
    args: [
      ['range', 'Bắt buộc. Vùng chứa điều kiện.', 'Vùng xét điều kiện'],
      ['criteria', 'Bắt buộc. Điều kiện cần thoả.', 'Điều kiện'],
      ['sum_range', 'Tuỳ chọn. Vùng cần cộng. Bỏ trống thì cộng chính range.', 'Vùng cần cộng']
    ],
    desc: 'Hàm <b>SUMIF</b> cộng tổng những dòng thoả điều kiện. Dùng tính tổng doanh thu theo nhân viên, tổng chi phí theo phòng ban, tổng hàng xuất theo kho.',
    example: {
      data: [['Nhân viên', 'Doanh thu', '', 'Nhân viên', 'Tổng doanh thu'], ['An', 12000000, '', 'An'], ['Bình', 8000000], ['An', 15000000], ['Cường', 9500000], ['An', 6000000]],
      cell: 'E2',
      formula: '=SUMIF(A2:A6,D2,B2:B6)',
      note: 'Cộng 3 đơn của An: 12 + 15 + 6 = 33 triệu.'
    },
    tips: ['SUMIF ghi vùng điều kiện trước, vùng cần cộng sau. SUMIFS thì ngược lại: vùng cần cộng đứng đầu.'],
    errors: [],
    lesson: 'p4/sumif'
  },
  {
    name: 'AVERAGEIF',
    group: 'Điều kiện',
    short: 'Tính trung bình các ô thoả một điều kiện',
    syntax: 'AVERAGEIF(range, criteria, [average_range])',
    args: [
      ['range', 'Bắt buộc. Vùng chứa điều kiện.', 'Vùng xét điều kiện'],
      ['criteria', 'Bắt buộc. Điều kiện.', 'Điều kiện'],
      ['average_range', 'Tuỳ chọn. Vùng cần tính trung bình.', 'Vùng tính trung bình']
    ],
    desc: 'Hàm <b>AVERAGEIF</b> tính trung bình những dòng thoả điều kiện. Dùng tính lương bình quân theo phòng, giá trị đơn trung bình theo khu vực.',
    example: {
      data: [['Nhân viên', 'Phòng', 'Lương', '', 'Phòng', 'Lương TB'], ['An', 'Kế toán', 12000000, '', 'Kế toán'], ['Bình', 'Kinh doanh', 15000000], ['Cường', 'Kế toán', 10000000], ['Dung', 'Kinh doanh', 18000000]],
      cell: 'F2',
      formula: '=AVERAGEIF(B2:B5,E2,C2:C5)',
      note: 'Lương trung bình phòng Kế toán là 11.000.000 đ.'
    },
    tips: [],
    errors: [['#DIV/0!', 'Không dòng nào thoả điều kiện.']],
    lesson: 'p4/averageif'
  },
  {
    name: 'COUNTIFS',
    group: 'Điều kiện',
    short: 'Đếm số dòng thoả nhiều điều kiện',
    syntax: 'COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)',
    args: [
      ['criteria_range1', 'Bắt buộc. Vùng điều kiện thứ nhất.', 'Vùng điều kiện 1'],
      ['criteria1', 'Bắt buộc. Điều kiện thứ nhất.', 'Điều kiện 1'],
      ['criteria_range2, criteria2, ...', 'Tuỳ chọn. Các cặp vùng và điều kiện tiếp theo.', 'Các cặp tiếp theo']
    ],
    desc: 'Hàm <b>COUNTIFS</b> đếm số dòng thoả <b>đồng thời</b> tất cả điều kiện. Dùng đếm số đơn đã giao của khu vực Hà Nội, số nhân viên nữ phòng Kinh doanh.',
    example: {
      data: [['Đơn', 'Khu vực', 'Trạng thái'], ['DH01', 'Hà Nội', 'Đã giao'], ['DH02', 'HCM', 'Đã giao'], ['DH03', 'Hà Nội', 'Đang giao'], ['DH04', 'Hà Nội', 'Đã giao'], ['Hà Nội đã giao']],
      cell: 'C6',
      formula: '=COUNTIFS(B2:B5,"Hà Nội",C2:C5,"Đã giao")',
      note: 'Có 2 đơn vừa ở Hà Nội vừa đã giao (DH01, DH04).'
    },
    tips: ['Các vùng điều kiện phải cùng số dòng.'],
    errors: [['#VALUE!', 'Các vùng điều kiện không cùng kích thước.']],
    lesson: 'p4/nhieu-dieu-kien'
  },
  {
    name: 'SUMIFS',
    group: 'Điều kiện',
    short: 'Cộng tổng các dòng thoả nhiều điều kiện',
    syntax: 'SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)',
    args: [
      ['sum_range', 'Bắt buộc. Vùng cần cộng.', 'Vùng cần cộng'],
      ['criteria_range1', 'Bắt buộc. Vùng điều kiện thứ nhất.', 'Vùng điều kiện 1'],
      ['criteria1', 'Bắt buộc. Điều kiện thứ nhất.', 'Điều kiện 1'],
      ['criteria_range2, criteria2, ...', 'Tuỳ chọn. Các cặp tiếp theo.', 'Các cặp tiếp theo']
    ],
    desc: 'Hàm <b>SUMIFS</b> cộng tổng những dòng thoả tất cả điều kiện. Đây là hàm tổng hợp báo cáo quan trọng nhất: doanh thu theo nhân viên và theo tháng, chi phí theo phòng và theo loại.',
    example: {
      data: [['Nhân viên', 'Sản phẩm', 'Doanh thu'], ['An', 'Laptop', 25000000], ['An', 'Chuột', 500000], ['Bình', 'Laptop', 22000000], ['An', 'Laptop', 27000000], ['An bán Laptop']],
      cell: 'C6',
      formula: '=SUMIFS(C2:C5,A2:A5,"An",B2:B5,"Laptop")',
      note: 'Cộng doanh thu Laptop của An: 25 + 27 = 52 triệu.'
    },
    tips: ['Cột cần cộng luôn đứng <b>đầu tiên</b> trong SUMIFS.', 'Cộng trong một khoảng ngày (từ ngày ở F1 đến ngày ở G1): <code>SUMIFS(C:C,D:D,">="&F1,D:D,"<="&G1)</code>.'],
    errors: [],
    lesson: 'p4/nhieu-dieu-kien'
  },
  {
    name: 'AVERAGEIFS',
    group: 'Điều kiện',
    short: 'Tính trung bình các dòng thoả nhiều điều kiện',
    syntax: 'AVERAGEIFS(average_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)',
    args: [
      ['average_range', 'Bắt buộc. Vùng cần tính trung bình.', 'Vùng tính trung bình'],
      ['criteria_range1', 'Bắt buộc. Vùng điều kiện thứ nhất.', 'Vùng điều kiện 1'],
      ['criteria1', 'Bắt buộc. Điều kiện thứ nhất.', 'Điều kiện 1'],
      ['criteria_range2, criteria2, ...', 'Tuỳ chọn. Các cặp tiếp theo.', 'Các cặp tiếp theo']
    ],
    desc: 'Hàm <b>AVERAGEIFS</b> tính trung bình những dòng thoả tất cả điều kiện. Ví dụ thời gian giao trung bình của các đơn nội thành đã giao thành công.',
    example: {
      data: [['Đơn', 'Khu vực', 'Trạng thái', 'Số giờ giao'], ['DH01', 'Nội thành', 'Thành công', 3], ['DH02', 'Ngoại thành', 'Thành công', 8], ['DH03', 'Nội thành', 'Thành công', 5], ['DH04', 'Nội thành', 'Thất bại', 9], ['TB nội thành', '', '', '']],
      cell: 'D6',
      formula: '=AVERAGEIFS(D2:D5,B2:B5,"Nội thành",C2:C5,"Thành công")',
      note: 'Trung bình của DH01 và DH03 là 4 giờ.'
    },
    tips: [],
    errors: [['#DIV/0!', 'Không dòng nào thoả đủ các điều kiện.']],
    lesson: 'p4/nhieu-dieu-kien'
  },
  {
    name: 'MAXIFS',
    group: 'Điều kiện',
    short: 'Tìm giá trị lớn nhất kèm điều kiện',
    syntax: 'MAXIFS(max_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)',
    args: [
      ['max_range', 'Bắt buộc. Vùng cần tìm giá trị lớn nhất.', 'Vùng tìm số lớn nhất'],
      ['criteria_range1', 'Bắt buộc. Vùng điều kiện thứ nhất.', 'Vùng điều kiện 1'],
      ['criteria1', 'Bắt buộc. Điều kiện thứ nhất.', 'Điều kiện 1'],
      ['criteria_range2, criteria2, ...', 'Tuỳ chọn. Các cặp tiếp theo.', 'Các cặp tiếp theo']
    ],
    desc: 'Hàm <b>MAXIFS</b> tìm số lớn nhất trong những dòng thoả điều kiện. Dùng tìm đơn hàng lớn nhất của từng khách, doanh số cao nhất của từng chi nhánh.',
    example: {
      data: [['Chi nhánh', 'Đơn hàng', 'Giá trị', '', 'Chi nhánh', 'Đơn lớn nhất'], ['Hà Nội', 'DH01', 15000000, '', 'Hà Nội'], ['HCM', 'DH02', 32000000], ['Hà Nội', 'DH03', 21000000], ['HCM', 'DH04', 9000000]],
      cell: 'F2',
      formula: '=MAXIFS(C2:C5,A2:A5,E2)',
      note: 'Đơn lớn nhất của chi nhánh Hà Nội là 21.000.000 đ.'
    },
    tips: [],
    errors: [],
    lesson: 'p4/maxifs',
    since: 'Excel 2019 / 365'
  },
  {
    name: 'MINIFS',
    group: 'Điều kiện',
    short: 'Tìm giá trị nhỏ nhất kèm điều kiện',
    syntax: 'MINIFS(min_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)',
    args: [
      ['min_range', 'Bắt buộc. Vùng cần tìm giá trị nhỏ nhất.', 'Vùng tìm số nhỏ nhất'],
      ['criteria_range1', 'Bắt buộc. Vùng điều kiện thứ nhất.', 'Vùng điều kiện 1'],
      ['criteria1', 'Bắt buộc. Điều kiện thứ nhất.', 'Điều kiện 1'],
      ['criteria_range2, criteria2, ...', 'Tuỳ chọn. Các cặp tiếp theo.', 'Các cặp tiếp theo']
    ],
    desc: 'Hàm <b>MINIFS</b> tìm số nhỏ nhất trong những dòng thoả điều kiện. Dùng tìm giá nhập thấp nhất của từng mặt hàng, ngày giao sớm nhất của từng tuyến.',
    example: {
      data: [['Mặt hàng', 'Nhà cung cấp', 'Giá nhập', '', 'Mặt hàng', 'Giá thấp nhất'], ['Giấy A4', 'Minh Long', 68000, '', 'Giấy A4'], ['Giấy A4', 'Đại Việt', 65000], ['Bút bi', 'Minh Long', 5000], ['Giấy A4', 'Hoà Phát', 70000]],
      cell: 'F2',
      formula: '=MINIFS(C2:C5,A2:A5,E2)',
      note: 'Giá nhập Giấy A4 thấp nhất là 65.000 đ (Đại Việt).'
    },
    tips: [],
    errors: [],
    lesson: 'p4/maxifs',
    since: 'Excel 2019 / 365'
  },

  /* ================= VĂN BẢN ================= */
  {
    name: 'LEFT',
    group: 'Văn bản',
    short: 'Lấy ký tự từ bên trái chuỗi',
    syntax: 'LEFT(text, [num_chars])',
    args: [
      ['text', 'Bắt buộc. Chuỗi cần cắt.', 'Chuỗi cần cắt'],
      ['num_chars', 'Tuỳ chọn. Số ký tự lấy ra, mặc định 1.', 'Lấy mấy ký tự']
    ],
    desc: 'Hàm <b>LEFT</b> lấy một số ký tự đầu chuỗi. Dùng tách mã chi nhánh, mã loại hàng nằm ở đầu mã đơn.',
    example: {
      data: [['Mã đơn', 'Mã chi nhánh'], ['HN-2024-0153']],
      cell: 'B2',
      formula: '=LEFT(A2,2)',
      note: 'Lấy 2 ký tự đầu: "HN".'
    },
    tips: ['Kết quả của LEFT luôn là chữ. Muốn ra số, bọc thêm VALUE.'],
    errors: [],
    lesson: 'p5/cat-chuoi'
  },
  {
    name: 'RIGHT',
    group: 'Văn bản',
    short: 'Lấy ký tự từ bên phải chuỗi',
    syntax: 'RIGHT(text, [num_chars])',
    args: [
      ['text', 'Bắt buộc. Chuỗi cần cắt.', 'Chuỗi cần cắt'],
      ['num_chars', 'Tuỳ chọn. Số ký tự lấy ra, mặc định 1.', 'Lấy mấy ký tự']
    ],
    desc: 'Hàm <b>RIGHT</b> lấy một số ký tự cuối chuỗi. Dùng lấy số thứ tự ở cuối mã đơn, 4 số cuối số điện thoại.',
    example: {
      data: [['Mã đơn', 'Số thứ tự'], ['HN-2024-0153']],
      cell: 'B2',
      formula: '=RIGHT(A2,4)',
      note: 'Lấy 4 ký tự cuối: "0153".'
    },
    tips: [],
    errors: [],
    lesson: 'p5/cat-chuoi'
  },
  {
    name: 'MID',
    group: 'Văn bản',
    short: 'Lấy ký tự ở giữa chuỗi',
    syntax: 'MID(text, start_num, num_chars)',
    args: [
      ['text', 'Bắt buộc. Chuỗi cần cắt.', 'Chuỗi cần cắt'],
      ['start_num', 'Bắt buộc. Vị trí bắt đầu, ký tự đầu tiên là 1.', 'Bắt đầu từ ký tự'],
      ['num_chars', 'Bắt buộc. Số ký tự lấy ra.', 'Lấy mấy ký tự']
    ],
    desc: 'Hàm <b>MID</b> lấy một đoạn ở giữa chuỗi, bắt đầu từ vị trí chỉ định. Dùng tách năm trong mã đơn, tách mã tỉnh trong mã khách hàng.',
    example: {
      data: [['Mã đơn', 'Năm'], ['HN-2024-0153']],
      cell: 'B2',
      formula: '=MID(A2,4,4)',
      note: 'Bắt đầu từ ký tự thứ 4, lấy 4 ký tự: "2024".'
    },
    tips: ['Khi vị trí cắt không cố định, kết hợp MID với FIND để tìm vị trí dấu phân cách.'],
    errors: [],
    lesson: 'p5/cat-chuoi'
  },
  {
    name: 'LEN',
    group: 'Văn bản',
    short: 'Đếm số ký tự trong chuỗi',
    syntax: 'LEN(text)',
    args: [['text', 'Bắt buộc. Chuỗi cần đếm, dấu cách cũng tính.', 'Chuỗi cần đếm']],
    desc: 'Hàm <b>LEN</b> đếm số ký tự, kể cả dấu cách. Dùng kiểm tra tên hàng có quá dài để in tem nhãn không, mã số thuế đủ số chữ số chưa, hoặc phát hiện dấu cách thừa.',
    example: {
      data: [['Mã hàng', 'Tên in tem (tối đa 20 ký tự)', 'Số ký tự'], ['SP07', 'Giấy in A4 Double A 80gsm']],
      cell: 'C2',
      formula: '=LEN(B2)',
      note: 'Tên dài 25 ký tự, vượt giới hạn 20 ký tự của tem nên cần viết gọn lại.'
    },
    tips: ['<code>=LEN(A2)<>LEN(TRIM(A2))</code> ra TRUE nếu ô có dấu cách thừa.'],
    errors: [],
    lesson: 'p5/cat-chuoi'
  },
  {
    name: 'TRIM',
    group: 'Văn bản',
    short: 'Xoá dấu cách thừa',
    syntax: 'TRIM(text)',
    args: [['text', 'Bắt buộc. Chuỗi cần dọn.', 'Chuỗi cần dọn']],
    desc: 'Hàm <b>TRIM</b> xoá dấu cách ở đầu, cuối và gộp nhiều dấu cách giữa các từ thành một. Rất cần khi dữ liệu dán từ phần mềm khác hoặc do nhiều người nhập, vì dấu cách thừa làm VLOOKUP, COUNTIF không tìm thấy.',
    example: {
      data: [['Họ tên gốc', 'Đã dọn'], ['   Nguyễn   Văn  An  ']],
      cell: 'B2',
      formula: '=TRIM(A2)',
      note: 'Kết quả là "Nguyễn Văn An", sạch dấu cách thừa.'
    },
    tips: ['Dọn xong, chép cột kết quả rồi <b>Paste Special › Values</b> đè lên cột gốc.'],
    errors: [],
    lesson: 'p5/chuan-hoa'
  },
  {
    name: 'UPPER',
    group: 'Văn bản',
    short: 'Chuyển toàn bộ thành chữ in hoa',
    syntax: 'UPPER(text)',
    args: [['text', 'Bắt buộc. Chuỗi cần chuyển.', 'Chuỗi cần chuyển']],
    desc: 'Hàm <b>UPPER</b> chuyển mọi chữ thành chữ hoa. Dùng chuẩn hoá mã hàng, biển số xe, mã khách hàng để dữ liệu đồng nhất.',
    example: {
      data: [['Biển số nhập', 'Chuẩn hoá'], ['51c-123.45']],
      cell: 'B2',
      formula: '=UPPER(A2)',
      note: 'Kết quả là "51C-123.45".'
    },
    tips: [],
    errors: [],
    lesson: 'p5/chuan-hoa'
  },
  {
    name: 'LOWER',
    group: 'Văn bản',
    short: 'Chuyển toàn bộ thành chữ thường',
    syntax: 'LOWER(text)',
    args: [['text', 'Bắt buộc. Chuỗi cần chuyển.', 'Chuỗi cần chuyển']],
    desc: 'Hàm <b>LOWER</b> chuyển mọi chữ thành chữ thường. Hay dùng chuẩn hoá địa chỉ email trước khi gửi hoặc đối chiếu.',
    example: {
      data: [['Email nhập', 'Chuẩn hoá'], ['NguyenVanAn@CongTy.VN']],
      cell: 'B2',
      formula: '=LOWER(A2)',
      note: 'Kết quả là "nguyenvanan@congty.vn".'
    },
    tips: [],
    errors: [],
    lesson: 'p5/chuan-hoa'
  },
  {
    name: 'PROPER',
    group: 'Văn bản',
    short: 'Viết hoa chữ cái đầu mỗi từ',
    syntax: 'PROPER(text)',
    args: [['text', 'Bắt buộc. Chuỗi cần chuyển.', 'Chuỗi cần chuyển']],
    desc: 'Hàm <b>PROPER</b> viết hoa chữ cái đầu của mỗi từ, các chữ còn lại viết thường. Dùng chuẩn hoá họ tên khách hàng, nhân viên nhập lộn xộn.',
    example: {
      data: [['Họ tên nhập', 'Chuẩn hoá'], ['trần THỊ bình']],
      cell: 'B2',
      formula: '=PROPER(A2)',
      note: 'Kết quả là "Trần Thị Bình".'
    },
    tips: ['Kết hợp <code>=PROPER(TRIM(A2))</code> để vừa dọn dấu cách vừa chuẩn hoá chữ hoa.'],
    errors: [],
    lesson: 'p5/chuan-hoa'
  },
  {
    name: 'CONCATENATE',
    group: 'Văn bản',
    short: 'Nối nhiều chuỗi thành một (hàm cũ)',
    syntax: 'CONCATENATE(text1, [text2], ...)',
    args: [
      ['text1', 'Bắt buộc. Chuỗi hoặc ô thứ nhất.', 'Chuỗi/ô thứ nhất'],
      ['text2, ...', 'Tuỳ chọn. Các chuỗi hoặc ô tiếp theo.', 'Các chuỗi/ô tiếp theo']
    ],
    desc: 'Hàm <b>CONCATENATE</b> nối các chuỗi lại với nhau. Đây là hàm cũ, vẫn chạy ở mọi phiên bản Excel. Không nhận cả vùng, phải liệt kê từng ô.',
    example: {
      data: [['Họ', 'Tên', 'Họ tên'], ['Nguyễn Văn', 'An']],
      cell: 'C2',
      formula: '=CONCATENATE(A2," ",B2)',
      note: 'Kết quả là "Nguyễn Văn An". Nhớ chèn dấu cách " " ở giữa.'
    },
    tips: ['Cách nhanh hơn: dùng toán tử <code>&</code>, ví dụ <code>=A2&" "&B2</code>.'],
    errors: [],
    lesson: 'p5/noi-chuoi'
  },
  {
    name: 'CONCAT',
    group: 'Văn bản',
    short: 'Nối chuỗi, nhận được cả vùng',
    syntax: 'CONCAT(text1, [text2], ...)',
    args: [
      ['text1', 'Bắt buộc. Chuỗi, ô hoặc vùng.', 'Chuỗi/vùng thứ nhất'],
      ['text2, ...', 'Tuỳ chọn. Các chuỗi, ô hoặc vùng tiếp theo.', 'Các chuỗi/vùng khác']
    ],
    desc: 'Hàm <b>CONCAT</b> là bản mới thay CONCATENATE, nhận được cả vùng như <code>A2:C2</code>. Dùng ghép mã từ nhiều cột, ví dụ mã kho + mã kệ + mã ô.',
    example: {
      data: [['Kho', 'Dãy', 'Ô', 'Mã vị trí'], ['K1-', 'A-', 'T05']],
      cell: 'D2',
      formula: '=CONCAT(A2:C2)',
      note: 'Ghép cả vùng A2:C2 thành "K1-A-T05".'
    },
    tips: ['Cần chèn dấu phân cách giữa các ô thì dùng TEXTJOIN.'],
    errors: [],
    lesson: 'p5/noi-chuoi',
    since: 'Excel 2019 / 365'
  },
  {
    name: 'TEXTJOIN',
    group: 'Văn bản',
    short: 'Nối chuỗi có dấu phân cách, bỏ qua ô trống',
    syntax: 'TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)',
    args: [
      ['delimiter', 'Bắt buộc. Dấu phân cách, ví dụ <code>", "</code>.', 'Dấu ngăn cách'],
      ['ignore_empty', 'Bắt buộc. TRUE để bỏ qua ô trống.', 'Bỏ qua ô trống?'],
      ['text1', 'Bắt buộc. Chuỗi, ô hoặc vùng cần nối.', 'Chuỗi/vùng thứ nhất'],
      ['text2, ...', 'Tuỳ chọn. Các vùng tiếp theo.', 'Các vùng tiếp theo']
    ],
    desc: 'Hàm <b>TEXTJOIN</b> nối nhiều ô và tự chèn dấu phân cách giữa chúng. Dùng ghép địa chỉ đầy đủ từ các cột Số nhà, Phường, Quận, Tỉnh mà không lo dư dấu phẩy khi có ô trống.',
    example: {
      data: [['Số nhà, đường', 'Phường', 'Quận', 'Tỉnh/TP', 'Địa chỉ đầy đủ'], ['12 Lê Lợi', '', 'Quận 1', 'TP.HCM']],
      cell: 'E2',
      formula: '=TEXTJOIN(", ",TRUE,A2:D2)',
      note: 'Ô Phường trống được bỏ qua: "12 Lê Lợi, Quận 1, TP.HCM".'
    },
    tips: [],
    errors: [],
    lesson: 'p5/noi-chuoi',
    since: 'Excel 2019 / 365'
  },
  {
    name: 'FIND',
    group: 'Văn bản',
    short: 'Tìm vị trí chuỗi con (phân biệt hoa thường)',
    syntax: 'FIND(find_text, within_text, [start_num])',
    args: [
      ['find_text', 'Bắt buộc. Chuỗi cần tìm.', 'Tìm chữ gì'],
      ['within_text', 'Bắt buộc. Chuỗi chứa nó.', 'Tìm trong chuỗi nào'],
      ['start_num', 'Tuỳ chọn. Vị trí bắt đầu tìm, mặc định 1.', 'Bắt đầu tìm từ đâu']
    ],
    desc: 'Hàm <b>FIND</b> trả về vị trí đầu tiên của chuỗi con. Có phân biệt chữ hoa, chữ thường. Thường dùng kèm LEFT, MID để cắt chuỗi theo dấu phân cách như "@", "-", dấu cách.',
    example: {
      data: [['Email', 'Tên đăng nhập'], ['binh.tran@congty.vn']],
      cell: 'B2',
      formula: '=LEFT(A2,FIND("@",A2)-1)',
      note: 'FIND tìm vị trí "@", LEFT lấy phần trước đó: "binh.tran".'
    },
    tips: ['Không cần phân biệt hoa thường thì dùng SEARCH.'],
    errors: [['#VALUE!', 'Không tìm thấy chuỗi con. Bọc IFERROR nếu có dòng không chứa ký tự cần tìm.']],
    lesson: 'p5/tim-thay-the'
  },
  {
    name: 'SEARCH',
    group: 'Văn bản',
    short: 'Tìm vị trí chuỗi con (không phân biệt hoa thường)',
    syntax: 'SEARCH(find_text, within_text, [start_num])',
    args: [
      ['find_text', 'Bắt buộc. Chuỗi cần tìm, được dùng ký tự đại diện * và ?.', 'Tìm chữ gì'],
      ['within_text', 'Bắt buộc. Chuỗi chứa nó.', 'Tìm trong chuỗi nào'],
      ['start_num', 'Tuỳ chọn. Vị trí bắt đầu tìm.', 'Bắt đầu tìm từ đâu']
    ],
    desc: 'Hàm <b>SEARCH</b> giống FIND nhưng không phân biệt hoa thường. Hay dùng kiểm tra một ô có chứa từ khoá hay không, ví dụ địa chỉ có chữ "Hà Nội".',
    example: {
      data: [['Địa chỉ giao', 'Nội thành HN?'], ['25 Kim Mã, Ba Đình, hà nội']],
      cell: 'B2',
      formula: '=IF(ISNUMBER(SEARCH("Hà Nội",A2)),"Có","Không")',
      note: 'Dù viết thường "hà nội" vẫn tìm thấy nên kết quả là "Có".'
    },
    tips: ['Muốn biết ô có chứa một từ hay không, dùng <code>ISNUMBER(SEARCH(...))</code>: ra TRUE là có.'],
    errors: [['#VALUE!', 'Không tìm thấy chuỗi con.']],
    lesson: 'p5/tim-thay-the'
  },
  {
    name: 'SUBSTITUTE',
    group: 'Văn bản',
    short: 'Thay chuỗi cũ bằng chuỗi mới',
    syntax: 'SUBSTITUTE(text, old_text, new_text, [instance_num])',
    args: [
      ['text', 'Bắt buộc. Chuỗi gốc.', 'Chuỗi gốc'],
      ['old_text', 'Bắt buộc. Chuỗi cần thay.', 'Chữ cần thay'],
      ['new_text', 'Bắt buộc. Chuỗi thay vào, để <code>""</code> nếu muốn xoá.', 'Thay bằng chữ gì'],
      ['instance_num', 'Tuỳ chọn. Chỉ thay lần xuất hiện thứ mấy. Bỏ trống là thay tất cả.', 'Thay lần thứ mấy']
    ],
    desc: 'Hàm <b>SUBSTITUTE</b> thay một đoạn chữ cụ thể bằng đoạn khác. Dùng xoá dấu chấm trong số điện thoại, đổi tên viết tắt, sửa hàng loạt lỗi chính tả.',
    example: {
      data: [['SĐT nhập', 'SĐT chuẩn'], ['0901.234.567']],
      cell: 'B2',
      formula: '=SUBSTITUTE(A2,".","")',
      note: 'Xoá hết dấu chấm: "0901234567".'
    },
    tips: ['Thay theo nội dung thì dùng SUBSTITUTE. Thay theo vị trí thì dùng REPLACE.'],
    errors: [],
    lesson: 'p5/tim-thay-the'
  },
  {
    name: 'REPLACE',
    group: 'Văn bản',
    short: 'Thay ký tự theo vị trí',
    syntax: 'REPLACE(old_text, start_num, num_chars, new_text)',
    args: [
      ['old_text', 'Bắt buộc. Chuỗi gốc.', 'Chuỗi gốc'],
      ['start_num', 'Bắt buộc. Vị trí bắt đầu thay.', 'Bắt đầu từ ký tự'],
      ['num_chars', 'Bắt buộc. Số ký tự bị thay.', 'Thay mấy ký tự'],
      ['new_text', 'Bắt buộc. Chuỗi thay vào.', 'Thay bằng chữ gì']
    ],
    desc: 'Hàm <b>REPLACE</b> thay một số ký tự tại vị trí cố định. Dùng che bớt số điện thoại, số tài khoản khi gửi báo cáo ra ngoài, hoặc đổi tiền tố mã.',
    example: {
      data: [['Số điện thoại', 'Đã che'], ['0901-234-567']],
      cell: 'B2',
      formula: '=REPLACE(A2,6,3,"***")',
      note: 'Thay 3 ký tự từ vị trí 6: "0901-***-567".'
    },
    tips: [],
    errors: [],
    lesson: 'p5/tim-thay-the'
  },
  {
    name: 'TEXT',
    group: 'Văn bản',
    short: 'Định dạng số, ngày thành chuỗi theo mẫu',
    syntax: 'TEXT(value, format_text)',
    args: [
      ['value', 'Bắt buộc. Số hoặc ngày cần định dạng.', 'Số/ngày cần định dạng'],
      ['format_text', 'Bắt buộc. Mã định dạng trong nháy kép, ví dụ <code>"dd/mm/yyyy"</code>, <code>"#,##0"</code>.', 'Mẫu hiển thị']
    ],
    desc: 'Hàm <b>TEXT</b> biến số hoặc ngày thành chữ theo kiểu hiển thị bạn muốn. Cần khi ghép ngày, số tiền vào câu văn, vì nếu nối thẳng, ngày sẽ hiện thành một con số khó hiểu như 45292.',
    example: {
      data: [['Số HĐ', 'Ngày ký', 'Diễn giải'], ['HĐ-089', '15/03/2024']],
      cell: 'C2',
      formula: '="Hợp đồng "&A2&" ký ngày "&TEXT(B2,"dd/mm/yyyy")',
      note: 'Nếu không có TEXT, ngày sẽ hiện thành một con số dạng 45366.'
    },
    tips: ['Kết quả của TEXT là chữ, không cộng trừ được nữa. Chỉ dùng ở bước hiển thị cuối cùng.'],
    errors: [],
    lesson: 'p5/text-value'
  },
  {
    name: 'VALUE',
    group: 'Văn bản',
    short: 'Chuyển chuỗi trông như số thành số thật',
    syntax: 'VALUE(text)',
    args: [['text', 'Bắt buộc. Chuỗi chứa số.', 'Chữ cần đổi sang số']],
    desc: 'Hàm <b>VALUE</b> đổi chữ thành số để tính toán được. Dùng sau LEFT, RIGHT, MID (vì các hàm này luôn trả về chữ) hoặc khi số liệu xuất từ phần mềm bị lưu dạng chữ.',
    example: {
      data: [['Mã lô', 'Số lượng trong mã', 'Gấp đôi'], ['LO-0250', '=VALUE(RIGHT(A2,4))']],
      cell: 'C2',
      formula: '=B2*2',
      note: 'RIGHT lấy ra "0250" dạng chữ. VALUE đổi thành số 250 nên nhân được, ra 500.'
    },
    tips: ['Mẹo nhanh: nhân chuỗi với 1 (<code>=RIGHT(A2,4)*1</code>) cũng đổi được sang số.'],
    errors: [['#VALUE!', 'Chuỗi có ký tự không phải số.']],
    lesson: 'p5/text-value'
  },
  {
    name: 'REPT',
    group: 'Văn bản',
    short: 'Lặp lại một chuỗi nhiều lần',
    syntax: 'REPT(text, number_times)',
    args: [
      ['text', 'Bắt buộc. Chuỗi cần lặp.', 'Chuỗi cần lặp'],
      ['number_times', 'Bắt buộc. Số lần lặp.', 'Lặp mấy lần']
    ],
    desc: 'Hàm <b>REPT</b> lặp lại một chuỗi. Dùng vẽ thanh tiến độ đơn giản ngay trong ô, hoặc thêm số 0 phía trước cho đủ độ dài mã.',
    example: {
      data: [['Dự án', '% hoàn thành', 'Tiến độ'], ['Kiểm kê kho', 0.6]],
      cell: 'C2',
      formula: '=REPT("|",B2*20)',
      note: '60% hiện thành 12 vạch, nhìn là biết tiến độ.'
    },
    tips: ['Thêm số 0 cho đủ 5 ký tự: <code>=REPT("0",5-LEN(A2))&A2</code>.'],
    errors: [],
    lesson: 'p5/text-value'
  },
  {
    name: 'EXACT',
    group: 'Văn bản',
    short: 'So sánh hai chuỗi giống hệt (phân biệt hoa thường)',
    syntax: 'EXACT(text1, text2)',
    args: [
      ['text1', 'Bắt buộc. Chuỗi thứ nhất.', 'Chuỗi thứ nhất'],
      ['text2', 'Bắt buộc. Chuỗi thứ hai.', 'Chuỗi thứ hai']
    ],
    desc: 'Hàm <b>EXACT</b> ra TRUE nếu hai chuỗi giống hệt nhau, phân biệt cả chữ hoa, chữ thường. So sánh bằng dấu <code>=</code> thông thường thì không phân biệt. Dùng đối chiếu mã, mật khẩu, số serial.',
    example: {
      data: [['Mã trên hệ thống', 'Mã khách gửi', 'Khớp?'], ['AbC123', 'ABC123']],
      cell: 'C2',
      formula: '=EXACT(A2,B2)',
      note: 'Khác chữ hoa thường nên kết quả là FALSE, trong khi <code>=A2=B2</code> sẽ ra TRUE.'
    },
    tips: [],
    errors: []
  },

  /* ================= NGÀY GIỜ ================= */
  {
    name: 'TODAY',
    group: 'Ngày giờ',
    short: 'Trả về ngày hôm nay',
    syntax: 'TODAY()',
    args: [],
    desc: 'Hàm <b>TODAY</b> trả về ngày hiện tại và tự cập nhật mỗi khi mở file. Dùng tính số ngày quá hạn, số ngày còn lại đến hạn hợp đồng, tuổi, thâm niên.',
    example: {
      data: [['Hoá đơn', 'Hạn thanh toán', 'Số ngày còn lại'], ['HĐ-101', '31/12/2030']],
      cell: 'C2',
      formula: '=B2-TODAY()',
      note: 'Lấy ngày hạn trừ ngày hôm nay. Kết quả thay đổi theo ngày bạn mở trang.'
    },
    tips: ['Cần ghi cố định ngày hôm nay (không tự đổi), bấm <kbd>Ctrl</kbd> + <kbd>;</kbd>.'],
    errors: [['Kết quả hiện dạng ngày', 'Đổi định dạng ô kết quả về <b>General</b> hoặc <b>Number</b>.']],
    lesson: 'p6/ngay-co-ban'
  },
  {
    name: 'NOW',
    group: 'Ngày giờ',
    short: 'Trả về ngày và giờ hiện tại',
    syntax: 'NOW()',
    args: [],
    desc: 'Hàm <b>NOW</b> trả về ngày kèm giờ phút hiện tại, tự cập nhật mỗi khi mở file hoặc sửa bảng tính. Dùng ghi thời điểm in báo cáo hoặc tính số giờ đã trôi qua.',
    example: {
      data: [['Nội dung', 'Giá trị'], ['Thời điểm xem báo cáo']],
      cell: 'B2',
      formula: '=NOW()',
      note: 'Hiện ngày giờ lúc bạn mở trang.'
    },
    tips: ['Ghi cố định giờ hiện tại: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>;</kbd>.'],
    errors: [],
    lesson: 'p6/ngay-co-ban'
  },
  {
    name: 'DATE',
    group: 'Ngày giờ',
    short: 'Tạo ngày từ năm, tháng, ngày',
    syntax: 'DATE(year, month, day)',
    args: [
      ['year', 'Bắt buộc. Năm, nên ghi đủ 4 chữ số.', 'Năm nào'],
      ['month', 'Bắt buộc. Tháng (1 đến 12, vượt quá sẽ tự chuyển năm).', 'Tháng mấy'],
      ['day', 'Bắt buộc. Ngày.', 'Ngày mấy']
    ],
    desc: 'Hàm <b>DATE</b> ghép năm, tháng, ngày thành một ngày thật mà Excel hiểu. Dùng khi năm, tháng, ngày nằm ở ba cột riêng, hoặc khi cần gõ một ngày vào công thức mà không sợ Excel hiểu nhầm.',
    example: {
      data: [['Năm', 'Tháng', 'Ngày', 'Ngày hoàn chỉnh'], [2024, 9, 15]],
      cell: 'D2',
      formula: '=DATE(A2,B2,C2)',
      note: 'Ghép thành ngày 15/09/2024.'
    },
    tips: ['<code>DATE(2024,13,1)</code> tự hiểu thành 01/01/2025, rất tiện khi cộng tháng.'],
    errors: [],
    lesson: 'p6/ngay-co-ban'
  },
  {
    name: 'DAY',
    group: 'Ngày giờ',
    short: 'Lấy ngày (1 đến 31) từ một ngày',
    syntax: 'DAY(serial_number)',
    args: [['serial_number', 'Bắt buộc. Ô chứa ngày.', 'Ô chứa ngày']],
    desc: 'Hàm <b>DAY</b> tách phần ngày trong tháng. Dùng kiểm tra đơn rơi vào nửa đầu hay nửa cuối tháng, hoặc tìm sinh nhật trong ngày.',
    example: {
      data: [['Đơn hàng', 'Ngày đặt', 'Ngày'], ['DH01', '18/07/2024']],
      cell: 'C2',
      formula: '=DAY(B2)',
      note: 'Kết quả là 18.'
    },
    tips: [],
    errors: [['#VALUE!', 'Ô ngày thực chất là chữ (căn trái). Nhập lại đúng định dạng ngày.']],
    lesson: 'p6/tach-ngay'
  },
  {
    name: 'MONTH',
    group: 'Ngày giờ',
    short: 'Lấy tháng (1 đến 12) từ một ngày',
    syntax: 'MONTH(serial_number)',
    args: [['serial_number', 'Bắt buộc. Ô chứa ngày.', 'Ô chứa ngày']],
    desc: 'Hàm <b>MONTH</b> tách tháng từ ngày. Rất hay dùng để thêm cột Tháng rồi tổng hợp doanh thu theo tháng bằng SUMIF.',
    example: {
      data: [['Đơn hàng', 'Ngày đặt', 'Tháng'], ['DH01', '18/07/2024']],
      cell: 'C2',
      formula: '=MONTH(B2)',
      note: 'Kết quả là 7.'
    },
    tips: [],
    errors: [],
    lesson: 'p6/tach-ngay'
  },
  {
    name: 'YEAR',
    group: 'Ngày giờ',
    short: 'Lấy năm từ một ngày',
    syntax: 'YEAR(serial_number)',
    args: [['serial_number', 'Bắt buộc. Ô chứa ngày.', 'Ô chứa ngày']],
    desc: 'Hàm <b>YEAR</b> tách năm từ ngày. Dùng tính tuổi gần đúng, nhóm dữ liệu theo năm, hoặc lọc hợp đồng ký trong năm nay.',
    example: {
      data: [['Nhân viên', 'Ngày vào làm', 'Năm vào'], ['Lê Văn Cường', '01/03/2019']],
      cell: 'C2',
      formula: '=YEAR(B2)',
      note: 'Kết quả là 2019.'
    },
    tips: ['Tuổi chính xác đến ngày nên dùng DATEDIF thay vì lấy hiệu hai năm.'],
    errors: [],
    lesson: 'p6/tach-ngay'
  },
  {
    name: 'WEEKDAY',
    group: 'Ngày giờ',
    short: 'Cho biết ngày rơi vào thứ mấy trong tuần',
    syntax: 'WEEKDAY(serial_number, [return_type])',
    args: [
      ['serial_number', 'Bắt buộc. Ô chứa ngày.', 'Ô chứa ngày'],
      ['return_type', 'Tuỳ chọn. 1 hoặc bỏ trống: Chủ nhật = 1, Thứ Hai = 2… Thứ Bảy = 7 (khớp cách gọi "thứ" của người Việt). 2: Thứ Hai = 1… Chủ nhật = 7.', 'Cách đánh số thứ']
    ],
    desc: 'Hàm <b>WEEKDAY</b> trả về số thứ tự của ngày trong tuần. Dùng đánh dấu ngày cuối tuần trong bảng chấm công, tính phụ cấp làm Chủ nhật.',
    example: {
      data: [['Ngày', 'Thứ (số)', 'Cuối tuần?'], ['05/10/2024', '=WEEKDAY(A2)']],
      cell: 'C2',
      formula: '=IF(OR(B2=1,B2=7),"Cuối tuần","Ngày thường")',
      note: '05/10/2024 là Thứ Bảy nên WEEKDAY ra 7, công thức đánh dấu "Cuối tuần".'
    },
    tips: ['Với kiểu mặc định, số trả về khớp luôn tên thứ: 2 là Thứ Hai, 7 là Thứ Bảy, chỉ riêng Chủ nhật là 1.'],
    errors: [],
    lesson: 'p6/tach-ngay'
  },
  {
    name: 'WEEKNUM',
    group: 'Ngày giờ',
    short: 'Cho biết ngày thuộc tuần thứ mấy trong năm',
    syntax: 'WEEKNUM(serial_number, [return_type])',
    args: [
      ['serial_number', 'Bắt buộc. Ô chứa ngày.', 'Ô chứa ngày'],
      ['return_type', 'Tuỳ chọn. 1 hoặc bỏ trống: tuần bắt đầu Chủ nhật. 2: tuần bắt đầu Thứ Hai.', 'Tuần bắt đầu thứ mấy']
    ],
    desc: 'Hàm <b>WEEKNUM</b> trả về số tuần trong năm. Dùng tổng hợp báo cáo theo tuần: sản lượng tuần, số đơn giao mỗi tuần.',
    example: {
      data: [['Đơn hàng', 'Ngày giao', 'Tuần số'], ['DH01', '15/01/2024']],
      cell: 'C2',
      formula: '=WEEKNUM(B2,2)',
      note: 'Tính tuần bắt đầu từ Thứ Hai, 15/01/2024 thuộc tuần thứ 3 của năm.'
    },
    tips: ['Văn phòng Việt Nam thường tính tuần từ Thứ Hai, nên dùng return_type = 2.'],
    errors: [],
    lesson: 'p6/tach-ngay'
  },
  {
    name: 'DATEDIF',
    group: 'Ngày giờ',
    short: 'Tính khoảng cách giữa hai ngày theo năm, tháng, ngày',
    syntax: 'DATEDIF(start_date, end_date, unit)',
    args: [
      ['start_date', 'Bắt buộc. Ngày bắt đầu.', 'Từ ngày'],
      ['end_date', 'Bắt buộc. Ngày kết thúc, phải sau ngày bắt đầu.', 'Đến ngày'],
      ['unit', 'Bắt buộc. <code>"Y"</code> số năm tròn, <code>"M"</code> số tháng tròn, <code>"D"</code> số ngày, <code>"YM"</code> số tháng lẻ sau khi bỏ năm, <code>"MD"</code> số ngày lẻ.', 'Tính theo năm/tháng/ngày']
    ],
    desc: 'Hàm <b>DATEDIF</b> tính số năm, tháng hoặc ngày tròn giữa hai ngày. Dùng tính thâm niên, tuổi, thời hạn hợp đồng. Khi gõ, Excel không gợi ý hàm này nhưng bạn cứ gõ đủ là chạy được.',
    example: {
      data: [['Nhân viên', 'Ngày vào làm', 'Ngày tính', 'Thâm niên (năm)'], ['Lê Văn Cường', '01/03/2019', '30/09/2024']],
      cell: 'D2',
      formula: '=DATEDIF(B2,C2,"Y")',
      note: 'Từ 01/03/2019 đến 30/09/2024 được 5 năm tròn.'
    },
    tips: ['Ghi "5 năm 6 tháng": <code>=DATEDIF(B2,C2,"Y")&" năm "&DATEDIF(B2,C2,"YM")&" tháng"</code>.'],
    errors: [['#NUM!', 'Ngày bắt đầu sau ngày kết thúc.']],
    lesson: 'p6/khoang-cach'
  },
  {
    name: 'DAYS',
    group: 'Ngày giờ',
    short: 'Tính số ngày giữa hai ngày',
    syntax: 'DAYS(end_date, start_date)',
    args: [
      ['end_date', 'Bắt buộc. Ngày kết thúc.', 'Đến ngày'],
      ['start_date', 'Bắt buộc. Ngày bắt đầu.', 'Từ ngày']
    ],
    desc: 'Hàm <b>DAYS</b> trả về số ngày giữa hai ngày, tương đương lấy ngày sau trừ ngày trước. Dùng tính số ngày lưu kho, số ngày giao hàng, số ngày nợ.',
    example: {
      data: [['Lô hàng', 'Ngày nhập kho', 'Ngày xuất kho', 'Số ngày lưu kho'], ['LO-01', '05/08/2024', '27/08/2024']],
      cell: 'D2',
      formula: '=DAYS(C2,B2)',
      note: 'Lô hàng lưu kho 22 ngày.'
    },
    tips: ['Chú ý thứ tự: ngày kết thúc đứng trước, ngày bắt đầu đứng sau.'],
    errors: [],
    lesson: 'p6/khoang-cach',
    since: 'Excel 2013'
  },
  {
    name: 'EDATE',
    group: 'Ngày giờ',
    short: 'Cộng hoặc trừ một số tháng vào ngày',
    syntax: 'EDATE(start_date, months)',
    args: [
      ['start_date', 'Bắt buộc. Ngày gốc.', 'Ngày gốc'],
      ['months', 'Bắt buộc. Số tháng cộng thêm, số âm để lùi lại.', 'Cộng thêm mấy tháng']
    ],
    desc: 'Hàm <b>EDATE</b> trả về ngày sau (hoặc trước) một số tháng. Dùng tính ngày hết hạn hợp đồng, hết thử việc, hết bảo hành.',
    example: {
      data: [['Nhân viên', 'Ngày vào', 'Số tháng thử việc', 'Hết thử việc'], ['Phạm Thu Dung', '15/08/2024', 2]],
      cell: 'D2',
      formula: '=EDATE(B2,C2)',
      note: 'Hết thử việc vào 15/10/2024.'
    },
    tips: ['Nếu kết quả hiện thành số, đổi định dạng ô sang Date.'],
    errors: [],
    lesson: 'p6/edate'
  },
  {
    name: 'EOMONTH',
    group: 'Ngày giờ',
    short: 'Trả về ngày cuối tháng',
    syntax: 'EOMONTH(start_date, months)',
    args: [
      ['start_date', 'Bắt buộc. Ngày gốc.', 'Ngày gốc'],
      ['months', 'Bắt buộc. 0 là cuối tháng hiện tại, 1 là cuối tháng sau, -1 là cuối tháng trước.', 'Cách mấy tháng']
    ],
    desc: 'Hàm <b>EOMONTH</b> trả về ngày cuối cùng của tháng. Dùng tính hạn thanh toán "cuối tháng sau", ngày chốt công nợ, số ngày trong tháng.',
    example: {
      data: [['Hoá đơn', 'Ngày xuất', 'Hạn thanh toán (cuối tháng sau)'], ['HĐ-205', '12/01/2024']],
      cell: 'C2',
      formula: '=EOMONTH(B2,1)',
      note: 'Cuối tháng sau của 12/01/2024 là 29/02/2024 (năm nhuận).'
    },
    tips: ['Số ngày trong tháng: <code>=DAY(EOMONTH(B2,0))</code>.'],
    errors: [],
    lesson: 'p6/edate'
  },
  {
    name: 'NETWORKDAYS',
    group: 'Ngày giờ',
    short: 'Đếm số ngày làm việc giữa hai ngày',
    syntax: 'NETWORKDAYS(start_date, end_date, [holidays])',
    args: [
      ['start_date', 'Bắt buộc. Ngày bắt đầu (được tính).', 'Từ ngày'],
      ['end_date', 'Bắt buộc. Ngày kết thúc (được tính).', 'Đến ngày'],
      ['holidays', 'Tuỳ chọn. Vùng chứa các ngày nghỉ lễ cần trừ thêm.', 'Danh sách ngày lễ']
    ],
    desc: 'Hàm <b>NETWORKDAYS</b> đếm số ngày làm việc (Thứ Hai đến Thứ Sáu) giữa hai ngày, có thể trừ thêm ngày lễ. Dùng tính số ngày công chuẩn trong tháng, thời gian xử lý hồ sơ theo ngày làm việc.',
    example: {
      data: [['Từ ngày', 'Đến ngày', 'Ngày lễ', 'Ngày làm việc'], ['01/04/2024', '30/04/2024', '18/04/2024']],
      cell: 'D2',
      formula: '=NETWORKDAYS(A2,B2,C2)',
      note: 'Tháng 4/2024 có 22 ngày Thứ Hai đến Thứ Sáu, trừ ngày Giỗ Tổ 18/04 còn 21 ngày.'
    },
    tips: ['Nếu công ty làm cả sáng Thứ Bảy, Excel thật có hàm <code>NETWORKDAYS.INTL</code> để chọn ngày nghỉ.'],
    errors: [],
    lesson: 'p6/ngay-lam-viec'
  },
  {
    name: 'WORKDAY',
    group: 'Ngày giờ',
    short: 'Tính ngày sau một số ngày làm việc',
    syntax: 'WORKDAY(start_date, days, [holidays])',
    args: [
      ['start_date', 'Bắt buộc. Ngày bắt đầu.', 'Ngày bắt đầu'],
      ['days', 'Bắt buộc. Số ngày làm việc cộng thêm.', 'Thêm mấy ngày làm việc'],
      ['holidays', 'Tuỳ chọn. Vùng các ngày nghỉ lễ.', 'Danh sách ngày lễ']
    ],
    desc: 'Hàm <b>WORKDAY</b> trả về ngày sau một số ngày làm việc, bỏ qua Thứ Bảy, Chủ nhật và ngày lễ. Dùng tính hạn xử lý hồ sơ, ngày giao hàng dự kiến.',
    example: {
      data: [['Ngày nhận hồ sơ', 'Số ngày xử lý', 'Hạn trả kết quả'], ['04/10/2024', 5]],
      cell: 'C2',
      formula: '=WORKDAY(A2,B2)',
      note: 'Nhận Thứ Sáu 04/10/2024, cộng 5 ngày làm việc ra Thứ Sáu 11/10/2024.'
    },
    tips: [],
    errors: [],
    lesson: 'p6/ngay-lam-viec'
  },
  {
    name: 'HOUR',
    group: 'Ngày giờ',
    short: 'Lấy giờ (0 đến 23) từ giá trị thời gian',
    syntax: 'HOUR(serial_number)',
    args: [['serial_number', 'Bắt buộc. Ô chứa giờ.', 'Ô chứa giờ']],
    desc: 'Hàm <b>HOUR</b> tách phần giờ. Dùng trong chấm công để xét đi muộn, hoặc phân loại đơn theo khung giờ sáng, chiều, tối.',
    example: {
      data: [['Nhân viên', 'Giờ vào', 'Giờ'], ['Nguyễn Văn An', '08:17']],
      cell: 'C2',
      formula: '=HOUR(B2)',
      note: 'Kết quả là 8.'
    },
    tips: [],
    errors: [],
    lesson: 'p6/gio'
  },
  {
    name: 'MINUTE',
    group: 'Ngày giờ',
    short: 'Lấy phút (0 đến 59) từ giá trị thời gian',
    syntax: 'MINUTE(serial_number)',
    args: [['serial_number', 'Bắt buộc. Ô chứa giờ.', 'Ô chứa giờ']],
    desc: 'Hàm <b>MINUTE</b> tách phần phút. Kết hợp HOUR để tính số phút đi muộn so với giờ quy định.',
    example: {
      data: [['Nhân viên', 'Giờ vào', 'Số phút đi muộn (sau 08:00)'], ['Nguyễn Văn An', '08:17']],
      cell: 'C2',
      formula: '=(HOUR(B2)-8)*60+MINUTE(B2)',
      note: 'Vào lúc 08:17 nên đi muộn 17 phút.'
    },
    tips: [],
    errors: [],
    lesson: 'p6/gio'
  },
  {
    name: 'TIME',
    group: 'Ngày giờ',
    short: 'Tạo giá trị thời gian từ giờ, phút, giây',
    syntax: 'TIME(hour, minute, second)',
    args: [
      ['hour', 'Bắt buộc. Giờ.', 'Mấy giờ'],
      ['minute', 'Bắt buộc. Phút.', 'Mấy phút'],
      ['second', 'Bắt buộc. Giây.', 'Mấy giây']
    ],
    desc: 'Hàm <b>TIME</b> ghép giờ, phút, giây thành một mốc thời gian. Dùng làm mốc so sánh trong công thức chấm công, ví dụ giờ vào quy định 8:00.',
    example: {
      data: [['Nhân viên', 'Giờ vào', 'Đúng giờ?'], ['Trần Thị Bình', '07:55']],
      cell: 'C2',
      formula: '=IF(B2<=TIME(8,0,0),"Đúng giờ","Đi muộn")',
      note: 'Vào 07:55, trước 8:00 nên "Đúng giờ".'
    },
    tips: ['Muốn ra số giờ làm, lấy giờ ra trừ giờ vào rồi nhân với 24, ví dụ <code>=(C2-B2)*24</code>. Lý do: Excel coi 1 giờ là 1/24 ngày.'],
    errors: [],
    lesson: 'p6/gio'
  },

  /* ================= TÌM KIẾM ================= */
  {
    name: 'VLOOKUP',
    group: 'Tìm kiếm',
    short: 'Dò tìm theo cột, trả về giá trị cùng hàng',
    syntax: 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
    args: [
      ['lookup_value', 'Bắt buộc. Giá trị cần tìm, thường là mã.', 'Tìm cái gì'],
      ['table_array', 'Bắt buộc. Bảng tra, cột đầu tiên phải chứa giá trị cần tìm. Nên khoá $.', 'Tìm trong bảng nào'],
      ['col_index_num', 'Bắt buộc. Lấy kết quả ở cột thứ mấy của bảng tra (tính từ 1).', 'Lấy cột thứ mấy'],
      ['range_lookup', 'Tuỳ chọn. 0 (FALSE) tìm chính xác. 1 (TRUE) tìm gần đúng, dùng cho bảng bậc thang.', 'Tìm chính xác hay gần đúng']
    ],
    desc: 'Hàm <b>VLOOKUP</b> tìm một mã ở cột đầu tiên của bảng tra, rồi lấy thông tin ở cột bạn chọn trên cùng dòng đó. Dùng tra đơn giá theo mã hàng, tra tên nhân viên theo mã nhân viên. Đây là hàm tra cứu phổ biến nhất văn phòng.',
    example: {
      data: [['Mã', 'Tên hàng', 'Đơn giá', '', 'Mã cần tìm', 'Đơn giá'], ['SP01', 'Bút bi', 5000, '', 'SP02'], ['SP02', 'Giấy A4', 68000], ['SP03', 'Kẹp giấy', 15000]],
      cell: 'F2',
      formula: '=VLOOKUP(E2,$A$2:$C$4,3,0)',
      note: 'Tìm SP02 trong cột A, lấy cột thứ 3 (Đơn giá): 68.000 đ.'
    },
    tips: ['Khi tra mã, luôn ghi số 0 ở cuối công thức. Nếu quên, Excel tìm gần đúng và có thể ra kết quả sai mà không báo lỗi.', 'VLOOKUP chỉ tra được sang phải. Cần tra sang trái thì dùng INDEX + MATCH hoặc XLOOKUP.'],
    errors: [
      ['#N/A', 'Không tìm thấy mã. Kiểm tra dấu cách thừa, mã dạng số và dạng chữ lẫn lộn, hoặc vùng tra chưa khoá $.'],
      ['#REF!', 'col_index_num lớn hơn số cột của bảng tra.']
    ],
    lesson: 'p7/vlookup'
  },
  {
    name: 'HLOOKUP',
    group: 'Tìm kiếm',
    short: 'Dò tìm theo hàng, trả về giá trị cùng cột',
    syntax: 'HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])',
    args: [
      ['lookup_value', 'Bắt buộc. Giá trị cần tìm ở hàng đầu bảng.', 'Tìm cái gì'],
      ['table_array', 'Bắt buộc. Bảng tra nằm ngang.', 'Tìm trong bảng nào'],
      ['row_index_num', 'Bắt buộc. Lấy kết quả ở hàng thứ mấy của bảng tra.', 'Lấy hàng thứ mấy'],
      ['range_lookup', 'Tuỳ chọn. 0 tìm chính xác, 1 tìm gần đúng.', 'Tìm chính xác hay gần đúng']
    ],
    desc: 'Hàm <b>HLOOKUP</b> giống VLOOKUP nhưng dùng cho bảng xếp ngang: tìm ở hàng đầu tiên, lấy kết quả ở hàng bên dưới. Dùng với bảng phụ cấp theo chức vụ, bảng giá theo vùng xếp ngang.',
    example: {
      data: [['Chức vụ', 'NV', 'TP', 'GĐ'], ['Phụ cấp', 500000, 2000000, 5000000], [], ['Chức vụ cần tra', 'TP', 'Phụ cấp']],
      cell: 'D4',
      formula: '=HLOOKUP(B4,$B$1:$D$2,2,0)',
      note: 'Tìm "TP" ở hàng 1, lấy hàng 2: phụ cấp 2.000.000 đ.'
    },
    tips: [],
    errors: [['#N/A', 'Không tìm thấy giá trị ở hàng đầu của bảng tra.']],
    lesson: 'p7/hlookup'
  },
  {
    name: 'INDEX',
    group: 'Tìm kiếm',
    short: 'Lấy giá trị tại vị trí hàng, cột trong vùng',
    syntax: 'INDEX(array, row_num, [column_num])',
    args: [
      ['array', 'Bắt buộc. Vùng dữ liệu.', 'Lấy trong vùng nào'],
      ['row_num', 'Bắt buộc. Thứ tự hàng trong vùng.', 'Hàng thứ mấy'],
      ['column_num', 'Tuỳ chọn. Thứ tự cột trong vùng.', 'Cột thứ mấy']
    ],
    desc: 'Hàm <b>INDEX</b> lấy giá trị ở dòng thứ mấy, cột thứ mấy trong một vùng. Dùng riêng thì ít gặp, nhưng ghép với MATCH sẽ thành cặp tra cứu linh hoạt hơn VLOOKUP.',
    example: {
      data: [['Mã NV', 'Họ tên', 'Phòng', '', 'Mã cần tìm', 'Họ tên'], ['NV01', 'Nguyễn Văn An', 'Kế toán', '', 'NV03'], ['NV02', 'Trần Thị Bình', 'Kinh doanh'], ['NV03', 'Lê Văn Cường', 'Kho']],
      cell: 'F2',
      formula: '=INDEX($B$2:$B$4,MATCH(E2,$A$2:$A$4,0))',
      note: 'MATCH tìm NV03 ở vị trí 3, INDEX lấy tên ở vị trí đó: "Lê Văn Cường".'
    },
    tips: ['INDEX + MATCH tra được cả cột nằm bên trái, và không bị sai khi chèn thêm cột vào bảng.'],
    errors: [['#REF!', 'Số hàng hoặc số cột vượt ra ngoài vùng.']],
    lesson: 'p7/index-match'
  },
  {
    name: 'MATCH',
    group: 'Tìm kiếm',
    short: 'Tìm vị trí của giá trị trong một hàng hoặc cột',
    syntax: 'MATCH(lookup_value, lookup_array, [match_type])',
    args: [
      ['lookup_value', 'Bắt buộc. Giá trị cần tìm.', 'Tìm cái gì'],
      ['lookup_array', 'Bắt buộc. Một hàng hoặc một cột để tìm.', 'Tìm trong cột/hàng nào'],
      ['match_type', 'Tuỳ chọn. 0 tìm chính xác (nên dùng). 1 hoặc -1 tìm gần đúng trên danh sách đã sắp xếp.', 'Tìm chính xác hay gần đúng']
    ],
    desc: 'Hàm <b>MATCH</b> cho biết giá trị nằm ở vị trí thứ mấy trong danh sách (ra số thứ tự, không ra giá trị). Thường dùng chung với INDEX để biết cần lấy dòng nào, hoặc để kiểm tra một mã có trong danh sách không.',
    example: {
      data: [['Danh sách kho', '', 'Kho cần tìm', 'Vị trí'], ['Kho Hà Nội', '', 'Kho Đà Nẵng'], ['Kho Đà Nẵng'], ['Kho HCM']],
      cell: 'D2',
      formula: '=MATCH(C2,A2:A4,0)',
      note: '"Kho Đà Nẵng" nằm ở vị trí thứ 2 trong danh sách.'
    },
    tips: ['Khi tìm mã hoặc tên, luôn ghi số 0 ở cuối công thức.'],
    errors: [['#N/A', 'Không có giá trị trong danh sách.']],
    lesson: 'p7/index-match'
  },
  {
    name: 'XLOOKUP',
    group: 'Tìm kiếm',
    short: 'Tra cứu linh hoạt theo mọi hướng, thay VLOOKUP',
    syntax: 'XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])',
    args: [
      ['lookup_value', 'Bắt buộc. Giá trị cần tìm.', 'Tìm cái gì'],
      ['lookup_array', 'Bắt buộc. Cột (hoặc hàng) để tìm.', 'Tìm ở cột nào'],
      ['return_array', 'Bắt buộc. Cột (hoặc hàng) chứa kết quả.', 'Lấy kết quả cột nào'],
      ['if_not_found', 'Tuỳ chọn. Kết quả hiện ra khi không tìm thấy.', 'Không thấy thì hiện gì'],
      ['match_mode', 'Tuỳ chọn. 0 chính xác (mặc định), -1 hoặc 1 lấy giá trị gần nhất nhỏ hơn hoặc lớn hơn.', 'Chính xác hay gần nhất'],
      ['search_mode', 'Tuỳ chọn. 1 tìm từ trên xuống (mặc định), -1 tìm từ dưới lên.', 'Tìm từ trên hay dưới']
    ],
    desc: 'Hàm <b>XLOOKUP</b> là bản nâng cấp của VLOOKUP: mặc định tìm chính xác, tra được cột bên trái, không phải đếm cột và ghi sẵn được thông báo khi không tìm thấy. Nếu công ty dùng Excel 365, nên ưu tiên hàm này.',
    example: {
      data: [['Họ tên', 'Mã NV', 'Phòng', '', 'Mã cần tìm', 'Họ tên'], ['Nguyễn Văn An', 'NV01', 'Kế toán', '', 'NV02'], ['Trần Thị Bình', 'NV02', 'Kinh doanh'], ['Lê Văn Cường', 'NV03', 'Kho']],
      cell: 'F2',
      formula: '=XLOOKUP(E2,B2:B4,A2:A4,"Không có")',
      note: 'Cột tên nằm bên trái cột mã, VLOOKUP không làm được nhưng XLOOKUP tra ra "Trần Thị Bình".'
    },
    tips: ['Người nhận dùng Excel 2016 trở về trước sẽ thấy lỗi <code>#NAME?</code>. Khi đó hãy dùng INDEX + MATCH.'],
    errors: [['#NAME?', 'Phiên bản Excel không có XLOOKUP.'], ['#N/A', 'Không tìm thấy và không ghi if_not_found.']],
    lesson: 'p7/xlookup',
    since: 'Excel 365 / 2021'
  },
  {
    name: 'CHOOSE',
    group: 'Tìm kiếm',
    short: 'Chọn một giá trị theo số thứ tự',
    syntax: 'CHOOSE(index_num, value1, [value2], ...)',
    args: [
      ['index_num', 'Bắt buộc. Số thứ tự của giá trị cần chọn (bắt đầu từ 1).', 'Chọn giá trị thứ mấy'],
      ['value1', 'Bắt buộc. Giá trị thứ nhất.', 'Giá trị thứ nhất'],
      ['value2, ...', 'Tuỳ chọn. Các giá trị tiếp theo.', 'Các giá trị tiếp theo']
    ],
    desc: 'Hàm <b>CHOOSE</b> lấy giá trị thứ n trong danh sách bạn liệt kê. Hay dùng đổi số thành chữ: số quý thành tên quý, số thứ trong tuần thành tên thứ.',
    example: {
      data: [['Ngày', 'Thứ'], ['07/10/2024']],
      cell: 'B2',
      formula: '=CHOOSE(WEEKDAY(A2),"Chủ nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy")',
      note: 'WEEKDAY trả về 2, CHOOSE lấy giá trị thứ 2: "Thứ Hai".'
    },
    tips: [],
    errors: [['#VALUE!', 'index_num nhỏ hơn 1 hoặc lớn hơn số giá trị liệt kê.']],
    lesson: 'p7/ket-hop'
  },
  {
    name: 'ROW',
    group: 'Tìm kiếm',
    short: 'Trả về số hàng của một ô',
    syntax: 'ROW([reference])',
    args: [['reference', 'Tuỳ chọn. Ô cần lấy số hàng. Bỏ trống là ô đang chứa công thức.', 'Ô cần lấy số hàng']],
    desc: 'Hàm <b>ROW</b> trả về số thứ tự hàng. Dùng đánh số thứ tự tự động: khi xoá hoặc chèn dòng, số thứ tự vẫn liền mạch.',
    example: {
      data: [['STT', 'Họ tên'], ['', 'Nguyễn Văn An'], ['', 'Trần Thị Bình']],
      cell: 'A2',
      formula: '=ROW()-1',
      note: 'Ô A2 ở hàng 2, trừ 1 dòng tiêu đề ra số thứ tự 1. Kéo xuống sẽ ra 2, 3…'
    },
    tips: [],
    errors: []
  },
  {
    name: 'COLUMN',
    group: 'Tìm kiếm',
    short: 'Trả về số cột của một ô',
    syntax: 'COLUMN([reference])',
    args: [['reference', 'Tuỳ chọn. Ô cần lấy số cột. Bỏ trống là ô đang chứa công thức.', 'Ô cần lấy số cột']],
    desc: 'Hàm <b>COLUMN</b> trả về số thứ tự cột (A = 1, B = 2…). Hay dùng trong VLOOKUP để số cột cần lấy tự tăng khi kéo công thức sang phải.',
    example: {
      data: [['Mã', 'Tên hàng', 'Đơn giá', '', 'Mã', 'Tên hàng'], ['SP01', 'Bút bi', 5000, '', 'SP01'], ['SP02', 'Giấy A4', 68000]],
      cell: 'F2',
      formula: '=VLOOKUP($E2,$A$2:$C$3,COLUMN(B1),0)',
      note: 'COLUMN(B1) ra 2 nên lấy cột Tên hàng. Kéo sang phải thành COLUMN(C1) = 3, tự lấy Đơn giá.'
    },
    tips: [],
    errors: []
  },

  /* ================= THÔNG TIN ================= */
  {
    name: 'ISBLANK',
    group: 'Thông tin',
    short: 'Kiểm tra ô có trống không',
    syntax: 'ISBLANK(value)',
    args: [['value', 'Bắt buộc. Ô cần kiểm tra.', 'Ô cần kiểm tra']],
    desc: 'Hàm <b>ISBLANK</b> trả về TRUE nếu ô hoàn toàn trống. Dùng đánh dấu những dòng chưa nhập đủ thông tin, ví dụ chưa có ngày giao.',
    example: {
      data: [['Đơn hàng', 'Ngày giao', 'Tình trạng'], ['DH07']],
      cell: 'C2',
      formula: '=IF(ISBLANK(B2),"Chưa giao","Đã giao")',
      note: 'Ô ngày giao còn trống nên hiện "Chưa giao".'
    },
    tips: ['Ô chứa công thức trả về <code>""</code> trông trống nhưng ISBLANK vẫn ra FALSE. Khi đó dùng <code>B2=""</code>.'],
    errors: [],
    lesson: 'p3/iferror'
  },
  {
    name: 'ISNUMBER',
    group: 'Thông tin',
    short: 'Kiểm tra giá trị có phải số không',
    syntax: 'ISNUMBER(value)',
    args: [['value', 'Bắt buộc. Ô hoặc giá trị cần kiểm tra.', 'Ô cần kiểm tra']],
    desc: 'Hàm <b>ISNUMBER</b> ra TRUE nếu ô chứa số (kể cả ngày). Dùng phát hiện số bị lưu nhầm thành chữ, hoặc ghép với SEARCH để kiểm tra ô có chứa một từ nào đó.',
    example: {
      data: [['Đơn hàng', 'Số tiền', 'Là số?'], ['DH01', '1.500.000 VNĐ']],
      cell: 'C2',
      formula: '=ISNUMBER(B2)',
      note: 'Người nhập gõ kèm chữ "VNĐ" nên ô này là chữ, kết quả FALSE. SUM sẽ bỏ qua ô này.'
    },
    tips: [],
    errors: [],
    lesson: 'p3/iferror'
  },
  {
    name: 'ISTEXT',
    group: 'Thông tin',
    short: 'Kiểm tra giá trị có phải chữ không',
    syntax: 'ISTEXT(value)',
    args: [['value', 'Bắt buộc. Ô hoặc giá trị cần kiểm tra.', 'Ô cần kiểm tra']],
    desc: 'Hàm <b>ISTEXT</b> trả về TRUE nếu giá trị là chữ. Dùng kiểm tra dữ liệu nhập sai kiểu, ví dụ cột số lượng có người gõ "hai mươi".',
    example: {
      data: [['Mặt hàng', 'Số lượng', 'Nhập sai?'], ['Bút bi', 'hai mươi']],
      cell: 'C2',
      formula: '=ISTEXT(B2)',
      note: 'Ô số lượng chứa chữ nên kết quả là TRUE.'
    },
    tips: [],
    errors: [],
    lesson: 'p3/iferror'
  },
  {
    name: 'ISERROR',
    group: 'Thông tin',
    short: 'Kiểm tra giá trị có phải lỗi không',
    syntax: 'ISERROR(value)',
    args: [['value', 'Bắt buộc. Ô hoặc công thức cần kiểm tra.', 'Ô cần kiểm tra']],
    desc: 'Hàm <b>ISERROR</b> ra TRUE nếu ô bị bất kỳ lỗi nào (#N/A, #DIV/0!, #VALUE!…). Dùng để đếm hoặc đánh dấu các dòng lỗi cần rà soát, thay vì giấu lỗi đi bằng IFERROR.',
    example: {
      data: [['Chi nhánh', 'Doanh thu', 'Số đơn', 'TB/đơn', 'Có lỗi?'], ['Huế', 5000000, 0, '=B2/C2']],
      cell: 'E2',
      formula: '=ISERROR(D2)',
      note: 'D2 bị #DIV/0! nên kết quả là TRUE.'
    },
    tips: ['Chỉ muốn kiểm tra lỗi không tìm thấy (#N/A) thì dùng ISNA.'],
    errors: []
  },

  /* ================= HÀM MẢNG ĐỘNG (chỉ giới thiệu) ================= */
  {
    name: 'FILTER',
    group: 'Tìm kiếm',
    short: 'Lọc các dòng thoả điều kiện ra vùng mới',
    syntax: 'FILTER(array, include, [if_empty])',
    args: [
      ['array', 'Bắt buộc. Vùng dữ liệu cần lọc.', 'Vùng cần lọc'],
      ['include', 'Bắt buộc. Điều kiện lọc, ví dụ <code>B2:B100="Hà Nội"</code>.', 'Điều kiện lọc'],
      ['if_empty', 'Tuỳ chọn. Kết quả khi không dòng nào thoả.', 'Không có thì hiện gì']
    ],
    desc: 'Hàm <b>FILTER</b> lấy ra những dòng thoả điều kiện, kết quả tự hiện xuống các ô bên dưới và tự cập nhật khi bảng gốc thay đổi. Chỉ có ở <b>Excel 365 / 2021</b> trở lên. Bảng tính mini trên web chưa chạy được hàm này, bạn hãy thử trên Excel thật, ví dụ <code>=FILTER(A2:C100,B2:B100="Hà Nội","Không có")</code>.',
    tips: ['Các ô bên dưới công thức phải để trống cho kết quả hiện ra, nếu không sẽ báo lỗi <code>#SPILL!</code>.', 'Excel cũ không có FILTER: dùng <b>Data › Filter</b> hoặc kết hợp COUNTIFS.'],
    errors: [['#SPILL!', 'Vùng kết quả tràn ra bị vướng dữ liệu. Xoá các ô bên dưới.'], ['#CALC!', 'Không dòng nào thoả và chưa ghi if_empty.']],
    since: 'Excel 365 / 2021',
    supported: false
  },
  {
    name: 'UNIQUE',
    group: 'Tìm kiếm',
    short: 'Lấy danh sách giá trị không trùng',
    syntax: 'UNIQUE(array, [by_col], [exactly_once])',
    args: [
      ['array', 'Bắt buộc. Vùng cần lấy giá trị duy nhất.', 'Vùng cần lọc trùng'],
      ['by_col', 'Tuỳ chọn. TRUE để so sánh theo cột, mặc định so theo hàng.', 'So theo cột?'],
      ['exactly_once', 'Tuỳ chọn. TRUE để chỉ lấy giá trị xuất hiện đúng một lần.', 'Chỉ xuất hiện một lần']
    ],
    desc: 'Hàm <b>UNIQUE</b> trả về danh sách đã loại bỏ trùng lặp, ví dụ danh sách khách hàng từ bảng đơn hàng. Chỉ có ở <b>Excel 365 / 2021</b> trở lên. Bảng tính mini trên web chưa chạy được hàm này, hãy thử trên Excel thật: <code>=UNIQUE(B2:B100)</code>.',
    tips: ['Kết hợp <code>=SORT(UNIQUE(B2:B100))</code> để vừa lọc trùng vừa sắp xếp.', 'Excel cũ: dùng <b>Data › Remove Duplicates</b>.'],
    errors: [['#SPILL!', 'Vùng kết quả bị vướng dữ liệu.']],
    since: 'Excel 365 / 2021',
    supported: false
  },
  {
    name: 'SORT',
    group: 'Tìm kiếm',
    short: 'Sắp xếp một vùng bằng công thức',
    syntax: 'SORT(array, [sort_index], [sort_order], [by_col])',
    args: [
      ['array', 'Bắt buộc. Vùng cần sắp xếp.', 'Vùng cần sắp xếp'],
      ['sort_index', 'Tuỳ chọn. Sắp theo cột thứ mấy, mặc định 1.', 'Sắp theo cột mấy'],
      ['sort_order', 'Tuỳ chọn. 1 tăng dần (mặc định), -1 giảm dần.', 'Tăng hay giảm dần'],
      ['by_col', 'Tuỳ chọn. TRUE để sắp theo cột.', 'Sắp theo chiều ngang?']
    ],
    desc: 'Hàm <b>SORT</b> tạo một bản sao đã sắp xếp của bảng, bảng gốc giữ nguyên. Dùng làm bảng xếp hạng doanh số tự cập nhật. Chỉ có ở <b>Excel 365 / 2021</b> trở lên. Bảng tính mini trên web chưa chạy được hàm này, hãy thử trên Excel thật: <code>=SORT(A2:B20,2,-1)</code>.',
    tips: ['Excel cũ: dùng <b>Data › Sort</b>, hoặc LARGE + INDEX/MATCH để làm bảng top.'],
    errors: [['#SPILL!', 'Vùng kết quả bị vướng dữ liệu.']],
    since: 'Excel 365 / 2021',
    supported: false
  }
]);
