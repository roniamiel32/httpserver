function createRouter() {
    const routes = {
        GET: [],
        POST: [],
        PUT: [],
        DELETE: []
    };

    function addRoute(method, path, handler) {
        const paramNames = [];
        // Convert path pattern to regex (handle :params)
        const regexPath = path.replace(/:([^/]+)/g, (_, paramName) => {
            paramNames.push(paramName);
            return '([^/]+)';
        });

        routes[method].push({
            regex: new RegExp(`^${regexPath}$`),
            paramNames,
            handler
        });
    }

    function match(method, path) {
        const methodRoutes = routes[method] || [];

        for (const route of methodRoutes) {
            const match = path.match(route.regex);
            if (match) {
                const params = {};
                route.paramNames.forEach((name, index) => {
                    params[name] = match[index + 1];
                });
                return { handler: route.handler, params };
            }
        }

        return null;
    }

    const routerParams = {
        get: function (path, handler) { addRoute('GET', path, handler); return this; },
        post: function (path, handler) { addRoute('POST', path, handler); return this; },
        put: function (path, handler) { addRoute('PUT', path, handler); return this; },
        delete: function (path, handler) { addRoute('DELETE', path, handler); return this; },

        route: function (path) {
            return {
                get: function (handler) { addRoute('GET', path, handler); return this; },
                post: function (handler) { addRoute('POST', path, handler); return this; },
                put: function (handler) { addRoute('PUT', path, handler); return this; },
                delete: function (handler) { addRoute('DELETE', path, handler); return this; }
            };
        },

        match
    };

    return routerParams;
}

module.exports = {
    createRouter
};