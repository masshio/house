<template>
  <div>
    <el-upload
      ref="upload"
      action="http://127.0.0.1:3000/house/uploadImg"
      :limit="limit"
      :headers="header"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :on-success="handleSuccess"
      :multiple="true"
      :on-remove="handleRemove"
      :on-change="handleChange"
    >
    </el-upload>

  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "Test",
  data() {
    return {
      header: {
        token: store.state.token,
      },
      pic: [],
      fileList:[],
      limit: 8
    };
  },
  methods: {
    handleSuccess(res, file, fileList) {
      this.pic.push(res.pic);
    },
    handleChange(file, fileList) {
      console.log("change",file, fileList);
    },
    handleRemove(file, fileList) {
      let index = this.pic.indexOf(file.response.pic)
      this.pic.splice(index,1)
    },
    beforeUpload(file) {
      console.log(file);
    }
  },
};
</script>
<style scoped>
</style>