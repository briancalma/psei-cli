import axios from "axios";

const figlet = require("figlet");
const { Command } = require("commander");

const appName: string = "PSEI-cli";

const program = new Command();

console.log(figlet.textSync(appName));

program
  .version("1.0.0")
  .description("A simple cli tool for fetching Philippine Stocks details.")
  .option(
    "-s, --stock <stock>",
    "fetched latest stock data using supplied stock symbol"
  )
  .parse(process.argv);

const options = program.opts();

// console.log("[options]:", options);

const fetchStock = async (stock: string) => {
  const response = await axios.get(
    `http://phisix-api.appspot.com/stocks/${stock}.json`
  );

  console.log("[fetchStock]:", response.data);
};

if (options.stock) {
  fetchStock(options.stock);
}
