import comp from "./Logo.vue";

comp.install = app => {

    app.component(`L${comp.name}`, comp);
}

export const Logo = comp;

export default Logo;