<template>
  <div>
    <nav-bar></nav-bar>
    <div id="house-form">
      <h2>发布房屋</h2>
      <el-divider></el-divider>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="详细地址：" prop="add">
          <el-input v-model="form.add" clearable></el-input>
        </el-form-item>
        <el-form-item label="房屋面积：" prop="square">
          <el-input v-model="form.square" clearable type="number">
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
            v-model="form.des"
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
            v-model="form.type"
            clearable
            placeholder="如：三室一厅一卫"
          ></el-input>
        </el-form-item>
        <el-button type="success" icon="el-icon-check" @click="save"
          >发布</el-button
        >
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
      },
    };
  },
  components: {
    NavBar,
  },
  methods: {
    save() {
      this.form.userid = this.$store.state.id;
      addHouses(this.form)
        .then((res) => {
          this.$message({
            type: "success",
            message: "发布成功,请查看个人信息是否填写完全",
          });
          this.$refs.form.resetFields();
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "发布失败",
          });
        });
    },
  },
};
</script>
<style scoped>
#house-form {
  width: 40vw;
  position: relative;
  margin: auto;
  left: 0;
  right: 0;
  margin-top: 100px;
}
h2 {
  font-size: 30px;
  margin-bottom: 50px;
}
</style>