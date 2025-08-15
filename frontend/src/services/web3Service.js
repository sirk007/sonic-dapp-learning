// Direct blockchain interactions)
/**
    This module acts as the 'Bridge' between front-end and the blockchain.
    Every blockchain call will pass through here.
 */

import { ethers } from 'ethers';

// ------------ Configuration ------------
// Network: Sonic Network (Using Blaze testnet for development)
export const NETWORKS = {
    sonicBlazeTestnet: {
        chainId:"0xDede", // Hexadecimal for 57054 (Sonic Blaze Testnet)
        rpcUrl: "https://rpc.blaze.soniclabs.com",
        chainName: "Sonic Blaze Testnet",
        nativeCurrency: {
            name: "Sonic Token",
            symbol: "S", // Symbol for Sonic Token
            decimals: 18,
        },
        blockExplorerUrls: ["https://testnet.sonicscan.io"],
    }
};


// --- HELPER: Get provider from Metamask ---
export async function getProvider() {
    if(!window.ethereum) {
        throw new Error("MetaMask not detected. Please install the Plugin.");
    }
    // Wrap MetaMask's provider into ethers.js provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    console.log("Provider detected:", provider);
    return provider;   
};

// --- CONNECT WALLET ---
// Requests access to the user's wallet & retrieves basic information
export async function connectWallet() {
    try{
        const provider = await getProvider();
        // Ask MetaMask for wallet access
        const accounts = await provider.send("eth_requestAccounts", []);

        if (!accounts || accounts.length === 0) {
            throw new Error("No accounts found. Please connect your wallet.");
        }
        // Fetch balance in Wei, then convert to human readable format
        const balanceWei = await provider.getBalance(accounts[0]);
        return {
            address: accounts[0],
            balance: ethers.formatEther(balanceWei), // Convert Wei to Ether
        };
    } catch (error) {
        console.error("Wallet connection failed:", error.message);
        throw error; // Rethrow so UI can handle/display the error
    }
};

// --- ADD NETWORK TO METAMASK ---
// Optional UI improvement: Allow users to add the Sonic Blaze Testnet to their MetaMask wallet
export async function addNetwork(){
    if (!window.ethereum) throw new Error("MetaMask not found");
    try{
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: NETWORKS.sonicBlazeTestnet.chainId,
                    chainName: NETWORKS.sonicBlazeTestnet.chainName,
                    rpcUrls: [NETWORKS.sonicBlazeTestnet.rpcUrl],
                    nativeCurrency: NETWORKS.sonicBlazeTestnet.nativeCurrency,
                    blockExplorerUrls: NETWORKS.sonicBlazeTestnet.blockExplorerUrls,
                },
            ],
        });
        console.log("Sonic Blaze Testnet added successfully to MetaMask");
    } catch (error) {
        console.error("Failed to add network:", error.message);
        throw error; // Rethrow so UI can handle/display the error
    }
};