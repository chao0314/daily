import comp from "./Test.vue";

comp.install = app => {

    app.component(comp.name, comp);
}

export const Test = comp;

export default Test;