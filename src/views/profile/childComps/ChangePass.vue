<template>
  <div id="change-form">
    <h3>修改密码</h3>
    <el-divider></el-divider>
    <el-form class="form" ref="form" :rules="rules" :model="form" status-icon label-width="100px">
      <el-form-item label="当前密码:" prop="pass">
        <el-input v-model="form.pass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新的密码:" prop="changePass">
        <el-input v-model="form.changePass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="configPass">
        <el-input v-model="form.configPass" type="password"></el-input>
      </el-form-item>
      <el-button type="success" icon="el-icon-check" @click="save"
        >确认</el-button
      >
      <!-- <el-form-item>
        <el-input v-model="form.name" type="hidden"></el-input>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { changePass } from "@/api/profile";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.form.configPass !== "") {
          this.$refs.form.validateField("configPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.changePass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        pass: "",
        changePass: "",
        configPass: "",
      },
      rules: {
        changePass: [{ validator: validatePass, trigger: "blur" }],
        configPass: [{ validator: validatePass2, trigger: "blur" }],
        pass: [{ required: true, message: "请输入当前密码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.form.name = this.$store.state.name;
  },
  methods: {
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          changePass(this.form).then((res) => {
            if (res.code == -100) {
              this.$message({
                type: "error",
                message: "当前密码输入错误，请重新输入",
              });
              this.form.pass = "";
            } else {
              this.$message({
                type: "success",
                message: "密码修改成功",
              });
              this.$refs.form.resetFields();
            }
          });
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
#change-form {
  width: 600px;
  position: relative;
  margin: 40px auto;
  left: 0;
  right: 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  z-index: 100;
}
h2 {
  font-size: 35px;
}
</style>