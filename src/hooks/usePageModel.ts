import PageModel from "@/components/page-model";
import { ref } from "vue";

export function usePageModel() {
  const pageModelRef = ref<InstanceType<typeof PageModel>>();
  const defaultInfo = ref({});

  const handleNewData = () => {
    console.log("new");
    defaultInfo.value = {};
    if (!pageModelRef.value) return;
    pageModelRef.value.centerDialogVisible = true;
  };

  const handleEditData = (item: any) => {
    console.log("edit");
    defaultInfo.value = { ...item };
    if (!pageModelRef.value) return;
    pageModelRef.value.centerDialogVisible = true;
  };

  return [pageModelRef, defaultInfo, handleNewData, handleEditData];
}
