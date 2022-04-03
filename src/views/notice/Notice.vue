<template>
  <div>
  <nav-bar></nav-bar>
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
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        v-for="item in tableData"
        :key="item.id"
        :title="item.title"
        :name="item.id"
      >
        <div>
          {{ item.content }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getNotice } from "@/api/notice";
import NavBar from "@/components/navbar/NavBar.vue";
export default {
  name: 'Notice',
  data() {
    return {
      tableData: [],
      activeName: "1",
      flag: true,
      scrollEven: null,
    };
  },
  components: {
    NavBar
  },
  mounted() {
    getNotice({
      page: 1,
      size: 5,
    }).then((res) => {
      this.tableData = res.data.result;
    });
  },
};
</script>
<style scoped lang="scss">
// 
</style>