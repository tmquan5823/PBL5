export function totalAmount(transactions, isIncome) {
    if (transactions && transactions.length > 0) {
        return transactions.reduce((total, transaction) => {
            const amount = !(isIncome ^ transaction.category.income) ? transaction.amount : 0;
            return total + amount;
        }, 0);
    }
    return 0;
}

