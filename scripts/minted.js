import axios from "axios";
import { logger } from "../src/logger.js";
import {
  appendFile,
  fileNameNowPrefix,
  readByLine,
  readFile,
  sleep,
} from "../src/helpers.js";
import { initializeFilesAndFolders } from "../src/initializeFilesAndFolders.js";
import {
  MEMO,
  MINTED_API_URL,
  MINT_AMOUNT_UNATIVE,
  NATIVE_DENOM,
  SLEEP_BETWEEN_CHECK_MINTED_SEC,
  SLEEP_BETWEEN_GET_TRANSACTIONS_SEC,
} from "../config.js";
import { getAccountsFromFile } from "../src/getAccountsFromFile.js";
import { getAccount } from "../src/getAccount.js";

const checkIsTransactionMinted = async (/** @type {string} */ hash) => {
  try {
    const url = `${MINTED_API_URL}/${hash}/raw`;
    const response = await axios.get(url);
    const body = response.data.tx.body;
    const message = body.messages[0];
    const amount = message.amount[0];
    return (
      message.from_address === message.to_address &&
      amount.denom === NATIVE_DENOM &&
      amount.amount === MINT_AMOUNT_UNATIVE.toString() &&
      body.memo === MEMO
    );
  } catch (error) {
    logger.error(error.message);
    return false;
  }
};

const main = async () => {
  if (!MINTED_API_URL) {
    logger.error("this module currently does not work in this network");
    return;
  }

  const FOLDER_OUTPUT = `./output/minted_${fileNameNowPrefix()}.txt`;
  const FOLDER_TXS = "./output/accountTransactions";

  const accounts = getAccountsFromFile();

  let errorsCount = 0;
  let mintedSum = 0;

  for (const account of accounts) {
    let address = account.address;

    if (!address) {
      const chainAccount = await getAccount(account.mnemonic);
      address = chainAccount.address;
    }

    try {
      const { transactions } = JSON.parse(
        readFile(`${FOLDER_TXS}/${address}.json`)
      );

      let mintedCount = 0;

      for (const tx of transactions) {
        const isMinted = await checkIsTransactionMinted(tx.hash);
        logger.info(`${address} ${isMinted} ${MINTED_API_URL}/${tx.hash}/raw`);
        if (isMinted) mintedCount += 1;
        await sleep(SLEEP_BETWEEN_CHECK_MINTED_SEC);
      }

      appendFile(`${FOLDER_OUTPUT}`, `${address},${mintedCount}`);
      errorsCount = 0;
      mintedSum += mintedCount;
    } catch (error) {
      logger.error(`${address} error - ${error.message}`);
      appendFile(`${FOLDER_OUTPUT}`, `${address},${error.message}\n`);
      await sleep(SLEEP_BETWEEN_CHECK_MINTED_SEC * errorsCount);
      errorsCount += 1;
    }

    await sleep(SLEEP_BETWEEN_GET_TRANSACTIONS_SEC);
  }

  logger.info(`Minted sum: ${mintedSum}`);
};

main();
