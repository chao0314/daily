<template>
    <div class="password-strength">
        <div class="title clearfix" :class="{weak:level<=1,middle:level===2,strong: level===3}">
            <!-- <div class="title weak clearfix"> -->
            <!-- <div class="title middle clearfix"> -->
            <!-- <div class="title strong clearfix"> -->
            <span class="label fl">强度：</span>
            <div class="index fl">
                <div class="index-item fl" v-for="i in 3" :class="{active:i<= level}"></div>
            </div>
            <div class="txt fl">{{label[level]}}</div>
        </div>
        <div class="rules">
            <div class="rule-item clearfix">
                <i class="rule-icon success fl" v-if="rules[0]">√</i>
                <i class="rule-icon fl" v-else>?</i>
                <span class="rule-txt fl">6~20个字符</span>
            </div>
            <div class="rule-item clearfix">
                <i class="rule-icon success fl" v-if="rules[1]">√</i>
                <i class="rule-icon fl" v-else>?</i>
                <span class="rule-txt fl">只能包含字母、数字以及标点符号</span>
            </div>
            <div class="rule-item clearfix">
                <i class="rule-icon success fl" v-if="rules[2]">√</i>
                <i class="rule-icon fl" v-else>?</i>
                <span class="rule-txt fl">字母、数字和标点符号至少包含2种 </span>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';

    @Component({
        components: {}
    })
    export default class RegisterPasswordCheck extends Vue {
        @Prop({default:"", type: String}) readonly password!: string;
        private level: number = 0;
        private label = ["", "弱", "中", "强"];
        private rules = [false, false, false];

        @Watch("password")
        private check(): void {
            this.rules[0] = (this.password.length >= 6 && this.password.length <= 20);
            this.rules[1] = /[\w@\,\.\!\-\<\>\?\$]/i.test(this.password);
            let index = 0;
            if (/[a-z]/i.test(this.password)) index++;
            if (/\d/.test(this.password)) index++;
            if (/\-\_\?\.\>\/\<\,\!\$/.test(this.password)) index++;
            this.rules[2] = index >= 2;
            this.level = this.rules.filter(v => v).length;
        }


    }
</script>

<style scoped>
    .password-strength {width:210px;height:88px;position:absolute;background:#EEE;right:2px;top:-10px; padding:10px;}
    .password-strength .title {}
    .password-strength .title .label {width:60px;}
    .password-strength .title .index {margin-top:11px;}
    .password-strength .title .index-item {width:30px;height:14px;background:#DCDCDC;border:1px solid #FFF;margin-left:-1px;}
    .password-strength .title .txt {}
    .password-strength {}

    .password-strength .weak .txt {color:#F33;}
    .password-strength .weak .active {background:#F33;}

    .password-strength .middle .txt {color:#F93;}
    .password-strength .middle .active {background:#F93;}

    .password-strength .strong .txt {color:#0A0;}
    .password-strength .strong .active {background:#0A0;}

    .password-strength .rules {}
    .password-strength .rule-item {line-height:18px;}
    .password-strength .rule-icon {width:14px;text-align:center;color:#AAA;}
    .password-strength .success {color:#0C0;}
    .password-strength .rule-txt {font-size:12px;}

</style>