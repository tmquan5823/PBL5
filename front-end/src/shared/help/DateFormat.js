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

export function dateToArray(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Tháng trong JavaScript được đếm từ 0 (0 là tháng 1)
  const day = date.getDate();
  return [year, month, day];
};

export function messageDateTimeFormat(timestamp) {
  const date = new Date(
    timestamp[0],          // year
    timestamp[1] - 1,      // month (0-based index)
    timestamp[2],          // day
    timestamp[3],          // hours
    timestamp[4],          // minutes
    timestamp[5],          // seconds
    Math.floor(timestamp[6] / 1000000)  // milliseconds
  );
  const today = new Date();
  const isToday = date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const timeString = `${hours}:${minutes}`;

  if (isToday) {
    return timeString;
  } else {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return `${dateString} ${timeString}`;
  }
};
