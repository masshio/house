<template>
  <div>
    <nav-bar></nav-bar>
    <div class="wrap">
      <div class="cover-img">
        <img :src="imgUrl" class="cover" />
      </div>
      <div class="descript">
        <div class="pay-way">
          <span class="price">{{ house.hprice }}</span>
          <span class="month">元/月</span>
          <span class="way">押二付一</span>
        </div>
        <ul class="house-detail">
          <li>
            <span class="det">租赁方式:</span>
            <span>{{ house.mode }}</span>
          </li>
          <li>
            <span class="det">房屋类型:</span>
            <span
              >{{ house.htype }}&nbsp;&nbsp;{{ house.hsquare }}m<sup
                >2</sup
              ></span
            >
          </li>
          <li>
            <span class="det">朝向楼层:</span>
            <span>{{ house.orientation }}&nbsp;&nbsp;{{ house.floor }}层/{{storey}}</span>

          </li>
          <li>
            <span class="det">所在小区:</span><span>{{ house.estate }}</span>
          </li>
          <li>
            <span class="det">详细地址:</span><span>{{ house.hadd }}</span>
          </li>
        </ul>
        <div>
          <img :src="'http://localhost:3000/' + user.uavatar" class="avatar" />
          <div class="rname">{{ user.rname }}</div> 
          <div class="phone" @click="flag = !flag">
            <el-icon class="el-icon-phone" style="margin-right: 5px"></el-icon>
            <span v-show="flag"> 电话咨询 </span>
            <span v-show="!flag"> {{user.uphone}} </span>
          </div>
        </div>
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
        uavatar: "avatar.png",
        floor: 1,
        tfloor: 1
      },
      flag: true,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    imgUrl() {
      return this.house.hpic === '' ? '' : "http://localhost:3000/" + this.house.hpic;
    },
    storey() {
      if(this.user.floor < this.user.tfloor/3) {
        return '低层'
      } else if(this.user.floor > 2 * (this.user.tfloor/3)) {
        return '高层'
      } else {
        return '中层'
      }
    }
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
.wrap {
  width: 1150px;
  // background: #eee;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 1px solid rgb(243, 243, 243);
  .cover {
    width: 510px;
    height: 348px;
    display: block;
  }
  .descript {
    // border-top: 1px solid rgb(243, 243, 243);
    border: 1px solid rgb(243, 243, 243);
    border-radius: 2px;
    width: 545px;
    padding: 20px;
    margin-left: 20px;
    height: 308px;
    .avatar {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      float: left;
      margin-right: 10px;
    }
    .rname {
      line-height: 62px;
      margin-bottom: 2px;
      float: left;
    }
    .phone {
      float: left;
      width: 150px;
      height: 50px;
      line-height: 50px;
      margin: 6px 0;
      margin-left: 20px;
      text-align: center;
      background: #00ae66;
      color: #fff;
      cursor: pointer;
    }
    .house-detail {
      height: 180px;
      display: flex;
      flex-direction: column;
      list-style: none;
      justify-content: space-around;
      margin: 6px 0;
      .det {
        color: #888;
        margin-right: 15px;
      }
    }
    .pay-way {
      border-bottom: 1px solid #e4e6f0;
      padding-bottom: 10px;
      .price {
        font-size: 36px;
        color: #ff552e;
        margin-right: 10px;
      }
      .month {
        color: #ff552e;
        font-size: 18px;
      }
      .way {
        margin-left: 30px;
        color: #888;
      }
    }
  }
}
</style>
