const filterData = (transactions, walletIds, categoryIds, note, dateStart, dateEnd, type) => {
    return transactions.filter(item => {
        // Check walletId
        if (walletIds.length > 0 && !walletIds.includes(item.wallet_id)) {
            return false;
        }

        // Check categoryId
        if (categoryIds.length > 0 && !categoryIds.includes(item.category_id)) {
            return false;
        }

        // Check note
        if (note && item.note.toLowerCase().indexOf(note.toLowerCase()) === -1) {
            return false;
        }

        // Check dateStart and dateEnd
        if (dateStart && !isDateAfter(item.date_transaction, dateStart)) {
            return false;
        }
        if (dateEnd && !isDateBefore(item.date_transaction, dateEnd)) {
            return false;
        }

        if (type) {
            const isIncome = item.amount > 0;
            if (type === 'income' && !isIncome) {
                return false;
            }
            if (type === 'outcome' && isIncome) {
                return false;
            }
        }

        // All conditions met, include item in filtered result
        return true;
    });
}


const filterWallet = (wallets, walletIds) => {
    return wallets.filter(item => {
        if (walletIds.length > 0 && !walletIds.includes(item.id)) {
            return false;
        }
        return true;
    })
}


//AreaChart 
const dataAreaChart = (transactions, wallets) => {
    // Khởi tạo một object để lưu trữ kết quả tính toán tạm thời
    const tempData = {};

    // Bước 1: Tính tổng số tiền khởi điểm từ các ví
    const moneyAtFirst = wallets.reduce((acc, wallet) => acc + wallet.moneyAtFirst, 0);

    // Bước 2: Chuyển đổi ngày từ dạng mảng thành chuỗi ngày dạng "YYYY-MM-DD"
    const transactionsWithFormattedDate = transactions.map(transaction => {
        const [year, month, day] = transaction.date_transaction;
        return {
            ...transaction,
            formatted_date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        };
    });

    // Bước 3: Tính tổng số tiền cho mỗi ngày và lưu vào object tempData
    transactionsWithFormattedDate.forEach(transaction => {
        const date = transaction.formatted_date;
        if (!tempData[date]) {
            tempData[date] = 0;
        }
        tempData[date] += transaction.amount;
    });

    // Bước 4: Chuyển đổi object tempData thành mảng các object với ngày và tổng số tiền
    const formattedResult = Object.keys(tempData).map(date => {
        return {
            date,
            amount: tempData[date] + moneyAtFirst // Cộng tổng số tiền từ giao dịch với số tiền khởi điểm
        };
    });

    return formattedResult;
};


//BarChart
const dataBarChart = (transactions) => {
    // Khởi tạo một object để lưu trữ kết quả tính toán tạm thời
    const tempData = {};

    // Bước 1: Chuyển đổi ngày từ dạng mảng thành chuỗi ngày dạng "YYYY-MM-DD"
    const transactionsWithFormattedDate = transactions.map(transaction => {
        const [year, month, day] = transaction.date_transaction;
        return {
            ...transaction,
            formatted_date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        };
    });

    // Bước 2: Tính tổng số tiền cho mỗi ngày và lưu vào object tempData
    transactionsWithFormattedDate.forEach(transaction => {
        const date = transaction.formatted_date;
        if (!tempData[date]) {
            tempData[date] = { income: 0, outcome: 0 };
        }
        if (transaction.amount >= 0) {
            tempData[date].income += transaction.amount;
        } else {
            tempData[date].outcome += transaction.amount;
        }
    });

    // Bước 3: Chuyển đổi object tempData thành mảng các object với ngày, thu nhập và chi tiêu
    const formattedResult = Object.keys(tempData).map(date => {
        return {
            date,
            "Thu nhập": tempData[date].income,
            "Chi tiêu": tempData[date].outcome < 0 ? -tempData[date].outcome : 0
        };
    });

    return formattedResult;
};



// Function to check if a date is after another date
const isDateAfter = (dateArray, comparisonDate) => {
    const [year, month, day] = dateArray;
    const [compYear, compMonth, compDay] = comparisonDate;
    const date = new Date(year, month - 1, day); // Subtract 1 from month because JavaScript months are 0-indexed
    const compDate = new Date(compYear, compMonth - 1, compDay);
    return date >= compDate;
}

// Function to check if a date is before another date
const isDateBefore = (dateArray, comparisonDate) => {
    const [year, month, day] = dateArray;
    const [compYear, compMonth, compDay] = comparisonDate;
    const date = new Date(year, month - 1, day); // Subtract 1 from month because JavaScript months are 0-indexed
    const compDate = new Date(compYear, compMonth - 1, compDay);
    return date <= compDate;
}



export { filterData, filterWallet, dataAreaChart, dataBarChart };
