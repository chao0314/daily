import {App} from 'vue';
import component from "*.vue";
import WCollapse   from "./lib/WCollapse.vue";
import WCollapseItem from "./lib/WCollapseItem.vue";



WCollapse.install =  (app:App)=>{


    app.component(WCollapse.name,component);


}



WCollapseItem.install = (app:App)=>{
    app.component(WCollapseItem.name,WCollapseItem);
}


