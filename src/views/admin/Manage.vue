<template>
  <div>
    <el-container style="height: 100vh">
      <el-header>
        <el-avatar icon="el-icon-user-solid" style=""></el-avatar>
        <!-- <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <span style="margin:0 15px">admin</span>
        <button @click="handleCommand">退出登录</button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="$route.name" router>
            <!-- active-text-color="#ffd04b" -->
            <!-- background-color="#545c64"
            text-color="#fff" -->
            <el-submenu index="ManageHouse">
              <template slot="title">
                <i class="el-icon-house"></i>
                <span slot="title">房屋管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="ManageHouse">已发布房屋</el-menu-item>
                <el-menu-item index="Examine">待审核房屋</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="ManageUser">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="ManageNotice">
              <i class="el-icon-data-board"></i>
              <span slot="title">公告栏管理</span>
            </el-menu-item>
            <el-menu-item index="Statistics">
              <!-- <i class="el-icon-data-analysis"></i> -->
              <i class="el-icon-s-data"></i>
              <span slot="title">统计</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand() {
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
.el-header {
  background-color: #fff;
  // color: #333;
  // color: #fff;
  // background-color: #545c64;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  vertical-align: middle;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 5%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
  min-width: 960px;
  // height: 42px;
}

.el-aside {
  position: fixed;
  // color: #fff;
  text-align: center;
  height: 100vh;
  line-height: 200px;
  // background-color: #e9eef3;
  // background-color: #545c64;
  padding-top: 60px;
  z-index: 100;
}

.el-main {
  background: rgb(250, 250, 250);
  color: #333;
  text-align: center;
  padding: 30px;
  padding-top: 80px;
  margin-left: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}

button {
  border:none;
  background: #fff;
  cursor: pointer;
}
</style>