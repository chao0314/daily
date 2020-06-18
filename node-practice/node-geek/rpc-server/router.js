class Router {

    constructor() {
        this._routes = [];
    }

    use(schema, handler) {

        this._routes.push({schema, handler});

    }

    async match(request, ctx) {

        for (let i = 0; i < this._routes.length; i++) {
            let route = this._routes[i];
            if (route.schema === request.schema) {
                return await route.handler(request, ctx);
            }

        }
        return null;


    }

    routes() {
        return this.match.bind(this);
    }
}