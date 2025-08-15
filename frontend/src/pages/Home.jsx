// src/pages/Home.jsx
import React from 'react';
import useWallet from '../hooks/useWallet';

export default function Home() {
  // Destructure state & functions from the custom hook
  const {
    address,
    balance,
    loading,
    error,
    handleConnect,
    handleAddNetwork,
  } = useWallet();

  return (
    <div className="home-container" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Web3 Wallet Dashboard</h1>

      {/* Wallet connect button */}
      <button onClick={handleConnect} disabled={loading} style={{ marginRight: '1rem' }}>
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {/* Add testnet button */}
      <button onClick={handleAddNetwork} disabled={loading}>
        Add Sonic Blaze Testnet
      </button>

      {/* Display errors */}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</p>}

      {/* Display wallet info */}
      {address && (
        <div style={{ marginTop: '2rem' }}>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Balance:</strong> {balance} ETH</p>
        </div>
      )}
    </div>
  );
}
