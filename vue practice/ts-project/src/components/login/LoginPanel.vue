<template>
    <div class="login-panel">
        <h2>密码登录</h2>
        <div class="login-form">
            <div class="login-form-item clearfix">
                <i class="fl icon icon-user"></i>
                <input type="text" placeholder="会员名/邮箱/手机号" v-model="loginInfo.name"/>
            </div>
            <div class="login-form-item clearfix">
                <i class="fl icon icon-pass"></i>
                <input type="password" v-model="loginInfo.password"/>
            </div>
            <div class="login-form-item clearfix">
                <button type="button" class="submit-btn" @click="loginIn">登 录</button>
            </div>
        </div>

        <div class="links">
            <a href="#" @click="register">注册账号</a>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Actions} from "@/decorator/Store";


    @Component({
        components: {}
    })
    export default class LoginPanel extends Vue {
        private loginInfo = {name: "", password: ""};
        @Actions private login!: Function;

        private loginIn(): void {
            if (this.loginInfo.name && this.loginInfo.password) {
                this.login(this.loginInfo).then(() => {
                    this.$router.push({path: "/", query: {name: this.loginInfo.name}});
                })
            }

        }

        private register(): void {
            this.$router.push("/register");
        }

    }
</script>

<style lang="css" scoped>
    .login-panel {
        position: absolute;
        top: 120px;
        right: 60px;
        width: 300px;
        height: 302px;
        background: #e9e9f2;
        padding: 25px 25px 23px;
    }

    .login-panel h2 {
        margin-top: 9px;
        padding-bottom: 8px;
        font-weight: 700;
        height: 18px;
        line-height: 18px;
        font-size: 16px;
    }

    .login-form {

    }

    .login-form-item {
        margin-top: 20px;
        width: 298px;
        height: 40px;
        border: #ddd;
    }

    .login-form-item .icon {
        width: 40px;
        height: 40px;
    }

    .login-form-item input {
        width: 248px;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
    }

    .icon-user {
        background: url(../../assets/imgs/login-icon-user.png) no-repeat
    }

    .icon-pass {
        background: url(../../assets/imgs/login-icon-pass.png) no-repeat
    }

    .submit-btn {
        width: 300px;
        height: 42px;
        background: #F40;
        border-radius: 2px;
        border: none;
        color: #FFF;
    }

    .links {
        margin-top: 18px;
        text-align: right;
    }
</style>