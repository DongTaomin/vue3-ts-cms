<template>
  <div class="goods">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="goods"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageContent from "@/components/page-content";

import { contentTableConfig } from "./config/content-config";

export default defineComponent({
  name: "Goods",
  components: {
    PageContent,
  },
  setup() {
    return {
      contentTableConfig,
    };
  },
});
</script>

<style scoped></style>
