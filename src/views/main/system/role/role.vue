<template>
  <div>
    <page-search
      :searchFormConfig="formConfig"
      class="search"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-model
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
      :modelConfig="modelConfig"
      pageName="role"
      :otherInfo="otherInfo"
    >
      <el-tree
        ref="elTreeRef"
        style="max-width: 600px"
        :data="menus"
        show-checkbox
        node-key="id"
        :default-checked-keys="[5]"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
    /></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";
import { useStore } from "vuex";
import { ElTree } from "element-plus";
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import PageModel from "@/components/page-model";
import { contentTableConfig } from "./config/content-config";
import formConfig from "./config/search-config";
import { modelConfig } from "./config/model-config";
import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModel } from "@/hooks/usePageModel";
import { mapMenuLeafKeys } from "@/utils/map-menus";

export default defineComponent({
  name: "Role",
  components: {
    PageContent,
    PageSearch,
    PageModel,
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();

    // 编辑回调
    const editCallback = (item: any) => {
      // console.log({ ...item.menuList });

      const leafKeys = mapMenuLeafKeys(item.menuList);
      nextTick(() => {
        console.log(elTreeRef.value);

        elTreeRef.value?.setCheckedKeys(leafKeys);
      });
    };

    const [pageModelRef, defaultInfo, handleNewData, handleEditData] =
      usePageModel(undefined, editCallback);

    const store = useStore();
    const menus = computed(() => store.state.entireMenu);
    const otherInfo = ref({});
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };

    return {
      contentTableConfig,
      formConfig,
      modelConfig,
      pageContentRef,
      pageModelRef,
      elTreeRef,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData,
      defaultInfo,
      menus,
      otherInfo,
      handleCheckChange,
    };
  },
});
</script>

<style scoped>
.search {
  border-bottom: 20px solid #f5f5f5;
}
</style>
