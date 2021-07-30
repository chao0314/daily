import Store from "./Store";
import {inject} from "vue";
import {StoreOption} from "./Store";

export const StoreKey = 'store';
export * from './Store';

export const createStore = (options:StoreOption) => {

    return new Store(options);


}
export const useStore = (key?:string) => {

    return inject(key ?? StoreKey);

}





