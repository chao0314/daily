import {App} from "vue";
import {Component} from "*.vue";
import Button from "@w-ui/button";
import Icon from "@w-ui/icon";
import Row from "@w-ui/row";
import Col from "@w-ui/col";


const components = [
    Button, Icon, Row, Col
]

const install = (app: App): void => {

    components.forEach((comp: Component) => {

        app.component(comp.name, comp);

    })

}

export default {
    install
}