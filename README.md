# Cosmos Inscriptions by [Alfar](https://t.me/+FozX3VZA0RIyNWY6)

## Install
1. Download and install [Node.js](https://nodejs.org/en/download).
2. Install dependencies using the `npm install` command in the project root.
3. Create a `config.js` file and fill it as in the `config.example.js` example file.
4. `input/accounts.txt` - add mnemonics and addresses here (format: `mnemonic,address` or `mnemonic`)

## Available Commands
- `npm run mint` - mint token
- `npm run generate` - generate empty accounts
- `npm run dispatch` - send tokens from the first account (in `accounts.txt`) to each account in the file
- `npm run withdraw` - withdraw native to exchange from all accounts
- `npm run balances` - check balances
- `npm run addresses` - get addresses from `accounts.txt`
- `npm run transactions` - download blockchain transactions data of addresses from `accounts.txt` into `output/accountTransactions/`
- `npm run minted` - check how many transactions minted tokens (using `output/accountTransactions`)

## Update
1. Run `npm run update`.
2. Run `npm install`.
3. Copy the new `config.example.js` to your `config.js`.

Explore more scripts on our [Telegram channel](https://t.me/+FozX3VZA0RIyNWY6).
