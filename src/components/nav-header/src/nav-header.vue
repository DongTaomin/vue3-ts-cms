<template>
  <div class="nav-header">
    <!-- <el-icon @click="foldClick"><ArrowRightBold /></el-icon> -->
    <el-icon @click="foldClick">
      <component :is="isFold ? 'ArrowLeftBold' : 'ArrowRightBold'" />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false);
    const foldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };
    return {
      isFold,
      foldClick,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  .el-icon {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>

function foldClick() { throw new Error("Function not implemented."); }
