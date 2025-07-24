
const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const Moralis = require("moralis").default;

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
        // Handle file upload logic
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'An error occurred while parsing the upload form.' }));
                return;
            }

            console.log('files:', files); // Debugging

            const file = files.file[0]; // Retrieve the first file object from the array

            // Use the original filename from the file object
            const originalFilename = file.originalFilename;

            // Ensure filePath is assigned before reading
            const filePath = file.filepath; 

            console.log('filePath:', filePath); // Debugging

            // Read the file asynchronously to avoid blocking, handling errors within the callback
            fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'An error occurred while reading the file.' }));
                    return;
                }

                const uploadArray = [
                    {
                        // Use the original filename for the IPFS path
                        path: originalFilename,
                        content: data, // Use the file data read from fs.readFile
                    },
                ];

                Moralis.start({
                    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjlkZjlhOWMwLTc4YWItNGY4Yi1hM2FkLWQ2ZWRhNWZjYTg0ZSIsIm9yZ0lkIjoiMzU4NTIyIiwidXNlcklkIjoiMzY4NDYwIiwidHlwZUlkIjoiNTZmOTg2OTktNmM4MS00ZmE0LTkyODYtYTU0YzhhMjJiMGE2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTU1MzIwMDIsImV4cCI6NDg1MTI5MjAwMn0.K0_4Rrdazc791I6yx5h0bGnpsGNfIb_ul93RvbEu6kw",
                }).then(() => {
                    Moralis.EvmApi.ipfs.uploadFolder({
                        abi: uploadArray,
                    }).then(response => {
                        console.log(response.result);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ result: response.result }));
                    }).catch(err => {
                        console.error("Upload error:", err); // Add this line for error logging
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'An error occurred during upload.' }));
                    });
                }).catch(err => {
                    console.error("Moralis initialization error:", err); // Add this line for error logging
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'An error occurred during Moralis initialization.' }));
                });
            });
        });
    } else {
        // Handle other routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
