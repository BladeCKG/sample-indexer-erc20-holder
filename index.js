const Indexer = require('./indexer');
const express = require('express')
const mapValues = require('lodash.mapvalues');
const Web3 = require('web3');

const PORT = 3000;

function main() {
  const app = express()
  const indexer = new Indexer();

  app.get('/balances.json', (_req, res) => {
    const ov = indexer.getBalances()
    res.send(mapValues(ov, b => {
      const value = Web3
        .utils
        .fromWei(b.toString(10));
      return value
    }));
  });

  app.get('/block.json', (_req, res) => {
    res.send({
      block: indexer.getLastBlock()
    });
  })

  app.listen(PORT);
  indexer.start();
};

main();