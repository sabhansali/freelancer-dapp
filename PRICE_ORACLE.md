# Price Oracle integration

The Market Prices page reads `SafePriceConsumer`, which validates the configured
Chainlink feed on-chain. It is independent of the DEX and `SimpleAMM`.

## Sepolia feed configuration

The configured example is the Ethereum Sepolia ETH/USD proxy:

`0x694AA1769357215DE4FAC081bf1f309aDC325306`

The Chainlink address directory identifies this proxy for Ethereum Sepolia.
The feed's documented heartbeat is 3,600 seconds and its deviation threshold is
0.5%. The migration uses `maxAgeSeconds = 5,400` (heartbeat plus a 30-minute
safety margin). Verify the feed's current heartbeat and deviation on the
official [Chainlink feed directory](https://data.chain.link) before a production
deployment.

## Local Ganache

Start Ganache on `127.0.0.1:7545`, then from the repository root run:

```bash
npx truffle compile
npx truffle migrate --reset --network development
```

The migration deploys `MockFeed` with an initial simulated ETH/USD value and a
`SafePriceConsumer` with a 3,600-second maximum age. Copy the printed Consumer
address into `frontend/.env`:

```env
REACT_APP_PRICE_CONSUMER_LOCAL_ADDRESS=0x...
```

Do not label this value as live market data. The page identifies it as a
simulated local feed.

## Sepolia deployment

Install the provider used by the existing Truffle workflow if it is not
already installed:

```bash
npm install --save-dev @truffle/hdwallet-provider
```

Set these environment variables in the shell (never commit them):

```text
MNEMONIC=your wallet recovery phrase
SEPOLIA_RPC_URL=https://your-sepolia-rpc-endpoint
CHAINLINK_ETH_USD_SEPOLIA_FEED=0x694AA1769357215DE4FAC081bf1f309aDC325306
CHAINLINK_ETH_USD_MAX_AGE_SECONDS=5400
```

These are Truffle variables, not React variables. Do not put `MNEMONIC` in
`frontend/.env`; that file is loaded by the browser build and must never
contain wallet secrets. On Windows PowerShell, set them in the same terminal
before running the migration:

```powershell
$env:MNEMONIC = "your wallet recovery phrase"
$env:SEPOLIA_RPC_URL = "https://your-sepolia-rpc-endpoint"
$env:CHAINLINK_ETH_USD_SEPOLIA_FEED = "0x694AA1769357215DE4FAC081bf1f309aDC325306"
$env:CHAINLINK_ETH_USD_MAX_AGE_SECONDS = "5400"
```

Deploy with:

```bash
cd frontend
npm run migrate:sepolia
```

Put the printed consumer address in `frontend/.env`:

```env
REACT_APP_PRICE_CONSUMER_SEPOLIA_ADDRESS=0x...
```

The wallet must be connected to Ethereum Sepolia for the live page. The page
does not fall back to a fabricated value when the feed or deployment is
unavailable.

## Frontend ABI and configuration

`frontend/src/abi/SafePriceConsumer.json` contains the ABI needed by the page.
If you replace it with a freshly generated Truffle artifact, retain the
constructor and these functions: `feed`, `feedDecimals`, `feedDescription`,
`maxAgeSeconds`, `safePrice`, and `valueOf`.

The two address entries are intentionally separate:

```env
REACT_APP_PRICE_CONSUMER_LOCAL_ADDRESS=0x...
REACT_APP_PRICE_CONSUMER_SEPOLIA_ADDRESS=0x...
```

The existing Ganache DEX and application contracts are unchanged.

## Isolated Sepolia deployment through Truffle Dashboard

This path deploys only `SafePriceConsumer`; it does not run the existing
migrations and does not require a mnemonic or private key. Start Truffle
Dashboard and connect MetaMask to Ethereum Sepolia first.

From the repository root:

```powershell
npx truffle compile
```

Then deploy only the consumer:

```powershell
npx truffle exec scripts/deploy_safe_price_consumer.js --network dashboard
```

The script passes the constructor arguments:

```text
feedAddress    = 0x694AA1769357215DE4FAC081bf1f309aDC325306
maxAgeSeconds  = 5400
```

It first checks that the Dashboard provider is connected to Sepolia
(`chainId = 11155111`), then asks MetaMask to approve the single deployment
transaction. It does not call `truffle migrate`, `--reset`, or any existing
migration.

After the command prints the new `Consumer` address, update
`frontend/.env`:

```env
REACT_APP_PRICE_CONSUMER_SEPOLIA_ADDRESS=0x_NEW_CONSUMER_ADDRESS
```

The ABI is already present at `frontend/src/abi/SafePriceConsumer.json`. If the
contract source changes and the artifact needs refreshing, run:

```powershell
npx truffle compile
node CopyContracts.js
```

`CopyContracts.js` copies `SafePriceConsumer.json` along with the existing
contract artifacts. It does not deploy anything.

## Validation walkthrough

The focused contract suite covers fresh positive, zero, negative, missing,
future, stale, and decimal-scaled values:

```bash
npx truffle test test/safe_price_consumer.test.js
```

To demonstrate the local page, connect to Ganache, open **Market Prices**, and
confirm the simulated source, update timestamp, and age. To demonstrate
invalid or stale handling, call `MockFeed.set(0, timestamp)`,
`MockFeed.set(-1, timestamp)`, or set a timestamp older than 3,600 seconds from
the Truffle console; refresh the page and confirm that it shows **Price
unavailable** rather than zero.
