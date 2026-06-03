/* ==========================================================================
   FUNLISH - Zero-Dependency Local Dev Server
   Run "node server.js" at the root workspace directory, then open
   http://localhost:3000 in your browser to avoid CORS local fetch blockages.
   ========================================================================== */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Supported MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

const server = http.createServer((req, res) => {
  // Strip out query parameters
  const cleanUrl = req.url.split('?')[0];
  
  // Resolve absolute file path inside the root directory
  let filePath;
  if (cleanUrl === '/' || cleanUrl === '/index.html') {
    filePath = path.join(__dirname, 'pages', 'index.html');
  } else {
    // If cleanUrl starts with a slash, it will be resolved relative to __dirname
    filePath = path.join(__dirname, cleanUrl);
  }
  
  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page/file not found
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1><p>Berkas tidak ditemukan.</p>', 'utf-8');
      } else {
        // Server error
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>500 Server Error</h1><p>Galat: ${err.code}</p>`, 'utf-8');
      }
    } else {
      // Success, serve file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log(`FUNLISH Server berjalan sukses pada port ${PORT}!`);
  console.log(`Akses halaman di: http://localhost:${PORT}/`);
  console.log('Tekan Ctrl + C di terminal untuk menghentikan server.');
  console.log('====================================================');
});
