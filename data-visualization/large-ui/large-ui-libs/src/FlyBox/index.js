import comp from "./FlyBox.vue";

comp.install = app => {

    app.component(`L${comp.name}`, comp);
}

export const FlyBox = comp;

export default FlyBox;