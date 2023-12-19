import axios from "axios";
import { logger } from "../src/logger.js";
import { sleep, writeFile } from "../src/helpers.js";
import { initializeFilesAndFolders } from "../src/initializeFilesAndFolders.js";
import { SLEEP_BETWEEN_GET_TRANSACTIONS_SEC, TXS_API_URL } from "../config.js";
import { getAccountsFromFile } from "../src/getAccountsFromFile.js";
import { getAccount } from "../src/getAccount.js";

const getAccountTransactions = async (
  /** @type {string} */ address,
  /** @type {string=} */ cursor
) => {
  try {
    const paramsObj = { limit: "100", category: "all" };
    if (cursor) paramsObj.cursor = cursor;
    const params = new URLSearchParams(paramsObj).toString();
    const url = `${TXS_API_URL}/${address}/txs?${params}`;
    logger.info(url);
    const response = await axios.get(url);

    const result = response.data.data;

    if (response.data.next_cursor) {
      await sleep(SLEEP_BETWEEN_GET_TRANSACTIONS_SEC);
      const nextPageTransactions = await getAccountTransactions(
        address,
        response.data.next_cursor
      );
      result.push(...nextPageTransactions);
    }

    return result;
  } catch (error) {
    logger.error(error.message);
    return [];
  }
};

const main = async () => {
  if (!TXS_API_URL) {
    logger.error("this module currently does not work in this network");
    return;
  }

  const FOLDER_OUTPUT = "./output/accountTransactions";
  initializeFilesAndFolders([FOLDER_OUTPUT]);

  const accounts = getAccountsFromFile();

  for (const account of accounts) {
    let address = account.address;

    if (!address) {
      const chainAccount = await getAccount(account.mnemonic);
      address = chainAccount.address;
    }

    const transactions = await getAccountTransactions(address);

    writeFile(
      `${FOLDER_OUTPUT}/${address}.json`,
      JSON.stringify({ transactions }, null, 2)
    );

    await sleep(SLEEP_BETWEEN_GET_TRANSACTIONS_SEC);
  }
};

main();
