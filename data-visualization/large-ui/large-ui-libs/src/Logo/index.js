import comp from "./Loading.vue";

comp.install = app => {

    app.component(`L${comp.name}`, comp);
}

export const Logo = comp;

export default Logo;