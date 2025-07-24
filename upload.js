
const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const PinataClient = require('@pinata/sdk');
require('dotenv').config();

const pinata = new PinataClient({ pinataJWTKey: process.env.PINATA_JWT });

const server = http.createServer((req, res) => {
    // Add CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
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
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ipfsHash: result.IpfsHash, gatewayUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}` }));
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
