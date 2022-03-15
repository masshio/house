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
          <el-button type="text" @click="toDetail(scope.row)">
            浏览
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="handlePass(scope.row)">
            通过
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="handleClick(scope.row)">
            驳回
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
    <!-- 驳回理由 -->
    <el-dialog center title="驳回理由" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item
          label="驳回理由"
          :label-width="formLabelWidth"
          prop="reason"
          :rules="[{ required: true, message: '请输入驳回理由', trigger: 'blur' }]"
        >
          <el-input
            type="textarea"
            maxlength="100"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.reason"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { examineHouse, passExamine, rejectExamine } from "@/api/manage";
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
      form: {
        reason: ''
      },
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
      this.form.id = row.hid;
      this.dialogFormVisible = true;
    },
    handleConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          rejectExamine(this.form).then((res) => {
            this.dialogFormVisible = false;
            this.getTable();
            this.$message({
              type: "success",
              message: "已驳回!",
            });
          });
        }
      });
    },
    handlePass(row) {
      passExamine({
        id: row.hid
      }).then(_ => {
        this.getTable();
      })
    },
    toDetail(row) {
      this.$router.push('/detail/'+ row.hid)
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this.form.reason = '';
    }
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
