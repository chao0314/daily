<template>
    <div>
        <comp-site-nav></comp-site-nav>
        <div class="container">
            <header class="reg-header">
                <h1 class="logo">淘宝网</h1>
            </header>
            <!--            <button @click="validate">校验</button>-->
            <div class="steps">
                <register-step :message="message" :current="cur"></register-step>

                <register-form :rules="rules" :form=form ref="username" v-if="cur===1" :key="1">
                    <register-form-item label="手机号" prop="mobile">
                        <input class="form-control" type="text" v-model="form.mobile" placeholder="请输入你的手机号"
                               @blur="validate('username')"/>
                    </register-form-item>
                    <register-form-item label="邮箱" prop="email">
                        <input class="form-control" type="text" v-model="form.email" placeholder="请输入你的邮箱"
                               @blur="validate('username')"/>
                    </register-form-item>
                    <register-form-item>
                        <!--                        <button type="button" class="form-control btn-next">下一步</button>-->
                        <button type="button" class="form-control btn-next " :class="{disabled:!pass}"
                                @click="next(pass)">下一步
                        </button>
                    </register-form-item>
                </register-form>

                <register-form :form="form" :rules="rules2" ref="password" v-else-if="cur===2" :key="2">
                    <register-form-item label="登录名">
                        <div>{{form.mobile}}</div>
                    </register-form-item>
                    <register-form-item label="登录密码" prop="password">
                        <input class="form-control" type="password" v-model="form.password" placeholder="请输入你的密码"
                               @focus="isPassword = 1"
                               @blur="validate('password'),isPassword =0"/>
                        <register-password-check :password="this.form.password"
                                                 v-show="isPassword ===1"></register-password-check>
                    </register-form-item>
                    <register-form-item label="确认密码" prop="password2">
                        <input class="form-control" type="password" v-model="form.password2" placeholder="请再次输入你的密码"
                               @focus="isPassword = 2"
                               @blur="validate('password')"/>
                        <!--                        <register-password-check :password="this.form.password2"-->
                        <!--                                                 v-show="isPassword2 ===2"></register-password-check>-->
                    </register-form-item>

                    <register-form-item>
                        <button type="button" class="form-control btn-next" :class="{disabled:!pass}"
                                @click="next(pass)">提交
                        </button>
                    </register-form-item>
                </register-form>

                <div class="success-form" v-else :key="3">
                    <img src="../assets/imgs/reg-success.png" alt=""/>
                    <div class="txt">注册成功</div>
                    <div class="login-ref-container">
                        <a href="#" class="login-ref" @click="loginIn">立即登录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CompSiteNav from "@/components/common/CompSiteNav.vue"
    import RegisterStep from "@/components/register/RegisterStep.vue";
    import RegisterForm from "@/components/register/RegisterForm.vue";
    import RegisterFormItem from "@/components/register/RegisterFormItem.vue";
    import RegisterPasswordCheck from "@/components/register/RegisterPasswordCheck.vue";
    import {register} from "@/type/user";
    import {Actions} from "@/decorator/Store";


    @Component({
        components: {
            CompSiteNav,
            RegisterStep,
            RegisterForm,
            RegisterFormItem,
            RegisterPasswordCheck
        }
    })
    export default class Register extends Vue {
        @Actions register!: Function;
        private message = ["设置用户名", "填写账号信息", "注册成功"];
        private cur = 1;
        private form: register = {};
        private rules = {
            mobile: [{required: true, message: "手机号码不能为空"}, {reg: /^1\d{10}$/, message: "手机号码不正确"}],
            email: [{required: true, message: "邮箱不能为空"}, {reg: /^\w+@[a-z0-9_]+(\.[a-z]{2,6}){1,2}/, message: "邮箱不正确"}]
        };
        private rules2 = {
            password: [{required: true, message: "密码不能为空"}, {reg: /\S{6,20}/, message: "密码需要6-20位"}],
            password2: [{required: true, message: "确认密码不能为空"}, {
                check: () => {
                    return this.form.password === this.form.password2;
                }, message: "密码不一致"
            }]
        };
        private pass = false;
        private isPassword = 0;

        private validate(ref: string): void {
            // (<any>this.$refs[ref]).validate().then((res: boolean) => {this.pass = res;});
            (<any>this.$refs[ref]).validate((res: boolean) => {
                this.pass = res;
            });
        }

        private next(pass: boolean): void {

            if (pass) {
                if (this.cur === 2) {
                    this.register(this.form).then(() => {
                        this.cur++;
                    })

                } else {
                    this.cur++
                }

            }

        }

        private loginIn(): void {
            this.$router.push({path: "/login"})
        }

    }
</script>

<style lang="css">
    .site-nav-page {
        width: 1190px;
        margin: 0 auto;
    }
</style>

<style scoped>
    .container {
        width: 1190px;
        margin: 0 auto;
    }

    /*  */
    .reg-header {
        height: 43px;
        padding: 20px 0;
    }

    .logo {
        width: 109px;
        height: 43px;
        background: url(../assets/imgs/login_logo.png) no-repeat;
        text-indent: -9999px;
    }

    /*  */
    .steps {
        height: 46px;
        border-bottom: 2px solid #e6e6e6
    }

    /*  */


    /*  */
    .success-form {
        width: 720px;
        margin: 10px auto;
        text-align: center;
    }

    .success-form .txt {
        font-size: 26px;
        color: #AAA;
    }

    .success-form .login-ref-container {
        margin-top: 20px;
    }

    /*  */
    .dialog {
        padding: 20px;
        border: 2px solid #dedede;
        border-top: 2px solid #ff4a00;
        position: absolute;
        left: 50%;
        top: 230px;
        margin-left: -350px;
        z-index: 99;
        background: #FFF;
    }

    .dialog-title {
        font-size: 16px;
        height: 24px;
        font-weight: bold;
    }

    .dialog-close-btn {
        font-size: 30px;
        line-height: 16px;
        color: #CCC;
    }

    /*  */
    .reg-agreement {
        width: 680px;
        height: 420px;
    }

    .reg-agreement .content p {
        font-size: 14px;
        margin: 4px 0;
    }

    .btn-agreement {
        width: 140px;
        height: 36px;
        padding: 0 20px;
        background: #ff4001;
        color: #FFF;
        font-size: 12px;
        font-weight: 700;
        border: none;
        position: absolute;
        left: 50%;
        bottom: 20px;
        margin-left: -70px;
    }
</style>