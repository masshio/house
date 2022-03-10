<template>
  <div class="profile-main">
    <nav-bar></nav-bar>
    <aside class="aside">
      <ul>
        <li class="title">用户设置</li>
        <li
          :class="{ acitve: current == 'message' }"
          @click="current = 'message'"
        >
          个人信息
        </li>
        <li
          :class="{ acitve: current == 'changePass' }"
          @click="current = 'changePass'"
        >
          修改密码
        </li>
        <li
          :class="{ acitve: current == 'ownHouse' }"
          @click="current = 'ownHouse'"
        >
          房屋管理
        </li>
      </ul>
    </aside>
    <component :is="current"></component>
  </div>
</template>

<script>
import Message from "@/components/profile/Message";
import ChangePass from "@/components/profile/ChangePass";
import NavBar from "@/components/navbar/NavBar";
import OwnHouse from '@/components/profile/OwnHouse'
export default {
  name: "Profile",
  data() {
    return {
      current: "message",
    };
  },
  components: {
    Message,
    ChangePass,
    NavBar,
    OwnHouse
  },
};
</script>
<style scoped lang="scss">
.profile-main {
  // background: rgba(0, 0, 0, 0.04);
  position: relative;
  height: 100vh;
}
.aside {
  position: absolute;
  width: 20vw;
  height: 200px;
  top: 10vh;
  left: 10vh;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  ul {
    width: 100%;
    height: 100%;
    list-style: none;
    border: 1px solid #eee;
    font-size: 20px;
    border-radius: 5px;
    overflow: hidden;
  }
  li {
    vertical-align: center;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    cursor: pointer;
  }
  .title {
    background: #ccc;
    color: gray;
    cursor: default;
    &:hover {
      background: #ccc;
    }
  }
  .acitve {
    background-color: rgb(44, 120, 186);
    color: #fff;
  }
}
</style>