<template>
  <div id="table">
    <el-table :data="tableDate" stripe>
      <el-table-column prop="uid" label="用户id"> </el-table-column>
      <el-table-column prop="uname" label="用户名"> </el-table-column>
      <el-table-column prop="uage" label="年龄"></el-table-column>
      <el-table-column prop="uemail" label="邮箱"></el-table-column>
      <el-table-column prop="rname" label="昵称"> </el-table-column>
      <el-table-column prop="uphone" label="电话号码"> </el-table-column>
      <el-table-column prop="usex" label="性别"> </el-table-column>
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
        layout="total, prev, pager, next"
        background
        :total="total"
        :page-size="10"
        :current-page.sync="page"
        @current-change="getTable"
      >
      </el-pagination>
    </div>

    <el-dialog center title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form.uid" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="uname"
        >
          <el-input
            v-model="form.uname"
            disabled
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="年龄"
          :label-width="formLabelWidth"
          prop="uage"
        >
          <el-input type="number" v-model="form.uage" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth"
          prop="uemail"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="form.uemail" autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="rname"
          :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]"
        >
          <el-input v-model="form.rname" autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item
          label="电话号码"
          :label-width="formLabelWidth"
          prop="uphone"
          :rules="[
            { required: true, message: '请输入电话号码', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.uphone" autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="usex">
          <el-radio-group v-model="form.usex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
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
import { getUser, deleteUser, updateUser } from "@/api/user";
export default {
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
        uage: [
          { required: true, message: "请输入面积", trigger: "blur" },
          { validator: over },
        ]
      },
      formLabelWidth: "120px",
      isshow: false,
      total: 0,
    };
  },
  computed: {},
  created() {
    this.getTable();
  },
  methods: {
    getTable() {
      getUser({
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
          deleteUser({
            id: row.uid,
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
          updateUser(this.form).then((res) => {
            this.getTable();
            this.dialogFormVisible = false;
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