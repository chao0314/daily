import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import PageIndex from '@/pages/page-index';
import PageSearch from '@/pages/page-search';
import PageItem from '@/pages/page-item';

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'index', component: PageIndex},
    {path: '/search/:keyword', name: 'search', component: PageSearch},
    // {path: '/search/:keyword', redirect: '/search/:keyword/1'},
    {path: '/item/:id', name: 'item', component: PageItem},
  ]
});
