<template>
    <div>
        <div class="dialog-shadow"></div>
        <div class="panel panel-default dialog-panel">
            <div class="panel-heading">
                <h2 class="panel-title">
                    登录
                    <!--                    <a href="#" class="glyphicon glyphicon-remove pull-right"></a>-->
                </h2>
            </div>
            <div class="panel-body">
                <!--内容-->
                <form>
                    <div class="form-group">
                        <label for="username">用户名</label>
                        <input v-model="username" @focus="hasError = false" type="text" class="form-control"
                               id="username" name="username"
                               placeholder="请输入用户名">
                    </div>
                    <div class="form-group">
                        <label for="password">密码</label>
                        <input v-model="password" @focus="hasError= false" type="password" class="form-control"
                               id="password" name="username"
                               placeholder="请输入用户名">
                    </div>
                    <div v-if="hasError" class="alert alert-danger">账户或密码错误</div>
                    <div class="form-group buttons">
                        <button type="button" class="btn btn-primary" @click="submit">登录</button>
                        <!--                        <button type="button" class="btn btn-default">取消</button>-->
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "login",
        data() {
            return {
                username: null,
                password: null,
                hasError: false
            }
        },
        methods: {
            ...mapActions('admin', ['login']),
            submit() {
                this.login({
                    username: this.username,
                    password: this.password
                }).then(res => {
                    //todo...
                    console.log(res);
                    this.$router.push('/admin');
                }).catch(e => this.hasError = true);
            }
        }
    }
</script>

<style scoped>
    .dialog-panel {
        position: fixed;
        left: 50%;
        top: 200px;
        width: 500px;
        margin-left: -250px;
        z-index: 99;
    }

    .dialog-shadow {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.3;
        z-index: 98;
    }

    .buttons {
        text-align: center;
    }

</style>