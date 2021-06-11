import { defineComponent, openBlock, createBlock, withScopeId } from 'vue';

var script$1 = defineComponent({
    name: "WButton"
});

const _withId$1 = /*#__PURE__*/withScopeId("data-v-0bfb9874");

const render$1 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
  return (openBlock(), createBlock("div", null, " button"))
});

script$1.render = render$1;
script$1.__scopeId = "data-v-0bfb9874";
script$1.__file = "packages/button/lib/WButton.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};

var script = defineComponent({
    name: "WIcon"
});

const _withId = /*#__PURE__*/withScopeId("data-v-3aecb6d8");

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (openBlock(), createBlock("div", null, " icon "))
});

script.render = render;
script.__scopeId = "data-v-3aecb6d8";
script.__file = "packages/icon/lib/WIcon.vue";

script.install = (app) => {
    app.component(script.name, script);
};

const components = [
    script$1, script
];
const install = (app) => {
    components.forEach((comp) => {
        app.component(comp.name, comp);
    });
};
var index = {
    install
};

export default index;
