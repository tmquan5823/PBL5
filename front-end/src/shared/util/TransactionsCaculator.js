export function totalAmount(transactions, isIncome) {
    if (transactions) {
        return transactions.reduce((total, transaction) => {
            const amount = !(isIncome ^ transaction.category.income) ? transaction.amount : 0;
            return total + amount;
        }, 0);
    } 
    return 0;
}

