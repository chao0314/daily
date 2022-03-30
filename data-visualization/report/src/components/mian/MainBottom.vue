<template>
  <div class="main-bottom">
    <div>
      <el-card shadow="hover">
        <template #header>
          <p class="main-bottom__keyword-title"><span>关键词搜索</span></p>
        </template>
        <div class="main-bottom__user-charts">
          <div class="main-bottom__line">
            <p>搜索用户数</p>
            <p>113,250</p>
            <div>
              <v-chart :option="keywordOption" autoresize></v-chart>
            </div>
          </div>
          <div class="main-bottom__line">
            <p>搜索量</p>
            <p>239，623</p>
            <div>
              <v-chart :option="searchOption"></v-chart>
            </div>
          </div>
        </div>
        <div class="main-bottom__table clear-float">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="keyword" label="关键词"/>
            <el-table-column prop="count" label="总搜索量"/>
            <el-table-column prop="users" label="搜索用户数"/>
            <el-table-column prop="range" label="搜索占比"/>
          </el-table>
          <el-pagination background layout="prev, pager, next" :total="100" class="clear-float"/>
        </div>
      </el-card>
    </div>
    <div>
      <el-card shadow="hover">
        <template #header>
          <p class="main-bottom__sales-title">
            <span>分类销售排行</span>
            <el-radio-group v-model="radio">
              <el-radio-button label="品类"/>
              <el-radio-button label="商品"/>
            </el-radio-group>
          </p>
        </template>
        <div class="main-bottom__sales-charts">
          <v-chart autoresize :option="salesOption"></v-chart>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {wordCloudData} from "../../../data/data";
import {reportData} from "../../../data/data";

export default {
  name: "MainBottom",
  setup(props, ctx) {

    const radio = ref('品类');
    const [keywordData, searchData, xAxisData] = wordCloudData.reduce((pre, cur) => {

      const {word, count, user} = cur;
      pre[0].push(user);
      pre[1].push(count);
      pre[2].push(word);
      return pre;

    }, [[], [], []])
    const keywordOption = {

      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        boundaryGap: false,
        show: false
      },
      yAxis: {
        show: false
      },
      tooltip: {},
      series: [
        {
          type: 'line',
          data: keywordData,
          areaStyle: {
            color: 'rgba(95,187,255,0.5)'
          },
          lineStyle: {
            // width:0
            color: 'rgba(95,187,255,0.5)'
          },
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }
      ]


    };
    const searchOption = {

      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        boundaryGap: false,
        show: false
      },
      yAxis: {
        show: false
      },
      tooltip: {},
      series: [
        {
          type: 'line',
          data: searchData,
          areaStyle: {
            color: 'rgba(95,187,255,0.5)'
          },
          lineStyle: {
            // width:0
            color: 'rgba(95,187,255,0.5)'
          },
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }
      ]


    };

    const tableData = wordCloudData.map((item, index) => ({
      id: index + 1,
      rank: index + 1,
      keyword: item.word,
      count: item.count,
      users: item.user,
      range: `${((item.user / item.count) * 100).toFixed(2)}%`
    })).slice(0, 4);

    const pieData = reportData.category.data1;
    const colors = ['#8d7fec', '#5085f2', '#f8726b', '#e7e702', '#78f283', '#4bc1fc'];
    const data = pieData.data1
    const axis = pieData.axisX;
    const total = data.reduce((s, i) => s + i, 0)

    const pieChartData = data.map((item, index) => {
      const percent = `${(item / total * 100).toFixed(2)}%`
      return {
        name: `${axis[index]}`,
        value: item,
        itemStyle: {
          color: colors[index]
        },
        percent,
        legend: axis[index]
      }
    })

    const salesOption = {
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      xAxis: {},
      yAxis: {
        show: false
      },
      title: [{
        text: '品类分布',
        textStyle: {
          color: '#666',
          fontSize: 14
        }
      },
        {
          text: '累计订单量',
          subtext: '666',
          left: '29%',
          top: '40%',

          textStyle: {
            color: '#999',
            fontSize: 14
          },
          subtextStyle: {
            color: '#333',
            fontSize: 28,
          },
          textAlign: 'center'
        }],
      tooltip: {
        trigger: 'item',
        formatter(params) {

          // console.log(params);
          const {seriesName, marker, name, value, percent} = params;

          return `${seriesName} </br>
                  ${marker} ${name}</br>
                  <p style="padding-left:18px">数量：${value}</br>
                     占比：${percent}%</p>`

        }
      },
      legend: {
        orient: 'vertical',
        left: '70%',
        top: 'middle'
      },
      series: [
        {
          type: 'pie',
          name: '品类分布',
          data: pieChartData,
          center: ['30%', '50%'],
          radius: ['45%', '60%'],
          labelLine: {
            length: 8,
            length2: 3
          },
          itemStyle: {
            borderWidth: 4,
            borderColor: '#fff'
          }
        }

      ]

    }
    return {
      radio,
      keywordOption,
      searchOption,
      tableData,
      salesOption
    }
  }
}
</script>

<style scoped>

.main-bottom {
  background: lightblue;
  margin-top: 20px;
  display: flex;

}

.main-bottom > div {
  width: 50%;
  background: #EEEEEE;
}

.main-bottom > div:first-child {
  padding-right: 10px;
}

.main-bottom > div:last-child {

  padding-left: 10px;
}

.main-bottom__keyword-title {
  height: 30px;
}

.main-bottom__sales-title {
  display: flex;
  justify-content: space-between;
  height: 30px;
}

.main-bottom__user-charts {

  display: flex;
}

.main-bottom__line {
  width: 50%;
  padding: 0 2px;

}


.main-bottom__line > p {
  color: #999999;
  font-size: 14px;

}

.main-bottom__line > p:last-of-type {

  letter-spacing: 2px;
  color: #333333;
}


.main-bottom__line > div {
  height: 50px;

}

.el-pagination {
  margin-top: 10px;
  float: right;
}

.main-bottom__sales-charts {
  height: 336px;
}


</style>