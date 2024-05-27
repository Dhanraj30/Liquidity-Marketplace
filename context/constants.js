//Woox: 0x8AE0334A371a7b592aeb9f79388239BFC13C4D59
 //ICOWoox: 0x260A7446a4C50FE32B9b6f071EcD609cC5588A6c
 //Liqdity: 0xF0eb48073D7d2bd629A63cB9Babb451B56922f0D
 import { ethers } from "ethers";
import Web3Modal from "web3modal";

// Internal imports
import factoryAbi from "./factoryAbi.json";
import ERC20ABI from "./abi.json";

import Woox from "./Woox.json";
import ICOWoox from "./ICOWoox.json";
import Liqudity from "./Liqudity.json";

// Token addresses and ABIs
export const Woox_ADDRESS = "0x8AE0334A371a7b592aeb9f79388239BFC13C4D59"; // Updated address
export const Woox_ABI = Woox.abi;

export const ICOWoox_ADDRESS = "0x260A7446a4C50FE32B9b6f071EcD609cC5588A6c"; // Updated address
export const ICOWoox_ABI = ICOWoox.abi;

export const Liqudity_ADDRESS = "0xF0eb48073D7d2bd629A63cB9Babb451B56922f0D"; // Updated address
export const Liqudity_ABI = Liqudity.abi;

export const FACTORY_ABI = factoryAbi;
export const FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
export const positionManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

const fetchContract = (signer, ABI, ADDRESS) => 
    new ethers.Contract(ADDRESS, ABI, signer);

export const web3Provider = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        return provider;
    } catch (error) {
        console.log(error);
    }
};

export const CONNECTING_CONTRACT = async (ADDRESS) => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const network = await provider.getNetwork();
        const signer = provider.getSigner();
        const contract = fetchContract(signer, ERC20ABI, ADDRESS);

        // User address
        const userAddress = await signer.getAddress();
        const balance = await contract.balanceOf(userAddress);

        const name = await contract.name();
        const symbol = await contract.symbol();
        const supply = await contract.totalSupply();
        const decimals = await contract.decimals();
        const address = await contract.address;

        const token = {
            address: address,
            name: name,
            symbol: symbol,
            decimals: decimals,
            supply: ethers.utils.formatEther(supply.toString()),
            balance: ethers.utils.formatEther(balance.toString()),
            chainId: network.chainId,
        };

        return token;
    } catch (error) {
        console.log(error);
    }
};

export const internalWooxContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = fetchContract(provider, Woox_ABI, Woox_ADDRESS);
        return contract;
    } catch (error) {
        console.log(error);
    }
};

export const internalICOWooxContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = fetchContract(provider, ICOWoox_ABI, ICOWoox_ADDRESS);
        return contract;
    } catch (error) {
        console.log(error);
    }
};

export const internalAddLiqudity = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = fetchContract(provider, Liqudity_ABI, Liqudity_ADDRESS);
        return contract;
    } catch (error) {
        console.log(error);
    }
};

export const getBalance = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        return await signer.getBalance();
    } catch (error) {
        console.log(error);
    }
};
