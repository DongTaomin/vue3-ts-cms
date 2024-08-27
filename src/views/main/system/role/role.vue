<template>
  <div>
    <page-search :searchFormConfig="formConfig" class="search"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import { contentTableConfig } from "./config/content-config";
import formConfig from "./config/search-config";

export default defineComponent({
  name: "Role",
  components: {
    PageContent,
    PageSearch,
  },
  setup() {
    return {
      contentTableConfig,
      formConfig,
    };
  },
});
</script>

<style scoped>
.search {
  border-bottom: 20px solid #f5f5f5;
}
</style>
