<template>
  <div class="house-list">
      <house-item v-for="item in list" :key="item.id" :house="item"></house-item>
  </div>
</template>

<script>
import HouseItem from './HouseItem.vue'
export default {
    name: 'House',
    props: {
        list: {
            type: Array,
            required: true
        }
    },
    components: {
        HouseItem
    }
}

</script>
<style scoped>
.house-list {
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
}
</style>