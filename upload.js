
const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const PinataClient = require('@pinata/sdk');
require('dotenv').config();

const pinata = new PinataClient({ pinataJWTKey: process.env.PINATA_JWT });

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve the HTML front-end
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>IPFS File Upload</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        text-align: center;
                    }
                    h1 {
                        margin-top: 50px;
                    }
                    input[type="file"] {
                        margin-top: 20px;
                    }
                    button {
                        margin-top: 10px;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #fff;
                        border: none;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <h1>IPFS File Upload</h1>
                <form action="/upload" method="post" enctype="multipart/form-data">
                    <input type="file" name="file" id="fileInput">
                    <button type="submit" id="uploadButton">Upload</button>
                </form>
                <div id="response"></div>
                <a href="http://localhost:3001">Uploadtoblock</a>
            </body>
            </html>
        `;
        res.end(html);
    } else if (req.url === '/upload' && req.method === 'POST') {
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
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
