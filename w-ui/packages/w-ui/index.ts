// @ts-ignore
import {App} from "vue";
// @ts-ignore
import Button from "@w-ui/button";
// @ts-ignore
import Icon from "@w-ui/icon";
// @ts-ignore
import Row from "@w-ui/row";
// @ts-ignore
import Col from "@w-ui/col";
// @ts-ignore
import Checkbox from "@w-ui/checkbox";
// @ts-ignore
import CheckboxGroup from "@w-ui/checkbox-group";
// @ts-ignore
import Transfer from "@w-ui/transfer";
// @ts-ignore
import Message from "@w-ui/message";
// @ts-ignore
import Collapse from "@w-ui/collapse";
// @ts-ignore
import InfiniteScroll from "@w-ui/infinite-scroll";
// @ts-ignore
import Input from "@w-ui/input";
// @ts-ignore
import {Form, FormItem} from '@w-ui/form';
// @ts-ignore
import {VirtualList, VirtualListItem} from '@w-ui/virtual-list';
// @ts-ignore
import Table from '@w-ui/table';
// @ts-ignore
export {showMessage} from "@w-ui/message";

const {WCollapse, WCollapseItem} = Collapse;

const components = [
    Button, Icon, Row, Col, Checkbox, CheckboxGroup, Transfer, Message, WCollapse, WCollapseItem, Input, Form, FormItem,
    VirtualList, VirtualListItem, Table]

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




