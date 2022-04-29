<template>
  <div>
    <div id="age" style="height: 300px" ref="age"></div>
    <el-divider></el-divider>
    <div id="price" style="height: 300px" ref="price"></div>
    <el-divider></el-divider>
    <div id="pay" style="height: 300px" ref="pay"></div>
    <el-divider></el-divider>
    <div id="square" style="height: 300px" ref="square"></div>
  </div>
</template>

<script>
import { userAge, housePrice, housePay, houseSquare } from "@/api/manage";
export default {
  data() {
    return {
      agePie: null,
      pricePie: null,
      payPie: null,
      squarePie: null,
      age: [],
      price: [],
      payx: [],
      payy: [],
      squarex: [],
      squarey: [],
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
      await housePrice().then((res) => {
        this.price = res.data.result;
      });
      await houseSquare().then((res) => {
        res.data.result.forEach((item) => {
          this.squarex.push(item.name);
          this.squarey.push(item.value);
        });
      });
      await housePay().then((res) => {
        res.data.result.forEach((item) => {
          this.payx.push(item.name);
          this.payy.push(item.value);
        });
      });
      this.drownLine();
    },
    drownLine() {
      this.agePie = this.$echarts.init(this.$refs.age);
      this.pricePie = this.$echarts.init(this.$refs.price);
      this.squarePie = this.$echarts.init(this.$refs.square);
      this.payPie = this.$echarts.init(this.$refs.pay);
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
      var squareoption = {
       title: {
          text: "房屋面积比例",
          left: "left",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.squarex,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "40%",
            data: this.squarey,
            itemStyle: {
              color: '#5470c6'
            },
          },
        ],
      };
      var payoption = {
        title: {
          text: "支付方式",
          left: "left",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.payx,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "40%",
            data: this.payy,
            itemStyle: {
              color: '#5470c6'
            },
          },
        ],
      };

      this.agePie.setOption(ageoption);
      this.pricePie.setOption(priceoption);
      this.payPie.setOption(payoption);
      this.squarePie.setOption(squareoption);
    },
  },
};
</script>
<style scoped>
#age,
#price {
  display: flex;
  justify-content: center;
}
</style>