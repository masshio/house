<template>
  <div id="own-table">
    <el-table :data="tableDate" stripe>
      <el-table-column prop="hadd" label="地址" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="hdes" label="描述" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="hprice" label="月租"> </el-table-column>
      <el-table-column prop="hsquare" label="面积"> </el-table-column>
      <el-table-column prop="htype" label="房屋类型"> </el-table-column>
      <el-table-column label="房屋图片">
        <template slot-scope="scope">
          <span class="title-img">
            <img
              :src="'http://localhost:3000/' + scope.row.hpic[0]"
              class="table-img"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)"
            >修改</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="审核状态">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" v-if="scope.row.examine < 0">
            <p>{{ scope.row.reason }}</p>
            <div slot="reference">
              <el-tag type="danger" size="medium">审核未通过</el-tag>
            </div>
          </el-popover>
          <el-tag v-else size="medium">审核中</el-tag>
          
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
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="租赁方式：" prop="mode" :label-width="formLabelWidth">
          <el-select v-model="form.mode" placeholder="请选择租赁方式">
            <el-option label="整租" value="整租"></el-option>
            <el-option label="合租" value="合租"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="小区名称：" prop="estate" :label-width="formLabelWidth">
          <el-input v-model.number="form.estate" clearable> </el-input>
        </el-form-item>
        <el-form-item label="楼层信息：" required :label-width="formLabelWidth">
          <el-col :span="8">
            <el-form-item prop="floor">
              <el-input v-model.number="form.floor" type="number">
                <template slot="prepend">第</template>
                <template slot="append">层</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">&nbsp;</el-col>
          <el-col :span="8">
            <el-form-item prop="tfloor">
              <el-input v-model.number="form.tfloor" type="number">
                <template slot="prepend">共</template>
                <template slot="append">层</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="房屋朝向：" prop="orientation" :label-width="formLabelWidth">
          <el-select
            v-model="form.orientation"
            placeholder="请选择朝向"
            size="medium"
          >
            <el-option
              v-for="item in orientation"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="详细地址："
          :label-width="formLabelWidth"
          prop="hadd"
          :rules="[{ required: true, message: '请输入地址', trigger: 'blur' }]"
        >
          <el-input v-model="form.hadd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="房屋描述："
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
        <el-form-item label="月租金：" required :label-width="formLabelWidth">
          <el-col :span="8">
            <el-form-item prop="hprice">
              <el-input v-model="form.hprice" type="number">
                <template slot="append">元/月</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">&nbsp;</el-col>
          <el-col :span="8">
            <el-form-item prop="pay">
              <el-select v-model="form.pay" placeholder="请选择付款方式">
                <el-option label="押一付一" value="押一付一"></el-option>
                <el-option label="押三付一" value="押三付一"></el-option>
                <el-option label="半年付" value="半年付"></el-option>
                <el-option label="年付" value="年付"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          label="房屋面积："
          :label-width="formLabelWidth"
          prop="hsquare"
        >
          <el-input type="number" v-model="form.hsquare" autocomplete="off">
            <template slot="append">m<sup>2</sup></template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="房屋类型："
          :label-width="formLabelWidth"
          prop="htype"
          :rules="[
            { required: true, message: '请输入房屋类型', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.htype" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="房屋图片："
          :label-width="formLabelWidth"
          prop="hpic"
        >
          <el-upload
            :class="{ hide: hideUpload }"
            ref="upload"
            action="http://127.0.0.1:3000/house/uploadImg"
            :headers="headers"
            :limit="limit"
            :file-list="fileList"
            list-type="picture-card"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            multiple
          >
            <!-- :before-upload="handleUpload" -->
            <i class="el-icon-plus"></i>
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
import { deleteHouses, getExamineHouses, modifyHouse } from "@/api/house";
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
      headers: {
        token: this.$store.state.token,
      },
      limit: 8,
      dialogFormVisible: false,
      fileList: [],
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
        mode: [{ required: true, message: "请选择租赁方式", trigger: "blur" }],
        floor: [
          { required: true, message: "请输入楼层", trigger: "blur" },
          { validator: over },
        ],
        tfloor: [
          { required: true, message: "请输入总楼层", trigger: "blur" },
          { validator: over },
        ],
        estate: [
          { required: true, message: "请输入小区名称", trigger: "blur" },
        ],
        orientation: [
          { required: true, message: "请选择房屋朝向", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      isshow: false,
      total: 0,
      orientation: [
        "东",
        "南",
        "西",
        "北",
        "东南",
        "东北",
        "西南",
        "西北",
        "东西",
        "南北",
      ],
      picList: [],
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
      getExamineHouses({
        userid: this.userid,
        page: this.page,
        size: 5,
      }).then((res) => {
        this.total = res.total;
        this.tableDate = res.data.result;
        this.isshow = true;
      });
    },
    handleUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 jpg/png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= 8;
    },
    handleRemove(file, fileList) {
      let index = file.url ? this.picList.indexOf(file.name) : this.picList.indexOf(file.response.pic);
      this.picList.splice(index,1);
    },
    handleSuccess(res, file, fileList) {
      this.picList.push(res.pic);
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this.fileList = [];
      this.hideUpload = false;
    },
    handleClick(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
      this.fileList = row.hpic.map(item => {
        return {
          name: item,
          url: "http://localhost:3000/" + item
        }
      })
      this.picList = [...row.hpic];
      this.hideUpload = row.hpic.length >= 8;
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.hpic = this.picList;
          modifyHouse(this.form)
            .then((res) => {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.getHouses();
              this.dialogFormVisible = false;
              this.fileList = [];
              this.hideUpload = true;
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
  },
};
</script>
<style lang="scss">
#own-table {
  width: 1000px;
  margin: 40px auto;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
}
.pagination {
  margin: 20px;
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