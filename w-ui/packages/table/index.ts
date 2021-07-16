import {App} from "vue";
import Table from "./lib/WTable.vue";

Table.install = (app: App) => {

    app.component(Table.name, Table);
}

export default Table;

