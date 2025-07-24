
// Utility function to safely stringify objects with BigInt
const safeJSONStringify = (obj) => {
  return JSON.stringify(obj, (key, value) => 
    typeof value === 'bigint' ? value.toString() : value
  );
};

const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const PinataClient = require('@pinata/sdk');
const { Web3 } = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

// Initialize Pinata
const pinata = new PinataClient({ pinataJWTKey: process.env.PINATA_JWT });

// Initialize Web3 with Ganache
async function initWeb3() {
    console.log('Initializing Web3 with Ganache...');
    const ganacheUrl = process.env.GANACHE_URL || 'http://127.0.0.1:7545';
    console.log('Connecting to Ganache at:', ganacheUrl);

    // Try with a simpler provider first
    const provider = new Web3.providers.HttpProvider(ganacheUrl);
    const web3 = new Web3(provider);

    // Verify connection
    console.log('Web3 version:', web3.version);

    // Get the first account and set it as default
    const accounts = await web3.eth.getAccounts();
    console.log('Available accounts:', accounts);

    if (!accounts || accounts.length === 0) {
        console.error('No accounts found in Ganache. Please make sure Ganache is running and accounts are available.');
        process.exit(1);
    }

    const defaultAccount = accounts[0];
    web3.eth.defaultAccount = defaultAccount;
    console.log('Using default account:', defaultAccount);

    // Verify network ID
    const networkId = await web3.eth.net.getId();
    console.log('Connected to network ID:', networkId);

    // Verify block number
    const blockNumber = await web3.eth.getBlockNumber();
    console.log('Current block number:', blockNumber);
    
    return { web3, defaultAccount };
}

// Contract ABI
const contractABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_link", "type": "string"}
    ],
    "name": "addLink",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "users",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "link", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Application state
let web3, defaultAccount, contract;
let isWeb3Initialized = false;

// Initialize Web3 and contract
async function initialize() {
    try {
        // Initialize Web3
        console.log('Initializing Web3...');
        const result = await initWeb3();
        web3 = result.web3;
        defaultAccount = result.defaultAccount;
        
        // Initialize contract
        const contractAddress = process.env.CONTRACT_ADDRESS || '0x2AC7d00D15a72F88a97257E1B0fdC52fFd577d79';
        contract = new web3.eth.Contract(contractABI, contractAddress);
        
        console.log('Contract initialized at address:', contractAddress);
        isWeb3Initialized = true;
        console.log('Web3 and contract initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Web3 and contract:', error);
        process.exit(1);
    }
}

// Start the initialization
initialize();

// Helper function to wait for Web3 to be initialized
async function waitForWeb3Initialization() {
    while (!isWeb3Initialized) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

const server = http.createServer(async (req, res) => {
    // Enhanced CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': 86400, // 24 hours
        'Content-Type': 'application/json'
    };

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    // Apply CORS headers to all responses
    Object.keys(headers).forEach(key => {
        res.setHeader(key, headers[key]);
    });

    // Wait for Web3 to be initialized
    if (!isWeb3Initialized) {
        try {
            await waitForWeb3Initialization();
        } catch (error) {
            console.error('Error waiting for Web3 initialization:', error);
            res.writeHead(503, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                success: false, 
                error: 'Service Unavailable', 
                message: 'Failed to initialize Web3. Please check server logs.' 
            }));
            return;
        }
    }
    if (req.url === '/upload' && req.method === 'POST') {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error parsing form' }));
                return;
            }

            const file = files.file[0];
            const filePath = file.filepath;
            const originalFilename = file.originalFilename;

            try {
                const readableStream = fs.createReadStream(filePath);
                const result = await pinata.pinFileToIPFS(readableStream, {
                    pinataMetadata: { name: originalFilename }
                });
                
                // Get the meeting ID from the form fields
                const meetingId = fields.meetingId ? fields.meetingId[0] : 'meeting-' + Date.now();
                const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
                
                try {
                    // Get all available accounts from Ganache
                    const accounts = await web3.eth.getAccounts();
                    console.log('Available accounts in Ganache:', accounts);
                    
                    if (!accounts || accounts.length === 0) {
                        throw new Error('No accounts found in Ganache. Please make sure Ganache is running and accounts are available.');
                    }
                    
                    // Use the first available account
                    const senderAccount = accounts[0];
                    const balance = await web3.eth.getBalance(senderAccount);
                    const balanceInEth = web3.utils.fromWei(balance, 'ether');
                    
                    console.log('=== Ganache Account Details ===');
                    console.log('Using account:', senderAccount);
                    console.log('Account balance (ETH):', balanceInEth);
                    console.log('Network ID:', await web3.eth.net.getId());
                    console.log('Is connected:', web3.currentProvider.connected);
                    console.log('==============================');
                    
                    // Use a fixed gas price that works well with Ganache
                    const gasPrice = '20000000000'; // 20 Gwei in wei
                    
                    // Estimate gas first with a reasonable buffer
                    const gasEstimate = await contract.methods.addLink(
                        `meeting-${meetingId}`,
                        ipfsUrl
                    ).estimateGas({ 
                        from: senderAccount
                    });
                    
                    // Add 50% buffer to the gas limit to be safe
                    const gasLimit = Math.floor(Number(gasEstimate) * 1.5);
                    
                    console.log(`Sending transaction with gasPrice: ${gasPrice} wei, gasLimit: ${gasLimit}`);
                    console.log(`Contract address: ${contract.options.address}`);
                    console.log(`Meeting ID: meeting-${meetingId}`);
                    console.log(`IPFS URL: ${ipfsUrl}`);
                    
                    try {
                        // Store the IPFS hash and meeting ID on the blockchain
                        const tx = await contract.methods.addLink(
                            `meeting-${meetingId}`,
                            ipfsUrl
                        ).send({
                            from: senderAccount,
                            gas: gasLimit,
                            gasPrice: gasPrice
                        });
                        
                        console.log('Transaction successful:', tx.transactionHash);
                        
                        // Send success response
                        const response = {
                            success: true,
                            ipfsHash: result.IpfsHash,
                            gatewayUrl: ipfsUrl,
                            meetingId: meetingId,
                            transactionHash: tx.transactionHash,
                            blockNumber: tx.blockNumber,
                            message: 'File uploaded and transaction recorded successfully'
                        };
                        
                        console.log('Sending success response:', safeJSONStringify(response));
                        res.writeHead(200);
                        res.end(safeJSONStringify(response));
                        return;
                    } catch (txError) {
                        console.error('Transaction error details:', {
                            message: txError.message,
                            data: txError.data,
                            receipt: txError.receipt,
                            stack: txError.stack
                        });
                        throw txError;
                    }
                } catch (blockchainErr) {
                    console.error('Error storing on blockchain:', blockchainErr);
                    // Even if blockchain fails, we still have the IPFS upload
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: false,
                        ipfsHash: result.IpfsHash, 
                        gatewayUrl: ipfsUrl,
                        meetingId: meetingId,
                        error: 'Uploaded to IPFS but failed to store on blockchain',
                        blockchainError: blockchainErr.message
                    }));
                }
            } catch (uploadErr) {
                console.error('Error uploading to IPFS:', uploadErr);
                console.error('File attempted:', originalFilename, 'at path:', filePath);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error uploading to IPFS', details: uploadErr.message }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
