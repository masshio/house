<template>
  <div id="table">
    <el-table :data="tableDate" stripe>
      <el-table-column prop="u_id" label="用户id"> </el-table-column>
      <el-table-column prop="u_name" label="用户名"> </el-table-column>
      <el-table-column prop="u_add" label="地址"></el-table-column>
      <el-table-column prop="u_age" label="年龄"></el-table-column>
      <el-table-column prop="u_email" label="邮箱"></el-table-column>
      <el-table-column prop="r_name" label="真实姓名"> </el-table-column>
      <el-table-column prop="u_phone" label="电话号码"> </el-table-column>
      <el-table-column prop="u_sex" label="性别"> </el-table-column>
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
          <el-input v-model="form.u_id" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="u_name"
        >
          <el-input
            v-model="form.u_name"
            disabled
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="地址"
          :label-width="formLabelWidth"
          prop="u_add"
          :rules="[{ required: true, message: '请输入地址', trigger: 'blur' }]"
        >
          <el-input v-model="form.u_add"> </el-input>
        </el-form-item>
        <el-form-item
          label="年龄"
          :label-width="formLabelWidth"
          prop="u_age"
        >
          <el-input type="number" v-model="form.u_age" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth"
          prop="u_email"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="form.u_email" autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item
          label="真实姓名"
          :label-width="formLabelWidth"
          prop="r_name"
          :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]"
        >
          <el-input v-model="form.r_name" autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item
          label="电话号码"
          :label-width="formLabelWidth"
          prop="u_phone"
          :rules="[
            { required: true, message: '请输入电话号码', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.u_phone" autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="u_sex">
          <el-radio-group v-model="form.u_sex">
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
        u_age: [
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
            id: row.u_id,
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