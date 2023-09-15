"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const figlet = require("figlet");
const { Command } = require("commander");
const appName = "PSEI-cli";
const program = new Command();
console.log(figlet.textSync(appName));
program
    .version("1.0.0")
    .description("A simple cli tool for fetching Philippine Stocks details.")
    .option("-s, --stock <stock>", "fetched latest stock data using supplied stock symbol")
    .parse(process.argv);
const options = program.opts();
// console.log("[options]:", options);
const fetchStock = (stock) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`http://phisix-api.appspot.com/stocks/${stock}.json`);
    console.log("[fetchStock]:", response.data);
});
if (options.stock) {
    fetchStock(options.stock);
}
