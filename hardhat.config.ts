import * as dotenv from 'dotenv'
import '@nomiclabs/hardhat-waffle'
import { HardhatUserConfig, task } from "hardhat/config";
import { testDEX } from './scripts/testdex';

dotenv.config()


task('testdex', 'Launches a local forked node')
  .addParam('chain', 'Name of supported EMV-based network')
  .setAction(async (args, hre) => {
    await testDEX(hre, args.chain)
  })


const config: HardhatUserConfig = {
  networks: {
    ethereum: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [ process.env.PRIVATE_KEY! ],
      gas: 400000,
      gasPrice: 40
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [ process.env.PRIVATE_KEY! ]
    },
    polygon: {
      url: 'https://matic-mainnet.chainstacklabs.com',
      accounts: [ process.env.PRIVATE_KEY! ]
    },
    polygonTestnet: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [ process.env.PRIVATE_KEY! ]
    },
    bsc: {
      url: 'https://bsc-dataseed.binance.org/', //  causes missing trie node error
      accounts: [ process.env.PRIVATE_KEY! ]
    },
    bscTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: [ process.env.PRIVATE_KEY! ]
    },
    heco: {
      url: 'https://http-mainnet-node.huobichain.com',
      accounts: [ process.env.PRIVATE_KEY! ]
    },
    hecoTestnet: {
      url: 'https://http-testnet.hecochain.com',
      accounts: [ process.env.PRIVATE_KEY! ]
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4"
      }
    ]
  }
}

export default config