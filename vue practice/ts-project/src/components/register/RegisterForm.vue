<template>
    <div class="reg-form">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {error, rule} from "@/type/user";
    import RegisterItem from "@/components/register/RegisterFormItem.vue";

    @Component({
        components: {}
    })
    export default class RegisterForm extends Vue {
        @Prop({type: Object, required: true}) private readonly form!: any;
        @Prop({
            type: Object, default() {
                return {}
            }
        }) private readonly rules!: any;

        public async validate(cb?: Function) {
            let result: error[] = [];
            // this.$children.forEach(async (child: any) => {
            //     let temp = await this.validateItem(child);
            //     if (temp) result.push(temp);
            // });

            for (let i = 0; i < this.$children.length; i++) {
                let temp = await this.validateItem(this.$children[i]);
                if (temp) result.push(temp);
            }
            cb && cb(result.length === 0);
            return result.length === 0;

        }

        public async validateItem(child: any): Promise<error | void> {
            let prop = child.$attrs.prop;
            let itemRules = this.rules[prop];
            if (prop && itemRules) {
                let errors = await this.validateRule(child, itemRules, prop, this.form);
                if (errors.length > 0) {
                    child.validatedInformation("error", errors[0].rule.message);
                    return errors[0];
                } else {
                    child.validatedInformation("success", "");
                }

            }

        }


        private async validateRule(item: RegisterItem, itemRules: rule[], prop: string, form: any): Promise<error[]> {
            let errors: error[] = [];
            // itemRules.forEach(async (rule) => {
            //     if (rule.required && !form[prop]) {
            //         errors.push({item, prop, rule});
            //     }
            //     if (rule.reg && !rule.reg.test(form[prop])) {
            //         errors.push({item, prop, rule});
            //     }
            //     if (rule.check instanceof Function) {
            //         return await rule.check();
            //
            //     }
            // });

            for (let i = 0; i < itemRules.length; i++) {
                let rule = itemRules[i];
                if (rule.required && !form[prop]) {
                    errors.push({item, prop, rule});
                }
                if (rule.reg && !rule.reg.test(form[prop])) {
                    errors.push({item, prop, rule});
                }
                if (rule.check && !(await rule.check())) {
                    errors.push({item, prop, rule});
                }
            }

            return errors;
        }

        mounted() {
            this.$children.forEach((child: any) => {
                child.validateItem = this.validateItem
            })
        }

    }
</script>

<style scoped>
    .reg-form {
        width: 720px;
        margin: 10px auto;
        padding: 50px 0;
    }
</style>