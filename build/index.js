var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from "commander";
import ora from "ora";
import axios from "axios";
import chalk from "chalk";
import Table from "cli-table3";
import { APP_DESCRIPTION, APP_VERSION, PHISIX_API_URL, } from "./types/configs.js";
import { formatDate, formatMoneyToPHP } from "./helpers/formatters.js";
const fetchStock = (symbol) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const spinner = ora("Fetching stock data...");
    try {
        spinner.start();
        const targetURL = symbol == "all"
            ? `${PHISIX_API_URL}/stocks.json`
            : `${PHISIX_API_URL}/stocks/${symbol}.json`;
        const response = yield axios.get(targetURL);
        const stockData = response.data;
        spinner.stop();
        const lastUpdatedAt = formatDate(stockData.as_of);
        (_a = stockData.stock) === null || _a === void 0 ? void 0 : _a.forEach((stock) => {
            const table = new Table();
            table.push({ Name: stock.name });
            table.push({ Symbol: stock.symbol });
            table.push({ Price: formatMoneyToPHP(stock.price.amount) });
            table.push({ "Percent Change": stock.percent_change });
            table.push({ Volume: stock.volume });
            table.push({ "As of": lastUpdatedAt });
            console.log(table.toString());
        });
    }
    catch (error) {
        spinner.stop();
        console.log(chalk.red("Failed to fetch stock data."));
        // console.log("[error]:", error);
    }
});
const program = new Command();
program.name("psei-cli").description(APP_DESCRIPTION).version(APP_VERSION);
program
    .command("get-stock")
    .description("Fetch stock data using Stock Symbol")
    .argument("<symbol>", "stock symbol")
    .action((symbol, options) => {
    fetchStock(symbol);
});
program.parse(process.argv);
