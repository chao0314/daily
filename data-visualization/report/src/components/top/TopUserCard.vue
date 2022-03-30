<template>
  <com-card :title="title" :value="value">
    <template #default>
      <v-chart autoresize :option="option"></v-chart>
    </template>
    <template #footer>
      <div class="footer">
        <p>
          <span>日同比</span>
          <span class="emphasis">{{ userGrowthLastDay }}</span>
          <span class="up-arrow"></span>
        </p>
        <p>
          <span>月同比</span>
          <span class="emphasis">{{ userGrowthLastMonth }}</span>
          <span class="down-arrow"></span>
        </p>
      </div>

    </template>
  </com-card>
</template>

<script>
import ComCard from "@/components/top/ComCard";
import {reportData} from "../../../data/data";

export default {
  name: "TopUserCard",
  components: {ComCard},
  setup(props, ctx) {

    const title = '累计用户数';
    const value = '8765,4321';
    const {userLastMonth, userToday, userGrowthLastDay, userGrowthLastMonth} = reportData;
    const option = {
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'value',
        show: false,
        max: userLastMonth + userToday
      },
      yAxis: {
        type: 'category',
        show: false

      },
      series: [
        {
          type: 'bar',
          name: '上月平台总数',
          data: [userLastMonth],
          barWidth: '14',
          stack: '总量',
          itemStyle: {
            color: '#45c946'

          }
        },
        {
          type: 'bar',
          name: '今日平台总数',
          data: [userToday],
          stack: '总量',
          itemStyle: {
            color: '#eee'
          }
        },
        {
          type: 'custom',
          name: '比例指示',
          stack: '总量',
          data: [userLastMonth],
          renderItem(params, api) {

            const value = api.value(0);
            const position = api.coord([value, 0]);

            return {

              type: 'group',
              position,
              children: [

                {
                  type: 'path',
                  shape: {
                    d: 'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
                    width: 10,
                    height: 10,
                    x: -5,
                    y: -20,
                    layout:'cover'
                  },
                  style: {
                    fill: '#45c946'
                  }
                },
                {
                  type: 'path',
                  shape: {
                    d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
                    width: 10,
                    height: 10,
                    x: -5,
                    y: 10,
                    layout: 'cover'
                  },
                  style: {
                    fill: '#45c946'
                  }
                }
              ]


            }


          }

        }
      ]

    }


    return {
      title, value,
      userGrowthLastDay,
      userGrowthLastMonth,
      option
    }


  }
}
</script>

<style scoped>

.footer p {

  display: inline-block;
  margin-right: 10px;
}

.footer .emphasis {
  margin-right: 5px;
}


</style>