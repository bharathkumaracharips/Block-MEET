// // // import Web3 from "web3";
// // //
// // // const Web3 = require('web3');
// // // const web3 = new Web3('http://localhost:8545'); // Replace with your Ganache URL
// // //
// // // const contractABI = [
// // // [
// // //     {
// // //       "inputs": [],
// // //       "name": "ipfsCid",
// // //       "outputs": [
// // //         {
// // //           "internalType": "string",
// // //           "name": "",
// // //           "type": "string"
// // //         }
// // //       ],
// // //       "stateMutability": "view",
// // //       "type": "function"
// // //     },
// // //     {
// // //       "inputs": [
// // //         {
// // //           "internalType": "string",
// // //           "name": "_cid",
// // //           "type": "string"
// // //         }
// // //       ],
// // //       "name": "setIpfsCid",
// // //       "outputs": [],
// // //       "stateMutability": "nonpayable",
// // //       "type": "function"
// // //     },
// // //     {
// // //       "inputs": [],
// // //       "name": "getIpfsCid",
// // //       "outputs": [
// // //         {
// // //           "internalType": "string",
// // //           "name": "",
// // //           "type": "string"
// // //         }
// // //       ],
// // //       "stateMutability": "view",
// // //       "type": "function"
// // //     }
// // //   ]
// // // ]; // Replace with your contract's ABI
// // // const contractAddress = '0xe9c2427b7252b03ee4565def679c8e5422bd079439b6f5d12445901b77210110'; // Replace with 
//your contract's address
// // //
// // // const contract = new web3.eth.Contract(contractABI, contractAddress);
// // //
// // // const generatedCID = 'QmXBAiD4mQy2q7DoCqibk79r6EuQ58WsPT4A5ftrFSGAWG'; // Replace with the CID generated in 
//step 2
// // //
// // // // Call the contract's function to set the IPFS CID
// // // contract.methods.setIpfsCid(generatedCID).send({ from: '0xB06219501D646654FE201aEA8aC68054D47b93E3' })
// // //   .on('receipt', (receipt) => {
// // //     console.log('Transaction receipt:', receipt);
// // //   })
// // //   .on('error', (error) => {
// // //     console.error('Transaction error:', error);
// // //   });
// // import Web3 from 'web3';
// //
// //
// // const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ganache URL
// // // const contract1 = require("C:\Users\sunkari 
//somasekhar\Desktop\SIH_Frontend\client\src\contracts\IPFSStorage.json")
// // const contractABI = [
// //                       {
// //                         "inputs": [],
// //                         "name": "ipfsCid",
// //                         "outputs": [
// //                           {
// //                             "internalType": "string",
// //                             "name": "",
// //                             "type": "string"
// //                           }
// //                         ],
// //                         "stateMutability": "view",
// //                         "type": "function",
// //                         "constant": true
// //                       },
// //                       {
// //                         "inputs": [
// //                           {
// //                             "internalType": "string",
// //                             "name": "_cid",
// //                             "type": "string"
// //                           }
// //                         ],
// //                         "name": "setIpfsCid",
// //                         "outputs": [],
// //                         "stateMutability": "nonpayable",
// //                         "type": "function"
// //                       },
// //                       {
// //                         "inputs": [],
// //                         "name": "getIpfsCid",
// //                         "outputs": [
// //                           {
// //                             "internalType": "string",
// //                             "name": "",
// //                             "type": "string"
// //                           }
// //                         ],
// //                         "stateMutability": "view",
// //                         "type": "function",
// //                         "constant": true
// //                       }
// //                     ];
// //
// //
// // const contractAddress = '0xB06219501D646654FE201aEA8aC68054D47b93E3'; // Replace with your contract's address
// //
// // const contract = new web3.eth.Contract(contractABI, contractAddress);
// //
// // // Check if the contract.methods object contains the expected method names
// // // console.log('Contract Methods:', contract.methods);
// //
// // // Replace 'generatedCID' with an actual CID
// // const generatedCID = 'QmXBAiD4mQy2q7DoCqibk79r6EuQ58WsPT4A5ftrFSGAWG';
// //
// // // Call the contract's function to set the IPFS CID
// // // contract.methods
// // //   .setIpfsCid(generatedCID)
// // //   .send({ from: '0xB06219501D646654FE201aEA8aC68054D47b93E3' })
// // //   .on('receipt', (receipt) => {
// // //     console.log('Transaction receipt:', receipt);
// // //   })
// // //   .on('error', (error) => {
// // //     console.error('Transaction error:', error);
// // //   });
// // //
// //
// //   contract.methods.getIpfsCid().call()
// //     .then((result) => {
// //       const storedCID = result;
// //       console.log('Stored CID:', storedCID);
// //       console.log("sekha : "  ,storedCID);
// //     })
// //     .catch((error) => {
// //       console.error('Error retrieving CID:', error);
// //     });
// import Web3 from 'web3';
//
// const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ganache URL
//
// const contractABI = [
//                       {
//                         "inputs": [],
//                         "name": "ipfsCid",
//                         "outputs": [
//                           {
//                             "internalType": "string",
//                             "name": "",
//                             "type": "string"
//                           }
//                         ],
//                         "stateMutability": "view",
//                         "type": "function",
//                         "constant": true
//                       },
//                       {
//                         "inputs": [
//                           {
//                             "internalType": "string",
//                             "name": "_cid",
//                             "type": "string"
//                           }
//                         ],
//                         "name": "setIpfsCid",
//                         "outputs": [],
//                         "stateMutability": "nonpayable",
//                         "type": "function"
//                       },
//                       {
//                         "inputs": [],
//                         "name": "getIpfsCid",
//                         "outputs": [
//                           {
//                             "internalType": "string",
//                             "name": "",
//                             "type": "string"
//                           }
//                         ],
//                         "stateMutability": "view",
//                         "type": "function",
//                         "constant": true
//                       }
//                     ];
//
//
// const contractAddress = '0xe113F6B2d1eb286DCDBf53B2d0C212Aa76282AB8'; // Replace with your contract's address
//
// const contract = new web3.eth.Contract(contractABI, contractAddress);
//
// // Replace 'generatedCID' with an actual CID
// const generatedCID = 'QmXBAiD4mQy2q7DoCqibk79r6EuQ58WsPT4A5ftrFSGAWG';
//
// const fromAddress = '0xb10c3780F5C209D489cB3C61b34FfD5B978fD588'; // Your sender address
// const gasLimit = 300000; // Adjust the gas limit as needed
// const gasPrice = '2000000000'; // Adjust the gas price (in wei) as needed
//
// // Call the contract's function to set the IPFS CID with custom gas options
// // contract.methods
// //   .setIpfsCid(generatedCID)
// //   .send({ from: fromAddress, gas: gasLimit, gasPrice: gasPrice })
// //   .on('receipt', (receipt) => {
// //     console.log('Transaction receipt:', receipt);
//
//     // Now that you've set the CID, let's retrieve it
//     contract.methods.getIpfsCid().call()
//       .then((result) => {
//         const storedCID = result;
//         console.log('Stored CID:', storedCID);
//       })
//       .catch((error) => {
//         console.error('Error retrieving CID:', error);
//       });
//   })
//   .on('error', (error) => {
//     console.error('Transaction error:', error);
//   });
import Web3 from 'web3';

const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your Ganache URL

const contractABI = [
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

// const gasLimit = 400000; // Adjust the gas limit as needed
// const gasPrice = '2000000000';÷ // Adjust
const contractAddress = '0x5597D0248f97893D2f874b26996dEceA71ec373c'; // Replace with your contract's address

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Retrieve the CID from the blockchain
contract.methods.getIpfsCid().call()
  .then((result) => {
    const storedCID = result;
    console.log('Stored CID:', storedCID);
  })
  .catch((error) => {
    console.error('Error retrieving CID:', error);
  });
