<template>
  <div id="main">
    <h1>管理员登录</h1>
    <div class="wrap">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
        :hide-required-asterisk="true"
      >
        <el-form-item label="用户名：" prop="name">
          <el-input
            v-model.trim="form.name"
            clearable
            placeholder="请输入用户名"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pwd">
          <el-input
            v-model.trim="form.pwd"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            @keyup.native.enter="onSubmit"
          ></el-input>
        </el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :loading="loading"
            class="el-btn"
          >
            登录
          </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { AdminLogin } from "@/api/login";
export default {
  name: "AdminLogin",
  data() {
    return {
      form: {
        name: "",
        pwd: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loading: false,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          AdminLogin(this.form)
            .then((res) => {
              this.loading = false;
              if (res.code >= 200) {
                this.$store.commit("SET_TOKEN", res.token);
                this.$store.commit("SET_ISADMIN", 1);
                this.$router.push("/manage");
              } else {
                this.$message.error("登陆失败");
              }
            })
            .catch((err) => {});
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
#main {
  text-align: center;
  height: 100vh;
  overflow: hidden;
  background: #f0f2f5 url("../../assets/background.svg") no-repeat 50%;
  h1 {
    margin-top: 100px;
  }
  .wrap {
    width: 500px;
    height: 250px;
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
</style>