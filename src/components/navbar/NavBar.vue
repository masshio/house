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
    </ul>
    <button class="logout" @click="logout">退出登录</button>
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
        this.$router.push('/login');
      });
    },
  },
};
</script>
<style scoped lang="scss">
#main {
  height: 50px;
  box-shadow: 0 2px 2px #eee;
  .left {
    float: left;
    margin-left: 20vw;
    display: flex;
    width: 200px;
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
  border: none;
  background: none;
  cursor: pointer;
  font-size: 15px;
  &:hover {
    color: #cc0000;
  }
}
</style>