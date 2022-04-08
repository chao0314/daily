import comp from "./Test1.vue";

comp.install = app => {

    app.component(comp.name, comp);
}

export const Test1 = comp;

export default comp;