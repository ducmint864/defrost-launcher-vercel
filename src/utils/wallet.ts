/**
 * @dev function to trigger wallet connection on browser
 * @note user can connect multiple wallets, take the 1st one
 */
export const connectWallet = async (): Promise<string | null> => {
    if (window.ethereum && typeof window.ethereum.request === "function") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        return accounts[0]; 
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        return null;
      }
    } else {
      alert("MetaMask is not installed or request method is unavailable.");
      return null;
    }
  };