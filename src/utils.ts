import fetch from "node-fetch";
import { enumTransactionType } from "./enums";
import { Token } from "./interfaces";

export const isDeposit = (transactionType: enumTransactionType) => {
  return transactionType === enumTransactionType.DEPOSIT;
};

export const isWithdrawal = (transactionType: enumTransactionType) => {
  return transactionType === enumTransactionType.WITHDRAWAL;
};

export const convertToNum = (num: string) => {
  return isNaN(parseFloat(num)) ? 0 : parseFloat(num);
};

export const getUSDEquivalent = async (
  apiKey: string,
  url: string,
  token: string
) => {
  try {
    const response = await fetch(`${url}/data/price?fsym=${token}&tsyms=USD`, {
      headers: {
        authorization: `Apikey ${apiKey}`,
      },
    });
    const responseJson = await response.json();
    return responseJson?.USD ?? 0;
  } catch (err) {
    throw err;
  }
};

export const getYearMonthDay = (dateStr: string) => {
  const dDate = new Date(dateStr);
  const year = dDate.getFullYear();
  const month = dDate.getMonth() + 1;
  const day = dDate.getDate();

  return `${year}-${month}-${day}`;
};

export const convertToUSD = (amount: number, usdEquivalent: number) => {
  return amount * usdEquivalent;
};

export const outputPortfolio = (tokens: Token[]) => {
  //@NOTE: Will output portfolio of user
  console.info("PORTFOLIO");
  tokens.forEach((item) => {
    console.info(`TOKEN: ${item.token} VALUE: ${item.value}`);
  });
};

export const isDifferentToken = (argToken: any, rowToken: string) => {
  return argToken && typeof argToken === "string" && argToken !== rowToken;
};

export const shouldNotProcessDate = (argDate: any, rowTimestamp: string) => {
  return (
    argDate &&
    typeof argDate === "string" &&
    getYearMonthDay(argDate) < rowTimestamp
  );
};
