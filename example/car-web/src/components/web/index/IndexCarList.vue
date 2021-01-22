<template>
    <div class="wrap-box"><!--Start Box-->
        <div class="zerogrid">
            <div class="header">
                <h2>最新好车</h2>
            </div>
            <div class="row">
                <div class="col-2-3">
                    <list></list>
                </div>
                <div class="col-1-3">
                    <div class="wrap-col">
                        <!---- Start Widget ---->
                        <div class="widget">
                            <div class="wid-header">
                                <h5>关于我们</h5>
                            </div>
                            <div class="wid-content">
                                <p>
                                    人人车深耕二手车交易服务，透明无差价交易让普通用户也可以用公平的市场价格，买到精选优质二手车。人人车以资深评估师和手持设备为质量把关，检测项目包含114项国家标准检测（含车辆外观、发动机、转向机构、制动系统、漏水、漏油等），以及人人车独家服务的135项，总计249项专业检测，排除重大事故车，火烧车，水泡车以及工况差的车。</p>
                            </div>
                        </div>
                        <!---- Start Widget ---->
                        <index-new-list></index-new-list>
                        <!---- Start Widget ---->
                        <div class="widget">
                            <div class="wid-header">
                                <h5>联系方式</h5>
                            </div>
                            <div class="wid-content">
                                <p>
                                    人人车提供完善的售后服务，承诺车源14天可退，并提供1年/2万公里质保，出现任何问题都可以免费拨打4008-610-500，联系您的专属用车管家。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IndexNewList from "@/components/web/index/IndexNewList";
import List from "@/components/web/index/List";

export default {
    name: "IndexCarList",
    components: {
        IndexNewList,
        List
    }
}
</script>

<style scoped>

</style>