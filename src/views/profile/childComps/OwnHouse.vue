<template>
  <div id="own-table">
    <el-table :data="tableDate" stripe>
      <el-table-column prop="hadd" label="地址"></el-table-column>
      <el-table-column prop="hdes" label="描述"></el-table-column>
      <el-table-column prop="hprice" label="月租"> </el-table-column>
      <el-table-column prop="hsquare" label="面积"> </el-table-column>
      <el-table-column prop="htype" label="房屋类型"> </el-table-column>
      <el-table-column label="房屋图片">
        <template slot-scope="scope">
          <span class="title-img">
            <img
              :src="'http://localhost:3000/' + scope.row.hpic"
              class="table-img"
            />
          </span>
        </template>
      </el-table-column>
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
      <el-form :model="form" :rules="rules" ref="form">
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
          <el-input type="number" v-model="form.hsquare" autocomplete="off">
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
        <el-form-item
          label="房屋图片"
          :label-width="formLabelWidth"
          prop="hpic"
        >
          <el-upload
            :class="{hide: hideUpload}"
            ref="upload"
            action="111"
            :auto-upload="false"
            :limit="limit"
            list-type="picture-card"
            :http-request="handleUpload"
            :file-list="fileList"
            :on-change="handleChange"
            :on-remove="handleChange"
          >
            <!-- <img v-if="imgUrl" :src="imgUrl" alt="photoPath" width="86px" height="86px" />
            <div v-else>
              <a-icon :type="imgLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
              <div class="ant-upload-desc">108x108</div>
            </div> -->
            <img
              v-if="flag"
              :src="'http://localhost:3000/' + form.hpic"
              class="uppic"
              alt=""
            />
            <i v-else class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传一张jpg/png文件，且不超过500kb
            </div>
          </el-upload>
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
import { getOwnHouses, deleteHouses, updateHouses } from "@/api/house";
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
      limit: 1,
      flag: true,
      fileList: [],
      dialogFormVisible: false,
      form: {},
      hideUpload: false,
      rules: {
        hsquare: [
          { validator: over },
          { required: true, message: "请输入面积", trigger: "blur" },
        ],
        hprice: [
          { validator: over },
          { required: true, message: "请输入月租价格", trigger: "blur" },
        ],
        hpic: [{ required: true, message: "请上传房屋图片", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      isshow: false,
      total: 0,
      fileData: new FormData()
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
    handleChange(file, fileList) {
      console.log("handleChange", fileList);
      this.flag = !this.flag;
      this.hideUpload = fileList.length >= 1;
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this.fileList = [];
      this.flag = true;
      this.hideUpload = false;
    },
    handleClick(row) {
      this.form = JSON.parse(JSON.stringify(row));
      // this.fileList = [{ url: "http://localhost:3000/" + row.hpic }];
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
            message: "取消删除",
          });
        });
    },
    handleConfirm() {
      this.$refs.upload.submit();
      Object.keys(this.form).forEach((key) => {
        this.fileData.append(key, this.form[key]);
      });
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateHouses(this.fileData)
            .then((res) => {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.getHouses();
              this.dialogFormVisible = false;
              this.fileList = [];
              this.flag = true;
              this.fileData = new FormData();
              this.hideUpload = true;
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: "修改失败",
              });
              this.flag = true;
            });
        }
      });
    },
    handleUpload(raw) {
      // this.form.userid = this.$store.state.id;
      this.form.pic = "sad";
      this.fileData.append("file", raw.file);
    },
  },
};
</script>
<style lang="scss">
#own-table {
  width: 60vw;
  margin-left: 30vw;
  overflow: hidden;
  margin-top: 100px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
}
.pagination {
  width: 60vw;
  margin: 20px 20vw;
  display: flex;
  justify-content: center;
}
.title-img {
  display: flex;
  align-items: center;
}
.table-img {
  min-width: 32px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 32px;
}
.uppic {
  width: 146px;
  height: 146px;
}
.hide .el-upload--picture-card {
  display: none;
}
// .el-upload {
//   width: 146px;
//   height: 146px;
//   border: 1px dashed #eee;
// }
</style>