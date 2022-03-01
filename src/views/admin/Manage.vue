<template>
  <div>
    <el-container style="height: 100vh;">
      <el-header style="text-align: right; font-size: 16px">
        <!-- <el-avatar icon="el-icon-user-solid"></el-avatar> -->
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>admin</span>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="$route.name"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="ManageHouse">
              <i class="el-icon-house"></i>
              <span slot="title">房屋管理</span>
            </el-menu-item>
            <el-menu-item index="ManageUser">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="Statistics">
              <i class="el-icon-data-analysis"></i>
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
      this.$store.commit('LOGOUT');
      this.$router.replace('/');
    }
  }
};
</script>
<style scoped lang="scss">
.el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  vertical-align: middle;
  box-shadow: 0 2px 5px #eee;
}

.el-aside {
  color: #fff;
  text-align: center;
  line-height: 200px;
  // background-color: #e9eef3;
  background-color: #545c64;
}

.el-main {
  color: #333;
  text-align: center;
  padding: 30px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-menu-item {
  // color: #fff
}
</style>