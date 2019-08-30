<template lang="html">
  <div class="banner" @mouseover="endAutoPlay()" @mouseout="startAutoPlay()">
    <a href="javascript:;" class="btn prev" @click="prev()">上一项</a>
    <a href="javascript:;" class="btn next" @click="next()">下一项</a>
    <ul class="banner-list">
      <li class="banner-container" :class="{cur: index==cur}" v-for="banner,index in banners" :key="index">
        <a :href="banner.href">
          <img :src="banner.src|imgpath" :alt="banner.title">
        </a>
      </li>
    </ul>
    <ol class="number-list">
      <li :class="{active: index==cur}" v-for="banner,index in banners" @mouseover="cur=index"></li>
    </ol>
  </div>
</template>

<script>
export default {
  data(){
    return {
      cur: 0,
      banners: null,
      timer: null
    }
  },
  async created(){
    let {data: {err, msg, data}}=await this.$http('/banners');

    if(err){
      alert(msg);
    }else{
      this.banners=data;
    }

    // this.startAutoPlay();
  },
  beforeDestroy(){
    this.endAutoPlay();
  },
  methods:{
    prev(){
      if(this.cur==0){
        this.cur=this.banners.length-1;
      }else{
        this.cur--;
      }
    },
    next(){
      if(this.cur==this.banners.length-1){
        this.cur=0;
      }else{
        this.cur++;
      }
    },
    startAutoPlay(){
      this.timer=setInterval(this.next, 1000);
    },
    endAutoPlay(){
      clearInterval(this.timer);
    }
  }
}
</script>

<style lang="css" scoped>
/* banner */
.banner {height:420px;position:relative;}
.banner-list {}
.banner-container {width:1920px;height:420px;position:absolute;left:0;top:0;z-index:1;opacity:0;transition:.7s all ease}
.banner-container img {width:1920px;height:420px;}
.banner-container.cur {opacity:1;}

.banner .btn {
  position:absolute;
  z-index:2;
  left:50%;top:200px;
  text-indent:-99999px;
  width:50px;height:50px;border-radius:50%;
  background-color:#D0C4AF;
  background-image:url(../../assets/imgs/icon2.png);
  background-repeat:no-repeat;
}
.banner .btn:hover {background-color:#B19E7A;}
.banner .btn.prev {background-position:0 -5384px;margin-left:-605px;}
.banner .btn.next {background-position:0 -5604px;margin-left:555px;}
.banner .number-list {position:absolute;left:0;width:100%;bottom:4px;text-align:center;z-index:2;}
.banner .number-list li {
  display:inline-block;
  width:8px;height:8px;
  margin:0 8px 10px;
  cursor:pointer;
  background:#FFF;
  border-radius:50%;
  border:1px solid #cecece;
  transition:.7s all ease
}
.banner .number-list .active {
  background:#a7936e;
  box-shadow:0 0 0 4px #dfcead;
}
</style>
