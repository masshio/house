<template>
  <div
    id="main"
    v-loading="jumpLoading"
    element-loading-text="注册成功，正在跳转至登录页..."
    element-loading-spinner="el-icon-loading"
  >
    <h1>注册</h1>
    <div class="wrap">
      <a href="/" class="back">已有帐号？去登陆</a>
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="用户名：" prop="name">
          <el-input
            v-model="form.name"
            clearable
            placeholder="请输入用户名"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pwd">
          <el-input
            v-model="form.pwd"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input
            v-model="form.checkPass"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请二次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleRegister"
            :loading="loading"
            class="el-btn"
          >
            注册账号
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Register } from "@/api/register";
export default {
  name: "Register",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (value.length < 3 || value.length > 20) {
        callback(new Error("用户名长度应大于三个字符小于20个字符"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        pwd: "",
        checkPass: "",
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pwd: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      loading: false,
      jumpLoading: false,
    };
  },
  methods: {
    handleRegister() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          Register(this.form).then((res) => {
            if (res.code >= 200) {
              this.jumpLoading = true;
              setTimeout(() => {
                this.$router.push("/");
                this.jumpLoading = false;
              }, 1000);
            } else if (res.code == -100) {
              this.$message({
                message: "用户名已被占用，请重新输入",
                type: "error",
              });
              this.form.name = "";
            }
            this.loading = false;
          });
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
#main {
  background: #f0f2f5 url('../../assets/background.svg') no-repeat 50%;
  height: 100vh;
  overflow: hidden;
  text-align: center;
  h1 {
    margin-top: 100px;
  }
  .wrap {
    width: 30vw;
    position: absolute;
    left: 0;
    right: 0;
    top: 200px;
    margin: auto;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    padding-bottom: 0;
  }
}
.el-form {
  margin: 50px 20px;
}
.el-btn {
  width: 40%;
}
.back {
  float: right;
  text-decoration: none;
  color: blue;
  font-size: 13px;
}
</style>