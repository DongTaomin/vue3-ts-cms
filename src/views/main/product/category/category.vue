<template>
  <div class="main" ref="main"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  setup() {
    const main = ref<HTMLElement>();
    onMounted(() => {
      const echartsInit = echarts.init(main.value!);
      echartsInit.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    });
    return {
      main,
    };
  },
});
</script>

<style scoped>
.main {
  width: 500px;
  height: 300px;
}
</style>
