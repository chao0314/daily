<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {State, Actions} from "@/decorator/Store";
    import {mapActions, mapState} from "vuex";

    //@Store()
    @Component({
        components: {},
        // methods:{
        //     ...mapActions({"set":"user/set"})
        // }
        // computed: {
        //     ...mapState({"user":state=>state.user.username})
        // },
        // created(){
        //     console.log("user-mounted",this.user)
        // }
    })
    export default class Home extends Vue {

        @State test!: number;
        @Actions say!: Function;
        @Actions("user/set") set!: Function;
        @State("user/username") user!: string;

        //user:any


        created() {
            console.log("test", this.test)
            this.say("987").then((res: any) => console.log(res))
            console.log("user", this.user)
            this.set("12345678").then((res: any) => console.log(res))
        }

        // get username(){
        //     return this.$store.state.user.username;
        // }


    }
</script>
