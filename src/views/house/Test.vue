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
      :on-remove="handleRemove"
    >
      <!-- :on-change="handleChange" -->
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
      fileList:[]
    };
  },
  methods: {
    handleSuccess(res, file, fileList) {
      console.log('success',res,fileList); // 这里拿filelist
      this.pic.push(res.pic);
    },
    // handleChange(file, fileList) { // 不要
    //   console.log("change",file, fileList);
    // },
    handleRemove(file, fileList) {
      console.log("remove",file, fileList);
      let index = this.pic.indexOf(file.response.pic)
      this.pic.splice(index,1)
    },
  },
};
</script>
<style scoped>
</style>