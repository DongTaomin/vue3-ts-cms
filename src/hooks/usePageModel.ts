import PageModel from "@/components/page-model";
import { ref } from "vue";

type CallbackFn = (item?: any) => void;

export function usePageModel(
  newCallback?: CallbackFn,
  editCallback?: CallbackFn,
) {
  const pageModelRef = ref<InstanceType<typeof PageModel>>();
  const defaultInfo = ref({});

  const handleNewData = () => {
    console.log("new");
    defaultInfo.value = {};
    if (!pageModelRef.value) return;
    pageModelRef.value.centerDialogVisible = true;

    newCallback && newCallback();
  };

  const handleEditData = (item: any) => {
    console.log("edit");
    defaultInfo.value = { ...item };
    if (!pageModelRef.value) return;
    pageModelRef.value.centerDialogVisible = true;

    editCallback && editCallback(item);
  };

  return [pageModelRef, defaultInfo, handleNewData, handleEditData];
}
