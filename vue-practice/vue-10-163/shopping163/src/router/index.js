import Vue from "vue";
import Router from "vue-router";
import PageIndex from "@/pages/page-index";
import PageSearch from "@/pages/page-search";
import  PageDetail from '@/pages/page-detail';

Vue.use(Router);
let router = new Router({
    routes: [
        {path: "/", component: PageIndex},
        {path: "/search/:keyword", name: "search", component: PageSearch,props:true},
        {path: "/detail", name: "detail", component: PageDetail}
    ]
});
export default router;