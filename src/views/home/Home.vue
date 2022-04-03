<template>
  <div class="home">
    <nav-bar></nav-bar>
    <div class="fliter">
      <div class="addr-search">
        <el-input
          class="search"
          placeholder="请输入地址或小区开始找房"
          v-model="inputAddr"
          prefix-icon="el-icon-search"
          @keyup.enter.native="toOne"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="toOne"
          ></el-button>
        </el-input>
      </div>
      <div class="item">
        <span class="title" @click="changeMode(0)" :class="{ active: mode == 0}">方式</span>
        <span @click="changeMode(1)" :class="{ active: mode == 1}">整租</span>
        <span @click="changeMode(2)" :class="{ active: mode == 2}">合租</span>
      </div>
      <div class="item">
        <span class="title" @click="changePrice(0)" :class="{ active: price == 0}">价格</span>
        <span @click="changePrice(1)" :class="{ active: price == 1}">0-1000元</span>
        <span @click="changePrice(2)" :class="{ active: price == 2}">1000-2000元</span>
        <span @click="changePrice(3)" :class="{ active: price == 3}">2000-3000元</span>
        <span @click="changePrice(4)" :class="{ active: price == 4}">3000-5000元</span>
        <span @click="changePrice(5)" :class="{ active: price == 5}">≥5000元</span>
      </div>
      <div class="item">
        <span class="title" @click="changeSquare(0)" :class="{ active: square == 0}">面积</span>
        <span @click="changeSquare(1)" :class="{ active: square == 1}">≤40㎡</span>
        <span @click="changeSquare(2)" :class="{ active: square == 2}">40-60㎡</span>
        <span @click="changeSquare(3)" :class="{ active: square == 3}">60-80㎡</span>
        <span @click="changeSquare(4)" :class="{ active: square == 4}">80-100㎡</span>
        <span @click="changeSquare(5)" :class="{ active: square == 5}">100-120㎡</span>
        <span @click="changeSquare(6)" :class="{ active: square == 6}">≥120㎡</span>
      </div>
    </div>
    <div class="home-list">
      <notice></notice>
      <house :list="list" v-show="list.length"></house>
      <div v-show="list.length === 0" class="re-search">
        没找到相关房源，可尝试调整筛选条件
      </div>
      <div class="pagination" v-show="isshow && list.length">
        <el-pagination
          layout="total, prev, pager, next"
          background
          :total="total"
          :current-page.sync="page"
          @current-change="search"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import House from "@/components/house/House.vue";
import NavBar from "@/components/navbar/NavBar.vue";
import { getHouses, searchAdd } from "@/api/house";
import Notice from "@/components/notice/Notice.vue";
export default {
  name: "Home",
  data() {
    return {
      list: [],
      page: 1,
      size: 10,
      total: 0,
      isshow: false,
      inputAddr: "",
      preSearch: "",
      mode: 0,
      price: 0,
      square: 0
    };
  },
  components: {
    House,
    NavBar,
    Notice,
  },
  created() {
    this.search();
    console.log('hhhhh');
  },
  methods: {
    change() {
      this.isshow = false;
      getHouses({
        page: this.page,
        size: this.size,
      }).then((res) => {
        this.list = res.data.result;
        this.total = res.total;
        window.scrollTo(0, 0);
        this.isshow = true;
      });
    },
    toOne() {
      this.page = 1;
      this.preSearch = this.inputAddr;
      this.search();
    },
    search() {
      this.isshow = false;
      searchAdd({
        addr: this.preSearch,
        mode: this.mode,
        price: this.price,
        square: this.square,
        page: this.page,
        size: this.size,
      }).then((res) => {
        this.list = res.data.result;
        this.total = res.total;
        window.scrollTo(0, 0);
        this.isshow = true;
      });
    },
    changeSquare(index) {
      this.square = index;
      this.toOne();
    },
    changePrice(index) {
      this.price = index;
      this.toOne();
    },
    changeMode(index) {
      this.mode = index;
      this.toOne();
    }
  },
};
</script>
<style scoped lang="scss">
.home {
  position: relative;
  min-width: 1150px;
  /* background: rgba(0, 0, 0, .01); */
}
.home-list {
  width: 1150px;
  overflow: hidden;
  /* position: relative; */
  margin: 10px auto;
  background: #fff;
}
.pagination {
  width: 850px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
}
.fliter {
  width: 1150px;
  position: relative;
  line-height: 40px;
  margin: 10px auto;
  font-size: 14px;
  border-bottom: 1px solid rgb(233, 233, 233);
  padding-bottom: 10px;
  .addr-search {
    width: 600px;
    margin: 20px auto;
  }
  .item {
    .active {
      color: #00ae66;
      font-weight: 700;
    }
    span {
      margin: 9px;
      line-height: 14px;
      &:hover {
        color: #00ae66;
        cursor: pointer;
      }
    }
    .title {
      font-weight: 600;
      margin-right: 20px;
      &:hover {
        color: #00ae66;
        cursor: pointer;
      }
    }
  }
}
.re-search {
  font-size: 23px;
  text-align: center;
  color: #888;
  margin-top: 40px;
}
</style>