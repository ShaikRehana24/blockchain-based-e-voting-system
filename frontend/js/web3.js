console.log("web3.js loaded");
console.log("ethers =", typeof ethers);

const CONTRACT_ADDRESS = "0x58222dD18F605C4a28F7c04c2B47D5CDbAcaE480";

let provider;
let signer;
let contract;

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Assign to global variables
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    // Expose to window so admin.js can access them
    window.provider = provider;
    window.signer = signer;
    window.contract = contract;

    console.log("Wallet connected:", await signer.getAddress());
  } catch (err) {
    console.error("Wallet connection failed:", err);
    alert("Wallet connection failed");
  }
}

// Expose globally
window.connectWallet = connectWallet;