import * as dotenv from "dotenv";
dotenv.config();

export const fileName = 'data.csv'

export const CRYPTO_COMPARE_API_KEY = process.env.CRYPTO_COMPARE_API_KEY ?? "";
export const CRYPTO_COMPARE_API_URL = process.env.CRYPTO_COMPARE_API_URL ?? "";
export const CSV_DIR = process.env.CSV_DIR ?? "";