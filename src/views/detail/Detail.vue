<template>
  <div>
    <nav-bar></nav-bar>
    <div class="wrap middle">
      <div class="cover">
        <el-carousel indicator-position="outside" height="338px">
          <el-carousel-item v-for="item in house.hpic" :key="item">
            <img :src="'http://localhost:3000/' + item" class="cover" />
          </el-carousel-item>
        </el-carousel>
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
            <span
              >{{ house.orientation }}&nbsp;&nbsp;{{ storey }}/{{
                house.tfloor
              }}层</span
            >
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
            <span v-show="!flag"> {{ user.uphone }} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail middle">
      <div class="card">
        <h3 class="title">房屋详情</h3>
        <el-descriptions :contentStyle="style" :labelStyle="{ width: 45 + 'px', fontSize: 16 + 'px'}">
          <el-descriptions-item label="面积"
            >{{ house.hsquare }}㎡</el-descriptions-item
          >
          <el-descriptions-item label="楼层"
            >{{ storey }}/{{ house.tfloor }}层</el-descriptions-item
          >
          <el-descriptions-item label="朝向">{{
            house.orientation
          }}</el-descriptions-item>
          <el-descriptions-item label="类型">{{
            house.htype
          }}</el-descriptions-item>
          <el-descriptions-item label="小区">{{
            house.estate
          }}</el-descriptions-item>
          <el-descriptions-item label="地址">{{
            house.hadd
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="card">
        <h3 class="title">房屋描述</h3>
        <span>{{ house.hdes }}</span>
      </div>
    </div>
    <div class="middle">
      <ul class="house-pic-list">
        <li v-for="item in house.hpic" :key="item">
          <img :src="'http://localhost:3000/' + item" class="pic" />
        </li>
      </ul>
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
      },
      style: { fontSize: 16 + "px" },
      flag: true,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    imgUrl() {
      return this.house.hpic === ""
        ? ""
        : "http://localhost:3000/" + this.house.hpic;
    },
    storey() {
      if (this.house.floor < 5) {
        return "低层";
      } else if (this.house.floor < 10) {
        return "中层";
      } else {
        return "高层";
      }
    },
  },
  watch: {},
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
.middle {
  width: 1150px;
  margin: 20px auto;
}
.wrap {
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 1px solid rgb(243, 243, 243);
  .cover {
    width: 580px;
    height: 348px;
    display: block;
  }
  .descript {
    // border-top: 1px solid rgb(243, 243, 243);
    border: 1px solid rgb(243, 243, 243);
    border-radius: 2px;
    padding: 20px;
    width: 545px;
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
.detail {
  .card {
    border-bottom: 1px solid rgb(243, 243, 243);
    border-radius: 2px;
    word-wrap: break-word;
    word-break: break-all;
    padding: 10px;
    margin-bottom: 10px;
    .title {
      margin-bottom: 10px;
    }
  }
}

.house-pic-list {
  width: 706px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .pic {
    width: 348px;
    height: 261px;
    margin-bottom: 10px;
  }
}
</style>
