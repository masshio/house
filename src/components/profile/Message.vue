<template>
  <div id="user-form">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="用户名：" prop="name">
        <el-input v-model="form.name" clearable :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="rname">
        <el-input v-model="form.rname" clearable></el-input>
      </el-form-item>
      <el-form-item label="年龄：" prop="age">
        <el-input v-model="form.age" clearable type="number"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="地址：" prop="addr">
        <el-input v-model="form.addr" clearable></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="email">
        <el-input v-model="form.email" clearable></el-input>
      </el-form-item>
      <el-form-item label="电话号码：" prop="phone">
        <el-input v-model="form.phone" clearable></el-input>
      </el-form-item>
       <el-button type="success" icon="el-icon-check" @click="save">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { getMessage, updateMessage } from '@/api/profile'
export default {
  data() {
    var over = (rule, value, callback)=>{
      if(value < 0){
        callback(new Error("数字应大于0"))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        rname: '',
        age: '',
        sex: '',
        addr: '',
        email: '',
        phone: ''
      },
      rules: {
        age: [{validator: over}],
      },
    };
  },
  created() {
    this.form.name = this.$store.state.name;
    getMessage({name: this.form.name}).then(res => {
      this.form.rname = res.data['r_name'];
      this.form.age = res.data['u_age'];
      this.form.sex = res.data['u_sex'];
      this.form.addr = res.data['u_add'];
      this.form.email = res.data['u_email'];
      this.form.phone = res.data['u_phone'];
      })
  },
  methods: {
    save() {
      updateMessage(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
    }
  }
};
</script>
<style scoped lang="scss">
#user-form {
  width: 40vw;
  position: relative;
  margin: auto;
  left: 0;
  right: 0;
  margin-top: 100px;
}
</style>