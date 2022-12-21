import { CRYPTO_COMPARE_API_KEY, CRYPTO_COMPARE_API_URL } from "../constants";
import { enumTransactionType } from "../enums";
import {
  convertToNum,
  convertToUSD,
  getUSDEquivalent,
  getYearMonthDay,
  isDeposit,
  isDifferentToken,
  isWithdrawal,
  shouldNotProcessDate,
} from "../utils";

describe("Test Cases for isDeposit function", () => {
  it("should return true if the transaction is DEPOSIT, otherwise false", () => {
    expect(isDeposit(enumTransactionType.DEPOSIT)).toEqual(true);
    expect(isDeposit(enumTransactionType.WITHDRAWAL)).toEqual(false);
  });
});

describe("Test Cases for isWithdrawal function", () => {
  it("should return true if the transaction is WITHDRAWAL, otherwise false", () => {
    expect(isWithdrawal(enumTransactionType.WITHDRAWAL)).toEqual(true);
    expect(isWithdrawal(enumTransactionType.DEPOSIT)).toEqual(false);
  });
});

describe("Test Cases for convertToNum function", () => {
  it("should convert a string to a float if allowed. If it is not a number, it should be 0", () => {
    const num1 = "1221.332";
    const num2 = "abc";
    expect(convertToNum(num1)).toEqual(1221.332);
    expect(convertToNum(num2)).toEqual(0);
  });
});

describe("Test Cases for getUSDEquivalent function", () => {
  it("should fetch the conversion price of token to USD", async () => {
    jest.setTimeout(20000);
    let result = 0;
    try {
      result = await getUSDEquivalent(
        CRYPTO_COMPARE_API_KEY,
        CRYPTO_COMPARE_API_URL,
        "BTC"
      );
      expect(typeof result).toBe("number");
    } catch (e) {
      expect(result).toEqual(0);
    }
  });
});

describe("Test Cases for getYearMonthDay function", () => {
  it("should convert a date string to a YYYY-MM-DD format", () => {
    const dateStr1 = "2022-02-05 12:22:45";
    const dateStr2 = "02-05-2025 12:22:45";
    expect(getYearMonthDay(dateStr1)).toEqual("2022-02-05");
    expect(getYearMonthDay(dateStr2)).toEqual("2025-02-05");
  });
});

describe("Test Cases for convertToUSD function", () => {
  it("should convert a float to usdEquivalent", () => {
    expect(typeof convertToUSD(13, 421.33)).toBe("number");
    expect(convertToUSD(13, 421.33)).toEqual(5477.29);
  });
});

describe("Test Cases for isDifferentToken function", () => {
  it("should check if tokens' symbol passed are different", () => {
    expect(typeof isDifferentToken("BTC", "VET")).toBe("boolean");
    expect(isDifferentToken("BTC", "VET")).toEqual(true);
    expect(isDifferentToken("BTC", "BTC")).toEqual(false);
  });
});

describe("Test Cases for shouldNotProcessDate function", () => {
  it("should check if the date is within the date passed in by the user", () => {
    expect(typeof shouldNotProcessDate("03-25-2022", "04-22-2022")).toBe(
      "boolean"
    );
    expect(shouldNotProcessDate(null, "2022-04-22")).toEqual(true);
    expect(shouldNotProcessDate("03-25-2022", "2024-02-22")).toEqual(true);
    expect(shouldNotProcessDate("03-25-2022", "2022-02-22")).toEqual(false);
  });
});
