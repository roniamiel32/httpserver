function buildResponse(statusCode, statusText, headers, body) {
    // Status line
    let response = `HTTP/1.1 ${statusCode} ${statusText}\r\n`;

    // Add Content-Length if we have a body
    if (body) {
        headers["Content-Length"] = 
        Buffer.byteLength(body);
    }

    // Add headers
    for (const [key, value] of Object.entries(headers)) {
        response += `${key}: ${value}\r\n`;
    }

    // Empty line + body
    response += "\r\n";

    if (body) {
        response += body;
    }

    return response;
}

module.exports = {
    buildResponse,
};