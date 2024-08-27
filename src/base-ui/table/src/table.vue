<template>
  <div class="dtm-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      :type="index"
      @selection-change="selectionChange"
      v-bind="childrenProps"
    >
      <!-- 选择框 -->
      <el-table-column
        v-if="showSelect"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <!-- 序号 -->
      <el-table-column
        v-if="showIndex"
        label="序号"
        :type="index"
        width="70"
        align="center"
      ></el-table-column>
      <!-- 内容 -->
      <template v-for="item in propList" :key="item.prop">
        <el-table-column
          v-bind="item"
          align="center"
          :show-overflow-tooltip="showOverflowTooltip"
        >
          <!-- 作用域插槽 -->
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <div>
          <el-pagination
            class="pager"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[10, 20, 30, 40, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    listData: {
      type: Array,
      required: true,
    },
    listCount: {
      type: Number,
      default: 0,
    },
    propList: {
      type: Array,
      required: true,
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    showSelect: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Object,
      default: () => {
        return { currentPage: 0, pageSize: 10 };
      },
    },
    childrenProps: {
      type: Object,
      default: () => ({
        rowKey: "id",
        treeProps: { children: "children" },
      }),
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true,
    },
    index: {
      type: String,
      default: "index",
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["selectChange", "update:page"],
  setup(props, { emit }) {
    const selectionChange = (value: any) => {
      emit("selectChange", value);
    };

    const handleSizeChange = (value: number) => {
      emit("update:page", { ...props.page, pageSize: value });
    };

    const handleCurrentChange = (value: number) => {
      emit("update:page", { ...props.page, currentPage: value });
    };
    return {
      selectionChange,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .handler {
    align-items: center;
  }
}
.footer {
  margin-top: 10px;
  .pager {
    margin-bottom: 10px;
    margin-right: 10px;
  }
  display: flex;
  justify-content: flex-end;
}
</style>
