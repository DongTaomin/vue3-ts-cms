<template>
  <div class="dashboard">
    <el-row gutter="10">
      <el-col :span="7">
        <dtm-card title="分类商品数量(饼图)">
          <pie-echart :categoryGoodsCount="categoryGoodsCount"> </pie-echart>
        </dtm-card>
      </el-col>
      <el-col :span="10">
        <dtm-card title="不同城市商品销量(地图)"> </dtm-card>
        <div>{{ categoryGoodsCount }}</div>
      </el-col>
      <el-col :span="7">
        <dtm-card title="分类商品数量(玫瑰图)">
          <nightingale-echart :categoryGoodsCount="categoryGoodsCount">
          </nightingale-echart>
        </dtm-card>
      </el-col>
    </el-row>
    <el-row gutter="10">
      <el-col :span="12">
        <dtm-card title="分类商品的销量"> </dtm-card>
      </el-col>

      <el-col :span="12">
        <dtm-card title="分类商品的收藏"> </dtm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import DtmCard from "@/base-ui/card/index";
import PieEchart from "@/components/echarts/src/PieEchart.vue";
import NightingaleEchart from "@/components/echarts/src/NightingaleEchart.vue";

export default defineComponent({
  name: "Dashboard",
  components: {
    DtmCard,
    PieEchart,
    NightingaleEchart,
  },
  setup() {
    const store = useStore();

    store.dispatch("dashboard/getDashboardDataAction");
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount };
      });
    });

    return {
      categoryGoodsCount,
    };
  },
});
</script>

<style scoped>
.dashboard {
  background-color: white;
  border-radius: 10px;
}
</style>
