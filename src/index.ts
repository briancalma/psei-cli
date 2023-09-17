import { Command } from "commander";
import ora from "ora";
import axios from "axios";
import chalk from "chalk";
import Table from "cli-table3";

export const PHISIX_API_URL = "http://phisix-api3.appspot.com/";
export const APP_NAME = "psei-cli";
export const APP_DESCRIPTION =
  "A simple cli tool for fetching Philippine Stocks details.";
export const APP_VERSION = "1.0.0";

export type Price = {
  currency: string;
  amount: number;
};

export type Stock = {
  name: string;
  price: Price;
  percent_change: number;
  volume: number;
  symbol: string;
};

export type PhisixApiResponse = {
  stock: Stock[];
  as_of: string;
};

const program = new Command();

// console.log(figlet.textSync(APP_NAME));

program
  .version(APP_VERSION)
  .description(APP_DESCRIPTION)
  .option(
    "-s, --stock <symbol>",
    "fetched latest stock data using supplied stock symbol",
    "BDO"
  )
  .parse(process.argv);

const options = program.opts();

const moneyToPhpFormat = (amount: number): string => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  const formattedAmount = formatter.format(amount);
  return formattedAmount;
};

const formatDate = (dateString: string): string => {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Array of month names for formatting
  const monthNames = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  // Extracting individual components
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  // Formatting AM or PM
  let period = "AM";
  if (hour >= 12) {
    period = "PM";
  }
  const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

  // Formatting minutes to have leading zeros
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Putting it all together
  return `${month} ${day}, ${year} ${hour12}:${formattedMinutes} ${period}`;
};

const fetchStock = async (symbol: null | string) => {
  const spinner = ora("Fetching stock data...");
  const table = new Table();

  try {
    spinner.start();
    const response = await axios.get(`${PHISIX_API_URL}/stocks/${symbol}.json`);

    const stockData: PhisixApiResponse = response.data;
    spinner.stop();
    // console.log("[stockData]:", stockData);

    const lastUpdatedAt = formatDate(stockData.as_of);

    stockData.stock?.forEach((stock: Stock) => {
      table.push({ Name: stock.name });
      table.push({ Symbol: stock.symbol });
      table.push({ Price: moneyToPhpFormat(stock.price.amount) });
      table.push({ "Percent Change": stock.percent_change });
      table.push({ Volume: stock.volume });
      table.push({ "As of": lastUpdatedAt });
    });

    console.log(table.toString());
  } catch (error: any) {
    spinner.stop();
    console.log(chalk.red("Failed to fetch stock data."));
  }
};

if (options.stock) fetchStock(options.stock);
