import {App} from "vue";

export type WithInstall<T> = T & { install: (app: App) => void };