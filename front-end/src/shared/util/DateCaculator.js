export function dateCaculate(start, end) {
    if (start && end) {
        const startDate = new Date(start);
        const endDate = new Date(...end);

        // Tính hiệu của hai ngày để lấy số mili giây
        const timeDifference = endDate.getTime() - startDate.getTime();

        // Chuyển đổi số mili giây thành số ngày
        const numberOfDays = timeDifference / (1000 * 3600 * 24);
        return numberOfDays
    }
    return 0;
}