<template>
  <div>
    <nav-bar></nav-bar>
    <div class="wrap">
      <div class="cover-img">
        <img :src="imgUrl" class="cover" />
      </div>
      <div class="descript">
        <div class="pay-way">
          <span class="price">{{ house.hprice}}</span>
          <span class="month">元/月</span>
          <span class="way">押二付一</span>
        </div>
        <ul class="house-detail">
          <li>房屋类型: {{house.htype}} </li>
          <li>朝向楼层:</li>
          <li>所在小区:</li>
          <li>详细地址: {{house.hadd}} </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar.vue";
import { getHousesById, getMessageById } from "@/api/house";
export default {
  name: "Detail",
  data() {
    return {
      house: {
        hprice: "",
        htype: "",
        hsquare: "",
        hdes: "",
        hadd: "",
        hpic: "",
      },
      user: {
        rname: "",
        uphone: "",
        uemail: "",
      },
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    imgUrl() {
      return "http://localhost:3000/" + this.house.hpic;
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
          id: res.data.result[0].uid,
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
// .house,
// .user,
// .price {
//   width: 60vw;
//   margin-top: 50px;
//   margin-left: 20vw;
//   font-size: 16px;
//   border: 1px solid #eee;
//   padding: 20px;
//   border-radius: 10px;
// }
.wrap {
  width: 80vw;
  // background: #eee;
  margin-left: 10vw;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  .cover {
    width: 40vw;
    height: 40vh;
    display: block;
  }
  .descript {
    border-top: 1px solid rgb(243, 243, 243);
    width: 40vw;
    padding: 20px;
    padding-left: 40px;
    .house-detail {
      height: 90%;
      display: flex;
      flex-direction: column;
      list-style: none;
      justify-content: space-around;
    }
    .pay-way {
      .price {
        font-size: 40px;
        color: #ff552e;
        margin-right: 10px;
      }
      .month {
        color: #ff552e;
        font-size: 20px;
      }
      .way {
        margin-left: 30px;
        color: #888;
      }
    }
  }
}
</style>
