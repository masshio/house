<template>
  <div
    class="notice"
    ref="notice"
  >
    <!-- <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item>
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="title"> </el-table-column>
    </el-table> -->

    <el-collapse v-model="activeName">
      <el-collapse-item
        v-for="item in tableData"
        :key="item.id"
        :name="item.id"
      >
        <template slot="title">
          {{item.title}}&nbsp;<i class="header-icon el-icon-info"></i>
        </template>
        <div>
          {{ item.content }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getNotice } from "@/api/notice";
export default {
  data() {
    return {
      tableData: [],
      activeName: "1",
      flag: true,
      scrollEven: null,
      // func: () => {
      //   if (window.scrollY > this.$refs.notice.offsetTop) {
      //     this.flag = false;
      //   } else {
      //     this.flag = true;
      //   }
      // },
    };
  },
  mounted() {
    getNotice({
      page: 1,
      size: 5,
    }).then((res) => {
      this.tableData = res.data.result;
    });
    // window.addEventListener("scroll", this.func);
  },
  destroyed() {
    // window.removeEventListener("scroll", this.func);
  },
};
</script>
<style scoped lang="scss">
.notice {
  width: 250px;
  // position: absolute;
  // top: 100px;
  // right: 25px;
  float: right;
  border: 1px solid rgba(0, 0, 0, 0.04);
  margin-top: 20px;
  position: sticky;
  top: 10px;
}
// .f-notice {
//   width: 250px;
//   position: fixed;
//   right: 25px;
// }
</style>