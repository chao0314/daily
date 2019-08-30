<template>
    <div>
        <div class="header">
            <div class="container">
                <h1 class="logo">淘宝</h1>
            </div>
        </div>
        <div class="content">
            <div class="content-bg"></div>
            <div class="container">
            <login-panel></login-panel>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import LoginPanel from '@/components/login/LoginPanel.vue';
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {
            LoginPanel
        }
    })
    export default class Login extends Vue {

    }
</script>

<style scoped>
    .container {width:1200px;margin:0 auto;position:relative;}


    .header {
        padding:22px 0;
        height:44px;
    }
    h1.logo {
        width:109px;height:43px;
        background:url(../assets/imgs/login_logo.png) no-repeat;
        text-indent:-9999px;
    }

    .content {
        height:600px;
        position:relative;
    }

    .content-bg {
        position:absolute;
        width:2500px;height:600px;
        top:0;left:50%;margin-left:-1250px;
        background:url(../assets/imgs/login_bg.jpg) no-repeat;
    }

    .login-panel {
        position:absolute;
        top:120px;right:60px;
        width:300px;height:302px;
        background:#e9e9f2;
        padding:25px 25px 23px;
    }

    .login-panel h2 {
        margin-top:9px;
        padding-bottom:8px;
        font-weight:700;
        height:18px;
        line-height:18px;
        font-size:16px;
    }

    .login-form {

    }

    .login-form-item {
        margin-top:20px;
        width:298px;height:40px;
        border:#ddd;
    }

    .login-form-item .icon {
        width:40px;height:40px;
    }
    .login-form-item input {width:248px;height:40px;line-height:40px;padding-left:10px;}

    .icon-user {background:url(../assets/imgs/login-icon-user.png) no-repeat}
    .icon-pass {background:url(../assets/imgs/login-icon-pass.png) no-repeat}

    .submit-btn {width:300px;height:42px;background:#F40;border-radius:2px;border:none;color:#FFF;}

    .links {margin-top:18px;text-align:right;}

</style>