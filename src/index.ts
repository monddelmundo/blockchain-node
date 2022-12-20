import csv from "csv-parser";
import * as fs from "fs";
import {
  CRYPTO_COMPARE_API_KEY,
  CRYPTO_COMPARE_API_URL,
  CSV_DIR,
  fileName,
} from "./constants";
import {
  convertToNum,
  convertToUSD,
  outputPortfolio,
  getUSDEquivalent,
  getYearMonthDay,
  isDeposit,
  isWithdrawal,
  isDifferentToken,
  shouldNotProcessDate,
} from "./utils";
import minimist from "minimist";
import { CsvRows, Token } from "./interfaces";
import { enumCSVColumns } from "./enums";

let csvRows: CsvRows[] = [];
const argv = minimist(process.argv.slice(2));

const main = async () => {
  fs.createReadStream(CSV_DIR ?? fileName)
    .pipe(csv())
    .on("data", (data) => {
      const rowToken = data[enumCSVColumns.TOKEN];
      const rowAmount = convertToNum(data[enumCSVColumns.AMOUNT]);
      const rowTimestamp = getYearMonthDay(data[enumCSVColumns.TIMESTAMP]);
      if (isDifferentToken(argv.token, rowToken)) {
        return;
      }
      if (shouldNotProcessDate(argv.date, rowTimestamp)) {
        return;
      }
      let existingTokenRecord = csvRows.find((item) => item.token === rowToken);
      if (existingTokenRecord) {
        if (isDeposit(data[enumCSVColumns.TYPE])) {
          existingTokenRecord.amount += rowAmount;
        } else if (isWithdrawal(data[enumCSVColumns.TYPE])) {
          existingTokenRecord.amount -= rowAmount;
        }
      } else {
        csvRows.push({
          amount: isDeposit(data[enumCSVColumns.TYPE])
            ? rowAmount
            : isWithdrawal(data[enumCSVColumns.TYPE])
            ? rowAmount * -1
            : 0,
          token: rowToken,
          timestamp: rowTimestamp,
        });
      }
    })
    .on("end", async () => {
      let responseTokens: Token[] = [];
      try {
        responseTokens = await Promise.all(
          csvRows.map(async (tokenItem) => {
            let equivalent = 0;
            try {
              equivalent = await getUSDEquivalent(
                CRYPTO_COMPARE_API_KEY,
                CRYPTO_COMPARE_API_URL,
                tokenItem.token
              );
            } catch (e) {
              console.error(
                "Error Occurred while fetching equivalent for symbol " +
                  tokenItem.token
              );
            }
            return {
              token: tokenItem.token,
              value: convertToUSD(tokenItem.amount, equivalent),
            };
          })
        );
      } catch (e) {
        console.error("Error occurred while fetching portfolio. ");
      }
      outputPortfolio(responseTokens);
    });
};

main();
