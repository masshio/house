<template>
  <div id="user-form">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="头像：" prop="avatar">
        <el-upload
          ref="upload"
          class="avatar-upload"
          :class="{ hide: hideUpload }"
          action="http://127.0.0.1:3000/house/uploadImg"
          :headers="headers"
          :limit="1"
          list-type="picture-card"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <img
            :src="'http://localhost:3000/' + form.uavatar"
            class="avatar"
            alt=""
          />
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png图片，且不超过1MB
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名：" prop="uname">
        <el-input v-model="form.uname" clearable :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="昵称：" prop="rname" required>
        <el-input v-model="form.rname" clearable placeholder="用于与其他用户联系"></el-input>
      </el-form-item>
      <el-form-item label="年龄：" prop="uage">
        <el-input
          v-model="form.uage"
          clearable
          type="number"
          min="1"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="usex" required>
        <el-radio-group v-model="form.usex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话号码：" prop="uphone">
        <el-input v-model="form.uphone" clearable></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="uemail">
        <el-input v-model="form.uemail" clearable type="email"></el-input>
      </el-form-item>
      <el-button type="success" icon="el-icon-check" @click="save"
        >保存</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { getMessage, updateMessage } from "@/api/profile";
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
      form: {
        uavatar: "avatar.png",
      },
      headers: {
        token: this.$store.state.token,
      },
      rules: {
        uage: [
          { required: true, message: "年龄不能为空" },
          { validator: over },
        ],
        rname: [
          { required: true, message: "昵称不能为空" },
        ]
      },
      avatar: "",
      hideUpload: false,
    };
  },
  created() {
    this.form.name = this.$store.state.name;
    getMessage({ name: this.form.name }).then((res) => {
      this.avatar = res.data.uavatar;
      this.form = res.data;
    });
  },
  methods: {
    save() {
      updateMessage(this.form).then((res) => {
        this.$message({
          type: "success",
          message: "修改成功",
        });
      });
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= 1;
    },
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= 1;
      this.form.uavatar = this.avatar;
    },
    handleSuccess(res, file, fileList) {
      this.form.uavatar = res.pic;
    },
  },
};
</script>
<style lang="scss">
#user-form {
  width: 600px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 100px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
}
.avatar-upload {
  & .el-upload--picture-card {
    border-radius: 50%;
    border: 1px solid #fff;
    width: 98px;
    height: 98px;
  }
  & .el-upload-list__item {
    width: 96px;
    height: 96px;
    border-radius: 50%;
  }
  .avatar {
    border-radius: 50%;
    width: 96px;
    height: 96px;
  }
  & .el-upload--picture-card:hover {
    border: 1px dashed #c0ccda;
  }
}
</style>