<template>
  <div id="table">
    <el-table :data="tableDate" stripe>
      <el-table-column prop="h_add" label="地址"></el-table-column>
      <el-table-column prop="h_des" label="描述"></el-table-column>
      <el-table-column prop="h_price" label="月租"> </el-table-column>
      <el-table-column prop="h_square" label="面积"> </el-table-column>
      <el-table-column prop="h_type" label="房屋类型"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-show="isshow">
      <el-pagination
        layout="prev, pager, next"
        background
        :total="total"
        :page-size="5"
        :current-page.sync="page"
        @current-change="getHouses"
      >
      </el-pagination>
    </div>

    <el-dialog center title="房屋信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="详细地址"
          :label-width="formLabelWidth"
          prop="h_add"
          :rules="[{ required: true, message: '请输入地址', trigger: 'blur' }]"
        >
          <el-input v-model="form.h_add" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
          prop="h_des"
          :rules="[{ required: true, message: '请输入描述', trigger: 'blur' }]"
        >
          <el-input
            type="textarea"
            maxlength="100"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.h_des"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="月租" :label-width="formLabelWidth" prop="h_price">
          <el-input type="number" v-model="form.h_price" autocomplete="off">
            <template slot="append">元/月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="面积" :label-width="formLabelWidth" prop="h_square">
          <el-input type="number" v-model="form.h_square" autocomplete="off">
            <template slot="append">m<sup>2</sup></template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="房屋类型"
          :label-width="formLabelWidth"
          prop="h_type"
          :rules="[{ required: true, message: '请输入房屋类型', trigger: 'blur' }]"
        >
          <el-input v-model="form.h_type" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOwnHouses, deleteHouses, updateHouses } from "@/api/house";
export default {
  data() {
    var over = (rule, value, callback)=>{
      if(value <= 0){
        callback(new Error("数字应大于0"))
      } else {
        callback()
      }
    }
    return {
      page: 1,
      total: 0,
      tableDate: [],
      dialogFormVisible: false,
      form: {},
      rules:{
        h_square: [{validator: over},{ required: true, message: '请输入面积', trigger: 'blur' },],
        h_price: [{validator: over}, { required: true, message: '请输入月租价格', trigger: 'blur' }]
      },
      formLabelWidth: "120px",
      isshow: false,
      total: 0,
    };
  },
  computed: {
    userid() {
      return this.$store.state.id;
    },
  },
  created() {
    this.getHouses();
  },
  methods: {
    getHouses() {
      getOwnHouses({
        userid: this.userid,
        page: this.page,
        size: 5,
      }).then((res) => {
        this.total = res.total;
        this.tableDate = res.data.result;
        this.isshow = true;
      });
    },
    handleClick(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteHouses({
            id: row.h_id,
          }).then(() => {
            this.getHouses();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleConfirm() {
      updateHouses(this.form).then((res) => {
        this.getHouses()
        this.dialogFormVisible = false;
      });
    },
    change() {},
  },
};
</script>
<style scoped lang="scss">
#table {
  width: 60vw;
  margin-left: 30vw;
  overflow: hidden;
  margin-top: 100px;
}
.pagination {
  width: 60vw;
  margin: 20px 20vw;
  display: flex;
  justify-content: center;
}
</style>