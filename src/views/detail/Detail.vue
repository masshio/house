<template>
  <div>
    <nav-bar></nav-bar>
    <div class="wrap">
      <el-descriptions title="房屋信息" class="house" direction="vertical">
        <el-descriptions-item label="租金">
          {{ house.h_price }}
        </el-descriptions-item>
        <el-descriptions-item label="房屋类型">
          {{ house.h_type }}
        </el-descriptions-item>
        <el-descriptions-item label="面积">
          {{ house.h_square }} m<sup>2</sup>
        </el-descriptions-item>
        <el-descriptions-item label="地址">
          {{ house.h_add }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="屋主信息" class="user">
        <el-descriptions-item label="名称">
          {{ name }}
        </el-descriptions-item>
        <el-descriptions-item label="手机号">
          {{ user.u_phone }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          {{ user.u_email }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="费用详情" class="price">
        <el-descriptions-item label="付款方式">月付</el-descriptions-item>
        <el-descriptions-item label="租金">
          {{ house.h_price }}
        </el-descriptions-item>
        <el-descriptions-item label="押金">
          {{ house.h_price }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar.vue";
import { getHousesById } from "@/api/house";
import { getMessageById } from "@/api/house";
export default {
  name: "Detail",
  data() {
    return {
      house: {
        h_price: "",
        h_type: "",
        h_square: "",
        h_des: "",
        h_add: "",
      },
      user: {
        r_name: "",
        u_phone: "",
        u_email: "",
      },
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    name() {
      return (
        (this.user.r_name && this.user.r_name.substr(0, 1) + "先生") ||
        this.user.u_name
      );
    },
  },
  components: {
    NavBar,
  },
  created() {
    getHousesById({
      id: this.id,
    })
      .then((res) => {
        this.house = res.data.result[0];
        return getMessageById({
          id: res.data.result[0].u_id,
        });
      })
      .then((res) => {
        this.user = res.data;
      });
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.house,
.user,
.price{
  width: 60vw;
  margin-top: 50px;
  margin-left: 20vw;
  font-size: 20px;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 10px;
}
</style>