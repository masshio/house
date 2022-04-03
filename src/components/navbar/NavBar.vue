<template>
  <div id="main">
    <ul class="left">
      <li
        :class="{ active: this.$route.path === '/home' }"
        @click="$router.push('/home')"
      >
        首页
      </li>
      <li
        :class="{ active: this.$route.path === '/house' }"
        @click="$router.push('/house')"
      >
        发布房源
      </li>
      <li
        :class="{ active: this.$route.path === '/profile' }"
        @click="$router.push('/profile')"
      >
        个人中心
      </li>
      <!-- <li
        :class="{ active: this.$route.path === '/notice' }"
        @click="$router.push('/notice')"
      >
        公告
      </li> -->
      <!-- <li
        :class="{ active: this.$route.path === '/test' }"
        @click="$router.push('/test')"
      >
        上传
      </li> -->
    </ul>
    <div class="logout">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="'http://localhost:3000/' + $store.state.uavatar" />
          {{ $store.state.rname }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <button @click="logout" class="logout-btn">退出登录</button> -->
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$confirm("确定要退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.commit("LOGOUT");
        this.$router.push("/login");
      });
    },
  },
};
</script>
<style scoped lang="scss">
#main {
  height: 50px;
  box-shadow: 0 2px 2px rgb(0 0 0 / 4%);
  // position: relative;
  z-index: 1000;
  background: #fff;
  .left {
    float: left;
    margin-left: 10vw;
    display: flex;
    width: 240px;
    line-height: 50px;
    text-align: center;
    justify-content: space-between;
    list-style: none;
    font-size: 15px;
  }
  li {
    cursor: pointer;
    &:hover {
      color: #cc0000;
    }
  }
  .active {
    color: red;
  }
}

.logout {
  float: right;
  margin-right: 20vw;
  line-height: 50px;
  font-size: 15px;
  line-height: 50px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: left;
    margin: 5px 10px;
  }
}
.logout-btn {
  border: none;
  background: none;
  cursor: pointer;
  width: 100px;
  &:hover {
    color: #cc0000;
  }
}
</style>