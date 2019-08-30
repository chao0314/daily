<template>
    <div class="list-bg">
        <div class="page">
            <com-crumbs :path="searchPath"></com-crumbs>
            <div class="item-list-container">
                <div class="filter clearfix">
                    <span class="name fl">分类：</span>
                    <a href="#" class="fl">居家生活</a>
                    <a href="#" class="fl">母婴亲子</a>
                    <a href="#" class="fl">全球特色</a>
                    <a href="#" class="fl">数码家电</a>
                    <a href="#" class="fl">运动旅行</a>
                </div>
                <com-list :list="list"></com-list>
                <com-pagination :total="pageCount" @change="searchResult"></com-pagination>
            </div>

        </div>
    </div>

</template>

<script>
    import ComPagination from "@/components/common/com-pagination";
    import ComCrumbs from "@/components/common/com-crumbs";
    import ComList from "@/components/search/com-list";
    import {mapActions} from "vuex";

    export default {
        name: "page-list",
        props: ["keyword"],
        data() {
            return {
                pageCount: 0,
                list: [],
                searchPath: []
            }
        },
        beforeUpdate() {
            this.searchPath = decodeURIComponent(this.$route.fullPath).split("/").slice(2);
        },
        created() {
            this.searchByKeyword({keyword: this.keyword, page: 1}).then(({list, pagecount}) => {
                console.log(list, pagecount);
                this.pageCount = pagecount;
                this.list = list;
            }).catch(err => console.log(err))
        },
        methods: {
            ...mapActions("index", ["searchByKeyword"]),
            searchResult(page) {
                this.searchByKeyword({keyword: this.keyword, page}).then(({list, pagecount}) => {
                    console.log(list, pagecount);
                    this.pageCount = pagecount;
                    this.list = list;
                }).catch(err => console.log(err))
            }
        },
        watch: {
            keyword() {
                this.searchByKeyword({keyword: this.keyword, page: 1}).then(({list, pagecount}) => {
                    console.log(list, pagecount);
                    this.pageCount = pagecount;
                    this.list = list;
                }).catch(err => console.log(err))
            }
        },
        components: {
            ComCrumbs,
            ComList,
            ComPagination
        }
    }
</script>

<style lang="css" scoped>
    .list-bg {
        background: #f5f5f5;
        border-top: 1px solid #e2e2e2;
    }

    .item-list-container {
        width: 1010px;
        padding: 0 40px;
        background: #FFF;
    }

    .item-list-container .filter {
        margin-top: 10px;
        padding-top: 30px;
        border-bottom: 1px solid #eaeaea;
    }

    .item-list-container .filter .name {
        color: #999;
        font-size: 14px;
        margin-right: 28px;
    }

    .item-list-container .filter a {
        margin-right: 30px;
        margin-bottom: 16px;
        font-size: 14px;
        color: #333;
    }

    .item-list-container .filter a:hover {
        color: #b4a078;
    }
</style>