import item from "@/components/register/RegisterFormItem.vue";

export type register = { mobile?: number, email?: string, password?: string, password2?: string }
export type rule = { reg?: RegExp, required?: boolean, check?:Function,message: string };
export type error = { item: item, prop: string, rule: rule };
