import { Command } from "commander";
import ora from "ora";
import axios from "axios";
import chalk from "chalk";
import Table from "cli-table3";
import moment from "moment";
import {
  APP_DESCRIPTION,
  APP_VERSION,
  PHISIX_API_URL,
} from "./types/configs.js";
import { PhisixApiResponse, Stock } from "./types/stocks.js";
import { formatDate, formatMoneyToPHP } from "./helpers/formatters.js";

const fetchStock = async (symbol: null | string) => {
  const spinner = ora("Fetching stock data...");
  try {
    spinner.start();

    const targetURL =
      symbol == "all"
        ? `${PHISIX_API_URL}/stocks.json`
        : `${PHISIX_API_URL}/stocks/${symbol}.json`;

    const response = await axios.get(targetURL);

    const stockData: PhisixApiResponse = response.data;

    spinner.stop();

    const lastUpdatedAt = formatDate(stockData.as_of);

    stockData.stock?.forEach((stock: Stock) => {
      const table = new Table();
      table.push({ Name: stock.name });
      table.push({ Symbol: stock.symbol });
      table.push({ Price: formatMoneyToPHP(stock.price.amount) });
      table.push({ "Percent Change": stock.percent_change });
      table.push({ Volume: stock.volume });
      table.push({ "As of": lastUpdatedAt });
      console.log(table.toString());
    });
  } catch (error: any) {
    spinner.stop();
    console.log(chalk.red("Failed to fetch stock data."));
    // console.log("[error]:", error);
  }
};

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
