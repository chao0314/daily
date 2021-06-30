import {WithInstall} from "../../types/types";
import WInfiniteScroll from "./lib/WInfiniteScroll";
import {App} from "vue";


const InfiniteScroll: WithInstall<typeof WInfiniteScroll> = {

    install(app: App) {
        app.directive("infinite-scroll", WInfiniteScroll);

    }

}

export default InfiniteScroll;

