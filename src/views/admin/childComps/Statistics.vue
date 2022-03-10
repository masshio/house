<template>
  <div>
    <div class="wrap">
      <div id="age" style="height: 300px" ref="age"></div>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <div id="price" style="height: 300px" ref="price"></div>
    </div>
  </div>
</template>

<script>
import { userAge, housePrice } from '@/api/manage'
export default {
  data() {
    return {
      agePie: null,
      pricePie: null,
      age: [],
      price: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      await userAge().then((res) => {
        this.age = res.data.result;
      });
      await housePrice().then(res => {
        this.price = res.data.result;
      })
      this.drownLine();
    },
    drownLine() {
      this.agePie = this.$echarts.init(this.$refs.age);
      this.pricePie = this.$echarts.init(this.$refs.price);
      var ageoption = {
        title: {
          text: "用户年龄比例",
          left: "left",
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "年龄比例",
            type: "pie",
            radius: "85%",
            data: this.age,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      var priceoption = {
        title: {
          text: "房屋月租价格比例",
          left: "left",
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "价格比例",
            type: "pie",
            radius: "85%",
            data: this.price,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      this.agePie.setOption(ageoption);
      this.pricePie.setOption(priceoption);
    },
  },
};
</script>
<style scoped>
#age, #price {
  display: flex;
  justify-content: center;
}
</style>