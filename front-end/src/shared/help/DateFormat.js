import moment from 'moment';

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

export function formatArrayDate(dateArray) {
  return moment(new Date(dateArray[0], dateArray[1] - 1, dateArray[2])).format('MMM DD, YYYY').replace('May', 'Th05');
};

export function convertMonthFormat(dateArray) {
  if (dateArray.length !== 3) {
    return "Ngày tháng không hợp lệ";
  }

  dateArray[1]--;

  return dateArray;
}


export function formatArrayDate2(dateArray) {
  // Lấy thông tin từ mảng
  const [year, month, day] = dateArray;

  // Chuyển đổi số tháng thành tên tháng
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = monthNames[month - 1];

  // Tạo chuỗi định dạng
  const formattedDate = `${monthName}${day < 10 ? '0' + day : day}, ${year}`;

  return formattedDate;
};

export function budgetDateFormat(date) {
  if (date) {
    var date = new Date(date);

    var monthNames = ["Th01", "Th02", "Th03", "Th04", "Th05", "Th06", "Th07", "Th08", "Th09", "Th10", "Th11", "Th12"];
    var month = monthNames[date.getMonth()];

    var day = date.getDate();
    var year = date.getFullYear();

    var newDateString = month + " " + day + ", " + year;
    return newDateString;
  }
  return new Date();
}

export function UTC7Date(date) {
  const currentDate = new Date(date);
  currentDate.setHours(currentDate.getHours() + 7);
  return currentDate;
}
