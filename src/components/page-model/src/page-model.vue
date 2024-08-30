<template>
  <div class="dialog">
    <el-dialog
      v-model="centerDialogVisible"
      title="新建"
      width="500"
      align-center
    >
      <dtm-form v-bind="modelConfig" v-model="formData"></dtm-form>
      <slot></slot>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import DtmForm from "@/base-ui/form";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    modelConfig: {
      type: Object,
      reuqired: true,
    },
    pageName: {
      type: String,
      reuqired: true,
    },
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    DtmForm,
  },
  setup(props) {
    const centerDialogVisible = ref(false);

    const formData = ref<any>({});
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modelConfig?.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      },
    );

    // 点击确定按钮
    const store = useStore();
    const handleConfirmClick = () => {
      console.log(formData.value);
      centerDialogVisible.value = false;
      if (Object.keys(props.defaultInfo).length) {
        // 编辑

        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id,
        });
      } else {
        // 新建
        console.log("新建");
        console.log(formData.value);
        console.log(props.pageName);

        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo },
        });
      }
    };

    return {
      centerDialogVisible,
      formData,
      handleConfirmClick,
    };
  },
});
</script>

<style scoped></style>
