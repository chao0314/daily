class Router {

    constructor() {
        this._routes = [];
    }

    use(schemaName, handler) {

        this._routes.push({schemaName, handler});

    }

    async match(request, ctx) {

        for (let i = 0; i < this._routes.length; i++) {
            let route = this._routes[i];
            if (route.schemaName === request.schemaName) {
                return await route.handler(request, ctx);
            }

        }
        return null;


    }

    routes() {
        return this.match.bind(this);
    }
}

exports = module.exports = Router;