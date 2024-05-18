import fetchData from './fetchdata.js';
import { filterData, filterWallet, dataAreaChart, dataBarChart } from './chartCaculate.js';


// Sử dụng fetchData để lấy dữ liệu JSON
(async () => {
    try {
        const data = await fetchData();
        console.log(data);
        //Xu ly tinh toan
        const categories = data.list_categories
        const wallets = data.list_wallets
        const transactions = data.list_transactions

        // Filter
        const filteredTransactions = filterData(
            transactions,
            [4, 5], // walletIds
            [], // categoryIds
            null, // note
            [2024, 5, 1], // dateStart
            [2024, 5, 31], // dateEnd
            'outcome'   //income outcome
        );

        const filteredWallets = filterWallet(
            wallets,
            [4, 5]
        )
        console.log(filteredTransactions)
        console.log(filteredWallets)

        //AreaChart

        console.log(dataAreaChart(filteredTransactions, filteredWallets))

        //BarChart

        console.log(dataBarChart(transactions))

        //IncomeDonutChart

        //OutComeDonutChart

    } catch (error) {
        console.error('Error:', error);
    }
})();
