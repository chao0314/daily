import initOptionsMixin from "./initOptions";
import initRenderMixin from "./initRender";
import initLifeCycleMixin from "./initLifecycle";
import initGlobal from "./initGlobal";

function Vue(options) {

    this._initOptions(options); //initOptionsMixin

}

initOptionsMixin(Vue);

initRenderMixin(Vue);

initLifeCycleMixin(Vue);

initGlobal(Vue);


export default Vue;

