import Web3 from 'web3';


const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ganache URL
// const contract1 = require("C:\Users\sunkari somasekhar\Desktop\SIH_Frontend\client\src\contracts\IPFSStorage.json")
const contractABI =[
  {
    "inputs": [],
    "name": "ipfsCid",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_cid",
        "type": "string"
      }
    ],
    "name": "setIpfsCid",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getIpfsCid",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const contractAddress = '0x5597D0248f97893D2f874b26996dEceA71ec373c'; // Replace with your contract's address

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Check if the contract.methods object contains the expected method names
console.log('Contract Methods:', contract.methods);

// Replace 'generatedCID' with an actual CID
// Replace 'generatedCID' with an actual CID
const generatedCID = 'QmbCx2ZgBTuoXYoTnnGyrVx8FSKWiyfTW4bH8jGHsoUSk8';

// Define custom gas options
const gasLimit = 400000; // Adjust the gas limit as needed
const gasPrice = '2000000000'; // Adjust the gas price (in wei) as needed

// Call the contract's function to set the IPFS CID with custom gas options
contract.methods
  .setIpfsCid(generatedCID)
  .send({ from: '0x4667766c593E20324aE09C839c00f18e736d2112', gas: gasLimit, gasPrice: gasPrice })
  .on('receipt', (receipt) => {
    console.log('Transaction receipt:', receipt);
  })
  .on('error', (error) => {
    console.error('Transaction error:', error);
  });
