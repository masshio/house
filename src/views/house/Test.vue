<template>
  <div>
    <el-upload
      ref="upload"
      action="http://127.0.0.1:3000/house/uploadImg"
      :headers="header"
      list-type="picture-card"
      :file-list="fileList"
      :on-success="handleSuccess"
      :multiple="true"
      :on-change="handleChange"
      :on-remove="handleRemove"
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
      fileList:[]
    };
  },
  methods: {
    handleSuccess(res, file, fileList) {
      console.log(res,fileList);
    },
    handleChange(file, fileList) {
      // console.log("change",file, fileList);
    },
    handleRemove(file, fileList) {
      console.log("remove",file, fileList);
      console.log(this.fileList);
    },
  },
};
</script>
<style scoped>
</style>