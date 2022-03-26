<template>
  <div>
    <div class="table-operator">
      <el-button type="primary" @click="addFormVisible = true">新建</el-button>
    </div>
    <el-table :data="tableDate" stripe>
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="content" label="内容" > </el-table-column>
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

    <el-dialog center title="修改公告" :visible="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="标题：" prop="title" :label-width="formLabelWidth">
          <el-input v-model="form.title" clearable placeholder="请输入标题"> </el-input>
        </el-form-item>
        <el-form-item
          label="内容："
          :label-width="formLabelWidth"
          prop="content"
        >
          <el-input
            type="textarea"
            maxlength="200"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.content"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog center title="新建公告" :visible="addFormVisible">
      <el-form :model="addform" :rules="rules" ref="addform" label-width="100px">
        <el-form-item label="标题：" prop="title" :label-width="formLabelWidth">
          <el-input v-model="addform.title" placeholder="请输入标题" clearable> </el-input>
        </el-form-item>
        <el-form-item
          label="内容："
          :label-width="formLabelWidth"
          prop="content"
        >
          <el-input
            type="textarea"
            maxlength="200"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="addform.content"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getNotice, deleteNotice, addNotice, updateNotice } from "@/api/notice";
export default {
  name: "ManageNotice",
  data() {
    return {
      total: 0,
      tableDate: [],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      isshow: false,
      page: 1,
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      addform: {},
      addFormVisible: false,
    };
  },
  created() {
    this.getTable();
  },
  methods: {
    getTable() {
      getNotice({
        page: this.page,
        size: 10,
      }).then((res) => {
        this.tableDate = res.data.result;
        this.isshow = true;
        this.total = res.total;
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
          deleteNotice({
            id: row.id,
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
    handleCancel() {
      this.dialogFormVisible = false;
    },
    handleConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateNotice(this.form)
            .then((res) => {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.dialogFormVisible = false;
              this.getTable();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: "修改失败",
              });
            });
        }
      });
    },
    addConfirm() {
        this.$refs.addform.validate((valid) => {
        if (valid) {
          addNotice(this.addform)
            .then((res) => {
              this.$message({
                type: "success",
                message: "添加成功",
              });
              this.addFormVisible = false;
              this.getTable();
              this.addform = {}
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: "添加失败",
              });
            });
        }
      });
    }
  },
};
</script>
<style scoped lang="scss">
.pagination {
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.table-operator {
  margin-bottom: 18px;
  text-align: left;
}
</style>