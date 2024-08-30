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
    const goodsName = props.categoryGoodsCount?.map((item: any) => {
      return item.name;
    });
    const goodsCountOption = {
      // title: {
      //   text: "Nightingale Chart",
      //   subtext: "Fake Data",
      //   left: "center",
      // },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        left: "center",
        top: "bottom",
        data: goodsName,
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "占比",
          type: "pie",
          radius: [20, 80],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 5,
          },
          data: props.categoryGoodsCount,
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
