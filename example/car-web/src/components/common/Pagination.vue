<template>
    <nav>
        <ul class="pagination">
            <li @click="forward">
                <a href="#">
                    <span>&laquo;</span>
                </a>
            </li>
            <li v-for="index in amount" @click="change(index)" :class="{active:cur===index}"><a href="#">{{index}}</a>
            </li>
            <li @click="next">
                <a href="#">
                    <span>&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            amount: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                cur: 1
            }
        },
        methods: {
            change(index) {
                if (this.cur !== index) {
                    this.cur = index;
                    this.$emit('pagination', index);
                }
            },
            forward() {
                if (this.cur > 1) {
                    this.cur--;
                    this.$emit('pagination', this.cur);
                }

            },
            next() {
                if (this.cur < this.amount) {
                    this.cur++;
                    this.$emit('pagination', this.cur);
                }

            }
        }
    }
</script>

<style scoped>

</style>