declare module "*.vue" {
    import {App, defineComponent} from "vue";
    // type component = ReturnType<typeof defineComponent> & { install: (app: App) => void };
    // // export type Component = typeof component;
    // export default component;
    const component: ReturnType<typeof defineComponent> & {
        install(app: App): void
    };
    export type Component = typeof component;
    export default component
}
