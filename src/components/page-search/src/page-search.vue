<template>
  <div class="search">
    <dtm-form v-bind="searchFormConfig" v-model="formData">
      <template v-slot:header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="btn">
          <el-button type="primary" icon="Refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button type="primary" icon="Search" @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </dtm-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DtmForm from "@/base-ui/form";

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true,
    },
  },
  components: {
    DtmForm,
  },

  emits: ["resetBtnClick", "queryBtnClick"], // 重置按钮和搜索按钮
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定的
    // formData中的属性名应该和配置文件的field名保持一致
    const formItems = props.searchFormConfig?.formItems ?? []; // 从配置文件中获取表单项
    const formOriginData: any = {}; // 表单项的初始值
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);

    // 用户点击重置按钮，重置formData
    const handleResetClick = () => {
      console.log("重置前：", formData);
      formData.value = formOriginData;
      console.log("重置后：", formData.value);

      emit("resetBtnClick", formData.value);
    };

    // 用户点击搜索按钮
    const handleQueryClick = () => {
      console.log("搜索后：", formData.value);

      emit("queryBtnClick", formData.value);
    };

    return {
      formData,
      handleResetClick,
      handleQueryClick,
    };
  },
});
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.btn {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
