<template>
  <div>
    <el-upload
      ref="upload"
      action="http://127.0.0.1:3000/house/uploadImg"
      :limit="limit"
      :headers="header"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :on-success="handleSuccess"
      :multiple="true"
      :on-remove="handleRemove"
      :on-change="handleChange"
    >
    </el-upload>
    <div ref="line" id="line" style="height: 300px"></div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "Test",
  data() {
    return {
      header: {
        token: store.state.token,
      },
      pic: [],
      fileList: [],
      limit: 8,
      priceLine: null,
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    handleSuccess(res, file, fileList) {
      this.pic.push(res.pic);
    },
    handleChange(file, fileList) {
      console.log("change", file, fileList);
    },
    handleRemove(file, fileList) {
      let index = this.pic.indexOf(file.response.pic);
      this.pic.splice(index, 1);
    },
    beforeUpload(file) {
      console.log(file);
    },
    drawLine() {
      let adate = "2022/3/1";
      let bdate = +new Date(adate).getTime();
      let hdate = {
        "2022/3/1": 1235,
        "2022/3/2": 2134,
        "2022/3/4": 4567,
        "2022/3/6": 5345,
        "2022/3/8": 1234,
        "2022/3/11": 6878,
        "2022/3/13": 5467,
        "2022/3/14": 4567,
        "2022/3/16": 3547,
        "2022/3/20": 2235,
        "2022/3/25": 3235,
      };
      this.priceLine = this.$echarts.init(this.$refs.line);
      let oneDay = 24 * 3600 * 1000;
      let base = +Date.now();
      let date = [];
      let data = [];
      var at = bdate;
      while (at < base) {
        let atDate = new Date(at);
        let temp = [atDate.getFullYear(), atDate.getMonth() + 1, atDate.getDate()].join("/");
        date.push(temp);
        if(hdate[temp]) {
          data.push(hdate[temp])
        } else {
          data.push(data[data.length - 1])
        }
        at = bdate += oneDay;
      }
      // Object.keys(hdate).forEach((item) => {
      //   let index = date.indexOf(item);
      //   if (index !== -1) {
      //     data[index] = hdate[item];
      //   }
      // });
      let priceOption = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: "Large Area Chart",
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: "Fake Data",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            data: data,
          },
        ],
      };
      this.priceLine.setOption(priceOption);
    },
  },
};
</script>
<style scoped>
#line {
  display: flex;
  justify-content: center;
}
</style>