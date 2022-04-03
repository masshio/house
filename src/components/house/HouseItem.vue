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
    <div class="font-14">
      <span>{{house.estate}}</span><i>/</i>
      <span>{{house.hsquare}}m<sup>2</sup></span><i>/</i>
      <span>{{house.htype}}</span><i>/</i>
      <span>{{house.orientation}}</span>
    </div>
    <div class="price">{{house.hprice}} <span>元/月</span> </div>
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
  width: 780px;
  height: 110px;
  // margin: 20px auto;
  margin-top: 20px;
  padding: 20px 30px;
  border-radius: 10px;
  transition: 0.5s;
  perspective: 500px;
  float: left;
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
  .font-14 {
    font-size: 14px;
    color: #6d6d73;
    font-weight: 700;
    i {
      margin: 0 10px
    }
  }
  .title {
    font-size: 20px;
    font-weight: 700;
    color: #101d37;
    cursor: pointer;
    display: inline-block;
    width: 300px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover {
      color: #bb0000;
    }
  }
  .addr {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 700;
  }
  .price {
    height: 30px;
    line-height: 30px;
    font-size: 28px;
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