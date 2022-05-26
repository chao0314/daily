<template>
    <div class="pagenation-container">
        <div class="pagenation clearfix">
            <a href="javascript:;" class="fl large" :class="{disabled:page ===1}" @click="previous">上一页</a>
            <a href="javascript:;" class="fl" :class="{active:index === page}" v-for="index in total"
               @click="page=index">{{index}}</a>
            <!--            <a href="#" class="fl">2</a>-->
            <a href="javascript:;" class="fl large" :class="{disabled:page ===total}" @click="next">下一页</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "com-pagination",
        props: {
            total: {
                required: true
            },
            cur: {
                default: 1
            }
        },
        data() {
            return {
                page: this.cur
            }
        },
        methods: {
            previous() {
                if (this.page === 1) return;
                this.page--;
            }, next() {
                if (this.page === this.total) return;
                this.page++;
            }
        },
        watch: {
            page(val) {
                console.log(val);
                this.$emit("change", this.page);

            }
        }
    }
</script>

<style lang="css" scoped>
    .pagenation-container {
        text-align: center;
    }

    .pagenation {
        display: inline-block;
        height: 40px;
        padding-bottom: 80px;
    }

    .pagenation a {
        padding: 7px 12px;
        border: 1px solid #e6e6e6;
        font-size: 12px;
        line-height: 24px;
        color: #333;
        margin-right: -1px;
    }

    .pagenation a.large {
        padding: 8px 15px 6px 15px;
    }

    .pagenation a.active {
        background: #b4a078;
        border-color: #b4a078;
        color: #FFF;
    }

    .pagenation a.disabled, .pagenation a.disabled:hover {
        color: #CCC;
    }

    .pagenation a:hover {
        color: #b4a078
    }
</style>