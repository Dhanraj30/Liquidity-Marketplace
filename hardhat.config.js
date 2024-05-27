require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const NEXT_PUBLIC_AMOY_TESTNET_RPC = "https://rpc-amoy.polygon.technology/"; // Replace with actual Amoy testnet RPC URL
const NEXT_PUBLIC_PRIVATE_KEY = process.env.PRIVATEKEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "amoy",
  networks: {
    hardhat: {},
    amoy: {
      url: NEXT_PUBLIC_AMOY_TESTNET_RPC,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    },
  },
};

