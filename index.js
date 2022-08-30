const Indexer = require('./indexer');
const Web3 = require('web3');
const {Parser} = require('json2csv');
const fs = require('fs')

const PORT = 3000;

async function main() {
  // const app = express()
  const indexer = new Indexer();

  // app.listen(PORT);
  await indexer.start();
  const ov = indexer.getBalances();
  const balanceList = [];
  Object
    .keys(ov)
    .forEach((address) => {
      balanceList.push({
        address,
        balance: Web3
          .utils
          .fromWei(ov[address].toString(10))
      })
    });

  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(balanceList);

  const path = "./balance.csv"
  fs.writeFile(path, csv, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  // console.log(csv)
};

main();