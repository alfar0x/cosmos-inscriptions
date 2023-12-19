import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { ADDRESS_PREFIX, RPC } from "../config.js";
import { getAccountBalance } from "./getAccountBalance.js";

const { fromMnemonic } = DirectSecp256k1HdWallet;
const { connectWithSigner } = SigningStargateClient;

export const getAccount = async (/** @type {string} */ mnemonic) => {
  const signer = await fromMnemonic(mnemonic, { prefix: ADDRESS_PREFIX });

  const account = await signer.getAccounts();
  const address = account[0].address;
  const signingClient = await connectWithSigner(RPC, signer);

  const { nativeAmount, usdAmount } = await getAccountBalance(
    signingClient,
    address
  );

  return { mnemonic, address, signingClient, nativeAmount, usdAmount };
};
