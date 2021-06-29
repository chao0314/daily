import {ComputedRef} from "vue";

export type CollapseProvide = {
    activeNames?: ComputedRef<string[]>,
    handleItemClick?: (name?: string) => void

}