export function DateFormat(ngay) {
  // Tách các thành phần của ngày (ngày, tháng, năm)
  var parts = ngay.split("/");
  var ngaySo = parseInt(parts[0], 10);
  var thangSo = parseInt(parts[1], 10);
  var namSo = parseInt(parts[2], 10);

  // Mảng chứa các tên của tháng
  var arrTenThang = [
    "Th01", "Th02", "Th03", "Th04", "Th05", "Th06",
    "Th07", "Th08", "Th09", "Th10", "Th11", "Th12"
  ];

  // Chuyển đổi tháng thành tên của tháng
  var tenThang = arrTenThang[thangSo - 1];

  // Tạo ngày đã chuyển đổi
  var ngayChuyenDoi = tenThang + " " + ngaySo + ", " + namSo;

  return ngayChuyenDoi;
}

export function convertMonthFormat(dateArray) {
  // Kiểm tra xem mảng có đủ 3 phần tử không
  if (dateArray.length !== 3) {
    return "Ngày tháng không hợp lệ";
  }

  // Trừ 1 từ giá trị tháng
  dateArray[1]--;

  return dateArray;
}
