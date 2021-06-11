import { defineComponent, openBlock, createBlock, withScopeId } from 'vue';

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

export default script;
