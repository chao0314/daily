class Matcher {
    constructor(routes = []) {

        this.routes = routes;
        this.routeMap = this.createRouteMap(routes);
    }


    match(path) {

        return this.routeMap.get(path);

    }

    addRoutes(routes) {

        this.routeMap = this.createRouteMap(routes, this.routeMap);

    }

    createRouteMap(routes, map) {

        if (!map) map = new Map();

        routes.forEach(route => {

            const record = addRouteRecordToMap(map, route);

            //todo.....


        })


        function addRouteRecordToMap(map, route, parentRecord) {

            let {path, meta, component} = route;
            if (parentRecord) path = `${parentRecord.path}/${path}`;

            return {
                path,
                meta,
                component,
                parentRecord
            }


        }


    }


}