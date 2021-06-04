import {App} from "vue";
import Button from "@w-ui/button";
import Icon from "@w-ui/icon";
import {Component} from "*.vue";

const components = [
    Button, Icon
]

const install = (app: App): void => {

    components.forEach((comp: Component) => {

        app.component(comp.name, comp);

    })

}

export default {
    install

}