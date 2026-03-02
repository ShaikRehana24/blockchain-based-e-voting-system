**Blockchain-Based E-Voting System**

A secure and transparent E-Voting System built using Solidity, Hardhat, Web3.js, HTML, CSS, and JavaScript.
The project leverages Ethereum blockchain to ensure tamper-proof voting.

**Tech Stack**
Frontend: HTML, CSS, JavaScript, Web3.js
Blockchain: Solidity, Hardhat
Local Blockchain: Ganache
Wallet Integration: MetaMask

**📁 Project Structure**
backend/
frontend/
smart-contract/

**🛠️ How to Run the Project**
Follow these steps carefully:
1️⃣ Install MetaMask Extension
Install the MetaMask browser extension.
Create a new wallet or import an existing wallet.

2️⃣ Start Ganache
Open Ganache.
Start a new workspace.
You will see multiple sample accounts with private keys.

3️⃣ Import Ganache Accounts into MetaMask
Open MetaMask.
Click on profile → Import Account.
Copy a private key from Ganache.
Paste it into MetaMask and import.
Repeat if needed for multiple accounts.

4️⃣ Connect MetaMask to Ganache Network
In MetaMask:
Go to Settings → Networks → Add Network

Add the Ganache RPC details:
Network Name: Ganache
RPC URL: http://127.0.0.1:7545
Chain ID: 1337
Currency Symbol: ETH
Save it and switch to this network.

5️⃣ Deploy Smart Contract (Hardhat)
Open terminal:
cd smart-contract
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost

Copy the deployed contract address.
Update it inside:
frontend/js/web3.js

6️⃣ Run the Frontend
Go to:
frontend/pages/
Open:
"index.html" in your browser.

**✅ How It Works**
Users connect wallet using MetaMask
Votes are stored on Ethereum blockchain
Admin can view results transparently
No vote tampering possible

**🔐 Features**
✔️ Secure blockchain voting
✔️ MetaMask wallet authentication
✔️ Transparent vote counting
✔️ Tamper-proof records
