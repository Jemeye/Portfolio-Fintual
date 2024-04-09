//class Stock that has two attributes, the name and an array of prices and dates.
class Stock {
    constructor(name, prices){
        this.name = name;
        this.prices = prices;
    }

    //function to get price by date
    getPriceByDate(date){
        if (!this.prices.hasOwnProperty(date)){
            throw new Error('Date not found');
        }
        return this.prices[date];
    }
}

//class Portafolio that has an array of stocks
class Portfolio {
    constructor(stocks){
        this.stocks = stocks;
    }

    //function to get total profit
    profit(startDate, endDate) {
        let totalProfit = 0;
        this.stocks.forEach((stock) => {
            let price = stock.getPriceByDate(endDate);
            let prevPrice = stock.getPriceByDate(startDate);
            
            if (price !== null && prevPrice !== null) {
                totalProfit += (price - prevPrice);
            }
        })
        return totalProfit;
    }

    //function to get annualized return
    annualizedReturn(startDate, endDate){
        const totalProfit = this.profit(startDate, endDate);
        const initialInvestment = this.getInitialInvestment();
        const startDateTime = new Date (startDate);
        const endDateTime = new Date (endDate);
        const timeDifference = endDateTime - startDateTime;
        const days = timeDifference / (1000 * 60 * 60 * 24);
        if (days === 0) {
            return 0.0;
        } else {
            return ((totalProfit / initialInvestment) ** (365 / days) - 1) * 100;
        }

    }

    //function to get initial investment
    getInitialInvestment () {
        let initialInvestment = 0;
        const initialDate = "2023-01-01"; 
        for (const stock of this.stocks) {
          initialInvestment += stock.getPriceByDate(initialDate);
        }
        return initialInvestment;
    }
}

//function to load data
const loadData = () => {

    const data = require('./stock.json');
    let stocks = [];
    data.stocks.forEach(stock => {
        stocks.push(new Stock(stock.name, stock.prices));
    })
    const portfolio = new Portfolio(stocks);
    console.log(`Portfolio value: ${portfolio.getInitialInvestment()}`);
    console.log(`Annualized return: ${portfolio.annualizedReturn("2023-01-01", "2023-10-01")}%`);
    console.log(`Total profit: ${portfolio.profit("2023-01-01", "2023-10-01")}`);
}

loadData();

