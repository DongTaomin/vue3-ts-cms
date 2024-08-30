<template>
  <el-card class="base-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <div class="card-body">
      <slot></slot>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "Test",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.base-card {
  & :deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}

.card-body {
  margin-bottom: 10px;
}
</style>
