<template>
    <div class="cascade">
        <nav>
            <span v-for="item in items" @click="change(item)">{{item.label}}</span>
        </nav>
        <com-cascade v-if="children.length >0" :items="children" @select="select" :load="load"></com-cascade>
    </div>

</template>

<script>
    export default {
        name: "ComCascade",
        props: {
            items: {
                type: Array,
                default: () => []
            },
            load: {
                type: Function
            },
            value: {
                type: Array
            }
        },
        data() {
            return {
                pid: void 0,
                children: this.items.children || []
            }
        },
        watch: {
            pid(value) {
              this.load(value,(data)=>{
                  this.children = data;
                  this.$emit('select',[this.label])
              })
            },
            items() {
                this.children = [];
            }

        },
        methods: {
            change(item) {
                this.pid = item.id;
                this.label = item.label;
            },
            select(value) {
                this.$emit("select", [this.label, ...value]);
            }
        }


    }
</script>

<style scoped>
    .cascade {
        display: flex;
        align-content: center;
    }

    .cascade nav {
        max-width: 150px;
        height: 300px;
        border: 1px solid silver;
        overflow-y: scroll;
    }

    .cascade span {
        display: inline-block;
        width: 100%;
        height: 30px;
        text-align: center;
        line-height: 30px;

    }

    .cascade span:hover {
        background: pink;
    }
</style>