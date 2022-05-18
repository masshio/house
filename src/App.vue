<template>
  <div v-cloak id="app">
    <keep-alive include="Home,Profile,House">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {};
</script>
<style>
[v-cloak] {
  display: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
