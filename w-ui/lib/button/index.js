import { defineComponent, openBlock, createBlock, withScopeId } from 'vue';

var script = defineComponent({
    name: "WButton"
});

const _withId = /*#__PURE__*/withScopeId("data-v-0bfb9874");

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (openBlock(), createBlock("div", null, " button"))
});

script.render = render;
script.__scopeId = "data-v-0bfb9874";
script.__file = "packages/button/lib/WButton.vue";

script.install = (app) => {
    app.component(script.name, script);
};

export default script;
