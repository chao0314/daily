import {App} from "vue";
import WVirtualList from "./lib/WVirtualList.vue";
import WVirtualListItem from "./lib/WVirtualListItem.vue";

WVirtualList.install =  (app:App)=>{

    app.component(WVirtualList.name,WVirtualList);
}


WVirtualListItem.install = (app:App)=>{

    app.component(WVirtualListItem.name,WVirtualListItem);

}

export const VirtualList  =  WVirtualList;
export const VirtualListItem = WVirtualListItem;
