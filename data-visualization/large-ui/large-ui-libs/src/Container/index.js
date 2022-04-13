import comp from "./Container.vue";

comp.install = app => {

    app.component(`L${comp.name}`, comp);
}

export const Container = comp;

export default Container;