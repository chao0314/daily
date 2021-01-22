import initOptionsMixin from "./initOptions";

function Vue(options) {

    this._initOptions(options);

}

initOptionsMixin(Vue);


export default Vue;

