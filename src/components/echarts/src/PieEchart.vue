<template>
  <div>
    <dtm-echart
      :option="goodsCountOption"
      :style="{ width: '100%', height: '360px' }"
    ></dtm-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DtmEchart from "@/base-ui/echart/index";

export default defineComponent({
  components: {
    DtmEchart,
  },
  props: {
    categoryGoodsCount: {
      type: [Array, Object],
    },
  },
  setup(props) {
    const goodsCountOption = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        // orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "商品分类",
          type: "pie",
          radius: "50%",
          data: props.categoryGoodsCount,
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

    return {
      goodsCountOption,
    };
  },
});
</script>

<style scoped></style>
