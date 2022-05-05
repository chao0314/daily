import comp from "./Tab.vue";

comp.install = app => {

    app.component(`L${comp.name}`, comp);
}

export const Tab = comp;

export default Tab;