# Cosmos Inscriptions by [Alfar](https://t.me/+FozX3VZA0RIyNWY6)

# This script is currently under development. Use it at your own risk!

## Install
1. Download and install [Node.js](https://nodejs.org/en/download).
2. Install dependencies using the `npm install` command in the project root.
3. Create a `config.js` file and fill it as in the `config.{token}.example.js` example file.
4. `input/accounts.txt` - add mnemonics and addresses here (format: `mnemonic,address` or `mnemonic`)

## Available tokens
1. CIAS - celestia insctiption - `config.cias.example.js`
1. INJS - injective insctiption - `config.injs.example.js`

## Available Commands
- `npm run mint` - mint token
- `npm run generate` - generate empty accounts
- `npm run dispatch` - send tokens from the first account (in `accounts.txt`) to each account in the file
- `npm run withdraw` - withdraw native to exchange from all accounts
- `npm run balances` - check balances
- `npm run addresses` - get addresses from `accounts.txt`
- `npm run transactions` - download blockchain transactions data of addresses from `accounts.txt` into `output/accountTransactions/` (cias only)
- `npm run minted` - check how many transactions minted tokens (using `output/accountTransactions`) (cias only)

## Config Variables

### Common Configuration

- **EXPLORER**: The URL for exploring transactions on the blockchain.
- **RPC**: The URL for the Remote Procedure Call (RPC) endpoint used for communication with the Injective Protocol network.
- **NATIVE_PRICE_USD**: The current price of the native token in USD.

### Mint Configuration

- **GAS**: The amount of gas used for minting operations.
- **FEE_NATIVE**: The transaction fee for minting in native tokens.
- **MINT_AMOUNT_NATIVE**: The amount of native tokens to mint.
- **SLEEP_ON_GET_ACCOUNT_ERROR_SEC**: The duration to sleep (in seconds) if there is an error while retrieving an account.
- **SLEEP_BETWEEN_START_ACCOUNTS_SEC**: The duration to sleep (in seconds) between starting new accounts.
- **SLEEP_BETWEEN_ACCOUNT_TXS_SEC**: The duration to sleep (in seconds) between account transactions.

### Dispatch Configuration

- **SEND_NATIVE_TOKENS_PER_ACCOUNT**: The amount of native tokens to send per account during the dispatch.
- **SLEEP_BETWEEN_DISPATCH_SEC**: The duration to sleep (in seconds) between dispatching tokens.

### Withdraw Configuration

- **LEAVE_NATIVE_ON_ACCOUNT**: The amount of native tokens to leave on each account during withdrawal.
- **SLEEP_BETWEEN_WITHDRAW_SEC**: The duration to sleep (in seconds) between withdrawal operations.
- **WITHDRAW_EXCHANGE_ADDRESS**: The withdrawal address for exchanging tokens.

### Balances Configuration

- **SLEEP_BETWEEN_CHECK_BALANCES_SEC**: The duration to sleep (in seconds) between checking account balances.

### Transactions Configuration

- **SLEEP_BETWEEN_GET_TRANSACTIONS_SEC**: The duration to sleep (in seconds) between retrieving transactions.

### Minted Configuration

- **SLEEP_BETWEEN_CHECK_MINTED_SEC**: The duration to sleep (in seconds) between checking minted transactions.

### System Configuration (Do Not Edit, It Is for developers)

- **TXS_API_URL**: The API URL for blockchain transactions data.
- **MINTED_API_URL**: The API URL for checking minted transactions.
- **MEMO**: A base64-encoded string used as a memo in transactions.
- **NATIVE_DENOM**: The denomination of the native token.
- **FILE_ACCOUNTS**: The file path for the accounts information.
- **UNATIVE_PER_NATIVE**: The conversion rate from micro native to native.
- **NATIVE_TICK**: The ticker symbol for the native token.
- **ADDRESS_LENGTH**: The expected length of a blockchain address.
- **ADDRESS_PREFIX**: The prefix for blockchain addresses.


## Update
1. Run `npm run update`.
2. Run `npm install`.
3. Copy the new `config.example.js` to your `config.js`.


### Donate: `0xeb3F3e28F5c83FCaF28ccFC08429cCDD58Fd571D`
### Donate: `inj15sf2ya2e40z2zqza88g29vt7aw0xd9egudeuavs`

## Explore more scripts on our [Telegram channel](https://t.me/+FozX3VZA0RIyNWY6).
