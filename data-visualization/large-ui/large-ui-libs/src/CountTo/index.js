import comp from "./CountTo.vue";

comp.install = app => {

    app.component(`L${comp.name}`, comp);
}

export const CountTo = comp;

export default CountTo;