<template>
  <div id="container">
    <header>
      <div class="time">
        2021-6-18 03:15:26
      </div>
    </header>
    <main>
      <div class="column left">
        <h2>
          电商数据
          <span class="sub">Sell Data</span>
        </h2>
        <h3>销售量</h3>
        <div class="sales">
          <span>1</span>
          <span>2</span>
          <span>0</span>
          <span>1</span>
          <span>0</span>
          <span>5</span>
          <span>0</span>
          <span class="no-bg">.</span>
          <span>2</span>
        </div>
        <h3>完成百分比</h3>
        <div class="percent-container">
          <div class="percent">
            <div class="bar" style="width:37%">
              <div class="dot"></div>
              <div class="text">37%</div>
            </div>
          </div>
        </div>
        <h3>
          热门搜索词
          <span class="sub">Top Search</span>
        </h3>
        <div class="kwcloud-container">
          <ul class="kwcloud-list">
            <li>Mac Pro</li>
            <li>iPhone X</li>
            <li>华为P20</li>
            <li>韩都衣舍</li>
            <li>小米手机</li>
          </ul>
        </div>
      </div>
      <div class="column main">
        <h2>
          订单走势
          <span class="sub">Order curve</span>
        </h2>
        <div id="order-curve"></div>
        <div class="order-container">
          <div class="order-container-left">
            <h3>销售地区Top</h3>
            <div id="order-area"></div>
          </div>
          <div class="order-split"></div>
          <div class="order-container-right">
            <h3>购买终端</h3>
            <div id="order-device"></div>
          </div>
        </div>
      </div>
      <div class="column right">
        <h2>
          统计数据
          <span class="sub">Statistics Data</span>
        </h2>
        <div class="statistics-container">
          <div class="row">
            <div class="item">
              <div class="icon">
                <img src="imgs/shop.png"/>
              </div>
              <div class="info">
                <div class="num">98.6</div>
                <div class="title">订单总数(万)</div>
              </div>
            </div>
            <div class="item">
              <div class="icon">
                <img src="imgs/coin.png"/>
              </div>
              <div class="info">
                <div class="num">32.02</div>
                <div class="title">销售总量(万元)</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="icon">
                <img src="imgs/bell.png"/>
              </div>
              <div class="info">
                <div class="num">81.7</div>
                <div class="title">人均消费</div>
              </div>
            </div>
            <div class="item">
              <div class="icon">
                <img src="imgs/task.png"/>
              </div>
              <div class="info">
                <div class="num">36</div>
                <div class="title">近10分钟新增订单数</div>
              </div>
            </div>
          </div>
        </div>
        <h2>
          大额订单Top
          <span class="sub">Super Orders</span>
        </h2>
        <div class="super-orders-container">
          <table>
            <thead>
            <tr>
              <th>时间</th>
              <th>商品</th>
              <th>数量</th>
              <th>金额</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>05:37</td>
              <td>xx手机</td>
              <td>35</td>
              <td>965,125</td>
            </tr>
            <tr>
              <td>05:37</td>
              <td>xx手机</td>
              <td>35</td>
              <td>965,125</td>
            </tr>
            <tr>
              <td>05:37</td>
              <td>xx手机</td>
              <td>35</td>
              <td>965,125</td>
            </tr>
            <tr>
              <td>05:37</td>
              <td>xx手机</td>
              <td>35</td>
              <td>965,125</td>
            </tr>
            <tr>
              <td>05:37</td>
              <td>xx手机</td>
              <td>35</td>
              <td>965,125</td>
            </tr>
            <tr>
              <td>05:37</td>
              <td>xx手机</td>
              <td>35</td>
              <td>965,125</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'pcView',
  components: {}
}
</script>
