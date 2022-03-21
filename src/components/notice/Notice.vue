<template>
  <div :class="{
    'notice': flag,
    'f-notice': !flag
  }">
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
      <el-collapse-item v-for="item in tableData" :key="item.id" :title="item.title" :name="item.id">
        <div>
          {{item.content}}
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
      activeName: '1',
      flag: true
    };
  },
  mounted() {
    getNotice().then((res) => {
      this.tableData = res.data.result;
    });
  }
};
</script>
<style scoped lang="scss">
.notice {
  width: 250px;
  position: absolute;
  top: 100px;
  right: 25px;
}
.f-notice {
  width: 250px;
  position: fixed;
  top: 100px;
  right: 25px;
}
</style>