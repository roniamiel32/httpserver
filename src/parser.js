function parseRequest(rawData) {
    const request = rawData.toString();

    // Split headers and body
    const [headerSection, ...bodyParts] = request.split("\r\n\r\n");
    const body = bodyParts.join("\r\n\r\n");
    const lines = headerSection.split("\r\n");

    // Parse request line
    const [method, fullPath, version] = lines[0].split(" ");

    // Parse URL and query string
    const [path, queryString] = fullPath.split("?");
    const query = {};
    if (queryString) {
        queryString.split("&").forEach((param) => {
            const [key, value] = param.split("=");
            query[decodeURIComponent(key)] = decodeURIComponent(value || "");
        });
    }

    // Parse headers
    const headers = {};
    for (let i = 1; i < lines.length; i++) {
        const colonIndex = lines[i].indexOf(":");
        if (colonIndex > 0) {
            const key = lines[i].slice(0, colonIndex).toLowerCase().trim();
            const value = lines[i].slice(colonIndex + 1).trim();
            headers[key] = value;
        }
    }
    // Parse JSON body automatically
    let parsedBody = body;
    const contentType = headers['content-type'] || '';
    
    if (contentType.includes('application/json') && body) {
        try {
            parsedBody = JSON.parse(body);
        } catch (e) {
            parsedBody = body; 
        }
    }

    return { method, path, query, headers, body: parsedBody, version };
}

module.exports = {
    parseRequest,
};