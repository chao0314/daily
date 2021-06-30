import {App} from "vue";
import Button from "@w-ui/button";
import Icon from "@w-ui/icon";
import Row from "@w-ui/row";
import Col from "@w-ui/col";
import Checkbox from "@w-ui/checkbox";
import CheckboxGroup from "@w-ui/checkbox-group";
import Transfer from "@w-ui/transfer";
import Message from "@w-ui/message";
import Collapse from "@w-ui/collapse";
import InfiniteScroll from "@w-ui/infinite-scroll";

export {showMessage} from "@w-ui/message";

const {WCollapse, WCollapseItem} = Collapse;

const components = [
    Button, Icon, Row, Col, Checkbox, CheckboxGroup, Transfer, Message, WCollapse, WCollapseItem
]

const install = (app: App): void => {

    components.forEach(comp => {

        app.component(comp.name, comp);

    })

    //指令
    InfiniteScroll.install(app);

}

export default {
    install
}




