<template>
  <div class="echart">
    <div
      class="echart"
      ref="echartDivRef"
      :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, defineProps, withDefaults } from "vue";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";

// 定义props
const props = withDefaults(
  defineProps<{
    option: EChartsOption;
    width?: string;
    height?: string;
  }>(),
  {
    width: "100%",
    height: "300px",
  },
);

const echartDivRef = ref<HTMLElement>();
onMounted(() => {
  const echartsInit = echarts.init(echartDivRef.value!);

  echartsInit.setOption(props.option);
  window.addEventListener("resize", () => {
    echartsInit.resize();
  });
});
</script>

<style scoped>
.echart {
  width: 100%;
  height: 400px;
}
</style>
