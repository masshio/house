<template>
  <div id="item-wrap">
    <!-- <img src="" alt=""> -->
    <img :src="imgUrl" class="img">
    <div class="title" @click="toDetail">
      {{house.mode}} | {{house.estate}} {{house.htype}}
    </div>
    <div class="addr">
      {{house.hadd}}
    </div>
    <div>
      <span>{{house.hsquare}}m<sup>2</sup></span> / 
      <span>{{house.htype}}</span>
    </div>
    <div class="price">{{house.hprice}} <span>元/月</span> </div>
    <!-- <el-divider class="divider"></el-divider> -->
  </div>
</template>

<script>
export default {
  name: "HouseItem",
  props: {
    house: Object
  },
  computed: {
    imgUrl() {
      return 'http://localhost:3000/' + this.house.hpic[0]
    }
  },
  methods: {
    toDetail() {
      this.$router.push('/detail/'+ this.house.hid)
    }
  }
};
</script>
<style scoped lang="scss">
#item-wrap {
  width: 980px;
  height: 110px;
  margin: 20px auto;
  padding: 20px 30px;
  border-radius: 10px;
  transition: 0.5s;
  perspective: 500px;
  &:hover {
    background: #eee;
    // transform: scale(1.05);
    transform: translate(2px, 2px);
  }
  .img {
    width: 147px; 
    height: 110px;
    float: left;
    margin-right: 20px
  }
  .title {
    font-size: 25px;
    cursor: pointer;
    display: inline-block;
    width: 40vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover {
      color: #bb0000;
    }
  }
  .divider {
    position: absolute;
    bottom: -30px;
    left: 0px;
  }
  .addr {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .price {
    height: 30px;
    line-height: 30px;
    font-size: 30px;
    position: absolute;
    right: 30px;
    top:0;
    bottom: 0;
    margin: auto;
    color: #bb0000;
    span {
      font-size: 18px;
    }
  }
}
</style>