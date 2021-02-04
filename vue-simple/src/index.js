import initOptionsMixin from "./initOptions";
import initRenderMixin from "./initRender";
import initLifeCycleMixin from "./initLifecycle";

function Vue(options) {

    this._initOptions(options); //initOptionsMixin

}

initOptionsMixin(Vue);

initRenderMixin(Vue);

initLifeCycleMixin(Vue);


export default Vue;

