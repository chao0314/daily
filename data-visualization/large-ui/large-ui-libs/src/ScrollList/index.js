import comp from "./ScrollList.vue";

comp.install = app => {

    app.component(`L${comp.name}`, comp);
}

export const ScrollList = comp;

export default ScrollList;