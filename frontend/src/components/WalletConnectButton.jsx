// Displays on-chain & token prices
import React from 'react';
import { useWallet } from '../hooks/useWallet';

export default function WalletConnectButton() {
    const {address, loading, error, handleConnect } = useWallet();

    // Format the address to a shorter version for display
    const formatAddress = (addr) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`};
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            {/* Connect button */}
            <button
                onClick={handleConnect}
                disabled={loading}
                style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "8px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontWeight: "bold"
                }}>
                {loading
                    ? "Connecting..."
                    : address
                        ? `Connected: ${formatAddress(address)}`
                        : "Connect Wallet"}
            </button>

            {/* Error display */}
            {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
        </div>
    );
