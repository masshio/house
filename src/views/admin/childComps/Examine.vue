<template>
  <div id="table">
    <el-table :data="tableDate" stripe>
      <el-table-column prop="hid" label="id"></el-table-column>
      <el-table-column prop="hadd" label="地址"></el-table-column>
      <el-table-column prop="hdes" label="描述"></el-table-column>
      <el-table-column prop="hprice" label="月租"> </el-table-column>
      <el-table-column prop="hsquare" label="面积"> </el-table-column>
      <el-table-column prop="htype" label="房屋类型"> </el-table-column>
      <el-table-column prop="uid" label="屋主id"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)">
            浏览
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="handleDelete(scope.row)">
            通过
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="handleDelete(scope.row)">
            驳回
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-show="isshow">
      <el-pagination
        layout="total, prev, pager, next"
        background
        :total="total"
        :page-size="10"
        :current-page.sync="page"
        @current-change="getTable"
      >
      </el-pagination>
    </div>

    <el-dialog center title="房屋信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item
          label="详细地址"
          :label-width="formLabelWidth"
          prop="hadd"
          :rules="[{ required: true, message: '请输入地址', trigger: 'blur' }]"
        >
          <el-input v-model="form.hadd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
          prop="hdes"
          :rules="[{ required: true, message: '请输入描述', trigger: 'blur' }]"
        >
          <el-input
            type="textarea"
            maxlength="100"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.hdes"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="月租" :label-width="formLabelWidth" prop="hprice">
          <el-input type="number" v-model="form.hprice" autocomplete="off">
            <template slot="append">元/月</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="面积"
          :label-width="formLabelWidth"
          prop="hsquare"
        >
          <el-input
            type="number"
            v-model.number="form.hsquare"
            autocomplete="off"
          >
            <template slot="append">m<sup>2</sup></template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="房屋类型"
          :label-width="formLabelWidth"
          prop="htype"
          :rules="[
            { required: true, message: '请输入房屋类型', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.htype" autocomplete="off"></el-input>
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
import { examineHouse } from "@/api/manage";
export default {
  name: 'Examine',
  data() {
    var over = (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error("数字应大于0"));
      } else {
        callback();
      }
    };
    return {
      page: 1,
      total: 0,
      tableDate: [],
      dialogFormVisible: false,
      form: {},
      rules: {
        hsquare: [
          { required: true, message: "请输入面积", trigger: "blur" },
          { validator: over },
        ],
        hprice: [
          { required: true, message: "请输入月租价格", trigger: "blur" },
          { validator: over },
        ],
      },
      formLabelWidth: "120px",
      isshow: false,
      total: 0,
    };
  },
  created() {
    this.getTable();
  },
  methods: {
    getTable() {
      examineHouse({
        page: this.page,
        size: 10,
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
            id: row.hid,
          }).then(() => {
            this.getTable();
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateHouses(this.form).then((res) => {
            this.dialogFormVisible = false;
            this.getTable();
          });
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
#table {
  width: 100%;
  overflow: hidden;
}
.pagination {
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>