# cosmos inscriptions by [alfar](https://t.me/+FozX3VZA0RIyNWY6)

## Install
1. Download and install [Node.js](https://nodejs.org/en/download).
1. Install dependencies using the `npm install` command in the project root.
1. Create a `config.js` file and fill it as in the `config.example.js` example file.
1. `input/accounts.txt` - add mnemonics and addresses here (format: `mnemonic,address` or `mnemonic`)

## Available commands:
`npm run mint` - mint token
`npm run generate` - generate empty accounts
`npm run dispatch` - send tokens from first account (in `accounts.txt`) to each account in the file
`npm run withdraw` - withdraw native to exchange from all accounts
`npm run balances` - check balances
`npm run addresses` - get addresses from `accounts.txt`
`npm run transactions` - download blockchain transactions data of addresses from `accounts.txt` into `output/accountTransactions/`
`npm run minted` - check how many transactions minted tokens (using `output/accountTransactions`)

## Update
1. Run `npm run update`.
1. Run `npm install`.
1. Copy the new `config.example.js` to your `config.js`.

Explore more scripts on our [Telegram channel](https://t.me/+FozX3VZA0RIyNWY6).
