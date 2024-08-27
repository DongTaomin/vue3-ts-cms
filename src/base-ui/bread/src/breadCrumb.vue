<template>
  <div class="nav-bread">
    <el-breadcrumb separator-icon="DArrowRight">
      <template v-for="item in bread" :key="item.name">
        <el-breadcrumb-item :to="{ path: '' }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IBread } from "../types";

export default defineComponent({
  props: {
    bread: {
      type: Array as PropType<IBread[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
