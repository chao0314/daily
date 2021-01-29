import initOptionsMixin from "./initOptions";
import initRenderMixin from "./initRender";
import initLifeCycleMixin from "./lifecycle";

function Vue(options) {

    this._initOptions(options); //initOptionsMixin

}

initOptionsMixin(Vue);

initRenderMixin(Vue);

initLifeCycleMixin(Vue);


export default Vue;

