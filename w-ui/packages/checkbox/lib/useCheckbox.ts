import {computed, ComputedRef, getCurrentInstance, inject} from 'vue';

export type CheckboxGroupProvide = {
    flag?: string,
    checkboxValues?: ComputedRef,
    handleChangeOrUpdate?: (val: unknown) => void

}


export interface ICheckboxProps {
    indeterminate?: boolean, // 是否半选
    checked?: boolean, // 是否选中
    name?: string, // 原生的name
    disabled?: boolean, // 是否禁用
    label?: string | number | boolean, // 目前没有 group中使用
    modelValue?: string | number | boolean // 绑定checkbox的值
}


export default function useCheckbox(props: ICheckboxProps) {
    const {emit} = getCurrentInstance();
    const groupProvide = inject<CheckboxGroupProvide>('CheckboxGroup', {});
    const {flag, checkboxValues, handleChangeOrUpdate} = groupProvide;
    const isGroup = flag === 'CheckboxGroup';
    const checked = computed(() => {
        if (isGroup && Array.isArray(checkboxValues)) return checkboxValues.includes(props.label);
        else return props.checked
    })

    const handleChange = (e: InputEvent) => {
        const target = e.target as HTMLInputElement

        emit('update:modeValue', target.checked);


    }


    return {
        checked,
        handleChange
    }

}