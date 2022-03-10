<template>
  <div>
    <nav-bar></nav-bar>
    <div class="home-list">
      <div class="input-addr">
        <span>地址：</span>
        <el-input
          placeholder="查询地址"
          v-model="inputAddr"
          prefix-icon="el-icon-search"
          @keyup.enter.native="toOne"
        >
          <el-button slot="append" icon="el-icon-search" @click="toOne"></el-button>
        </el-input>
      </div>
      <house :list="list"></house>
      <div class="pagination" v-show="isshow">
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
export default {
  name: "Home",
  data() {
    return {
      list: [],
      page: 1,
      size: 10,
      total: 0,
      isshow: false,
      inputAddr: '',
      preSearch: ''
    };
  },
  components: {
    House,
    NavBar,
  },
  created() {
    this.search();
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
        page: this.page,
        size: this.size
      }).then(res => {
        this.list = res.data.result;
        this.total = res.total;
        window.scrollTo(0, 0);
        this.isshow = true;
      })
    }
  },
};
</script>
<style scoped>
.home-list {
  overflow: hidden;
  /* background: rgba(0, 0, 0, .04); */
}
.pagination {
  width: 60vw;
  margin: 20px 20vw;
  display: flex;
  justify-content: center;
}
.input-addr {
  width: 60vw;
  margin-left: 20vw;
  margin-top: 30px;
  position: relative;
  line-height: 40px;
  padding-left: 30px;
}
.el-input {
  width: 80%;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
</style>