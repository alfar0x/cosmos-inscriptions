import {
  EXPLORER,
  FEE,
  GAS,
  MEMO,
  MINT_AMOUNT_UNATIVE,
  NATIVE_DENOM,
  NATIVE_TICK,
  SLEEP_BETWEEN_ACCOUNT_TXS_SEC,
  SLEEP_ON_GET_ACCOUNT_ERROR_SEC,
} from "../config.js";
import { sleep } from "../src/helpers.js";
import { logger } from "../src/logger.js";
import { getAccount } from "../src/getAccount.js";
import { SigningStargateClient } from "@cosmjs/stargate";
import { getAccountsFromFile } from "../src/getAccountsFromFile.js";

export const sendTx = async (
  /** @type {number} */ accountIdx,
  /** @type {string} */ address,
  /** @type {SigningStargateClient} */ signingClient
) => {
  const { transactionHash } = await signingClient.sendTokens(
    address,
    address,
    [{ denom: NATIVE_DENOM, amount: MINT_AMOUNT_UNATIVE.toString() }],
    {
      amount: [{ denom: NATIVE_DENOM, amount: FEE.toString() }],
      gas: GAS.toString(),
    },
    MEMO
  );

  const txUrl = `${EXPLORER}/${transactionHash}`;

  logger.info(`[${accountIdx}] ${address} - ${txUrl}`);
};

const getAccountWrapped = async (
  /** @type {number} */ accountIdx,
  /** @type {string} */ mnemonic
) => {
  while (true) {
    try {
      return await getAccount(mnemonic);
    } catch (error) {
      logger.error(`[${accountIdx}] init error - ${error.message}`);
      await sleep(SLEEP_ON_GET_ACCOUNT_ERROR_SEC);
    }
  }
};

const processAccount = async (
  /** @type {number} */ accountIdx,
  /** @type {string} */ mnemonic
) => {
  const account = await getAccountWrapped(accountIdx, mnemonic);

  logger.warn(
    `[${accountIdx}] ${account.address} started - ${account.nativeAmount} ${NATIVE_TICK} ($${account.usdAmount})`
  );

  while (true) {
    try {
      await sendTx(accountIdx, account.address, account.signingClient);
      await sleep(SLEEP_BETWEEN_ACCOUNT_TXS_SEC);
    } catch (error) {
      logger.error(
        `[${accountIdx}] ${account.address} tx error - ${error.message}`
      );

      if (error?.message?.includes("is smaller than")) {
        logger.warn(
          `[${accountIdx}] ${account.address} remove due to small balance`
        );
        return;
      }

      await sleep(SLEEP_ON_GET_ACCOUNT_ERROR_SEC);
    }
  }
};

const main = async () => {
  const accounts = getAccountsFromFile();

  for (let idx = 0; idx < accounts.length; idx += 1) {
    processAccount(idx, accounts[idx].mnemonic);
  }
};

main();
