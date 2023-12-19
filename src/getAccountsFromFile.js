import { readByLine } from "./helpers";

const { FILE_ACCOUNTS } = require("../config");
const { initializeFilesAndFolders } = require("./initializeFilesAndFolders");

export const getAccountsFromFile = () => {
  initializeFilesAndFolders([FILE_ACCOUNTS]);

  const accounts = readByLine(FILE_ACCOUNTS);

  if (!accounts.length) throw new Error(`${FILE_ACCOUNTS} file is empty`);

  return accounts.map((account) => {
    const [mnemonic, address] = account.split(",");
    return { mnemonic, address };
  });
};
