<template>
  <el-card class="login">
    <template v-slot:header>
      <div>
        登录
      </div>
    </template>
    <el-form label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="user.name" :placeholder="placeholder"></el-input>
      </el-form-item>
      <el-form-item label="密 码">
        <el-input v-model="user.password" placeholder="密 码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="localLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
    import {mapActions,mapState} from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                user: {
                    name: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions({login: 'login'}),
            localLogin() {
                this.login(this.user).then(()=>this.$router.push({name:'shop'}));
            }
        },
        computed:{
            ...mapState(['userInfo']),
            placeholder(){
                return this.userInfo.name;
            }
        }
    }
</script>

<style scoped>
  .login {
    width: 600px;
    margin: 100px auto;
  }
</style>
