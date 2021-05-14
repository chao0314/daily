import * as nodeOps from './nodeOperators';
import { createRenderer } from "@vue/runtime-core";
import { patchProp } from "./patchProp";
import { querySelector } from "./nodeOperators";
const rendererOptions = Object.assign({ patchProp }, nodeOps);
export const createApp = (rootComponent, rootProps = {}) => {
    const app = createRenderer(rendererOptions).createApp(rootComponent, rootProps);
    const { mount } = app;
    app.mount = function (selector) {
        const container = querySelector(selector);
        container.innerHTML = '';
        mount(container);
    };
    return app;
};
//# sourceMappingURL=index.js.map