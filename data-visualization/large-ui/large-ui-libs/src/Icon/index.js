import comp from "./Icon.vue";

comp.install = app => {

    app.component(`L${comp.name}`, comp);
}

export const Icon = comp;

export default Icon;