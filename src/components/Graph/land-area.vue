/*
 * @Author: mikey.zhaopeng 
 * @Date: 2020-01-10 19:38:06 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2020-01-10 19:38:06 
 折线图
 */
<template>
  <div :id="id"></div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      id: "land-area",
      sumValue: ""
    };
  },
  mounted() {
    // clearInterval(this.timer);
    // this.timer = setInterval(() => {
    //   this.chart.clear();
    //   this.echartsintit();
    // }, 5000);
    this.echartsintit();
  },
  // beforeDestroy() {
  //   clearInterval(this.timer);
  // },
  methods: {
    echartsintit() {
      let dom = document.getElementById(this.id);
      dom.style.height = 252 + "px";
      this.chart = echarts.init(dom);

      let option = {
        grid: {
          top: "15%",
          left: "2%",
          right: "2%",
          bottom: "6%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          label: {
            show: true
          }
        },
        xAxis: {
          boundaryGap: true, 
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLabel: {
            color: "#fff"
          },
          data: [
            "尖草坪区",
            "杏花岭区",
            "迎泽区",
            "小店区",
            "晋源区",
            "万柏林区",
            "晋祠"
          ]
        },
        yAxis: {
          type: "value",
          // name: "面积(㎡)",
          nameTextStyle: {
            color: "#5C80B8",
            fontSize: "12px",
            padding: [0, 30, 0, 0]
          },
          axisLabel: {
            show: true,
            color: "#000",
            interval: "auto",
            formatter: "{value} ",
            margin: 4
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          },
          axisTick: {
            show: false
          },
          textStyle: {
            fontSize: 20,
            color: "#000"
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#214470"
            }
          },
          show: true
        },
        series: [
          {
            type: "line",
            symbol: "circle",
            symbolSize: 7,
            label: {
              show: false,
              distance: 1,
              emphasis: {
                show: true,
                offset: [25, -2],
                color: "#FFF",
                padding: [8, 20, 8, 6],
                height: 36,
                formatter: function(params) {
                  var name = params.name;
                  var value = params.data;
                  var str = name + "\n考试量：" + value;
                  return str;
                }
              }
            },
            itemStyle: {
              color: "#FFEC3F"
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 236, 63, 0.37)"
                },
                {
                  offset: 1,
                  color: "rgba(255, 236, 63, 0)"
                }
              ])
            },
            data: [  //横向数据
              20,
              30,
              50,
              10,
              60,
              30,
              0
            ]
          }
        ]
      };
      this.chart.setOption(option);
    }
  }
};
</script>
<style lang="scss">
</style>
