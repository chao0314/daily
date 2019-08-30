<template>
    <ul class="item-list clearfix">
        <li class="item-item fl" v-for="item in list" :key="item.ID" @click="goDetail">
            <div class="img-container">
                <img :src="item.img1|imgpath" alt="" class="img">
                <img :src="item.img2|imgpath" alt="" class="img flop">
            </div>
            <div class="bd">
                <a href="javascript:;" class="title"></a>
                <div class="price">
                    <span class="true-price">￥{{item.price}}</span>
                </div>
                <a href="#" class="add-cart">加入购物车</a>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "com-list",
        props: {
            list: {
                required: true,
                type: Array
            }
        },
        methods:{
            goDetail(){
                this.$router.push("/detail")
            }
        }
    }
</script>

<style lang="css" scoped>
    .item-list {
        margin-top: 25px;
        margin-right: -10px;
    }

    .item-list .item-item {
        width: 245px;
        height: 381px;
        margin-right: 10px;
        margin-bottom: 50px;
        background: #FFF;
    }

    .item-list .item-item:hover {
        background: #f4f0ea;
        box-shadow: 1px 1px 8px rgba(0, 0, 0, .2);
    }

    .item-list .item-item .img {
        display: block;
        width: 245px;
        height: 245px;
    }

    .item-list .item-item .flop {
        display: none;
    }

    .item-list .item-item:hover .img {
        display: none;
    }

    .item-list .item-item:hover .flop {
        display: block;
    }

    .item-list .item-item .img-container {
        background: #f4f4f4;
        margin-bottom: 8px;
    }

    .item-list .item-item .title {
        display: block;
        margin-top: 23px;
        margin-bottom: 4px;
        height: 20px;
        width: 100%;
        font-size: 14px;
        font-weight: 700;
        color: #333;
        text-align: center;
    }

    .item-list .item-item .price {
        color: #d4282d;
        width: 100%;
        height: 21px;
        font-size: 13px;
        text-align: center;
    }

    .item-list .item-item .old-price {
        font-size: 12px;
        color: #999;
        text-decoration: line-through;
    }

    .item-list .item-item .add-cart {
        display: block;
        width: 110px;
        height: 30px;
        line-height: 30px;
        margin: 0 auto;
        background: #b4a078;
        border: 1px solid #b4a078;
        color: #FFF;
        text-align: center;
        font-size: 14px;
    }

    .item-list .item-item .add-cart:hover {
        background: #c0ae8a;
    }
</style>