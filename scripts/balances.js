import { readByLine, sleep } from "../src/helpers.js";
import { logger } from "../src/logger.js";
import {
  SLEEP_BETWEEN_CHECK_BALANCES_SEC,
  NATIVE_PRICE_USD,
  NATIVE_TICK,
} from "../config.js";
import { getAccount } from "../src/getAccount.js";
import { getAccountsFromFile } from "../src/getAccountsFromFile.js";

const main = async () => {
  const accounts = getAccountsFromFile();

  for (const { mnemonic } of accounts) {
    const { address, nativeAmount, usdAmount } = await getAccount(mnemonic);

    logger.info(`${address} - ${nativeAmount} ${NATIVE_TICK} - $${usdAmount}`);

    await sleep(SLEEP_BETWEEN_CHECK_BALANCES_SEC);
  }

  logger.info("done");
};

main();
