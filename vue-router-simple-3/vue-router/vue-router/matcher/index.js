export default function createRouterMatcher(routes) {

    const matchers = [];

    function addRoute(routeOptions, parent) {

        const record = normalizeRouteRecord(routeOptions);
        if (parent) record.path = parent.path + record.path;

        const matcher = createRouteRecordMatcher(record, parent);

        if (record.children) record.children.forEach(routeOptions => addRoute(routeOptions, matcher));

        matchers.push(matcher);

    }


    function resolve(location = {path: ""}) {

        const {path} = location;
        const matched = [];

        if (path) {
            let matcher = matchers.find(matcher => matcher.path === path);

            while (matcher) {
                // 将路由 原始数据存起来
                matched.unshift(matcher.record);
                matcher = matcher.parent

            }

        }

        return {
            path,
            matched
        }


    }

    routes.forEach(routeOptions => addRoute(routeOptions));

    console.log('matchers', matchers);

    return {

        addRoute,
        resolve
    }


}


function createRouteRecordMatcher(record, parent) {

    // 创造匹配记录
    //构建父子关系
    // record 中的path 做一些修改 正则的情况
    const {path} = record;
    const matcher = {
        path,
        record,
        parent,
        children: []
    }
    if (parent) {
        parent.children.push(matcher);
    }
    return matcher;


}


function normalizeRouteRecord(routeOptions) {

    const {path, name, meta, beforeEnter, component, children} = routeOptions;

    return {
        path: path, // 状态机 解析路径的分数，算出匹配规则
        name: name,
        meta: meta || {},
        beforeEnter: beforeEnter,
        components: {
            default: component // 可能有多个命名视图
        },
        children: children || []
    }

}