<template>
  <div class="page-content">
    <dtm-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          icon="Plus"
          size="small"
          type="primary"
          @click="handleCreateClick"
          >新建</el-button
        >
        <el-button
          icon="Refresh"
          size="small"
          type="primary"
          @click="handleRefreshClick"
          >刷新</el-button
        >
      </template>

      <template #status="scope"
        ><el-button
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? "启用" : "禁用" }}</el-button
        ></template
      >
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #image="scope">
        <el-image style="width: 60px; height: 60px" :src="scope.row.imgUrl" />
      </template>
      <template #handler="scope">
        <div class="btn">
          <el-button
            :disabled="!isUpdate"
            icon="Edit"
            size="small"
            type="primary"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            :disabled="!isDelete"
            icon="Delete"
            size="small"
            type="danger"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <template #header> </template>
    </dtm-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import localCache from "@/utils/cache";

import DtmTable from "@/base-ui/table";
import { usePermission } from "@/hooks/usePermission";

export default defineComponent({
  components: {
    DtmTable,
  },
  props: {
    contentTableConfig: {
      type: Object,
      reuqired: true,
    },
    pageName: {
      type: String,
      reuqired: true,
    },
  },

  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const store = useStore();
    // 获取操作权限
    const isCreate = usePermission(props.pageName || "", "create");
    const isUpdate = usePermission(props.pageName || "", "update");
    const isDelete = usePermission(props.pageName || "", "delete");
    const isQuery = usePermission(props.pageName || "", "query");

    // 绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    watch(pageInfo, () => getPageData());

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return;

      const query = {
        offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
        size: pageInfo.value.pageSize,
        ...queryInfo,
      };
      // 将数据存储到本地缓存中
      localCache.setCache("query", query);
      localCache.setCache("queryInfo", queryInfo);

      // console.log(queryInfo);

      store.dispatch("system/getPageListAction", {
        pageUrl: props.pageName,
        queryInfo: query,
      });
    };

    // 请求数据
    getPageData();

    const dataList = computed(() =>
      store.getters["system/pageListData"](props.pageName),
    );
    const dataCount = computed(() =>
      store.getters["system/pageListCount"](props.pageName),
    );

    // 删除
    const handleDeleteClick = (item: any) => {
      console.log(item);
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName,
        id: item.id,
      });
    };

    // 新建
    const handleCreateClick = () => {
      emit("newBtnClick");
    };

    // 编辑
    const handleEditClick = (item: any) => {
      emit("editBtnClick", item);
    };
    // 刷新数据
    const handleRefreshClick = () => {
      const queryInfo = localCache.getCache("queryInfo");
      getPageData(queryInfo);
    };
    return {
      dataList,
      dataCount,
      getPageData,
      handleRefreshClick,
      handleDeleteClick,
      handleCreateClick,
      handleEditClick,
      pageInfo,
      isCreate,
      isUpdate,
      isDelete,
    };
  },
});
</script>

<style scoped></style>

function emit(arg0: string, value: { currentPage: number; pageSize: number; }) {
throw new Error("Function not implemented."); }
