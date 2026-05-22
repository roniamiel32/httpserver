const fs = require('fs');
const path = require('path');
const { buildResponse } = require('./response');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return MIME_TYPES[ext] || 'application/octet-stream';
}
function serveStatic(staticDir) {
    return function (req, socket) {
        // Build full file path
        const filePath = path.join(staticDir, req.path);

        // Security: prevent directory traversal attacks
        const resolvedPath = path.resolve(filePath);
        const resolvedDir = path.resolve(staticDir);

        if (!resolvedPath.startsWith(resolvedDir)) {
            const response = buildResponse(403, 'Forbidden', {
                'Content-Type': 'text/plain'
            }, 'Access denied');

            socket.end(response);
            return;
        }

        // Check if file exists
        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                const response = buildResponse(404, 'Not Found', {
                    'Content-Type': 'text/plain'
                }, 'File not found');

                socket.end(response);
                return;
            }
            // Serve the file
            const mimeType = getMimeType(filePath);
            const headers = {
                'Content-Type': mimeType,
                'Content-Length': stats.size
            };

            // Send headers first
            let response = `HTTP/1.1 200 OK\r\n`;

            for (const [key, value] of Object.entries(headers)) {
                response += `${key}: ${value}\r\n`;
            }

            response += '\r\n';
            socket.write(response);

            // Stream file content
            const readStream = fs.createReadStream(filePath);
            readStream.pipe(socket);
        });

    };
}

module.exports = {
    serveStatic
};
