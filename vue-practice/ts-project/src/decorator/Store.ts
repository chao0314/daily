import {mapActions, mapGetters, mapState, mapMutations} from "vuex";
import {createDecorator} from 'vue-class-component';

type mapType = typeof mapState | typeof mapGetters
    | typeof mapActions | typeof mapMutations


function propHandler(type: string, helper: mapType, name?: string) {

    return createDecorator((opt: any, key: string) => {
        opt[type] = opt[type] || {};
        if (name) {
            let index = name.lastIndexOf("/");
            if (index > 0) {
                let namespace = name.slice(0, index);
                let mapKey = name.slice(index + 1);
                opt[type][key] = helper(namespace, [mapKey])[mapKey];
            } else {
                opt[type][key] = helper([name])[key];
            }
        }
    });

}


function createHelper(type: string, helper: mapType) {

    function mapHelper(options: string): any
    function mapHelper(options: any, name: string): void
    function mapHelper(options: any, name?: string) {
        if (typeof options === "string" && !name) {
            return propHandler(type, helper, options);
        }
        if (name) {
            createDecorator((opt: any, key: string) => {
                opt[type] = opt[type] || {};
                opt[type][key] = helper([key])[key];
            })(options, name)
        }

    }

    return mapHelper
}


export const State = createHelper("computed", mapState);
export const Actions = createHelper("methods", mapActions);
export const Getters = createHelper("methods", mapGetters);
export const Mutations = createHelper("methods", mapMutations);
