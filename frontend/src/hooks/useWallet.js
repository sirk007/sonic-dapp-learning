// Custom hook to manage wallet state
import { useState } from 'react';

// import service functions that handle web 3 interaction logic
import { connectWallet, addNetwork } from '../services/web3Service';

export default function useWallet() {
    // -----------------------------------
    // - State variables for wallet data -
    // -----------------------------------
    // Holds the connected wallet address
    const [address, setAddress] = useState(null);
    // Holds the wallet's balance (ETH, tokens, etc.)
    const [balance, setBalance] = useState(null);
    // Indicates if an operation (connect/add network) is in progress
    const [loading, setLoading] = useState(false);
    // Holds any error messages for UI display
    const [error, setError] = useState(null);

    // ----------------------------------------------
    // - Function to connect wallet & fetch balance -
    // ----------------------------------------------
    const handleConnect = async () => {
        setLoading(true);   // Show loading state in UI
        setError(null);     // Clear any previous errors
        try {
            // Attempt to connect the wallet using the service function
            // connectWallet() should return an object like { address, balance }
            const {address, balance} = await connectWallet();

            // Store the retrieved address and balance in state
            setAddress(address);
            setBalance(balance);
        } catch (err) {
            // Catch any connection errors (user rejected, RPC errors, etc.)
            setError(err.message || "Failed to connect wallet");
        } finally {
            // Always end the loading state, regardless of success or failure
            setLoading(false);
        }
    };

    // --------------------------------------------------------
    // - Function to Add Sonic Blaze Testnet to user's wallet -
    // --------------------------------------------------------
    const handleAddNetwork = async () => {
        setLoading(true);   // Show loading while adding the network
        setError(null);     // Clear any previous errors
        try {
            // Attempt to add the network using the service function
            await addNetwork();
        } catch (err) {
            // Catch and store any errors that occur while adding the network
            setError(err.message || "Failed to add network");
        } finally {
            // Turn off loading indicator
            setLoading(false);
        }
    };

    // --------------------------------
    // - Return all state & functions -
    // --------------------------------
    // By returning them, we make them usable in any component that calls useWallet()
    return {
        address,            // Wallet address (String or null)
        balance,            // Wallet balance (number/string or null)
        loading,            // Loading state (boolean)
        error,              // Error message (String or null)
        handleConnect,      // Function to connect wallet
        handleAddNetwork,   // Function to add Sonic Blaze Testnet
    };


}