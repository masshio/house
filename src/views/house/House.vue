<template>
  <div class="house-body">
    <nav-bar></nav-bar>
    <div class="house-form">
      <h3>发布房屋</h3>
      <el-divider></el-divider>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="租赁方式：" prop="mode">
          <el-select v-model="form.mode" placeholder="请选择租赁方式">
            <el-option label="整租" value="整租"></el-option>
            <el-option label="合租" value="合租"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="小区名称：" prop="estate">
          <el-input v-model.number="form.estate" clearable> </el-input>
        </el-form-item>
        <el-form-item label="楼层信息：" required>
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
        <el-form-item label="房屋朝向：" prop="orientation">
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
            :autosize="{ minRows: 4, maxRows: 4 }"
            placeholder="可以介绍一下房源亮点，交通、周边环境，可以入住的时间和对租客的要求等，详细的描述会大大增加快速出租的机会！请不要在描述中包含：1.任意形式的联系方式及变型词；2.与房源或相关配套描述无关的内容；3.违反国家法律法规的内容等"
            v-model.trim="form.des"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="月租金：" required>
          <el-col :span="8">
            <el-form-item prop="price">
              <el-input v-model="form.price" type="number">
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
      },
      limit: 1,
      hideUpload: false,
      fileList: [],
      headers: {
        token: this.$store.state.token,
      },
      rules: {
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
        pay: [{ required: true, message: "请选择付款方式", trigger: "blur" }],
        type: [{ required: true, message: "请输入房屋类型", trigger: "blur" }],
        pic: [{ required: true, message: "请上传房屋图片", trigger: "blur" }],
      },
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
            .then((_) => {
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
      this.form.pic = "";
      this.hideUpload = fileList.length >= 1;
    },
    handleSuccess(res, file, fileList) {
      this.form.pic = res.pic;
    },
  },
};
</script>
<style>
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
h3 {
  font-size: 30px;
}
.hide .el-upload--picture-card {
  display: none;
}
</style>