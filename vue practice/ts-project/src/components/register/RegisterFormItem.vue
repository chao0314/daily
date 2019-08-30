<template>
    <div class="form-item clearfix" :class="status">
        <label class="form-label">{{label}}</label>
        <slot></slot>
        <div class="password-strength" v-if="false">
            <div class="title clearfix">
                <!-- <div class="title weak clearfix"> -->
                <!-- <div class="title middle clearfix"> -->
                <!-- <div class="title strong clearfix"> -->
                <span class="label fl">强度：</span>
                <div class="index fl">
                    <div class="index-item active fl"></div>
                    <div class="index-item fl"></div>
                    <div class="index-item fl"></div>
                </div>
                <div class="txt fl">弱</div>
            </div>
            <div class="rules">
                <div class="rule-item clearfix">
                    <i class="rule-icon success fl">√</i>
                    <span class="rule-txt fl">6~20个字符</span>
                </div>
                <div class="rule-item clearfix">
                    <i class="rule-icon fl">?</i>
                    <span class="rule-txt fl">只能包含字母、数字以及标点符号</span>
                </div>
                <div class="rule-item clearfix">
                    <i class="rule-icon fl">?</i>
                    <span class="rule-txt fl">字母、数字和标点符号至少包含2种</span>
                </div>
            </div>

        </div>
        <div class="validate-status" v-if="status">
            <i class="icon"></i>
            <span class="msg">{{message}}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';

    @Component({
        components: {}
    })
    export default class RegisterFormItem extends Vue {
        @Prop({type: String, default: ""}) private readonly label!: string;
        private status = "";
        private message = "";
        public validateItem!: Function;

        public validatedInformation(status: string, message: string): void {
            this.status = status;
            this.message = message;
        }

        public clearInformation(): void {
            this.status = "";
            this.message = "";
        }

        mounted() {

            if (this.$slots.default) {
                let slot = this.$slots.default[0];
                if (slot.tag && slot.tag.toLowerCase() === "input" && slot.elm) {
                    slot.elm.addEventListener("focus", () => {
                        this.clearInformation();
                    });
                    slot.elm.addEventListener("input", () => {
                        this.validateItem(this);
                    });
                    slot.elm.addEventListener("blur", () => {
                        this.validateItem(this);
                    })
                }

            }
        }


    }
</script>

<style scoped>
    .form-item {
        padding: 10px 0 10px 260px;
        line-height: 36px;
        position: relative;
    }

    .form-item .form-label {
        float: left;
        width: 240px;
        height: 37px;
        margin-left: -260px;
        text-align: right;
        font-size: 14px;
    }

    .form-item .form-control {
        float: left;
        height: 34px;
        border: 1px solid #dedede;
        padding: 0 10px;
        width: 200px;
    }

    .form-item .form-control:focus {
        border-color: #229bf9
    }

    .validate-status {
    }

    .validate-status .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 6px;
        background: url(../../assets/imgs/validate-icon.png) no-repeat;
        position: relative;
        top: 4px;
    }

    .validate-status .msg {
        display: inline-block;
    }

    .validate-status .icon {
        background-position: 0 0;
    }


    .error .form-control {
        border: 1px solid #ff3f13;
    }

    .error .msg {
        color: #ff3f13;
    }

    .error .icon {
        background-position: 0 0;
    }

    .success .icon {
        background-position: -16px 0;
    }

    .form-item .btn-next {
        width: 222px;
        color: #999;
        background: #F40;
        color: #FFF;
        border-color: #F40
    }

    .form-item .btn-next.disabled {
        color: #999;
        background: #EEE;
        border-color: #dedede;
    }

    .form-item .btn-next.disabled:focus {
        outline: none;
    }


    .password-strength {
        width: 210px;
        height: 88px;
        position: absolute;
        background: #EEE;
        right: 2px;
        top: -10px;
        padding: 10px;
    }

    .password-strength .title {
    }

    .password-strength .title .label {
        width: 60px;
    }

    .password-strength .title .index {
        margin-top: 11px;
    }

    .password-strength .title .index-item {
        width: 30px;
        height: 14px;
        background: #DCDCDC;
        border: 1px solid #FFF;
        margin-left: -1px;
    }

    .password-strength .title .txt {
    }

    .password-strength {
    }

    .password-strength .weak .txt {
        color: #F33;
    }

    .password-strength .weak .active {
        background: #F33;
    }

    .password-strength .middle .txt {
        color: #F93;
    }

    .password-strength .middle .active {
        background: #F93;
    }

    .password-strength .strong .txt {
        color: #0A0;
    }

    .password-strength .strong .active {
        background: #0A0;
    }

    .password-strength .rules {
    }

    .password-strength .rule-item {
        line-height: 18px;
    }

    .password-strength .rule-icon {
        width: 14px;
        text-align: center;
        color: #AAA;
    }

    .password-strength .success {
        color: #0C0;
    }

    .password-strength .rule-txt {
        font-size: 12px;
    }
</style>