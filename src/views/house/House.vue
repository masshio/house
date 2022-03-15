<template>
  <div class="house-body">
    <nav-bar></nav-bar>
    <div class="house-form">
      <h2>发布房屋</h2>
      <el-divider></el-divider>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="详细地址：" prop="add">
          <el-input v-model.trim="form.add" clearable></el-input>
        </el-form-item>
        <el-form-item label="房屋面积：" prop="square">
          <el-input v-model.trim="form.square" clearable type="number">
            <template slot="append">m<sup>2</sup></template>
          </el-input>
        </el-form-item>
        <el-form-item label="房屋描述：" prop="des">
          <el-input
            type="textarea"
            maxlength="100"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model.trim="form.des"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="月租：" prop="price">
          <el-input v-model="form.price" clearable type="number">
            <template slot="append">元/月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="房屋类型：" prop="type">
          <el-input
            v-model.trim="form.type"
            clearable
            placeholder="如：三室一厅一卫"
          ></el-input>
        </el-form-item>
        <el-form-item label="房屋照片：" prop="pic">
          <el-upload
            :class="{ hide: hideUpload }"
            ref="upload"
            action="http://127.0.0.1:3000/house/uploadImg"
            :headers="headers"
            list-type="picture-card"
            :limit="limit"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传一张jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-button type="success" icon="el-icon-check" @click="save">
          发布
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addHouses } from "@/api/house";
import NavBar from "@/components/navbar/NavBar.vue";
export default {
  name: "House",
  data() {
    var over = (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error("数字应大于0"));
      } else {
        callback();
      }
    };
    return {
      form: {
        add: "",
        square: "",
        des: "",
        price: "",
        type: "",
        pic: "",
      },
      limit: 1,
      hideUpload: false,
      fileList: [],
      headers: {
        token: this.$store.state.token,
      },
      rules: {
        add: [{ required: true, message: "请输入地址", trigger: "blur" }],
        square: [
          { required: true, message: "请输入面积", trigger: "blur" },
          { validator: over },
        ],
        des: [{ required: true, message: "请输入描述", trigger: "blur" }],
        price: [
          { required: true, message: "请输入月租价格", trigger: "blur" },
          { validator: over },
        ],
        type: [{ required: true, message: "请输入房屋类型", trigger: "blur" }],
        pic: [{ required: true, message: "请上传房屋图片", trigger: "blur" }],
      },
    };
  },
  components: {
    NavBar,
  },
  methods: {
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.userid = this.$store.state.id;
          addHouses(this.form)
            .then( _ => {
              this.$message({
                type: "success",
                message: "发布成功,请查看个人信息是否填写完全",
              });
              this.$refs.form.resetFields();
              this.fileList = [];
               this.hideUpload = false;
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err,
              });
            });
        }
      });
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= 1;
    },
    handleRemove(file, fileList) {
      this.form.pic = ''
      this.hideUpload = fileList.length >= 1;
    },
    handleSuccess(res, file, fileList) {
      this.form.pic = res.pic;
    },
  },
};
</script>
<style>
.house-body {
  /* width: 100%; */
  /* height: 100%; */
  /* background-image: url('../../assets/reg-bg.png'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.house-form {
  width: 40vw;
  position: relative;
  margin: 70px auto;
  left: 0;
  right: 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  z-index: 100;
  background: #fff;
}
h2 {
  font-size: 30px;
  margin-bottom: 50px;
}
.hide .el-upload--picture-card {
  display: none;
}
</style>