<template>
  <div id="item-wrap">
    <!-- <img src="" alt=""> -->
    <div class="title" @click="toDetail">{{house.h_des}}</div>
    <div class="addr">
      {{house.h_add}}
    </div>
    <div>
      <span>{{house.h_square}}m<sup>2</sup></span> / 
      <span>{{house.h_type}}</span>
    </div>
    <div class="price">{{house.h_price}} <span>元/月</span> </div>
    <!-- <el-divider class="divider"></el-divider> -->
  </div>
</template>

<script>
export default {
  name: "HouseItem",
  props: {
    house: Object
  },
  methods: {
    toDetail() {
      this.$router.push('/detail/'+ this.house.h_id)
    }
  }
};
</script>
<style scoped lang="scss">
#item-wrap {
  width: 60vw;
  height: 110px;
  margin: 20px 20vw;
  padding: 20px 30px;
  border-radius: 10px;
  transition: 0.5s;
  perspective: 500px;
  &:hover {
    background: #eee;
    // transform: scale(1.05);
    transform: translate(2px, 2px);
  }
  .title {
    font-size: 30px;
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