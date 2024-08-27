<template>
  <div class="dialog">
    <el-dialog
      v-model="centerDialogVisible"
      title="新建"
      width="500"
      align-center
      destroy-on-close="true"
    >
      <dtm-form v-bind="modelConfig" v-model="formData"></dtm-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import DtmForm from "@/base-ui/form";

export default defineComponent({
  props: {
    modelConfig: {
      type: Object,
      reuqired: true,
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

    return {
      centerDialogVisible,
      formData,
    };
  },
});
</script>

<style scoped></style>
